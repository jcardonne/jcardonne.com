import "server-only";
import { GITHUB_USER } from "./site";

const API = "https://api.github.com";
const FLAGSHIP = "gitchef";
const REVALIDATE_SECONDS = 3600;

export type GithubStats = {
  live: boolean;
  commits: number;
  releases: number;
  latestVersion: string;
  latestReleaseAt: string;
  stars: number;
  repos: number;
  followers: number;
  languages: { name: string; share: number }[];
};

// Values read from the GitHub API on 2026-11-14, served when the API is unreachable.
const SNAPSHOT: GithubStats = {
  live: false,
  commits: 248,
  releases: 63,
  latestVersion: "v0.45.0",
  latestReleaseAt: "2026-11-02T09:51:18Z",
  stars: 12,
  repos: 19,
  followers: 28,
  languages: [
    { name: "TypeScript", share: 0.554 },
    { name: "Rust", share: 0.316 },
    { name: "CSS", share: 0.11 },
    { name: "JavaScript", share: 0.019 },
  ],
};

type Result<T> = { data: T; headers: Headers };

async function gh<T>(path: string): Promise<Result<T> | null> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(`${API}${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return { data: (await res.json()) as T, headers: res.headers };
  } catch {
    return null;
  }
}

/** Total item count of a `per_page=1` listing, read from the `Link` header. */
function countFromLink(result: Result<unknown[]> | null): number | null {
  if (!result) return null;
  const match = result.headers.get("link")?.match(/[?&]page=(\d+)>;\s*rel="last"/);
  if (match) return Number(match[1]);
  return result.data.length;
}

type User = { followers: number; public_repos: number };
type Repo = { fork: boolean; stargazers_count: number };
type Release = { tag_name: string; published_at: string };

export async function getGithubStats(): Promise<GithubStats> {
  const repoPath = `/repos/${GITHUB_USER}/${FLAGSHIP}`;
  const [user, repos, commits, releases, latest, languages] = await Promise.all([
    gh<User>(`/users/${GITHUB_USER}`),
    gh<Repo[]>(`/users/${GITHUB_USER}/repos?per_page=100`),
    gh<unknown[]>(`${repoPath}/commits?per_page=1`),
    gh<unknown[]>(`${repoPath}/releases?per_page=1`),
    gh<Release>(`${repoPath}/releases/latest`),
    gh<Record<string, number>>(`${repoPath}/languages`),
  ]);

  if (!user || !repos || !latest) return SNAPSHOT;

  const own = repos.data.filter((repo) => !repo.fork);
  const bytes = Object.entries(languages?.data ?? {});
  const totalBytes = bytes.reduce((sum, [, value]) => sum + value, 0);

  return {
    live: true,
    commits: countFromLink(commits) ?? SNAPSHOT.commits,
    releases: countFromLink(releases) ?? SNAPSHOT.releases,
    latestVersion: latest.data.tag_name,
    latestReleaseAt: latest.data.published_at,
    stars: own.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    repos: user.data.public_repos,
    followers: user.data.followers,
    languages:
      totalBytes > 0
        ? bytes
            .map(([name, value]) => ({ name, share: value / totalBytes }))
            .filter((language) => language.share >= 0.01)
            .slice(0, 4)
        : SNAPSHOT.languages,
  };
}
