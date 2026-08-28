# ⚡ TechiesHack 3.0 — Doomsday Protocol

> **A 24-Hour Online Hackathon by Codways Technologies**  
> *"The clock is counting down on a global build crisis. Assemble your squad, pick your directive, and ship a working solution before the timer hits zero."*

[![React 19](https://img.shields.io/badge/React-19.2-blue?logo=react&style=flat-square)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript&style=flat-square)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&style=flat-square)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&style=flat-square)](https://tailwindcss.com/)
[![GSAP 3](https://img.shields.io/badge/GSAP-3.15-88CE02?logo=greensock&style=flat-square)](https://greensock.com/gsap/)
[![Vercel Deployment](https://img.shields.io/badge/Vercel-Live_Production-000000?style=flat-square&logo=vercel)](https://techies-hack-3-0-doomsday-protocol.vercel.app/)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Live_Mirror-success?style=flat-square&logo=github)](https://arshitraj-123.github.io/TechiesHack-3.0-Doomsday-Protocol/)

> 🚀 **Primary Production URL (Vercel):** **[https://techies-hack-3-0-doomsday-protocol.vercel.app/](https://techies-hack-3-0-doomsday-protocol.vercel.app/)**  
> 🌐 **Secondary Mirror (GitHub Pages):** **[https://arshitraj-123.github.io/TechiesHack-3.0-Doomsday-Protocol/](https://arshitraj-123.github.io/TechiesHack-3.0-Doomsday-Protocol/)**

---

## 🛰️ Mission Overview

**TechiesHack 3.0: Doomsday Protocol** is a next-generation, high-octane hackathon landing portal designed with a tactical military-sci-fi aesthetic. Engineered with cinematic atmospheric layering, buttery-smooth scroll mechanics, responsive vector paths, and GPU-accelerated shaders, it delivers an immersive recruitment experience for builders, designers, and innovators.

---

## ⚡ Key Segments & Features

### 1. 🌌 Cinematic Atmospheric Hero
* **5-Stage Layer Compositing**:
  * *Layer 1*: High-definition dystopian battlefield background (`/hero-bg.jpg`).
  * *Layer 2*: Multi-stage dark vignette framing focus on primary telemetry.
  * *Layer 3*: Reactive ember spark particles powered by `@tsparticles/react`.
  * *Layer 4*: Tactical HUD grid overlay with radial vignette masking.
  * *Layer 5*: Concentric orbital rings rendered via responsive SVG vectors (`animate-spin-pure`), eliminating layout shifts.
* **Display Typography**: Clamped `Anton` headline with glitch duplicate effect and responsive letter-spacing controls.
* **Single-Row Countdown Matrix**: Live 24-hour sprint countdown (`Days`, `Hours`, `Mins`, `Secs`) styled in `Space Mono` with `whitespace-nowrap` protection, ensuring single-line alignment from 320px mobile to 4K displays.

### 2. 🚨 Canvas Emergency Alert Ticker
* High-performance HTML5 Canvas marquee rendering at 60fps via `requestAnimationFrame`.
* Uses `window.devicePixelRatio` for Retina/HiDPI displays with zero DOM layout overflow footprint.
* Includes accessible semantic text fallback for screen readers and SEO.

### 3. 📊 Operational Telemetry Strip
* Displays four mission parameters with illuminated status LEDs:
  * **Duration**: `24 HOURS` (Continuous sprint)
  * **Registration Fee**: `₹200 / SQUAD` (Flat entry)
  * **Participation Mode**: `100% ONLINE` (Global virtual access)
  * **Prize Cache**: `UNLOCKED` (Cash rewards + certificates)

### 4. 📜 Sector 01: Mission Briefing
* Immersive storyline framing developer tracks as critical crisis directives.
* Tactical pill badges highlighting squad size (2–4 members), online platform access, and submission criteria.

### 5. 🎯 Sector 02: Mission Directives (Tracks)
* 6 hackathon problem tracks:
  * **AI & Machine Defense**
  * **Decentralized Systems & Web3**
  * **Critical Cloud Infrastructure**
  * **Cyber Warfare & Security**
  * **Healthcare Emergency Systems**
  * **Open Innovation Protocol**
* High-tech corner bracket cards with hover lift transitions and glowing category markers.

### 6. 🏆 Sector 03: Interactive Reward Caches
* Three tier vaults: **Alpha Gold Cache**, **Beta Silver Cache**, and **Gamma Bronze Cache**.
* **Interactive Vault Unsealing**: Clicking "UNSEAL CACHE" triggers a tactical sound cue and opens the vault.
* **GPU Conic Shimmer**: Powered by CSS `@property --angle` and `conic-gradient()` without oversized DOM elements.

### 7. 🛸 Sector 04: Countdown Corridor (GSAP Timeline)
* **Recon Drone Flight Path**: GSAP `ScrollTrigger` and `MotionPathPlugin` drive a high-tech recon drone (`/corridor-drone.png`) down a glowing SVG cubic bezier rail track in real-time scroll sync.
* **Adaptive Trajectory**: Automatically maps station dot centers on resize/orientation changes and simplifies to a straight-line track on mobile.

### 8. 📐 Sector 05: Evaluation Protocol
* High-resolution evaluation protocol diagram seamlessly embedded into the void environment.
* Viewport-bounded ambient crimson back-glow with CSS `contain: paint` protection.

### 9. 👥 Sector 06: Command Center (Team)
* Roster featuring **Core Patrons** and **Organizing Committee**.
* 1:1 image slots with tactical border brackets, role badges, and social links.

### 10. 📖 Field Manual: Accordion FAQ
* Accessible FAQ powered by Radix UI accordion primitives.
* Features Roman numeral indices (`I`, `II`, `III`...), 52px mobile touch targets, and natural word wrapping.

### 11. 📡 Comms Relay & Final Call (Enlistment)
* **Comms Channel**: Direct links to WhatsApp Community, Google Meet virtual triage rooms, and Codways Technologies HQ, paired with an interactive message transmission form.
* **Enlistment Closing CTA**: Direct Google Form integration, closing countdown pills, and an HUD-framed scannable QR code (`/public/registration-qr.png`).
* **Header & Mobile Drawer**: Sticky HUD nav with frosted backdrop blur, scrollspy observer, and a responsive Vaul mobile drawer with an explicit top-right **Cross Close Button (`X`)**.
* **Cybernetic Crosshair Cursor**: Interactive crosshair with hover expansion (`data-cursor`), spark trails, and automatic suppression on touch/tablet devices.
* **Lenis Smooth Scroll**: Inertial smooth scrolling linked with GSAP's ticker.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technologies |
| :--- | :--- |
| **Core Framework** | React 19, TypeScript 6.0, Vite 8.2 |
| **Styling & Design** | Tailwind CSS 3.4, PostCSS, Autoprefixer, tailwindcss-animate |
| **Animation Engines** | GSAP 3 (ScrollTrigger, MotionPath), Framer Motion (`motion`), Lenis Scroll |
| **Particles & Canvas** | `@tsparticles/react`, `@tsparticles/slim`, HTML5 2D Canvas API |
| **UI Primitives** | Radix UI (`@radix-ui/react-accordion`), Vaul (Drawer), Sonner (Toasts) |
| **Icons** | `lucide-react` |
| **Linting & Tooling** | Oxlint (0 warnings, 0 errors) |

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (version 18+ recommended)
* [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Arshitraj-123/TechiesHack-3.0-Doomsday-Protocol.git
   cd TechiesHack-3.0-Doomsday-Protocol
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Deploy to GitHub Pages**:
   ```bash
   npm run deploy
   ```

6. **Run the linter**:
   ```bash
   npm run lint
   ```

---

## 🌐 Deployment & Production Environments

The application is deployed across two independent, high-availability production environments:

| Environment | Platform | Status | Live URL | Infrastructure & Routing |
| :--- | :--- | :---: | :--- | :--- |
| **Primary Production** | **Vercel** | ![Live](https://img.shields.io/badge/Live-000000?style=flat-square&logo=vercel) | **[techies-hack-3-0-doomsday-protocol.vercel.app](https://techies-hack-3-0-doomsday-protocol.vercel.app/)** | Global Edge CDN · Automated CI/CD on `main` · Root SPA rewrites via `vercel.json` |
| **Secondary Mirror** | **GitHub Pages** | ![Live](https://img.shields.io/badge/Live-success?style=flat-square&logo=github) | **[arshitraj-123.github.io/TechiesHack-3.0-Doomsday-Protocol](https://arshitraj-123.github.io/TechiesHack-3.0-Doomsday-Protocol/)** | GitHub Global CDN · `gh-pages` branch deployment · Actions CI/CD pipeline |

---

### ▲ Primary Deployment: Vercel

* **Production URL**: **[https://techies-hack-3-0-doomsday-protocol.vercel.app/](https://techies-hack-3-0-doomsday-protocol.vercel.app/)**
* **Configuration**: [`vercel.json`](./vercel.json)
  * **Framework Preset**: `Vite`
  * **Build Command**: `npm run build`
  * **Output Directory**: `dist`
  * **SPA Fallback Rewrites**: `{"source": "/(.*)", "destination": "/index.html"}` ensuring seamless client-side navigation without 404s on browser reloads.
* **Continuous Integration**: Connected directly to the GitHub repository. Any commit pushed to the `main` branch automatically triggers an instant, zero-downtime production deployment.
* **1-Click Deploy New Clone**:
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FArshitraj-123%2FTechiesHack-3.0-Doomsday-Protocol)

---

### 🐙 Secondary Mirror: GitHub Pages

* **Mirror URL**: **[https://arshitraj-123.github.io/TechiesHack-3.0-Doomsday-Protocol/](https://arshitraj-123.github.io/TechiesHack-3.0-Doomsday-Protocol/)**
* **Deployment Source**: Branch `gh-pages` (root folder)
* **Automated CI/CD Workflow**: [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) automatically compiles and deploys upon pushes to `main`.
* **Manual Command**: Run `npm run deploy` to rebuild and push the compiled bundle directly to the `gh-pages` branch.

---

## 📱 Responsive Hardening & Viewport Verification

The layout has been programmatically audited and verified with **0 horizontal scroll overflows** across all standard breakpoints:

| Breakpoint | Target Screen | Client Width | Overflow Count |
| :---: | :--- | :---: | :---: |
| **320px** | Ultra-compact Mobile | 320px | **0** |
| **375px** | iPhone SE | 375px | **0** |
| **390px** | iPhone 12/13/14 Pro | 390px | **0** |
| **414px** | iPhone Plus / Max | 414px | **0** |
| **600px** | Small Tablet | 600px | **0** |
| **768px** | iPad Portrait | 768px | **0** |
| **1024px** | iPad Landscape / Laptop | 1024px | **0** |
| **1280px** | Standard Desktop | 1280px | **0** |
| **1440px** | Large Desktop | 1440px | **0** |
| **1920px** | Full HD Display | 1920px | **0** |

---

## ⚙️ Configuration & Customization

* **External Links**: Manage the Google Form registration URL and WhatsApp group invite in [`src/constants/links.ts`](./src/constants/links.ts):
  ```typescript
  export const REGISTRATION_FORM_URL = "https://forms.google.com/...";
  export const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/...";
  ```
* **Color Tokens**: Customize theme tokens (`void`, `panel`, `crimson`, `gold`, `cyan`, `ink`) in [`tailwind.config.ts`](./tailwind.config.ts).

---

## 🛡️ License & Attribution

Designed and engineered for **TechiesHack 3.0** organized by **Codways Technologies**.  
All rights reserved © 2026. Built with precision for developers worldwide.
