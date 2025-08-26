import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ThemeStore {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      isDarkMode: false, // default light mode
      toggleDarkMode: () => set(state => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "theme-storage",
      storage:createJSONStorage(() => localStorage),
    }
  )
);
