const fs = require("fs");

const username = "Mr-Nobody-Anonymous";

async function main() {
    try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
        if (!res.ok) {
            throw new Error(`GitHub API request failed with status ${res.status}`);
        }

        const repos = await res.json();

        const ranked = repos
            .filter((repo) => !repo.fork)
            .map((repo) => ({
                name: repo.name,
                url: repo.html_url,
                desc: repo.description || "No description",
                score: repo.stargazers_count + repo.forks_count,
            }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);

        const output = ranked
            .map(
                (repo, index) => `
${index + 1}. **[${repo.name}](${repo.url})**
   - ${repo.desc}
   - ⭐ ${repo.score}
`
            )
            .join("\n");

        const readme = fs.readFileSync("README.md", "utf8");

        const newReadme = readme.replace(
            /<!-- TOP-REPOS:START -->[\s\S]*<!-- TOP-REPOS:END -->/,
            `<!-- TOP-REPOS:START -->\n${output}\n<!-- TOP-REPOS:END -->`
        );

        fs.writeFileSync("README.md", newReadme);
    } catch (error) {
        console.error(`Failed to update top repositories: ${error.message}`);
        process.exitCode = 1;
    }
}

main();
