/**
 * Navigation Bar Component for SCI-SA Gala
 * Renders different navigation links based on user role
 */

import { Link, useLocation } from 'react-router-dom';

/**
 * NavBar component with role-based navigation
 * @param {Object} props - Component props
 * @param {Object} props.session - User session data
 * @param {Function} props.onLogout - Logout handler
 */
export default function NavBar({ session, onLogout }) {
  const location = useLocation();

  /**
   * Checks if a navigation item is active
   * @param {string} path - Path to check
   * @returns {boolean} - True if active
   */
  const isActive = (path) => {
    return location.pathname === path;
  };

  /**
   * Renders navigation link
   * @param {string} to - Link destination
   * @param {string} label - Link label
   * @param {boolean} adminOnly - Whether link is admin-only
   * @returns {JSX.Element} - Navigation link
   */
  const NavLink = ({ to, label, adminOnly = false }) => {
    if (adminOnly && session?.role !== 'ADMIN') {
      return null;
    }

    return (
      <Link
        to={to}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
          isActive(to)
            ? 'bg-primary-100 text-primary-700'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
        }`}
      >
        {label}
      </Link>
    );
  };

  if (!session) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link
              to={session.role === 'ADMIN' ? '/admin' : '/dashboard'}
              className="text-xl font-bold text-primary-900"
            >
              SCI-SA Gala
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/admin" label="Admin Panel" adminOnly={true} />
            <NavLink to="/event-day" label="Event Day" />
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">{session.name}</span>
              <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                {session.role}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md p-2"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200 py-4">
          <div className="flex flex-col space-y-2">
            <NavLink to="/dashboard" label="Dashboard" />
            <NavLink to="/admin" label="Admin Panel" adminOnly={true} />
            <NavLink to="/event-day" label="Event Day" />
          </div>
        </div>
      </div>
    </nav>
  );
}
