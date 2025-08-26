import { act } from "@testing-library/react";
import { useIssueStore } from "../../state/useIssueStore"; // adjust path as needed
import { Issue } from "../../types/Issues.types";

describe("Issue store", () => {
  beforeEach(() => {
    // Reset Zustand store state before each test for isolation
    useIssueStore.setState({ issues: [], undoStack: [] });
  });

  it("sets issues and updates status correctly", () => {
    const initialIssues: Issue[] = [
      {
          id: "1", title: "Test Issue", status: "Backlog", priority: "high", severity: 3, userDefinedRank: 0, createdAt: new Date().toISOString(), assignee: "alice", tags: ["test"],
          popUndo: undefined
      },
    ];

    // Set initial issues
    act(() => {
      useIssueStore.getState().setIssues(initialIssues);
    });

    expect(useIssueStore.getState().issues).toHaveLength(1);
    expect(useIssueStore.getState().issues[0].status).toBe("Backlog");

    // Update issue status to "Done" using resolveIssue
    act(() => {
      useIssueStore.getState().resolveIssue("1");
    });

    expect(useIssueStore.getState().issues[0].status).toBe("Done");

    // Undo the last change and verify status reverts
    act(() => {
      useIssueStore.getState().popUndo();
    });

    expect(useIssueStore.getState().issues[0].status).toBe("Backlog");
  });
});
 