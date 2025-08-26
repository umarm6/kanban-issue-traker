import { render, screen, fireEvent } from "@testing-library/react";
import DarkModeToggle from "../../../components/UI/DarkModeToggle";
import { useThemeStore } from "../../../state/useThemeStore";

beforeEach(() => {
  useThemeStore.setState({ isDarkMode: false });
});

test("toggles dark mode on click", () => {
  render(<DarkModeToggle />);
  const btn = screen.getByRole("button");
  expect(btn).toHaveTextContent(/light mode/i);

  fireEvent.click(btn);

  expect(useThemeStore.getState().isDarkMode).toBe(true);
  expect(btn).toHaveTextContent(/dark mode/i);
});
