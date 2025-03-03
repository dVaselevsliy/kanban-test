export async function getGitHubLink(link: string) {
  try {
    const repoPath = new URL(link).pathname.replace(/^\//, "");
    const url = `https://api.github.com/repos/${repoPath}/issues`;

    const response = await fetch(url, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      return { error: `GitHub API error: ${response.status} ${response.statusText}` };
    }

    return await response.json();
  } catch {
    return { error: "Invalid URL or network error" };
  }
}
