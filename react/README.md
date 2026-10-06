# 🏎️ Scroll-Driven Hero Section Animation (React)

[![Live Demo](https://img.shields.io/badge/Live_Demo-react--red--sigma.vercel.app-00f2fe?style=for-the-badge&logo=vercel&logoColor=black)](https://react-red-sigma.vercel.app/)
[![Author](https://img.shields.io/badge/Author-chandana--builds-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/chandana-builds)

A high-performance, scroll-driven interactive hero section animation inspired by McLaren 720S telemetry and kinematics. Built for React 18+ with GSAP, ScrollTrigger, and Lenis smooth momentum scrolling.

**Live Demo**: [https://react-red-sigma.vercel.app/](https://react-red-sigma.vercel.app/)

---

## Features

- **GSAP ScrollTrigger Scrubbing**: 60fps synchronization between vertical scroll distance and vehicle translation.
- **Lenis Smooth Momentum**: Fluid inertia scrolling without jitter or layout thrashing.
- **Dynamic Character Illumination**: Letters in the headline sequentially illuminate and elevate as the vehicle's collision box passes over them.
- **Real-Time Telemetry HUD**: Live updates for velocity, dynamic gear transmission (`N`, `1`–`6`), RPM curve, and trajectory completion.
- **Interactive Milestone Scrubber**: Clickable timeline track and milestone jump buttons (`0%`, `35%`, `65%`, `100%`).
- **Dynamic Theme Palette**: Pre-configured support for `lime`, `cyan`, `orange`, and `purple` liveries with matching CSS variables and glows.
- **Fully Componentized**: Easily pass custom text, metrics arrays, theme tokens, and car images.

---

## Installation & Setup

1. Navigate to the `react/` directory:
   ```bash
   cd react
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

---

## Component API: `<ScrollHeroSection />`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `headline` | `string` | `'WELCOME ITZFIZZ'` | Text string rendered and illuminated letter-by-letter. |
| `carImage` | `string` | `'/assets/car.png'` | Image path or imported asset for the top-view vehicle. |
| `theme` | `'lime' \| 'cyan' \| 'orange' \| 'purple'` | `'lime'` | Active color livery scheme. |
| `metrics` | `Array<MetricItem>` | `DEFAULT_METRICS` | Array of milestone statistic cards. |
| `enableSmoothScroll` | `boolean` | `true` | Enables or disables Lenis momentum scrolling. |
| `onProgressUpdate` | `(progress: number) => void` | `undefined` | Callback fired on every scroll tick with progress `0.0`–`1.0`. |

---

## Metric Item Data Structure

```javascript
{
  id: 'box1',
  badge: 'Fleet Logistics',
  icon: TrendingUp, // Lucide icon component
  target: 58,       // Number for count-up animation
  symbol: '%',      // Unit symbol
  desc: 'Increase in pickup point efficiency across urban hubs',
  range: [0.15, 0.40], // Progress window [min, max] where milestone is active
  className: 'card-1'
}
```

---

## Author

**Chandana Gurrapu** ([@chandana-builds](https://github.com/chandana-builds))
