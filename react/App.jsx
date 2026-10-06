import React, { useState } from 'react';
import ScrollHeroSection from './ScrollHeroSection';
import { Zap, Volume2, VolumeX, RotateCcw } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState('lime');
  const [audioEnabled, setAudioEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-[#07090e] text-white">
      {/* Top Navbar */}
      <header className="fixed top-0 left-0 right-0 h-18 px-8 flex items-center justify-between z-50 backdrop-blur-md bg-[#07090e]/70 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="font-bold tracking-wider text-lg">ITZFIZZ</span>
        </div>

        {/* Theme Picker */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/10">
            {['lime', 'cyan', 'orange', 'purple'].map((color) => (
              <button
                key={color}
                onClick={() => setTheme(color)}
                className={`w-4 h-4 rounded-full transition-transform ${
                  theme === color ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor:
                    color === 'lime'
                      ? '#38ef7d'
                      : color === 'cyan'
                      ? '#00f2fe'
                      : color === 'orange'
                      ? '#ff5e3a'
                      : '#c084fc'
                }}
                aria-label={`${color} theme`}
              />
            ))}
          </div>

          <button
            onClick={() => setAudioEnabled(!audioEnabled)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 hover:border-emerald-400 transition"
          >
            {audioEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            <span>Audio: {audioEnabled ? 'ON' : 'OFF'}</span>
          </button>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 hover:border-white/30 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay</span>
          </button>
        </div>
      </header>

      {/* Main Hero Component */}
      <main>
        <ScrollHeroSection
          headline="WELCOME ITZFIZZ"
          carImage="/assets/car.png"
          theme={theme}
        />

        {/* Content Section Below Scroll Hero */}
        <section className="py-24 px-8 max-w-6xl mx-auto border-t border-white/10">
          <div className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-2">
            Engineering & Dynamics
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Kinematic Supercar Telemetry Showcase
          </h2>
          <p className="text-slate-400 max-w-2xl text-base md:text-lg mb-12">
            Engineered with modern React hooks, GSAP ScrollTrigger scrubbing, and Lenis momentum physics for ultra-smooth 60fps responsiveness.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <div className="text-center p-4">
              <div className="text-4xl font-extrabold text-white">2.8<span className="text-emerald-400 text-xl">s</span></div>
              <div className="text-xs uppercase text-slate-400 font-mono mt-1">0-60 MPH</div>
            </div>
            <div className="text-center p-4 border-l border-white/10">
              <div className="text-4xl font-extrabold text-white">720<span className="text-emerald-400 text-xl">PS</span></div>
              <div className="text-xs uppercase text-slate-400 font-mono mt-1">Twin-Turbo V8</div>
            </div>
            <div className="text-center p-4 border-l border-white/10">
              <div className="text-4xl font-extrabold text-white">212<span className="text-emerald-400 text-xl">mph</span></div>
              <div className="text-xs uppercase text-slate-400 font-mono mt-1">Top Speed</div>
            </div>
            <div className="text-center p-4 border-l border-white/10">
              <div className="text-4xl font-extrabold text-white">1,283<span className="text-emerald-400 text-xl">kg</span></div>
              <div className="text-xs uppercase text-slate-400 font-mono mt-1">Dry Weight</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
