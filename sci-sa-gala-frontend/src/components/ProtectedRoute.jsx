/**
 * Protected Route Component for SCI-SA Gala
 * Handles route protection based on user roles and authentication
 */

import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute component for role-based access control
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @param {boolean} props.requireAuth - Whether authentication is required
 * @param {string} props.requireRole - Required role ('ADMIN' or 'EXEC')
 * @param {Object} props.session - User session data
 * @param {boolean} props.loading - Loading state
 * @returns {JSX.Element} - Protected route component
 */
export default function ProtectedRoute({ 
  children, 
  requireAuth = true, 
  requireRole = null, 
  session, 
  loading 
}) {
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !session) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to dashboard if user is authenticated but trying to access login
  if (!requireAuth && session) {
    return <Navigate to={session.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />;
  }

  // Check role-based access
  if (requireRole && session?.role !== requireRole) {
    // Redirect to appropriate dashboard based on user's actual role
    return <Navigate to={session?.role === 'ADMIN' ? '/admin' : '/dashboard'} replace />;
  }

  // Render protected content
  return children;
}
