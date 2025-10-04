/**
 * Grant Access Form Component for SCI-SA Gala
 * Handles ticket access granting during event day
 */

import { useState } from 'react';
import { validateTicketNumber, validateStudentNumber } from '../../../utils/validation.js';

/**
 * GrantAccessForm component
 * @param {Object} props - Component props
 * @param {Function} props.onTicketGranted - Callback for successful access grant
 * @param {Function} props.onError - Error callback
 * @returns {JSX.Element} - Grant access form component
 */
export default function GrantAccessForm({ onTicketGranted, onError }) {
  const [formData, setFormData] = useState({
    ticketNumber: '',
    studentNumber: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  /**
   * Handles input change
   * @param {Event} e - Input event
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  /**
   * Validates form data
   * @returns {boolean} - True if valid
   */
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.ticketNumber.trim()) {
      newErrors.ticketNumber = 'Ticket number is required';
    } else if (!validateTicketNumber(formData.ticketNumber)) {
      newErrors.ticketNumber = 'Ticket number must be M followed by 3 digits (e.g., M123)';
    }
    
    if (!formData.studentNumber.trim()) {
      newErrors.studentNumber = 'Student number is required';
    } else if (!validateStudentNumber(formData.studentNumber)) {
      newErrors.studentNumber = 'Student number must be exactly 9 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   * @param {Event} e - Form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // TODO: Replace with real API call
      // const response = await apiPost(ENDPOINTS.GRANT_ACCESS, formData);
      
      // Mock API response for testing
      const mockResponse = await mockGrantAccess(formData);
      
      if (mockResponse.success) {
        onTicketGranted({
          ticket_number: formData.ticketNumber,
          student_number: formData.studentNumber,
          executive_name: 'Event Staff',
          date: new Date().toISOString().split('T')[0],
          time: new Date().toLocaleTimeString(),
        });
        
        // Reset form
        setFormData({
          ticketNumber: '',
          studentNumber: '',
        });
      } else {
        onError(mockResponse.error || 'Failed to grant access');
      }
    } catch (error) {
      console.error('Access grant failed:', error);
      onError('Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Mock API function for testing
   * TODO: Remove when connecting to real backend
   * @param {Object} data - Form data
   * @returns {Promise<Object>} - Mock response
   */
  const mockGrantAccess = async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - reject M999 as invalid
    if (data.ticketNumber === 'M999') {
      return {
        success: false,
        error: 'Invalid ticket number',
      };
    }
    
    // Mock success for other tickets
    return { success: true };
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Grant Ticket Access
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ticket Number Input */}
        <div>
          <label 
            htmlFor="ticketNumber" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ticket Number
          </label>
          <input
            type="text"
            id="ticketNumber"
            name="ticketNumber"
            value={formData.ticketNumber}
            onChange={handleInputChange}
            placeholder="M123"
            className={`form-input ${errors.ticketNumber ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            aria-describedby={errors.ticketNumber ? 'ticketNumber-error' : undefined}
            aria-invalid={errors.ticketNumber ? 'true' : 'false'}
          />
          {errors.ticketNumber && (
            <p id="ticketNumber-error" className="form-error">
              {errors.ticketNumber}
            </p>
          )}
        </div>

        {/* Student Number Input */}
        <div>
          <label 
            htmlFor="studentNumber" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Student Number
          </label>
          <input
            type="text"
            id="studentNumber"
            name="studentNumber"
            value={formData.studentNumber}
            onChange={handleInputChange}
            placeholder="123456789"
            className={`form-input ${errors.studentNumber ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
            aria-describedby={errors.studentNumber ? 'studentNumber-error' : undefined}
            aria-invalid={errors.studentNumber ? 'true' : 'false'}
          />
          {errors.studentNumber && (
            <p id="studentNumber-error" className="form-error">
              {errors.studentNumber}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Granting Access...' : 'Grant Access'}
        </button>
      </form>
      
      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-900 mb-2">
          Instructions
        </h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Verify ticket number format (M followed by 3 digits)</li>
          <li>• Confirm student number matches the ticket holder</li>
          <li>• Grant access only to valid, unused tickets</li>
          <li>• Report any issues to the admin panel</li>
        </ul>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        <p>TODO: Connect to real backend API</p>
        <p>TODO: Add ticket validation against sales database</p>
        <p>TODO: Implement access logging and audit trail</p>
      </div>
    </div>
  );
}
