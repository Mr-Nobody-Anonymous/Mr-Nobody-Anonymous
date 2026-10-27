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
- [x] Rebuilt the stats block on canonical endpoints: profile stats, top languages, streak, 90-day activity graph, profile summary, repos-per-language, most-commit language, productive time (UTC+3), trophies, plus follower/star/repo/profile-view badges.
- [x] Added `cache_seconds=86400` to the two `github-readme-stats` cards — the usual cause of "Maximum retries exceeded" blanks.

### Credentials
- [x] Verified and published: **AI for Everyone: Master the Basics** (IBM · edX, 2026) and **Claude Code 101** (Claude Academy · Anthropic, 2026) — both with public verification links, in the site and the README.
- [x] The LinkedIn record is linked as the always-current full list, so newer credentials never make the site go stale.

## Next

- [ ] Add newer certificates to `CERTIFICATIONS` (`src/data/credentials.ts`) and the README table as they are earned.
- [ ] Optional: self-host the fonts to remove the Google Fonts request.
- [ ] Optional: mirror the expanded toolbox into the portfolio site's Skills section.
