import { useThemeStore } from "../../state/useThemeStore";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();

  return (
    <button onClick={toggleDarkMode} aria-label="Toggle Dark Mode" style={{ marginLeft:'05px' }}>
      {isDarkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
}
