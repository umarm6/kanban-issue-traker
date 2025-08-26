import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Issue } from "../types/Issues.types";

export interface IssueStoreState {
  issues: Issue[];
  setIssues: (issues: Issue[]) => void;
  moveIssue: (id: string, status: Issue["status"]) => void;
  updatePriority: (id: string, newPriority: Issue["priority"]) => void;
  resolveIssue: (id: string) => void;
  undoStack: Issue[][];
  pushUndo: () => void;
  popUndo: () => void;
}

export const useIssueStore = create<IssueStoreState>()(
  persist(
    (set, get) => ({
      issues: [],
      setIssues: (issues) => set({ issues }),

      //drag and drop issue between columns
      moveIssue: (id: string, toStatus: Issue["status"]) => {
        get().pushUndo();
        set((state) => ({
          issues: state.issues.map((issue) =>
            issue.id === id ? { ...issue, status: toStatus } : issue
          ),
        }));
      },

      resolveIssue: (id) => {
        get().pushUndo();
        set((state) => ({
          issues: state.issues.map((issue) =>
            issue.id === id ? { ...issue, status: "Done" } : issue
          ),
        }));
      },

      updatePriority: (id:string, newPriority:Issue['priority']) =>
        set(state => ({
          issues: state.issues.map(issue =>
            issue.id === id ? { ...issue, priority: newPriority } : issue
          )
        })),
 
      undoStack: [],
      pushUndo: () =>
        set((state) => ({
          undoStack: [state.issues, ...state.undoStack].slice(0, 5),
        })),
      popUndo: () =>
        set((state) =>
          state.undoStack.length
            ? { issues: state.undoStack[0], undoStack: state.undoStack.slice(1) }
            : state
        ),
    }),
    {
      name: "issue-store", // Key name in localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        issues: state.issues,
        undoStack: state.undoStack,
      }),
    }
  )
);
