/**
 * Sell Ticket Form Component for SCI-SA Gala
 * Handles ticket sales with validation and duplicate detection
 */

import { useState } from 'react';
import { validateSellTicketForm } from '../../../utils/validation.js';

/**
 * SellTicketForm component
 * @param {Object} props - Component props
 * @param {Function} props.onTicketSold - Callback for successful ticket sale
 * @param {Function} props.onDuplicateTicket - Callback for duplicate ticket detection
 * @param {Function} props.onError - Error callback
 * @returns {JSX.Element} - Sell ticket form component
 */
export default function SellTicketForm({ onTicketSold, onDuplicateTicket, onError }) {
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
   * Handles form submission
   * @param {Event} e - Form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateSellTicketForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // TODO: Replace with real API call
      // const response = await apiPost(ENDPOINTS.SELL_TICKET, formData);
      
      // Mock API response for testing
      const mockResponse = await mockSellTicket(formData);
      
      if (mockResponse.success) {
        onTicketSold({
          ticket_number: formData.ticketNumber,
          buyer_student_number: formData.studentNumber,
          date: new Date().toISOString().split('T')[0],
          executive_name: 'Current User',
        });
        
        // Reset form
        setFormData({
          ticketNumber: '',
          studentNumber: '',
        });
      } else if (mockResponse.duplicate) {
        onDuplicateTicket(mockResponse);
      } else {
        onError(mockResponse.error || 'Failed to sell ticket');
      }
    } catch (error) {
      console.error('Ticket sale failed:', error);
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
  const mockSellTicket = async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock duplicate detection for M001
    if (data.ticketNumber === 'M001') {
      return {
        duplicate: true,
        tickets: [
          {
            ticket_number: 'M001',
            buyer_student_number: '123456789',
            date: '2024-01-15',
          },
        ],
        duplicateId: 'dup_123',
      };
    }
    
    // Mock success for other tickets
    return { success: true };
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Sell Ticket
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
          {loading ? 'Selling...' : 'Sell Ticket'}
        </button>
      </form>
      
      <div className="mt-6 text-xs text-gray-500">
        <p>TODO: Connect to real backend API</p>
        <p>TODO: Add environment variables for API configuration</p>
      </div>
    </div>
  );
}
