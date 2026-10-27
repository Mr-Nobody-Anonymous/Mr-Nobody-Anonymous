# TODO — profile, README & portfolio

Working notes. Anything completed here is verified by a production build and a
render smoke test, not just by intent.

## Done

### README (profile repository)
- [x] Rebuilt the hierarchy: Hero → At a glance → About → Focus → Skills → Toolbox → Certifications → Repositories → Stats → Connect.
- [x] Fixed section order: **Socials no longer sits inside the Skills block**; contact links now live in one place (`Connect`).
- [x] Normalised every skill group (`💻 Languages`, `🌐 Frontend & Backend`, `🗄️ Databases`, `📊 Data Science & ML`, `📱 Mobile`, `🚀 DevOps, Platforms & Hardware`, `🛡️ Security`, `💻 Extra Languages & Shells`, `📚 Certifications & Hands-on Labs`) to consistent `###` headings with equal icon heights.
- [x] Removed duplicate links: one primary email row, one portfolio CTA pair (top + footer), one socials row.
- [x] Corrected broken/invalid links: GitLab URL (`www.gitlab.com` → `gitlab.com/bmx310712`), Discord "user link" replaced by the handle, Next.js moved out of *languages*, duplicate Dart/C# icons cleaned up.
- [x] Replaced the four redundant summary cards and the flaky trophy mirror with stats, top languages, streak and an activity graph in the site's palette.
- [x] Added the `<!-- TOP-REPOS:START/END -->` markers required by `repos.js` — the daily workflow previously failed because they were missing.
- [x] Re-themed the auto-generated repository cards to match the site.

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

### Credentials
- [x] Verified and published: **AI for Everyone: Master the Basics** (IBM · edX, 2026) and **Claude Code 101** (Claude Academy · Anthropic, 2026) — both with public verification links, in the site and the README.
- [x] The LinkedIn record is linked as the always-current full list, so newer credentials never make the site go stale.

## Next

- [ ] Add newer certificates to `CERTIFICATIONS` (`src/data/credentials.ts`) and the README table as they are earned.
- [ ] Optional: self-host the fonts to remove the Google Fonts request.
