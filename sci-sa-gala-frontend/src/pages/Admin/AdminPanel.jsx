/**
 * Admin Panel for SCI-SA Gala
 * Administrative interface for managing event status and viewing all sales
 */

import { useState, useEffect } from 'react';
import EventStatus from './components/EventStatus.jsx';
import AllSalesTable from './components/AllSalesTable.jsx';
import ResolveTicketModal from './components/ResolveTicketModal.jsx';

/**
 * AdminPanel component
 * @returns {JSX.Element} - Admin panel component
 */
export default function AdminPanel() {
  const [eventStatus, setEventStatus] = useState(null);
  const [allSalesData, setAllSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [resolveModal, setResolveModal] = useState(null);

  /**
   * Fetches event day status
   */
  const fetchEventStatus = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with real API call
      // const data = await apiGet(ENDPOINTS.ADMIN_EVENTDAY_STATUS);
      
      // Mock data for now
      const mockData = {
        enabled: false,
        eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
      };
      
      setEventStatus(mockData);
    } catch (error) {
      console.error('Failed to fetch event status:', error);
      setError('Failed to load event status');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches all sales data
   */
  const fetchAllSales = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with real API call
      // const data = await apiGet(ENDPOINTS.ADMIN_ALL_SALES);
      
      // Mock data for now
      const mockData = [
        {
          ticket_number: 'M001',
          buyer_student_number: '123456789',
          date: '2024-01-15',
          executive_name: 'John Doe',
        },
        {
          ticket_number: 'M002',
          buyer_student_number: '987654321',
          date: '2024-01-16',
          executive_name: 'John Doe',
        },
        {
          ticket_number: 'M003',
          buyer_student_number: '456789123',
          date: '2024-01-17',
          executive_name: 'Jane Smith',
        },
      ];
      
      setAllSalesData(mockData);
    } catch (error) {
      console.error('Failed to fetch all sales:', error);
      setError('Failed to load sales data');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles event status toggle
   * @param {boolean} enabled - New enabled state
   */
  const handleEventStatusToggle = async (enabled) => {
    try {
      // TODO: Replace with real API call
      // await apiPost(ENDPOINTS.ADMIN_EVENTDAY_ENABLE, { enabled });
      
      // Mock success for now
      console.log('Event status toggled:', enabled);
      setEventStatus(prev => ({ ...prev, enabled }));
      setSuccessMessage(`Event ${enabled ? 'enabled' : 'disabled'} successfully`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error('Failed to toggle event status:', error);
      setError('Failed to update event status');
    }
  };

  /**
   * Handles ticket resolution
   * @param {Object} ticketData - Ticket data to resolve
   */
  const handleTicketResolution = (ticketData) => {
    setResolveModal(ticketData);
  };

  /**
   * Handles resolve confirmation
   * @param {Object} resolveData - Resolution data
   */
  const handleResolveConfirm = async (resolveData) => {
    try {
      // TODO: Replace with real API call
      // await apiPost(ENDPOINTS.ADMIN_LOG_FAULT, resolveData);
      
      // Mock success for now
      console.log('Ticket resolved:', resolveData);
      setSuccessMessage('Ticket issue resolved successfully');
      setResolveModal(null);
      
      // Refresh data
      fetchAllSales();
    } catch (error) {
      console.error('Failed to resolve ticket:', error);
      setError('Failed to resolve ticket issue');
    }
  };

  /**
   * Handles resolve cancellation
   */
  const handleResolveCancel = () => {
    setResolveModal(null);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchEventStatus();
    fetchAllSales();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">
            Manage event status and view all ticket sales
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div 
            className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg"
            role="alert"
            aria-live="polite"
          >
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Status */}
          <div>
            <EventStatus
              status={eventStatus}
              loading={loading}
              onToggle={handleEventStatusToggle}
            />
          </div>

          {/* All Sales Table */}
          <div>
            <AllSalesTable
              data={allSalesData}
              loading={loading}
              onRefresh={fetchAllSales}
              onResolveTicket={handleTicketResolution}
            />
          </div>
        </div>

        {/* Resolve Ticket Modal */}
        {resolveModal && (
          <ResolveTicketModal
            ticketData={resolveModal}
            onConfirm={handleResolveConfirm}
            onCancel={handleResolveCancel}
          />
        )}
      </div>
    </div>
  );
}
