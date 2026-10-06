import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { Zap, Activity, TrendingUp, ShieldCheck, Crosshair, ArrowDown } from 'lucide-react';
import './ScrollHeroSection.css';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);
}

const DEFAULT_METRICS = [
  {
    id: 'box1',
    badge: 'Fleet Logistics',
    icon: TrendingUp,
    target: 58,
    symbol: '%',
    desc: 'Increase in pickup point efficiency across urban hubs',
    range: [0.15, 0.40],
    className: 'card-1'
  },
  {
    id: 'box2',
    badge: 'Support Automation',
    icon: ShieldCheck,
    target: 23,
    symbol: '%',
    desc: 'Decrease in customer support response escalations',
    range: [0.35, 0.62],
    className: 'card-2'
  },
  {
    id: 'box3',
    badge: 'Telemetry Sensor',
    icon: Crosshair,
    target: 99.4,
    symbol: '%',
    desc: 'Sensor synchronization accuracy in high-velocity tests',
    range: [0.58, 0.82],
    className: 'card-3'
  },
  {
    id: 'box4',
    badge: 'Aerodynamic Grip',
    icon: Zap,
    target: 40,
    symbol: '%',
    desc: 'Reduction in drag coefficient with active aero wing',
    range: [0.78, 1.00],
    className: 'card-4'
  }
];

export default function ScrollHeroSection({
  headline = 'WELCOME ITZFIZZ',
  carImage = '/assets/car.png',
  theme = 'lime',
  metrics = DEFAULT_METRICS,
  enableSmoothScroll = true,
  onProgressUpdate
}) {
  const wrapperRef = useRef(null);
  const pinnedTrackRef = useRef(null);
  const roadRef = useRef(null);
  const carWrapperRef = useRef(null);
  const trailRef = useRef(null);
  const lettersRef = useRef([]);
  const scrubberTrackRef = useRef(null);
  const lenisRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  // Live Telemetry State
  const [telemetry, setTelemetry] = useState({
    speed: 0,
    gear: 'N',
    rpm: '1.2k',
    progressPct: '0%'
  });

  // Scrubber percentage
  const [scrubberPct, setScrubberPct] = useState(0);

  // Active milestone cards
  const [activeCardId, setActiveCardId] = useState(null);

  // Counter numbers
  const [counterValues, setCounterValues] = useState(() =>
    metrics.reduce((acc, m) => ({ ...acc, [m.id]: 0 }), {})
  );

  // Letters array
  const characters = useMemo(() => headline.split(''), [headline]);

  // Jump to ratio
  const scrollToRatio = useCallback((ratio) => {
    if (!scrollTriggerRef.current) return;
    const { start, end } = scrollTriggerRef.current;
    const target = start + ratio * (end - start);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2 });
    } else {
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pinnedTrack = pinnedTrackRef.current;
    const carWrapper = carWrapperRef.current;
    const trail = trailRef.current;
    if (!wrapper || !pinnedTrack || !carWrapper || !trail) return;

    // 1. Lenis Smooth Scrolling
    let lenis = null;
    if (enableSmoothScroll) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      const rafCallback = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(rafCallback);

      // Store ticker reference for cleanup
      lenis._rafCallback = rafCallback;
    }

    // 2. Initial Measure
    const measure = () => {
      const roadWidth = wrapper.clientWidth || window.innerWidth;
      const isMobile = window.innerWidth <= 768;
      const carWidth = isMobile ? 260 : 380;
      const trackRect = pinnedTrack.getBoundingClientRect();

      const letterOffsets = lettersRef.current.map((letterEl) => {
        if (!letterEl) return 0;
        const rect = letterEl.getBoundingClientRect();
        return rect.left - trackRect.left;
      });

      return { roadWidth, carWidth, letterOffsets };
    };

    let layout = measure();

    // 3. Number Counter Animation on Mount
    metrics.forEach((m) => {
      const obj = { val: 0 };
      const isDecimal = m.target % 1 !== 0;
      gsap.to(obj, {
        val: m.target,
        duration: 1.8,
        ease: 'power2.out',
        onUpdate: () => {
          setCounterValues((prev) => ({
            ...prev,
            [m.id]: isDecimal ? obj.val.toFixed(1) : Math.round(obj.val)
          }));
        }
      });
    });

    // 4. GSAP ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: 'bottom bottom',
      pin: pinnedTrack,
      scrub: 0.8,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalDistance = layout.roadWidth - (layout.carWidth * 0.7);
        const currentX = progress * totalDistance;

        // Move car & expand trail
        gsap.set(carWrapper, { x: currentX });
        const trailHead = Math.max(0, currentX + (layout.carWidth * 0.25));
        gsap.set(trail, { width: trailHead });

        // Update Letters
        const triggerPoint = currentX + (layout.carWidth * 0.45);
        lettersRef.current.forEach((el, idx) => {
          if (!el) return;
          const letterOffset = layout.letterOffsets[idx];
          if (triggerPoint >= letterOffset) {
            el.classList.add('lit');
          } else {
            el.classList.remove('lit');
          }
        });

        // Compute Telemetry
        const speed = Math.round(progress * 208);
        const rpmVal = (1.2 + progress * 7.3).toFixed(1) + 'k';
        let gearVal = '1';
        if (progress === 0) gearVal = 'N';
        else if (progress < 0.18) gearVal = '1';
        else if (progress < 0.38) gearVal = '2';
        else if (progress < 0.58) gearVal = '3';
        else if (progress < 0.78) gearVal = '4';
        else if (progress < 0.92) gearVal = '5';
        else gearVal = '6';

        setTelemetry({
          speed,
          gear: gearVal,
          rpm: rpmVal,
          progressPct: `${Math.round(progress * 100)}%`
        });

        setScrubberPct(progress * 100);

        // Highlight Active Milestone
        let currentActive = null;
        for (const m of metrics) {
          if (progress >= m.range[0] && progress <= m.range[1]) {
            currentActive = m.id;
            break;
          }
        }
        setActiveCardId(currentActive);

        if (onProgressUpdate) {
          onProgressUpdate(progress);
        }
      }
    });

    scrollTriggerRef.current = st;

    // Resize Handler
    const handleResize = () => {
      layout = measure();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (st) st.kill();
      if (lenis) {
        if (lenis._rafCallback) gsap.ticker.remove(lenis._rafCallback);
        lenis.destroy();
      }
    };
  }, [headline, enableSmoothScroll, metrics, onProgressUpdate]);

  // Handle Scrubber Click
  const handleScrubberClick = (e) => {
    if (!scrubberTrackRef.current) return;
    const rect = scrubberTrackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    scrollToRatio(ratio);
  };

  return (
    <section className="scroll-hero-wrapper" ref={wrapperRef} data-theme={theme}>
      <div className="scroll-hero-radial-glow" aria-hidden="true" />

      <div className="scroll-hero-pinned" ref={pinnedTrackRef}>
        {/* HUD Bar */}
        <div className="scroll-hero-hud">
          <div className="scroll-hero-badge">
            <span className="scroll-hero-dot" />
            <span>McLaren 720S Kinematics &bull; Live Telemetry</span>
          </div>

          <div className="scroll-hero-telemetry">
            <div className="telemetry-col">
              <span className="telemetry-col-label">Velocity</span>
              <span className="telemetry-col-val">
                {telemetry.speed}
                <span className="telemetry-col-unit">MPH</span>
              </span>
            </div>
            <div className="telemetry-col">
              <span className="telemetry-col-label">Gear</span>
              <span className="telemetry-col-val">{telemetry.gear}</span>
            </div>
            <div className="telemetry-col">
              <span className="telemetry-col-label">RPM</span>
              <span className="telemetry-col-val">{telemetry.rpm}</span>
            </div>
            <div className="telemetry-col">
              <span className="telemetry-col-label">Trajectory</span>
              <span className="telemetry-col-val">{telemetry.progressPct}</span>
            </div>
          </div>
        </div>

        {/* Roadway & Vehicle */}
        <div className="scroll-hero-road" ref={roadRef}>
          <div className="scroll-hero-road-texture" />
          <div className="scroll-hero-road-centerline" />
          <div className="scroll-hero-road-glow top" />
          <div className="scroll-hero-road-glow bottom" />

          {/* Speed Trail */}
          <div className="scroll-hero-trail" ref={trailRef} />

          {/* Vehicle */}
          <div className="scroll-hero-car-wrapper" ref={carWrapperRef}>
            <img
              src={carImage}
              alt="McLaren 720S Supercar Top View"
              className="scroll-hero-car-img"
            />
            <div className="scroll-hero-car-headlights" />
            <div className="scroll-hero-exhaust" />
          </div>

          {/* Headline Letter Track */}
          <div className="scroll-hero-headline-container">
            <div className="scroll-hero-headline-track">
              {characters.map((char, index) => {
                const isSpace = char === ' ';
                return (
                  <span
                    key={index}
                    ref={(el) => (lettersRef.current[index] = el)}
                    className={`scroll-hero-char ${isSpace ? 'space' : ''}`}
                  >
                    {isSpace ? '\u00A0' : char}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Milestone Stat Cards */}
        {metrics.map((card) => {
          const Icon = card.icon;
          const isActive = activeCardId === card.id;
          return (
            <div
              key={card.id}
              className={`scroll-hero-card ${card.className} ${isActive ? 'active' : ''}`}
            >
              <div className="scroll-hero-card-badge">
                <Icon className="w-3.5 h-3.5" />
                <span>{card.badge}</span>
              </div>
              <div className="scroll-hero-card-row">
                <span className="scroll-hero-card-num">{counterValues[card.id]}</span>
                <span className="scroll-hero-card-sym">{card.symbol}</span>
              </div>
              <p className="scroll-hero-card-desc">{card.desc}</p>
              <div className="scroll-hero-card-progress">
                <div
                  className="scroll-hero-card-progressbar"
                  style={{ width: isActive ? '100%' : '0%' }}
                />
              </div>
            </div>
          );
        })}

        {/* Scrubber Dock */}
        <div className="scroll-hero-scrubber">
          <div className="scroll-hero-scrubber-label">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Timeline</span>
          </div>

          <div
            className="scroll-hero-scrubber-track"
            ref={scrubberTrackRef}
            onClick={handleScrubberClick}
            title="Click or drag to scrub animation"
          >
            <div
              className="scroll-hero-scrubber-fill"
              style={{ width: `${scrubberPct}%` }}
            />
            <div
              className="scroll-hero-scrubber-thumb"
              style={{ left: `${scrubberPct}%` }}
            />
          </div>

          <div className="scroll-hero-milestones">
            <button
              className={`scroll-hero-milestone-btn ${Math.abs(scrubberPct - 0) < 10 ? 'active' : ''}`}
              onClick={() => scrollToRatio(0)}
            >
              0% Launch
            </button>
            <button
              className={`scroll-hero-milestone-btn ${Math.abs(scrubberPct - 35) < 10 ? 'active' : ''}`}
              onClick={() => scrollToRatio(0.35)}
            >
              35% Velocity
            </button>
            <button
              className={`scroll-hero-milestone-btn ${Math.abs(scrubberPct - 65) < 10 ? 'active' : ''}`}
              onClick={() => scrollToRatio(0.65)}
            >
              65% Apex
            </button>
            <button
              className={`scroll-hero-milestone-btn ${Math.abs(scrubberPct - 100) < 10 ? 'active' : ''}`}
              onClick={() => scrollToRatio(1.0)}
            >
              100% Supersonic
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono animate-bounce">
            <ArrowDown className="w-3.5 h-3.5" />
            <span>Scroll to Drive</span>
          </div>
        </div>
      </div>
    </section>
  );
}
