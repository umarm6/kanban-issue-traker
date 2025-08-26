import React from "react";

export type IssueFiltersProps = {
  assignees: string[];               // List of assignees to pick from
  severities: number[];              // List of severities (e.g. [1,2,3])
  filters: {
    search: string;
    assignee: string;
    severity: number | null;
  };
  onFiltersChange: (newFilters: {
    search: string;
    assignee: string;
    severity: number | null;
  }) => void;
};

export default function IssueFilters({
  assignees,
  severities,
  filters,
  onFiltersChange,
}: IssueFiltersProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({ ...filters, search: e.target.value });
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, assignee: e.target.value });
  };

  const handleSeverityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    onFiltersChange({ ...filters, severity: val ? Number(val) : null });
  };

  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
     
     <label><p>Search</p>
        <input
            type="search"
            placeholder="Search title or tags"
            value={filters.search}
            onChange={handleSearchChange}
            style={{width:"200px", padding: "0.5rem" }}
        />
    </label>
    <label> <p>Assignee </p>
        <select value={filters.assignee} onChange={handleAssigneeChange}>
            <option value="">All Assignees</option>
            {assignees.map((assignee) => (
            <option key={assignee} value={assignee}>
                {assignee}
            </option>
            ))}
        </select>
    </label>
    <label>
       <p>Severities</p> 
      <select
        value={filters.severity ?? ""}
        onChange={handleSeverityChange}
      >
        <option value="">All Severities</option>
        {severities.map((severity) => (
          <option key={severity} value={severity}>
            {severity === 1
              ? "Low (1)"
              : severity === 2
              ? "Medium (2)"
              : "High (3)"}
          </option>
        ))}
      </select>
      </label>
    </div>
  );
}
