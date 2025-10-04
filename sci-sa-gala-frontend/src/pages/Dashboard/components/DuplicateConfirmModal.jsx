/**
 * Duplicate Confirmation Modal for SCI-SA Gala
 * Handles duplicate ticket detection and confirmation
 */

import { useState } from 'react';

/**
 * DuplicateConfirmModal component
 * @param {Object} props - Component props
 * @param {Object} props.duplicateData - Duplicate ticket data
 * @param {Function} props.onConfirm - Confirmation callback
 * @param {Function} props.onCancel - Cancellation callback
 * @returns {JSX.Element} - Duplicate confirmation modal component
 */
export default function DuplicateConfirmModal({ duplicateData, onConfirm, onCancel }) {
  const [loading, setLoading] = useState(false);

  /**
   * Handles confirmation
   */
  const handleConfirm = async () => {
    setLoading(true);
    try {
      // TODO: Replace with real API call
      // await apiPost(ENDPOINTS.SELL_TICKET, { 
      //   confirm: true, 
      //   duplicateId: duplicateData.duplicateId 
      // });
      
      // Mock confirmation for now
      console.log('Confirming duplicate with ID:', duplicateData.duplicateId);
      onConfirm({
        confirm: true,
        duplicateId: duplicateData.duplicateId,
      });
    } catch (error) {
      console.error('Failed to confirm duplicate:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles cancellation
   */
  const handleCancel = () => {
    onCancel();
  };

  /**
   * Formats date for display
   * @param {string} dateString - Date string
   * @returns {string} - Formatted date
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  /**
   * Handles modal backdrop click
   * @param {Event} e - Click event
   */
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel();
    }
  };

  /**
   * Handles escape key press
   * @param {Event} e - Keyboard event
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
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
            Duplicate Ticket Detected
          </h3>
          <button
            onClick={handleCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <p className="text-sm text-yellow-800 font-medium">
                  This ticket has already been sold
                </p>
                <p className="text-sm text-yellow-700 mt-1">
                  Please review the existing sales below before proceeding.
                </p>
              </div>
            </div>
          </div>

          {/* Existing Tickets Table */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Existing Ticket Sales
            </h4>
            
            <div className="space-y-3">
              {duplicateData.tickets?.map((ticket, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Ticket:</span>
                      <span className="ml-2 text-gray-900">{ticket.ticket_number}</span>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Student:</span>
                      <span className="ml-2 text-gray-900">{ticket.buyer_student_number}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="font-medium text-gray-700">Date:</span>
                      <span className="ml-2 text-gray-900">{formatDate(ticket.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={handleCancel}
            disabled={loading}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Confirming...' : 'Confirm Sale'}
          </button>
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>TODO: Connect to real backend API</p>
          <p>TODO: Add audit logging for duplicate confirmations</p>
        </div>
      </div>
    </div>
  );
}
