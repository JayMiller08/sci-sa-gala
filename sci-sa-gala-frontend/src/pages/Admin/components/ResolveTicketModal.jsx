/**
 * Resolve Ticket Modal for SCI-SA Gala
 * Handles ticket issue resolution for admin users
 */

import { useState } from 'react';

/**
 * ResolveTicketModal component
 * @param {Object} props - Component props
 * @param {Object} props.ticketData - Ticket data to resolve
 * @param {Function} props.onConfirm - Confirmation callback
 * @param {Function} props.onCancel - Cancellation callback
 * @returns {JSX.Element} - Resolve ticket modal component
 */
export default function ResolveTicketModal({ ticketData, onConfirm, onCancel }) {
  const [formData, setFormData] = useState({
    type: '',
    reporter: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

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
    
    if (!formData.type.trim()) {
      newErrors.type = 'Issue type is required';
    }
    
    if (!formData.reporter.trim()) {
      newErrors.reporter = 'Reporter name is required';
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

    try {
      const resolveData = {
        ticket: ticketData.ticket_number,
        buyer: ticketData.buyer_student_number,
        type: formData.type,
        reporter: formData.reporter,
        notes: formData.notes,
      };

      if (onConfirm) {
        onConfirm(resolveData);
      }
    } catch (error) {
      console.error('Failed to resolve ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles modal backdrop click
   * @param {Event} e - Click event
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  /**
   * Handles escape key press
   * @param {Event} e - Keyboard event
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  /**
   * Formats date for display
   * @param {string} dateString - Date string
   * @returns {string} - Formatted date
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-2xl bg-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 id="modal-title" className="text-lg font-semibold text-gray-900">
            Resolve Ticket Issue
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Ticket Information */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-gray-900 mb-3">
            Ticket Information
          </h4>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium text-gray-700">Ticket:</span>
              <span className="ml-2 text-gray-900">{ticketData.ticket_number}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Student:</span>
              <span className="ml-2 text-gray-900">{ticketData.buyer_student_number}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Executive:</span>
              <span className="ml-2 text-gray-900">{ticketData.executive_name}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Date:</span>
              <span className="ml-2 text-gray-900">{formatDate(ticketData.date)}</span>
            </div>
          </div>
        </div>

        {/* Resolution Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Issue Type */}
          <div>
            <label 
              htmlFor="type" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Issue Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className={`form-input ${errors.type ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
              aria-describedby={errors.type ? 'type-error' : undefined}
              aria-invalid={errors.type ? 'true' : 'false'}
            >
              <option value="">Select issue type</option>
              <option value="duplicate">Duplicate Ticket</option>
              <option value="invalid">Invalid Student Number</option>
              <option value="fraud">Suspected Fraud</option>
              <option value="refund">Refund Request</option>
              <option value="other">Other</option>
            </select>
            {errors.type && (
              <p id="type-error" className="form-error">
                {errors.type}
              </p>
            )}
          </div>

          {/* Reporter */}
          <div>
            <label 
              htmlFor="reporter" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Reporter Name *
            </label>
            <input
              type="text"
              id="reporter"
              name="reporter"
              value={formData.reporter}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className={`form-input ${errors.reporter ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
              aria-describedby={errors.reporter ? 'reporter-error' : undefined}
              aria-invalid={errors.reporter ? 'true' : 'false'}
            />
            {errors.reporter && (
              <p id="reporter-error" className="form-error">
                {errors.reporter}
              </p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label 
              htmlFor="notes" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              placeholder="Describe the issue and resolution..."
              className="form-input"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resolving...' : 'Resolve Issue'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500">
          <p>TODO: Connect to real backend API</p>
          <p>TODO: Add audit logging for resolutions</p>
          <p>TODO: Implement email notifications</p>
        </div>
      </div>
    </div>
  );
}
