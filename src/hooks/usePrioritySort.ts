import { useMemo } from "react";
import { Issue } from "../types/Issues.types";

function daysSince(createdAt: string): number {
  const created = new Date(createdAt).getTime();
  const now = Date.now();
  return Math.floor((now - created) / (1000 * 60 * 60 * 24));
}

export function computeIssueScore(issue: Issue): number {
  return (
    issue.severity * 10 +
    -daysSince(issue.createdAt) +
    issue.userDefinedRank
  );
}

/**
 * Sorts issues descending by:
 *  1. priority score (higher first)
 *  2. newer createdAt if tie
 */
export function sortIssuesByPriority(issues: Issue[]): Issue[] {
  return [...issues].sort((a, b) => {
    const scoreA = computeIssueScore(a);
    const scoreB = computeIssueScore(b);
    if (scoreA !== scoreB) {
      return scoreB - scoreA;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export function usePrioritySort(issues: Issue[]): Issue[] {
  return useMemo(() => sortIssuesByPriority(issues), [issues]);
}
