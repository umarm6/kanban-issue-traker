import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AppSettingsStore {
    pollingIntervalMs: number;
    setPollingInterval: (interval: number) => void;
}

export const useAppSettingsStore = create<AppSettingsStore>()(
  persist(
    (set) => ({
        pollingIntervalMs: 10000, // default 10 seconds
        setPollingInterval: (interval) => set({ pollingIntervalMs: interval }),
     }),
    { name: "app-settings", storage:createJSONStorage (() => localStorage)}
  )
);
