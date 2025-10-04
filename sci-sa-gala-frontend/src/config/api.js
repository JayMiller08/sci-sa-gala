/**
 * API Configuration for SCI-SA Gala Frontend
 * 
 * TODO: Set API_BASE_URL in environment variables
 * TODO: Configure authentication method (cookies vs tokens)
 */

// TODO: Move to environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// TODO: If using token auth, add Authorization header here
export const getAuthHeaders = () => {
  // For cookie-based auth, credentials: 'include' is used in fetch calls
  // For token-based auth, uncomment and modify the following:
  // const token = localStorage.getItem('authToken');
  // return token ? { 'Authorization': `Bearer ${token}` } : {};
  return {};
};

// API Endpoints
export const ENDPOINTS = {
  SESSION_INFO: '/api/session-info',
  SELL_TICKET: '/sell-ticket',
  MY_SALES: '/my-sales',
  ADMIN_ALL_SALES: '/admin/all-sales',
  ADMIN_EVENTDAY_STATUS: '/admin/eventday-status',
  ADMIN_EVENTDAY_ENABLE: '/admin/eventday-enable',
  ADMIN_LOG_FAULT: '/admin/log-fault2',
  ADMIN_EVENTDAY_USED: '/admin/eventday-used',
};
