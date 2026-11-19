/* ==========================================================================
   LOTOTO MASTER — 15 Progressive P&ID Isolation Levels
   Tier 1 (Lvls 1-5): Apprentice — Core LOTOTO & Classic Traps
   Tier 2 (Lvls 6-10): Journeyman — Multi-Stream, Keep-Live & DBB
   Tier 3 (Lvls 11-15): Master Safety Lead — Positive Blinds, Confined Space & Turnaround
   ========================================================================== */
(function (global) {
  'use strict';

  const LOTOTO = (global.LOTOTO = global.LOTOTO || {});

  LOTOTO.TIERS = [
    {
      id: 1,
      name: 'Tier 1 · Apprentice Operator',
      desc: 'Master the 3-step LOTOTO sequence and spot classic P&ID traps (bypasses, control valves, check valves).'
    },
    {
      id: 2,
      name: 'Tier 2 · Journeyman Permit Issuer',
      desc: 'Tackle keep-live parallel trains, dual-stream heat exchangers, multi-energy reactors, and Double Block & Bleed.'
    },
    {
      id: 3,
      name: 'Tier 3 · Master Safety Lead',
      desc: 'Execute positive spectacle blind isolation, PSV protection, compressors, confined space entry, and a full turnaround.'
    }
  ];

  LOTOTO.LEVELS = [
    /* ======================================================================
       LEVEL 1 — Pump Seal Swap (Basic LOTOTO)
       ====================================================================== */
    {
      id: 1,
      tier: 1,
      title: 'Pump Seal Swap',
      targetName: 'P-101 Centrifugal Pump',
      targetShort: 'P-101',
      standard: 'Single Block & Bleed',
      conceptTag: 'Core LOTOTO: Lock, Drain & Tryout',
      workScope: 'Replace leaking mechanical seal on P-101. Isolate fluid & electrical energy, drain pump casing, and verify zero energy.',
      briefDesc: 'Your first work permit! Centrifugal pump P-101 has live process fluid on both suction and discharge headers plus 480V power from MCC-101.',
      lessonFocus: 'Always isolate BOTH upstream suction and downstream discharge (backpressure!), lock out the electrical breaker, drain trapped fluid, then perform Tryout on the local Start switch and pressure gauge.',
      takeaway: 'Never skip Tryout! Attempting to start a locked-out pump and confirming 0 PSI on the gauge proves your locks actually isolated the right equipment.',
      nodes: [
        { id: 'src_in', type: 'source', label: 'FEED HEADER', sublabel: '150 PSI', x: 95, y: 295, energyType: 'process', pressure: 150, isSource: true },
        { id: 'v101_n', type: 'inline', x: 270, y: 295 },
        { id: 'p101', type: 'pump', label: 'P-101', sublabel: 'Transfer Pump', x: 500, y: 295, isTarget: true },
        { id: 'v102_n', type: 'inline', x: 730, y: 295 },
        { id: 'sink_out', type: 'sink', label: 'DISCH. HEADER', sublabel: '140 PSI BACKPRESS.', x: 905, y: 295, energyType: 'process', pressure: 140, isSource: true },
        { id: 'src_mcc', type: 'source', label: 'MCC BUS', sublabel: '480V 3-PH', x: 500, y: 80, energyType: 'electrical', pressure: 480, isSource: true },
        { id: 'mcc101_n', type: 'inline', x: 500, y: 175 }
      ],
      pipes: [
        { id: 'p1', from: 'src_in', to: 'v101_n', energyType: 'process', points: [[155, 295], [270, 295]] },
        { id: 'p2', from: 'v101_n', to: 'p101', energyType: 'process', trappedPressure: 48, points: [[270, 295], [500, 295]] },
        { id: 'p3', from: 'p101', to: 'v102_n', energyType: 'process', trappedPressure: 48, points: [[500, 295], [730, 295]] },
        { id: 'p4', from: 'v102_n', to: 'sink_out', energyType: 'process', points: [[730, 295], [845, 295]] },
        { id: 'e1', from: 'src_mcc', to: 'mcc101_n', energyType: 'electrical', points: [[500, 108], [500, 175]] },
        { id: 'e2', from: 'mcc101_n', to: 'p101', energyType: 'electrical', points: [[500, 175], [500, 260]] }
      ],
      devices: [
        { id: 'v101', nodeId: 'v101_n', kind: 'valve', valveType: 'gate', tag: 'V-101', desc: 'Suction Block Valve', x: 270, y: 295, orient: 'h', required: true },
        { id: 'v102', nodeId: 'v102_n', kind: 'valve', valveType: 'gate', tag: 'V-102', desc: 'Discharge Block Valve', x: 730, y: 295, orient: 'h', required: true },
        { id: 'mcc101', nodeId: 'mcc101_n', kind: 'breaker', tag: 'MCC-101', desc: '480V Motor Disconnect', x: 500, y: 175, required: true },
        { id: 'dr101', attachNode: 'p101', kind: 'drain', tag: 'DR-101', desc: 'Pump Casing Drain', x: 425, y: 425, stemTo: [425, 295], required: true },
        { id: 'pi101', attachNode: 'p101', kind: 'gauge', tag: 'PI-101', desc: 'Casing Pressure Gauge', x: 585, y: 425, stemTo: [585, 295] },
        { id: 'hs101', attachNode: 'p101', kind: 'start_switch', tag: 'HS-101', desc: 'Local Start/Stop Switch', x: 645, y: 195, stemTo: [535, 270] }
      ]
    },

    /* ======================================================================
       LEVEL 2 — Basket Strainer Cleanout (Vent + Drain Stored Energy)
       ====================================================================== */
    {
      id: 2,
      tier: 1,
      title: 'Basket Strainer Cleanout',
      targetName: 'S-102 Inline Basket Strainer',
      targetShort: 'S-102',
      standard: 'Isolate, Vent & Drain',
      conceptTag: 'Venting Vapor & Draining Liquid',
      workScope: 'Open strainer cover to clean debris basket. Isolate both sides, vent trapped pressure, drain liquid, and confirm 0 PSI.',
      briefDesc: 'Strainer S-102 has no electrical motor, but holds pressurized process liquid. Opening a cover with trapped pressure causes severe spray injuries.',
      lessonFocus: 'After locking upstream and downstream valves, open BOTH the high-point Vent (VT-201) to break vacuum/relieve gas AND the low-point Drain (DR-201) to empty liquid.',
      takeaway: 'High-point vents and low-point drains work together: venting relieves pressure and prevents vacuum lock so liquid can fully drain out.',
      nodes: [
        { id: 'src_in', type: 'source', label: 'RAW FEED', sublabel: '110 PSI', x: 95, y: 300, energyType: 'process', pressure: 110, isSource: true },
        { id: 'v201_n', type: 'inline', x: 265, y: 300 },
        { id: 's102', type: 'strainer', label: 'S-102', sublabel: 'Basket Strainer', x: 500, y: 300, isTarget: true },
        { id: 'v202_n', type: 'inline', x: 735, y: 300 },
        { id: 'sink_out', type: 'sink', label: 'TO PROCESS', sublabel: '95 PSI BACKPRESS.', x: 905, y: 300, energyType: 'process', pressure: 95, isSource: true }
      ],
      pipes: [
        { id: 'p1', from: 'src_in', to: 'v201_n', energyType: 'process', points: [[155, 300], [265, 300]] },
        { id: 'p2', from: 'v201_n', to: 's102', energyType: 'process', trappedPressure: 62, points: [[265, 300], [500, 300]] },
        { id: 'p3', from: 's102', to: 'v202_n', energyType: 'process', trappedPressure: 62, points: [[500, 300], [735, 300]] },
        { id: 'p4', from: 'v202_n', to: 'sink_out', energyType: 'process', points: [[735, 300], [845, 300]] }
      ],
      devices: [
        { id: 'v201', nodeId: 'v201_n', kind: 'valve', valveType: 'ball', tag: 'V-201', desc: 'Inlet Block Valve', x: 265, y: 300, orient: 'h', required: true },
        { id: 'v202', nodeId: 'v202_n', kind: 'valve', valveType: 'ball', tag: 'V-202', desc: 'Outlet Block Valve', x: 735, y: 300, orient: 'h', required: true },
        { id: 'vt201', attachNode: 's102', kind: 'vent', tag: 'VT-201', desc: 'High-Point Vent Valve', x: 500, y: 150, stemTo: [500, 260], required: true },
        { id: 'dr201', attachNode: 's102', kind: 'drain', tag: 'DR-201', desc: 'Low-Point Drain Valve', x: 425, y: 445, stemTo: [425, 300], required: true },
        { id: 'pi201', attachNode: 's102', kind: 'gauge', tag: 'PI-201', desc: 'Strainer Pressure Gauge', x: 605, y: 440, stemTo: [605, 300] }
      ]
    },

    /* ======================================================================
       LEVEL 3 — The Bypass Trap (Recirculation Line Backfeed)
       ====================================================================== */
    {
      id: 3,
      tier: 1,
      title: 'The Bypass Trap',
      targetName: 'P-103 Warmup Transfer Pump',
      targetShort: 'P-103',
      standard: 'Full Envelope Isolation',
      conceptTag: 'Tracing Hidden Bypass & Warmup Lines',
      workScope: 'Pull impeller on P-103. Watch out for the overhead warmup bypass line tying directly into the pump discharge spool!',
      briefDesc: 'Many industrial pumps have warmup or minimum-flow recirculation bypasses. Locking only suction and discharge valves leaves the bypass feeding live fluid right into the pump!',
      lessonFocus: 'Trace EVERY branch connected to your target equipment on the P&ID! Watch the live flow animation to see where energy sneaks in.',
      takeaway: 'Never assume a pump only has two pipe connections—always trace warmup lines, flush lines, and recirculation bypasses on the P&ID.',
      nodes: [
        { id: 'src_in', type: 'source', label: 'SUCTION HDR', sublabel: '135 PSI', x: 85, y: 315, energyType: 'process', pressure: 135, isSource: true },
        { id: 'j_up', type: 'junction', x: 200, y: 315 },
        { id: 'v301_n', type: 'inline', x: 310, y: 315 },
        { id: 'p103', type: 'pump', label: 'P-103', sublabel: 'Hot Oil Pump', x: 470, y: 315, isTarget: true },
        { id: 'j_p_out', type: 'junction', x: 615, y: 315 },
        { id: 'v302_n', type: 'inline', x: 740, y: 315 },
        { id: 'sink_out', type: 'sink', label: 'DISCH. HDR', sublabel: '145 PSI', x: 910, y: 315, energyType: 'process', pressure: 145, isSource: true },
        { id: 'v303_n', type: 'inline', x: 470, y: 145 },
        { id: 'src_mcc', type: 'source', label: 'MCC-3', sublabel: '480V', x: 470, y: 515, energyType: 'electrical', pressure: 480, isSource: true },
        { id: 'mcc103_n', type: 'inline', x: 470, y: 425 }
      ],
      pipes: [
        { id: 'p1', from: 'src_in', to: 'j_up', energyType: 'process', points: [[145, 315], [200, 315]] },
        { id: 'p2', from: 'j_up', to: 'v301_n', energyType: 'process', points: [[200, 315], [310, 315]] },
        { id: 'p3', from: 'v301_n', to: 'p103', energyType: 'process', trappedPressure: 55, points: [[310, 315], [470, 315]] },
        { id: 'p4', from: 'p103', to: 'j_p_out', energyType: 'process', trappedPressure: 55, points: [[470, 315], [615, 315]] },
        { id: 'p5', from: 'j_p_out', to: 'v302_n', energyType: 'process', trappedPressure: 55, points: [[615, 315], [740, 315]] },
        { id: 'p6', from: 'v302_n', to: 'sink_out', energyType: 'process', points: [[740, 315], [850, 315]] },
        { id: 'p_byp1', from: 'j_up', to: 'v303_n', energyType: 'process', points: [[200, 315], [200, 145], [470, 145]] },
        { id: 'p_byp2', from: 'v303_n', to: 'j_p_out', energyType: 'process', trappedPressure: 55, points: [[470, 145], [615, 145], [615, 315]] },
        { id: 'e1', from: 'src_mcc', to: 'mcc103_n', energyType: 'electrical', points: [[470, 488], [470, 425]] },
        { id: 'e2', from: 'mcc103_n', to: 'p103', energyType: 'electrical', points: [[470, 425], [470, 350]] }
      ],
      devices: [
        { id: 'v301', nodeId: 'v301_n', kind: 'valve', valveType: 'gate', tag: 'V-301', desc: 'Suction Block Valve', x: 310, y: 315, orient: 'h', required: true },
        { id: 'v302', nodeId: 'v302_n', kind: 'valve', valveType: 'gate', tag: 'V-302', desc: 'Discharge Block Valve', x: 740, y: 315, orient: 'h', required: true },
        { id: 'v303', nodeId: 'v303_n', kind: 'valve', valveType: 'globe', tag: 'V-303', desc: 'Warmup Bypass Valve', x: 470, y: 145, orient: 'h', required: true },
        { id: 'mcc103', nodeId: 'mcc103_n', kind: 'breaker', tag: 'MCC-103', desc: '480V Pump Breaker', x: 470, y: 425, required: true },
        { id: 'dr301', attachNode: 'p103', kind: 'drain', tag: 'DR-301', desc: 'Pump Casing Drain', x: 355, y: 445, stemTo: [355, 315], required: true },
        { id: 'pi301', attachNode: 'j_p_out', kind: 'gauge', tag: 'PI-301', desc: 'Discharge Spool Gauge', x: 655, y: 440, stemTo: [615, 315] },
        { id: 'hs103', attachNode: 'p103', kind: 'start_switch', tag: 'HS-103', desc: 'Local Start/Stop HOA', x: 550, y: 225, stemTo: [495, 285] }
      ]
    },

    /* ======================================================================
       LEVEL 4 — Don't Trust Control Valves (Control Valve Trap)
       ====================================================================== */
    {
      id: 4,
      tier: 1,
      title: "Don't Trust Control Valves",
      targetName: 'E-401 Inline Trim Heater',
      targetShort: 'E-401',
      standard: 'Manual Positive Block',
      conceptTag: 'Control Valves ≠ Valid LOTO',
      workScope: 'Isolate inline heater E-401 for element inspection. Control valve FV-401 sits upstream—do NOT rely on it as an isolation point!',
      briefDesc: 'Operators sometimes assume closing an automated control valve from the control room isolates downstream equipment. In reality, control valve seats leak and pneumatic actuators can fail open!',
      lessonFocus: 'Skip pneumatic control valve FV-401 and lock the manual block valves (V-401, V-402) plus the manual bypass valve (V-403).',
      takeaway: 'OSHA & Process Safety rules strictly prohibit using automated control valves as LOTO isolation boundaries—always lock out manual block valves.',
      nodes: [
        { id: 'src_in', type: 'source', label: 'STEAM FEED', sublabel: '125 PSI', x: 85, y: 310, energyType: 'steam', pressure: 125, isSource: true },
        { id: 'j_up', type: 'junction', x: 175, y: 310 },
        { id: 'v401_n', type: 'inline', x: 265, y: 310 },
        { id: 'fv401_n', type: 'inline', x: 395, y: 310 },
        { id: 'j_mid', type: 'junction', x: 495, y: 310 },
        { id: 'e401', type: 'strainer', label: 'E-401', sublabel: 'Inline Heater', x: 605, y: 310, isTarget: true },
        { id: 'v402_n', type: 'inline', x: 760, y: 310 },
        { id: 'sink_out', type: 'sink', label: 'TO HEADER', sublabel: '90 PSI BACKPRESS.', x: 915, y: 310, energyType: 'steam', pressure: 90, isSource: true },
        { id: 'v403_n', type: 'inline', x: 350, y: 145 }
      ],
      pipes: [
        { id: 'p1', from: 'src_in', to: 'j_up', energyType: 'steam', points: [[145, 310], [175, 310]] },
        { id: 'p2', from: 'j_up', to: 'v401_n', energyType: 'steam', points: [[175, 310], [265, 310]] },
        { id: 'p3', from: 'v401_n', to: 'fv401_n', energyType: 'steam', trappedPressure: 50, points: [[265, 310], [395, 310]] },
        { id: 'p4', from: 'fv401_n', to: 'j_mid', energyType: 'steam', trappedPressure: 50, points: [[395, 310], [495, 310]] },
        { id: 'p5', from: 'j_mid', to: 'e401', energyType: 'steam', trappedPressure: 50, points: [[495, 310], [605, 310]] },
        { id: 'p6', from: 'e401', to: 'v402_n', energyType: 'steam', trappedPressure: 50, points: [[605, 310], [760, 310]] },
        { id: 'p7', from: 'v402_n', to: 'sink_out', energyType: 'steam', points: [[760, 310], [855, 310]] },
        { id: 'p_b1', from: 'j_up', to: 'v403_n', energyType: 'steam', points: [[175, 310], [175, 145], [350, 145]] },
        { id: 'p_b2', from: 'v403_n', to: 'j_mid', energyType: 'steam', trappedPressure: 50, points: [[350, 145], [495, 145], [495, 310]] }
      ],
      devices: [
        { id: 'v401', nodeId: 'v401_n', kind: 'valve', valveType: 'gate', tag: 'V-401', desc: 'Upstream Manual Block', x: 265, y: 310, orient: 'h', required: true },
        { id: 'fv401', nodeId: 'fv401_n', kind: 'control_valve', tag: 'FV-401', desc: 'Pneumatic Control Valve (TRAP)', x: 395, y: 310 },
        { id: 'v402', nodeId: 'v402_n', kind: 'valve', valveType: 'gate', tag: 'V-402', desc: 'Downstream Manual Block', x: 760, y: 310, orient: 'h', required: true },
        { id: 'v403', nodeId: 'v403_n', kind: 'valve', valveType: 'globe', tag: 'V-403', desc: 'Control Valve Bypass', x: 350, y: 145, orient: 'h', required: true },
        { id: 'vt401', attachNode: 'e401', kind: 'vent', tag: 'VT-401', desc: 'Steam Vent Valve', x: 605, y: 155, stemTo: [605, 270], required: true },
        { id: 'dr401', attachNode: 'e401', kind: 'drain', tag: 'DR-401', desc: 'Condensate Drain', x: 545, y: 455, stemTo: [545, 310], required: true },
        { id: 'pi401', attachNode: 'e401', kind: 'gauge', tag: 'PI-401', desc: 'Heater Pressure Gauge', x: 675, y: 450, stemTo: [675, 310] }
      ]
    },

    /* ======================================================================
       LEVEL 5 — Check Valve Illusion (Check Valve Trap)
       ====================================================================== */
    {
      id: 5,
      tier: 1,
      title: 'Check Valve Illusion',
      targetName: 'P-105 High-Head Booster Pump',
      targetShort: 'P-105',
      standard: 'Manual Block Isolation',
      conceptTag: 'Check Valves ≠ Isolation Points',
      workScope: 'Remove P-105 coupling guard and inspect bearings. Discharge header is at 185 PSI behind check valve CV-501.',
      briefDesc: 'A swing check valve (CV-501) sits immediately downstream of P-105 to stop reverse flow during shutdowns. Can you rely on it to hold back 185 PSI while mechanics open the pump?',
      lessonFocus: 'NEVER trust a check valve for LOTOTO! Debris or worn seats allow high-pressure backflow, and check valves cannot be locked. Lock downstream manual block valve V-502 instead.',
      takeaway: 'Check valves are process protection devices, NEVER isolation barriers. Always lock a positive manual valve between the live header and the equipment.',
      nodes: [
        { id: 'src_in', type: 'source', label: 'BOOSTER FEED', sublabel: '110 PSI', x: 90, y: 300, energyType: 'process', pressure: 110, isSource: true },
        { id: 'v501_n', type: 'inline', x: 245, y: 300 },
        { id: 'p105', type: 'pump', label: 'P-105', sublabel: 'Booster Pump', x: 425, y: 300, isTarget: true },
        { id: 'cv501_n', type: 'inline', x: 585, y: 300 },
        { id: 'v502_n', type: 'inline', x: 745, y: 300 },
        { id: 'sink_out', type: 'sink', label: 'MAIN DISCH.', sublabel: '185 PSI LIVE', x: 910, y: 300, energyType: 'process', pressure: 185, isSource: true },
        { id: 'src_mcc', type: 'source', label: 'MCC-5', sublabel: '480V', x: 425, y: 80, energyType: 'electrical', pressure: 480, isSource: true },
        { id: 'mcc105_n', type: 'inline', x: 425, y: 180 }
      ],
      pipes: [
        { id: 'p1', from: 'src_in', to: 'v501_n', energyType: 'process', points: [[150, 300], [245, 300]] },
        { id: 'p2', from: 'v501_n', to: 'p105', energyType: 'process', trappedPressure: 74, points: [[245, 300], [425, 300]] },
        { id: 'p3', from: 'p105', to: 'cv501_n', energyType: 'process', trappedPressure: 74, points: [[425, 300], [585, 300]] },
        { id: 'p4', from: 'cv501_n', to: 'v502_n', energyType: 'process', trappedPressure: 74, points: [[585, 300], [745, 300]] },
        { id: 'p5', from: 'v502_n', to: 'sink_out', energyType: 'process', points: [[745, 300], [850, 300]] },
        { id: 'e1', from: 'src_mcc', to: 'mcc105_n', energyType: 'electrical', points: [[425, 108], [425, 180]] },
        { id: 'e2', from: 'mcc105_n', to: 'p105', energyType: 'electrical', points: [[425, 180], [425, 265]] }
      ],
      devices: [
        { id: 'v501', nodeId: 'v501_n', kind: 'valve', valveType: 'gate', tag: 'V-501', desc: 'Suction Block Valve', x: 245, y: 300, orient: 'h', required: true },
        { id: 'cv501', nodeId: 'cv501_n', kind: 'check_valve', tag: 'CV-501', desc: 'Swing Check Valve (TRAP)', x: 585, y: 300 },
        { id: 'v502', nodeId: 'v502_n', kind: 'valve', valveType: 'gate', tag: 'V-502', desc: 'Discharge Block Valve', x: 745, y: 300, orient: 'h', required: true },
        { id: 'mcc105', nodeId: 'mcc105_n', kind: 'breaker', tag: 'MCC-105', desc: '480V Motor Disconnect', x: 425, y: 180, required: true },
        { id: 'dr501', attachNode: 'p105', kind: 'drain', tag: 'DR-501', desc: 'Casing Bleed Drain', x: 350, y: 440, stemTo: [350, 300], required: true },
        { id: 'pi501', attachNode: 'p105', kind: 'gauge', tag: 'PI-501', desc: 'Pump Discharge Gauge', x: 505, y: 440, stemTo: [505, 300] },
        { id: 'hs105', attachNode: 'p105', kind: 'start_switch', tag: 'HS-105', desc: 'Local Start/Stop HOA', x: 555, y: 185, stemTo: [455, 270] }
      ]
    },

    /* ======================================================================
       LEVEL 6 — Twin Parallel Pumps (Selective Keep-Live Isolation)
       ====================================================================== */
    {
      id: 6,
      tier: 2,
      title: 'Twin Parallel Pumps',
      targetName: 'P-201A Duty Pump (Keep P-201B LIVE!)',
      targetShort: 'P-201A',
      standard: 'Selective Train Isolation',
      conceptTag: 'Isolate Duty Train · Keep Standby Online',
      keepLiveRule: 'Keep Standby Pump P-201B running online!',
      workScope: 'Isolate Pump P-201A for bearing replacement while Standby Pump P-201B stays online keeping the plant running!',
      briefDesc: 'P-201A and P-201B share common suction and discharge headers. Shutting down the main plant header valve (V-600) or P-201B will trip the entire unit!',
      lessonFocus: 'Choose the closest local isolation boundaries around P-201A (V-601, V-602, MCC-201A) so P-201B keeps pumping uninterrupted.',
      takeaway: 'Good LOTOTO boundaries are tight and surgical—isolating as close as safely possible to the target minimizes disruption and trapped fluid volume.',
      nodes: [
        { id: 'src_in', type: 'source', label: 'COMMON SUCT.', sublabel: '130 PSI', x: 80, y: 295, energyType: 'process', pressure: 130, isSource: true },
        { id: 'v600_n', type: 'inline', x: 185, y: 295 },
        { id: 'j_suc', type: 'junction', x: 265, y: 295 },

        { id: 'v601_n', type: 'inline', x: 365, y: 175 },
        { id: 'p201a', type: 'pump', label: 'P-201A', sublabel: 'TARGET PUMP', x: 515, y: 175, isTarget: true },
        { id: 'v602_n', type: 'inline', x: 675, y: 175 },

        { id: 'v603_n', type: 'inline', x: 365, y: 415 },
        { id: 'p201b', type: 'pump', label: 'P-201B', sublabel: 'KEEP ONLINE', x: 515, y: 415, mustStayLive: true, requiresElectrical: true },
        { id: 'v604_n', type: 'inline', x: 675, y: 415 },

        { id: 'j_dis', type: 'junction', x: 760, y: 295 },
        { id: 'sink_out', type: 'sink', label: 'PLANT HEADER', sublabel: '165 PSI LIVE', x: 915, y: 295, energyType: 'process', pressure: 165, isSource: true },

        { id: 'src_mcca', type: 'source', label: 'MCC-A', sublabel: '480V', x: 515, y: 55, energyType: 'electrical', pressure: 480, isSource: true },
        { id: 'mcca_n', type: 'inline', x: 515, y: 112 },

        { id: 'src_mccb', type: 'source', label: 'MCC-B', sublabel: '480V', x: 255, y: 520, energyType: 'electrical', pressure: 480, isSource: true },
        { id: 'mccb_n', type: 'inline', x: 380, y: 520 }
      ],
      pipes: [
        { id: 'p0', from: 'src_in', to: 'v600_n', energyType: 'process', points: [[140, 295], [185, 295]] },
        { id: 'p1', from: 'v600_n', to: 'j_suc', energyType: 'process', points: [[185, 295], [265, 295]] },
        // Top train A
        { id: 'pa1', from: 'j_suc', to: 'v601_n', energyType: 'process', points: [[265, 295], [265, 175], [365, 175]] },
        { id: 'pa2', from: 'v601_n', to: 'p201a', energyType: 'process', trappedPressure: 58, points: [[365, 175], [515, 175]] },
        { id: 'pa3', from: 'p201a', to: 'v602_n', energyType: 'process', trappedPressure: 58, points: [[515, 175], [675, 175]] },
        { id: 'pa4', from: 'v602_n', to: 'j_dis', energyType: 'process', points: [[675, 175], [760, 175], [760, 295]] },
        // Bottom train B (keep live!)
        { id: 'pb1', from: 'j_suc', to: 'v603_n', energyType: 'process', points: [[265, 295], [265, 415], [365, 415]] },
        { id: 'pb2', from: 'v603_n', to: 'p201b', energyType: 'process', points: [[365, 415], [515, 415]] },
        { id: 'pb3', from: 'p201b', to: 'v604_n', energyType: 'process', points: [[515, 415], [675, 415]] },
        { id: 'pb4', from: 'v604_n', to: 'j_dis', energyType: 'process', points: [[675, 415], [760, 415], [760, 295]] },
        { id: 'p_out', from: 'j_dis', to: 'sink_out', energyType: 'process', points: [[760, 295], [855, 295]] },
        // Electrical
        { id: 'ea1', from: 'src_mcca', to: 'mcca_n', energyType: 'electrical', points: [[515, 78], [515, 112]] },
        { id: 'ea2', from: 'mcca_n', to: 'p201a', energyType: 'electrical', points: [[515, 112], [515, 145]] },
        { id: 'eb1', from: 'src_mccb', to: 'mccb_n', energyType: 'electrical', points: [[312, 520], [380, 520]] },
        { id: 'eb2', from: 'mccb_n', to: 'p201b', energyType: 'electrical', points: [[380, 520], [515, 520], [515, 448]] }
      ],
      devices: [
        { id: 'v600', nodeId: 'v600_n', kind: 'valve', valveType: 'gate', tag: 'V-600', desc: 'Main Header Block (Keep Open!)', x: 185, y: 295, orient: 'h', keepLiveTrap: true, keepLiveNode: 'p201b' },
        { id: 'v601', nodeId: 'v601_n', kind: 'valve', valveType: 'gate', tag: 'V-601', desc: 'P-201A Suction Block', x: 365, y: 175, orient: 'h', required: true },
        { id: 'v602', nodeId: 'v602_n', kind: 'valve', valveType: 'gate', tag: 'V-602', desc: 'P-201A Discharge Block', x: 675, y: 175, orient: 'h', required: true },
        { id: 'v603', nodeId: 'v603_n', kind: 'valve', valveType: 'gate', tag: 'V-603', desc: 'P-201B Suction (Keep Open!)', x: 365, y: 415, orient: 'h', keepLiveTrap: true, keepLiveNode: 'p201b' },
        { id: 'v604', nodeId: 'v604_n', kind: 'valve', valveType: 'gate', tag: 'V-604', desc: 'P-201B Discharge (Keep Open!)', x: 675, y: 415, orient: 'h', keepLiveTrap: true, keepLiveNode: 'p201b' },
        { id: 'mcc201a', nodeId: 'mcca_n', kind: 'breaker', tag: 'MCC-201A', desc: 'P-201A Breaker', x: 515, y: 112, required: true },
        { id: 'mcc201b', nodeId: 'mccb_n', kind: 'breaker', tag: 'MCC-201B', desc: 'P-201B Breaker (Keep Live!)', x: 380, y: 520, keepLiveTrap: true, keepLiveNode: 'p201b' },
        { id: 'dr601', attachNode: 'p201a', kind: 'drain', tag: 'DR-601', desc: 'P-201A Casing Drain', x: 435, y: 280, stemTo: [435, 175], required: true },
        { id: 'pi601', attachNode: 'p201a', kind: 'gauge', tag: 'PI-601', desc: 'P-201A Pressure Gauge', x: 595, y: 280, stemTo: [595, 175] },
        { id: 'hs201a', attachNode: 'p201a', kind: 'start_switch', tag: 'HS-201A', desc: 'P-201A Start/Stop Switch', x: 650, y: 92, stemTo: [545, 155] }
      ]
    },

    /* ======================================================================
       LEVEL 7 — Shell & Tube Heat Exchanger (Dual Energy Streams)
       ====================================================================== */
    {
      id: 7,
      tier: 2,
      title: 'Shell & Tube Exchanger',
      targetName: 'E-301 Process Cooler (Shell + Tube)',
      targetShort: 'E-301',
      standard: 'Dual-Side Isolation',
      conceptTag: 'Isolating Two Independent Fluid Chambers',
      workScope: 'Pull tube bundle on heat exchanger E-301. Isolate & drain BOTH the Hot Process (Tube Side) AND Cooling Water (Shell Side)!',
      briefDesc: 'A shell-and-tube exchanger contains two separate pressurized systems inside one steel shell. Tube leaks can cross-contaminate sides if both are not isolated and drained!',
      lessonFocus: 'Watch both independent highlighter paths! Isolate Hot Process (orange) AND Cooling Water (cyan), drain both sides, and verify BOTH pressure gauges at 0 PSI.',
      takeaway: 'Always treat heat exchangers as multi-source equipment—even if you are only opening the channel head, leaking tubes can release shell-side energy.',
      equipmentFrames: [
        { x: 385, y: 205, w: 230, h: 170, label: 'E-301 SHELL & TUBE EXCHANGER', kind: 'exchanger' }
      ],
      nodes: [
        // Tube side (Hot Process)
        { id: 'src_hot', type: 'source', label: 'HOT PROCESS', sublabel: '180 PSI · 310°F', x: 85, y: 265, energyType: 'steam', pressure: 180, isSource: true },
        { id: 'v701_n', type: 'inline', x: 245, y: 265 },
        { id: 'e_tube', type: 'chamber', label: 'TUBE SIDE', sublabel: 'Hot Process', x: 500, y: 265, isTarget: true },
        { id: 'v702_n', type: 'inline', x: 755, y: 265 },
        { id: 'sink_hot', type: 'sink', label: 'COOLED OUT', sublabel: '155 PSI', x: 915, y: 265, energyType: 'steam', pressure: 155, isSource: true },

        // Shell side (Cooling Water)
        { id: 'src_cw', type: 'source', label: 'CW SUPPLY', sublabel: '75 PSI', x: 85, y: 110, energyType: 'water', pressure: 75, isSource: true },
        { id: 'v703_n', type: 'inline', x: 245, y: 110 },
        { id: 'e_shell', type: 'chamber', label: 'SHELL SIDE', sublabel: 'Cooling Water', x: 500, y: 335, isTarget: true },
        { id: 'v704_n', type: 'inline', x: 755, y: 475 },
        { id: 'sink_cw', type: 'sink', label: 'CW RETURN', sublabel: '55 PSI', x: 915, y: 475, energyType: 'water', pressure: 55, isSource: true }
      ],
      pipes: [
        // Tube pipes
        { id: 'pt1', from: 'src_hot', to: 'v701_n', energyType: 'steam', points: [[145, 265], [245, 265]] },
        { id: 'pt2', from: 'v701_n', to: 'e_tube', energyType: 'steam', trappedPressure: 70, points: [[245, 265], [500, 265]] },
        { id: 'pt3', from: 'e_tube', to: 'v702_n', energyType: 'steam', trappedPressure: 70, points: [[500, 265], [755, 265]] },
        { id: 'pt4', from: 'v702_n', to: 'sink_hot', energyType: 'steam', points: [[755, 265], [855, 265]] },
        // Shell pipes
        { id: 'ps1', from: 'src_cw', to: 'v703_n', energyType: 'water', points: [[145, 110], [245, 110]] },
        { id: 'ps2', from: 'v703_n', to: 'e_shell', energyType: 'water', trappedPressure: 35, points: [[245, 110], [430, 110], [430, 335], [500, 335]] },
        { id: 'ps3', from: 'e_shell', to: 'v704_n', energyType: 'water', trappedPressure: 35, points: [[500, 335], [570, 335], [570, 475], [755, 475]] },
        { id: 'ps4', from: 'v704_n', to: 'sink_cw', energyType: 'water', points: [[755, 475], [855, 475]] }
      ],
      devices: [
        { id: 'v701', nodeId: 'v701_n', kind: 'valve', valveType: 'gate', tag: 'V-701', desc: 'Hot Process Inlet', x: 245, y: 265, orient: 'h', required: true },
        { id: 'v702', nodeId: 'v702_n', kind: 'valve', valveType: 'gate', tag: 'V-702', desc: 'Hot Process Outlet', x: 755, y: 265, orient: 'h', required: true },
        { id: 'v703', nodeId: 'v703_n', kind: 'valve', valveType: 'ball', tag: 'V-703', desc: 'Cooling Water Supply', x: 245, y: 110, orient: 'h', required: true },
        { id: 'v704', nodeId: 'v704_n', kind: 'valve', valveType: 'ball', tag: 'V-704', desc: 'Cooling Water Return', x: 755, y: 475, orient: 'h', required: true },
        { id: 'dr701', attachNode: 'e_tube', kind: 'drain', tag: 'DR-701', desc: 'Tube-Side Drain', x: 325, y: 415, stemTo: [325, 265], required: true },
        { id: 'pi701', attachNode: 'e_tube', kind: 'gauge', tag: 'PI-701', desc: 'Tube-Side Gauge', x: 675, y: 150, stemTo: [675, 265] },
        { id: 'dr702', attachNode: 'e_shell', kind: 'drain', tag: 'DR-702', desc: 'Shell-Side CW Drain', x: 470, y: 495, stemTo: [500, 365], required: true },
        { id: 'pi702', attachNode: 'e_shell', kind: 'gauge', tag: 'PI-702', desc: 'Shell-Side CW Gauge', x: 540, y: 110, stemTo: [430, 145] }
      ]
    },

    /* ======================================================================
       LEVEL 8 — Gravity Head & Overhead Feed
       ====================================================================== */
    {
      id: 8,
      tier: 2,
      title: 'Gravity Head & Overhead Feed',
      targetName: 'V-302 Chemical Blending Drum',
      targetShort: 'V-302',
      standard: 'Multi-Nozzle Gravity Lockout',
      conceptTag: 'Stored Gravitational Energy',
      workScope: 'Replace level transmitter flange on V-302. Don’t forget the elevated gravity day-tank feeding straight down from above!',
      briefDesc: 'Even with zero pumps running, an overhead tank creates dangerous gravitational head pressure. Plus V-302 has a pressurized caustic feed and bottom transfer line.',
      lessonFocus: 'Isolate ALL THREE nozzles—overhead gravity drop (V-801), side chemical feed (V-802), and bottom outlet (V-803)—then vent and drain the drum.',
      takeaway: 'Gravity is a silent energy source! Always check upper floors and elevated day tanks on P&IDs before breaking containment on lower vessels.',
      nodes: [
        { id: 'src_grav', type: 'source', label: 'OVERHEAD TANK', sublabel: '40 FT GRAVITY HEAD', x: 500, y: 72, energyType: 'gravity', pressure: 35, isSource: true },
        { id: 'v801_n', type: 'inline', x: 500, y: 175 },
        { id: 'src_chem', type: 'source', label: 'CAUSTIC FEED', sublabel: '95 PSI', x: 90, y: 315, energyType: 'process', pressure: 95, isSource: true },
        { id: 'v802_n', type: 'inline', x: 265, y: 315 },
        { id: 'v302', type: 'vessel', label: 'V-302', sublabel: 'Blending Drum', x: 500, y: 335, isTarget: true },
        { id: 'v803_n', type: 'inline', x: 740, y: 355 },
        { id: 'sink_out', type: 'sink', label: 'TRANSFER HDR', sublabel: '70 PSI BACKPRESS.', x: 910, y: 355, energyType: 'process', pressure: 70, isSource: true }
      ],
      pipes: [
        { id: 'pg1', from: 'src_grav', to: 'v801_n', energyType: 'gravity', points: [[500, 102], [500, 175]] },
        { id: 'pg2', from: 'v801_n', to: 'v302', energyType: 'gravity', trappedPressure: 32, points: [[500, 175], [500, 275]] },
        { id: 'pc1', from: 'src_chem', to: 'v802_n', energyType: 'process', points: [[150, 315], [265, 315]] },
        { id: 'pc2', from: 'v802_n', to: 'v302', energyType: 'process', trappedPressure: 32, points: [[265, 315], [440, 315]] },
        { id: 'po1', from: 'v302', to: 'v803_n', energyType: 'process', trappedPressure: 32, points: [[560, 355], [740, 355]] },
        { id: 'po2', from: 'v803_n', to: 'sink_out', energyType: 'process', points: [[740, 355], [850, 355]] }
      ],
      devices: [
        { id: 'v801', nodeId: 'v801_n', kind: 'valve', valveType: 'ball', tag: 'V-801', desc: 'Overhead Gravity Block', x: 500, y: 175, orient: 'v', required: true },
        { id: 'v802', nodeId: 'v802_n', kind: 'valve', valveType: 'gate', tag: 'V-802', desc: 'Caustic Feed Block', x: 265, y: 315, orient: 'h', required: true },
        { id: 'v803', nodeId: 'v803_n', kind: 'valve', valveType: 'gate', tag: 'V-803', desc: 'Outlet Block Valve', x: 740, y: 355, orient: 'h', required: true },
        { id: 'vt801', attachNode: 'v302', kind: 'vent', tag: 'VT-801', desc: 'Vessel Top Vent', x: 645, y: 215, stemTo: [550, 285], required: true },
        { id: 'dr801', attachNode: 'v302', kind: 'drain', tag: 'DR-801', desc: 'Bottom Sump Drain', x: 500, y: 495, stemTo: [500, 395], required: true },
        { id: 'pi801', attachNode: 'v302', kind: 'gauge', tag: 'PI-801', desc: 'Vessel Pressure Gauge', x: 350, y: 465, stemTo: [450, 375] }
      ]
    },

    /* ======================================================================
       LEVEL 9 — Agitated Jacketed Reactor (Process + Steam + Electrical)
       ====================================================================== */
    {
      id: 9,
      tier: 2,
      title: 'Agitated Jacketed Reactor',
      targetName: 'R-401 Chemical Reactor',
      targetShort: 'R-401',
      standard: 'Multi-Energy LOTOTO',
      conceptTag: 'Mechanical + Thermal + Chemical Energy',
      workScope: 'Inspect internal agitator blades in R-401. Isolate process feed/outlet, steam heating jacket, and agitator 480V motor!',
      briefDesc: 'Batch reactor R-401 combines THREE hazard domains: pressurized chemical process inside the vessel, 150 PSI live steam in the outer heating jacket, and a 480V overhead agitator motor.',
      lessonFocus: 'Lock all 4 fluid valves + MCC-401, release stored pressure from BOTH the vessel and the steam jacket, then Tryout the agitator switch and both pressure gauges.',
      takeaway: 'Multi-energy equipment requires verifying every discipline—mechanical/electrical rotation, thermal steam jackets, and chemical process lines.',
      equipmentFrames: [
        { x: 400, y: 220, w: 200, h: 195, label: 'R-401 JACKETED REACTOR', kind: 'reactor' }
      ],
      nodes: [
        // Vessel Process
        { id: 'src_feed', type: 'source', label: 'MONOMER FEED', sublabel: '130 PSI', x: 85, y: 265, energyType: 'process', pressure: 130, isSource: true },
        { id: 'v901_n', type: 'inline', x: 245, y: 265 },
        { id: 'r_vess', type: 'reactor_core', label: 'VESSEL', sublabel: 'Agitated Core', x: 500, y: 275, isTarget: true },
        { id: 'v902_n', type: 'inline', x: 755, y: 265 },
        { id: 'sink_prod', type: 'sink', label: 'PRODUCT HDR', sublabel: '105 PSI', x: 915, y: 265, energyType: 'process', pressure: 105, isSource: true },

        // Steam Jacket
        { id: 'src_stm', type: 'source', label: 'HP STEAM', sublabel: '150 PSI', x: 85, y: 415, energyType: 'steam', pressure: 150, isSource: true },
        { id: 'v903_n', type: 'inline', x: 245, y: 415 },
        { id: 'r_jack', type: 'chamber', label: 'STEAM JACKET', sublabel: 'Thermal Shell', x: 500, y: 375, isTarget: true },
        { id: 'v904_n', type: 'inline', x: 755, y: 415 },
        { id: 'sink_cond', type: 'sink', label: 'CONDENSATE', sublabel: '60 PSI', x: 915, y: 415, energyType: 'steam', pressure: 60, isSource: true },

        // Agitator Electrical
        { id: 'src_mcc', type: 'source', label: 'AGITATOR MCC', sublabel: '480V', x: 500, y: 65, energyType: 'electrical', pressure: 480, isSource: true },
        { id: 'mcc401_n', type: 'inline', x: 500, y: 150 }
      ],
      pipes: [
        { id: 'pf1', from: 'src_feed', to: 'v901_n', energyType: 'process', points: [[145, 265], [245, 265]] },
        { id: 'pf2', from: 'v901_n', to: 'r_vess', energyType: 'process', trappedPressure: 52, points: [[245, 265], [500, 265]] },
        { id: 'pf3', from: 'r_vess', to: 'v902_n', energyType: 'process', trappedPressure: 52, points: [[500, 265], [755, 265]] },
        { id: 'pf4', from: 'v902_n', to: 'sink_prod', energyType: 'process', points: [[755, 265], [855, 265]] },

        { id: 'ps1', from: 'src_stm', to: 'v903_n', energyType: 'steam', points: [[145, 415], [245, 415]] },
        { id: 'ps2', from: 'v903_n', to: 'r_jack', energyType: 'steam', trappedPressure: 68, points: [[245, 415], [405, 415], [405, 375], [500, 375]] },
        { id: 'ps3', from: 'r_jack', to: 'v904_n', energyType: 'steam', trappedPressure: 68, points: [[500, 375], [595, 375], [595, 415], [755, 415]] },
        { id: 'ps4', from: 'v904_n', to: 'sink_cond', energyType: 'steam', points: [[755, 415], [855, 415]] },

        { id: 'e1', from: 'src_mcc', to: 'mcc401_n', energyType: 'electrical', points: [[500, 92], [500, 150]] },
        { id: 'e2', from: 'mcc401_n', to: 'r_vess', energyType: 'electrical', points: [[500, 150], [500, 240]] }
      ],
      devices: [
        { id: 'v901', nodeId: 'v901_n', kind: 'valve', valveType: 'gate', tag: 'V-901', desc: 'Process Feed Block', x: 245, y: 265, orient: 'h', required: true },
        { id: 'v902', nodeId: 'v902_n', kind: 'valve', valveType: 'gate', tag: 'V-902', desc: 'Product Outlet Block', x: 755, y: 265, orient: 'h', required: true },
        { id: 'v903', nodeId: 'v903_n', kind: 'valve', valveType: 'globe', tag: 'V-903', desc: 'Jacket Steam Supply', x: 245, y: 415, orient: 'h', required: true },
        { id: 'v904', nodeId: 'v904_n', kind: 'valve', valveType: 'globe', tag: 'V-904', desc: 'Jacket Condensate Out', x: 755, y: 415, orient: 'h', required: true },
        { id: 'mcc401', nodeId: 'mcc401_n', kind: 'breaker', tag: 'MCC-401', desc: 'Agitator 480V Breaker', x: 500, y: 150, required: true },
        { id: 'vt901', attachNode: 'r_vess', kind: 'vent', tag: 'VT-901', desc: 'Vessel Vent', x: 350, y: 155, stemTo: [350, 265], required: true },
        { id: 'pi901', attachNode: 'r_vess', kind: 'gauge', tag: 'PI-901', desc: 'Vessel Gauge', x: 660, y: 155, stemTo: [660, 265] },
        { id: 'hs401', attachNode: 'r_vess', kind: 'start_switch', tag: 'HS-401', desc: 'Agitator Start Switch', x: 765, y: 155, stemTo: [555, 230] },
        { id: 'dr901', attachNode: 'r_jack', kind: 'drain', tag: 'DR-901', desc: 'Steam Jacket Drain', x: 430, y: 510, stemTo: [430, 395], required: true },
        { id: 'pi902', attachNode: 'r_jack', kind: 'gauge', tag: 'PI-902', desc: 'Jacket Pressure Gauge', x: 585, y: 510, stemTo: [585, 395] }
      ]
    },

    /* ======================================================================
       LEVEL 10 — Double Block & Bleed (DBB High-Pressure Standard)
       ====================================================================== */
    {
      id: 10,
      tier: 2,
      title: 'Double Block & Bleed',
      targetName: 'M-501 High-Pressure Gas Meter',
      targetShort: 'M-501',
      standard: 'Double Block & Bleed (DBB)',
      conceptTag: '600 PSI Hydrocarbon DBB Standard',
      workScope: 'Calibrate and pull high-pressure gas meter M-501. High-pressure 600 PSI service mandates Double Block & Bleed on BOTH sides!',
      briefDesc: 'On high-pressure or toxic lines, a single valve seat is not enough protection. Double Block & Bleed (DBB) locks TWO block valves in series and opens a bleed valve between them to prove neither valve is passing.',
      lessonFocus: 'Lock ALL FOUR block valves (V-1001/1002 & V-1003/1004), open BOTH inter-valve bleeds (BL-1001 & BL-1002), open meter drain DR-1001, and verify PI-1001 at 0 PSI.',
      takeaway: 'The open inter-valve bleed in a DBB arrangement proves zero leakage past the primary valve and safely vents any weeping fluid before it reaches workers.',
      dbbPairs: [
        { valves: ['v1001', 'v1002'], bleed: 'bl1001', label: 'Upstream DBB' },
        { valves: ['v1003', 'v1004'], bleed: 'bl1002', label: 'Downstream DBB' }
      ],
      nodes: [
        { id: 'src_hp', type: 'source', label: 'HP GAS IN', sublabel: '600 PSI', x: 75, y: 280, energyType: 'gas', pressure: 600, isSource: true },
        { id: 'v1001_n', type: 'inline', x: 185, y: 280 },
        { id: 'j_dbb1', type: 'junction', x: 270, y: 280 },
        { id: 'v1002_n', type: 'inline', x: 355, y: 280 },
        { id: 'm501', type: 'meter', label: 'M-501', sublabel: 'HP Gas Meter', x: 500, y: 280, isTarget: true },
        { id: 'v1003_n', type: 'inline', x: 645, y: 280 },
        { id: 'j_dbb2', type: 'junction', x: 730, y: 280 },
        { id: 'v1004_n', type: 'inline', x: 815, y: 280 },
        { id: 'sink_hp', type: 'sink', label: 'HP PIPELINE', sublabel: '580 PSI', x: 925, y: 280, energyType: 'gas', pressure: 580, isSource: true }
      ],
      pipes: [
        { id: 'p1', from: 'src_hp', to: 'v1001_n', energyType: 'gas', points: [[132, 280], [185, 280]] },
        { id: 'p2', from: 'v1001_n', to: 'j_dbb1', energyType: 'gas', trappedPressure: 180, points: [[185, 280], [270, 280]] },
        { id: 'p3', from: 'j_dbb1', to: 'v1002_n', energyType: 'gas', trappedPressure: 180, points: [[270, 280], [355, 280]] },
        { id: 'p4', from: 'v1002_n', to: 'm501', energyType: 'gas', trappedPressure: 220, points: [[355, 280], [500, 280]] },
        { id: 'p5', from: 'm501', to: 'v1003_n', energyType: 'gas', trappedPressure: 220, points: [[500, 280], [645, 280]] },
        { id: 'p6', from: 'v1003_n', to: 'j_dbb2', energyType: 'gas', trappedPressure: 180, points: [[645, 280], [730, 280]] },
        { id: 'p7', from: 'j_dbb2', to: 'v1004_n', energyType: 'gas', trappedPressure: 180, points: [[730, 280], [815, 280]] },
        { id: 'p8', from: 'v1004_n', to: 'sink_hp', energyType: 'gas', points: [[815, 280], [868, 280]] }
      ],
      devices: [
        { id: 'v1001', nodeId: 'v1001_n', kind: 'valve', valveType: 'ball', tag: 'V-1001', desc: 'Upstream Primary Block', x: 185, y: 280, orient: 'h', required: true },
        { id: 'v1002', nodeId: 'v1002_n', kind: 'valve', valveType: 'ball', tag: 'V-1002', desc: 'Upstream Secondary Block', x: 355, y: 280, orient: 'h', required: true },
        { id: 'v1003', nodeId: 'v1003_n', kind: 'valve', valveType: 'ball', tag: 'V-1003', desc: 'Downstream Secondary Block', x: 645, y: 280, orient: 'h', required: true },
        { id: 'v1004', nodeId: 'v1004_n', kind: 'valve', valveType: 'ball', tag: 'V-1004', desc: 'Downstream Primary Block', x: 815, y: 280, orient: 'h', required: true },
        { id: 'bl1001', attachNode: 'j_dbb1', kind: 'bleed', tag: 'BL-1001', desc: 'Upstream DBB Inter-Valve Bleed', x: 270, y: 415, stemTo: [270, 280], required: true },
        { id: 'bl1002', attachNode: 'j_dbb2', kind: 'bleed', tag: 'BL-1002', desc: 'Downstream DBB Inter-Valve Bleed', x: 730, y: 415, stemTo: [730, 280], required: true },
        { id: 'dr1001', attachNode: 'm501', kind: 'vent', tag: 'VT-1001', desc: 'Meter Body Blowdown', x: 500, y: 135, stemTo: [500, 240], required: true },
        { id: 'pi1001', attachNode: 'm501', kind: 'gauge', tag: 'PI-1001', desc: 'Meter Body Gauge', x: 500, y: 430, stemTo: [500, 320] }
      ]
    },

    /* ======================================================================
       LEVEL 11 — Positive Isolation: Line Break (Spectacle Blinds)
       ====================================================================== */
    {
      id: 11,
      tier: 3,
      title: 'Positive Isolation — Line Break',
      targetName: 'E-502 Acid Reboiler',
      targetShort: 'E-502',
      standard: 'Positive Isolation (Blinds)',
      conceptTag: 'Depressurize First → Swing Spectacle Blinds',
      workScope: 'Hot work & welding repair on acid reboiler E-502! Valves alone are insufficient—positive isolation with Spectacle Blinds is mandatory.',
      briefDesc: 'For hot work, line breaking on hazardous chemicals, or vessel entry, closed valves are NOT enough. You must swing solid steel Spectacle Blinds (SB) into the flanges.',
      lessonFocus: 'SEQUENCE MATTERS! First lock V-1101 & V-1102, THEN vent & drain to 0 PSI, and ONLY THEN break flanges to swing SB-1101 & SB-1102 to BLINDED!',
      takeaway: 'Never break a flange to swing a spectacle blind while trapped pressure remains in the spool—always depressurize and drain to 0 PSI first.',
      nodes: [
        { id: 'src_acid', type: 'source', label: 'ACID FEED', sublabel: '145 PSI CORROSIVE', x: 80, y: 295, energyType: 'steam', pressure: 145, isSource: true },
        { id: 'v1101_n', type: 'inline', x: 205, y: 295 },
        { id: 'sb1101_n', type: 'inline', x: 335, y: 295 },
        { id: 'e502', type: 'vessel', label: 'E-502', sublabel: 'Acid Reboiler', x: 500, y: 295, isTarget: true },
        { id: 'sb1102_n', type: 'inline', x: 665, y: 295 },
        { id: 'v1102_n', type: 'inline', x: 795, y: 295 },
        { id: 'sink_acid', type: 'sink', label: 'COLUMN RETURN', sublabel: '130 PSI', x: 920, y: 295, energyType: 'steam', pressure: 130, isSource: true }
      ],
      pipes: [
        { id: 'p1', from: 'src_acid', to: 'v1101_n', energyType: 'steam', points: [[140, 295], [205, 295]] },
        { id: 'p2', from: 'v1101_n', to: 'sb1101_n', energyType: 'steam', trappedPressure: 65, points: [[205, 295], [335, 295]] },
        { id: 'p3', from: 'sb1101_n', to: 'e502', energyType: 'steam', trappedPressure: 65, points: [[335, 295], [445, 295]] },
        { id: 'p4', from: 'e502', to: 'sb1102_n', energyType: 'steam', trappedPressure: 65, points: [[555, 295], [665, 295]] },
        { id: 'p5', from: 'sb1102_n', to: 'v1102_n', energyType: 'steam', trappedPressure: 65, points: [[665, 295], [795, 295]] },
        { id: 'p6', from: 'v1102_n', to: 'sink_acid', energyType: 'steam', points: [[795, 295], [860, 295]] }
      ],
      devices: [
        { id: 'v1101', nodeId: 'v1101_n', kind: 'valve', valveType: 'gate', tag: 'V-1101', desc: 'Inlet Isolation Valve', x: 205, y: 295, orient: 'h', required: true },
        { id: 'sb1101', nodeId: 'sb1101_n', kind: 'blind', tag: 'SB-1101', desc: 'Inlet Spectacle Blind', x: 335, y: 295, required: true },
        { id: 'sb1102', nodeId: 'sb1102_n', kind: 'blind', tag: 'SB-1102', desc: 'Outlet Spectacle Blind', x: 665, y: 295, required: true },
        { id: 'v1102', nodeId: 'v1102_n', kind: 'valve', valveType: 'gate', tag: 'V-1102', desc: 'Outlet Isolation Valve', x: 795, y: 295, orient: 'h', required: true },
        { id: 'vt1101', attachNode: 'e502', kind: 'vent', tag: 'VT-1101', desc: 'Reboiler Top Vent', x: 500, y: 135, stemTo: [500, 240], required: true },
        { id: 'dr1101', attachNode: 'e502', kind: 'drain', tag: 'DR-1101', desc: 'Reboiler Bottom Drain', x: 430, y: 455, stemTo: [470, 355], required: true },
        { id: 'pi1101', attachNode: 'e502', kind: 'gauge', tag: 'PI-1101', desc: 'Reboiler Pressure Gauge', x: 580, y: 450, stemTo: [530, 355] }
      ]
    },

    /* ======================================================================
       LEVEL 12 — Separator Drum & PSV Protection
       ====================================================================== */
    {
      id: 12,
      tier: 3,
      title: 'Separator Drum & PSV Protection',
      targetName: 'V-601 2-Phase Separator',
      targetShort: 'V-601',
      standard: 'Multi-Nozzle + Relief Protection',
      conceptTag: 'PSV Protection + N2 Check Valve Trap',
      workScope: 'Isolate separator drum V-601 for demister pad swap. Watch out for the Nitrogen check valve AND never isolate the PSV!',
      briefDesc: 'Separator V-601 has 4 live connections (process feed, gas overhead, liquid bottom, and N2 blanket) plus a Pressure Safety Valve (PSV-1201) protecting the vessel.',
      lessonFocus: 'Lock V-1201, V-1202, V-1203, and V-1204 (ignoring check valve CV-1201). Leave car-sealed valve V-PSV OPEN so relief protection stays active!',
      takeaway: 'Never defeat or isolate a Pressure Safety Valve (PSV) on equipment connected to live sources—PSVs are the last line of defense against catastrophic vessel rupture.',
      nodes: [
        { id: 'src_in', type: 'source', label: '2-PHASE FEED', sublabel: '210 PSI', x: 85, y: 315, energyType: 'process', pressure: 210, isSource: true },
        { id: 'v1201_n', type: 'inline', x: 245, y: 315 },
        { id: 'src_n2', type: 'source', label: 'N2 BLANKET', sublabel: '95 PSI', x: 85, y: 155, energyType: 'gas', pressure: 95, isSource: true },
        { id: 'v1204_n', type: 'inline', x: 225, y: 155 },
        { id: 'cv1201_n', type: 'inline', x: 350, y: 155 },
        { id: 'v601', type: 'vessel', label: 'V-601', sublabel: '2-Phase Separator', x: 500, y: 315, isTarget: true },
        { id: 'vpsv_n', type: 'inline', x: 500, y: 170 },
        { id: 'sink_flare', type: 'sink', label: 'PSV → FLARE', sublabel: 'RELIEF PATH', x: 500, y: 72, energyType: 'gas', pressure: 0, isSource: false },
        { id: 'v1202_n', type: 'inline', x: 750, y: 205 },
        { id: 'sink_gas', type: 'sink', label: 'GAS OVERHEAD', sublabel: '195 PSI', x: 915, y: 205, energyType: 'gas', pressure: 195, isSource: true },
        { id: 'v1203_n', type: 'inline', x: 750, y: 405 },
        { id: 'sink_liq', type: 'sink', label: 'LIQUID OUTLET', sublabel: '150 PSI', x: 915, y: 405, energyType: 'process', pressure: 150, isSource: true }
      ],
      pipes: [
        { id: 'p1', from: 'src_in', to: 'v1201_n', energyType: 'process', points: [[145, 315], [245, 315]] },
        { id: 'p2', from: 'v1201_n', to: 'v601', energyType: 'process', trappedPressure: 85, points: [[245, 315], [440, 315]] },
        { id: 'pn1', from: 'src_n2', to: 'v1204_n', energyType: 'gas', points: [[145, 155], [225, 155]] },
        { id: 'pn2', from: 'v1204_n', to: 'cv1201_n', energyType: 'gas', trappedPressure: 85, points: [[225, 155], [350, 155]] },
        { id: 'pn3', from: 'cv1201_n', to: 'v601', energyType: 'gas', trappedPressure: 85, points: [[350, 155], [460, 155], [460, 260]] },
        { id: 'pg1', from: 'v601', to: 'v1202_n', energyType: 'gas', trappedPressure: 85, points: [[555, 285], [645, 285], [645, 205], [750, 205]] },
        { id: 'pg2', from: 'v1202_n', to: 'sink_gas', energyType: 'gas', points: [[750, 205], [855, 205]] },
        { id: 'pl1', from: 'v601', to: 'v1203_n', energyType: 'process', trappedPressure: 85, points: [[555, 355], [645, 355], [645, 405], [750, 405]] },
        { id: 'pl2', from: 'v1203_n', to: 'sink_liq', energyType: 'process', points: [[750, 405], [855, 405]] },
        { id: 'psv1', from: 'v601', to: 'vpsv_n', energyType: 'gas', trappedPressure: 85, points: [[500, 255], [500, 170]] },
        { id: 'psv2', from: 'vpsv_n', to: 'sink_flare', energyType: 'gas', trappedPressure: 85, points: [[500, 170], [500, 102]] }
      ],
      devices: [
        { id: 'v1201', nodeId: 'v1201_n', kind: 'valve', valveType: 'gate', tag: 'V-1201', desc: 'Process Feed Block', x: 245, y: 315, orient: 'h', required: true },
        { id: 'v1204', nodeId: 'v1204_n', kind: 'valve', valveType: 'ball', tag: 'V-1204', desc: 'N2 Purge Manual Block', x: 225, y: 155, orient: 'h', required: true },
        { id: 'cv1201', nodeId: 'cv1201_n', kind: 'check_valve', tag: 'CV-1201', desc: 'N2 Check Valve (TRAP)', x: 350, y: 155 },
        { id: 'v1202', nodeId: 'v1202_n', kind: 'valve', valveType: 'gate', tag: 'V-1202', desc: 'Gas Overhead Block', x: 750, y: 205, orient: 'h', required: true },
        { id: 'v1203', nodeId: 'v1203_n', kind: 'valve', valveType: 'gate', tag: 'V-1203', desc: 'Bottom Liquid Block', x: 750, y: 405, orient: 'h', required: true },
        { id: 'vpsv', nodeId: 'vpsv_n', kind: 'psv_valve', tag: 'PSV-1201', desc: 'Car-Sealed Open PSV (DO NOT CLOSE)', x: 500, y: 170 },
        { id: 'vt1201', attachNode: 'v601', kind: 'vent', tag: 'VT-1201', desc: 'Blowdown to Flare', x: 645, y: 105, stemTo: [545, 255], required: true },
        { id: 'dr1201', attachNode: 'v601', kind: 'drain', tag: 'DR-1201', desc: 'Drum Sump Drain', x: 435, y: 480, stemTo: [470, 375], required: true },
        { id: 'pi1201', attachNode: 'v601', kind: 'gauge', tag: 'PI-1201', desc: 'Drum Pressure Gauge', x: 575, y: 480, stemTo: [530, 375] }
      ]
    },

    /* ======================================================================
       LEVEL 13 — Multi-Energy Gas Compressor
       ====================================================================== */
    {
      id: 13,
      tier: 3,
      title: 'Multi-Energy Gas Compressor',
      targetName: 'K-701 Reciprocating Compressor',
      targetShort: 'K-701',
      standard: 'Multi-Discipline LOTOTO',
      conceptTag: 'Gas + Recycle + CW + Dual MCC Motors',
      workScope: 'Overhaul compressor valves on K-701. Isolate suction/discharge gas, anti-surge recycle loop, cooling water jacket, AND BOTH electrical motors (Main Drive + Lube Oil Pump)!',
      briefDesc: 'Compressors are among the most complex assets in a plant: high-pressure gas, a recycle loop, a check valve trap on discharge, water-cooled cylinders, and two separate electrical circuits!',
      lessonFocus: 'Lock all 5 manual valves (including recycle V-1303 and behind CV-1301) + BOTH breakers (MCC-701 & MCC-702), vent gas & drain CW, then Tryout both Start switches and gauge.',
      takeaway: 'Auxiliary skids like lube oil pumps often have separate electrical feeders from the main drive—always verify ALL electrical sources on the single-line & P&ID!',
      equipmentFrames: [
        { x: 390, y: 210, w: 210, h: 175, label: 'K-701 COMPRESSOR SKID', kind: 'compressor' }
      ],
      nodes: [
        // Gas path
        { id: 'src_gas', type: 'source', label: 'GAS SUCTION', sublabel: '240 PSI', x: 75, y: 265, energyType: 'gas', pressure: 240, isSource: true },
        { id: 'j_g_up', type: 'junction', x: 175, y: 265 },
        { id: 'v1301_n', type: 'inline', x: 280, y: 265 },
        { id: 'k_gas', type: 'compressor_core', label: 'K-701 GAS', sublabel: 'Cylinders', x: 495, y: 265, isTarget: true },
        { id: 'j_g_out', type: 'junction', x: 635, y: 265 },
        { id: 'cv1301_n', type: 'inline', x: 715, y: 265 },
        { id: 'v1302_n', type: 'inline', x: 815, y: 265 },
        { id: 'sink_gas', type: 'sink', label: 'HP GAS DISCH', sublabel: '420 PSI', x: 925, y: 265, energyType: 'gas', pressure: 420, isSource: true },
        // Recycle bypass
        { id: 'v1303_n', type: 'inline', x: 420, y: 120 },
        // Cooling water jacket
        { id: 'src_cw', type: 'source', label: 'CW JACKET IN', sublabel: '65 PSI', x: 75, y: 455, energyType: 'water', pressure: 65, isSource: true },
        { id: 'v1304_n', type: 'inline', x: 255, y: 455 },
        { id: 'k_cw', type: 'chamber', label: 'CW & LUBE', sublabel: 'Aux Skid', x: 495, y: 345, isTarget: true },
        { id: 'v1305_n', type: 'inline', x: 745, y: 455 },
        { id: 'sink_cw', type: 'sink', label: 'CW RETURN', sublabel: '50 PSI', x: 925, y: 455, energyType: 'water', pressure: 50, isSource: true },
        // Electrical 1 (Main Drive)
        { id: 'src_mcc1', type: 'source', label: 'MAIN MCC', sublabel: '4160V', x: 285, y: 60, energyType: 'electrical', pressure: 4160, isSource: true },
        { id: 'mcc701_n', type: 'inline', x: 285, y: 155 },
        // Electrical 2 (Lube Oil Pump)
        { id: 'src_mcc2', type: 'source', label: 'LUBE MCC', sublabel: '480V', x: 815, y: 65, energyType: 'electrical', pressure: 480, isSource: true },
        { id: 'mcc702_n', type: 'inline', x: 815, y: 155 }
      ],
      pipes: [
        { id: 'pg1', from: 'src_gas', to: 'j_g_up', energyType: 'gas', points: [[132, 265], [175, 265]] },
        { id: 'pg2', from: 'j_g_up', to: 'v1301_n', energyType: 'gas', points: [[175, 265], [280, 265]] },
        { id: 'pg3', from: 'v1301_n', to: 'k_gas', energyType: 'gas', trappedPressure: 145, points: [[280, 265], [495, 265]] },
        { id: 'pg4', from: 'k_gas', to: 'j_g_out', energyType: 'gas', trappedPressure: 145, points: [[495, 265], [635, 265]] },
        { id: 'pg5', from: 'j_g_out', to: 'cv1301_n', energyType: 'gas', trappedPressure: 145, points: [[635, 265], [715, 265]] },
        { id: 'pg6', from: 'cv1301_n', to: 'v1302_n', energyType: 'gas', trappedPressure: 145, points: [[715, 265], [815, 265]] },
        { id: 'pg7', from: 'v1302_n', to: 'sink_gas', energyType: 'gas', points: [[815, 265], [868, 265]] },
        // Recycle loop
        { id: 'pr1', from: 'j_g_up', to: 'v1303_n', energyType: 'gas', points: [[175, 265], [175, 120], [420, 120]] },
        { id: 'pr2', from: 'v1303_n', to: 'j_g_out', energyType: 'gas', trappedPressure: 145, points: [[420, 120], [635, 120], [635, 265]] },
        // Cooling water
        { id: 'pc1', from: 'src_cw', to: 'v1304_n', energyType: 'water', points: [[132, 455], [255, 455]] },
        { id: 'pc2', from: 'v1304_n', to: 'k_cw', energyType: 'water', trappedPressure: 30, points: [[255, 455], [405, 455], [405, 345], [495, 345]] },
        { id: 'pc3', from: 'k_cw', to: 'v1305_n', energyType: 'water', trappedPressure: 30, points: [[495, 345], [585, 345], [585, 455], [745, 455]] },
        { id: 'pc4', from: 'v1305_n', to: 'sink_cw', energyType: 'water', points: [[745, 455], [868, 455]] },
        // Electrical 1 -> k_gas
        { id: 'e1a', from: 'src_mcc1', to: 'mcc701_n', energyType: 'electrical', points: [[285, 85], [285, 155]] },
        { id: 'e1b', from: 'mcc701_n', to: 'k_gas', energyType: 'electrical', points: [[285, 155], [285, 195], [455, 195], [455, 240]] },
        // Electrical 2 -> k_cw (Lube oil pump)
        { id: 'e2a', from: 'src_mcc2', to: 'mcc702_n', energyType: 'electrical', points: [[815, 92], [815, 155]] },
        { id: 'e2b', from: 'mcc702_n', to: 'k_cw', energyType: 'electrical', points: [[815, 155], [665, 155], [665, 345], [550, 345]] }
      ],
      devices: [
        { id: 'v1301', nodeId: 'v1301_n', kind: 'valve', valveType: 'gate', tag: 'V-1301', desc: 'Gas Suction Block', x: 280, y: 265, orient: 'h', required: true },
        { id: 'cv1301', nodeId: 'cv1301_n', kind: 'check_valve', tag: 'CV-1301', desc: 'Discharge Check Valve (TRAP)', x: 715, y: 265 },
        { id: 'v1302', nodeId: 'v1302_n', kind: 'valve', valveType: 'gate', tag: 'V-1302', desc: 'Gas Discharge Block', x: 815, y: 265, orient: 'h', required: true },
        { id: 'v1303', nodeId: 'v1303_n', kind: 'valve', valveType: 'ball', tag: 'V-1303', desc: 'Anti-Surge Recycle Block', x: 420, y: 120, orient: 'h', required: true },
        { id: 'v1304', nodeId: 'v1304_n', kind: 'valve', valveType: 'ball', tag: 'V-1304', desc: 'CW Supply Block', x: 255, y: 455, orient: 'h', required: true },
        { id: 'v1305', nodeId: 'v1305_n', kind: 'valve', valveType: 'ball', tag: 'V-1305', desc: 'CW Return Block', x: 745, y: 455, orient: 'h', required: true },
        { id: 'mcc701', nodeId: 'mcc701_n', kind: 'breaker', tag: 'MCC-701', desc: 'Main Drive 4160V Breaker', x: 285, y: 155, required: true },
        { id: 'mcc702', nodeId: 'mcc702_n', kind: 'breaker', tag: 'MCC-702', desc: 'Lube Oil Pump 480V Breaker', x: 815, y: 155, required: true },
        { id: 'vt1301', attachNode: 'k_gas', kind: 'vent', tag: 'VT-1301', desc: 'Gas Blowdown to Flare', x: 545, y: 72, stemTo: [545, 220], required: true },
        { id: 'dr1301', attachNode: 'k_cw', kind: 'drain', tag: 'DR-1301', desc: 'CW Jacket Drain', x: 495, y: 505, stemTo: [495, 375], required: true },
        { id: 'pi1301', attachNode: 'k_gas', kind: 'gauge', tag: 'PI-1301', desc: 'Cylinder Gas Gauge', x: 350, y: 365, stemTo: [350, 265] },
        { id: 'hs701', attachNode: 'k_gas', kind: 'start_switch', tag: 'HS-701', desc: 'Main Drive Start Switch', x: 375, y: 185, stemTo: [435, 235] },
        { id: 'hs702', attachNode: 'k_cw', kind: 'start_switch', tag: 'HS-702', desc: 'Lube Pump Start Switch', x: 745, y: 360, stemTo: [665, 345] }
      ]
    },

    /* ======================================================================
       LEVEL 14 — Confined Space Entry: Storage Tank
       ====================================================================== */
    {
      id: 14,
      tier: 3,
      title: 'Confined Space — Storage Tank',
      targetName: 'T-801 Hydrocarbon Storage Tank',
      targetShort: 'T-801',
      standard: 'Confined Space Positive Isolation',
      conceptTag: 'Full Blinding + Steam Coil + Gas Test',
      workScope: 'Personnel are entering T-801 for internal weld inspection! Isolate ALL nozzles with positive Spectacle Blinds, isolate the steam coil & side mixer, drain, and pass Atmospheric Gas Testing!',
      briefDesc: 'Confined Space Entry carries the highest LOTOTO standard in industry. Every process nozzle entering the tank must be locked, drained, AND positively blinded—followed by LEL/O2 gas monitoring.',
      lessonFocus: 'Lock all valves + MCC-801, drain both tank & steam coil, swing ALL THREE spectacle blinds (SB-1401/1402/1403), Tryout HS-801 & PI-1401, and finally run Gas Monitor GD-801!',
      takeaway: 'Never enter a confined space protected only by closed valves! Physical blinding/disconnection plus verified 0% LEL / 20.9% O2 atmosphere saves lives.',
      equipmentFrames: [
        { x: 395, y: 175, w: 210, h: 240, label: 'T-801 STORAGE TANK (CONFINED SPACE)', kind: 'tank' }
      ],
      nodes: [
        { id: 'src_fill', type: 'source', label: 'TANK FILL', sublabel: '85 PSI', x: 75, y: 195, energyType: 'process', pressure: 85, isSource: true },
        { id: 'v1401_n', type: 'inline', x: 185, y: 195 },
        { id: 'sb1401_n', type: 'inline', x: 305, y: 195 },

        { id: 't801', type: 'tank_core', label: 'T-801', sublabel: 'Tank Interior', x: 500, y: 270, isTarget: true },

        { id: 'sb1403_n', type: 'inline', x: 695, y: 175 },
        { id: 'v1403_n', type: 'inline', x: 810, y: 175 },
        { id: 'sink_vr', type: 'sink', label: 'VAPOR REC.', sublabel: '30 PSI GAS', x: 925, y: 175, energyType: 'gas', pressure: 30, isSource: true },

        { id: 'sb1402_n', type: 'inline', x: 695, y: 315 },
        { id: 'v1402_n', type: 'inline', x: 810, y: 315 },
        { id: 'sink_xfer', type: 'sink', label: 'TRANSFER HDR', sublabel: '75 PSI', x: 925, y: 315, energyType: 'process', pressure: 75, isSource: true },

        // Steam coil inside tank bottom
        { id: 'src_stm', type: 'source', label: 'COIL STEAM', sublabel: '125 PSI', x: 75, y: 455, energyType: 'steam', pressure: 125, isSource: true },
        { id: 'v1404_n', type: 'inline', x: 245, y: 455 },
        { id: 't_coil', type: 'chamber', label: 'STEAM COIL', sublabel: 'Floor Heater', x: 500, y: 375, isTarget: true },
        { id: 'v1405_n', type: 'inline', x: 755, y: 455 },
        { id: 'sink_cond', type: 'sink', label: 'CONDENSATE', sublabel: '45 PSI', x: 925, y: 455, energyType: 'steam', pressure: 45, isSource: true },

        // Side Mixer Electrical
        { id: 'src_mcc', type: 'source', label: 'MIXER MCC', sublabel: '480V', x: 80, y: 315, energyType: 'electrical', pressure: 480, isSource: true },
        { id: 'mcc801_n', type: 'inline', x: 225, y: 315 }
      ],
      pipes: [
        { id: 'p1', from: 'src_fill', to: 'v1401_n', energyType: 'process', points: [[132, 195], [185, 195]] },
        { id: 'p2', from: 'v1401_n', to: 'sb1401_n', energyType: 'process', trappedPressure: 35, points: [[185, 195], [305, 195]] },
        { id: 'p3', from: 'sb1401_n', to: 't801', energyType: 'process', trappedPressure: 35, points: [[305, 195], [440, 195], [440, 270], [500, 270]] },

        { id: 'pv1', from: 't801', to: 'sb1403_n', energyType: 'gas', trappedPressure: 35, points: [[500, 270], [575, 270], [575, 175], [695, 175]] },
        { id: 'pv2', from: 'sb1403_n', to: 'v1403_n', energyType: 'gas', trappedPressure: 35, points: [[695, 175], [810, 175]] },
        { id: 'pv3', from: 'v1403_n', to: 'sink_vr', energyType: 'gas', points: [[810, 175], [868, 175]] },

        { id: 'px1', from: 't801', to: 'sb1402_n', energyType: 'process', trappedPressure: 35, points: [[500, 270], [590, 270], [590, 315], [695, 315]] },
        { id: 'px2', from: 'sb1402_n', to: 'v1402_n', energyType: 'process', trappedPressure: 35, points: [[695, 315], [810, 315]] },
        { id: 'px3', from: 'v1402_n', to: 'sink_xfer', energyType: 'process', points: [[810, 315], [868, 315]] },

        { id: 'ps1', from: 'src_stm', to: 'v1404_n', energyType: 'steam', points: [[132, 455], [245, 455]] },
        { id: 'ps2', from: 'v1404_n', to: 't_coil', energyType: 'steam', trappedPressure: 55, points: [[245, 455], [405, 455], [405, 375], [500, 375]] },
        { id: 'ps3', from: 't_coil', to: 'v1405_n', energyType: 'steam', trappedPressure: 55, points: [[500, 375], [595, 375], [595, 455], [755, 455]] },
        { id: 'ps4', from: 'v1405_n', to: 'sink_cond', energyType: 'steam', points: [[755, 455], [868, 455]] },

        { id: 'e1', from: 'src_mcc', to: 'mcc801_n', energyType: 'electrical', points: [[135, 315], [225, 315]] },
        { id: 'e2', from: 'mcc801_n', to: 't801', energyType: 'electrical', points: [[225, 315], [415, 315], [415, 270], [500, 270]] }
      ],
      devices: [
        { id: 'v1401', nodeId: 'v1401_n', kind: 'valve', valveType: 'gate', tag: 'V-1401', desc: 'Fill Line Block', x: 185, y: 195, orient: 'h', required: true },
        { id: 'sb1401', nodeId: 'sb1401_n', kind: 'blind', tag: 'SB-1401', desc: 'Fill Spectacle Blind', x: 305, y: 195, required: true },
        { id: 'sb1403', nodeId: 'sb1403_n', kind: 'blind', tag: 'SB-1403', desc: 'Vapor Recovery Blind', x: 695, y: 175, required: true },
        { id: 'v1403', nodeId: 'v1403_n', kind: 'valve', valveType: 'ball', tag: 'V-1403', desc: 'Vapor Recovery Block', x: 810, y: 175, orient: 'h', required: true },
        { id: 'sb1402', nodeId: 'sb1402_n', kind: 'blind', tag: 'SB-1402', desc: 'Transfer Out Blind', x: 695, y: 315, required: true },
        { id: 'v1402', nodeId: 'v1402_n', kind: 'valve', valveType: 'gate', tag: 'V-1402', desc: 'Transfer Out Block', x: 810, y: 315, orient: 'h', required: true },
        { id: 'v1404', nodeId: 'v1404_n', kind: 'valve', valveType: 'globe', tag: 'V-1404', desc: 'Steam Coil Inlet', x: 245, y: 455, orient: 'h', required: true },
        { id: 'v1405', nodeId: 'v1405_n', kind: 'valve', valveType: 'globe', tag: 'V-1405', desc: 'Steam Coil Outlet', x: 755, y: 455, orient: 'h', required: true },
        { id: 'mcc801', nodeId: 'mcc801_n', kind: 'breaker', tag: 'MCC-801', desc: 'Side Mixer 480V Breaker', x: 225, y: 315, required: true },
        { id: 'dr1401', attachNode: 't801', kind: 'drain', tag: 'DR-1401', desc: 'Tank Bottom Drain', x: 350, y: 525, stemTo: [450, 415], required: true },
        { id: 'dr1402', attachNode: 't_coil', kind: 'drain', tag: 'DR-1402', desc: 'Steam Coil Drain', x: 560, y: 525, stemTo: [560, 415], required: true },
        { id: 'pi1401', attachNode: 't801', kind: 'gauge', tag: 'PI-1401', desc: 'Tank Pressure Gauge', x: 430, y: 95, stemTo: [460, 180] },
        { id: 'gd801', attachNode: 't801', kind: 'gas_detector', tag: 'GD-801', desc: 'Confined Space Gas Monitor', x: 575, y: 95, stemTo: [540, 180] },
        { id: 'hs801', attachNode: 't801', kind: 'start_switch', tag: 'HS-801', desc: 'Side Mixer Start Switch', x: 330, y: 355, stemTo: [380, 315] }
      ]
    },

    /* ======================================================================
       LEVEL 15 — MASTER TURNAROUND: CHARGE PACKAGE (GRAND FINALE!)
       ====================================================================== */
    {
      id: 15,
      tier: 3,
      title: 'Master Turnaround — Charge Unit',
      targetName: 'P-901A + E-901 Charge Package (Keep P-901B LIVE!)',
      targetShort: 'P-901A & E-901',
      standard: 'Master Turnaround LOTOTO',
      conceptTag: 'ALL Skills Combined — Grand Finale!',
      keepLiveRule: 'Keep Standby Charge Pump P-901B online to Alternate Header!',
      workScope: 'Final Certification! Isolate Charge Pump P-901A AND Preheater E-901 as a combined work envelope while keeping Standby Pump P-901B running online!',
      briefDesc: 'Everything you learned comes together: Keep-Live shared feed header, Check Valve & Control Valve traps, 350 PSI HP Steam Double Block & Bleed, Positive Spectacle Blind, Electrical MCC + Tryout, and Gas Verification!',
      lessonFocus: 'Stay methodical: (1) Lock local train valves, steam DBB valves, & MCC-901A without starving P-901B; (2) Open inter-valve bleed & drains; (3) Swing SB-1501; (4) Complete all Tryout checks!',
      takeaway: 'Congratulations, LOTOTO Master! Methodical P&ID markup, verifying zero energy, and never trusting shortcuts protect every crew member who relies on your permit.',
      dbbPairs: [
        { valves: ['v1505', 'v1506'], bleed: 'bl1501', label: 'HP Steam DBB' }
      ],
      equipmentFrames: [
        { x: 585, y: 170, w: 150, h: 125, label: 'E-901 PREHEATER', kind: 'exchanger' }
      ],
      nodes: [
        // Shared Feed
        { id: 'src_feed', type: 'source', label: 'CHARGE FEED', sublabel: '165 PSI', x: 70, y: 335, energyType: 'process', pressure: 165, isSource: true },
        { id: 'v900_n', type: 'inline', x: 160, y: 335 },
        { id: 'j_feed', type: 'junction', x: 215, y: 335 },

        // Train A (TARGET: P-901A + E-901 Tube)
        { id: 'v1501_n', type: 'inline', x: 275, y: 210 },
        { id: 'sb1501_n', type: 'inline', x: 350, y: 210 },
        { id: 'p901a', type: 'pump', label: 'P-901A', sublabel: 'TARGET PUMP', x: 435, y: 210, isTarget: true },
        { id: 'cv1501_n', type: 'inline', x: 520, y: 210 },
        { id: 'e_tube', type: 'chamber', label: 'E-901 TUBE', sublabel: 'Process', x: 660, y: 210, isTarget: true },
        { id: 'fv1501_n', type: 'inline', x: 775, y: 210 },
        { id: 'v1502_n', type: 'inline', x: 845, y: 210 },
        { id: 'sink_proc', type: 'sink', label: 'REACTOR IN', sublabel: '190 PSI', x: 932, y: 210, energyType: 'process', pressure: 190, isSource: true },

        // HP Steam Shell (DBB)
        { id: 'src_stm', type: 'source', label: 'HP STEAM', sublabel: '350 PSI', x: 470, y: 68, energyType: 'steam', pressure: 350, isSource: true },
        { id: 'v1505_n', type: 'inline', x: 565, y: 68 },
        { id: 'j_dbb', type: 'junction', x: 645, y: 68 },
        { id: 'v1506_n', type: 'inline', x: 725, y: 68 },
        { id: 'e_shell', type: 'chamber', label: 'E-901 SHELL', sublabel: 'HP Steam', x: 660, y: 268, isTarget: true },
        { id: 'v1507_n', type: 'inline', x: 820, y: 335 },
        { id: 'sink_cond', type: 'sink', label: 'CONDENSATE', sublabel: '85 PSI', x: 932, y: 335, energyType: 'steam', pressure: 85, isSource: true },

        // Train B (KEEP LIVE!)
        { id: 'v1503_n', type: 'inline', x: 300, y: 445 },
        { id: 'p901b', type: 'pump', label: 'P-901B', sublabel: 'KEEP ONLINE', x: 445, y: 445, mustStayLive: true, requiresElectrical: true },
        { id: 'v1504_n', type: 'inline', x: 615, y: 445 },
        { id: 'sink_alt', type: 'sink', label: 'ALT HEADER', sublabel: 'ONLINE LIVE', x: 932, y: 445, energyType: 'process', pressure: 175, isSource: true },

        // Electrical A
        { id: 'src_mcca', type: 'source', label: 'MCC-9A', sublabel: '480V', x: 255, y: 72, energyType: 'electrical', pressure: 480, isSource: true },
        { id: 'mcc901a_n', type: 'inline', x: 350, y: 72 },

        // Electrical B (Keep live)
        { id: 'src_mccb', type: 'source', label: 'MCC-9B', sublabel: '480V', x: 225, y: 528, energyType: 'electrical', pressure: 480, isSource: true },
        { id: 'mcc901b_n', type: 'inline', x: 340, y: 528 }
      ],
      pipes: [
        { id: 'pf0', from: 'src_feed', to: 'v900_n', energyType: 'process', points: [[125, 335], [160, 335]] },
        { id: 'pf1', from: 'v900_n', to: 'j_feed', energyType: 'process', points: [[160, 335], [215, 335]] },
        // Train A
        { id: 'pa1', from: 'j_feed', to: 'v1501_n', energyType: 'process', points: [[215, 335], [215, 210], [275, 210]] },
        { id: 'pa2', from: 'v1501_n', to: 'sb1501_n', energyType: 'process', trappedPressure: 75, points: [[275, 210], [350, 210]] },
        { id: 'pa3', from: 'sb1501_n', to: 'p901a', energyType: 'process', trappedPressure: 75, points: [[350, 210], [435, 210]] },
        { id: 'pa4', from: 'p901a', to: 'cv1501_n', energyType: 'process', trappedPressure: 75, points: [[435, 210], [520, 210]] },
        { id: 'pa5', from: 'cv1501_n', to: 'e_tube', energyType: 'process', trappedPressure: 75, points: [[520, 210], [660, 210]] },
        { id: 'pa6', from: 'e_tube', to: 'fv1501_n', energyType: 'process', trappedPressure: 75, points: [[660, 210], [775, 210]] },
        { id: 'pa7', from: 'fv1501_n', to: 'v1502_n', energyType: 'process', trappedPressure: 75, points: [[775, 210], [845, 210]] },
        { id: 'pa8', from: 'v1502_n', to: 'sink_proc', energyType: 'process', points: [[845, 210], [880, 210]] },
        // HP Steam DBB
        { id: 'ps1', from: 'src_stm', to: 'v1505_n', energyType: 'steam', points: [[522, 68], [565, 68]] },
        { id: 'ps2', from: 'v1505_n', to: 'j_dbb', energyType: 'steam', trappedPressure: 140, points: [[565, 68], [645, 68]] },
        { id: 'ps3', from: 'j_dbb', to: 'v1506_n', energyType: 'steam', trappedPressure: 140, points: [[645, 68], [725, 68]] },
        { id: 'ps4', from: 'v1506_n', to: 'e_shell', energyType: 'steam', trappedPressure: 140, points: [[725, 68], [748, 68], [748, 268], [660, 268]] },
        { id: 'ps5', from: 'e_shell', to: 'v1507_n', energyType: 'steam', trappedPressure: 140, points: [[660, 268], [748, 268], [748, 335], [820, 335]] },
        { id: 'ps6', from: 'v1507_n', to: 'sink_cond', energyType: 'steam', points: [[820, 335], [880, 335]] },
        // Train B (Keep Live)
        { id: 'pb1', from: 'j_feed', to: 'v1503_n', energyType: 'process', points: [[215, 335], [215, 445], [300, 445]] },
        { id: 'pb2', from: 'v1503_n', to: 'p901b', energyType: 'process', points: [[300, 445], [445, 445]] },
        { id: 'pb3', from: 'p901b', to: 'v1504_n', energyType: 'process', points: [[445, 445], [615, 445]] },
        { id: 'pb4', from: 'v1504_n', to: 'sink_alt', energyType: 'process', points: [[615, 445], [880, 445]] },
        // Electrical A & B
        { id: 'ea1', from: 'src_mcca', to: 'mcc901a_n', energyType: 'electrical', points: [[308, 72], [350, 72]] },
        { id: 'ea2', from: 'mcc901a_n', to: 'p901a', energyType: 'electrical', points: [[350, 72], [415, 72], [415, 178]] },
        { id: 'eb1', from: 'src_mccb', to: 'mcc901b_n', energyType: 'electrical', points: [[282, 528], [340, 528]] },
        { id: 'eb2', from: 'mcc901b_n', to: 'p901b', energyType: 'electrical', points: [[340, 528], [445, 528], [445, 478]] }
      ],
      devices: [
        { id: 'v900', nodeId: 'v900_n', kind: 'valve', valveType: 'gate', tag: 'V-900', desc: 'Main Feed Header (Keep Open!)', x: 160, y: 335, orient: 'h', keepLiveTrap: true, keepLiveNode: 'p901b' },
        { id: 'v1501', nodeId: 'v1501_n', kind: 'valve', valveType: 'gate', tag: 'V-1501', desc: 'Train A Feed Block', x: 275, y: 210, orient: 'h', required: true },
        { id: 'sb1501', nodeId: 'sb1501_n', kind: 'blind', tag: 'SB-1501', desc: 'Train A Spectacle Blind', x: 350, y: 210, required: true },
        { id: 'cv1501', nodeId: 'cv1501_n', kind: 'check_valve', tag: 'CV-1501', desc: 'Pump Check Valve (TRAP)', x: 520, y: 210 },
        { id: 'fv1501', nodeId: 'fv1501_n', kind: 'control_valve', tag: 'FV-1501', desc: 'Flow Control Valve (TRAP)', x: 775, y: 210 },
        { id: 'v1502', nodeId: 'v1502_n', kind: 'valve', valveType: 'gate', tag: 'V-1502', desc: 'Train A Outlet Block', x: 845, y: 210, orient: 'h', required: true },
        // Steam DBB
        { id: 'v1505', nodeId: 'v1505_n', kind: 'valve', valveType: 'globe', tag: 'V-1505', desc: 'HP Steam Primary Block', x: 565, y: 68, orient: 'h', required: true },
        { id: 'v1506', nodeId: 'v1506_n', kind: 'valve', valveType: 'globe', tag: 'V-1506', desc: 'HP Steam Secondary Block', x: 725, y: 68, orient: 'h', required: true },
        { id: 'bl1501', attachNode: 'j_dbb', kind: 'bleed', tag: 'BL-1501', desc: 'HP Steam DBB Bleed', x: 645, y: 125, stemTo: [645, 68], required: true },
        { id: 'v1507', nodeId: 'v1507_n', kind: 'valve', valveType: 'globe', tag: 'V-1507', desc: 'Condensate Block', x: 820, y: 335, orient: 'h', required: true },
        // Keep-live Train B traps
        { id: 'v1503', nodeId: 'v1503_n', kind: 'valve', valveType: 'gate', tag: 'V-1503', desc: 'P-901B Suction (Keep Open!)', x: 300, y: 445, orient: 'h', keepLiveTrap: true, keepLiveNode: 'p901b' },
        { id: 'v1504', nodeId: 'v1504_n', kind: 'valve', valveType: 'gate', tag: 'V-1504', desc: 'P-901B Disch (Keep Open!)', x: 615, y: 445, orient: 'h', keepLiveTrap: true, keepLiveNode: 'p901b' },
        { id: 'mcc901a', nodeId: 'mcc901a_n', kind: 'breaker', tag: 'MCC-901A', desc: 'P-901A 480V Breaker', x: 350, y: 72, required: true },
        { id: 'mcc901b', nodeId: 'mcc901b_n', kind: 'breaker', tag: 'MCC-901B', desc: 'P-901B Breaker (Keep Live!)', x: 340, y: 528, keepLiveTrap: true, keepLiveNode: 'p901b' },
        // Drains & Tryout
        { id: 'dr1501', attachNode: 'p901a', kind: 'drain', tag: 'DR-1501', desc: 'Train A Process Drain', x: 435, y: 345, stemTo: [435, 245], required: true },
        { id: 'dr1502', attachNode: 'e_shell', kind: 'drain', tag: 'DR-1502', desc: 'E-901 Steam Shell Drain', x: 660, y: 380, stemTo: [660, 295], required: true },
        { id: 'pi1501', attachNode: 'e_tube', kind: 'gauge', tag: 'PI-1501', desc: 'Train A Process Gauge', x: 545, y: 345, stemTo: [560, 210] },
        { id: 'hs901a', attachNode: 'p901a', kind: 'start_switch', tag: 'HS-901A', desc: 'P-901A Start/Stop Switch', x: 495, y: 135, stemTo: [455, 185] },
        { id: 'gd1501', attachNode: 'e_tube', kind: 'gas_detector', tag: 'GD-1501', desc: 'Turnaround Gas Monitor', x: 865, y: 112, stemTo: [725, 195] }
      ]
    }
  ];
})(window);
