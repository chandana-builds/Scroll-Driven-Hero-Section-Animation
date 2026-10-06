# 🏎️ Scroll-Driven Hero Section Animation

A luxury, interactive, scroll-driven hero section inspired by **McLaren 720S** telemetry and kinematics. Engineered with **Vanilla JS, CSS3, GSAP, ScrollTrigger, Lenis**, along with a production-ready **React 18 + Vite** implementation.

---

## ✨ Features

- **🏎️ Kinematic Vehicle Scrubbing**: Pinned 280vh track synchronized at 60fps with vertical scroll position.
- **💡 Synchronized Letter Illumination**: `"WELCOME ITZFIZZ"` characters sequentially light up with bloom and scale as the car drives past them.
- **⚡ Dynamic Energy Speed Trail**: Energetic neon trail and exhaust jet expanding behind the vehicle.
- **📊 Real-time Telemetry HUD**: Live metrics for velocity (0–208 MPH), dynamic gear shifting (`N`, `1`–`6`), RPM curve, and trajectory completion percentage.
- **📈 Animated Impact Metric Cards**: Staggered cards with number count-up animations and milestone progress highlighting.
- **🎛️ Interactive Scrubber Dock**: Click-to-scrub timeline with quick-jump milestone buttons (`0% Launch`, `35% Velocity`, `65% Apex`, `100% Supersonic`).
- **🎨 Livery Theme Switcher**: 4 curated color palettes (`Lime`, `Cyan`, `Orange`, `Purple`) with matching CSS tokens and vehicle hue filters.
- **🔊 Synthesized Web Audio Drone**: Pitch-shifting engine rumble responsive to scroll velocity plus letter activation ticks.
- **⚛️ Dual Implementations**:
  - **Vanilla Web**: Pure HTML5, CSS3, JavaScript (ready for GitHub Pages or static hosting).
  - **React 18+**: Fully componentized with Vite, Tailwind utilities, and Lucide React.

---

## 📁 Repository Structure

```
.
├── assets/
│   └── car.png               # McLaren 720S high-res top view asset
├── css/
│   └── style.css             # Glassmorphism, animations, responsive design
├── js/
│   └── main.js               # GSAP, ScrollTrigger, Lenis, Web Audio engine
├── index.html                # Main vanilla web entry point
├── react/                    # React 18 + Vite implementation
│   ├── public/assets/        # Static assets for React
│   ├── ScrollHeroSection.jsx # Reusable React component
│   ├── ScrollHeroSection.css # Component styles
│   ├── App.jsx               # Demo showcase container
│   ├── vite.config.js        # Vite config
│   └── package.json          # Dependencies
└── README.md
```

---

## 🚀 Getting Started

### 1. Vanilla HTML / CSS / JS Version
Open `index.html` directly in your browser or run a simple local server:

```bash
# Python
python -m http.server 3000

# or Node (npx)
npx serve .
```
Visit `http://localhost:3000` in your browser.

---

### 2. React Version
Navigate to the `react/` directory:

```bash
cd react
npm install
npm run dev
```
Visit `http://localhost:5173` in your browser.

---

## 🌐 Where & How to Deploy

### Option 1: GitHub Pages (Recommended for the Vanilla Version) - 100% Free
1. Push this repository to GitHub.
2. In your GitHub repository, navigate to **Settings** → **Pages**.
3. Under **Branch**, select `main` and root `/ (root)`.
4. Click **Save**.
5. Within 1–2 minutes, your site will be live at:
   `https://chandana-builds.github.io/Scroll-Driven-Hero-Section-Animation/`

---

### Option 2: Vercel (Recommended for React or Instant Full-Stack Deployment)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **"Add New..."** → **"Project"**.
3. Import `Scroll-Driven-Hero-Section-Animation`.
4. If deploying the React version, set the **Root Directory** to `react`.
5. Click **Deploy**. Vercel provides automatic SSL, global CDN, and preview branches on every commit.

---

### Option 3: Netlify
1. Log in to [netlify.com](https://netlify.com) with GitHub.
2. Click **"Add new site"** → **"Import an existing project"**.
3. Choose `Scroll-Driven-Hero-Section-Animation`.
4. For vanilla, leave build command empty and publish directory as `.`. For React, set base directory to `react`, build command `npm run build`, and publish directory to `react/dist`.
5. Click **Deploy Site**.

---

## 🛠️ Built With

- **HTML5 & Vanilla CSS3**
- **JavaScript (ES6+)**
- **GSAP 3 & ScrollTrigger**
- **Lenis Smooth Scroll**
- **Web Audio API**
- **React 18 & Vite**
- **Lucide Icons**
