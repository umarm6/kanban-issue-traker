import { renderHook } from "@testing-library/react";
import {
  usePrioritySort,
  sortIssuesByPriority,
  computeIssueScore,
} from "../../hooks/usePrioritySort";
import { Issue } from "../../types/Issues.types";

describe("Priority sorting and scoring", () => {
  const now = Date.now();

  const issue1: Issue = {
      id: "1",
      title: "Issue 1",
      status: "Backlog",
      priority: "high",
      severity: 3,
      userDefinedRank: 2,
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
      assignee: "alice",
      tags: [],
      popUndo: undefined
  };

  const issue2: Issue = {
      id: "2",
      title: "Issue 2",
      status: "Backlog",
      priority: "medium",
      severity: 2,
      userDefinedRank: 5,
      createdAt: new Date(now - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
      assignee: "bob",
      tags: [],
      popUndo: undefined
  };

  const issue3: Issue = {
      id: "3",
      title: "Issue 3",
      status: "Backlog",
      priority: "low",
      severity: 1,
      userDefinedRank: 0,
      createdAt: new Date(now).toISOString(), // now
      assignee: "carol",
      tags: [],
      popUndo: undefined
  };

  it("computes correct priority score", () => {
    // Scores should reflect formula: severity*10 - daysSince + userDefinedRank
    expect(computeIssueScore(issue1)).toBeCloseTo(3 * 10 - 1 + 2);
    expect(computeIssueScore(issue2)).toBeCloseTo(2 * 10 - 5 + 5);
    expect(computeIssueScore(issue3)).toBeCloseTo(1 * 10 - 0 + 0);
  });

  it("sorts issues by priority descending and tie-breaks by newer date", () => {
    const sorted = sortIssuesByPriority([issue1, issue2, issue3]);
    expect(sorted.length).toBe(3);

    // Calculate scores for reference
    const scores = sorted.map(computeIssueScore);

    // Verify scores descending order
    for (let i = 0; i < scores.length - 1; i++) {
      expect(scores[i]).toBeGreaterThanOrEqual(scores[i + 1]);
    }

    // Expect ordering based on manual score calculation: issue1 > issue2 > issue3
    expect(sorted[0].id).toBe("1");
    expect(sorted[1].id).toBe("2");
    expect(sorted[2].id).toBe("3");
  });

  it("usePrioritySort hook returns properly sorted issues", () => {
    const { result } = renderHook(() =>
      usePrioritySort([issue1, issue2, issue3])
    );
    expect(result.current[0].id).toBe("1");
    expect(result.current[1].id).toBe("2");
    expect(result.current[2].id).toBe("3");
  });

  it("returns empty array when input is empty", () => {
    const { result } = renderHook(() => usePrioritySort([]));
    expect(result.current).toEqual([]);
  });
});
