/**
 * Application Routes for SCI-SA Gala
 * Defines all routes with protection and role-based access
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ExecutiveDashboard from './pages/Dashboard/ExecutiveDashboard.jsx';
import AdminPanel from './pages/Admin/AdminPanel.jsx';
import EventDay from './pages/EventDay/EventDay.jsx';
import Login from './pages/Login.jsx';
import NotFound from './pages/NotFound.jsx';

/**
 * AppRoutes component with protected routing
 * @param {Object} props - Component props
 * @param {Object} props.session - User session data
 * @param {boolean} props.loading - Loading state
 * @returns {JSX.Element} - Routes component
 */
export default function AppRoutes({ session, loading }) {
  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={
          <ProtectedRoute requireAuth={false} session={session} loading={loading}>
            <Login />
          </ProtectedRoute>
        } 
      />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute requireAuth={true} session={session} loading={loading}>
            <ExecutiveDashboard />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/admin" 
        element={
          <ProtectedRoute 
            requireAuth={true} 
            requireRole="ADMIN" 
            session={session} 
            loading={loading}
          >
            <AdminPanel />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/event-day" 
        element={
          <ProtectedRoute requireAuth={true} session={session} loading={loading}>
            <EventDay />
          </ProtectedRoute>
        } 
      />

      {/* Default Routes */}
      <Route 
        path="/" 
        element={
          <Navigate 
            to={session?.role === 'ADMIN' ? '/admin' : '/dashboard'} 
            replace 
          />
        } 
      />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
