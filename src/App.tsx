import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { BoardPage } from './pages/BoardPage';
import { IssueDetailPage } from './pages/IssueDetailPage';
import { SettingsPage } from './pages/SettingsPage';
import { Navigation } from './components/Navigation';
import { useThemeStore } from './state/useThemeStore';
import { useEffect } from 'react';

export const App = () => {
  
    const isDarkMode = useThemeStore(state => state.isDarkMode);

    useEffect(() => {
    const className = "dark-mode";
    if (isDarkMode) {
      document.body.classList.add(className);
    } else {
      document.body.classList.remove(className);
    }
  }, [isDarkMode]);

  return (
      <Router>
        <Navigation />
        <Routes>
          <Route path="/board" element={<BoardPage />} />
          <Route path="/issue/:id" element={<IssueDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/board" />} />
        </Routes>
      </Router>
  );
}