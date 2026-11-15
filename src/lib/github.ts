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
  repos: number;
};

// Values read from the GitHub API on 2026-11-14, served when the API is unreachable.
const SNAPSHOT: GithubStats = {
  live: false,
  commits: 248,
  releases: 63,
  latestVersion: "v0.45.0",
  repos: 19,
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

type User = { public_repos: number };
type Release = { tag_name: string };

export async function getGithubStats(): Promise<GithubStats> {
  const repoPath = `/repos/${GITHUB_USER}/${FLAGSHIP}`;
  const [user, commits, releases, latest] = await Promise.all([
    gh<User>(`/users/${GITHUB_USER}`),
    gh<unknown[]>(`${repoPath}/commits?per_page=1`),
    gh<unknown[]>(`${repoPath}/releases?per_page=1`),
    gh<Release>(`${repoPath}/releases/latest`),
  ]);

  if (!user || !latest) return SNAPSHOT;

  return {
    live: true,
    commits: countFromLink(commits) ?? SNAPSHOT.commits,
    releases: countFromLink(releases) ?? SNAPSHOT.releases,
    latestVersion: latest.data.tag_name,
    repos: user.data.public_repos,
  };
}
