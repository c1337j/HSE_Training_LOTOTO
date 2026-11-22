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
      tagInfo: null,
      tagNumbers: {},
      nextTagNum: 1,
      requireTag: false,
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

    // Helper for i18n lookup with safe fallback
    const tr = (key, vars) => (LOTOTO.i18n ? LOTOTO.i18n.t(key, vars) : key);
    const lvlTxt = (field) => (LOTOTO.i18n ? LOTOTO.i18n.getLevelText(level, field) : level[field]);

    // Build dynamic Permit Checklist items for the UI sidebar
    const checklist = [];

    if (state.requireTag) {
      checklist.push({
        id: 'chk-tag',
        label: tr('chk_tag'),
        done: !!state.tagInfo && lockedCount > 0,
        error: false
      });
    }

    checklist.push({
      id: 'chk-isolate',
      label: tr('chk_isolate', { target: level.targetShort || lvlTxt('targetName') }),
      done: allTargetsIsolated,
      error: false
    });

    if (keepLiveNodes.length > 0) {
      checklist.push({
        id: 'chk-keeplive',
        label: lvlTxt('keepLiveRule') || tr('chk_keeplive_default'),
        done: keepLiveViolations.length === 0,
        error: keepLiveViolations.length > 0
      });
    }

    if (dbbPairs.length > 0) {
      checklist.push({
        id: 'chk-dbb',
        label: tr('chk_dbb'),
        done: allDbbSatisfied,
        error: false
      });
    }

    if (requiredVentsDrains.length > 0) {
      const openCount = requiredVentsDrains.filter((d) => state.devices[d.id] === 'open').length;
      checklist.push({
        id: 'chk-vent',
        label: tr('chk_vent', { open: openCount, total: requiredVentsDrains.length }),
        done: allVentsDrainsOpen && allTargetsIsolated,
        error: false
      });
    }

    if (requiredBlinds.length > 0) {
      const blindCount = requiredBlinds.filter((d) => state.devices[d.id] === 'blinded').length;
      checklist.push({
        id: 'chk-blind',
        label: tr('chk_blind', { done: blindCount, total: requiredBlinds.length }),
        done: allBlindsInstalled,
        error: false
      });
    }

    if (tryoutDevices.length > 0) {
      const passCount = tryoutDevices.filter((d) => !!state.verified[d.id]).length;
      checklist.push({
        id: 'chk-tryout',
        label: tr('chk_tryout', { done: passCount, total: tryoutDevices.length }),
        done: allTryoutPassed,
        error: false
      });
    }

    const tagSatisfied = !state.requireTag || (!!state.tagInfo && lockedCount > 0);

    const readyForPermit =
      tagSatisfied &&
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

  function tr(key, vars) {
    return LOTOTO.i18n ? LOTOTO.i18n.t(key, vars) : key;
  }

  function applyPenalty(state, amount) {
    state.mistakes += 1;
    state.streak = 0;
    state.safetyScore = Math.max(0, state.safetyScore - amount);
  }

  function addLog(state, key, vars, tone = 'info') {
    state.log.unshift({ key, vars, text: tr(key, vars), tone });
    if (state.log.length > 14) state.log.pop();
  }

  function getLineSpecs(level, nodeId, evalRes) {
    const incidentPipes = (level.pipes || []).filter(
      (p) => (p.from === nodeId || p.to === nodeId) && p.energyType !== 'electrical'
    );
    const livePipe = incidentPipes.find((p) => evalRes.pipeLive[p.id] && evalRes.pipeLive[p.id].live);
    const refPipe = livePipe || incidentPipes[0];
    const energyType = refPipe ? refPipe.energyType : 'process';
    const st = evalRes.nodeStatus[nodeId];
    const pressure = (livePipe && evalRes.pipeLive[livePipe.id] && evalRes.pipeLive[livePipe.id].pressure)
      || (st && st.pressure)
      || 150;

    // Look for a matching source node for lineSize/temp overrides
    const srcNode = (level.nodes || []).find((n) => n.isSource && n.energyType === energyType);
    const defaultSize = pressure >= 300 ? '4"' : pressure >= 120 ? '4"' : '3"';
    const lineSize = (srcNode && srcNode.lineSize) || defaultSize;
    const defaultTemp = energyType === 'steam'
      ? (pressure >= 300 ? '435°F (224°C)' : '350°F (177°C)')
      : energyType === 'water' ? '75°F (24°C)' : '110°F (43°C)';
    const temp = (srcNode && srcNode.temp) || defaultTemp;

    const medKeyMap = {
      process: 'med_process',
      steam: 'med_steam',
      water: 'med_water',
      gas: 'med_gas',
      gravity: 'med_gravity',
      electrical: 'med_electrical'
    };

    return {
      energyType,
      pressure,
      lineSize,
      temp,
      mediumKey: medKeyMap[energyType] || 'med_process',
      rating: `${lineSize} · ${pressure} PSI`
    };
  }

  function buildIncident({ prefix, fatal, penalty, dev, mediumKey, rating, vars }) {
    return {
      fatal: !!fatal,
      penalty: penalty || 0,
      deviceTag: dev.tag,
      mediumKey: mediumKey || 'med_process',
      rating: rating || '—',
      titleKey: `${prefix}_title`,
      bodyKey: `${prefix}_body`,
      seqKey: `${prefix}_seq`,
      vars: vars || {}
    };
  }

  function findDevice(level, id) {
    return (level.devices || []).find((d) => d.id === id);
  }

  /**
   * Handle player clicking an interactive P&ID device.
   */
  function interact(level, state, deviceId) {
    const dev = findDevice(level, deviceId);
    if (!dev) return { ok: false, severity: 'info', message: '' };

    state.everInteracted = true;
    const before = evaluate(level, state);

    // 1. TRAPS: Control Valve, Check Valve, PSV Isolation Valve
    if (dev.kind === 'control_valve') {
      const firstHit = !state.trapsHit[dev.id];
      if (firstHit) {
        state.trapsHit[dev.id] = true;
        applyPenalty(state, 10);
      }
      const specs = getLineSpecs(level, dev.nodeId, before);
      const msg = tr('msg_trap_cv', { tag: dev.tag });
      addLog(state, 'log_trap_cv', { tag: dev.tag }, 'warn');
      return {
        ok: false,
        severity: 'warning',
        message: msg,
        msgKey: 'msg_trap_cv',
        msgVars: { tag: dev.tag },
        sound: 'warn',
        fx: { type: 'warn', x: dev.x, y: dev.y },
        incident: buildIncident({
          prefix: 'inc_trap_cv',
          fatal: false,
          penalty: firstHit ? 10 : 0,
          dev,
          mediumKey: specs.mediumKey,
          rating: specs.rating,
          vars: { tag: dev.tag }
        })
      };
    }

    if (dev.kind === 'check_valve') {
      const firstHit = !state.trapsHit[dev.id];
      if (firstHit) {
        state.trapsHit[dev.id] = true;
        applyPenalty(state, 10);
      }
      const specs = getLineSpecs(level, dev.nodeId, before);
      const msg = tr('msg_trap_check', { tag: dev.tag });
      addLog(state, 'log_trap_check', { tag: dev.tag }, 'warn');
      return {
        ok: false,
        severity: 'warning',
        message: msg,
        msgKey: 'msg_trap_check',
        msgVars: { tag: dev.tag },
        sound: 'warn',
        fx: { type: 'warn', x: dev.x, y: dev.y },
        incident: buildIncident({
          prefix: 'inc_trap_check',
          fatal: false,
          penalty: firstHit ? 10 : 0,
          dev,
          mediumKey: specs.mediumKey,
          rating: specs.rating,
          vars: { tag: dev.tag }
        })
      };
    }

    if (dev.kind === 'psv_valve') {
      applyPenalty(state, 25);
      const specs = getLineSpecs(level, dev.nodeId, before);
      const msg = tr('msg_trap_psv', { tag: dev.tag });
      addLog(state, 'log_trap_psv', { tag: dev.tag }, 'bad');
      return {
        ok: false,
        severity: 'danger',
        message: msg,
        msgKey: 'msg_trap_psv',
        msgVars: { tag: dev.tag },
        sound: 'hazard',
        fx: { type: 'hazard', x: dev.x, y: dev.y },
        incident: buildIncident({
          prefix: 'inc_psv',
          fatal: true,
          penalty: 25,
          dev,
          mediumKey: specs.mediumKey,
          rating: specs.rating,
          vars: { tag: dev.tag }
        })
      };
    }

    // 2. MANUAL BLOCK VALVE
    if (dev.kind === 'valve') {
      const curr = state.devices[dev.id];
      if (curr === 'open') {
        // PROCESS SEQUENCING CHECK A: Rotating equipment motor MUST be stopped & locked FIRST!
        if (dev.requireOffBreaker && state.devices[dev.requireOffBreaker] !== 'locked') {
          const brk = findDevice(level, dev.requireOffBreaker);
          const brkTag = brk ? brk.tag : dev.requireOffBreaker;
          const equip = dev.equipTag || level.targetShort || 'Equipment';
          const specs = getLineSpecs(level, dev.nodeId, before);
          applyPenalty(state, 15);

          let prefix = 'inc_deadhead';
          if (dev.pumpRole === 'suction') prefix = 'inc_cavitation';
          else if (dev.pumpRole === 'compressor_disch') prefix = 'inc_comp_surge';
          else if (dev.thermalRule === 'compressor_cw') prefix = 'inc_comp_cw';

          const vars = { tag: dev.tag, equip, breaker: brkTag };
          const title = tr(`${prefix}_title`);
          addLog(state, 'log_seq_block', { tag: dev.tag, title }, 'bad');
          return {
            ok: false,
            severity: 'danger',
            message: tr(`${prefix}_body`, vars),
            msgKey: `${prefix}_body`,
            msgVars: vars,
            sound: 'hazard',
            fx: { type: 'hazard', x: dev.x, y: dev.y },
            incident: buildIncident({
              prefix,
              fatal: false,
              penalty: 15,
              dev,
              mediumKey: specs.mediumKey,
              rating: specs.rating,
              vars
            })
          };
        }

        // PROCESS SEQUENCING CHECK B: Thermal Exchanger order (Hot side BEFORE Cold/Trapped side!)
        if (Array.isArray(dev.requireLockedAll) && dev.requireLockedAll.length > 0) {
          const unlockedReq = dev.requireLockedAll.filter((vid) => state.devices[vid] !== 'locked');
          if (unlockedReq.length > 0) {
            const reqTags = unlockedReq
              .map((vid) => {
                const d = findDevice(level, vid);
                return d ? d.tag : vid;
              })
              .join(', ');
            const equip = dev.equipTag || level.targetShort || 'Exchanger';
            const specs = getLineSpecs(level, dev.nodeId, before);
            applyPenalty(state, 15);

            const prefix = dev.thermalRule === 'cooler_cw' ? 'inc_cooler_cw' : 'inc_heater_proc';
            const vars = { tag: dev.tag, equip, req: reqTags };
            const title = tr(`${prefix}_title`);
            addLog(state, 'log_seq_block', { tag: dev.tag, title }, 'bad');
            return {
              ok: false,
              severity: 'danger',
              message: tr(`${prefix}_body`, vars),
              msgKey: `${prefix}_body`,
              msgVars: vars,
              sound: 'hazard',
              fx: { type: 'hazard', x: dev.x, y: dev.y },
              incident: buildIncident({
                prefix,
                fatal: false,
                penalty: 15,
                dev,
                mediumKey: specs.mediumKey,
                rating: specs.rating,
                vars
              })
            };
          }
        }

        state.devices[dev.id] = 'locked';
        if (!state.tagNumbers[dev.id]) state.tagNumbers[dev.id] = state.nextTagNum++;
        const after = evaluate(level, state);

        if (after.keepLiveViolations.length > before.keepLiveViolations.length) {
          applyPenalty(state, 10);
          const violatedNames = after.keepLiveViolations.map((n) => n.label).join(', ');
          const vars = { tag: dev.tag, names: violatedNames };
          const msg = tr('msg_ops_valve', vars);
          addLog(state, 'log_ops_valve', vars, 'bad');
          return { ok: false, severity: 'danger', message: msg, msgKey: 'msg_ops_valve', msgVars: vars, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
        }

        state.streak += 1;
        const newlyIsolated =
          Object.keys(after.pipeStatus).filter((pid) => after.pipeStatus[pid] !== 'live').length -
          Object.keys(before.pipeStatus).filter((pid) => before.pipeStatus[pid] !== 'live').length;

        const key = newlyIsolated > 0 ? 'msg_valve_locked_hl' : 'msg_valve_locked';
        const msg = tr(key, { tag: dev.tag });
        addLog(state, 'log_valve_locked', { tag: dev.tag }, 'good');
        return { ok: true, severity: 'success', message: msg, msgKey: key, msgVars: { tag: dev.tag }, sound: 'lock', fx: { type: 'lock', x: dev.x, y: dev.y } };
      } else {
        // Attempt to unlock: ensure reopening won't pressurize an open vent/drain
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
          const vars = { drain: openDrainExposed.tag, tag: dev.tag };
          return { ok: false, severity: 'warning', message: tr('msg_close_drain_first', vars), msgKey: 'msg_close_drain_first', msgVars: vars, sound: 'warn' };
        }

        delete state.tagNumbers[dev.id];
        const msg = tr('msg_valve_unlocked', { tag: dev.tag });
        addLog(state, 'log_valve_unlocked', { tag: dev.tag }, 'info');
        return { ok: true, severity: 'info', message: msg, msgKey: 'msg_valve_unlocked', msgVars: { tag: dev.tag }, sound: 'unlock' };
      }
    }

    // 3. ELECTRICAL MCC BREAKER
    if (dev.kind === 'breaker') {
      const curr = state.devices[dev.id];
      if (curr === 'open') {
        // PROCESS SEQUENCING CHECK: Lube Oil Pump MUST stay running until Main Drive is locked out!
        if (dev.lubeRule && dev.requireOffBreaker && state.devices[dev.requireOffBreaker] !== 'locked') {
          const mainBrk = findDevice(level, dev.requireOffBreaker);
          const brkTag = mainBrk ? mainBrk.tag : dev.requireOffBreaker;
          applyPenalty(state, 15);
          const vars = { tag: dev.tag, breaker: brkTag, equip: dev.equipTag || 'K-701' };
          const title = tr('inc_lube_title');
          addLog(state, 'log_seq_block', { tag: dev.tag, title }, 'bad');
          return {
            ok: false,
            severity: 'danger',
            message: tr('inc_lube_body', vars),
            msgKey: 'inc_lube_body',
            msgVars: vars,
            sound: 'hazard',
            fx: { type: 'hazard', x: dev.x, y: dev.y },
            incident: buildIncident({
              prefix: 'inc_lube',
              fatal: false,
              penalty: 15,
              dev,
              mediumKey: 'med_electrical',
              rating: '4160V / 480V',
              vars
            })
          };
        }

        state.devices[dev.id] = 'locked';
        if (!state.tagNumbers[dev.id]) state.tagNumbers[dev.id] = state.nextTagNum++;
        const after = evaluate(level, state);

        if (after.keepLiveViolations.length > before.keepLiveViolations.length) {
          applyPenalty(state, 10);
          const violatedNames = after.keepLiveViolations.map((n) => n.label).join(', ');
          const vars = { tag: dev.tag, names: violatedNames };
          const msg = tr('msg_ops_breaker', vars);
          addLog(state, 'log_ops_breaker', vars, 'bad');
          return { ok: false, severity: 'danger', message: msg, msgKey: 'msg_ops_breaker', msgVars: vars, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
        }

        state.streak += 1;
        const msg = tr('msg_breaker_locked', { tag: dev.tag });
        addLog(state, 'log_breaker_locked', { tag: dev.tag }, 'good');
        return { ok: true, severity: 'success', message: msg, msgKey: 'msg_breaker_locked', msgVars: { tag: dev.tag }, sound: 'lock', fx: { type: 'lock', x: dev.x, y: dev.y } };
      } else {
        state.devices[dev.id] = 'open';
        delete state.tagNumbers[dev.id];
        evaluate(level, state);
        const msg = tr('msg_breaker_unlocked', { tag: dev.tag });
        addLog(state, 'log_breaker_unlocked', { tag: dev.tag }, 'info');
        return { ok: true, severity: 'info', message: msg, msgKey: 'msg_breaker_unlocked', msgVars: { tag: dev.tag }, sound: 'unlock' };
      }
    }

    // 4. SPECTACLE BLIND (POSITIVE ISOLATION)
    if (dev.kind === 'blind') {
      const curr = state.devices[dev.id];
      if (curr === 'open') {
        const connectedPipes = (level.pipes || []).filter((p) => p.from === dev.nodeId || p.to === dev.nodeId);
        const anyLive = connectedPipes.some((p) => before.pipeStatus[p.id] === 'live');
        if (anyLive) {
          applyPenalty(state, 25);
          const specs = getLineSpecs(level, dev.nodeId, before);
          const vars = { tag: dev.tag, psi: specs.pressure, size: specs.lineSize };
          const msg = tr('msg_blind_live', { tag: dev.tag });
          addLog(state, 'log_blind_live', { tag: dev.tag }, 'bad');
          return {
            ok: false,
            severity: 'danger',
            message: msg,
            msgKey: 'msg_blind_live',
            msgVars: { tag: dev.tag },
            sound: 'hazard',
            fx: { type: 'spray', x: dev.x, y: dev.y },
            incident: buildIncident({
              prefix: 'inc_live_blind',
              fatal: true,
              penalty: 25,
              dev,
              mediumKey: specs.mediumKey,
              rating: specs.rating,
              vars
            })
          };
        }
        const anyTrapped = connectedPipes.some((p) => before.pipeStatus[p.id] === 'isolated_trapped');
        if (anyTrapped) {
          applyPenalty(state, 10);
          const specs = getLineSpecs(level, dev.nodeId, before);
          const msg = tr('msg_blind_trapped', { tag: dev.tag });
          addLog(state, 'log_blind_trapped', { tag: dev.tag }, 'warn');
          return {
            ok: false,
            severity: 'warning',
            message: msg,
            msgKey: 'msg_blind_trapped',
            msgVars: { tag: dev.tag },
            sound: 'warn',
            fx: { type: 'warn', x: dev.x, y: dev.y },
            incident: buildIncident({
              prefix: 'inc_trapped_blind',
              fatal: false,
              penalty: 10,
              dev,
              mediumKey: specs.mediumKey,
              rating: specs.rating,
              vars: { tag: dev.tag }
            })
          };
        }

        state.devices[dev.id] = 'blinded';
        if (!state.tagNumbers[dev.id]) state.tagNumbers[dev.id] = state.nextTagNum++;
        state.streak += 1;
        const msg = tr('msg_blind_done', { tag: dev.tag });
        addLog(state, 'log_blind_done', { tag: dev.tag }, 'good');
        return { ok: true, severity: 'success', message: msg, msgKey: 'msg_blind_done', msgVars: { tag: dev.tag }, sound: 'blind', fx: { type: 'lock', x: dev.x, y: dev.y } };
      } else {
        state.devices[dev.id] = 'open';
        delete state.tagNumbers[dev.id];
        evaluate(level, state);
        addLog(state, 'log_blind_open', { tag: dev.tag }, 'info');
        return { ok: true, severity: 'info', message: tr('msg_blind_open', { tag: dev.tag }), msgKey: 'msg_blind_open', msgVars: { tag: dev.tag }, sound: 'unlock' };
      }
    }

    // 5. VENT / DRAIN / BLEED
    if (dev.kind === 'vent' || dev.kind === 'drain' || dev.kind === 'bleed') {
      const curr = state.devices[dev.id];
      if (curr === 'closed') {
        const st = before.nodeStatus[dev.attachNode];
        if (st && st.hasLiveFluid) {
          applyPenalty(state, 25);
          const specs = getLineSpecs(level, dev.attachNode, before);
          const psi = st.pressure || specs.pressure;
          const vars = { tag: dev.tag, psi, size: specs.lineSize, temp: specs.temp };
          const msg = tr('msg_vent_live', { tag: dev.tag, psi });
          addLog(state, 'log_vent_live', { tag: dev.tag, psi }, 'bad');

          let prefix = 'inc_live_vent_process';
          if (specs.energyType === 'steam') prefix = 'inc_live_vent_steam';
          else if (specs.energyType === 'gas') prefix = 'inc_live_vent_gas';

          return {
            ok: false,
            severity: 'danger',
            message: msg,
            msgKey: 'msg_vent_live',
            msgVars: { tag: dev.tag, psi },
            sound: 'hazard',
            fx: { type: 'spray', x: dev.x, y: dev.y },
            incident: buildIncident({
              prefix,
              fatal: true,
              penalty: 25,
              dev,
              mediumKey: specs.mediumKey,
              rating: `${specs.lineSize} · ${psi} PSI`,
              vars
            })
          };
        }

        state.devices[dev.id] = 'open';
        state.streak += 1;
        const after = evaluate(level, state);
        const afterNode = after.nodeStatus[dev.attachNode];
        const key = afterNode && afterNode.fullyVented ? 'msg_vent_green' : 'msg_vent_partial';
        const msg = tr(key, { tag: dev.tag });
        addLog(state, 'log_vent_open', { tag: dev.tag }, 'good');
        return { ok: true, severity: 'success', message: msg, msgKey: key, msgVars: { tag: dev.tag }, sound: 'vent', fx: { type: 'puff', x: dev.x, y: dev.y } };
      } else {
        state.devices[dev.id] = 'closed';
        addLog(state, 'log_vent_closed', { tag: dev.tag }, 'info');
        return { ok: true, severity: 'info', message: tr('msg_vent_closed', { tag: dev.tag }), msgKey: 'msg_vent_closed', msgVars: { tag: dev.tag }, sound: 'unlock' };
      }
    }

    // 6. TRYOUT: LOCAL START/STOP SWITCH (HOA)
    if (dev.kind === 'start_switch') {
      const st = before.nodeStatus[dev.attachNode];
      if (st && st.hasLiveElec) {
        applyPenalty(state, 15);
        const msg = tr('msg_switch_live', { tag: dev.tag });
        addLog(state, 'log_switch_live', { tag: dev.tag }, 'bad');
        return {
          ok: false,
          severity: 'danger',
          message: msg,
          msgKey: 'msg_switch_live',
          msgVars: { tag: dev.tag },
          sound: 'hazard',
          fx: { type: 'hazard', x: dev.x, y: dev.y },
          incident: buildIncident({
            prefix: 'inc_tryout_elec',
            fatal: false,
            penalty: 15,
            dev,
            mediumKey: 'med_electrical',
            rating: '480V / 4160V LIVE',
            vars: { tag: dev.tag }
          })
        };
      }
      if (!state.verified[dev.id]) {
        state.verified[dev.id] = true;
        state.streak += 1;
        addLog(state, 'log_switch_pass', { tag: dev.tag }, 'good');
      }
      return {
        ok: true,
        severity: 'success',
        message: tr('msg_switch_pass', { tag: dev.tag }),
        msgKey: 'msg_switch_pass',
        msgVars: { tag: dev.tag },
        sound: 'verify',
        fx: { type: 'verify', x: dev.x, y: dev.y }
      };
    }

    // 7. TRYOUT: PRESSURE GAUGE (PI)
    if (dev.kind === 'gauge') {
      const st = before.nodeStatus[dev.attachNode];
      if (st && st.hasLiveFluid) {
        applyPenalty(state, 10);
        const vars = { tag: dev.tag, psi: st.pressure };
        const msg = tr('msg_gauge_live', vars);
        addLog(state, 'log_gauge_live', vars, 'bad');
        return { ok: false, severity: 'danger', message: msg, msgKey: 'msg_gauge_live', msgVars: vars, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
      }
      if (st && st.pressure > 0) {
        applyPenalty(state, 5);
        const vars = { tag: dev.tag, psi: st.pressure };
        const msg = tr('msg_gauge_trapped', vars);
        addLog(state, 'log_gauge_trapped', vars, 'warn');
        return { ok: false, severity: 'warning', message: msg, msgKey: 'msg_gauge_trapped', msgVars: vars, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
      }
      if (!state.verified[dev.id]) {
        state.verified[dev.id] = true;
        state.streak += 1;
        addLog(state, 'log_gauge_pass', { tag: dev.tag }, 'good');
      }
      return {
        ok: true,
        severity: 'success',
        message: tr('msg_gauge_pass', { tag: dev.tag }),
        msgKey: 'msg_gauge_pass',
        msgVars: { tag: dev.tag },
        sound: 'verify',
        fx: { type: 'verify', x: dev.x, y: dev.y }
      };
    }

    // 8. TRYOUT: ATMOSPHERIC GAS MONITOR (CONFINED SPACE)
    if (dev.kind === 'gas_detector') {
      if (!before.allTargetsIsolated || !before.allBlindsInstalled || !before.allVentsDrainsOpen) {
        applyPenalty(state, 5);
        const msg = tr('msg_gas_fail', { tag: dev.tag });
        addLog(state, 'log_gas_fail', { tag: dev.tag }, 'warn');
        return { ok: false, severity: 'warning', message: msg, msgKey: 'msg_gas_fail', msgVars: { tag: dev.tag }, sound: 'warn', fx: { type: 'warn', x: dev.x, y: dev.y } };
      }
      if (!state.verified[dev.id]) {
        state.verified[dev.id] = true;
        state.streak += 1;
        addLog(state, 'log_gas_pass', { tag: dev.tag }, 'good');
      }
      return {
        ok: true,
        severity: 'success',
        message: tr('msg_gas_pass', { tag: dev.tag }),
        msgKey: 'msg_gas_pass',
        msgVars: { tag: dev.tag },
        sound: 'verify',
        fx: { type: 'verify', x: dev.x, y: dev.y }
      };
    }

    return { ok: false, severity: 'info', message: '' };
  }

  /**
   * Sequence-aware smart hint finder.
   * Respects real-world operating order (motors off first, hot before cold, etc.).
   */
  function getHint(level, state, evalRes) {
    if (evalRes.keepLiveViolations.length > 0) {
      const wrongLocked = (level.devices || []).find(
        (d) => (d.kind === 'valve' || d.kind === 'breaker') && state.devices[d.id] === 'locked' && d.keepLiveTrap
      );
      if (wrongLocked) {
        return {
          deviceId: wrongLocked.id,
          msgKey: 'hint_unlock_kl',
          msgVars: { tag: wrongLocked.tag },
          message: tr('hint_unlock_kl', { tag: wrongLocked.tag })
        };
      }
    }

    // Find next eligible required isolation valve/breaker in proper safe sequence order
    const openRequiredIso = (level.devices || []).filter(
      (d) =>
        (d.kind === 'valve' || d.kind === 'breaker') &&
        d.required === true &&
        state.devices[d.id] !== 'locked'
    );

    if (openRequiredIso.length > 0) {
      const eligible = openRequiredIso.filter((d) => {
        if (d.requireOffBreaker && state.devices[d.requireOffBreaker] !== 'locked') return false;
        if (Array.isArray(d.requireLockedAll) && d.requireLockedAll.some((vid) => state.devices[vid] !== 'locked')) return false;
        return true;
      });
      const pool = eligible.length > 0 ? eligible : openRequiredIso;
      pool.sort((a, b) => {
        const oa = a.seqOrder != null ? a.seqOrder : (a.kind === 'breaker' ? 1 : 50);
        const ob = b.seqOrder != null ? b.seqOrder : (b.kind === 'breaker' ? 1 : 50);
        return oa - ob;
      });
      const nextIso = pool[0];
      const desc = LOTOTO.i18n ? LOTOTO.i18n.getDeviceDesc(nextIso) : (nextIso.desc || nextIso.kind);
      return {
        deviceId: nextIso.id,
        msgKey: 'hint_lock',
        msgVars: { tag: nextIso.tag, desc },
        message: tr('hint_lock', { tag: nextIso.tag, desc })
      };
    }

    const nextVent = (level.devices || []).find(
      (d) =>
        (d.kind === 'vent' || d.kind === 'drain' || d.kind === 'bleed') &&
        d.required !== false &&
        state.devices[d.id] !== 'open'
    );
    if (nextVent) {
      return {
        deviceId: nextVent.id,
        msgKey: 'hint_vent',
        msgVars: { tag: nextVent.tag },
        message: tr('hint_vent', { tag: nextVent.tag })
      };
    }

    const nextBlind = (level.devices || []).find(
      (d) => d.kind === 'blind' && d.required !== false && state.devices[d.id] !== 'blinded'
    );
    if (nextBlind) {
      return {
        deviceId: nextBlind.id,
        msgKey: 'hint_blind',
        msgVars: { tag: nextBlind.tag },
        message: tr('hint_blind', { tag: nextBlind.tag })
      };
    }

    const nextTryout = (level.devices || []).find(
      (d) => (d.kind === 'start_switch' || d.kind === 'gauge' || d.kind === 'gas_detector') && !state.verified[d.id]
    );
    if (nextTryout) {
      return {
        deviceId: nextTryout.id,
        msgKey: 'hint_tryout',
        msgVars: { tag: nextTryout.tag },
        message: tr('hint_tryout', { tag: nextTryout.tag })
      };
    }

    return {
      deviceId: null,
      msgKey: 'hint_permit',
      msgVars: {},
      message: tr('hint_permit')
    };
  }

  /**
   * Returns true if clicking deviceId would apply a valid first lock/blind
   * and the player has not yet completed their Master DANGER LOTO Tag on this level.
   */
  function needsTagPrompt(level, state, deviceId) {
    if (!state.requireTag || state.tagInfo) return false;
    const dev = findDevice(level, deviceId);
    if (!dev) return false;
    if (dev.kind === 'valve') {
      if (state.devices[dev.id] !== 'open') return false;
      if (dev.requireOffBreaker && state.devices[dev.requireOffBreaker] !== 'locked') return false;
      if (Array.isArray(dev.requireLockedAll) && dev.requireLockedAll.some((vid) => state.devices[vid] !== 'locked')) return false;
      if (dev.keepLiveTrap) return false;
      return true;
    }
    if (dev.kind === 'breaker') {
      if (state.devices[dev.id] !== 'open') return false;
      if (dev.lubeRule && dev.requireOffBreaker && state.devices[dev.requireOffBreaker] !== 'locked') return false;
      if (dev.keepLiveTrap) return false;
      return true;
    }
    return false;
  }

  LOTOTO.engine = {
    createInitialState,
    evaluate,
    interact,
    getHint,
    isBarrierBlocked,
    needsTagPrompt
  };
})(window);
