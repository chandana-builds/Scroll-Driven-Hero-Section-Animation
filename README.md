<div align="center">

# 🏎️ McLaren 720S — Scroll-Driven Telemetry & Hero Animation

An interactive, high-performance scroll-driven web experience inspired by supercar kinematics and telemetry instrumentation.

[![Live Demo](https://img.shields.io/badge/Live_Demo-react--red--sigma.vercel.app-00f2fe?style=for-the-badge&logo=vercel&logoColor=black)](https://react-red-sigma.vercel.app/)
[![GitHub](https://img.shields.io/badge/Author-chandana--builds-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/chandana-builds)
[![License: MIT](https://img.shields.io/badge/License-MIT-38ef7d?style=for-the-badge)](LICENSE)

<br />

[**Explore Live Demo ↗**](https://react-red-sigma.vercel.app/) &nbsp;|&nbsp; [**View Source Code ↗**](https://github.com/chandana-builds/Scroll-Driven-Hero-Section-Animation)

</div>

---

## 📌 Overview

This project is an exploration in combining **physics-based smooth scrolling**, **scroll-bound timeline interpolation**, and **dynamic SVG/DOM kinematics** to create an editorial-tier automotive showcase.

As the user scrolls, a top-down rendering of the McLaren 720S accelerates across a pinned track while synchronizing real-time telemetry gauges, dynamic character bloom illumination, and interactive milestone metrics.

Built as both a **lightweight, dependency-free Vanilla JavaScript application** and a **modular, production-ready React 18 + Vite component**.

---

## 🚀 Live Deployment

The application is deployed and hosted on Vercel:

👉 **[https://react-red-sigma.vercel.app/](https://react-red-sigma.vercel.app/)**

---

## ✨ Key Features & Engineering Highlights

### 1. 🏎️ Kinematic Scrubbing & Smooth Momentum
- **Pinned Track Mechanics**: Anchors the 240px roadway within a 280vh scroll track, giving the driver granular control over the vehicle's position.
- **Lenis Inertia Engine**: Integrated with Lenis momentum scrolling to eliminate micro-stutters and input lag across high-refresh-rate displays.
- **GSAP ScrollTrigger**: Frame-by-frame scrub calculation mapped to vehicle translation and trailing energy fields.

### 2. 💡 Spatial Character Collision & Bloom Illumination
- The headline (`"WELCOME ITZFIZZ"`) is tokenized into individual typography spans.
- Rather than relying on simple CSS delays, letter activation is computed dynamically based on the car's bounding box and front-bumper offset. As the vehicle passes each glyph, it transitions from a muted state to full luminous bloom with scale compensation.

### 3. 📊 Real-Time Telemetry HUD
- **Velocity Tracking**: Dynamically scales from 0 to 208 MPH in direct proportion to trajectory completion.
- **Transmission Logic**: Procedurally shifts between gears (`N`, `1`, `2`, `3`, `4`, `5`, `6`) across velocity thresholds.
- **Tachometer Curve**: Calculates engine RPM between 1,200 idle and 8,500 redline.
- **Progress Gauge**: Real-time readout of trajectory completion percentage.

### 4. 🎛️ Interactive Scrubber Dock & Milestones
- Bottom floating dock displays a scrubbable timeline with tactile quick-jump anchors:
  - `0% Launch`
  - `35% Velocity`
  - `65% Apex`
  - `100% Supersonic`
- Metric milestone cards trigger dynamic progress indicators and count-up animations as the vehicle crosses their spatial triggers.

### 5. 🎨 Multi-Theme Livery Engine
- Instant color scheme switching across 4 bespoke automotive palettes:
  - **Electric Lime** (`#38ef7d`)
  - **Aero Cyan** (`#00f2fe`)
  - **Apex Orange** (`#ff5e3a`)
  - **Ultra Violet** (`#c084fc`)
- Updates CSS variables, particle glows, and vehicle hue-rotation filters seamlessly.

### 6. 🔊 Synthesized Web Audio Drone
- Uses the native **Web Audio API** (Oscillator + Biquad Filter + Gain nodes) to synthesize a futuristic twin-turbo engine rumble that pitch-shifts in response to scroll velocity.
- Micro-ticks fire on character collision events for tactile feedback.

---

## 🏗️ Architecture & Tech Stack

```
Scroll-Driven-Hero-Section-Animation/
├── assets/
│   └── car.png               # High-res McLaren 720S top-down view
├── css/
│   └── style.css             # High-contrast dark mode, HUD glassmorphism
├── js/
│   └── main.js               # GSAP, ScrollTrigger, Lenis & Web Audio engine
├── index.html                # Vanilla HTML5 standalone showcase
│
└── react/                    # React 18 + Vite implementation
    ├── public/assets/        # Bundled static assets
    ├── ScrollHeroSection.jsx # Isolated, prop-driven React component
    ├── ScrollHeroSection.css # Scoped styles & responsive breakpoints
    ├── App.jsx               # Showcase shell with HUD toggles
    ├── vite.config.js        # Vite build config
    └── package.json          # Dependency manifest
```

| Layer | Technologies |
| :--- | :--- |
| **Core** | JavaScript (ES6+), React 18, HTML5 Semantic Markup |
| **Animation Engine** | GSAP 3, ScrollTrigger |
| **Scroll Physics** | Lenis Smooth Scroll |
| **Styling** | Vanilla CSS3, CSS Custom Properties, Glassmorphism, TailwindCSS utilities |
| **Audio** | Native Web Audio API (Synthesized oscillators) |
| **Build Tool** | Vite |
| **Deployment** | Vercel (Global Edge Network) |

---

## ⚡ Performance Optimizations

1. **Zero Layout Thrashing**: Letter coordinates and viewport widths are pre-computed during an initial layout pass and cached. Frame updates during scroll only touch hardware-accelerated `transform` and `opacity` properties.
2. **Lag Smoothing Disabled**: `gsap.ticker.lagSmoothing(0)` ensures 1:1 synchronization between touch/wheel events and visual output.
3. **Hardware Acceleration**: Heavy elements utilize `will-change: transform` and `translateZ(0)` for GPU compositing.
4. **Clean Hook Lifecycles**: All animation instances, ticker listeners, and Web Audio contexts in the React version are cleanly dismantled on unmount to prevent memory leaks.

---

## 💻 Local Development

### Running the Vanilla Version
Open `index.html` directly in any modern browser, or spin up a local server:
```bash
# Using Python
python -m http.server 3000

# or Node / npx
npx serve .
```
Access at `http://localhost:3000`.

---

### Running the React Version
```bash
# Navigate to react folder
cd react

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```
Access at `http://localhost:5173`.

---

## 👤 Author

**Chandana Gurrapu**
- **GitHub**: [@chandana-builds](https://github.com/chandana-builds)
- **Portfolio / Live Demo**: [react-red-sigma.vercel.app](https://react-red-sigma.vercel.app/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) — free to use for personal and commercial projects.
