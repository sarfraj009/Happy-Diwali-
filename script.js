/* HAPPY DIWALI 🪔 - Ultra-Luxury & Cinematic Developer Poster Studio */

// 1. Audio Synthesizer (Crystal Pentatonic Chimes for Luxury Ambience)
class LuxuryDiwaliAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    // Luxurious Golden Pentatonic Scale (Rich warm harmonics in C# / E / F# / G# / B)
    this.scale = [277.18, 329.63, 369.99, 415.30, 493.88, 554.37, 659.25, 739.99, 830.61];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
  }

  playChime(noteIdx = null) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const freq = noteIdx !== null 
      ? this.scale[noteIdx % this.scale.length]
      : this.scale[Math.floor(Math.random() * this.scale.length)];

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Pure crystal bell tone
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm, lingering resonance
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 1.6);
  }

  playLuxuryBurst() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Gentle 3-note golden chime
    this.playChime();
    setTimeout(() => this.playChime(), 70);
    setTimeout(() => this.playChime(), 140);
  }
}

// 2. Luxury Golden Particle & Firework Engine
class LuxuryFireworkEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.autoInterval = null;
    this.symbols = ['{ }', '< />', '✨', '*', '++', ';', '()', '=>'];
    this.colors = ['#FFFDF2', '#FCE192', '#DFAC38', '#FFE8A3', '#E4B764', '#FF9900'];

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  resize() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  createBurst(x, y, count = 38) {
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
      const speed = Math.random() * 4.5 + 1.8;
      const isSymbol = Math.random() < 0.22;

      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        decay: Math.random() * 0.018 + 0.01,
        size: Math.random() * 2.8 + 1.4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        symbol: isSymbol ? this.symbols[Math.floor(Math.random() * this.symbols.length)] : null,
        rotation: Math.random() * Math.PI,
        vRot: (Math.random() - 0.5) * 0.08
      });
    }
  }

  createAmbientEmbers() {
    if (Math.random() < 0.35) {
      const cx = this.canvas.width / 2 + (Math.random() - 0.5) * 140;
      const cy = this.canvas.height * 0.58;
      this.particles.push({
        x: cx,
        y: cy,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(Math.random() * 2 + 1.0),
        alpha: 0.9,
        decay: 0.012,
        size: Math.random() * 2.2 + 1.2,
        color: '#FCE192',
        symbol: null,
        rotation: 0,
        vRot: 0
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (window.diwaliSparklesEnabled) {
      this.createAmbientEmbers();
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.035; // Soft Gravity
      p.vx *= 0.985; // Air drag
      p.alpha -= p.decay;
      p.rotation += p.vRot;

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);

      if (p.symbol) {
        this.ctx.font = '600 12px "Fira Code", monospace';
        this.ctx.fillStyle = p.color;
        this.ctx.shadowColor = p.color;
        this.ctx.shadowBlur = 8;
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        this.ctx.fillText(p.symbol, 0, 0);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fillStyle = p.color;
        this.ctx.shadowColor = p.color;
        this.ctx.shadowBlur = 10;
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    requestAnimationFrame(this.loop);
  }
}

// 3. Application Lifecycle & Interactions
document.addEventListener('DOMContentLoaded', () => {
  const posterFrame = document.getElementById('posterFrame');
  const fireworkCanvas = document.getElementById('fireworkCanvas');
  const cinemaArtLayer = document.getElementById('cinemaArtLayer');
  const luxuryArtLayer = document.getElementById('luxuryArtLayer');
  const cyberArtLayer = document.getElementById('cyberArtLayer');
  const vectorArtLayer = document.getElementById('vectorArtLayer');
  
  const btnModeCinema = document.getElementById('btnModeCinema');
  const btnModeLuxury = document.getElementById('btnModeLuxury');
  const btnModeCyber = document.getElementById('btnModeCyber');
  const btnModeVector = document.getElementById('btnModeVector');
  
  const inputAuthor = document.getElementById('inputAuthor');
  const displayAuthorText = document.getElementById('displayAuthorText');
  const chkAutoFireworks = document.getElementById('chkAutoFireworks');
  const chkSparkles = document.getElementById('chkSparkles');
  const chkSound = document.getElementById('chkSound');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const downloadHdBtn = document.getElementById('downloadHdBtn');
  const downloadSvgBtn = document.getElementById('downloadSvgBtn');
  const launchFireworkBtn = document.getElementById('launchFireworkBtn');
  const exportCanvas = document.getElementById('exportCanvas');

  const audio = new LuxuryDiwaliAudio();
  const fireworkEngine = new LuxuryFireworkEngine(fireworkCanvas);

  window.diwaliSparklesEnabled = true;

  // Auto Fireworks
  let autoTimer = null;
  function updateAutoFireworks() {
    if (chkAutoFireworks.checked) {
      if (!autoTimer) {
        autoTimer = setInterval(() => {
          const w = fireworkCanvas.width;
          const h = fireworkCanvas.height;
          const rx = w * 0.2 + Math.random() * (w * 0.6);
          const ry = h * 0.15 + Math.random() * (h * 0.32);
          fireworkEngine.createBurst(rx, ry, 30);
          audio.playLuxuryBurst();
        }, 2400);
      }
    } else {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }
  updateAutoFireworks();

  // Mouse Spotlight & Subtle 3D Perspective Tilt
  posterFrame.addEventListener('mousemove', (e) => {
    const rect = posterFrame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    posterFrame.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    posterFrame.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    posterFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  posterFrame.addEventListener('mouseleave', () => {
    posterFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });

  // Click on poster to ignite fireworks
  posterFrame.addEventListener('click', (e) => {
    const rect = posterFrame.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    fireworkEngine.createBurst(x, y, 40);
    audio.playLuxuryBurst();
  });

  // 4-Mode Switcher
  function setMode(mode) {
    [btnModeCinema, btnModeLuxury, btnModeCyber, btnModeVector].forEach(b => b.classList.remove('active'));
    [cinemaArtLayer, luxuryArtLayer, cyberArtLayer, vectorArtLayer].forEach(l => l.classList.remove('active'));

    if (mode === 'cinema') {
      btnModeCinema.classList.add('active');
      cinemaArtLayer.classList.add('active');
    } else if (mode === 'luxury') {
      btnModeLuxury.classList.add('active');
      luxuryArtLayer.classList.add('active');
    } else if (mode === 'cyber') {
      btnModeCyber.classList.add('active');
      cyberArtLayer.classList.add('active');
    } else if (mode === 'vector') {
      btnModeVector.classList.add('active');
      vectorArtLayer.classList.add('active');
    }
  }

  btnModeCinema.addEventListener('click', () => setMode('cinema'));
  btnModeLuxury.addEventListener('click', () => setMode('luxury'));
  btnModeCyber.addEventListener('click', () => setMode('cyber'));
  btnModeVector.addEventListener('click', () => setMode('vector'));

  // Personalization updates
  inputAuthor.addEventListener('input', () => {
    const val = inputAuthor.value.trim();
    displayAuthorText.textContent = val || 'Made with ❤️ & Code';
  });

  // Toggles
  chkAutoFireworks.addEventListener('change', updateAutoFireworks);
  chkSparkles.addEventListener('change', (e) => {
    window.diwaliSparklesEnabled = e.target.checked;
  });

  chkSound.addEventListener('change', (e) => {
    audio.enabled = e.target.checked;
    updateSoundBtnState();
  });

  soundToggleBtn.addEventListener('click', () => {
    audio.enabled = !audio.enabled;
    chkSound.checked = audio.enabled;
    updateSoundBtnState();
    if (audio.enabled) audio.playChime(3);
  });

  function updateSoundBtnState() {
    const textEl = soundToggleBtn.querySelector('.sound-text');
    if (audio.enabled) {
      textEl.textContent = 'Chimes: ON';
      soundToggleBtn.style.borderColor = 'var(--accent-gold)';
    } else {
      textEl.textContent = 'Chimes: OFF';
      soundToggleBtn.style.borderColor = 'rgba(255,255,255,0.15)';
    }
  }

  // Launch fireworks manual button
  launchFireworkBtn.addEventListener('click', () => {
    const w = fireworkCanvas.width;
    const h = fireworkCanvas.height;
    fireworkEngine.createBurst(w * 0.35, h * 0.3, 36);
    setTimeout(() => fireworkEngine.createBurst(w * 0.65, h * 0.32, 36), 160);
    setTimeout(() => fireworkEngine.createBurst(w * 0.5, h * 0.22, 45), 320);
    audio.playLuxuryBurst();
  });

  // Fullscreen View
  fullscreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
      posterFrame.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  });

  // 4. DOWNLOAD ULTRA-LUXURY 1080×1080 PNG POSTER
  downloadHdBtn.addEventListener('click', () => {
    const ctx = exportCanvas.getContext('2d');
    const authorText = inputAuthor.value.trim();

    // Determine current active image source
    let imgSrc = 'diwali_luxury_master_render.png';
    let filePrefix = 'Diwali_Masterpiece_Luxury_Poster';

    if (btnModeLuxury.classList.contains('active')) {
      imgSrc = 'diwali_luxury_poster.png';
      filePrefix = 'Diwali_Ultra_Luxury_Poster';
    } else if (btnModeCyber.classList.contains('active')) {
      imgSrc = 'diwali_coder_poster.png';
      filePrefix = 'Diwali_Cyber_Poster';
    } else if (btnModeVector.classList.contains('active')) {
      imgSrc = 'luxury_poster.svg';
      filePrefix = 'Diwali_Vector_Poster';
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgSrc;

    img.onload = () => {
      // 1. Draw base high-res artwork at 1080x1080
      ctx.drawImage(img, 0, 0, 1080, 1080);

      // 2. Overlay custom signature if edited beyond default
      if (authorText && authorText !== 'Made with ❤️ & Code') {
        ctx.save();
        ctx.fillStyle = 'rgba(14, 14, 20, 0.9)';
        ctx.strokeStyle = 'rgba(223, 172, 56, 0.6)';
        ctx.lineWidth = 1.5;

        ctx.font = '700 18px "Montserrat", sans-serif';
        const textWidth = ctx.measureText(authorText).width;
        const boxWidth = textWidth + 50;
        const boxHeight = 42;
        const boxX = (1080 - boxWidth) / 2;
        const boxY = 1000;

        ctx.beginPath();
        ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 21);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#FCE192';
        ctx.fillText(authorText, boxX + 25, boxY + 27);
        ctx.restore();
      }

      // 3. Trigger Instant Download with file:// protocol safety
      try {
        const link = document.createElement('a');
        link.download = `${filePrefix}_1080x1080.png`;
        link.href = exportCanvas.toDataURL('image/png');
        link.click();
      } catch (err) {
        // Fallback for strict browser canvas security restrictions on file:// URIs
        const fallback = document.createElement('a');
        fallback.download = `${filePrefix}_1080x1080.png`;
        fallback.href = imgSrc;
        fallback.click();
      }

      audio.playChime(5);
    };

    img.onerror = () => {
      const link = document.createElement('a');
      link.download = `Diwali_Ultra_Luxury_Poster.png`;
      link.href = 'diwali_luxury_poster.png';
      link.click();
    };
  });

  // Download Vector SVG
  downloadSvgBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'Diwali_Ultra_Luxury_Vector.svg';
    link.href = 'luxury_poster.svg';
    link.click();
  });
});
