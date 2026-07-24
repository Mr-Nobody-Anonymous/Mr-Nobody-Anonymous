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
- [x] Create GitHub Actions workflow (`.github/workflows/update-repos.yml`) to auto-run `repos.js` every 24 hours

