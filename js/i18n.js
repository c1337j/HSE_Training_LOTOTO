/* ==========================================================================
   LOTOTO MASTER — Internationalization (i18n) Core Engine
   Supports 9 languages with automatic browser detection + manual selector:
   en, es, fr, pt, de, sv, zh, ja, it
   ========================================================================== */
(function (global) {
  'use strict';

  const LOTOTO = (global.LOTOTO = global.LOTOTO || {});
  const LANG_STORAGE_KEY = 'lototo_master_lang_v1';

  const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English',    nativeName: 'English' },
    { code: 'es', name: 'Spanish',    nativeName: 'Español' },
    { code: 'fr', name: 'French',     nativeName: 'Français' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'de', name: 'German',     nativeName: 'Deutsch' },
    { code: 'sv', name: 'Swedish',    nativeName: 'Svenska' },
    { code: 'zh', name: 'Chinese',    nativeName: '中文 (简体)' },
    { code: 'ja', name: 'Japanese',   nativeName: '日本語' },
    { code: 'it', name: 'Italian',    nativeName: 'Italiano' }
  ];

  const SUPPORTED_CODES = new Set(SUPPORTED_LANGUAGES.map((l) => l.code));

  const STRINGS = {
    en: {
      page_title: 'LOTOTO Master — P&ID Isolation Training Game',
      brand_master: 'MASTER',
      home_title: 'Return to Level Map',
      sound_title: 'Toggle Sound Effects',
      guide_title: 'LOTOTO Quick Guide & P&ID Legend',
      lang_label: 'Language',
      xp_title: 'Safety Rank & XP',
      stars_title: 'Total Stars Earned',

      step_lock: 'LOCK & TAG',
      step_vent: 'VENT & DRAIN',
      step_tryout: 'TRYOUT',

      rank_0: 'Trainee',
      rank_1: 'Operator',
      rank_2: 'Permit Issuer',
      rank_3: 'Isolation Specialist',
      rank_4: 'LOTOTO Master',

      hero_badge: 'P&ID ISOLATION & SAFETY SIMULATOR',
      hero_title_html: 'Master <span>Lockout · Tagout · Tryout</span> on Live P&amp;IDs',
      hero_desc: 'Select and lock isolation points on color-coded piping diagrams, watch isolated flow paths highlight like a real job-prep markup, release stored energy, and perform Tryout verification before issuing a Safe Work Permit.',
      btn_how_to_play: '📘 P&ID Legend & Rules',
      instructor_mode: 'Instructor Mode (Unlock All 15)',
      mini_card_header: 'LIVE P&ID MARKUP PREVIEW',
      mini_isolated_env: 'ISOLATED ENVELOPE HIGHLIGHTED',
      mini_pump_safe: 'P-101 SAFE ✓',
      mini_live_psi: 'LIVE 150 PSI',
      mini_live_header: 'LIVE HEADER',

      campaign_title: '15-Level LOTOTO Certification Campaign',
      campaign_subtitle: 'Progress from single-pump isolation to full turnaround packages.',
      permits_issued: '{done} / {total} Permits Issued',
      play_level_btn: '▶ Play Level {num}: {title}',
      replay_level_btn: '🏆 Replay Level {num}: {title}',
      tier_badge: 'Tier {id}',
      lvl_badge: 'LVL {num}',
      lvl_pill: 'LVL {num}',

      tier_1_name: 'Tier 1 · Apprentice Operator',
      tier_1_desc: 'Master the 3-step LOTOTO sequence and spot classic P&ID traps (bypasses, control valves, check valves).',
      tier_2_name: 'Tier 2 · Journeyman Permit Issuer',
      tier_2_desc: 'Tackle keep-live parallel trains, dual-stream heat exchangers, multi-energy reactors, and Double Block & Bleed.',
      tier_3_name: 'Tier 3 · Master Safety Lead',
      tier_3_desc: 'Execute positive spectacle blind isolation, PSV protection, compressors, confined space entry, and a full turnaround.',

      btn_briefing: '📋 Work Permit Brief',
      safety_label: 'SAFETY',
      btn_hint: '💡 Hint',
      btn_reset: '↺ Reset',
      combo_streak: '🔥 {n}x Clean Streak',

      legend_markup: 'MARKUP:',
      legend_trapped: 'Isolated (Trapped)',
      legend_zero: 'Zero Energy (Safe)',
      legend_locked: 'Locked & Tagged',
      legend_streams: 'STREAMS:',
      stream_process: 'Process',
      stream_steam: 'Steam/Hot',
      stream_water: 'Water',
      stream_gas: 'Gas/N2',
      stream_elec: 'Electrical',

      side_target_eyebrow: 'WORK ORDER TARGET',
      side_checklist_eyebrow: 'LOTOTO PERMIT CHECKLIST',
      side_log_eyebrow: 'ISOLATION LOGBOOK',
      log_empty: 'No isolation actions logged yet.',
      btn_permit_locked: 'Complete LOTOTO to Issue Permit',
      btn_permit_ready: 'ISSUE SAFE WORK PERMIT ✓',

      brief_tier_line: 'TIER {tier} · LEVEL {id} OF {total}',
      brief_target_label: 'TARGET EQUIPMENT',
      brief_standard_label: 'ISOLATION STANDARD',
      brief_focus_title: '🎯 SAFETY FOCUS',
      btn_start_level: 'Start P&ID Isolation →',

      complete_stamp: 'SAFE WORK PERMIT ISSUED',
      complete_title_win: 'Zero Energy Verified!',
      complete_title_master: '🏆 LOTOTO MASTER CERTIFIED!',
      complete_sub: '{target} is safely isolated and ready for work.',
      stat_safety_score: 'Safety Score',
      stat_mistakes: 'Mistakes',
      stat_xp_earned: 'XP Earned',
      takeaway_title: '🦺 REAL-WORLD LOTOTO TAKEAWAY',
      btn_replay: '↺ Replay',
      btn_back_map: '🗺️ Level Map',
      btn_next_level: 'Next: Level {num} →',
      btn_finish_map: '🏆 Return to Level Map',

      guide_title_h2: '📘 LOTOTO Field Guide & P&ID Symbols',
      guide_seq_h3: 'The 3-Step LOTOTO Sequence',
      guide_step1_html: '<strong>Lock &amp; Tag (LOTO):</strong> Close and apply personal locks/tags to manual block valves &amp; electrical MCC breakers. Watch isolated pipes automatically highlight in <strong>Yellow</strong>!',
      guide_step2_html: '<strong>Vent &amp; Drain:</strong> Open vents, drains, or inter-valve bleeds on <em>isolated</em> segments to release trapped stored energy. The highlighter turns <strong>Emerald Green</strong>! (Never vent a live pressurized line!)',
      guide_step3_html: '<strong>Tryout (TO):</strong> Prove Zero Energy! Click local <strong>Start/Stop (HOA)</strong> switches to verify motors won\'t start, click <strong>Pressure Gauges (PI)</strong> at <code>0 PSI</code>, and run <strong>Gas Monitors</strong> for confined space entry.',
      guide_traps_h3: 'Watch Out for Industrial Traps!',
      guide_trap1_html: '<strong>Control Valves (FV / LV / PV):</strong> NOT valid positive isolation! Actuators can fail open and trim leaks. Always lock manual block valves.',
      guide_trap2_html: '<strong>Check Valves (CV):</strong> One-way flappers are NOT valid LOTO points—they cannot be locked and frequently leak backpressure.',
      guide_trap3_html: '<strong>Spectacle Blinds (SB):</strong> Required for hot work / line breaking / confined space—always isolate &amp; depressurize <em>before</em> swinging a blind!',
      guide_trap4_html: '<strong>Keep-Live Units:</strong> Don\'t close a shared plant header if a standby pump or adjacent unit must stay online!',
      btn_guide_ok: 'Got It — Back to P&ID',

      toast_start: 'Click manual valves & electrical breakers on the P&ID to lock out energy sources and highlight isolated flow paths.',

      // Tooltips
      tt_click: 'Click to interact',
      tt_valve_locked: 'LOCKED & TAGGED · Click to unlock',
      tt_valve_open: 'OPEN · Click to Close, Lock & Tag',
      tt_breaker_locked: 'LOCKED OUT · Click to re-energize',
      tt_breaker_open: 'ENERGIZED · Click to Open, Lock & Tag',
      tt_blind_blinded: 'BLINDED (Positive Iso) · Click to swing open',
      tt_blind_open: 'OPEN RING · Depressurize, then click to swing Blind',
      tt_vent_open: 'OPEN (Depressurized) · Click to close',
      tt_vent_closed: 'CLOSED · Isolate line first, then click to open',
      tt_gauge_ok: 'VERIFIED 0 PSI ✓',
      tt_gauge_check: 'TRYOUT · Click at 0 PSI to verify zero pressure',
      tt_switch_ok: 'VERIFIED DEAD ✓',
      tt_switch_check: 'TRYOUT · Click to bump-test motor (after MCC lock!)',
      tt_gas_ok: '0% LEL VERIFIED ✓',
      tt_gas_check: 'TRYOUT · Click after positive blinding & draining',
      tt_inspect: 'Click to inspect device',

      // Engine checklists
      chk_isolate: 'Isolate all energy sources to {target}',
      chk_keeplive_default: 'Keep standby/online equipment running',
      chk_dbb: 'Double Block & Bleed: lock valve pairs & open inter-valve bleed(s)',
      chk_vent: 'Vent & drain stored energy ({open}/{total} open)',
      chk_blind: 'Swing spectacle blind(s) for positive isolation ({done}/{total})',
      chk_tryout: 'Tryout verification: gauges, switches & checks ({done}/{total})',

      // Engine feedback & logs
      msg_trap_cv: 'TRAP! {tag} is a pneumatic Control Valve — NOT a valid LOTO isolation point. Lock the manual block valves instead!',
      log_trap_cv: 'Trap hit: {tag} (Control Valve)',
      msg_trap_check: 'TRAP! {tag} is a Check Valve — NOT a reliable isolation point! Check valves leak backpressure and cannot be locked out.',
      log_trap_check: 'Trap hit: {tag} (Check Valve)',
      msg_trap_psv: 'CRITICAL SAFETY RULE! Never close {tag} under a Pressure Safety Valve (PSV) — it protects the vessel against overpressure!',
      log_trap_psv: 'Critical warning: PSV valve {tag}',

      msg_ops_valve: 'OPS VIOLATION! Locking {tag} starved {names}! Re-open {tag} and lock only the local isolation valves.',
      log_ops_valve: '{tag} locked — starved {names}!',
      msg_valve_locked_hl: '{tag} CLOSED, LOCKED & TAGGED! Isolated flow path highlighted on the P&ID.',
      msg_valve_locked: '{tag} CLOSED, LOCKED & TAGGED! Continue isolating remaining energy paths.',
      log_valve_locked: 'Locked & tagged {tag}',
      msg_close_drain_first: 'Hold on! Close open {drain} before unlocking {tag} to prevent a live release.',
      msg_valve_unlocked: '{tag} UNLOCKED & RE-OPENED.',
      log_valve_unlocked: 'Unlocked {tag}',

      msg_ops_breaker: 'OPS VIOLATION! Locking {tag} shut down {names}! Re-energize {tag}!',
      log_ops_breaker: '{tag} cut power to {names}!',
      msg_breaker_locked: '{tag} OPENED, LOCKED & TAGGED! Electrical feed de-energized — verify with local Start switch in Tryout.',
      log_breaker_locked: 'Locked out breaker {tag}',
      msg_breaker_unlocked: '{tag} UNLOCKED & RE-ENERGIZED.',
      log_breaker_unlocked: 'Re-energized {tag}',

      msg_blind_live: 'LINE BREAK HAZARD! Never swing spectacle blind {tag} while the line is LIVE! Lock block valves & depressurize first!',
      log_blind_live: 'Hazard: tried blinding live line at {tag}',
      msg_blind_trapped: 'STORED PRESSURE WARNING! Depressurize the isolated line to 0 PSI via vent/drain before breaking flanges to swing {tag}!',
      log_blind_trapped: 'Warning: trapped pressure at {tag}',
      msg_blind_done: '{tag} SWUNG TO BLINDED & TAGGED! Positive physical isolation established ✓',
      log_blind_done: 'Installed spectacle blind {tag}',
      msg_blind_open: '{tag} swung back to OPEN ring.',
      log_blind_open: 'Swung {tag} back to open',

      msg_vent_live: 'LIVE RELEASE HAZARD! Line is still pressurized at {psi} PSI! Isolate ALL upstream & downstream sources before opening {tag}!',
      log_vent_live: 'DANGER: opened {tag} on live {psi} PSI line!',
      msg_vent_green: '{tag} OPENED! Trapped energy safely released to 0 PSI — P&ID highlighter turned GREEN!',
      msg_vent_partial: '{tag} OPENED! Pressure dropped to 0 PSI. Open any remaining vent/drain on this section.',
      log_vent_open: 'Opened {tag} — depressurized',
      msg_vent_closed: '{tag} closed.',
      log_vent_closed: 'Closed {tag}',

      msg_switch_live: 'FAILED TRYOUT! Pushing {tag} started the motor! Electrical power is STILL LIVE — Lock out the MCC breaker first!',
      log_switch_live: 'FAILED TRYOUT at {tag} — motor still live!',
      msg_switch_pass: 'TRYOUT PASSED! {tag} bump-tested — motor stayed completely dead (Zero Electrical Energy verified ✓).',
      log_switch_pass: 'Tryout PASSED: {tag} dead ✓',

      msg_gauge_live: 'TRYOUT FAILED! {tag} reads {psi} PSI (LIVE PRESSURE)! Isolate all fluid paths first.',
      log_gauge_live: 'Gauge {tag} still live ({psi} PSI)',
      msg_gauge_trapped: 'TRAPPED PRESSURE! {tag} still reads {psi} PSI! Open the vent/drain to bleed down to 0 PSI before verifying.',
      log_gauge_trapped: 'Gauge {tag} shows {psi} PSI trapped',
      msg_gauge_pass: 'TRYOUT PASSED! {tag} verified at 0 PSI — Zero Stored Pressure confirmed ✓.',
      log_gauge_pass: 'Tryout PASSED: {tag} at 0 PSI ✓',

      msg_gas_fail: 'GAS TEST FAILED! {tag} detects hazardous vapors. Complete ALL positive isolation blinds and vents/drains before atmospheric testing!',
      log_gas_fail: 'Gas test {tag} failed — isolate & blind first',
      msg_gas_pass: 'ATMOSPHERIC TEST PASSED! {tag} reads 0% LEL · 20.9% O2 — Safe for Entry ✓.',
      log_gas_pass: 'Gas Test PASSED: {tag} 0% LEL ✓',

      // Hints
      hint_unlock_kl: 'Hint: Unlock {tag} so the standby/online header stays live, then lock only the local isolation valves.',
      hint_lock: 'Hint: Lock & Tag {tag} ({desc}) to isolate this energy path.',
      hint_vent: 'Hint: Open {tag} to safely release trapped pressure and verify isolation.',
      hint_blind: 'Hint: Line is depressurized! Swing spectacle blind {tag} to BLINDED for positive isolation.',
      hint_tryout: 'Hint: Perform Tryout by clicking {tag} to confirm zero energy.',
      hint_permit: 'All LOTOTO checks are complete! Click the green "ISSUE SAFE WORK PERMIT" button on the right!',

      // SVG Badges
      svg_closed: 'CLOSED',
      svg_open_vented: 'OPEN · VENTED',
      svg_tryout_hoa: 'TRYOUT HOA',
      svg_dead_ok: 'DEAD ✓',
      svg_gas_test: 'GAS TEST',
      svg_lel_ok: '0% LEL ✓',
      svg_starved: 'STARVED!',
      svg_cso_relief: 'CSO RELIEF',
      svg_hp_meter: 'HP METER',
      svg_stamp: 'P&ID DWG-L{num} · LOTOTO MARKUP',

      // Generic device kind labels
      kind_valve: 'Manual Block Valve',
      kind_breaker: 'Electrical Breaker',
      kind_blind: 'Spectacle Blind',
      kind_vent: 'Vent Valve',
      kind_drain: 'Drain Valve',
      kind_bleed: 'Inter-Valve Bleed',
      kind_gauge: 'Pressure Gauge',
      kind_start_switch: 'Local Start/Stop Switch',
      kind_gas_detector: 'Gas Monitor',
      kind_control_valve: 'Pneumatic Control Valve (TRAP)',
      kind_check_valve: 'Check Valve (TRAP)',
      kind_psv_valve: 'Pressure Safety Valve (DO NOT CLOSE)'
    }
  };

  const LEVEL_STRINGS = {};

  let currentLang = 'en';

  function registerLocale(code, dict) {
    STRINGS[code] = Object.assign({}, STRINGS[code] || {}, dict);
  }

  function registerLevelLocale(code, levelMap) {
    LEVEL_STRINGS[code] = Object.assign({}, LEVEL_STRINGS[code] || {}, levelMap);
  }

  function detectBrowserLanguage() {
    const candidates = [];
    if (Array.isArray(navigator.languages)) {
      candidates.push(...navigator.languages);
    }
    if (navigator.language) candidates.push(navigator.language);
    if (navigator.userLanguage) candidates.push(navigator.userLanguage);

    for (let i = 0; i < candidates.length; i++) {
      const raw = String(candidates[i] || '').toLowerCase().trim();
      const base = raw.split(/[-_]/)[0];
      if (SUPPORTED_CODES.has(base)) {
        return base;
      }
    }
    return 'en';
  }

  function init() {
    let saved = null;
    try {
      saved = localStorage.getItem(LANG_STORAGE_KEY);
    } catch (_) {}

    if (saved && SUPPORTED_CODES.has(saved)) {
      currentLang = saved;
    } else {
      currentLang = detectBrowserLanguage();
    }
    document.documentElement.lang = currentLang;
    return currentLang;
  }

  function setLang(code) {
    if (!SUPPORTED_CODES.has(code)) return currentLang;
    currentLang = code;
    document.documentElement.lang = code;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, code);
    } catch (_) {}
    return currentLang;
  }

  function getLang() {
    return currentLang;
  }

  function t(key, vars) {
    const dict = STRINGS[currentLang] || STRINGS.en;
    let str = dict[key];
    if (str === undefined) {
      str = STRINGS.en[key];
    }
    if (str === undefined) return key;
    if (vars) {
      Object.keys(vars).forEach((k) => {
        str = str.replace(new RegExp('\\{' + k + '\\}', 'g'), String(vars[k]));
      });
    }
    return str;
  }

  function getLevelText(level, field) {
    if (!level) return '';
    if (currentLang !== 'en') {
      const langLevels = LEVEL_STRINGS[currentLang];
      if (langLevels && langLevels[level.id] && langLevels[level.id][field] !== undefined) {
        return langLevels[level.id][field];
      }
    }
    return level[field] || '';
  }

  function getTierText(tier, field) {
    const key = `tier_${tier.id}_${field}`;
    return t(key);
  }

  function getDeviceDesc(dev) {
    if (!dev) return '';
    if (currentLang === 'en') return dev.desc || t(`kind_${dev.kind}`);
    const kindKey = `kind_${dev.kind}`;
    return t(kindKey);
  }

  function applyToDom() {
    document.title = t('page_title');
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.getAttribute('data-i18n-html'));
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
  }

  LOTOTO.i18n = {
    SUPPORTED_LANGUAGES,
    registerLocale,
    registerLevelLocale,
    detectBrowserLanguage,
    init,
    setLang,
    getLang,
    t,
    getLevelText,
    getTierText,
    getDeviceDesc,
    applyToDom
  };
})(window);
