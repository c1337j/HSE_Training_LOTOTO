/* ==========================================================================
   LOTOTO MASTER — Synthesized Tactile Audio Engine (Web Audio API)
   Zero external audio assets required; works offline & on GitHub Pages.
   ========================================================================== */
(function (global) {
  'use strict';

  const LOTOTO = (global.LOTOTO = global.LOTOTO || {});

  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.muted = false;
    }

    ensureContext() {
      if (this.muted) return null;
      if (!this.ctx) {
        const AudioCtx = global.AudioContext || global.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    setMuted(muted) {
      this.muted = !!muted;
    }

    toggleMute() {
      this.muted = !this.muted;
      return this.muted;
    }

    tone(freq, duration, type = 'sine', gainVal = 0.14, delay = 0) {
      const ctx = this.ensureContext();
      if (!ctx) return;
      const now = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    }

    lock() {
      this.tone(320, 0.08, 'triangle', 0.16, 0);
      this.tone(580, 0.12, 'sine', 0.14, 0.055);
    }

    unlock() {
      this.tone(420, 0.08, 'triangle', 0.11, 0);
      this.tone(280, 0.1, 'sine', 0.1, 0.05);
    }

    blind() {
      this.tone(180, 0.12, 'square', 0.1, 0);
      this.tone(260, 0.1, 'triangle', 0.14, 0.08);
      this.tone(640, 0.14, 'sine', 0.13, 0.14);
    }

    vent() {
      const ctx = this.ensureContext();
      if (!ctx) return;
      const dur = 0.36;
      const bufferSize = Math.floor(ctx.sampleRate * dur);
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.45));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + dur);
      filter.Q.value = 1.6;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    }

    verify() {
      this.tone(523.25, 0.11, 'sine', 0.13, 0);
      this.tone(783.99, 0.18, 'sine', 0.15, 0.08);
    }

    warn() {
      this.tone(330, 0.12, 'sawtooth', 0.09, 0);
      this.tone(277, 0.16, 'sawtooth', 0.09, 0.13);
    }

    hazard() {
      this.tone(220, 0.14, 'sawtooth', 0.14, 0);
      this.tone(165, 0.18, 'sawtooth', 0.15, 0.14);
      this.tone(220, 0.14, 'sawtooth', 0.13, 0.31);
    }

    victory() {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((n, i) => {
        this.tone(n, i === 3 ? 0.42 : 0.14, 'triangle', 0.15, i * 0.095);
      });
    }
  }

  LOTOTO.sound = new SoundEngine();
})(window);
