# TODO.md - Fix Repos/Trophies Section

## Steps

- [x] Analyze repo structure and understand the issue
- [x] Update `repos.js`:
  - Add language to output
  - Better description fallback (use name if empty)
  - Better scoring (include size, open_issues_count when stars=0)
  - Format output as a markdown table
- [x] Update `README.md`:
  - Remove the outdated static table ("My repositories / work")
  - Keep `<!-- TOP-REPOS:START -->` / `<!-- TOP-REPOS:END -->` markers intact
- [x] Run `repos.js` to regenerate the README with proper content
- [x] Configure and fix GitHub Actions workflow (`.github/workflows/update-repos.yml`) to auto-run `repos.js` every 24h at 06:00 UTC with `contents: write` permissions and `GITHUB_TOKEN` auth
- [x] Keep Node.js Package release publishing workflow (`.github/workflows/npm-publish-github-packages.yml`)
- [x] Fix broken trophies badge (402 Payment Required) and GitHub readme stats (503 Service Unavailable) with working endpoints
- [x] Exclude profile repository from portfolio showcase and add recency bonus & custom fallback descriptions in `repos.js`
- [x] Build and audit standalone cybersecurity portfolio website in `my_portfolio/`
  - Accessible Matrix digital rain with reduced-motion support and toggle
  - Secure, XSS-sanitized interactive cyber terminal CLI
  - Real verified project showcases with direct GitHub repository links
  - Genuine CTF and lab platform credentials (TryHackMe & HackTheBox)
  - Custom SVG favicon, 404 page, and `.nojekyll` for GitHub Pages
  - GitHub Pages deployment workflow (`.github/workflows/deploy-portfolio.yml`)


