const fs = require("fs");

const username = "Mr-Nobody-Anonymous";

// Metadata and fallback descriptions for repositories
const repoMetadata = {
    "Argus": {
        domain: "AI & Vision",
        desc: "SentinelSight AI Video Analytics Platform with intelligent stream processing"
    },
    "All-skills": {
        domain: "Agent OS",
        desc: "Universal Agent Skills Operating System: 14,850+ skills across 251 domains"
    },
    "arena-ai-android": {
        domain: "Mobile AI",
        desc: "Unofficial standalone Android client for Arena (arena.ai) LLM evaluations"
    },
    "plaq-os": {
        domain: "Quantum OS",
        desc: "Fault-Tolerant Quantum Resource Optimizer & Cross-Layer Execution Planner"
    },
    "Orion": {
        domain: "Security Intel",
        desc: "Institutional intelligence and architectural security analysis platform"
    },
    "ultrone": {
        domain: "Swarm AI",
        desc: "Self-evolving swarm intelligence controlling machines across operational domains"
    },
    "Cerberus": {
        domain: "Pentest Recon",
        desc: "Multi-vector security auditing & threat intelligence framework"
    },
    "civiclens": {
        domain: "Data Analytics",
        desc: "Civic monitoring and public dataset telemetry analysis platform"
    },
    "daily-git-digest": {
        domain: "DevOps Tooling",
        desc: "Autonomous daily Git commit audit & automated markdown digest generation"
    },
    "fkali": {
        domain: "Kali Linux",
        desc: "Automated Kali Linux penetration testing and recon toolkit"
    },
    "rc4": {
        domain: "Cryptography",
        desc: "Stream cipher implementation and statistical randomness security analysis"
    },
    "Capture-Writeup": {
        domain: "CTF Labs",
        desc: "Security CTF challenge write-ups and vulnerability walkthroughs"
    },
    "tryhackme-write-ups": {
        domain: "Penetration Testing",
        desc: "Hands-on penetration testing labs & TryHackMe walk-throughs"
    }
};

const langBadges = {
    "Python": "![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)",
    "Java": "![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white)",
    "JavaScript": "![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)",
    "TypeScript": "![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)",
    "Shell": "![Bash](https://img.shields.io/badge/Bash-121011?style=flat-square&logo=gnu-bash&logoColor=white)",
    "C++": "![C++](https://img.shields.io/badge/C++-00599C?style=flat-square&logo=c%2B%2B&logoColor=white)",
    "C": "![C](https://img.shields.io/badge/C-A8B9CC?style=flat-square&logo=c&logoColor=black)"
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
                // Recency bonus: active in last 7 days = +22, last 30 days = +14, last 90 days = +6
                const recencyBonus = daysSincePush <= 7 ? 22 : daysSincePush <= 30 ? 14 : daysSincePush <= 90 ? 6 : 0;

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

                const meta = repoMetadata[repo.name] || {};
                const desc =
                    (repo.description && repo.description.trim()) ||
                    meta.desc ||
                    "Cybersecurity & engineering system";
                const domain = meta.domain || "Engineering";
                const lang = repo.language || "N/A";
                const langBadge = langBadges[lang] || `\`${lang}\``;

                return {
                    name: repo.name,
                    url: repo.html_url,
                    domain,
                    desc,
                    lang,
                    langBadge,
                    stars,
                    forks,
                    score
                };
            })
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);

        // 1. Generate Interactive Pinned Cards (2 per row for balanced grid)
        const pinCards = [];
        for (let i = 0; i < ranked.length; i += 2) {
            const first = ranked[i];
            const second = ranked[i + 1];
            let rowHtml = `<p align="center">\n  <a href="${first.url}"><img src="https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${first.name}&hide_border=true&bg_color=0e1116&title_color=e9a268&text_color=ede8df&icon_color=e9a268" alt="${first.name}" /></a>`;
            if (second) {
                rowHtml += `\n  <a href="${second.url}"><img src="https://github-readme-stats.vercel.app/api/pin/?username=${username}&repo=${second.name}&hide_border=true&bg_color=0e1116&title_color=e9a268&text_color=ede8df&icon_color=e9a268" alt="${second.name}" /></a>`;
            }
            rowHtml += `\n</p>`;
            pinCards.push(rowHtml);
        }

        const output = `### ⚡ Auto-ranked, always current\n\n${pinCards.join("\n")}\n\n<p align="left"><sub>Ranked daily by <a href="./repos.js">repos.js</a> using stars, recent activity and codebase size.</sub></p>`;

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
        console.log("✅ README.md successfully updated with cool featured cards and repository directory.");
    } catch (err) {
        console.error("❌ Failed to update repositories:", err.message);
        process.exit(1);
    }
}

main();
