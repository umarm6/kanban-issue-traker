import  { useState, useCallback, useMemo } from "react";
import Board from "../components/Board/Board";
import UndoToast from "../components/UI/UndoToast";
import { useIssueStore,IssueStoreState } from "../state/useIssueStore";
import { usePrioritySort } from "../hooks/usePrioritySort";
import { usePolling } from "../hooks/usePolling";
import { Issue } from "../types/Issues.types";
import RecentIssuesSidebar from "../components/Sidebar/RecentIssuesSidebar";
import { useRecentIssues } from "../hooks/useRecentIssues";
import { fetchIssuesFromMockAPI } from "../services/IssuesServices";
import ResetLocalStorage from "../components/UI/ResetLocalStorage";
import IssueFilters from "../components/Filters/IssueFilters";
import { useAppSettingsStore } from "../state/useAppSettingsStore";

export function BoardPage() {

  const issues = useIssueStore((state:IssueStoreState) => state.issues);
  const setIssues = useIssueStore((state:IssueStoreState) => state.setIssues);
  const pollingIntervalMs = useAppSettingsStore(state => state.pollingIntervalMs);
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { recentIssues } = useRecentIssues();
 
  const [filters, setFilters] = useState({
    search: "",
    assignee: "",
    severity: null as number | null,
  });

  // Async fetch issues (simulate API call) if not record exists in state/localStorage
  const fetchIssues = useCallback(async () => {
    
    if (issues.length > 0) {
      // Skip fetch if issues are already loaded from localStorage or state
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchIssuesFromMockAPI();
      setIssues(response);
    } catch (err) {
      setError("Failed to load issues");
    } finally {
      setIsLoading(false);
    }
  }, [issues.length, setIssues]);

   // Initial load & polling every 10 seconds
  const {countdownSeconds,lastSync} = usePolling(fetchIssues, pollingIntervalMs);
 
  // Filter issues based on search term (match title or tags)
  const assignees = useMemo(
    () => Array.from(new Set(issues.map((issue) => issue.assignee))),
    [issues]
  ); 

  const severities = [1, 2, 3];

  // Apply filters
  const filteredIssues = issues.filter((issue: Issue) => {
    const term = filters.search.toLowerCase();

    const matchesSearch =
      issue.title.toLowerCase().includes(term) ||
      issue.tags.some((tag) => tag.toLowerCase().includes(term));

    const matchesAssignee = filters.assignee
      ? issue.assignee === filters.assignee
      : true;
    const matchesSeverity =
      filters.severity !== null ? issue.severity === filters.severity : true;

    return matchesSearch && matchesAssignee && matchesSeverity;
  });

  // Sort issues with custom priority score
  const sortedIssues = usePrioritySort(filteredIssues);
  
  return (
    <main>
      <h1 style={{"display":"flex"}}>Issue Board </h1>

      <IssueFilters
        assignees={assignees}
        severities={severities}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <RecentIssuesSidebar recentIssues={recentIssues} />

      {isLoading && <p>Loading issues...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && !error && (
        <Board issues={sortedIssues} />
      )}
      
      <div className="justify-center">
       <div className="flex">
        <UndoToast />
        <ResetLocalStorage/> 
        </div> 
        <div className="flex">
          {lastSync && (
            <p style={{marginRight:"5px"}}>Last synced at: {lastSync.toLocaleTimeString()}</p>
          )}
          <p><small>(Next refresh in: {countdownSeconds} seconds)</small></p>

        </div>
      </div>
    </main>
  );
}
