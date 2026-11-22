/* ==========================================================================
   LOTOTO MASTER — Main Game Controller, Progression, i18n, Tooltips & Confetti
   ========================================================================== */
(function (global) {
  'use strict';

  const LOTOTO = (global.LOTOTO = global.LOTOTO || {});
  const SAVE_KEY = 'lototo_master_save_v1';

  const RANKS = [
    { minXp: 0,    key: 'rank_0' },
    { minXp: 300,  key: 'rank_1' },
    { minXp: 800,  key: 'rank_2' },
    { minXp: 1500, key: 'rank_3' },
    { minXp: 2300, key: 'rank_4' }
  ];

  let save = loadSave();
  let currentLevel = null;
  let currentState = null;
  let currentEval = null;
  let hintDeviceId = null;
  let activeFx = null;
  let fxTimer = null;
  let lastToast = { severity: 'info', key: 'toast_start', vars: null, text: '' };
  let lastCompleteData = null;
  let activeIncident = null;
  let pendingTagDeviceId = null;
  let selectedTagEquip = null;
  let selectedTagReason = null;

  const LEVEL_TAG_META = {
    1:  { reason: 'reason_seal',    distractors: ['P-102', 'V-104'] },
    2:  { reason: 'reason_clean',   distractors: ['S-105', 'P-201'] },
    3:  { reason: 'reason_seal',    distractors: ['P-104', 'E-103'] },
    4:  { reason: 'reason_clean',   distractors: ['FV-401', 'E-402'] },
    5:  { reason: 'reason_seal',    distractors: ['P-106', 'CV-501'] },
    6:  { reason: 'reason_seal',    distractors: ['P-201B', 'P-202A'] },
    7:  { reason: 'reason_bundle',  distractors: ['E-302', 'V-301'] },
    8:  { reason: 'reason_clean',   distractors: ['V-305', 'T-302'] },
    9:  { reason: 'reason_bundle',  distractors: ['R-402', 'V-401'] },
    10: { reason: 'reason_meter',   distractors: ['M-502', 'K-501'] },
    11: { reason: 'reason_hotwork', distractors: ['E-503', 'V-502'] },
    12: { reason: 'reason_clean',   distractors: ['V-602', 'PSV-1201'] },
    13: { reason: 'reason_meter',   distractors: ['K-702', 'P-701'] },
    14: { reason: 'reason_cse',     distractors: ['T-802', 'V-801'] },
    15: { reason: 'reason_cse',     distractors: ['P-901B', 'E-902'] }
  };

  const ALL_REASON_KEYS = [
    'reason_seal', 'reason_clean', 'reason_bundle',
    'reason_meter', 'reason_hotwork', 'reason_cse'
  ];

  const els = {};

  function $(id) {
    return document.getElementById(id);
  }

  function t(key, vars) {
    return LOTOTO.i18n ? LOTOTO.i18n.t(key, vars) : key;
  }

  function lvlTxt(level, field) {
    return LOTOTO.i18n ? LOTOTO.i18n.getLevelText(level, field) : (level[field] || '');
  }

  function tierTxt(tier, field) {
    return LOTOTO.i18n ? LOTOTO.i18n.getTierText(tier, field) : (tier[field] || '');
  }

  function loadSave() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          completed: parsed.completed || {},
          xp: parsed.xp || 0,
          unlockAll: !!parsed.unlockAll,
          muted: !!parsed.muted,
          employeeName: parsed.employeeName || ''
        };
      }
    } catch (_) {}
    return { completed: {}, xp: 0, unlockAll: false, muted: false, employeeName: '' };
  }

  function persistSave() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch (_) {}
  }

  function getRank(xp) {
    let key = RANKS[0].key;
    for (let i = 0; i < RANKS.length; i++) {
      if (xp >= RANKS[i].minXp) key = RANKS[i].key;
    }
    return t(key);
  }

  function getTotalStars() {
    return Object.values(save.completed).reduce((sum, rec) => sum + (rec.stars || 0), 0);
  }

  function getHighestUnlockedLevel() {
    if (save.unlockAll) return LOTOTO.LEVELS.length;
    let highest = 1;
    for (let i = 0; i < LOTOTO.LEVELS.length; i++) {
      const id = LOTOTO.LEVELS[i].id;
      if (save.completed[id]) {
        highest = Math.min(LOTOTO.LEVELS.length, id + 1);
      }
    }
    return highest;
  }

  function updateGlobalHud() {
    const stars = getTotalStars();
    const maxStars = LOTOTO.LEVELS.length * 3;
    els.hudXp.textContent = `${save.xp} XP`;
    els.hudRank.textContent = getRank(save.xp);
    els.hudStars.textContent = `${stars} / ${maxStars}`;
    els.soundIcon.textContent = save.muted ? '🔇' : '🔊';
  }

  /* ==================== LANGUAGE SWITCHING ==================== */
  function initLanguageDropdown() {
    if (!LOTOTO.i18n || !els.langSelect) return;
    const activeLang = LOTOTO.i18n.init();
    els.langSelect.innerHTML = '';
    LOTOTO.i18n.SUPPORTED_LANGUAGES.forEach((lang) => {
      const opt = document.createElement('option');
      opt.value = lang.code;
      opt.textContent = lang.nativeName;
      if (lang.code === activeLang) opt.selected = true;
      els.langSelect.appendChild(opt);
    });
    LOTOTO.i18n.applyToDom();

    els.langSelect.addEventListener('change', (e) => {
      applyLanguageChange(e.target.value);
    });
  }

  function applyLanguageChange(code) {
    if (!LOTOTO.i18n) return;
    LOTOTO.i18n.setLang(code);
    LOTOTO.i18n.applyToDom();
    updateGlobalHud();

    if (currentLevel) {
      updateLevelHeaderText();
      // Re-translate current toast if keyed
      if (lastToast && lastToast.key) {
        setToastKey(lastToast.severity, lastToast.key, lastToast.vars, false);
      }
      refreshGameView();
      if (!els.modalBriefing.classList.contains('hidden')) {
        populateBriefingModal();
      }
      if (!els.modalComplete.classList.contains('hidden') && lastCompleteData) {
        populateCompleteModal(lastCompleteData);
      }
      if (!els.modalIncident.classList.contains('hidden') && activeIncident) {
        populateIncidentModal(activeIncident);
      }
      if (!els.modalTag.classList.contains('hidden')) {
        populateTagModal();
      }
    } else {
      renderLevelMap();
    }
  }

  /* ==================== SCREEN NAVIGATION ==================== */
  function showMapScreen() {
    currentLevel = null;
    lastCompleteData = null;
    els.screenGame.classList.remove('active');
    els.screenMap.classList.add('active');
    els.topbarLevelPill.classList.add('hidden');
    els.lototoStepper.classList.add('hidden');
    closeAllModals();
    renderLevelMap();
    updateGlobalHud();
  }

  function updateLevelHeaderText() {
    if (!currentLevel) return;
    const lvl = currentLevel;
    els.hudLevelBadge.textContent = t('lvl_pill', { num: lvl.id });
    els.hudLevelTitle.textContent = lvlTxt(lvl, 'title');
    els.standardBadge.textContent = lvlTxt(lvl, 'standard');
    els.sideTargetName.textContent = lvlTxt(lvl, 'targetName');
    els.sideWorkScope.textContent = lvlTxt(lvl, 'workScope');

    if (lvl.keepLiveRule) {
      els.keepLiveCallout.classList.remove('hidden');
      els.keepLiveText.textContent = lvlTxt(lvl, 'keepLiveRule');
    } else {
      els.keepLiveCallout.classList.add('hidden');
    }
  }

  function startLevel(levelId, showBriefing = true) {
    const lvl = LOTOTO.LEVELS.find((l) => l.id === levelId);
    if (!lvl) return;

    currentLevel = lvl;
    currentState = LOTOTO.engine.createInitialState(lvl);
    currentState.requireTag = true;
    hintDeviceId = null;
    activeFx = null;
    lastCompleteData = null;
    pendingTagDeviceId = null;
    selectedTagEquip = null;
    selectedTagReason = null;

    els.screenMap.classList.remove('active');
    els.screenGame.classList.add('active');
    els.topbarLevelPill.classList.remove('hidden');
    els.lototoStepper.classList.remove('hidden');

    updateLevelHeaderText();
    setToastKey('info', 'toast_start', null, false);
    refreshGameView();

    if (showBriefing) {
      openBriefingModal();
    }
  }

  /* ==================== LEVEL MAP RENDERING ==================== */
  function renderLevelMap() {
    const completedCount = Object.keys(save.completed).length;
    const total = LOTOTO.LEVELS.length;
    const highestUnlocked = getHighestUnlockedLevel();

    els.mapPermitsText.textContent = t('permits_issued', { done: completedCount, total });
    els.mapProgressFill.style.width = `${Math.round((completedCount / total) * 100)}%`;
    els.chkUnlockAll.checked = save.unlockAll;

    const nextPlayId = Math.min(total, highestUnlocked);
    const nextLvl = LOTOTO.LEVELS.find((l) => l.id === nextPlayId) || LOTOTO.LEVELS[0];
    const nextTitle = lvlTxt(nextLvl, 'title');
    els.btnPlayNext.textContent = completedCount >= total
      ? t('replay_level_btn', { num: nextLvl.id, title: nextTitle })
      : t('play_level_btn', { num: nextLvl.id, title: nextTitle });
    els.btnPlayNext.onclick = () => startLevel(nextLvl.id, true);

    els.tierContainer.innerHTML = '';

    LOTOTO.TIERS.forEach((tier) => {
      const section = document.createElement('div');
      section.className = `tier-section tier-${tier.id}`;

      const tierLevels = LOTOTO.LEVELS.filter((l) => l.tier === tier.id);
      const tierDone = tierLevels.filter((l) => !!save.completed[l.id]).length;

      section.innerHTML = `
        <div class="tier-header">
          <div class="tier-title-group">
            <span class="tier-pill">${t('tier_badge', { id: tier.id })}</span>
            <h3>${tierTxt(tier, 'name')}</h3>
          </div>
          <span class="tier-desc">${tierTxt(tier, 'desc')} (${tierDone}/${tierLevels.length})</span>
        </div>
        <div class="levels-grid"></div>
      `;

      const grid = section.querySelector('.levels-grid');
      tierLevels.forEach((lvl) => {
        const rec = save.completed[lvl.id];
        const unlocked = save.unlockAll || lvl.id <= highestUnlocked;
        const isCurrent = unlocked && !rec && lvl.id === highestUnlocked;

        const card = document.createElement('button');
        card.className = 'level-card';
        if (rec) card.classList.add('completed');
        if (isCurrent) card.classList.add('current');
        if (!unlocked) card.classList.add('locked');

        const starsHtml = unlocked
          ? [1, 2, 3].map((s) => `<span class="${rec && rec.stars >= s ? '' : 'empty-star'}">★</span>`).join('')
          : '🔒';

        card.innerHTML = `
          <div class="lvl-card-top">
            <span class="lvl-num-badge">${t('lvl_badge', { num: String(lvl.id).padStart(2, '0') })}</span>
            <span class="lvl-stars">${starsHtml}</span>
          </div>
          <div class="lvl-card-title">${lvlTxt(lvl, 'title')}</div>
          <div class="lvl-card-target">${lvl.targetShort} · ${lvlTxt(lvl, 'standard')}</div>
          <div class="lvl-card-concept">${lvlTxt(lvl, 'conceptTag')}</div>
        `;

        if (unlocked) {
          card.addEventListener('click', () => startLevel(lvl.id, true));
        }
        grid.appendChild(card);
      });

      els.tierContainer.appendChild(section);
    });
  }

  /* ==================== GAMEPLAY INTERACTION & RENDER ==================== */
  function handleDeviceClick(deviceId) {
    if (!currentLevel || !currentState || currentState.completed) return;

    // Intercept first valid lock on a level to complete the Master DANGER LOTO Tag once
    if (LOTOTO.engine.needsTagPrompt && LOTOTO.engine.needsTagPrompt(currentLevel, currentState, deviceId)) {
      pendingTagDeviceId = deviceId;
      openTagModal();
      return;
    }

    hintDeviceId = null;
    const res = LOTOTO.engine.interact(currentLevel, currentState, deviceId);

    if (res.sound && LOTOTO.sound[res.sound]) {
      LOTOTO.sound[res.sound]();
    }
    if (res.msgKey) {
      setToastKey(res.severity || 'info', res.msgKey, res.msgVars, true);
    } else if (res.message) {
      setToast(res.severity || 'info', res.message);
    }
    if (res.fx) {
      activeFx = res.fx;
      clearTimeout(fxTimer);
      fxTimer = setTimeout(() => {
        activeFx = null;
        if (currentLevel) refreshSvgOnly();
      }, 780);
    }

    refreshGameView();

    if (res.incident) {
      openIncidentModal(res.incident);
    }
  }

  function refreshSvgOnly() {
    if (!currentLevel || !currentState || !currentEval) return;
    LOTOTO.renderer.render(els.pidSvg, currentLevel, currentState, currentEval, {
      onInteract: handleDeviceClick,
      onHover: showTooltip,
      onLeave: hideTooltip,
      hintDeviceId,
      activeFx
    });
  }

  function refreshGameView() {
    currentEval = LOTOTO.engine.evaluate(currentLevel, currentState);
    refreshSvgOnly();

    // Update Safety Score
    const sc = currentState.safetyScore;
    els.hudSafetyScore.textContent = `${sc}%`;
    const scoreBox = els.hudSafetyScore.parentElement;
    scoreBox.classList.remove('warn', 'danger');
    if (sc < 70) scoreBox.classList.add('danger');
    else if (sc < 90) scoreBox.classList.add('warn');

    // Update Streak Combo Badge
    if (currentState.streak >= 3) {
      els.comboBadge.textContent = t('combo_streak', { n: currentState.streak });
      els.comboBadge.classList.remove('hidden');
    } else {
      els.comboBadge.classList.add('hidden');
    }

    // Update Keep-Live Callout alert style
    if (currentEval.keepLiveViolations.length > 0) {
      els.keepLiveCallout.classList.add('violated');
    } else {
      els.keepLiveCallout.classList.remove('violated');
    }

    // Update 3-Phase LOTOTO Stepper
    updateStepChip(els.stepLock, currentEval.lockPhaseDone, !currentEval.lockPhaseDone);
    updateStepChip(els.stepVent, currentEval.ventPhaseDone, currentEval.lockPhaseDone && !currentEval.ventPhaseDone);
    updateStepChip(els.stepTryout, currentEval.tryoutPhaseDone, currentEval.ventPhaseDone && !currentEval.tryoutPhaseDone);

    // Update Permit Checklist
    const doneCount = currentEval.checklist.filter((c) => c.done).length;
    els.checklistFraction.textContent = `${doneCount} / ${currentEval.checklist.length}`;
    els.permitChecklist.innerHTML = '';
    currentEval.checklist.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'check-item' + (item.error ? ' error' : item.done ? ' done' : '');
      li.innerHTML = `
        <span class="check-box">${item.error ? '!' : item.done ? '✓' : ''}</span>
        <span>${item.label}</span>
      `;
      els.permitChecklist.appendChild(li);
    });

    // Update Action Logbook (re-translated dynamically on language change!)
    els.actionLog.innerHTML = '';
    if (currentState.log.length === 0) {
      els.actionLog.innerHTML = `<li class="log-entry">${t('log_empty')}</li>`;
    } else {
      currentState.log.forEach((entry) => {
        const li = document.createElement('li');
        li.className = `log-entry ${entry.tone || ''}`;
        li.textContent = entry.key ? t(entry.key, entry.vars) : entry.text;
        els.actionLog.appendChild(li);
      });
    }

    // Update LOTO Tag toolbar badge
    if (els.btnTag) {
      if (currentState.tagInfo) {
        const tagCount = Object.keys(currentState.tagNumbers || {}).length;
        els.btnTag.classList.add('ready');
        els.btnTag.textContent = t('tag_btn_ready', {
          count: Math.max(1, tagCount),
          name: currentState.tagInfo.name
        });
      } else {
        els.btnTag.classList.remove('ready');
        els.btnTag.textContent = t('tag_btn_prepare');
      }
    }

    // Update Issue Permit CTA button
    if (currentEval.readyForPermit) {
      els.btnIssuePermit.disabled = false;
      els.permitBtnLabel.textContent = t('btn_permit_ready');
    } else {
      els.btnIssuePermit.disabled = true;
      els.permitBtnLabel.textContent = t('btn_permit_locked');
    }
  }

  function updateStepChip(chipEl, isDone, isActive) {
    chipEl.classList.remove('done', 'active');
    if (isDone) chipEl.classList.add('done');
    else if (isActive) chipEl.classList.add('active');
  }

  function setToastKey(severity, key, vars, animate = true) {
    lastToast = { severity, key, vars, text: t(key, vars) };
    renderToast(severity, lastToast.text, animate);
  }

  function setToast(severity, text) {
    lastToast = { severity, key: null, vars: null, text };
    renderToast(severity, text, true);
  }

  function renderToast(severity, text, animate) {
    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', danger: '🚨' };
    els.toastBanner.className = `toast-banner ${severity}`;
    if (animate) {
      void els.toastBanner.offsetWidth;
    }
    els.toastIcon.textContent = icons[severity] || 'ℹ️';
    els.toastText.textContent = text;
  }

  /* ==================== TOOLTIPS ==================== */
  function showTooltip(dev, evt) {
    const stateVal = currentState.devices[dev.id];
    const tagNum = currentState.tagNumbers && currentState.tagNumbers[dev.id];
    const tagOwner = currentState.tagInfo && currentState.tagInfo.name;
    let actionHint = t('tt_click');
    if (dev.kind === 'valve') {
      actionHint = stateVal === 'locked'
        ? (tagNum && tagOwner ? t('tt_tagged_by', { num: tagNum, name: tagOwner }) : t('tt_valve_locked'))
        : t('tt_valve_open');
    } else if (dev.kind === 'breaker') {
      actionHint = stateVal === 'locked'
        ? (tagNum && tagOwner ? t('tt_tagged_by', { num: tagNum, name: tagOwner }) : t('tt_breaker_locked'))
        : t('tt_breaker_open');
    } else if (dev.kind === 'blind') {
      actionHint = stateVal === 'blinded'
        ? (tagNum && tagOwner ? t('tt_tagged_by', { num: tagNum, name: tagOwner }) : t('tt_blind_blinded'))
        : t('tt_blind_open');
    } else if (dev.kind === 'vent' || dev.kind === 'drain' || dev.kind === 'bleed') {
      actionHint = stateVal === 'open' ? t('tt_vent_open') : t('tt_vent_closed');
    } else if (dev.kind === 'gauge') {
      actionHint = currentState.verified[dev.id] ? t('tt_gauge_ok') : t('tt_gauge_check');
    } else if (dev.kind === 'start_switch') {
      actionHint = currentState.verified[dev.id] ? t('tt_switch_ok') : t('tt_switch_check');
    } else if (dev.kind === 'gas_detector') {
      actionHint = currentState.verified[dev.id] ? t('tt_gas_ok') : t('tt_gas_check');
    } else if (dev.kind === 'control_valve' || dev.kind === 'check_valve' || dev.kind === 'psv_valve') {
      actionHint = t('tt_inspect');
    }

    const desc = LOTOTO.i18n ? LOTOTO.i18n.getDeviceDesc(dev) : (dev.desc || dev.kind);
    els.pidTooltip.innerHTML = `<strong>${dev.tag} — ${desc}</strong>${actionHint}`;
    els.pidTooltip.classList.remove('hidden');

    const rect = els.pidViewport.getBoundingClientRect();
    let left = evt.clientX - rect.left + 16;
    let top = evt.clientY - rect.top - 12;
    if (left + 230 > rect.width) left = evt.clientX - rect.left - 240;
    if (top < 8) top = 10;
    if (top + 65 > rect.height) top = rect.height - 72;

    els.pidTooltip.style.left = `${Math.max(8, left)}px`;
    els.pidTooltip.style.top = `${top}px`;
  }

  function hideTooltip() {
    els.pidTooltip.classList.add('hidden');
  }

  /* ==================== HINT & PERMIT COMPLETION ==================== */
  function handleHint() {
    if (!currentLevel || !currentState || !currentEval) return;
    const hint = LOTOTO.engine.getHint(currentLevel, currentState, currentEval);
    hintDeviceId = hint.deviceId;
    if (hintDeviceId) {
      currentState.hintsUsed += 1;
      currentState.safetyScore = Math.max(0, currentState.safetyScore - 10);
      currentState.streak = 0;
    }
    LOTOTO.sound.verify();
    if (hint.msgKey) {
      setToastKey('warning', hint.msgKey, hint.msgVars, true);
    } else {
      setToast('warning', hint.message);
    }
    refreshGameView();
  }

  function handleIssuePermit() {
    if (!currentLevel || !currentState || !currentEval || !currentEval.readyForPermit) return;
    currentState.completed = true;
    LOTOTO.sound.victory();
    launchConfetti();

    const score = currentState.safetyScore;
    const stars = score >= 90 ? 3 : score >= 70 ? 2 : 1;
    const baseXp = 100 + currentLevel.id * 15;
    const bonusXp = Math.round((score / 100) * 60);
    const prevRec = save.completed[currentLevel.id];
    const xpEarned = prevRec ? Math.max(25, Math.round((baseXp + bonusXp) * 0.25)) : baseXp + bonusXp;

    save.xp += xpEarned;
    save.completed[currentLevel.id] = {
      stars: Math.max(prevRec ? prevRec.stars : 0, stars),
      bestScore: Math.max(prevRec ? prevRec.bestScore : 0, score)
    };
    persistSave();
    updateGlobalHud();

    lastCompleteData = { score, stars, mistakes: currentState.mistakes, xpEarned };
    populateCompleteModal(lastCompleteData);
    els.modalComplete.classList.remove('hidden');
  }

  function populateCompleteModal(data) {
    if (!currentLevel || !data) return;
    const { score, stars, mistakes, xpEarned } = data;
    els.completeStars.textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    els.completeTitle.textContent =
      currentLevel.id === LOTOTO.LEVELS.length
        ? t('complete_title_master')
        : t('complete_title_win');
    els.completeSubtitle.textContent = t('complete_sub', { target: lvlTxt(currentLevel, 'targetName') });
    els.compScore.textContent = `${score}%`;
    els.compMistakes.textContent = String(mistakes);
    els.compXp.textContent = `+${xpEarned} XP`;
    els.compTakeaway.textContent = lvlTxt(currentLevel, 'takeaway');

    const hasNext = currentLevel.id < LOTOTO.LEVELS.length;
    els.btnNextLevel.textContent = hasNext
      ? t('btn_next_level', { num: currentLevel.id + 1 })
      : t('btn_finish_map');
    els.btnNextLevel.onclick = () => {
      closeAllModals();
      if (hasNext) startLevel(currentLevel.id + 1, true);
      else showMapScreen();
    };
  }

  /* ==================== MODALS ==================== */
  function populateBriefingModal() {
    if (!currentLevel) return;
    els.briefTierBadge.textContent = t('brief_tier_line', {
      tier: currentLevel.tier,
      id: currentLevel.id,
      total: LOTOTO.LEVELS.length
    });
    els.briefTitle.textContent = lvlTxt(currentLevel, 'title');
    els.briefTarget.textContent = lvlTxt(currentLevel, 'targetName');
    els.briefStandard.textContent = lvlTxt(currentLevel, 'standard');
    els.briefDescription.textContent = lvlTxt(currentLevel, 'briefDesc');
    els.briefLesson.textContent = lvlTxt(currentLevel, 'lessonFocus');
  }

  function openBriefingModal() {
    populateBriefingModal();
    els.modalBriefing.classList.remove('hidden');
  }

  function populateIncidentModal(inc) {
    if (!inc) return;
    const isFatal = !!inc.fatal;
    els.incidentCard.classList.remove('fatal', 'hazard');
    els.incidentCard.classList.add(isFatal ? 'fatal' : 'hazard');

    els.incIcon.textContent = isFatal ? '🚨' : '⚠️';
    els.incBadge.textContent = t(isFatal ? 'inc_badge_fatal' : 'inc_badge_hazard');
    els.incTitle.textContent = t(inc.titleKey, inc.vars);
    els.incDevice.textContent = inc.deviceTag || '—';
    els.incMedium.textContent = t(inc.mediumKey || 'med_process');
    els.incRating.textContent = inc.rating || '—';
    els.incSeverity.textContent = t(isFatal ? 'inc_sev_fatal' : 'inc_sev_hazard');
    els.incBody.textContent = t(inc.bodyKey, inc.vars);
    els.incSequence.textContent = t(inc.seqKey, inc.vars);

    els.btnIncidentAck.classList.remove('btn-danger', 'btn-warning');
    els.btnIncidentAck.classList.add(isFatal ? 'btn-danger' : 'btn-warning');
    els.btnIncidentAck.textContent = isFatal
      ? t('inc_btn_restart')
      : t('inc_btn_continue', { pen: inc.penalty || 0 });
  }

  function openIncidentModal(inc) {
    activeIncident = inc;
    populateIncidentModal(inc);
    els.modalIncident.classList.remove('hidden');
  }

  function handleIncidentAck() {
    const wasFatal = activeIncident && activeIncident.fatal;
    activeIncident = null;
    els.modalIncident.classList.add('hidden');
    if (wasFatal && currentLevel) {
      startLevel(currentLevel.id, false);
    }
  }

  /* ==================== GLOBAL ISO-STYLE LOTO DANGER TAG MODAL ==================== */
  function formatCurrentTimestamp() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  }

  function getTagChoiceLists(level) {
    const meta = LEVEL_TAG_META[level.id] || { reason: 'reason_seal', distractors: ['P-999', 'V-999'] };
    const targetId = level.targetShort || 'EQ-101';
    // Deterministic rotation by level.id so correct option isn't always first
    const equipRaw = [targetId, meta.distractors[0], meta.distractors[1]];
    const shift = level.id % 3;
    const equipChoices = [equipRaw[shift], equipRaw[(shift + 1) % 3], equipRaw[(shift + 2) % 3]];

    const otherReasons = ALL_REASON_KEYS.filter((k) => k !== meta.reason);
    const d1 = otherReasons[level.id % otherReasons.length];
    const d2 = otherReasons[(level.id + 2) % otherReasons.length];
    const reasonRaw = [meta.reason, d1, d2];
    const rShift = (level.id + 1) % 3;
    const reasonChoices = [reasonRaw[rShift], reasonRaw[(rShift + 1) % 3], reasonRaw[(rShift + 2) % 3]];

    return { targetId, correctReason: meta.reason, equipChoices, reasonChoices };
  }

  function populateTagModal() {
    if (!currentLevel || !currentState) return;
    const isSigned = !!currentState.tagInfo;
    const lists = getTagChoiceLists(currentLevel);

    els.tagErrorBanner.classList.add('hidden');
    els.tagInputName.placeholder = t('tag_placeholder_name');
    els.tagInputDate.placeholder = t('tag_placeholder_date');

    if (isSigned) {
      els.tagInputName.value = currentState.tagInfo.name;
      els.tagInputDate.value = currentState.tagInfo.dateTime;
      selectedTagEquip = currentState.tagInfo.equipId;
      selectedTagReason = currentState.tagInfo.reasonKey;
    } else {
      if (!els.tagInputName.value && save.employeeName) {
        els.tagInputName.value = save.employeeName;
      }
    }

    els.tagInputName.disabled = isSigned;
    els.tagInputDate.disabled = isSigned;
    els.btnTagStamp.classList.toggle('hidden', isSigned);

    // Equipment ID choices
    els.tagEquipOptions.innerHTML = '';
    lists.equipChoices.forEach((eqId) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tag-choice-btn' + (selectedTagEquip === eqId ? ' selected' : '');
      btn.textContent = eqId;
      btn.disabled = isSigned;
      btn.addEventListener('click', () => {
        selectedTagEquip = eqId;
        els.tagErrorBanner.classList.add('hidden');
        populateTagModal();
      });
      els.tagEquipOptions.appendChild(btn);
    });

    // Reason choices
    els.tagReasonOptions.innerHTML = '';
    lists.reasonChoices.forEach((rKey) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'tag-choice-btn' + (selectedTagReason === rKey ? ' selected' : '');
      btn.textContent = t(rKey);
      btn.disabled = isSigned;
      btn.addEventListener('click', () => {
        selectedTagReason = rKey;
        els.tagErrorBanner.classList.add('hidden');
        populateTagModal();
      });
      els.tagReasonOptions.appendChild(btn);
    });

    // Tagged points summary
    const taggedPairs = Object.entries(currentState.tagNumbers || {})
      .sort((a, b) => a[1] - b[1])
      .map(([devId, num]) => {
        const d = (currentLevel.devices || []).find((x) => x.id === devId);
        return { num, tag: d ? d.tag : devId };
      });

    els.tagPointsList.innerHTML = '';
    if (taggedPairs.length > 0) {
      taggedPairs.forEach((p) => {
        const pill = document.createElement('span');
        pill.className = 'tag-point-pill';
        pill.textContent = `#${p.num} · ${p.tag}`;
        els.tagPointsList.appendChild(pill);
      });
    } else {
      const pendingDev = pendingTagDeviceId && (currentLevel.devices || []).find((x) => x.id === pendingTagDeviceId);
      const span = document.createElement('span');
      span.textContent = t('tag_points_none', { tag: pendingDev ? pendingDev.tag : currentLevel.targetShort });
      els.tagPointsList.appendChild(span);
    }

    // Buttons
    if (isSigned) {
      els.btnTagSubmit.classList.add('hidden');
      els.btnTagCancel.textContent = t('tag_btn_close');
    } else {
      els.btnTagSubmit.classList.remove('hidden');
      els.btnTagSubmit.textContent = t('tag_btn_submit');
      els.btnTagCancel.textContent = t('tag_btn_cancel');
    }
  }

  function openTagModal() {
    if (!currentLevel || !currentState) return;
    if (!currentState.tagInfo) {
      els.tagInputName.value = save.employeeName || '';
      els.tagInputDate.value = '';
      selectedTagEquip = null;
      selectedTagReason = null;
    }
    populateTagModal();
    els.modalTag.classList.remove('hidden');
  }

  function showTagError(msg) {
    LOTOTO.sound.warn();
    els.tagErrorBanner.textContent = msg;
    els.tagErrorBanner.classList.remove('hidden');
  }

  function handleTagSubmit() {
    if (!currentLevel || !currentState) return;
    const lists = getTagChoiceLists(currentLevel);
    const name = (els.tagInputName.value || '').trim();
    const dateTime = (els.tagInputDate.value || '').trim();

    if (!name) {
      showTagError(t('tag_err_name'));
      els.tagInputName.focus();
      return;
    }
    if (!dateTime) {
      showTagError(t('tag_err_date'));
      return;
    }
    if (selectedTagEquip !== lists.targetId) {
      showTagError(t('tag_err_equip', { target: lists.targetId }));
      return;
    }
    if (selectedTagReason !== lists.correctReason) {
      showTagError(t('tag_err_reason'));
      return;
    }

    // Valid LOTO Tag completed!
    save.employeeName = name;
    persistSave();
    currentState.tagInfo = {
      name,
      dateTime,
      equipId: selectedTagEquip,
      reasonKey: selectedTagReason
    };
    LOTOTO.sound.verify();
    els.modalTag.classList.add('hidden');

    const devToLock = pendingTagDeviceId;
    pendingTagDeviceId = null;

    if (devToLock) {
      handleDeviceClick(devToLock);
    } else {
      setToastKey('success', 'tag_toast_signed', { name }, true);
      refreshGameView();
    }
  }

  function closeAllModals() {
    els.modalBriefing.classList.add('hidden');
    els.modalComplete.classList.add('hidden');
    els.modalGuide.classList.add('hidden');
    els.modalIncident.classList.add('hidden');
    els.modalTag.classList.add('hidden');
    activeIncident = null;
    pendingTagDeviceId = null;
  }

  /* ==================== CONFETTI CELEBRATION ==================== */
  function launchConfetti() {
    const canvas = els.confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#22c55e', '#3b82f6', '#facc15', '#ef4444', '#8b5cf6', '#06b6d4'];
    const particles = Array.from({ length: 110 }, () => ({
      x: canvas.width * (0.25 + Math.random() * 0.5),
      y: canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 14,
      vy: -6 - Math.random() * 10,
      size: 6 + Math.random() * 6,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.25,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1
    }));

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.life <= 0) return;
        alive = true;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.36;
        p.rot += p.vrot;
        p.life -= 0.014;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
        ctx.restore();
      });
      if (alive) requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    requestAnimationFrame(tick);
  }

  /* ==================== BOOTSTRAP ==================== */
  function init() {
    const ids = [
      'btn-home', 'topbar-level-pill', 'hud-level-badge', 'hud-level-title',
      'lototo-stepper', 'step-lock', 'step-vent', 'step-tryout',
      'lang-select', 'hud-rank', 'hud-xp', 'hud-stars', 'btn-sound', 'sound-icon', 'btn-guide',
      'screen-map', 'screen-game', 'btn-play-next', 'btn-how-to-play', 'chk-unlock-all',
      'map-permits-text', 'map-progress-fill', 'tier-container',
      'btn-briefing', 'btn-tag', 'standard-badge', 'combo-badge', 'hud-safety-score',
      'btn-hint', 'btn-reset', 'toast-banner', 'toast-icon', 'toast-text',
      'pid-viewport', 'pid-svg', 'pid-tooltip',
      'side-target-name', 'side-work-scope', 'keep-live-callout', 'keep-live-text',
      'checklist-fraction', 'permit-checklist', 'action-log', 'btn-issue-permit', 'permit-btn-label',
      'modal-briefing', 'brief-tier-badge', 'brief-title', 'brief-target', 'brief-standard',
      'brief-description', 'brief-lesson', 'btn-start-level',
      'modal-complete', 'complete-stars', 'complete-title', 'complete-subtitle',
      'comp-score', 'comp-mistakes', 'comp-xp', 'comp-takeaway',
      'btn-replay-level', 'btn-back-map', 'btn-next-level',
      'modal-guide', 'btn-close-guide', 'btn-guide-ok',
      'modal-incident', 'incident-card', 'inc-icon', 'inc-badge', 'inc-title',
      'inc-device', 'inc-medium', 'inc-rating', 'inc-severity',
      'inc-body', 'inc-sequence', 'btn-incident-ack',
      'modal-tag', 'tag-error-banner', 'tag-input-name', 'tag-input-date', 'btn-tag-stamp',
      'tag-equip-options', 'tag-reason-options', 'tag-points-list',
      'btn-tag-cancel', 'btn-tag-submit', 'confetti-canvas'
    ];
    ids.forEach((id) => {
      const camel = id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      els[camel] = $(id);
    });

    LOTOTO.sound.setMuted(save.muted);
    initLanguageDropdown();

    // Event bindings
    els.btnHome.addEventListener('click', showMapScreen);
    els.btnSound.addEventListener('click', () => {
      save.muted = LOTOTO.sound.toggleMute();
      persistSave();
      updateGlobalHud();
    });
    els.btnGuide.addEventListener('click', () => els.modalGuide.classList.remove('hidden'));
    els.btnHowToPlay.addEventListener('click', () => els.modalGuide.classList.remove('hidden'));
    els.btnCloseGuide.addEventListener('click', () => els.modalGuide.classList.add('hidden'));
    els.btnGuideOk.addEventListener('click', () => els.modalGuide.classList.add('hidden'));
    els.btnIncidentAck.addEventListener('click', handleIncidentAck);

    els.chkUnlockAll.addEventListener('change', (e) => {
      save.unlockAll = e.target.checked;
      persistSave();
      renderLevelMap();
    });

    els.btnBriefing.addEventListener('click', openBriefingModal);
    els.btnTag.addEventListener('click', () => {
      pendingTagDeviceId = null;
      openTagModal();
    });
    els.btnTagStamp.addEventListener('click', () => {
      els.tagInputDate.value = formatCurrentTimestamp();
      els.tagErrorBanner.classList.add('hidden');
      LOTOTO.sound.lock();
    });
    els.btnTagSubmit.addEventListener('click', handleTagSubmit);
    els.btnTagCancel.addEventListener('click', () => {
      pendingTagDeviceId = null;
      els.modalTag.classList.add('hidden');
    });
    els.btnStartLevel.addEventListener('click', () => els.modalBriefing.classList.add('hidden'));
    els.btnHint.addEventListener('click', handleHint);
    els.btnReset.addEventListener('click', () => {
      if (currentLevel) startLevel(currentLevel.id, false);
    });
    els.btnIssuePermit.addEventListener('click', handleIssuePermit);

    els.btnReplayLevel.addEventListener('click', () => {
      closeAllModals();
      if (currentLevel) startLevel(currentLevel.id, false);
    });
    els.btnBackMap.addEventListener('click', showMapScreen);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Don't let Escape bypass a fatal incident restart acknowledgment
        if (activeIncident && activeIncident.fatal) return;
        closeAllModals();
      }
    });

    showMapScreen();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
