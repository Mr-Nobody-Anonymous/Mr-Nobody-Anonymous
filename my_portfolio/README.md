# Mr. Nobody // Cybersecurity & AI Systems Portfolio 2.0

> Premium interactive cybersecurity operations console and developer portfolio built with **React 19**, **TypeScript**, **Vite**, and **Motion (`motion/react`)**.

Deployed live on GitHub Pages: **[https://mr-nobody-anonymous.github.io/Mr-Nobody-Anonymous/](https://mr-nobody-anonymous.github.io/Mr-Nobody-Anonymous/)**

---

## ⚡ Technology Stack

- **Core**: React 19, TypeScript 5 (Strict Mode)
- **Bundler & Tooling**: Vite 6
- **Animation Engine**: Motion for React (`motion/react`) — spring transitions, shared-element `layoutId` case files, viewport reveals, and `MotionConfig` accessibility
- **Iconography**: Lucide React + custom SVG brand icons
- **Styling**: Vanilla CSS Design Tokens (CSS variables) supporting 3 cyber HUD palettes:
  - `Terminal Green` (Default `#00FF66`)
  - `Cyber Cyan` (`#00F0FF`)
  - `Crimson Alert` (`#FF2A55`)
- **Effects**: Lightweight HTML5 Canvas Matrix rain background, perspective cyber grid, optional CRT/Scanline overlay

---

## 🚀 Key Features

1. **Security Console 2.0**:
   - Simulated operational bash terminal with command history navigation (`ArrowUp` / `ArrowDown`), tab autocompletion (`Tab`), and color-coded output formatting.
   - Built with safe React text nodes (zero unsafe `innerHTML`).
   - Commands: `help`, `whoami`, `about`, `skills`, `projects`, `status`, `scan`, `matrix`, `theme`, `github`, `htb`, `thm`, `contact`, `clear`.
2. **Project Case Files & Shared Element Transitions**:
   - Filterable operations grid with layout animations.
   - Clicking any project card expands it via Motion `layoutId` into an in-depth security case file showing architecture notes, simulated runtime logs, language metrics, and direct GitHub links.
3. **Simulated Threat Telemetry**:
   - Circular perimeter radar sweep with interactive node inspectors, explicitly labeled `[SIMULATED TELEMETRY]` to preserve technical credibility.
   - System Status HUD reflecting verified repositories and platform runtime health.
4. **Accessibility & Reduced Motion**:
   - Full support for `prefers-reduced-motion: reduce` via `MotionConfig` and custom media-query hooks.
   - Matrix rain and radar animations automatically stop when tabs are inactive or when reduced motion is preferred.
   - Complete keyboard navigation with visible focus rings and `Escape` key handlers for modals and boot sequence.

---

## 🛠️ Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Compile TypeScript & build production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📂 Project Architecture

```
my_portfolio/
├── public/                     # Static assets (.nojekyll, 404.html, favicon.svg)
├── src/
│   ├── components/
│   │   ├── layout/             # Floating Navbar, Footer
│   │   ├── hero/               # Hero, MatrixBackground, ThreatRadar, SystemStatus
│   │   ├── terminal/           # CyberTerminal, TerminalLine
│   │   ├── projects/           # ProjectCard, ProjectFilter, ProjectModal, ProjectGrid
│   │   ├── skills/             # SkillMatrix, SkillCard
│   │   ├── experience/         # Timeline
│   │   ├── stats/              # GitHubStats
│   │   ├── contact/            # ContactSection, ContactForm
│   │   └── ui/                 # GlowButton, GlassCard, SectionHeading, BootSequence, Icons
│   ├── data/                   # Strongly typed data: projects, skills, socials, terminal
│   ├── hooks/                  # useTerminal, useMatrix, useReducedMotion, useTheme
│   ├── lib/                    # Central Motion animation variants and utilities
│   ├── styles/                 # variables.css (tokens) and globals.css (reset, cyber overlays)
│   ├── App.tsx                 # Root application wrapper with MotionConfig
│   └── main.tsx                # React DOM entry
├── index.html                  # Vite root HTML with SEO & OpenGraph tags
├── vite.config.ts              # Vite config configured with base: '/Mr-Nobody-Anonymous/'
├── tsconfig.json               # TypeScript strict configuration
└── package.json                # Dependencies and npm scripts
```

---

## 🌐 GitHub Pages Deployment

The application is deployed via [`.github/workflows/deploy-portfolio.yml`](../.github/workflows/deploy-portfolio.yml).
On every push to `main` affecting `my_portfolio/**`:
1. Node.js 22 is provisioned with npm caching.
2. `npm ci` installs dependencies in clean CI mode.
3. `npm run build` compiles TypeScript and Vite bundles into `my_portfolio/dist`.
4. `actions/upload-pages-artifact@v3` and `actions/deploy-pages@v4` deploy the bundle to GitHub Pages at `/Mr-Nobody-Anonymous/`.
