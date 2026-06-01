<h2>🚀 My Repositories / Work</h2>
<p>Top 5 repositories ranked automatically by popularity.</p>

<div id="repo-list">Loading repositories...</div>

<script>
async function loadTopRepos() {
    const username = "Mr-Nobody-Anonymous";

    const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`
    );

    const repos = await response.json();

    const ranked = repos
        .filter(repo => !repo.fork)
        .map(repo => ({
            ...repo,
            score:
                repo.stargazers_count * 10 +
                repo.watchers_count * 5 +
                repo.forks_count * 3 +
                (repo.size / 1000)
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

    document.getElementById("repo-list").innerHTML =
        ranked.map((repo, index) => `
            <div>
                <h3>
                    #${index + 1}
                    <a href="${repo.html_url}" target="_blank">
                        ${repo.name}
                    </a>
                </h3>

                <p>${repo.description || "No description available."}</p>

                <p>
                    ⭐ ${repo.stargazers_count}
                    | 👀 ${repo.watchers_count}
                    | 🍴 ${repo.forks_count}
                    | 📦 ${repo.size} KB
                </p>
            </div>
        `).join("");
}

loadTopRepos();
</script>
