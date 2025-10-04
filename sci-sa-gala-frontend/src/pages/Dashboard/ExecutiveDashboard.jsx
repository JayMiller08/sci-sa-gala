/**
 * Executive Dashboard for SCI-SA Gala
 * Main interface for executives to sell tickets and view their sales
 */

import { useState, useEffect } from 'react';
import SellTicketForm from './components/SellTicketForm.jsx';
import MySalesTable from './components/MySalesTable.jsx';
import DuplicateConfirmModal from './components/DuplicateConfirmModal.jsx';

/**
 * ExecutiveDashboard component
 * @returns {JSX.Element} - Executive dashboard component
 */
export default function ExecutiveDashboard() {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [duplicateModal, setDuplicateModal] = useState(null);

  /**
   * Fetches sales data
   */
  const fetchSalesData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with real API call
      // const data = await apiGet(ENDPOINTS.MY_SALES);
      
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
      ];
      
      setSalesData(mockData);
    } catch (error) {
      console.error('Failed to fetch sales data:', error);
      setError('Failed to load sales data');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles successful ticket sale
   * @param {Object} ticketData - Sold ticket data
   */
  const handleTicketSold = (ticketData) => {
    setSuccessMessage('Ticket sold successfully!');
    setSalesData(prev => [ticketData, ...prev]);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  /**
   * Handles duplicate ticket detection
   * @param {Object} duplicateData - Duplicate ticket data
   */
  const handleDuplicateTicket = (duplicateData) => {
    setDuplicateModal(duplicateData);
  };

  /**
   * Handles duplicate confirmation
   * @param {Object} confirmData - Confirmation data
   */
  const handleDuplicateConfirm = async (confirmData) => {
    try {
      // TODO: Replace with real API call
      // await apiPost(ENDPOINTS.SELL_TICKET, confirmData);
      
      // Mock success for now
      console.log('Duplicate confirmed:', confirmData);
      setSuccessMessage('Ticket sale confirmed!');
      setDuplicateModal(null);
      
      // Refresh sales data
      fetchSalesData();
    } catch (error) {
      console.error('Failed to confirm duplicate:', error);
      setError('Failed to confirm ticket sale');
    }
  };

  /**
   * Handles duplicate cancellation
   */
  const handleDuplicateCancel = () => {
    setDuplicateModal(null);
  };

  // Fetch sales data on component mount
  useEffect(() => {
    fetchSalesData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-10">
          <div className="accent-line"></div>
          <h1 className="title-primary">Executive Dashboard</h1>
          <p className="subtitle">
            Manage ticket sales and monitor your performance
          </p>
        </div>

        {/* Enhanced Success Message */}
        {successMessage && (
          <div 
            className="mb-6 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 text-green-800 px-6 py-4 rounded-r-xl shadow-lg backdrop-blur-sm"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-semibold">{successMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Error Message */}
        {error && (
          <div className="mb-6 bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 text-red-800 px-6 py-4 rounded-r-xl shadow-xl">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-semibold">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Sell Ticket Form */}
          <div className="space-y-6">
            <div className="card-gradient">
              <SellTicketForm
                onTicketSold={handleTicketSold}
                onDuplicateTicket={handleDuplicateTicket}
                onError={setError}
              />
            </div>
          </div>

          {/* My Sales Table */}
          <div className="space-y-6">
            <div className="card-gradient">
              <MySalesTable
                data={salesData}
                loading={loading}
                onRefresh={fetchSalesData}
              />
            </div>
          </div>
        </div>

        {/* Duplicate Confirmation Modal */}
        {duplicateModal && (
          <DuplicateConfirmModal
            duplicateData={duplicateModal}
            onConfirm={handleDuplicateConfirm}
            onCancel={handleDuplicateCancel}
          />
        )}
      </div>
    </div>
  );
}
