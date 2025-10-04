/**
 * Main App Component for SCI-SA Gala
 * Entry point for the React application
 */

import { BrowserRouter } from 'react-router-dom';
import { useSession } from './hooks/useSession.js';
import NavBar from './components/NavBar.jsx';
import AppRoutes from './AppRoutes.jsx';
import './styles/tailwind.css';

/**
 * Main App component
 * @returns {JSX.Element} - App component
 */
function App() {
  const { session, loading, clearSession } = useSession();

  /**
   * Handles user logout
   */
  const handleLogout = () => {
    clearSession();
    // TODO: Call logout API endpoint
    // TODO: Clear any stored tokens or cookies
    window.location.href = '/login';
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        {session && (
          <NavBar 
            session={session} 
            onLogout={handleLogout}
          />
        )}
        
        {/* Main Content */}
        <AppRoutes 
          session={session} 
          loading={loading}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
