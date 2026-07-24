const fs = require("fs");

const username = "Mr-Nobody-Anonymous";

async function main() {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    const repos = await res.json();

    const ranked = repos
        .filter(r => !r.fork)
        .map(repo => ({
            name: repo.name,
            url: repo.html_url,
            desc: repo.description || repo.name || "No description",
            lang: repo.language || "N/A",
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            size: repo.size,
            score:
                repo.stargazers_count * 10 +
                repo.forks_count * 5 +
                repo.watchers_count * 3 +
                (repo.open_issues_count || 0) * 2 +
                (repo.size / 1000)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 6);

    const header = "| # | Repository | Language | Stars | Forks | Description |";
    const separator = "|---|-----------|----------|-------|-------|-------------|";
    const rows = ranked
        .map(
            (r, i) =>
                `| ${i + 1} | [${r.name}](${r.url}) | ${r.lang} | ⭐ ${r.stars} | 🍴 ${r.forks} | ${r.desc} |`
        )
        .join("\n");

    const output = `### 🔥 Top Repositories\n\n${header}\n${separator}\n${rows}\n\n<sub>Auto-updated by [repos.js](./repos.js) — ranking based on stars, forks, activity & size.</sub>`;

    const readme = fs.readFileSync("README.md", "utf8");

    const newReadme = readme.replace(
        /<!-- TOP-REPOS:START -->[\s\S]*<!-- TOP-REPOS:END -->/,
        `<!-- TOP-REPOS:START -->\n${output}\n<!-- TOP-REPOS:END -->`
    );

    fs.writeFileSync("README.md", newReadme);
    console.log("✅ README.md updated with fresh repo rankings.");
}

main();

