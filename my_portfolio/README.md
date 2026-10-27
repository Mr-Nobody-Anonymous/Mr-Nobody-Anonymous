# Beamlak Sintayehu — Portfolio

> An editorial, security-noir portfolio for a cybersecurity practitioner and applied-AI engineer.
> Built with **React 19**, **TypeScript**, **Vite 6** and **Motion**.

**Live:** [mr-nobody-anonymous.github.io/Mr-Nobody-Anonymous](https://mr-nobody-anonymous.github.io/Mr-Nobody-Anonymous/)

---

## Design direction

The site uses a single visual language — *obsidian & ember* — rather than a stack of competing effects:

| Token | Value | Use |
| :-- | :-- | :-- |
| `--ink-950` | `#07080a` | page background |
| `--ink-900` / `--ink-800` | `#0a0c0f` / `#0e1116` | alternating sections, cards |
| `--ember` | `#e9a268` | primary accent, links, focus states |
| `--glacier` | `#9fd8e4` | secondary accent (used sparingly) |
| `--text-primary` | `#ede8df` | body text (16.4:1 contrast) |
| `--text-muted` / `--text-faint` | `#b3b0a9` / `#7a8088` | secondary copy, mono labels |

- **Type**: Space Grotesk (display) · Inter (body) · JetBrains Mono (labels) · Instrument Serif (italic accents).
- **Layout**: hairline borders, generous negative space, a 1180px content shell and a consistent section rhythm.
- **Motion**: reveals and parallax are subtle and respect `prefers-reduced-motion`; nothing interrupts reading.

## Sections

1. **Hero** — identity, positioning, portrait, and a one-click route into the console.
2. **About** — the story, plus a profile card with role, location and availability.
3. **Skills** — bento grid *and* an interactive relationship map (toggle in the header).
4. **Work** — horizontally pinned gallery on desktop, stacked cards on mobile, with full case-file dialogs.
5. **Journey** — a four-year timeline of projects and research.
6. **Credentials** — certifications plus TryHackMe / HackTheBox practice and focus areas.
7. **Contact** — direct channels and a mail-client form (nothing is sent to a server).
8. **Footer** — navigation, socials, authorisation note.

## Features

- **Command console** (`⌘K` / `Ctrl+K`): sandboxed terminal with history, tab suggestions and commands such as `whoami`, `skills`, `projects`, `open argus`, `contact`, `motion`, `clear`.
- **Case files**: each project opens a dialog with the challenge, architecture notes and stack.
- **Accessibility**: focus trapping in dialogs, `Escape` to close, visible focus rings, ARIA labelling, reduced-motion support, and 4.5:1+ text contrast.
- **SEO**: canonical URL, Open Graph / Twitter cards, and `Person` JSON-LD.
- **Easter eggs**: `↑↑↓↓←→←→BA`, and a console greeting for the curious.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173/Mr-Nobody-Anonymous/
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

> `vite.config.ts` sets `base: '/Mr-Nobody-Anonymous/'`, which matches the GitHub Pages project URL.

## Project structure

```
src/
├── components/
│   ├── blueprint/   # Page sections (hero, about, skills, work, journey, credentials, contact, footer)
│   ├── astra/       # Dialog shell, case files, console
│   ├── cinematic/   # Boot sequence, ambient background
│   ├── layout/      # Cursor, chrome
│   └── ui/          # Overlays and shared atoms
├── data/            # Content: projects, skills, experience, credentials, socials
├── styles/          # Tokens (variables.css), global layer, dialog styles
└── App.tsx          # Section composition
```

## Editing content

- **Projects** → `src/data/portfolio.ts`
- **Certifications & labs** → `src/data/credentials.ts`
- **Journey / timeline** → `src/data/experience.ts`
- **Contact details & socials** → `src/data/portfolio.ts`, `src/data/socials.ts`
- **CV** → replace `public/cv.pdf`; the Download CV button (top-right) links to it
  via `CV_URL` in `src/components/blueprint/BlueprintNavbar.tsx`. To regenerate the
  bundled one: `cd scripts && python3 make_cv.py` (needs `pip install reportlab`).

## Deployment

`.github/workflows/deploy-portfolio.yml` builds the site on every push to `main` that touches `my_portfolio/**` and publishes it to GitHub Pages.
