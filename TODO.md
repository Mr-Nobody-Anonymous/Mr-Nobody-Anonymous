# TODO.md - Fix Repos, Badges, Stats & Profile Showcase

## Steps Completed

- [x] Analyze repo structure and diagnose non-displaying assets
- [x] Update `repos.js`:
  - Added language to output
  - Added custom fallback descriptions for `plaq-os`, `daily-git-digest`, `Cerberus`, `Orion`, `ultrone`, etc.
  - Enhanced recency scoring (last 7 days = +22, last 30 days = +14, last 90 days = +6)
  - Formatted output as clean markdown table
  - Ran `repos.js` to update top repositories
- [x] Fix non-displaying / broken badges & widgets in `README.md`:
  - Replaced broken trophies URL (`trophies.vercel.app` was returning an HTML game) with live, working endpoint `github-profile-trophy-nu.vercel.app`
  - Replaced failing GitHub Readme Stats cards (`github-readme-stats-sigma-five.vercel.app` was returning "Maximum retries exceeded") with the official working `github-readme-stats.vercel.app`
  - Replaced distorted squashed GitLab social badge with matching 32x32 round SVG icon
  - Fixed incomplete `⚡ && ⚡` title subtitle with sharp offensive security & AI architect titles
  - Upgraded header capsule banner with cyberpunk radical palette (`#141321`, `#00f0ff`, `#fe428e`)
  - Enhanced Certifications & Hands-on Labs section with TryHackMe, HackTheBox, and CTF focus badges
- [x] Harden GitHub Actions workflows:
  - Streamlined `.github/workflows/update-repos.yml` with path filtering, node 22, and safe conditional commit-push
  - Removed duplicate `.github/workflows/update-readme.yml` to avoid push collisions
  - Fixed `.github/workflows/npm-publish-github-packages.yml` working directory
- [x] Update portfolio website in `my_portfolio/`:
  - Added latest projects (`plaq-os` and `arena-ai-android`) to catalog and terminal
  - Verified full TypeScript compilation and Vite production build
  - Verified GitHub Pages live deployment assets
