# 🏛️ System Architecture & Engineering Principles

> **Project Graveyard: Conservatory Protocol** • **Technical Architecture Specification**

---

## 🏗️ High-Level Component Hierarchy

```
[ App.tsx (Root State, Screen Navigation, Global Modals) ]
  ├── [ Navigation Shell ]
  │     ├── Header (Ambience sound toggle, search trigger, breadcrumbs)
  │     └── Sidebar (Screen switching: Overview, Bury, Compass, Salvage, Graft)
  ├── [ Screen Views ]
  │     ├── LandingPageView (Full-bleed presentation, dilemma comparison)
  │     ├── LoginView (Curator auth, local session persistence)
  │     ├── OverviewView (Preserved specimens catalog, filtering)
  │     ├── BuryProjectView (3-step burial intake wizard)
  │     ├── SalvageYardView (Zero-dependency code extraction & JSZip)
  │     ├── RevivalCompassView (Viability radar & 120-min sprint roadmap)
  │     ├── GraftStudioView (Cross-project DNA component combiner)
  │     └── PatternInsightsView (Failure taxonomy analytics)
  └── [ Global Modals & Overlays ]
        ├── CommandPalette (Keyboard-first fuzzy search ⌘K)
        ├── MemorialAutopsyModal (Forensic vitrine & commit logs)
        ├── GraftSprintModal (Interactive 2-hour sprint checklist)
        ├── MeetAiAgentModal (3D curator character showcase)
        └── ProjectAiChatbot (Floating drawer with syntax highlighting)
```

---

## ⚡ Performance & Zero-Backend Latency

* **Sub-Second HMR:** Vite 8 build pipeline with TypeScript strict compilation.
* **In-Memory Bundler:** JSZip generates sanitized code packages on the client thread without server bottlenecks.
* **Web Audio Synthesis:** Native 432Hz binaural drone with gain attenuation, requiring zero external audio assets.
