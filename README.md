<div align="center">

# 🌱 Project Graveyard — Conservatory Protocol

**Unfinished doesn't mean worthless. A second chance for abandoned ideas.**

Code Variant — Build 01 (Round 2) · Problem Statement **PS 05 — The Project Graveyard** · **Team Hashing**

[![Code Variant 2026](https://img.shields.io/badge/Code%20Variant-Build%2001%20%E2%80%A2%20Round%202-emerald?style=for-the-badge)](https://github.com/anshjaiswal2911-tech/Team-Hashing-CodeVariant)
[![Problem Statement PS 05](https://img.shields.io/badge/Problem%20Statement-PS%2005-amber?style=for-the-badge)](https://github.com/anshjaiswal2911-tech/Team-Hashing-CodeVariant)
[![Team Hashing](https://img.shields.io/badge/Team-Hashing-blue?style=for-the-badge)](https://github.com/anshjaiswal2911-tech/Team-Hashing-CodeVariant)
[![Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20TypeScript%20%7C%20Tailwind%20v4-purple?style=for-the-badge)](https://github.com/anshjaiswal2911-tech/Team-Hashing-CodeVariant)

### 🔗 [Live Demo](https://YOUR-LIVE-URL-HERE) · 📦 [Repository](https://github.com/anshjaiswal2911-tech/Team-Hashing-CodeVariant)

</div>

---

## 📖 Table of Contents

1. [The Problem](#-the-problem)
2. [Our Solution](#-our-solution)
3. [Features](#-features)
4. [Screenshots](#-screenshots)
5. [How It Works](#-how-it-works)
6. [Design Philosophy](#-design-philosophy)
7. [Tech Stack](#-tech-stack)
8. [Getting Started](#-getting-started)
9. [Scripts](#-scripts)
10. [Project Structure](#-project-structure)
11. [Deployment](#-deployment)
12. [Build Progress](#-build-progress)
13. [Team](#-team-hashing)

---

## 🥀 The Problem

Every developer, student, and hackathon builder has a folder of abandoned side projects. When time runs out, exams arrive, or priorities shift, valuable code sits forgotten in private repositories.

| Pain point | What happens |
| :--- | :--- |
| **Lost context** | You forget what was finished, what was left, and why progress stopped. |
| **Unclear direction** | You can't decide whether to continue, pivot, or archive. |
| **Restart friction** | Returning months later feels like starting from zero. |
| **The decision vacuum** | GitHub stores code, notes hold ideas, task apps track to-dos, but none of them answer **"What now?"** |

---

## 🌿 Our Solution

**Project Graveyard** preserves the context of a stalled project, scores its chances of revival, and turns it into concrete next actions, using a three-step method: **Capture → Evaluate → Act**.

```
        [ Abandoned Repository ]
                   │
                   ▼
        1. CAPTURE  (Crypt + Autopsy)
           context, technical debt, epitaph
                   │
                   ▼
        2. EVALUATE (Revival Compass)
           viability score 0–100
           → Continue | Repurpose | Archive
                   │
                   ▼
        3. ACT      (Sprint Roadmap + Salvage Yard)
           120-minute plan, reusable code export
```

---

## 🏛️ Features

### 🪦 1. The Crypt & Preserved Specimens Catalog
- Catalog of abandoned projects, each tagged with a failure classification: *Time Shortage*, *Scope Creep*, *Technical Blocker*, *Hackathon Ended*.
- **Autopsy view** showing git history, completion percentage, and technical debt.
- Keyboard-first command palette with instant specimen filtering.

### 🧭 2. The Revival Compass
- Viability score based on technical freshness, architecture health, and market timing.
- Clear recommendation: **Continue**, **Repurpose**, or **Archive**.
- A timeboxed **120-minute Revival Sprint Roadmap** with an actionable checklist.

### 📦 3. The Salvage Yard
- Pulls out clean, reusable modules (for example JWT auth engines or canvas loops).
- **One-click ZIP export** generated in the browser with JSZip, with no server needed.

### 🧬 4. Graft Studio & AI Forensic Copilot
- **Graft Studio:** combine components from multiple dead projects into the base of a new MVP.
- **AI Copilot:** a floating assistant that answers questions about the projects in the Crypt.

### ✨ Extras
- Calming ambient sound built on the Web Audio API (432 Hz chime), with a mute toggle.
- Responsive layout for desktop, tablet, and mobile.
- State is saved in the browser (LocalStorage / SessionStorage), so your data is still there after a refresh.

---

## 🖼️ Screenshots

> Replace these placeholders with real screenshots (save images in `public/screenshots/`).

| Landing | Crypt & Autopsy |
| :---: | :---: |
| ![Landing](public/screenshots/landing.png) | ![Crypt](public/screenshots/crypt.png) |

| Revival Compass | Salvage Yard |
| :---: | :---: |
| ![Compass](public/screenshots/compass.png) | ![Salvage](public/screenshots/salvage.png) |

---

## ⚙️ How It Works

1. **Capture:** a project enters the Crypt with its history, completion level, failure reason, and technical debt.
2. **Evaluate:** the Revival Compass scores several signals and produces a 0–100 viability score with a recommendation.
3. **Act:** the user follows the generated 120-minute roadmap, exports reusable code from the Salvage Yard, or combines parts in Graft Studio.

Everything runs in the browser. There is no backend, and project data stays on the user's device.

---

## 🎨 Design Philosophy

**Warm Sandstone Claymorphism**, built to feel calm instead of like a cold SaaS dashboard.

- **Tactile soft UI:** rounded clay-like surfaces, soft shadows, and warm tones (`#FAF6F0`, `#DE8553`).
- **Calm atmosphere:** gentle sound and smooth motion.
- **Clear hierarchy:** one primary action per screen, consistent spacing and typography.
- **Responsive:** designed mobile-first and scaled up.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | React 19 + TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 with custom theme variables |
| Audio | Web Audio API |
| Export | JSZip |
| State | React context + LocalStorage / SessionStorage |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18 or newer
- npm (comes with Node.js)
- Git

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/anshjaiswal2911-tech/Team-Hashing-CodeVariant.git
cd Team-Hashing-CodeVariant

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. (Optional) create your local environment file
cp .env.example .env

# 4. Start the development server
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

> **Note:** `--legacy-peer-deps` is needed because of a peer-dependency version mismatch between Vite and its plugins. Adding a `.npmrc` file containing `legacy-peer-deps=true` makes a plain `npm install` work too.

### Environment variables

Copy `.env.example` to `.env` and fill in only the values you need. **Never commit `.env` or real API keys.**

---

## 📜 Scripts

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Starts the dev server with hot reload |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally for a final check |

---

## 📁 Project Structure

```
Team-Hashing-CodeVariant/
├── public/            # Static assets (icons, images, screenshots)
├── src/               # Application source (components, context, utils, styles)
├── index.html         # App entry HTML
├── vite.config.ts     # Vite configuration
├── tsconfig.json      # TypeScript configuration
├── package.json       # Dependencies and scripts
└── .env.example       # Example environment variables
```

---

## ☁️ Deployment

The app is a static frontend, so it deploys easily to Vercel or Netlify:

1. Import the GitHub repository.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Every push to `main` redeploys automatically.

Live URL: **https://YOUR-LIVE-URL-HERE**

---

## 📅 Build Progress

Code Variant Round 2 is a 12-hour live build with 4 checkpoints and a final submission.

- [x] **12:00 PM — Checkpoint 1:** Repository initialized, team details submitted
- [ ] **3:00 PM — Checkpoint 2:** Core UI, landing experience, and Crypt / Specimens catalog
- [ ] **6:00 PM — Checkpoint 3:** Revival Compass and Salvage Yard, plus **Surprise Challenge**
- [ ] **9:00 PM — Checkpoint 4:** Graft Studio, polish, and responsive pass
- [ ] **11:59 PM — Final Submission:** Live deployment and final documentation

---

## 👥 Team Hashing

| Member | Role | GitHub |
| :--- | :--- | :--- |
| **Ansh Jaiswal** | Team Lead & Frontend Architect | [`@anshjaiswal2911-tech`](https://github.com/anshjaiswal2911-tech) |
| **Aryan Jaiswal** | UI/UX & Design Systems | [`@AryanJaiswalDev`](https://github.com/AryanJaiswalDev) |
| **Mitesh Jha** | Logic, Components & Integration | [`@jhamitesh0302-afk`](https://github.com/jhamitesh0302-afk) |
| **Rajiv Jha** | Architecture, Data & Documentation | [`@jharajiv315`](https://github.com/jharajiv315) |

---

<div align="center">

*Crafted with care by **Team Hashing** for **Code Variant — Build 01 (2026)**.*

</div>