import { useCallback, useState } from "react";
import { fetchIssuesFromMockAPI } from "../../services/IssuesServices";
import { useIssueStore,IssueStoreState } from "../../state/useIssueStore";
 

export default function ResetLocalStorage() {
  const setIssues = useIssueStore((state:IssueStoreState) => state.setIssues);
  const [error, setError] = useState<string | null>(null);


  const fetchIssues = useCallback(async () => {
    try {
      setError(null);
      const response = await fetchIssuesFromMockAPI();
      setIssues(response);
    } catch (err) {
      setError("Failed to load issues");
    } 
  },[]);
  

   return (
    <div className="reset-storage">
      <button className="btn btn-primary" onClick={fetchIssues}>Clear LocalStorage</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
