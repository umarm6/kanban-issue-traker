import { create } from "zustand";

interface UndoUIState {
  isUndoVisible: boolean;
  lastActionLabel: string | null;
  undoTimeoutId: number | null;
  showUndo: (actionLabel: string) => void;
  hideUndo: () => void;
}

export const useUndoUIStore = create<UndoUIState>((set, get) => ({
  isUndoVisible: false,
  lastActionLabel: null,
  undoTimeoutId: null,
  showUndo: (actionLabel: string) => {
    if (get().undoTimeoutId) window.clearTimeout(get().undoTimeoutId!);
    const id = window.setTimeout(() => {
      set({ isUndoVisible: false, undoTimeoutId: null, lastActionLabel: null });
    }, 5000);
    set({ isUndoVisible: true, lastActionLabel: actionLabel, undoTimeoutId: id });
  },
  hideUndo: () => {
    if (get().undoTimeoutId) window.clearTimeout(get().undoTimeoutId!);
    set({ isUndoVisible: false, undoTimeoutId: null, lastActionLabel: null });
  },
}));
