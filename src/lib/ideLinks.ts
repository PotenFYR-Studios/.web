// One-click "open this repository in an AI-native IDE" deep links.
//
// URL patterns verified live (2026-10):
//   bolt.new      : https://bolt.new/github/{owner}/{repo}
//                   -> 302 to canonical https://bolt.new/~/github.com/{owner}/{repo}
//   vscode.dev    : https://vscode.dev/github/{owner}/{repo}
//   stackblitz.com: https://stackblitz.com/github/{owner}/{repo}
//
// Every generated link is derived from the repo's GitHub URL, so curated AND
// auto-discovered future repositories get the buttons for free.

export type IdeLinkId = 'bolt' | 'vscode' | 'stackblitz';

export interface IdeLink {
  id: IdeLinkId;
  label: string;
  title: string;
  href: string;
}

export interface ParsedRepo {
  owner: string;
  repo: string;
}

/**
 * Extract {owner, repo} from any common GitHub URL shape:
 *   https://github.com/owner/repo
 *   https://github.com/owner/repo.git
 *   https://www.github.com/owner/repo/tree/dev
 *   git@github.com:owner/repo.git
 *   owner/repo
 */
export function parseGitHubRepoUrl(input: string): ParsedRepo | null {
  if (!input) return null;
  const cleaned = input
    .trim()
    .replace(/^git\+/, '')
    .replace(/^git@github\.com:/i, 'https://github.com/')
    .replace(/^https?:\/\/(www\.)?github\.com\//i, '')
    .replace(/\.git$/i, '')
    .replace(/\/+$/, '');

  const segments = cleaned.split('/').filter(Boolean);
  if (segments.length < 2) return null;

  const [owner, repo] = segments;
  // Guard against pasted non-repo paths like /orgs/foo or /topics/x
  if (['orgs', 'topics', 'features', 'collections', 'settings'].includes(owner.toLowerCase())) {
    return null;
  }
  return { owner, repo };
}

/** bolt.new instant-import link (AI-native builder). */
export function buildBoltUrl(githubUrl: string): string | null {
  const parsed = parseGitHubRepoUrl(githubUrl);
  return parsed ? `https://bolt.new/github/${parsed.owner}/${parsed.repo}` : null;
}

/** vscode.dev web editor link. */
export function buildVscodeUrl(githubUrl: string): string | null {
  const parsed = parseGitHubRepoUrl(githubUrl);
  return parsed ? `https://vscode.dev/github/${parsed.owner}/${parsed.repo}` : null;
}

/** StackBlitz project runner link. */
export function buildStackblitzUrl(githubUrl: string): string | null {
  const parsed = parseGitHubRepoUrl(githubUrl);
  return parsed ? `https://stackblitz.com/github/${parsed.owner}/${parsed.repo}` : null;
}

/** All IDE deep links for a repository, ordered by relevance (AI-first). */
export function buildIdeLinks(githubUrl: string): IdeLink[] {
  const parsed = parseGitHubRepoUrl(githubUrl);
  if (!parsed) return [];
  const { owner, repo } = parsed;
  return [
    {
      id: 'bolt',
      label: 'Bolt',
      title: `Open ${owner}/${repo} in bolt.new (AI builder)`,
      href: `https://bolt.new/github/${owner}/${repo}`,
    },
    {
      id: 'vscode',
      label: 'VS Code',
      title: `Open ${owner}/${repo} in VS Code for Web`,
      href: `https://vscode.dev/github/${owner}/${repo}`,
    },
    {
      id: 'stackblitz',
      label: 'StackBlitz',
      title: `Run ${owner}/${repo} in StackBlitz`,
      href: `https://stackblitz.com/github/${owner}/${repo}`,
    },
  ];
}
