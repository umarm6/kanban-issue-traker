import { Issue } from '../types/Issues.types';

export const mockFetchIssues = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            import('../data/issues.json').then(module => resolve(module.default));
        }, 500);
    });
};

/**
 * Simulates fetching a single issue by ID from JSON data with network delay.
 * Returns the Issue object or null if not found.
 */
export async function fetchIssueById(id: string): Promise<Issue | null> {
  await new Promise(resolve => setTimeout(resolve, 300)); // Simulate latency

  try {
    const module = await import("../data/issues.json");
    
    const issues: Issue[] = module.default.map((issue: any) => ({
      ...issue,
      popUndo: issue.popUndo ?? false,
      userDefinedRank: issue.userDefinedRank ?? 0
    }));

    const issue = issues.find(issue => issue.id === id);
    return issue || null;
  } catch (error) {
    console.error("Error fetching issue by ID:", error);
    return null;
  }
}

export const mockUpdateIssue = (issueId: string, updates: any) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() < 0.9) {
                resolve({id: issueId, ...updates});
            } else {
                reject(new Error('Failed to update issue'));
            }
        }, 500);
    });
};
