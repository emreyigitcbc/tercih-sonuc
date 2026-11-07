// Canvas Confetti & Sound Effects for Yıldırım Roket Takımı

class ConfettiManager {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animationId = null;
    this.isMuted = false;
    this.audioCtx = null;
  }

  init() {
    let canvas = document.getElementById('confetti-canvas');
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);
    }
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 150) {
    if (!this.canvas) this.init();
    this.resize();
    this.particles = [];

    const colors = ['#ff3b30', '#ff9500', '#ffcc00', '#34c759', '#007aff', '#5856d6', '#af52de', '#ff2d55', '#00d2ff', '#ffe600'];
    const emojis = ['🚀', '⭐', '✨', '🔥', '🎉', '🔩', '⚡'];

    for (let i = 0; i < count; i++) {
      const isEmoji = Math.random() < 0.22;
      this.particles.push({
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
        y: window.innerHeight * 0.45 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 22,
        vy: -Math.random() * 18 - 6,
        size: isEmoji ? 22 + Math.random() * 12 : 7 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        gravity: 0.38,
        drag: 0.965,
        opacity: 1,
        isEmoji: isEmoji,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }

    if (!this.animationId) {
      this.animate();
    }
    this.playCelebrationSound();
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.vRot;
      p.opacity -= 0.0075;

      if (p.opacity <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.opacity);

      if (p.isEmoji) {
        this.ctx.font = `${p.size}px sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(p.emoji, 0, 0);
      } else {
        this.ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          this.ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          this.ctx.fill();
        }
      }
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.animate());
    } else {
      this.animationId = null;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  playCelebrationSound() {
    if (this.isMuted) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const ctx = this.audioCtx;
      const now = ctx.currentTime;

      // Triumphant Fanfare notes (C5, G4, C5, E5, G5, C6)
      const notes = [
        { f: 523.25, d: 0.12, t: 0.00 }, // C5
        { f: 659.25, d: 0.12, t: 0.12 }, // E5
        { f: 783.99, d: 0.15, t: 0.24 }, // G5
        { f: 1046.50, d: 0.40, t: 0.38 } // High C6
      ];

      notes.forEach(({ f, d, t }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, now + t);

        gain.gain.setValueAtTime(0.001, now + t);
        gain.gain.exponentialRampToValueAtTime(0.25, now + t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + t + d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + t);
        osc.stop(now + t + d + 0.05);
      });
    } catch (e) {
      console.warn("Audio playback not supported or user gesture required:", e);
    }
  }

  toggleSound() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

const confetti = new ConfettiManager();
