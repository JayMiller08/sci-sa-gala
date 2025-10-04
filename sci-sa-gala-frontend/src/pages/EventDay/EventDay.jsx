/**
 * Event Day Page for SCI-SA Gala
 * Handles countdown display and ticket access granting
 */

import { useState, useEffect } from 'react';
import Countdown from './components/Countdown.jsx';
import GrantAccessForm from './components/GrantAccessForm.jsx';
import UsedTicketsTable from './components/UsedTicketsTable.jsx';
import { galaImages } from '../../assets/images.js';

/**
 * EventDay component
 * @returns {JSX.Element} - Event day component
 */
export default function EventDay() {
  const [eventStatus, setEventStatus] = useState(null);
  const [usedTicketsData, setUsedTicketsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [eventActive, setEventActive] = useState(false);

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
        enabled: true, // Change to false to test countdown
        eventDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      };
      
      setEventStatus(mockData);
      
      // Check if event is active
      const now = new Date();
      const eventDate = new Date(mockData.eventDate);
      setEventActive(mockData.enabled || now >= eventDate);
    } catch (error) {
      console.error('Failed to fetch event status:', error);
      setError('Failed to load event status');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Fetches used tickets data
   */
  const fetchUsedTickets = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // TODO: Replace with real API call
      // const data = await apiGet(ENDPOINTS.ADMIN_EVENTDAY_USED);
      
      // Mock data for now
      const mockData = [
        {
          ticket_number: 'M001',
          student_number: '123456789',
          executive_name: 'John Doe',
          date: '2024-01-20',
          time: '14:30:00',
        },
        {
          ticket_number: 'M002',
          student_number: '987654321',
          executive_name: 'Jane Smith',
          date: '2024-01-20',
          time: '15:45:00',
        },
      ];
      
      setUsedTicketsData(mockData);
    } catch (error) {
      console.error('Failed to fetch used tickets:', error);
      setError('Failed to load used tickets');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles successful ticket access grant
   * @param {Object} ticketData - Granted ticket data
   */
  const handleTicketGranted = (ticketData) => {
    setSuccessMessage('Ticket access granted successfully!');
    setUsedTicketsData(prev => [ticketData, ...prev]);
    
    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  /**
   * Handles countdown completion
   */
  const handleCountdownComplete = () => {
    setEventActive(true);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchEventStatus();
    fetchUsedTickets();
  }, []);

  // Update event active state every minute
  useEffect(() => {
    const interval = setInterval(() => {
      if (eventStatus?.eventDate) {
        const now = new Date();
        const eventDate = new Date(eventStatus.eventDate);
        setEventActive(eventStatus.enabled || now >= eventDate);
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [eventStatus]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Event Day</h1>
          <p className="text-gray-600 mt-2">
            {eventActive ? 'Grant ticket access and monitor usage' : 'Event countdown and preparation'}
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
          {/* Countdown or Grant Access Form */}
          <div>
            {eventActive ? (
              <GrantAccessForm
                onTicketGranted={handleTicketGranted}
                onError={setError}
              />
            ) : (
              <Countdown
                eventDate={eventStatus?.eventDate}
                onComplete={handleCountdownComplete}
                loading={loading}
              />
            )}
          </div>

          {/* Used Tickets Table */}
          <div>
            <UsedTicketsTable
              data={usedTicketsData}
              loading={loading}
              onRefresh={fetchUsedTickets}
            />
          </div>
        </div>

        {/* Event Status Information */}
        {eventStatus && (
          <div className="mt-8">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Event Status
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    eventActive ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {eventActive ? 'Active' : 'Pending'}
                  </div>
                  <div className="text-sm text-gray-600">Event Status</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {usedTicketsData.length}
                  </div>
                  <div className="text-sm text-gray-600">Tickets Used</div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {eventStatus.eventDate ? 
                      new Date(eventStatus.eventDate).toLocaleDateString() : 
                      'Not Set'
                    }
                  </div>
                  <div className="text-sm text-gray-600">Event Date</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
