/**
 * Centralized API Client for SCI-SA Gala
 * Handles all API calls with error mapping and authentication
 */

import { API_BASE_URL, getAuthHeaders } from '../config/api.js';

/**
 * Base fetch wrapper with error handling and authentication
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} - API response data
 */
async function apiCall(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...options.headers,
  };

  const config = {
    credentials: 'include', // TODO: Remove if using token-based auth
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle 401 Unauthorized
    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }

    // Handle other HTTP errors
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    // Return JSON response
    return await response.json();
  } catch (error) {
    if (error.message === 'UNAUTHORIZED') {
      throw error; // Re-throw auth errors
    }
    
    // Network or other errors
    console.error('API call failed:', error);
    throw new Error(error.message || 'Network error occurred');
  }
}

/**
 * GET request helper
 */
export const apiGet = (endpoint) => apiCall(endpoint, { method: 'GET' });

/**
 * POST request helper
 */
export const apiPost = (endpoint, data) => 
  apiCall(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });

/**
 * PUT request helper
 */
export const apiPut = (endpoint, data) => 
  apiCall(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

/**
 * DELETE request helper
 */
export const apiDelete = (endpoint) => 
  apiCall(endpoint, { method: 'DELETE' });

// Export the base apiCall function for custom use cases
export { apiCall };
