export type IssueStatus = 'Backlog' | 'In Progress' | 'Done';
export type IssuePriority = 'low' | 'medium' | 'high';

export interface Issue {
  popUndo: any;
  id: string;
  priority: IssuePriority;    
  title: string;
  tags: string[];
  assignee: string;
  severity: number;
  userDefinedRank: number;
  createdAt: string; // ISO format
  status: IssueStatus;
}