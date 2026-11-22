/* ==========================================================================
   LOTOTO MASTER — Interactive SVG P&ID Renderer
   Modern bright training schematic with animated live streams, highlighter-pen
   isolation markups, tactile locks/tags, live pressure gauges & action FX.
   ========================================================================== */
(function (global) {
  'use strict';

  const LOTOTO = (global.LOTOTO = global.LOTOTO || {});
  const SVG_NS = 'http://www.w3.org/2000/svg';

  const STREAM_COLORS = {
    process:    { base: '#0284c7', dash: '#7dd3fc', badgeBg: '#e0f2fe', badgeText: '#0369a1' },
    steam:      { base: '#ea580c', dash: '#fed7aa', badgeBg: '#ffedd5', badgeText: '#c2410c' },
    water:      { base: '#06b6d4', dash: '#a5f3fc', badgeBg: '#cffafe', badgeText: '#0e7490' },
    gas:        { base: '#7c3aed', dash: '#ddd6fe', badgeBg: '#ede9fe', badgeText: '#6d28d9' },
    gravity:    { base: '#0d9488', dash: '#99f6e4', badgeBg: '#ccfbf1', badgeText: '#0f766e' },
    electrical: { base: '#ca8a04', dash: '#fef08a', badgeBg: '#fef9c3', badgeText: '#a16207' }
  };

  function el(tag, attrs = {}, textContent = null) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const key in attrs) {
      if (attrs[key] !== undefined && attrs[key] !== null) {
        node.setAttribute(key, String(attrs[key]));
      }
    }
    if (textContent !== null) {
      node.textContent = textContent;
    }
    return node;
  }

  function pointsToPath(pts) {
    return pts.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  }

  function tr(key, vars) {
    return LOTOTO.i18n ? LOTOTO.i18n.t(key, vars) : key;
  }

  function render(svgEl, level, state, evalRes, options = {}) {
    const { onInteract, onHover, onLeave, hintDeviceId, activeFx } = options;
    svgEl.innerHTML = '';

    // Defs (dot grid pattern, drop shadows, highlighter glow)
    const defs = el('defs');
    const pattern = el('pattern', { id: 'pidGrid', width: 24, height: 24, patternUnits: 'userSpaceOnUse' });
    pattern.appendChild(el('circle', { cx: 2, cy: 2, r: 1.2, fill: '#cbd5e1' }));
    defs.appendChild(pattern);

    const hlFilter = el('filter', { id: 'hlGlow', x: '-20%', y: '-20%', width: '140%', height: '140%' });
    hlFilter.appendChild(el('feGaussianBlur', { stdDeviation: 2.5, result: 'blur' }));
    const merge = el('feMerge');
    merge.appendChild(el('feMergeNode', { in: 'blur' }));
    merge.appendChild(el('feMergeNode', { in: 'SourceGraphic' }));
    hlFilter.appendChild(merge);
    defs.appendChild(hlFilter);

    svgEl.appendChild(defs);

    // Layer 0: Clean Bright Engineering Sheet Background
    const bgGroup = el('g', { class: 'layer-bg' });
    bgGroup.appendChild(el('rect', { x: 0, y: 0, width: 1000, height: 580, fill: '#f8fafc' }));
    bgGroup.appendChild(el('rect', { x: 0, y: 0, width: 1000, height: 580, fill: 'url(#pidGrid)' }));
    bgGroup.appendChild(el('rect', {
      x: 10, y: 10, width: 980, height: 560, rx: 14,
      fill: 'none', stroke: '#cbd5e1', 'stroke-width': 2
    }));
    // Engineering Sheet Corner Stamp
    bgGroup.appendChild(el('rect', {
      x: 742, y: 542, width: 238, height: 22, rx: 6,
      fill: '#ffffff', stroke: '#cbd5e1', 'stroke-width': 1.2
    }));
    bgGroup.appendChild(el('text', {
      x: 861, y: 557, 'text-anchor': 'middle',
      'font-family': 'JetBrains Mono, monospace', 'font-size': 9.5, 'font-weight': 800, fill: '#64748b'
    }, tr('svg_stamp', { num: String(level.id).padStart(2, '0') })));
    svgEl.appendChild(bgGroup);

    // Layer 1: Multi-Compartment Equipment Frames (Exchangers, Reactors, Compressors, Tanks)
    const frameGroup = el('g', { class: 'layer-frames' });
    (level.equipmentFrames || []).forEach((fr) => {
      // Determine if all target nodes inside this frame are isolated & zero energy
      const insideTargets = (level.nodes || []).filter(
        (n) => n.isTarget && n.x >= fr.x && n.x <= fr.x + fr.w && n.y >= fr.y && n.y <= fr.y + fr.h
      );
      const allIso = insideTargets.length > 0 && insideTargets.every((n) => evalRes.nodeStatus[n.id].isolated);
      const allZero = allIso && insideTargets.every((n) => evalRes.nodeStatus[n.id].pressure === 0 && evalRes.nodeStatus[n.id].fullyVented);

      let frameFill = '#ffffff';
      let frameStroke = '#334155';
      if (allZero) {
        frameFill = '#ecfdf5';
        frameStroke = '#16a34a';
      } else if (allIso) {
        frameFill = '#fefce8';
        frameStroke = '#ca8a04';
      }

      if (allIso) {
        frameGroup.appendChild(el('rect', {
          x: fr.x - 7, y: fr.y - 7, width: fr.w + 14, height: fr.h + 14, rx: 22,
          fill: allZero ? 'rgba(74, 222, 128, 0.28)' : 'rgba(250, 204, 21, 0.34)',
          filter: 'url(#hlGlow)'
        }));
      }

      frameGroup.appendChild(el('rect', {
        x: fr.x, y: fr.y, width: fr.w, height: fr.h, rx: 16,
        fill: frameFill, stroke: frameStroke, 'stroke-width': 3,
        'stroke-dasharray': fr.kind === 'compressor' ? '8 4' : null
      }));

      // Frame Title Tag
      frameGroup.appendChild(el('rect', {
        x: fr.x + 12, y: fr.y - 12, width: fr.w - 24, height: 22, rx: 8,
        fill: allZero ? '#16a34a' : '#1e293b'
      }));
      frameGroup.appendChild(el('text', {
        x: fr.x + fr.w / 2, y: fr.y + 3, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 10, 'font-weight': 800, fill: '#ffffff'
      }, fr.label));
    });
    svgEl.appendChild(frameGroup);

    // Layer 2: P&ID HIGHLIGHTER MARKUP UNDERLAY (Yellow = Isolated Trapped, Green = Isolated Zero Energy)
    // Uses dual-stroke marker rendering (no objectBoundingBox SVG filter, so straight H/V pipes never clip!)
    const hlGroup = el('g', { class: 'layer-highlighter' });
    (level.pipes || []).forEach((p) => {
      const status = evalRes.pipeStatus[p.id];
      if (!status || status === 'live') return;
      const d = pointsToPath(p.points);

      let outerColor = 'rgba(250, 204, 21, 0.28)';
      let innerColor = 'rgba(250, 204, 21, 0.62)';
      let cls = 'hl-stroke-trapped';
      if (status === 'isolated_zero') {
        outerColor = 'rgba(74, 222, 128, 0.26)';
        innerColor = 'rgba(74, 222, 128, 0.56)';
        cls = '';
      } else if (status === 'isolated_partial') {
        outerColor = 'rgba(163, 230, 53, 0.28)';
        innerColor = 'rgba(163, 230, 53, 0.58)';
        cls = 'hl-stroke-trapped';
      }

      hlGroup.appendChild(el('path', {
        d,
        fill: 'none',
        stroke: outerColor,
        'stroke-width': 30,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        class: cls
      }));
      hlGroup.appendChild(el('path', {
        d,
        fill: 'none',
        stroke: innerColor,
        'stroke-width': 19,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        class: cls
      }));
    });
    svgEl.appendChild(hlGroup);

    // Layer 3: Pipes & Animated Flow Lines
    const pipeGroup = el('g', { class: 'layer-pipes' });
    (level.pipes || []).forEach((p) => {
      const status = evalRes.pipeStatus[p.id] || 'live';
      const sc = STREAM_COLORS[p.energyType] || STREAM_COLORS.process;
      const d = pointsToPath(p.points);
      const isElec = p.energyType === 'electrical';

      if (status === 'live') {
        // Outer pipe wall
        pipeGroup.appendChild(el('path', {
          d, fill: 'none', stroke: sc.base,
          'stroke-width': isElec ? 5.5 : 7.5,
          'stroke-linecap': 'round', 'stroke-linejoin': 'round',
          'stroke-dasharray': isElec ? '10 5' : null
        }));
        // Animated flowing inner dashes
        pipeGroup.appendChild(el('path', {
          d, fill: 'none', stroke: sc.dash,
          'stroke-width': isElec ? 2.5 : 3.2,
          'stroke-linecap': 'round', 'stroke-linejoin': 'round',
          'stroke-dasharray': isElec ? '6 8' : '9 19',
          class: isElec ? 'flow-anim-fast' : 'flow-anim'
        }));
      } else {
        // Isolated pipe — crisp static stroke over highlighter pen markup!
        const isoStroke = status === 'isolated_zero' ? '#15803d' : '#a16207';
        pipeGroup.appendChild(el('path', {
          d, fill: 'none', stroke: isoStroke,
          'stroke-width': isElec ? 4.5 : 6,
          'stroke-linecap': 'round', 'stroke-linejoin': 'round',
          'stroke-dasharray': isElec ? '8 6' : null
        }));
      }
    });

    // Junction tees
    (level.nodes || []).forEach((n) => {
      if (n.type !== 'junction') return;
      const st = evalRes.nodeStatus[n.id];
      pipeGroup.appendChild(el('circle', {
        cx: n.x, cy: n.y, r: 5.5,
        fill: st && st.hasAnyLive ? '#1e293b' : '#15803d',
        stroke: '#ffffff', 'stroke-width': 1.5
      }));
    });
    svgEl.appendChild(pipeGroup);

    // Layer 4: Attached Device Tap/Impulse Stems
    const stemGroup = el('g', { class: 'layer-stems' });
    (level.devices || []).forEach((dev) => {
      if (!dev.stemTo) return;
      const isInstrument = dev.kind === 'gauge' || dev.kind === 'start_switch' || dev.kind === 'gas_detector';
      const isOpenVent = (dev.kind === 'vent' || dev.kind === 'drain' || dev.kind === 'bleed') && state.devices[dev.id] === 'open';
      stemGroup.appendChild(el('line', {
        x1: dev.stemTo[0], y1: dev.stemTo[1], x2: dev.x, y2: dev.y,
        stroke: isOpenVent ? '#16a34a' : isInstrument ? '#64748b' : '#475569',
        'stroke-width': isInstrument ? 2 : 3.5,
        'stroke-dasharray': isInstrument ? '5 4' : null,
        'stroke-linecap': 'round'
      }));
    });
    svgEl.appendChild(stemGroup);

    // Layer 5: Equipment Nodes (Sources, Sinks, Pumps, Vessels, Strainers, Chambers)
    const equipGroup = el('g', { class: 'layer-equip' });
    (level.nodes || []).forEach((n) => {
      if (n.type === 'inline' || n.type === 'junction') return;
      const st = evalRes.nodeStatus[n.id] || {};
      const isKeepLiveViolated = evalRes.keepLiveViolations.some((k) => k.id === n.id);
      equipGroup.appendChild(drawEquipmentNode(n, st, isKeepLiveViolated));
    });
    svgEl.appendChild(equipGroup);

    // Layer 6: Interactive Devices (Valves, Breakers, Blinds, Traps, Vents/Drains, Gauges, Switches)
    const devGroup = el('g', { class: 'layer-devices' });
    (level.devices || []).forEach((dev) => {
      const g = drawDevice(dev, state, evalRes);
      g.classList.add('pid-interactive');
      g.addEventListener('click', (e) => {
        e.stopPropagation();
        if (onInteract) onInteract(dev.id);
      });
      g.addEventListener('mouseenter', (e) => {
        if (onHover) onHover(dev, e);
      });
      g.addEventListener('mousemove', (e) => {
        if (onHover) onHover(dev, e);
      });
      g.addEventListener('mouseleave', () => {
        if (onLeave) onLeave();
      });
      devGroup.appendChild(g);
    });
    svgEl.appendChild(devGroup);

    // Layer 7: Hint Ring & Action FX
    const fxGroup = el('g', { class: 'layer-fx', 'pointer-events': 'none' });
    if (hintDeviceId) {
      const hDev = (level.devices || []).find((d) => d.id === hintDeviceId);
      if (hDev) {
        fxGroup.appendChild(el('circle', { cx: hDev.x, cy: hDev.y, r: 34, class: 'hint-ring' }));
      }
    }

    if (activeFx) {
      fxGroup.appendChild(drawFx(activeFx));
    }
    svgEl.appendChild(fxGroup);
  }

  function drawEquipmentNode(n, st, keepLiveViolated) {
    const g = el('g', { transform: `translate(${n.x}, ${n.y})` });

    // Source & Sink Header Pills
    if (n.type === 'source' || n.type === 'sink') {
      const sc = STREAM_COLORS[n.energyType] || STREAM_COLORS.process;
      const w = 114;
      const h = 46;
      g.appendChild(el('rect', {
        x: -w / 2, y: -h / 2, width: w, height: h, rx: 11,
        fill: n.isSource ? sc.badgeBg : '#f1f5f9',
        stroke: n.isSource ? sc.base : '#64748b',
        'stroke-width': 2.5
      }));
      // Small live dot
      if (n.isSource) {
        g.appendChild(el('circle', { cx: -w / 2 + 12, cy: -8, r: 4, fill: sc.base }));
      }
      g.appendChild(el('text', {
        x: n.isSource ? 4 : 0, y: -4, 'text-anchor': 'middle',
        'font-family': 'Plus Jakarta Sans, sans-serif', 'font-size': 10.5, 'font-weight': 800,
        fill: n.isSource ? sc.badgeText : '#334155'
      }, n.label));
      if (n.sublabel) {
        g.appendChild(el('text', {
          x: 0, y: 12, 'text-anchor': 'middle',
          'font-family': 'JetBrains Mono, monospace', 'font-size': 8.5, 'font-weight': 700,
          fill: '#475569'
        }, n.sublabel));
      }
      return g;
    }

    // Target / Keep-Live Status Colors
    const isIsoZero = st.isolated && st.pressure === 0 && st.fullyVented;
    const isIsoTrap = st.isolated && !isIsoZero;

    let bodyFill = '#ffffff';
    let bodyStroke = '#1e293b';
    if (keepLiveViolated) {
      bodyFill = '#fee2e2';
      bodyStroke = '#dc2626';
    } else if (n.mustStayLive) {
      bodyFill = '#eff6ff';
      bodyStroke = '#0284c7';
    } else if (isIsoZero) {
      bodyFill = '#dcfce7';
      bodyStroke = '#16a34a';
    } else if (isIsoTrap) {
      bodyFill = '#fef9c3';
      bodyStroke = '#ca8a04';
    }

    // Highlighter halo around target equipment when isolated!
    if (n.isTarget && st.isolated && n.type !== 'chamber') {
      g.appendChild(el('circle', {
        r: n.type === 'vessel' ? 56 : 44,
        fill: isIsoZero ? 'rgba(74, 222, 128, 0.36)' : 'rgba(250, 204, 21, 0.44)',
        filter: 'url(#hlGlow)'
      }));
    }

    if (n.type === 'pump') {
      g.appendChild(el('circle', { r: 31, fill: bodyFill, stroke: bodyStroke, 'stroke-width': 3.2 }));
      // Spinning impeller blades when live!
      const imp = el('g', { class: st.hasAnyLive && !keepLiveViolated ? 'spin-live' : '' });
      imp.appendChild(el('polygon', {
        points: '-11,-14 16,0 -11,14',
        fill: keepLiveViolated ? '#ef4444' : isIsoZero ? '#16a34a' : '#0284c7',
        opacity: 0.9
      }));
      imp.appendChild(el('circle', { r: 5, fill: '#ffffff', stroke: bodyStroke, 'stroke-width': 1.8 }));
      g.appendChild(imp);

      // Label plate
      g.appendChild(el('rect', {
        x: -38, y: 36, width: 76, height: 22, rx: 7,
        fill: keepLiveViolated ? '#dc2626' : isIsoZero ? '#16a34a' : n.mustStayLive ? '#0284c7' : '#0f172a'
      }));
      g.appendChild(el('text', {
        x: 0, y: 51, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 10.5, 'font-weight': 800, fill: '#ffffff'
      }, keepLiveViolated ? tr('svg_starved') : isIsoZero ? `${n.label} ✓` : n.label));
      if (n.sublabel) {
        g.appendChild(el('text', {
          x: 0, y: 71, 'text-anchor': 'middle',
          'font-family': 'Plus Jakarta Sans, sans-serif', 'font-size': 9.5, 'font-weight': 700,
          fill: keepLiveViolated ? '#dc2626' : n.mustStayLive ? '#0284c7' : '#475569'
        }, n.sublabel));
      }
      return g;
    }

    if (n.type === 'strainer') {
      g.appendChild(el('rect', { x: -46, y: -32, width: 92, height: 64, rx: 14, fill: bodyFill, stroke: bodyStroke, 'stroke-width': 3.2 }));
      // Mesh lines
      for (let mx = -28; mx <= 28; mx += 14) {
        g.appendChild(el('line', { x1: mx, y1: -22, x2: mx, y2: 22, stroke: bodyStroke, 'stroke-width': 1.6, 'stroke-dasharray': '4 3', opacity: 0.45 }));
      }
      g.appendChild(el('text', {
        x: 0, y: -2, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 12.5, 'font-weight': 800, fill: '#0f172a'
      }, n.label));
      g.appendChild(el('text', {
        x: 0, y: 14, 'text-anchor': 'middle',
        'font-family': 'Plus Jakarta Sans, sans-serif', 'font-size': 9.5, 'font-weight': 700, fill: '#475569'
      }, n.sublabel || 'Strainer'));
      return g;
    }

    if (n.type === 'vessel') {
      g.appendChild(el('rect', { x: -54, y: -62, width: 108, height: 124, rx: 32, fill: bodyFill, stroke: bodyStroke, 'stroke-width': 3.4 }));
      // Liquid level wave when pressurized
      if (st.hasLiveFluid || st.pressure > 0) {
        g.appendChild(el('rect', {
          x: -48, y: 6, width: 96, height: 50, rx: 24,
          fill: st.hasLiveFluid ? 'rgba(2, 132, 199, 0.2)' : 'rgba(250, 204, 21, 0.35)'
        }));
      }
      g.appendChild(el('text', {
        x: 0, y: -8, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 13.5, 'font-weight': 800, fill: '#0f172a'
      }, isIsoZero ? `${n.label} ✓` : n.label));
      g.appendChild(el('text', {
        x: 0, y: 10, 'text-anchor': 'middle',
        'font-family': 'Plus Jakarta Sans, sans-serif', 'font-size': 9.5, 'font-weight': 700, fill: '#475569'
      }, n.sublabel || 'Vessel'));
      return g;
    }

    if (n.type === 'meter') {
      g.appendChild(el('circle', { r: 38, fill: bodyFill, stroke: bodyStroke, 'stroke-width': 3.2 }));
      g.appendChild(el('circle', { r: 31, fill: 'none', stroke: bodyStroke, 'stroke-width': 1.2, 'stroke-dasharray': '4 3', opacity: 0.35 }));
      g.appendChild(el('text', {
        x: 0, y: -3, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 13, 'font-weight': 800, fill: '#0f172a'
      }, isIsoZero ? `${n.label} ✓` : n.label));
      g.appendChild(el('text', {
        x: 0, y: 12, 'text-anchor': 'middle',
        'font-family': 'Plus Jakarta Sans, sans-serif', 'font-size': 8.2, 'font-weight': 800, fill: '#475569'
      }, tr('svg_hp_meter')));
      return g;
    }

    if (n.type === 'reactor_core' || n.type === 'compressor_core' || n.type === 'tank_core' || n.type === 'chamber') {
      const w = n.type === 'chamber' ? 128 : 136;
      const h = n.type === 'chamber' ? 38 : 54;
      g.appendChild(el('rect', {
        x: -w / 2, y: -h / 2, width: w, height: h, rx: 11,
        fill: bodyFill, stroke: bodyStroke, 'stroke-width': 2.5
      }));

      // Spinning agitator / rotor indicator when electrical live
      if (st.hasLiveElec) {
        const spinG = el('g', { transform: `translate(${-w / 2 + 20}, 0)` });
        const rotor = el('g', { class: 'spin-live' });
        rotor.appendChild(el('line', { x1: -8, y1: 0, x2: 8, y2: 0, stroke: '#ca8a04', 'stroke-width': 3, 'stroke-linecap': 'round' }));
        rotor.appendChild(el('line', { x1: 0, y1: -8, x2: 0, y2: 8, stroke: '#ca8a04', 'stroke-width': 3, 'stroke-linecap': 'round' }));
        spinG.appendChild(rotor);
        g.appendChild(spinG);
      }

      g.appendChild(el('text', {
        x: st.hasLiveElec ? 8 : 0, y: -2, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 11, 'font-weight': 800,
        fill: isIsoZero ? '#15803d' : '#0f172a'
      }, isIsoZero ? `${n.label} ✓` : n.label));
      if (n.sublabel) {
        g.appendChild(el('text', {
          x: st.hasLiveElec ? 8 : 0, y: 12, 'text-anchor': 'middle',
          'font-family': 'Plus Jakarta Sans, sans-serif', 'font-size': 9, 'font-weight': 700, fill: '#475569'
        }, n.sublabel));
      }
      return g;
    }

    return g;
  }

  function drawPadlockBadge(x, y, tagNum) {
    const g = el('g', { transform: `translate(${x}, ${y})` });
    // Mini international DANGER LOTO tag hanging slightly right
    g.appendChild(el('rect', { x: 4, y: -5, width: 17, height: 18, rx: 2.5, fill: '#ffffff', stroke: '#0f172a', 'stroke-width': 1.3 }));
    g.appendChild(el('rect', { x: 4.6, y: -4.4, width: 15.8, height: 5.5, rx: 1.5, fill: '#dc2626' }));
    if (tagNum) {
      g.appendChild(el('text', {
        x: 12.5, y: 9.5, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 7.4, 'font-weight': 800, fill: '#0f172a'
      }, `#${tagNum}`));
    } else {
      g.appendChild(el('line', { x1: 7, y1: 5, x2: 18, y2: 5, stroke: '#475569', 'stroke-width': 1.2 }));
      g.appendChild(el('line', { x1: 7, y1: 9, x2: 16, y2: 9, stroke: '#475569', 'stroke-width': 1.2 }));
    }
    // Red Padlock
    g.appendChild(el('path', {
      d: 'M -7,-5 V -9 A 5,5 0 0 1 3,-9 V -5',
      fill: 'none', stroke: '#1e293b', 'stroke-width': 2.2, 'stroke-linecap': 'round'
    }));
    g.appendChild(el('rect', { x: -10, y: -5, width: 16, height: 13, rx: 3, fill: '#ef4444', stroke: '#1e293b', 'stroke-width': 1.7 }));
    g.appendChild(el('circle', { cx: -2, cy: 1.5, r: 2, fill: '#fef08a' }));
    return g;
  }

  function drawDevice(dev, state, evalRes) {
    const g = el('g', { transform: `translate(${dev.x}, ${dev.y})` });
    // Generous invisible click target
    g.appendChild(el('circle', { r: 28, fill: 'transparent' }));

    // 1. MANUAL BLOCK VALVE
    if (dev.kind === 'valve') {
      const isLocked = state.devices[dev.id] === 'locked';
      const fill = isLocked ? '#ef4444' : '#ffffff';
      const stroke = isLocked ? '#991b1b' : '#1e293b';
      const rot = dev.orient === 'v' ? 90 : 0;

      const body = el('g', { transform: `rotate(${rot})` });
      // Handwheel stem
      body.appendChild(el('line', { x1: 0, y1: 0, x2: 0, y2: -19, stroke: stroke, 'stroke-width': 2.5 }));
      body.appendChild(el('line', { x1: -11, y1: -19, x2: 11, y2: -19, stroke: isLocked ? '#ef4444' : '#0284c7', 'stroke-width': 4, 'stroke-linecap': 'round' }));
      // Bowtie triangles
      body.appendChild(el('polygon', { points: '-17,-11 0,0 -17,11', fill, stroke, 'stroke-width': 2.4, 'stroke-linejoin': 'round' }));
      body.appendChild(el('polygon', { points: '17,-11 0,0 17,11', fill, stroke, 'stroke-width': 2.4, 'stroke-linejoin': 'round' }));
      if (dev.valveType === 'ball' || dev.valveType === 'globe') {
        body.appendChild(el('circle', { r: 5.5, fill: isLocked ? '#991b1b' : '#0f172a' }));
      }
      g.appendChild(body);

      if (isLocked) {
        const tNum = state.tagNumbers && state.tagNumbers[dev.id];
        g.appendChild(drawPadlockBadge(dev.orient === 'v' ? 24 : 2, dev.orient === 'v' ? -4 : -28, tNum));
      }

      // Tag label pill
      const ly = dev.orient === 'v' ? 5 : 27;
      const lx = dev.orient === 'v' ? -40 : 0;
      g.appendChild(el('rect', {
        x: lx - 26, y: ly - 10, width: 52, height: 17, rx: 5,
        fill: isLocked ? '#fee2e2' : '#ffffff',
        stroke: isLocked ? '#ef4444' : '#cbd5e1', 'stroke-width': 1.4
      }));
      g.appendChild(el('text', {
        x: lx, y: ly + 2, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 9.5, 'font-weight': 800,
        fill: isLocked ? '#991b1b' : '#0f172a'
      }, dev.tag));
      return g;
    }

    // 2. ELECTRICAL MCC BREAKER
    if (dev.kind === 'breaker') {
      const isLocked = state.devices[dev.id] === 'locked';
      g.appendChild(el('rect', {
        x: -24, y: -20, width: 48, height: 40, rx: 8,
        fill: isLocked ? '#fee2e2' : '#fef9c3',
        stroke: isLocked ? '#dc2626' : '#ca8a04', 'stroke-width': 2.5
      }));
      // Switch blade
      g.appendChild(el('circle', { cx: -11, cy: 4, r: 3.5, fill: '#1e293b' }));
      g.appendChild(el('circle', { cx: 11, cy: 4, r: 3.5, fill: '#1e293b' }));
      if (isLocked) {
        // Open switch blade
        g.appendChild(el('line', { x1: -11, y1: 4, x2: 7, y2: -10, stroke: '#dc2626', 'stroke-width': 3.2, 'stroke-linecap': 'round' }));
        g.appendChild(drawPadlockBadge(18, -18, state.tagNumbers && state.tagNumbers[dev.id]));
      } else {
        // Closed energized blade
        g.appendChild(el('line', { x1: -11, y1: 4, x2: 11, y2: 4, stroke: '#ca8a04', 'stroke-width': 3.5, 'stroke-linecap': 'round' }));
        g.appendChild(el('text', { x: 0, y: -4, 'text-anchor': 'middle', 'font-size': 11 }, '⚡'));
      }
      g.appendChild(el('rect', {
        x: -31, y: 23, width: 62, height: 16, rx: 5,
        fill: isLocked ? '#dc2626' : '#854d0e'
      }));
      g.appendChild(el('text', {
        x: 0, y: 34, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 9, 'font-weight': 800, fill: '#ffffff'
      }, dev.tag));
      return g;
    }

    // 3. SPECTACLE BLIND
    if (dev.kind === 'blind') {
      const isBlinded = state.devices[dev.id] === 'blinded';
      // Figure-8 vertical spectacle
      g.appendChild(el('line', { x1: 0, y1: -18, x2: 0, y2: 18, stroke: '#1e293b', 'stroke-width': 4 }));
      if (isBlinded) {
        // Solid red/dark disc on the pipe (y=0), open ring up top (y=-20)
        g.appendChild(el('circle', { cx: 0, cy: -21, r: 9, fill: '#ffffff', stroke: '#64748b', 'stroke-width': 2.5 }));
        g.appendChild(el('circle', { cx: 0, cy: 0, r: 12, fill: '#dc2626', stroke: '#1e293b', 'stroke-width': 2.5 }));
        g.appendChild(el('line', { x1: -6, y1: -6, x2: 6, y2: 6, stroke: '#ffffff', 'stroke-width': 2.2 }));
        g.appendChild(el('line', { x1: 6, y1: -6, x2: -6, y2: 6, stroke: '#ffffff', 'stroke-width': 2.2 }));
        g.appendChild(drawPadlockBadge(16, -24, state.tagNumbers && state.tagNumbers[dev.id]));
      } else {
        // Open ring on pipe (y=0), solid disc hanging above (y=-21)
        g.appendChild(el('circle', { cx: 0, cy: -21, r: 10, fill: '#475569', stroke: '#1e293b', 'stroke-width': 2.2 }));
        g.appendChild(el('circle', { cx: 0, cy: 0, r: 11, fill: '#ffffff', stroke: '#0f172a', 'stroke-width': 3 }));
        g.appendChild(el('circle', { cx: 0, cy: 0, r: 5, fill: '#e0f2fe' }));
      }
      g.appendChild(el('rect', {
        x: -30, y: 17, width: 60, height: 17, rx: 5,
        fill: isBlinded ? '#dcfce7' : '#fef3c7',
        stroke: isBlinded ? '#16a34a' : '#d97706', 'stroke-width': 1.5
      }));
      g.appendChild(el('text', {
        x: 0, y: 29, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 9, 'font-weight': 800,
        fill: isBlinded ? '#15803d' : '#92400e'
      }, isBlinded ? `${dev.tag} ✓` : dev.tag));
      return g;
    }

    // 4. CONTROL VALVE (TRAP)
    if (dev.kind === 'control_valve') {
      g.appendChild(el('line', { x1: 0, y1: 0, x2: 0, y2: -18, stroke: '#6d28d9', 'stroke-width': 2.6 }));
      // Pneumatic dome diaphragm actuator
      g.appendChild(el('path', {
        d: 'M -15,-18 A 15,13 0 0 1 15,-18 Z',
        fill: '#ede9fe', stroke: '#6d28d9', 'stroke-width': 2.3
      }));
      g.appendChild(el('polygon', { points: '-16,-10 0,0 -16,10', fill: '#ddd6fe', stroke: '#5b21b6', 'stroke-width': 2.3 }));
      g.appendChild(el('polygon', { points: '16,-10 0,0 16,10', fill: '#ddd6fe', stroke: '#5b21b6', 'stroke-width': 2.3 }));
      g.appendChild(el('rect', { x: -28, y: 16, width: 56, height: 17, rx: 5, fill: '#ede9fe', stroke: '#7c3aed', 'stroke-width': 1.4 }));
      g.appendChild(el('text', {
        x: 0, y: 28, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 9.2, 'font-weight': 800, fill: '#5b21b6'
      }, dev.tag));
      return g;
    }

    // 5. CHECK VALVE (TRAP)
    if (dev.kind === 'check_valve') {
      g.appendChild(el('rect', { x: -18, y: -13, width: 36, height: 26, rx: 6, fill: '#fff7ed', stroke: '#c2410c', 'stroke-width': 2.3 }));
      g.appendChild(el('line', { x1: -11, y1: -7, x2: 11, y2: 7, stroke: '#c2410c', 'stroke-width': 2.8, 'stroke-linecap': 'round' }));
      g.appendChild(el('polygon', { points: '12,8 5,8 10,1', fill: '#c2410c' }));
      g.appendChild(el('circle', { cx: -11, cy: -7, r: 2.8, fill: '#c2410c' }));
      g.appendChild(el('rect', { x: -27, y: 17, width: 54, height: 17, rx: 5, fill: '#ffedd5', stroke: '#ea580c', 'stroke-width': 1.4 }));
      g.appendChild(el('text', {
        x: 0, y: 29, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 9.2, 'font-weight': 800, fill: '#9a3412'
      }, dev.tag));
      return g;
    }

    // 6. PSV RELIEF VALVE (TRAP — CAR SEALED OPEN)
    if (dev.kind === 'psv_valve') {
      g.appendChild(el('rect', { x: -22, y: -16, width: 44, height: 32, rx: 8, fill: '#fef2f2', stroke: '#dc2626', 'stroke-width': 2.2 }));
      g.appendChild(el('path', {
        d: 'M -8,9 L 0,-9 L 8,9 Z',
        fill: '#fecaca', stroke: '#b91c1c', 'stroke-width': 2
      }));
      g.appendChild(el('rect', { x: 26, y: -14, width: 66, height: 28, rx: 6, fill: '#fef2f2', stroke: '#ef4444', 'stroke-width': 1.4 }));
      g.appendChild(el('text', {
        x: 59, y: -2, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 8.5, 'font-weight': 800, fill: '#b91c1c'
      }, dev.tag));
      g.appendChild(el('text', {
        x: 59, y: 9, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 7.5, 'font-weight': 800, fill: '#dc2626'
      }, tr('svg_cso_relief')));
      return g;
    }

    // 7. VENT / DRAIN / BLEED VALVE
    if (dev.kind === 'vent' || dev.kind === 'drain' || dev.kind === 'bleed') {
      const isOpen = state.devices[dev.id] === 'open';
      const labelPrefix = dev.kind === 'vent' ? '▲' : '▼';
      const w = 82;
      const h = 34;
      g.appendChild(el('rect', {
        x: -w / 2, y: -h / 2, width: w, height: h, rx: 10,
        fill: isOpen ? '#dcfce7' : '#ffffff',
        stroke: isOpen ? '#16a34a' : '#475569', 'stroke-width': 2.4
      }));
      g.appendChild(el('text', {
        x: 0, y: -2, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 9.8, 'font-weight': 800,
        fill: isOpen ? '#15803d' : '#0f172a'
      }, `${labelPrefix} ${dev.tag}`));
      g.appendChild(el('text', {
        x: 0, y: 11, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 7.8, 'font-weight': 800,
        fill: isOpen ? '#16a34a' : '#64748b'
      }, isOpen ? tr('svg_open_vented') : tr('svg_closed')));
      return g;
    }

    // 8. PRESSURE GAUGE (TRYOUT)
    if (dev.kind === 'gauge') {
      const st = evalRes.nodeStatus[dev.attachNode] || { pressure: 0, hasLiveFluid: false };
      const isVerified = !!state.verified[dev.id];
      const psi = st.pressure || 0;
      const isZero = !st.hasLiveFluid && psi === 0;
      const isTrapped = !st.hasLiveFluid && psi > 0;

      const ringColor = isVerified ? '#16a34a' : isZero ? '#22c55e' : isTrapped ? '#f59e0b' : '#ef4444';
      const bgFill = isVerified ? '#dcfce7' : isZero ? '#f0fdf4' : isTrapped ? '#fffbeb' : '#fef2f2';

      g.appendChild(el('circle', { r: 26, fill: bgFill, stroke: ringColor, 'stroke-width': 3.2 }));
      // Dial needle angle (-125 deg at 0 PSI -> +105 deg at high PSI)
      const angle = psi === 0 ? -125 : Math.min(105, -110 + (psi / 220) * 200);
      g.appendChild(el('line', {
        x1: 0, y1: 0, x2: 0, y2: -17,
        stroke: ringColor, 'stroke-width': 2.6, 'stroke-linecap': 'round',
        transform: `rotate(${angle})`
      }));
      g.appendChild(el('circle', { r: 3, fill: '#1e293b' }));

      // Live digital PSI pill below dial
      g.appendChild(el('rect', {
        x: -36, y: 17, width: 72, height: 22, rx: 6,
        fill: isVerified ? '#16a34a' : '#0f172a'
      }));
      g.appendChild(el('text', {
        x: 0, y: 31, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 9.5, 'font-weight': 800,
        fill: isVerified ? '#ffffff' : isZero ? '#4ade80' : isTrapped ? '#fde047' : '#fca5a5'
      }, isVerified ? '0 PSI ✓' : `${psi} PSI`));

      g.appendChild(el('text', {
        x: 0, y: -31, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 9, 'font-weight': 800, fill: '#334155'
      }, dev.tag));
      return g;
    }

    // 9. LOCAL START/STOP HOA SWITCH (TRYOUT)
    if (dev.kind === 'start_switch') {
      const isVerified = !!state.verified[dev.id];
      const w = 78;
      const h = 42;
      g.appendChild(el('rect', {
        x: -w / 2, y: -h / 2, width: w, height: h, rx: 10,
        fill: isVerified ? '#dcfce7' : '#f8fafc',
        stroke: isVerified ? '#16a34a' : '#334155', 'stroke-width': 2.5
      }));
      // Green START & Red STOP tactile buttons
      g.appendChild(el('circle', { cx: -16, cy: -5, r: 7, fill: isVerified ? '#16a34a' : '#22c55e', stroke: '#14532d', 'stroke-width': 1.5 }));
      g.appendChild(el('circle', { cx: 16, cy: -5, r: 7, fill: '#ef4444', stroke: '#7f1d1d', 'stroke-width': 1.5 }));
      g.appendChild(el('text', {
        x: 0, y: 14, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 8.2, 'font-weight': 800,
        fill: isVerified ? '#15803d' : '#1e293b'
      }, isVerified ? tr('svg_dead_ok') : tr('svg_tryout_hoa')));
      g.appendChild(el('text', {
        x: 0, y: -25, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 9, 'font-weight': 800, fill: '#334155'
      }, dev.tag));
      return g;
    }

    // 10. ATMOSPHERIC GAS MONITOR (TRYOUT — CONFINED SPACE)
    if (dev.kind === 'gas_detector') {
      const isVerified = !!state.verified[dev.id];
      const w = 86;
      const h = 42;
      g.appendChild(el('rect', {
        x: -w / 2, y: -h / 2, width: w, height: h, rx: 10,
        fill: isVerified ? '#dcfce7' : '#fef9c3',
        stroke: isVerified ? '#16a34a' : '#ca8a04', 'stroke-width': 2.5
      }));
      g.appendChild(el('rect', {
        x: -33, y: -14, width: 66, height: 18, rx: 4,
        fill: isVerified ? '#14532d' : '#1e293b'
      }));
      g.appendChild(el('text', {
        x: 0, y: -2, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 8.2, 'font-weight': 800,
        fill: isVerified ? '#4ade80' : '#fde047'
      }, isVerified ? tr('svg_lel_ok') : tr('svg_gas_test')));
      g.appendChild(el('text', {
        x: 0, y: 15, 'text-anchor': 'middle',
        'font-family': 'JetBrains Mono, monospace', 'font-size': 8.5, 'font-weight': 800,
        fill: isVerified ? '#15803d' : '#854d0e'
      }, dev.tag));
      return g;
    }

    return g;
  }

  function drawFx(fx) {
    const g = el('g', { transform: `translate(${fx.x}, ${fx.y})`, class: 'hazard-flash' });
    if (fx.type === 'spray' || fx.type === 'hazard') {
      g.appendChild(el('circle', { r: 34, fill: 'rgba(239, 68, 68, 0.35)', stroke: '#ef4444', 'stroke-width': 4 }));
      g.appendChild(el('text', { y: 8, 'text-anchor': 'middle', 'font-size': 24 }, '⚠️'));
    } else if (fx.type === 'puff') {
      g.appendChild(el('circle', { cx: -12, cy: -8, r: 14, fill: 'rgba(186, 230, 253, 0.85)' }));
      g.appendChild(el('circle', { cx: 12, cy: -6, r: 16, fill: 'rgba(220, 252, 231, 0.9)' }));
      g.appendChild(el('circle', { cx: 0, cy: 10, r: 12, fill: 'rgba(255, 255, 255, 0.9)' }));
    } else if (fx.type === 'verify' || fx.type === 'lock') {
      g.appendChild(el('circle', { r: 30, fill: 'none', stroke: '#16a34a', 'stroke-width': 4 }));
    } else if (fx.type === 'warn') {
      g.appendChild(el('circle', { r: 30, fill: 'rgba(245, 158, 11, 0.25)', stroke: '#f59e0b', 'stroke-width': 3.5 }));
    }
    return g;
  }

  LOTOTO.renderer = { render };
})(window);
