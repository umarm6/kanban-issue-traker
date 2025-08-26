import { useDroppable } from "@dnd-kit/core";
import IssueCard from "./IssueCard";
import { Issue } from "../../types/Issues.types";
import { currentUser } from "../../constants/currentUser";

type BoardColumnProps = {
  id: string; // droppable id, must match column key
  title: string;
  issues: Issue[];
};

export default function BoardColumn({ id, title, issues }: BoardColumnProps) {
  const isAdmin = currentUser.role === "admin";
  const { isOver, setNodeRef } = useDroppable({ id,disabled: !isAdmin });

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        padding: "1rem",
        border: "2px solid",
        borderColor: isOver ? "#4a90e2" : "#ccc",
        borderRadius: "4px",
        minHeight: "400px",
        backgroundColor: isOver ? "#e6f0ff" : "transparent",
        transition: "background-color 0.2s ease",
      }}
    >  
      <h2>{title} ({issues.length})</h2>
      {issues.map(issue => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
}
