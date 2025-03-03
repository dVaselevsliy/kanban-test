export function getGitHubLink(link: string) {
  try {
    const repoPath = new URL(link).pathname.replace(/^\//, "");
    const url = `https://api.github.com/repos/${repoPath}/issues`

    return fetch(url, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
      },
    })
      .then(res => res.json())
      .catch(() => 'Link loading Error')
  } catch {
    return Promise.resolve({error: 'Invalid URL'})
  }
}