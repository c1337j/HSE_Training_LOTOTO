/* ==========================================================================
   LOTOTO MASTER — Main Game Controller, Progression, Tooltips & Confetti
   ========================================================================== */
(function (global) {
  'use strict';

  const LOTOTO = (global.LOTOTO = global.LOTOTO || {});
  const SAVE_KEY = 'lototo_master_save_v1';

  const RANKS = [
    { minXp: 0,    title: 'Trainee' },
    { minXp: 300,  title: 'Operator' },
    { minXp: 800,  title: 'Permit Issuer' },
    { minXp: 1500, title: 'Isolation Specialist' },
    { minXp: 2300, title: 'LOTOTO Master' }
  ];

  let save = loadSave();
  let currentLevel = null;
  let currentState = null;
  let currentEval = null;
  let hintDeviceId = null;
  let activeFx = null;
  let fxTimer = null;

  // DOM Cache
  const els = {};

  function $(id) {
    return document.getElementById(id);
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
          muted: !!parsed.muted
        };
      }
    } catch (_) {}
    return { completed: {}, xp: 0, unlockAll: false, muted: false };
  }

  function persistSave() {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(save));
    } catch (_) {}
  }

  function getRank(xp) {
    let r = RANKS[0].title;
    for (let i = 0; i < RANKS.length; i++) {
      if (xp >= RANKS[i].minXp) r = RANKS[i].title;
    }
    return r;
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

  /* ==================== SCREEN NAVIGATION ==================== */
  function showMapScreen() {
    currentLevel = null;
    els.screenGame.classList.remove('active');
    els.screenMap.classList.add('active');
    els.topbarLevelPill.classList.add('hidden');
    els.lototoStepper.classList.add('hidden');
    closeAllModals();
    renderLevelMap();
    updateGlobalHud();
  }

  function startLevel(levelId, showBriefing = true) {
    const lvl = LOTOTO.LEVELS.find((l) => l.id === levelId);
    if (!lvl) return;

    currentLevel = lvl;
    currentState = LOTOTO.engine.createInitialState(lvl);
    hintDeviceId = null;
    activeFx = null;

    els.screenMap.classList.remove('active');
    els.screenGame.classList.add('active');
    els.topbarLevelPill.classList.remove('hidden');
    els.lototoStepper.classList.remove('hidden');

    els.hudLevelBadge.textContent = `LVL ${lvl.id}`;
    els.hudLevelTitle.textContent = lvl.title;
    els.standardBadge.textContent = lvl.standard;
    els.sideTargetName.textContent = lvl.targetName;
    els.sideWorkScope.textContent = lvl.workScope;

    if (lvl.keepLiveRule) {
      els.keepLiveCallout.classList.remove('hidden');
      els.keepLiveText.textContent = lvl.keepLiveRule;
    } else {
      els.keepLiveCallout.classList.add('hidden');
    }

    setToast('info', 'Click manual valves & electrical breakers on the P&ID to lock out energy sources and highlight isolated flow paths.');
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

    els.mapCompletedCount.textContent = String(completedCount);
    els.mapProgressFill.style.width = `${Math.round((completedCount / total) * 100)}%`;
    els.chkUnlockAll.checked = save.unlockAll;

    const nextPlayId = Math.min(total, highestUnlocked);
    const nextLvl = LOTOTO.LEVELS.find((l) => l.id === nextPlayId) || LOTOTO.LEVELS[0];
    els.btnPlayNext.textContent = completedCount >= total
      ? `🏆 Replay Level ${nextLvl.id}: ${nextLvl.title}`
      : `▶ Play Level ${nextLvl.id}: ${nextLvl.title}`;
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
            <span class="tier-pill">Tier ${tier.id}</span>
            <h3>${tier.name}</h3>
          </div>
          <span class="tier-desc">${tier.desc} (${tierDone}/${tierLevels.length})</span>
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
            <span class="lvl-num-badge">LVL ${String(lvl.id).padStart(2, '0')}</span>
            <span class="lvl-stars">${starsHtml}</span>
          </div>
          <div class="lvl-card-title">${lvl.title}</div>
          <div class="lvl-card-target">${lvl.targetShort} · ${lvl.standard}</div>
          <div class="lvl-card-concept">${lvl.conceptTag}</div>
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

    hintDeviceId = null;
    const res = LOTOTO.engine.interact(currentLevel, currentState, deviceId);

    if (res.sound && LOTOTO.sound[res.sound]) {
      LOTOTO.sound[res.sound]();
    }
    if (res.message) {
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
      els.comboBadge.textContent = `🔥 ${currentState.streak}x Clean Streak`;
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

    // Update Action Logbook
    els.actionLog.innerHTML = '';
    if (currentState.log.length === 0) {
      els.actionLog.innerHTML = '<li class="log-entry">No isolation actions logged yet.</li>';
    } else {
      currentState.log.forEach((entry) => {
        const li = document.createElement('li');
        li.className = `log-entry ${entry.tone || ''}`;
        li.textContent = entry.text;
        els.actionLog.appendChild(li);
      });
    }

    // Update Issue Permit CTA button
    if (currentEval.readyForPermit) {
      els.btnIssuePermit.disabled = false;
      els.permitBtnLabel.textContent = 'ISSUE SAFE WORK PERMIT ✓';
    } else {
      els.btnIssuePermit.disabled = true;
      els.permitBtnLabel.textContent = 'Complete LOTOTO to Issue Permit';
    }
  }

  function updateStepChip(chipEl, isDone, isActive) {
    chipEl.classList.remove('done', 'active');
    if (isDone) chipEl.classList.add('done');
    else if (isActive) chipEl.classList.add('active');
  }

  function setToast(severity, text) {
    const icons = { info: 'ℹ️', success: '✅', warning: '⚠️', danger: '🚨' };
    els.toastBanner.className = `toast-banner ${severity}`;
    // Retrigger shake animation on repeated danger
    void els.toastBanner.offsetWidth;
    els.toastIcon.textContent = icons[severity] || 'ℹ️';
    els.toastText.textContent = text;
  }

  /* ==================== TOOLTIPS ==================== */
  function showTooltip(dev, evt) {
    const stateVal = currentState.devices[dev.id];
    let actionHint = 'Click to interact';
    if (dev.kind === 'valve') {
      actionHint = stateVal === 'locked' ? 'LOCKED & TAGGED · Click to unlock' : 'OPEN · Click to Close, Lock & Tag';
    } else if (dev.kind === 'breaker') {
      actionHint = stateVal === 'locked' ? 'LOCKED OUT · Click to re-energize' : 'ENERGIZED · Click to Open, Lock & Tag';
    } else if (dev.kind === 'blind') {
      actionHint = stateVal === 'blinded' ? 'BLINDED (Positive Iso) · Click to swing open' : 'OPEN RING · Depressurize, then click to swing Blind';
    } else if (dev.kind === 'vent' || dev.kind === 'drain' || dev.kind === 'bleed') {
      actionHint = stateVal === 'open' ? 'OPEN (Depressurized) · Click to close' : 'CLOSED · Isolate line first, then click to open';
    } else if (dev.kind === 'gauge') {
      actionHint = currentState.verified[dev.id] ? 'VERIFIED 0 PSI ✓' : 'TRYOUT · Click at 0 PSI to verify zero pressure';
    } else if (dev.kind === 'start_switch') {
      actionHint = currentState.verified[dev.id] ? 'VERIFIED DEAD ✓' : 'TRYOUT · Click to bump-test motor (after MCC lock!)';
    } else if (dev.kind === 'gas_detector') {
      actionHint = currentState.verified[dev.id] ? '0% LEL VERIFIED ✓' : 'TRYOUT · Click after positive blinding & draining';
    } else if (dev.kind === 'control_valve' || dev.kind === 'check_valve' || dev.kind === 'psv_valve') {
      actionHint = 'Click to inspect device';
    }

    els.pidTooltip.innerHTML = `<strong>${dev.tag} — ${dev.desc || dev.kind}</strong>${actionHint}`;
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
    setToast('warning', hint.message);
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

    // Populate Completion Modal
    els.completeStars.textContent = '★'.repeat(stars) + '☆'.repeat(3 - stars);
    els.completeTitle.textContent =
      currentLevel.id === LOTOTO.LEVELS.length
        ? '🏆 LOTOTO MASTER CERTIFIED!'
        : 'Zero Energy Verified!';
    els.completeSubtitle.textContent = `${currentLevel.targetName} is safely isolated and ready for work.`;
    els.compScore.textContent = `${score}%`;
    els.compMistakes.textContent = String(currentState.mistakes);
    els.compXp.textContent = `+${xpEarned} XP`;
    els.compTakeaway.textContent = currentLevel.takeaway;

    const hasNext = currentLevel.id < LOTOTO.LEVELS.length;
    els.btnNextLevel.textContent = hasNext ? `Next: Level ${currentLevel.id + 1} →` : '🏆 Return to Level Map';
    els.btnNextLevel.onclick = () => {
      closeAllModals();
      if (hasNext) startLevel(currentLevel.id + 1, true);
      else showMapScreen();
    };

    els.modalComplete.classList.remove('hidden');
  }

  /* ==================== MODALS ==================== */
  function openBriefingModal() {
    if (!currentLevel) return;
    els.briefTierBadge.textContent = `TIER ${currentLevel.tier} · LEVEL ${currentLevel.id} OF ${LOTOTO.LEVELS.length}`;
    els.briefTitle.textContent = currentLevel.title;
    els.briefTarget.textContent = currentLevel.targetName;
    els.briefStandard.textContent = currentLevel.standard;
    els.briefDescription.textContent = currentLevel.briefDesc;
    els.briefLesson.textContent = currentLevel.lessonFocus;
    els.modalBriefing.classList.remove('hidden');
  }

  function closeAllModals() {
    els.modalBriefing.classList.add('hidden');
    els.modalComplete.classList.add('hidden');
    els.modalGuide.classList.add('hidden');
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
      'hud-rank', 'hud-xp', 'hud-stars', 'btn-sound', 'sound-icon', 'btn-guide',
      'screen-map', 'screen-game', 'btn-play-next', 'btn-how-to-play', 'chk-unlock-all',
      'map-completed-count', 'map-progress-fill', 'tier-container',
      'btn-briefing', 'standard-badge', 'combo-badge', 'hud-safety-score',
      'btn-hint', 'btn-reset', 'toast-banner', 'toast-icon', 'toast-text',
      'pid-viewport', 'pid-svg', 'pid-tooltip',
      'side-target-name', 'side-work-scope', 'keep-live-callout', 'keep-live-text',
      'checklist-fraction', 'permit-checklist', 'action-log', 'btn-issue-permit', 'permit-btn-label',
      'modal-briefing', 'brief-tier-badge', 'brief-title', 'brief-target', 'brief-standard',
      'brief-description', 'brief-lesson', 'btn-start-level',
      'modal-complete', 'complete-stars', 'complete-title', 'complete-subtitle',
      'comp-score', 'comp-mistakes', 'comp-xp', 'comp-takeaway',
      'btn-replay-level', 'btn-back-map', 'btn-next-level',
      'modal-guide', 'btn-close-guide', 'btn-guide-ok', 'confetti-canvas'
    ];
    ids.forEach((id) => {
      const camel = id.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      els[camel] = $(id);
    });

    LOTOTO.sound.setMuted(save.muted);

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

    els.chkUnlockAll.addEventListener('change', (e) => {
      save.unlockAll = e.target.checked;
      persistSave();
      renderLevelMap();
    });

    els.btnBriefing.addEventListener('click', openBriefingModal);
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

    // Keyboard Escape closes modals
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeAllModals();
    });

    showMapScreen();
  }

  document.addEventListener('DOMContentLoaded', init);
})(window);
