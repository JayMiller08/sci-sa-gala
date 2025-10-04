/**
 * Event Status Component for SCI-SA Gala
 * Displays and manages event day status
 */

/**
 * EventStatus component
 * @param {Object} props - Component props
 * @param {Object} props.status - Event status data
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onToggle - Toggle callback
 * @returns {JSX.Element} - Event status component
 */
export default function EventStatus({ status, loading = false, onToggle }) {
  /**
   * Formats date for display
   * @param {string} dateString - Date string
   * @returns {string} - Formatted date
   */
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /**
   * Formats time for display
   * @param {string} dateString - Date string
   * @returns {string} - Formatted time
   */
  const formatTime = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /**
   * Handles toggle button click
   */
  const handleToggle = () => {
    if (onToggle) {
      onToggle(!status?.enabled);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-gray-600">Loading event status...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Event Day Status
      </h2>
      
      <div className="space-y-6">
        {/* Status Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-3 ${
              status?.enabled ? 'bg-green-500' : 'bg-gray-400'
            }`}></div>
            <span className="text-sm font-medium text-gray-700">
              Event Day is {status?.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          
          <button
            onClick={handleToggle}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
              status?.enabled
                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                : 'bg-green-100 text-green-700 hover:bg-green-200'
            }`}
          >
            {status?.enabled ? 'Disable' : 'Enable'}
          </button>
        </div>

        {/* Event Date Information */}
        {status?.eventDate && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Event Information
            </h3>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{formatDate(status.eventDate)}</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{formatTime(status.eventDate)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Status Description */}
        <div className="text-sm text-gray-600">
          <p>
            {status?.enabled 
              ? 'Event day is currently active. Ticket access will be granted to valid ticket holders.'
              : 'Event day is currently disabled. Ticket access will not be granted until enabled.'
            }
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
          <button
            onClick={handleToggle}
            className="btn-primary"
            disabled={loading}
          >
            {status?.enabled ? 'Disable Event Day' : 'Enable Event Day'}
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="btn-secondary"
          >
            Refresh Status
          </button>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500">
        <p>TODO: Connect to real backend API</p>
        <p>TODO: Add event date/time configuration</p>
        <p>TODO: Add audit logging for status changes</p>
      </div>
    </div>
  );
}
