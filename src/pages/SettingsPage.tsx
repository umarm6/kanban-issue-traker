import { PollingIntervalSelector } from '../components/UI/PollingIntervalSelector';
import { currentUser } from '../constants/currentUser';
 
export const SettingsPage = () => {
    const isAdmin = currentUser.role === "admin";
    
    return <div style={{ padding: '1rem' }}>
    <h2 style={{textAlign:'center'}}>Settings Page</h2>
     <section>
        <div>
       { isAdmin ? 
        <div>
          <h3>Admin Settings</h3>
          <PollingIntervalSelector />
        </div>  
        : "admin only allowed to change settings.. !" }
        </div>
    </section>   
    </div>;
};