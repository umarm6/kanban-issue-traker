import { Issue } from "../types/Issues.types";
import { mockFetchIssues } from "../utils/api";

// Simulated async fetch function with 500ms delay
export async function fetchIssuesFromMockAPI(): Promise<Issue[]> {
  try {
    const issues = await mockFetchIssues();
    return issues as Issue[];
  } catch (error) {
    console.error(error);
    return [];
  }
}