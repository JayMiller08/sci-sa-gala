/**
 * Session management hook for SCI-SA Gala
 * Handles user authentication state and role-based access
 */

import { useState, useEffect } from 'react';
import { apiGet } from '../api/client.js';
import { ENDPOINTS } from '../config/api.js';
import { MOCK_MODE, mockApiResponses, mockApiDelay } from '../services/mockData.js';

/**
 * Custom hook for managing user session
 * @returns {Object} Session state and loading status
 */
export const useSession = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fetches session information from the server
   */
  const fetchSession = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let sessionData;
      
      if (MOCK_MODE) {
        // Use mock data for development
        await mockApiDelay();
        sessionData = mockApiResponses.sessionInfo();
      } else {
        // Use real API call
        sessionData = await apiGet(ENDPOINTS.SESSION_INFO);
      }
      
      setSession(sessionData);
    } catch (error) {
      console.error('Session fetch failed:', error);
      
      if (error.message === 'UNAUTHORIZED') {
        setSession(null);
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Clears the current session (logout)
   */
  const clearSession = () => {
    setSession(null);
    setError(null);
  };

  /**
   * Checks if user has admin role
   */
  const isAdmin = () => {
    return session?.role === 'ADMIN';
  };

  /**
   * Checks if user has executive role
   */
  const isExecutive = () => {
    return session?.role === 'EXEC';
  };

  /**
   * Checks if user is authenticated
   */
  const isAuthenticated = () => {
    return session !== null && session !== undefined;
  };

  // Fetch session on component mount
  useEffect(() => {
    fetchSession();
  }, []);

  return {
    session,
    loading,
    error,
    isAdmin,
    isExecutive,
    isAuthenticated,
    fetchSession,
    clearSession,
  };
};
