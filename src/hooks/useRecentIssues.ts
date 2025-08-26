import { useEffect, useState } from "react";
import { Issue } from "../types/Issues.types";

const STORAGE_KEY = "recentIssues";

export function useRecentIssues() {
  const [recentIssues, setRecentIssues] = useState<Issue[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setRecentIssues(JSON.parse(stored));
    }
  }, []);

  function addRecent(issue: Issue) {
    setRecentIssues(prev => {
      // Remove duplicates & add to front
      const filtered = prev.filter(i => i.id !== issue.id);
      const updated = [issue, ...filtered].slice(0, 5);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  return { recentIssues, addRecent };
}
