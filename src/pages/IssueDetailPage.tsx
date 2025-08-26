import { useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { currentUser } from "../constants/currentUser";
  import IssueTags from "../components/UI/IssueTags";
import { useRecentIssues } from "../hooks/useRecentIssues";
import { useIssueStore } from "../state/useIssueStore";
import { Issue } from "../types/Issues.types";

export  function IssueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addRecent } = useRecentIssues();
  
  const issue = useIssueStore(state => state.issues.find(i => i.id === id));
 
  const navigate = useNavigate();
 
  useEffect(() => {
    if (issue) addRecent(issue);
  }, [issue]);

  const markAsResolved = useIssueStore(state => state.resolveIssue);
  const updatePriority = useIssueStore(state => state.updatePriority);
 
  if (!issue) return <p>Issue not found</p>;

  function handleResolve() {
    if (!issue) return;
    markAsResolved(issue.id);
    navigate("/board");
  }

  function handlePriorityChange(id: string, priority: Issue["priority"]) {
      updatePriority(id, priority);
   }

  return (
    <main>
      <section className="align-center">
      <p><strong>ID:</strong> {issue.id}</p>
      <p><strong>Title:</strong> {issue.title}</p>
      <p><strong>Assignee:</strong> {issue.assignee}</p>
      <p><strong>Priority:</strong> {issue.priority}</p>
      <p><strong>Severity:</strong> {issue.severity}</p>

      <p><strong>Status:</strong> {issue.status}</p>
      <p><strong>Tags:</strong>   {IssueTags(issue.tags)} </p>
      <p><strong>Created At:</strong> {new Date(issue.createdAt).toLocaleString()}</p>

    
      <p><strong>Priority:</strong>
          {currentUser.role === "admin" ?  <select
          value={issue.priority}
          onChange={(e) => handlePriorityChange(issue.id, e.target.value as Issue["priority"])}
        >
          <option value="low" >Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select> : issue.priority}
      </p>


      {currentUser.role === "admin" && issue.status !== "Done" && (
        <button onClick={handleResolve} className="success-btn">Mark as Resolved</button>
      )}


      </section>
    </main>
  );
}
