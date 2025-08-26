import { render, screen, fireEvent } from "@testing-library/react";
import IssueFilters from "../../../components/Filters/IssueFilters";

const defaultProps = {
  assignees: ["alice", "bob"],
  severities: [1, 2, 3],
  filters: { search: "", assignee: "", severity: null },
  onFiltersChange: jest.fn(),
};

test("renders inputs and calls on change", () => {
  render(<IssueFilters {...defaultProps} />);

  fireEvent.change(screen.getByPlaceholderText(/search/i), { target: { value: "bug" } });
  expect(defaultProps.onFiltersChange).toHaveBeenCalledWith(expect.objectContaining({ search: "bug" }));

  fireEvent.change(screen.getByDisplayValue("All Assignees"), { target: { value: "alice" } });
  expect(defaultProps.onFiltersChange).toHaveBeenCalledWith(expect.objectContaining({ assignee: "alice" }));
});
