const fs = require("fs");

const username = "Mr-Nobody-Anonymous";

// Custom descriptions for repositories that don't have a GitHub description set yet
const fallbackDescriptions = {
    "Cerberus": "Multi-vector security auditing & threat intelligence framework",
    "Orion": "Institutional intelligence and architectural security platform",
    "ultrone": "Autonomous AI agent architecture and task execution framework",
    "fkali": "Automated Kali Linux penetration testing and recon toolkit",
    "Capture-Writeup": "Security CTF challenge write-ups and walkthroughs",
    "rc4": "Stream cipher implementation and cryptographic analysis",
    "civiclens": "Civic monitoring and data analysis platform",
    "All-skills": "Cybersecurity and technical skills reference repository",
    "tryhackme-write-ups": "Hands-on penetration testing labs & TryHackMe walk-throughs"
};

async function main() {
    try {
        const headers = {
            "User-Agent": "Mr-Nobody-Anonymous-Profile-Updater",
            "Accept": "application/vnd.github.v3+json"
        };

        if (process.env.GITHUB_TOKEN) {
            headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
        }

        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed&direction=desc`, {
            headers
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`GitHub API returned status ${res.status}: ${errText}`);
        }

        const repos = await res.json();

        if (!Array.isArray(repos)) {
            throw new Error(`Expected array of repositories, received: ${JSON.stringify(repos)}`);
        }

        // Filter out forks and the profile configuration repo itself
        const filtered = repos.filter(
            r => !r.fork && r.name.toLowerCase() !== username.toLowerCase()
        );

        const now = Date.now();
        const ranked = filtered
            .map(repo => {
                const pushedMs = repo.pushed_at ? new Date(repo.pushed_at).getTime() : 0;
                const daysSincePush = Math.max(0, (now - pushedMs) / (1000 * 60 * 60 * 24));
                // Recency bonus: active in last 30 days = +15, last 90 days = +8
                const recencyBonus = daysSincePush <= 30 ? 15 : daysSincePush <= 90 ? 8 : 0;

                const stars = repo.stargazers_count || 0;
                const forks = repo.forks_count || 0;
                const openIssues = repo.open_issues_count || 0;
                const sizeKb = repo.size || 0;

                const score =
                    stars * 10 +
                    forks * 5 +
                    openIssues * 2 +
                    Math.min(sizeKb / 500, 10) +
                    recencyBonus;

                const desc =
                    (repo.description && repo.description.trim()) ||
                    fallbackDescriptions[repo.name] ||
                    "Cybersecurity & development project";

                return {
                    name: repo.name,
                    url: repo.html_url,
                    desc,
                    lang: repo.language || "N/A",
                    stars,
                    forks,
                    score
                };
            })
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

        const readmePath = "README.md";
        const readme = fs.readFileSync(readmePath, "utf8");

        const markerRegex = /<!-- TOP-REPOS:START -->[\s\S]*<!-- TOP-REPOS:END -->/;
        if (!markerRegex.test(readme)) {
            throw new Error("Could not find <!-- TOP-REPOS:START --> and <!-- TOP-REPOS:END --> markers in README.md");
        }

        const newReadme = readme.replace(
            markerRegex,
            `<!-- TOP-REPOS:START -->\n${output}\n<!-- TOP-REPOS:END -->`
        );

        fs.writeFileSync(readmePath, newReadme, "utf8");
        console.log("✅ README.md successfully updated with top repository rankings.");
    } catch (err) {
        console.error("❌ Failed to update repositories:", err.message);
        process.exit(1);
    }
}

main();

