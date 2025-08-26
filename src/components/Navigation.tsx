import { Link } from 'react-router-dom';
import { currentUser } from '../constants/currentUser';
import DarkModeToggle from './UI/DarkModeToggle';
export const Navigation = () => (
    <nav style={{ padding: '1rem', background: '#eee' }}>
        <Link to="/board" style={{ marginRight: '1rem' }}>Board</Link>
        <Link to="/settings">Settings</Link>
        <div style={{ float: 'right' }}>
            Logged as: <strong> {currentUser.role}</strong>
            <DarkModeToggle />
         </div>

    </nav>
);