import React from "react";
import { Issue } from "../../types/Issues.types";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  recentIssues: Issue[];
};

export default function RecentIssuesSidebar({ recentIssues }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <aside style={{
      width: "235px",
      borderLeft: "1px solid #ddd",
      padding: "1rem",
      position: "fixed",
      top: "60px",
      right: 0,
      height: "calc(100vh - 60px)",
      backgroundColor: "#f9f9f9",
      overflowY: "auto"
    }}>
      <h3>Recently Accessed</h3>
      {recentIssues.length === 0 ? (
        <p>No recent issues</p>
    ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {recentIssues.map(issue => (
            <li key={issue.id+Math.floor(new Date(issue.createdAt).getTime() / 1000)} style={{ marginBottom: "0.5rem" }}>
               <button
                onClick={() => navigate(`/issue/${issue.id}`)}
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  color: "#007bff",
                  cursor: "pointer",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                {issue.title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
