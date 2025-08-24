export type IssueStatus = 'Backlog' | 'In Progress' | 'Done';
export type IssuePriority = 'low' | 'medium' | 'high';

export interface Issue {
  id: string;
  title: string;
  tags: string[];
  assignee: string;
  severity: number;
  userDefinedRank: number;
  createdAt: string; // ISO format
  status: IssueStatus;
}

export interface User {
  name: string;
  role: 'admin' | 'contributor';
}
