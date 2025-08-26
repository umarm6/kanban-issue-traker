import { useDraggable } from "@dnd-kit/core";
import { Issue } from "../../types/Issues.types";
import { Link } from "react-router-dom";
import IssueTags from "../UI/IssueTags";
import { currentUser } from "../../constants/currentUser";
 
export default function IssueCard({ issue }: {issue: Issue}) {
  const isAdmin = currentUser.role === "admin";
 
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issue.id, // unique draggable id
    data:issue,
    disabled: !isAdmin // only admin can drag
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    border: '1px solid #ccc',
    padding: '0.5rem',
    marginBottom: '0.5rem',
    backgroundColor: "white",
    borderRadius: '4px',
    cursor: "grab",
  };
 
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={`issue-card priority-${issue.priority}`}>
    <Link to={`/issue/${issue.id}`} className={`issues-title issues-title-priority ${issue.priority}`}>  
      <h3 className={ `m-l-5 m-0 `}> {issue.title} </h3> 
    </Link>  
      <p className="assignee">{issue.assignee}</p>
      <div className="tags-container">
        {IssueTags(issue.tags)}
      </div>
    </div>

  );
}
