/**
 * ==========================================================================
 * SCROLL-DRIVEN HERO SECTION ANIMATION - MAIN SCRIPT
 * Ultra-Smooth Scroll Choreography using GSAP, ScrollTrigger & Lenis
 * ==========================================================================
 */

(function () {
  'use strict';

  // --- State & DOM References ---
  const state = {
    progress: 0,
    velocity: 0,
    audioEnabled: false,
    currentTheme: 'lime',
    letterOffsets: [],
    roadWidth: 0,
    carWidth: 380,
    isMobile: false,
  };

  const DOM = {
    pinnedTrack: document.getElementById('pinnedTrack'),
    scrollWrapper: document.getElementById('scrollWrapper'),
    carWrapper: document.getElementById('carWrapper'),
    carImage: document.getElementById('carImage'),
    trail: document.getElementById('vehicleTrail'),
    headlineTrack: document.getElementById('headlineTrack'),
    letters: [],
    
    // HUD & Telemetry
    hudSpeed: document.getElementById('hudSpeed'),
    hudGear: document.getElementById('hudGear'),
    hudProgress: document.getElementById('hudProgress'),
    hudRpm: document.getElementById('hudRpm'),
    
    // Scrubber
    scrubberFill: document.getElementById('scrubberFill'),
    scrubberThumb: document.getElementById('scrubberThumb'),
    scrubberTrack: document.getElementById('scrubberTrack'),
    milestoneBtns: document.querySelectorAll('.milestone-btn'),
    
    // Stat Cards
    statCards: document.querySelectorAll('.stat-card'),
    
    // Audio & Theme
    soundToggle: document.getElementById('soundToggle'),
    soundIcon: document.getElementById('soundIcon'),
    soundText: document.getElementById('soundText'),
    themeButtons: document.querySelectorAll('.color-dot-btn'),
  };

  let lenisInstance = null;
  let scrollTriggerInstance = null;
  let audioCtx = null;
  let engineGain = null;
  let engineOsc = null;

  // --- Initial Setup & Utilities ---
  function init() {
    registerGsapPlugins();
    buildHeadlineSpans();
    initSmoothScroll();
    measureLayout();
    initLoadAnimation();
    initScrollAnimation();
    initScrubberEvents();
    initThemeSwitcher();
    initAudioEngine();
    
    // Resize Listener with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        measureLayout();
        ScrollTrigger.refresh();
      }, 150);
    });

    // Initialize Lucide icons if available
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function registerGsapPlugins() {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      // Disable lagSmoothing for absolute sync between scroll and animation
      gsap.ticker.lagSmoothing(0);
    }
  }

  /**
   * Initializes Lenis for ultra-fluid momentum scrolling
   */
  function initSmoothScroll() {
    if (typeof Lenis !== 'undefined') {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      // Synchronize Lenis with GSAP ScrollTrigger
      lenisInstance.on('scroll', (e) => {
        ScrollTrigger.update();
        state.velocity = Math.abs(e.velocity || 0);
        updateAudioPitch(state.velocity);
      });

      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
    }
  }

  /**
   * Dynamically constructs the letter spans for W E L C O M E   I T Z F I Z Z
   */
  function buildHeadlineSpans() {
    const text = "WELCOME ITZFIZZ";
    DOM.headlineTrack.innerHTML = '';

    const letters = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement('span');
      span.className = 'headline-char';
      span.dataset.index = i;

      if (char === ' ') {
        span.classList.add('space');
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }

      DOM.headlineTrack.appendChild(span);
      letters.push(span);
    }
    DOM.letters = letters;
  }

  /**
   * Pre-calculates positions and offsets to avoid layout thrashing during scroll
   */
  function measureLayout() {
    state.roadWidth = DOM.scrollWrapper.clientWidth || window.innerWidth;
    state.isMobile = window.innerWidth <= 768;
    state.carWidth = state.isMobile ? 260 : 380;

    const trackRect = DOM.pinnedTrack.getBoundingClientRect();
    state.letterOffsets = DOM.letters.map((letter) => {
      const rect = letter.getBoundingClientRect();
      // Relative to pinned track left
      return rect.left - trackRect.left;
    });
  }

  /**
   * Initial Entrance Timeline on Page Load
   */
  function initLoadAnimation() {
    const tl = gsap.timeline({
      defaults: { ease: "power4.out" },
      onComplete: () => {
        // Ready state
      }
    });

    // 1. Initial fade-in of track and roadway
    tl.fromTo(DOM.pinnedTrack, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.8 }
    );

    // 2. Headline entrance - letters stagger slide-in
    tl.fromTo(DOM.letters, 
      { y: 35, opacity: 0, filter: "blur(8px)" },
      { 
        y: 0, 
        opacity: 0.22, 
        filter: "blur(0px)",
        duration: 0.9, 
        stagger: 0.035,
        ease: "back.out(1.2)"
      },
      "-=0.4"
    );

    // 3. Stat Cards entrance - staggered reveal
    tl.fromTo(DOM.statCards,
      { y: 40, opacity: 0, scale: 0.92 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.12, 
        ease: "power3.out" 
      },
      "-=0.6"
    );

    // 4. Animate counter numbers in stat cards from 0 to target
    animateStatNumbers();

    // 5. Initial position car at starting line
    gsap.set(DOM.carWrapper, { x: 0 });
    gsap.set(DOM.trail, { width: 0 });
  }

  /**
   * Number count-up animation for impact metrics
   */
  function animateStatNumbers() {
    DOM.statCards.forEach((card) => {
      const numEl = card.querySelector('.stat-card-number');
      const targetVal = parseFloat(numEl.dataset.target || 0);
      const isDecimal = targetVal % 1 !== 0;

      const obj = { val: 0 };
      gsap.to(obj, {
        val: targetVal,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => {
          numEl.textContent = isDecimal ? obj.val.toFixed(1) : Math.round(obj.val);
        }
      });
    });
  }

  /**
   * Core Scroll Animation via GSAP ScrollTrigger
   */
  function initScrollAnimation() {
    const endX = () => state.roadWidth - (state.carWidth * 0.7);

    scrollTriggerInstance = ScrollTrigger.create({
      trigger: DOM.scrollWrapper,
      start: "top top",
      end: "bottom bottom",
      pin: DOM.pinnedTrack,
      scrub: 0.8, // Smooth scrub interpolation
      anticipatePin: 1,
      onUpdate: (self) => {
        state.progress = self.progress;
        handleScrollProgress(self.progress);
      }
    });
  }

  /**
   * Frame-by-frame handler driven by scroll progress (0.0 -> 1.0)
   */
  function handleScrollProgress(progress) {
    const totalDistance = state.roadWidth - (state.carWidth * 0.7);
    const currentX = progress * totalDistance;
    
    // 1. Move vehicle
    gsap.set(DOM.carWrapper, { x: currentX });

    // 2. Expand energetic neon trail
    // Trail connects to vehicle rear/midpoint
    const trailHead = Math.max(0, currentX + (state.carWidth * 0.25));
    gsap.set(DOM.trail, { width: trailHead });

    // 3. Dynamic Letter Activation
    // Determine which letters the car has passed
    const triggerPoint = currentX + (state.carWidth * 0.45);
    DOM.letters.forEach((letter, idx) => {
      const letterPos = state.letterOffsets[idx];
      if (triggerPoint >= letterPos) {
        if (!letter.classList.contains('lit')) {
          letter.classList.add('lit');
          triggerAudioTick();
        }
      } else {
        if (letter.classList.contains('lit')) {
          letter.classList.remove('lit');
        }
      }
    });

    // 4. Update Live Telemetry HUD
    updateTelemetry(progress);

    // 5. Update Interactive Scrubber UI
    updateScrubber(progress);

    // 6. Highlight Milestone Cards
    updateMilestoneCards(progress);
  }

  /**
   * Telemetry computation
   */
  function updateTelemetry(progress) {
    // Top Speed 208 MPH
    const speed = Math.round(progress * 208);
    DOM.hudSpeed.textContent = speed;

    // RPM (1200 idle to 8500 redline)
    const rpm = Math.round(1200 + progress * 7300);
    DOM.hudRpm.textContent = (rpm / 1000).toFixed(1) + 'k';

    // Dynamic Gear shifting
    let gear = '1';
    if (progress === 0) gear = 'N';
    else if (progress < 0.18) gear = '1';
    else if (progress < 0.38) gear = '2';
    else if (progress < 0.58) gear = '3';
    else if (progress < 0.78) gear = '4';
    else if (progress < 0.92) gear = '5';
    else gear = '6';
    DOM.hudGear.textContent = gear;

    // Percentage progress
    const pct = Math.round(progress * 100);
    DOM.hudProgress.textContent = `${pct}%`;
  }

  /**
   * Synchronize Bottom Scrubber & Milestone Pills
   */
  function updateScrubber(progress) {
    const pct = (progress * 100).toFixed(1);
    DOM.scrubberFill.style.width = `${pct}%`;
    DOM.scrubberThumb.style.left = `${pct}%`;

    // Active milestone highlight
    DOM.milestoneBtns.forEach((btn) => {
      const targetPct = parseFloat(btn.dataset.milestone || 0);
      if (Math.abs(progress - targetPct) < 0.12) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /**
   * Highlights each metric card as the car passes its stage
   */
  function updateMilestoneCards(progress) {
    const thresholds = [
      { id: 'box1', min: 0.15, max: 0.40 },
      { id: 'box2', min: 0.35, max: 0.62 },
      { id: 'box3', min: 0.58, max: 0.82 },
      { id: 'box4', min: 0.78, max: 1.00 },
    ];

    thresholds.forEach((th) => {
      const el = document.getElementById(th.id);
      if (!el) return;
      const pBar = el.querySelector('.stat-card-progress-bar');
      
      if (progress >= th.min && progress <= th.max) {
        el.classList.add('active-milestone');
        if (pBar) {
          const ratio = Math.min(1, Math.max(0, (progress - th.min) / (th.max - th.min)));
          pBar.style.width = `${Math.round(ratio * 100)}%`;
        }
      } else if (progress > th.max) {
        el.classList.remove('active-milestone');
        if (pBar) pBar.style.width = '100%';
      } else {
        el.classList.remove('active-milestone');
        if (pBar) pBar.style.width = '0%';
      }
    });
  }

  /**
   * Clickable Scrubber & Milestone Navigation
   */
  function initScrubberEvents() {
    DOM.scrubberTrack.addEventListener('click', (e) => {
      const rect = DOM.scrubberTrack.getBoundingClientRect();
      const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      scrollToRatio(clickRatio);
    });

    DOM.milestoneBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetPct = parseFloat(btn.dataset.milestone || 0);
        scrollToRatio(targetPct);
      });
    });
  }

  function scrollToRatio(ratio) {
    if (!scrollTriggerInstance) return;
    const start = scrollTriggerInstance.start;
    const end = scrollTriggerInstance.end;
    const targetScroll = start + ratio * (end - start);

    if (lenisInstance) {
      lenisInstance.scrollTo(targetScroll, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  }

  /**
   * Theme & Vehicle Colorway Switcher
   */
  function initThemeSwitcher() {
    DOM.themeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const theme = btn.dataset.color;
        document.documentElement.setAttribute('data-theme', theme);
        state.currentTheme = theme;

        DOM.themeButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        // Tint car image subtly according to theme
        if (theme === 'cyan') {
          DOM.carImage.style.filter = 'drop-shadow(0 15px 25px rgba(0,0,0,0.7)) hue-rotate(95deg) brightness(1.1)';
        } else if (theme === 'orange') {
          DOM.carImage.style.filter = 'drop-shadow(0 15px 25px rgba(0,0,0,0.7)) hue-rotate(240deg) brightness(1.15)';
        } else if (theme === 'purple') {
          DOM.carImage.style.filter = 'drop-shadow(0 15px 25px rgba(0,0,0,0.7)) hue-rotate(180deg) brightness(1.05)';
        } else {
          DOM.carImage.style.filter = 'drop-shadow(0 15px 25px rgba(0,0,0,0.7))';
        }
      });
    });
  }

  /**
   * Optional Web Audio API Sound Immersion (Futuristic Engine Drone + Letter Ticks)
   */
  function initAudioEngine() {
    DOM.soundToggle.addEventListener('click', () => {
      if (!audioCtx) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          audioCtx = new AudioContext();
          
          // Setup ambient engine drone oscillator
          engineOsc = audioCtx.createOscillator();
          engineGain = audioCtx.createGain();

          engineOsc.type = 'sawtooth';
          engineOsc.frequency.setValueAtTime(55, audioCtx.currentTime); // Low 55Hz drone
          engineGain.gain.setValueAtTime(0.001, audioCtx.currentTime);

          // Subtle low-pass filter to make it rumble
          const filter = audioCtx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(220, audioCtx.currentTime);

          engineOsc.connect(filter);
          filter.connect(engineGain);
          engineGain.connect(audioCtx.destination);
          engineOsc.start();
        } catch (e) {
          console.warn('Web Audio API not supported:', e);
        }
      }

      state.audioEnabled = !state.audioEnabled;

      if (state.audioEnabled) {
        if (audioCtx && audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        if (engineGain) {
          engineGain.gain.setTargetAtTime(0.06, audioCtx.currentTime, 0.1);
        }
        DOM.soundText.textContent = 'Audio: ON';
        DOM.soundToggle.classList.add('active');
        if (window.lucide) {
          DOM.soundIcon.setAttribute('data-lucide', 'volume-2');
          window.lucide.createIcons();
        }
      } else {
        if (engineGain && audioCtx) {
          engineGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.1);
        }
        DOM.soundText.textContent = 'Audio: OFF';
        DOM.soundToggle.classList.remove('active');
        if (window.lucide) {
          DOM.soundIcon.setAttribute('data-lucide', 'volume-x');
          window.lucide.createIcons();
        }
      }
    });
  }

  function updateAudioPitch(velocity) {
    if (!state.audioEnabled || !engineOsc || !audioCtx) return;
    // Map velocity to engine pitch
    const baseFreq = 55 + (state.progress * 110);
    const speedBoost = Math.min(220, velocity * 40);
    engineOsc.frequency.setTargetAtTime(baseFreq + speedBoost, audioCtx.currentTime, 0.05);
  }

  function triggerAudioTick() {
    if (!state.audioEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880 + Math.random() * 400, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch (e) {
      // Audio tick error catch
    }
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
