/* ==========================================================================
   LOTOTO MASTER — Graph-Based P&ID Energy Flow & Isolation Markup Engine
   Computes live propagation, dynamic P&ID highlighter boundaries, trapped vs
   zero-energy pressure, Keep-Live constraints, and full LOTOTO verification.
   ========================================================================== */
(function (global) {
  'use strict';

  const LOTOTO = (global.LOTOTO = global.LOTOTO || {});

  function getStreamGroup(energyType, explicitGroup) {
    if (explicitGroup) return explicitGroup;
    return energyType === 'electrical' ? 'electrical' : 'fluid';
  }

  function createInitialState(level) {
    const devices = {};
    const verified = {};
    const trapsHit = {};

    (level.devices || []).forEach((dev) => {
      if (dev.kind === 'valve' || dev.kind === 'breaker') {
        devices[dev.id] = dev.initialState || 'open';
      } else if (dev.kind === 'blind') {
        devices[dev.id] = dev.initialState || 'open';
      } else if (dev.kind === 'vent' || dev.kind === 'drain' || dev.kind === 'bleed') {
        devices[dev.id] = dev.initialState || 'closed';
      } else {
        devices[dev.id] = 'fixed';
      }
    });

    return {
      devices,
      verified,
      trapsHit,
      safetyScore: 100,
      mistakes: 0,
      hintsUsed: 0,
      streak: 0,
      everInteracted: false,
      completed: false,
      log: []
    };
  }

  function isBarrierBlocked(dev, devState) {
    if (!dev) return false;
    if (dev.kind === 'valve' || dev.kind === 'breaker') {
      return devState === 'locked';
    }
    if (dev.kind === 'blind') {
      return devState === 'blinded';
    }
    // Control valves, check valves, and PSV valves NEVER count as valid LOTO barriers
    return false;
  }

  /**
   * Run full graph evaluation of a level given current player state.
   */
  function evaluate(level, state) {
    const nodeMap = {};
    (level.nodes || []).forEach((n) => {
      nodeMap[n.id] = n;
    });

    const deviceMap = {};
    const inlineDeviceByNode = {};
    (level.devices || []).forEach((d) => {
      deviceMap[d.id] = d;
      if (d.nodeId) {
        inlineDeviceByNode[d.nodeId] = d;
      }
    });

    // Build adjacency list per node: { pipe, neighbor, streamGroup }
    const adj = {};
    const ensureAdj = (id) => {
      if (!adj[id]) adj[id] = [];
    };
    (level.nodes || []).forEach((n) => ensureAdj(n.id));
    (level.devices || []).forEach((d) => {
      if (d.nodeId) ensureAdj(d.nodeId);
    });

    (level.pipes || []).forEach((p) => {
      ensureAdj(p.from);
      ensureAdj(p.to);
      const sg = getStreamGroup(p.energyType, p.streamGroup);
      adj[p.from].push({ pipe: p, neighbor: p.to, streamGroup: sg });
      adj[p.to].push({ pipe: p, neighbor: p.from, streamGroup: sg });
    });

    // Helper: check if nodeId is a blocked barrier
    const nodeIsBlocked = (nodeId) => {
      const dev = inlineDeviceByNode[nodeId];
      if (!dev) return false;
      return isBarrierBlocked(dev, state.devices[dev.id]);
    };

    // 1. BFS from all active sources
    const pipeLive = {}; // pipeId -> { live: bool, pressure: number, energyType: string }
    const nodeLiveGroups = {}; // nodeId -> Set<streamGroup>
    const nodeLivePressure = {}; // nodeId -> max live pressure (fluid)

    const markNodeLive = (nodeId, sg, pressure) => {
      if (!nodeLiveGroups[nodeId]) nodeLiveGroups[nodeId] = new Set();
      nodeLiveGroups[nodeId].add(sg);
      if (sg !== 'electrical') {
        nodeLivePressure[nodeId] = Math.max(nodeLivePressure[nodeId] || 0, pressure || 100);
      }
    };

    (level.nodes || []).forEach((src) => {
      if (!src.isSource) return;
      const sg = getStreamGroup(src.energyType, src.streamGroup);
      const srcPressure = src.pressure != null ? src.pressure : (sg === 'electrical' ? 480 : 120);

      const visitedNodes = new Set([src.id]);
      const queue = [src.id];
      markNodeLive(src.id, sg, srcPressure);

      while (queue.length > 0) {
        const curr = queue.shift();
        const edges = adj[curr] || [];
        for (let i = 0; i < edges.length; i++) {
          const { pipe, neighbor, streamGroup } = edges[i];
          if (streamGroup !== sg) continue;

          // Pipe is energized up to the face of neighbor (even if neighbor is a closed valve!)
          const prev = pipeLive[pipe.id];
          pipeLive[pipe.id] = {
            live: true,
            pressure: Math.max(prev ? prev.pressure : 0, srcPressure),
            energyType: pipe.energyType
          };

          if (nodeIsBlocked(neighbor)) {
            // Stop propagation at the closed barrier face
            continue;
          }

          markNodeLive(neighbor, sg, srcPressure);
          if (!visitedNodes.has(neighbor)) {
            visitedNodes.add(neighbor);
            queue.push(neighbor);
          }
        }
      }
    });

    // 2. Partition non-live fluid pipes/nodes into isolated connected components
    //    so opening a vent/drain depressurizes ONLY its own isolated envelope!
    const fluidNodeComp = {}; // nodeId -> compIndex
    const compInfo = []; // { nodes: Set, pipes: Set, ventsDrains: [], openVentsDrains: [], basePressure }

    const allFluidNodeIds = new Set();
    (level.pipes || []).forEach((p) => {
      if (getStreamGroup(p.energyType, p.streamGroup) !== 'electrical') {
        allFluidNodeIds.add(p.from);
        allFluidNodeIds.add(p.to);
      }
    });

    // Map attached vents/drains/bleeds by attachNode
    const ventsByNode = {};
    (level.devices || []).forEach((d) => {
      if (d.kind === 'vent' || d.kind === 'drain' || d.kind === 'bleed') {
        if (!ventsByNode[d.attachNode]) ventsByNode[d.attachNode] = [];
        ventsByNode[d.attachNode].push(d);
      }
    });

    allFluidNodeIds.forEach((startId) => {
      if (fluidNodeComp[startId] !== undefined) return;
      if (nodeIsBlocked(startId)) return;
      if (nodeLiveGroups[startId] && nodeLiveGroups[startId].has('fluid')) return;
      // Also check custom non-electrical stream groups
      const startLive = nodeLiveGroups[startId];
      if (startLive && Array.from(startLive).some((g) => g !== 'electrical')) return;

      const compIdx = compInfo.length;
      const comp = {
        nodes: new Set([startId]),
        pipes: new Set(),
        ventsDrains: [],
        openVentsDrains: [],
        basePressure: 45
      };
      fluidNodeComp[startId] = compIdx;
      const q = [startId];

      while (q.length > 0) {
        const curr = q.shift();
        const attached = ventsByNode[curr] || [];
        attached.forEach((vd) => {
          comp.ventsDrains.push(vd);
          if (state.devices[vd.id] === 'open') {
            comp.openVentsDrains.push(vd);
          }
        });

        const edges = adj[curr] || [];
        for (let i = 0; i < edges.length; i++) {
          const { pipe, neighbor, streamGroup } = edges[i];
          if (streamGroup === 'electrical') continue;
          if (pipeLive[pipe.id] && pipeLive[pipe.id].live) continue;

          comp.pipes.add(pipe.id);
          if (pipe.trappedPressure) {
            comp.basePressure = Math.max(comp.basePressure, pipe.trappedPressure);
          }

          if (nodeIsBlocked(neighbor)) continue;
          const nLive = nodeLiveGroups[neighbor];
          if (nLive && Array.from(nLive).some((g) => g !== 'electrical')) continue;

          if (fluidNodeComp[neighbor] === undefined) {
            fluidNodeComp[neighbor] = compIdx;
            comp.nodes.add(neighbor);
            q.push(neighbor);
          }
        }
      }

      // Compute component depressurization state
      // If component has no vents/drains at all (e.g. simple deadleg), it's zero-energy when isolated
      if (comp.ventsDrains.length === 0) {
        comp.pressure = 0;
        comp.fullyVented = true;
      } else if (comp.openVentsDrains.length === 0) {
        comp.pressure = comp.basePressure;
        comp.fullyVented = false;
      } else if (comp.openVentsDrains.length < comp.ventsDrains.length) {
        // At least one vent/drain open drops pressure to 0 PSI, but another vent/drain remains to finish draining
        comp.pressure = 0;
        comp.fullyVented = false;
      } else {
        comp.pressure = 0;
        comp.fullyVented = true;
      }

      compInfo.push(comp);
    });

    // Determine if player has locked/blinded at least one barrier (so P&ID markup activates cleanly)
    const lockedCount = (level.devices || []).filter((d) => isBarrierBlocked(d, state.devices[d.id])).length;

    // 3. Assign visual highlight status to every pipe
    //    'live' | 'isolated_trapped' | 'isolated_partial' | 'isolated_zero'
    const pipeStatus = {};
    (level.pipes || []).forEach((p) => {
      if (pipeLive[p.id] && pipeLive[p.id].live) {
        pipeStatus[p.id] = 'live';
        return;
      }
      if (lockedCount === 0) {
        pipeStatus[p.id] = 'live';
        return;
      }
      const sg = getStreamGroup(p.energyType, p.streamGroup);
      if (sg === 'electrical') {
        pipeStatus[p.id] = 'isolated_zero';
        return;
      }
      // Find component via non-blocked endpoint
      let cIdx = fluidNodeComp[p.from];
      if (cIdx === undefined) cIdx = fluidNodeComp[p.to];
      if (cIdx === undefined) {
        pipeStatus[p.id] = 'isolated_zero';
        return;
      }
      const c = compInfo[cIdx];
      if (c.fullyVented) {
        pipeStatus[p.id] = 'isolated_zero';
      } else if (c.pressure === 0) {
        pipeStatus[p.id] = 'isolated_partial';
      } else {
        pipeStatus[p.id] = 'isolated_trapped';
      }
    });

    // 4. Compute simulated pressure & live state for every node
    const nodeStatus = {};
    (level.nodes || []).forEach((n) => {
      const liveSet = nodeLiveGroups[n.id] || new Set();
      const hasLiveFluid = Array.from(liveSet).some((g) => g !== 'electrical');
      const hasLiveElec = liveSet.has('electrical');
      const hasAnyLive = liveSet.size > 0;

      let pressure = 0;
      let fullyVented = true;
      if (hasLiveFluid) {
        pressure = nodeLivePressure[n.id] || 120;
        fullyVented = false;
      } else if (fluidNodeComp[n.id] !== undefined) {
        const c = compInfo[fluidNodeComp[n.id]];
        pressure = c.pressure;
        fullyVented = c.fullyVented;
      }

      nodeStatus[n.id] = {
        hasLiveFluid,
        hasLiveElec,
        hasAnyLive,
        pressure,
        fullyVented,
        isolated: !hasAnyLive && lockedCount > 0
      };
    });

    // 5. Evaluate Targets, Keep-Live constraints, Required Blinds, DBB, Vents/Drains, Tryout
    const targetNodes = (level.nodes || []).filter((n) => n.isTarget);
    const allTargetsIsolated = targetNodes.every((n) => !nodeStatus[n.id].hasAnyLive);

    const keepLiveNodes = (level.nodes || []).filter((n) => n.mustStayLive);
    const keepLiveViolations = keepLiveNodes.filter((n) => {
      const st = nodeStatus[n.id];
      if (n.requiresElectrical && !st.hasLiveElec) return true;
      if (!st.hasLiveFluid) return true;
      // Also flag if any valve/breaker protecting this keep-live train was locked
      const blockedKeepLiveDev = (level.devices || []).some(
        (d) => d.keepLiveTrap && d.keepLiveNode === n.id && isBarrierBlocked(d, state.devices[d.id])
      );
      return blockedKeepLiveDev;
    });

    // Required blinds
    const requiredBlinds = (level.devices || []).filter((d) => d.kind === 'blind' && d.required !== false);
    const allBlindsInstalled = requiredBlinds.every((d) => state.devices[d.id] === 'blinded');

    // Required DBB pairs: level.dbbPairs = [{ valves: [id1, id2], bleed: bleedId, label }]
    const dbbPairs = level.dbbPairs || [];
    const allDbbSatisfied = dbbPairs.every((pair) => {
      const valvesLocked = pair.valves.every((vid) => state.devices[vid] === 'locked');
      const bleedOpen = state.devices[pair.bleed] === 'open';
      return valvesLocked && bleedOpen;
    });

    // Required Vents / Drains / Bleeds
    const requiredVentsDrains = (level.devices || []).filter(
      (d) => (d.kind === 'vent' || d.kind === 'drain' || d.kind === 'bleed') && d.required !== false
    );
    const allVentsDrainsOpen = requiredVentsDrains.every((d) => state.devices[d.id] === 'open');

    // Auto-invalidate Tryout checks if the underlying node became energized or pressurized again!
    const tryoutDevices = (level.devices || []).filter(
      (d) => d.kind === 'start_switch' || d.kind === 'gauge' || d.kind === 'gas_detector'
    );
    tryoutDevices.forEach((d) => {
      if (!state.verified[d.id]) return;
      const st = nodeStatus[d.attachNode];
      if (d.kind === 'start_switch' && st && st.hasLiveElec) {
        state.verified[d.id] = false;
      } else if (d.kind === 'gauge' && st && (st.hasLiveFluid || st.pressure > 0)) {
        state.verified[d.id] = false;
      } else if (d.kind === 'gas_detector' && (!allTargetsIsolated || !allBlindsInstalled || !allVentsDrainsOpen)) {
        state.verified[d.id] = false;
      }
    });

    const allTryoutPassed = tryoutDevices.every((d) => !!state.verified[d.id]);

    // Check lock phase completion (isolated + DBB valves locked + no keep-live violation)
    const allDbbValvesLocked = dbbPairs.every((pair) =>
      pair.valves.every((vid) => state.devices[vid] === 'locked')
    );
    const lockPhaseDone = allTargetsIsolated && allDbbValvesLocked && keepLiveViolations.length === 0;
    const ventPhaseDone = lockPhaseDone && allVentsDrainsOpen && allBlindsInstalled;
    const tryoutPhaseDone = ventPhaseDone && allTryoutPassed;

    // Build dynamic Permit Checklist items for the UI sidebar
    const checklist = [];

    checklist.push({
      id: 'chk-isolate',
      label: `Isolate all energy sources to ${level.targetShort || level.targetName}`,
      done: allTargetsIsolated,
      error: false
    });

    if (keepLiveNodes.length > 0) {
      checklist.push({
        id: 'chk-keeplive',
        label: level.keepLiveRule || 'Keep standby/online equipment running',
        done: keepLiveViolations.length === 0,
        error: keepLiveViolations.length > 0
      });
    }

    if (dbbPairs.length > 0) {
      checklist.push({
        id: 'chk-dbb',
        label: `Double Block & Bleed: lock valve pairs & open inter-valve bleed${dbbPairs.length > 1 ? 's' : ''}`,
        done: allDbbSatisfied,
        error: false
      });
    }

    if (requiredVentsDrains.length > 0) {
      const openCount = requiredVentsDrains.filter((d) => state.devices[d.id] === 'open').length;
      checklist.push({
        id: 'chk-vent',
        label: `Vent & drain stored energy (${openCount}/${requiredVentsDrains.length} open)`,
        done: allVentsDrainsOpen && allTargetsIsolated,
        error: false
      });
    }

    if (requiredBlinds.length > 0) {
      const blindCount = requiredBlinds.filter((d) => state.devices[d.id] === 'blinded').length;
      checklist.push({
        id: 'chk-blind',
        label: `Swing spectacle blind${requiredBlinds.length > 1 ? 's' : ''} for positive isolation (${blindCount}/${requiredBlinds.length})`,
        done: allBlindsInstalled,
        error: false
      });
    }

    if (tryoutDevices.length > 0) {
      const passCount = tryoutDevices.filter((d) => !!state.verified[d.id]).length;
      checklist.push({
        id: 'chk-tryout',
        label: `Tryout verification: gauges, switches & checks (${passCount}/${tryoutDevices.length})`,
        done: allTryoutPassed,
        error: false
      });
    }

    const readyForPermit =
      allTargetsIsolated &&
      keepLiveViolations.length === 0 &&
      allDbbSatisfied &&
      allVentsDrainsOpen &&
      allBlindsInstalled &&
      allTryoutPassed;

    return {
      pipeLive,
      pipeStatus,
      nodeStatus,
      compInfo,
      fluidNodeComp,
      allTargetsIsolated,
      keepLiveViolations,
      allBlindsInstalled,
      allDbbSatisfied,
      allVentsDrainsOpen,
      allTryoutPassed,
      lockPhaseDone,
      ventPhaseDone,
      tryoutPhaseDone,
      readyForPermit,
      checklist,
      lockedCount
    };
  }

  function applyPenalty(state, amount) {
    state.mistakes += 1;
    state.streak = 0;
    state.safetyScore = Math.max(0, state.safetyScore - amount);
  }

  function addLog(state, text, tone = 'info') {
    state.log.unshift({ text, tone });
    if (state.log.length > 14) state.log.pop();
  }

  /**
   * Handle player clicking an interactive P&ID device.
   */
  function interact(level, state, deviceId) {
    const dev = (level.devices || []).find((d) => d.id === deviceId);
    if (!dev) return { ok: false, severity: 'info', message: '' };

    state.everInteracted = true;
    const before = evaluate(level, state);

    // 1. TRAPS: Control Valve, Check Valve, PSV Isolation Valve
    if (dev.kind === 'control_valve') {
      if (!state.trapsHit[dev.id]) {
        state.trapsHit[dev.id] = true;
        applyPenalty(state, 10);
      }
      const msg = `TRAP! ${dev.tag} is a pneumatic Control Valve — NOT a valid LOTO isolation point. Lock the manual block valves instead!`;
      addLog(state, `Trap hit: ${dev.tag} (Control Valve)`, 'warn');
      return { ok: false, severity: 'warning', message: msg, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
    }

    if (dev.kind === 'check_valve') {
      if (!state.trapsHit[dev.id]) {
        state.trapsHit[dev.id] = true;
        applyPenalty(state, 10);
      }
      const msg = `TRAP! ${dev.tag} is a Check Valve — NOT a reliable isolation point! Check valves leak backpressure and cannot be locked out.`;
      addLog(state, `Trap hit: ${dev.tag} (Check Valve)`, 'warn');
      return { ok: false, severity: 'warning', message: msg, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
    }

    if (dev.kind === 'psv_valve') {
      if (!state.trapsHit[dev.id]) {
        state.trapsHit[dev.id] = true;
        applyPenalty(state, 15);
      }
      const msg = `CRITICAL SAFETY RULE! Never close ${dev.tag} under a Pressure Safety Valve (PSV) — it protects the vessel against overpressure!`;
      addLog(state, `Critical warning: PSV valve ${dev.tag}`, 'bad');
      return { ok: false, severity: 'danger', message: msg, sound: 'hazard', fx: { type: 'hazard', x: dev.x, y: dev.y } };
    }

    // 2. MANUAL BLOCK VALVE
    if (dev.kind === 'valve') {
      const curr = state.devices[dev.id];
      if (curr === 'open') {
        state.devices[dev.id] = 'locked';
        const after = evaluate(level, state);

        if (after.keepLiveViolations.length > before.keepLiveViolations.length) {
          applyPenalty(state, 10);
          const violatedNames = after.keepLiveViolations.map((n) => n.label).join(', ');
          const msg = `OPS VIOLATION! Locking ${dev.tag} starved ${violatedNames}! Re-open ${dev.tag} and lock only the local isolation valves.`;
          addLog(state, `${dev.tag} locked — starved ${violatedNames}!`, 'bad');
          return { ok: false, severity: 'danger', message: msg, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
        }

        state.streak += 1;
        const newlyIsolated =
          Object.keys(after.pipeStatus).filter((pid) => after.pipeStatus[pid] !== 'live').length -
          Object.keys(before.pipeStatus).filter((pid) => before.pipeStatus[pid] !== 'live').length;

        const msg = newlyIsolated > 0
          ? `${dev.tag} CLOSED, LOCKED & TAGGED! Isolated flow path highlighted on the P&ID.`
          : `${dev.tag} CLOSED, LOCKED & TAGGED! Continue isolating remaining energy paths.`;
        addLog(state, `Locked & tagged ${dev.tag}`, 'good');
        return { ok: true, severity: 'success', message: msg, sound: 'lock', fx: { type: 'lock', x: dev.x, y: dev.y } };
      } else {
        // Attempt to unlock: ensure reopening won't pressurize an open vent/drain or swung blind!
        state.devices[dev.id] = 'open';
        const testAfter = evaluate(level, state);

        const openDrainExposed = (level.devices || []).find(
          (d) =>
            (d.kind === 'vent' || d.kind === 'drain' || d.kind === 'bleed') &&
            state.devices[d.id] === 'open' &&
            testAfter.nodeStatus[d.attachNode] &&
            testAfter.nodeStatus[d.attachNode].hasLiveFluid
        );
        if (openDrainExposed) {
          state.devices[dev.id] = 'locked';
          const msg = `Hold on! Close open ${openDrainExposed.tag} before unlocking ${dev.tag} to prevent a live release.`;
          return { ok: false, severity: 'warning', message: msg, sound: 'warn' };
        }

        const msg = `${dev.tag} UNLOCKED & RE-OPENED.`;
        addLog(state, `Unlocked ${dev.tag}`, 'info');
        return { ok: true, severity: 'info', message: msg, sound: 'unlock' };
      }
    }

    // 3. ELECTRICAL MCC BREAKER
    if (dev.kind === 'breaker') {
      const curr = state.devices[dev.id];
      if (curr === 'open') {
        state.devices[dev.id] = 'locked';
        const after = evaluate(level, state);

        if (after.keepLiveViolations.length > before.keepLiveViolations.length) {
          applyPenalty(state, 10);
          const violatedNames = after.keepLiveViolations.map((n) => n.label).join(', ');
          const msg = `OPS VIOLATION! Locking ${dev.tag} shut down ${violatedNames}! Re-energize ${dev.tag}!`;
          addLog(state, `${dev.tag} cut power to ${violatedNames}!`, 'bad');
          return { ok: false, severity: 'danger', message: msg, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
        }

        state.streak += 1;
        const msg = `${dev.tag} OPENED, LOCKED & TAGGED! Electrical feed de-energized — verify with local Start switch in Tryout.`;
        addLog(state, `Locked out breaker ${dev.tag}`, 'good');
        return { ok: true, severity: 'success', message: msg, sound: 'lock', fx: { type: 'lock', x: dev.x, y: dev.y } };
      } else {
        state.devices[dev.id] = 'open';
        evaluate(level, state); // resets any invalidated start switch
        const msg = `${dev.tag} UNLOCKED & RE-ENERGIZED.`;
        addLog(state, `Re-energized ${dev.tag}`, 'info');
        return { ok: true, severity: 'info', message: msg, sound: 'unlock' };
      }
    }

    // 4. SPECTACLE BLIND (POSITIVE ISOLATION)
    if (dev.kind === 'blind') {
      const curr = state.devices[dev.id];
      if (curr === 'open') {
        // Check if pipe at blind's node is still LIVE or holding trapped pressure!
        // A blind node sits between two pipes; check if any adjacent pipe is LIVE or trapped!
        const connectedPipes = (level.pipes || []).filter((p) => p.from === dev.nodeId || p.to === dev.nodeId);
        const anyLive = connectedPipes.some((p) => before.pipeStatus[p.id] === 'live');
        if (anyLive) {
          applyPenalty(state, 15);
          const msg = `LINE BREAK HAZARD! Never swing spectacle blind ${dev.tag} while the line is LIVE! Lock block valves & depressurize first!`;
          addLog(state, `Hazard: tried blinding live line at ${dev.tag}`, 'bad');
          return { ok: false, severity: 'danger', message: msg, sound: 'hazard', fx: { type: 'hazard', x: dev.x, y: dev.y } };
        }
        const anyTrapped = connectedPipes.some((p) => before.pipeStatus[p.id] === 'isolated_trapped');
        if (anyTrapped) {
          applyPenalty(state, 10);
          const msg = `STORED PRESSURE WARNING! Depressurize the isolated line to 0 PSI via vent/drain before breaking flanges to swing ${dev.tag}!`;
          addLog(state, `Warning: trapped pressure at ${dev.tag}`, 'warn');
          return { ok: false, severity: 'warning', message: msg, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
        }

        state.devices[dev.id] = 'blinded';
        state.streak += 1;
        const msg = `${dev.tag} SWUNG TO BLINDED & TAGGED! Positive physical isolation established ✓`;
        addLog(state, `Installed spectacle blind ${dev.tag}`, 'good');
        return { ok: true, severity: 'success', message: msg, sound: 'blind', fx: { type: 'lock', x: dev.x, y: dev.y } };
      } else {
        state.devices[dev.id] = 'open';
        evaluate(level, state);
        addLog(state, `Swung ${dev.tag} back to open`, 'info');
        return { ok: true, severity: 'info', message: `${dev.tag} swung back to OPEN ring.`, sound: 'unlock' };
      }
    }

    // 5. VENT / DRAIN / BLEED
    if (dev.kind === 'vent' || dev.kind === 'drain' || dev.kind === 'bleed') {
      const curr = state.devices[dev.id];
      if (curr === 'closed') {
        const st = before.nodeStatus[dev.attachNode];
        if (st && st.hasLiveFluid) {
          applyPenalty(state, 15);
          const msg = `LIVE RELEASE HAZARD! Line is still pressurized at ${st.pressure} PSI! Isolate ALL upstream & downstream sources before opening ${dev.tag}!`;
          addLog(state, `DANGER: opened ${dev.tag} on live ${st.pressure} PSI line!`, 'bad');
          return { ok: false, severity: 'danger', message: msg, sound: 'hazard', fx: { type: 'spray', x: dev.x, y: dev.y } };
        }

        state.devices[dev.id] = 'open';
        state.streak += 1;
        const after = evaluate(level, state);
        const afterNode = after.nodeStatus[dev.attachNode];
        const verb = dev.kind === 'bleed' ? 'Inter-valve bleed opened' : dev.kind === 'vent' ? 'Vent opened' : 'Drain opened';
        const msg = afterNode && afterNode.fullyVented
          ? `${dev.tag} OPENED! Trapped energy safely released to 0 PSI — P&ID highlighter turned GREEN!`
          : `${dev.tag} OPENED! ${verb} — pressure dropped to 0 PSI. Open any remaining vent/drain on this section.`;
        addLog(state, `Opened ${dev.tag} — depressurized`, 'good');
        return { ok: true, severity: 'success', message: msg, sound: 'vent', fx: { type: 'puff', x: dev.x, y: dev.y } };
      } else {
        state.devices[dev.id] = 'closed';
        addLog(state, `Closed ${dev.tag}`, 'info');
        return { ok: true, severity: 'info', message: `${dev.tag} closed.`, sound: 'unlock' };
      }
    }

    // 6. TRYOUT: LOCAL START/STOP SWITCH (HOA)
    if (dev.kind === 'start_switch') {
      const st = before.nodeStatus[dev.attachNode];
      if (st && st.hasLiveElec) {
        applyPenalty(state, 15);
        const msg = `FAILED TRYOUT! Pushing ${dev.tag} started the motor! Electrical power is STILL LIVE — Lock out the MCC breaker first!`;
        addLog(state, `FAILED TRYOUT at ${dev.tag} — motor still live!`, 'bad');
        return { ok: false, severity: 'danger', message: msg, sound: 'hazard', fx: { type: 'hazard', x: dev.x, y: dev.y } };
      }
      if (!state.verified[dev.id]) {
        state.verified[dev.id] = true;
        state.streak += 1;
        addLog(state, `Tryout PASSED: ${dev.tag} dead ✓`, 'good');
      }
      return {
        ok: true,
        severity: 'success',
        message: `TRYOUT PASSED! ${dev.tag} bump-tested — motor stayed completely dead (Zero Electrical Energy verified ✓).`,
        sound: 'verify',
        fx: { type: 'verify', x: dev.x, y: dev.y }
      };
    }

    // 7. TRYOUT: PRESSURE GAUGE (PI)
    if (dev.kind === 'gauge') {
      const st = before.nodeStatus[dev.attachNode];
      if (st && st.hasLiveFluid) {
        applyPenalty(state, 10);
        const msg = `TRYOUT FAILED! ${dev.tag} reads ${st.pressure} PSI (LIVE PRESSURE)! Isolate all fluid paths first.`;
        addLog(state, `Gauge ${dev.tag} still live (${st.pressure} PSI)`, 'bad');
        return { ok: false, severity: 'danger', message: msg, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
      }
      if (st && st.pressure > 0) {
        applyPenalty(state, 5);
        const msg = `TRAPPED PRESSURE! ${dev.tag} still reads ${st.pressure} PSI! Open the vent/drain to bleed down to 0 PSI before verifying.`;
        addLog(state, `Gauge ${dev.tag} shows ${st.pressure} PSI trapped`, 'warn');
        return { ok: false, severity: 'warning', message: msg, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
      }
      if (!state.verified[dev.id]) {
        state.verified[dev.id] = true;
        state.streak += 1;
        addLog(state, `Tryout PASSED: ${dev.tag} at 0 PSI ✓`, 'good');
      }
      return {
        ok: true,
        severity: 'success',
        message: `TRYOUT PASSED! ${dev.tag} verified at 0 PSI — Zero Stored Pressure confirmed ✓.`,
        sound: 'verify',
        fx: { type: 'verify', x: dev.x, y: dev.y }
      };
    }

    // 8. TRYOUT: ATMOSPHERIC GAS MONITOR (CONFINED SPACE)
    if (dev.kind === 'gas_detector') {
      if (!before.allTargetsIsolated || !before.allBlindsInstalled || !before.allVentsDrainsOpen) {
        applyPenalty(state, 5);
        const msg = `GAS TEST FAILED! ${dev.tag} detects hazardous vapors. Complete ALL positive isolation blinds and vents/drains before atmospheric testing!`;
        addLog(state, `Gas test ${dev.tag} failed — isolate & blind first`, 'warn');
        return { ok: false, severity: 'warning', message: msg, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
      }
      if (!state.verified[dev.id]) {
        state.verified[dev.id] = true;
        state.streak += 1;
        addLog(state, `Gas Test PASSED: ${dev.tag} 0% LEL ✓`, 'good');
      }
      return {
        ok: true,
        severity: 'success',
        message: `ATMOSPHERIC TEST PASSED! ${dev.tag} reads 0% LEL · 20.9% O2 — Safe for Entry ✓.`,
        sound: 'verify',
        fx: { type: 'verify', x: dev.x, y: dev.y }
      };
    }

    return { ok: false, severity: 'info', message: '' };
  }

  /**
   * Smart context-aware hint finder.
   */
  function getHint(level, state, evalRes) {
    // 1. Keep-live violation? Find a locked valve/breaker that is NOT marked required
    if (evalRes.keepLiveViolations.length > 0) {
      const wrongLocked = (level.devices || []).find(
        (d) => (d.kind === 'valve' || d.kind === 'breaker') && state.devices[d.id] === 'locked' && d.keepLiveTrap
      );
      if (wrongLocked) {
        return {
          deviceId: wrongLocked.id,
          message: `Hint: Unlock ${wrongLocked.tag} so the standby/online header stays live, then lock only the local isolation valves.`
        };
      }
    }

    // 2. Required isolation valves / breakers not yet locked
    const nextIso = (level.devices || []).find(
      (d) =>
        (d.kind === 'valve' || d.kind === 'breaker') &&
        d.required === true &&
        state.devices[d.id] !== 'locked'
    );
    if (nextIso) {
      return {
        deviceId: nextIso.id,
        message: `Hint: Lock & Tag ${nextIso.tag} (${nextIso.desc || nextIso.kind}) to isolate this energy path.`
      };
    }

    // 3. Required vents / drains / bleeds not yet open (prefer ones whose attachNode is already isolated)
    const nextVent = (level.devices || []).find(
      (d) =>
        (d.kind === 'vent' || d.kind === 'drain' || d.kind === 'bleed') &&
        d.required !== false &&
        state.devices[d.id] !== 'open'
    );
    if (nextVent) {
      return {
        deviceId: nextVent.id,
        message: `Hint: Open ${nextVent.tag} to safely release trapped pressure and verify isolation.`
      };
    }

    // 4. Required spectacle blinds not yet blinded
    const nextBlind = (level.devices || []).find(
      (d) => d.kind === 'blind' && d.required !== false && state.devices[d.id] !== 'blinded'
    );
    if (nextBlind) {
      return {
        deviceId: nextBlind.id,
        message: `Hint: Line is depressurized! Swing spectacle blind ${nextBlind.tag} to BLINDED for positive isolation.`
      };
    }

    // 5. Tryout verifications
    const nextTryout = (level.devices || []).find(
      (d) => (d.kind === 'start_switch' || d.kind === 'gauge' || d.kind === 'gas_detector') && !state.verified[d.id]
    );
    if (nextTryout) {
      return {
        deviceId: nextTryout.id,
        message: `Hint: Perform Tryout by clicking ${nextTryout.tag} to confirm zero energy.`
      };
    }

    return {
      deviceId: null,
      message: 'All LOTOTO checks are complete! Click the green "ISSUE SAFE WORK PERMIT" button on the right!'
    };
  }

  LOTOTO.engine = {
    createInitialState,
    evaluate,
    interact,
    getHint,
    isBarrierBlocked
  };
})(window);
