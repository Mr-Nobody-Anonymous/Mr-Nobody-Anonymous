# TODO — profile, README & portfolio

Working notes. Anything completed here is verified by a production build and a
render smoke test, not just by intent.

## Done

### README (profile repository)
- [x] Rebuilt the hierarchy: Hero → About → What I do → Skills → Toolbox → Certifications → Stats → Connect. The "At a glance" card table was removed in favour of the fuller discipline list.
- [x] Fixed section order: **Socials no longer sits inside the Skills block**; contact links now live in one place (`Connect`).
- [x] Normalised every skill group (`💻 Languages`, `🌐 Frontend & Backend`, `🗄️ Databases`, `📊 Data Science & ML`, `📱 Mobile`, `🚀 DevOps, Platforms & Hardware`, `🛡️ Security`, `💻 Extra Languages & Shells`, `📚 Certifications & Hands-on Labs`) to consistent `###` headings with equal icon heights.
- [x] Removed duplicate links: one primary email row, one portfolio CTA pair (top + footer), one socials row.
- [x] Corrected broken/invalid links: GitLab URL (`www.gitlab.com` → `gitlab.com/bmx310712`), Discord "user link" replaced by the handle, Next.js moved out of *languages*, duplicate Dart/C# icons cleaned up.
- [x] Replaced the four redundant summary cards and the flaky trophy mirror with stats, top languages, streak and an activity graph in the site's palette.
- [x] **Featured repositories section removed** — GitHub renders the pinned-repository shelf on the profile already, so the auto-generated block was duplication. `repos.js` and the `update-repos.yml` workflow were retired with it (both recoverable from git history if ever needed).

### Portfolio site
- [x] New design system: obsidian & ember tokens, Space Grotesk / Inter / JetBrains Mono / Instrument Serif.
- [x] Rewrote Hero, About, Skills (bento + relationship map), Work (pinned horizontal gallery), Journey, Credentials, Contact and Footer.
- [x] Added a **Credentials** section driven by `src/data/credentials.ts`.
- [x] Removed the fake telemetry badge, the random screen glitches and the old idle "screen takeover" — nothing blocks reading any more.
- [x] Shortened the boot sequence (~5.5s → ~2.8s) and made Skip appear immediately.
- [x] Replaced the conflicting legacy stylesheet with a scoped dialog/console stylesheet.
- [x] Rebuilt the 404 page as a self-contained page (the old one linked to a missing `css/style.css`).
- [x] Fixed the TryHackMe handle inconsistency (`Nobody001` vs `Mr.nobody.`).
- [x] Accessibility pass: dialog focus trapping, visible focus rings, ARIA labels, 4.5:1+ text contrast, reduced-motion support.

### Skills & toolbox
- [x] Every logo is its own `<a>` link to the official site/docs/download — previously the whole row was one `skillicons.dev` sprite, so nothing was clickable.
- [x] **260 linked icons, no duplicates across groups**: Languages (23), Frontend & Backend (29), Databases (22), Data Science & ML (24), Mobile (14), DevOps/Platforms/Hardware (33), Security & Active Directory (20), Web & Network Exploitation (31), Malware Analysis & Forensics (18), AI & Agent Tooling (35), Extra Languages & Shells (11).
- [x] Toolbox split into four working benches: **Security & Active Directory**, **Web & Network Exploitation**, **Malware Analysis & Forensics**, **AI & Agent Tooling** — plus the shell/format catch-all.

### Disciplines
- [x] "At a glance" table replaced by **🎯 What I do** — 18 rows covering penetration testing, malware analysis, Active Directory security, threat intelligence & modeling, forensics/IR, application security, web dev, app dev, backend & APIs, databases & data engineering, machine learning, computer vision, AI agents & automation, prompt engineering & LLM systems, Linux & systems, DevOps & infrastructure, hardware & IoT, and research & writing.

### Analytics
- [x] Rebuilt the stats block on canonical endpoints: profile stats, top languages, streak, contribution calendar, profile summary, repos-per-language, most-commit language, productive time (UTC+3), trophies, plus follower/star/repo/profile-view badges.
- [x] Added `cache_seconds=86400` to the two `github-readme-stats` cards — the usual cause of "Maximum retries exceeded" blanks.

### Round 3 — broken widgets, LinkedIn, CV
- [x] `github-readme-activity-graph.vercel.app` is dead upstream (HTTP 402 `DEPLOYMENT_DISABLED`) — replaced with the live contribution calendar at `ghchart.rshah.org/e9a268/...` (verified: 200, SVG, 53.8 KB of real data).
- [x] `github-profile-trophy.vercel.app` is dead too (402, deployment paused) — replaced with the volunteer-run mirror `trophy.ryglcloud.net`, which serves real trophy SVG for this account (verified 200 / latest run).
- [x] `github-readme-stats` needed `include_all_commits` + `count_private` dropped — the public instance answers `Could not fetch total commits` (a 120 px "Something went wrong" card). Without them the card renders correctly (Stars 1 · Commits 485 · PRs 7 · Issues 11).
- [x] Followers / stars badges now carry `cacheSeconds=86400`, so the count re-resolves at most once a day instead of being served stale from GitHub's image cache.
- [x] Every LinkedIn link points at `linkedin.com/in/beamlak-sintayehu-a47b4b281` — README (3 places) and the portfolio (`portfolio.ts`, `socials.ts`, `terminal.ts`, `Footer.tsx`, `BlueprintContact.tsx`, `index.html` JSON-LD).
- [x] **Download CV** button, top-right: floating next to the menu trigger while the hero is on screen, in the nav bar once you scroll, and in the mobile drawer. Served from `public/cv.pdf` via `CV_URL` in `BlueprintNavbar.tsx`.
- [x] `my_portfolio/scripts/make_cv.py` regenerates the PDF from the real CV (`scripts/make_cv.py` → `public/cv.pdf`), so the downloaded file and the site never drift apart.
- [x] **Real CV is now the served file.** The copy in Drive carried three things the rest of the project disagrees with — LinkedIn `in/bam-sintu…`, `https://www.gitlab.com/…` and TryHackMe `Nobody001` — so it was rebuilt from the same content with those corrected. Verified: 52 link annotations, zero remaining occurrences of any of the three.
- [x] Drive file fetched through GitHub Actions (the sandbox cannot reach Google) and committed as `my_portfolio/public/cv.pdf`; the temporary fetch workflow is gone again.
- [x] Badge rendering is now verified end-to-end from GitHub Actions (curl + body inspection) instead of guessed — the temporary probe workflow has been removed.

### Portfolio content — gaps found in the CV
- [x] Journey timeline rewritten with the real roles instead of generic year labels: AI Security & Autonomous Systems Lead (01/2026–), INSA Cyber Talent Camp CTC-912-26 (08/2026–), Computer Vision & Full-Stack Developer (2025), Offensive Security Researcher (2023–24), IT Lab Technician & Peer Mentor (2022–24).
- [x] **Education** block added under the timeline: Addis Ababa University (EiABC, UGR/5194/17) and Adama High School (ESSLCE 492/600).
- [x] Five projects that were missing from the site: ETHIO-CYBERGUARD, EVOLYX, MIRROR, PHANTOM and daily-git-digest.

### Credentials
- [x] Verified and published: **AI for Everyone: Master the Basics** (IBM · edX, 2026) and **Claude Code 101** (Claude Academy · Anthropic, 2026) — both with public verification links, in the site and the README.
- [x] The LinkedIn record is linked as the always-current full list, so newer credentials never make the site go stale.

## Next

- [ ] Add newer certificates to `CERTIFICATIONS` (`src/data/credentials.ts`) and the README table as they are earned.
- [ ] Optional: self-host the fonts to remove the Google Fonts request.
- [ ] Optional: mirror the expanded toolbox into the portfolio site's Skills section.
