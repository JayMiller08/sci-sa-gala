/**
 * Used Tickets Table Component for SCI-SA Gala
 * Displays tickets that have been used during the event
 */

import { useState } from 'react';
import Table from '../../../components/Table/Table.jsx';

/**
 * UsedTicketsTable component
 * @param {Object} props - Component props
 * @param {Array} props.data - Used tickets data
 * @param {boolean} props.loading - Loading state
 * @param {Function} props.onRefresh - Refresh callback
 * @returns {JSX.Element} - Used tickets table component
 */
export default function UsedTicketsTable({ data = [], loading = false, onRefresh }) {
  const [filter, setFilter] = useState('');

  /**
   * Handles table sorting
   * @param {string} columnKey - Column to sort by
   * @param {string} direction - Sort direction
   */
  const handleSort = (columnKey, direction) => {
    // TODO: Implement sorting logic
    console.log('Sort by:', columnKey, direction);
  };

  /**
   * Handles pagination
   * @param {number} page - Page number
   */
  const handlePageChange = (page) => {
    // TODO: Implement pagination logic
    console.log('Page change:', page);
  };

  /**
   * Filters data based on search term
   * @param {Array} data - Data to filter
   * @returns {Array} - Filtered data
   */
  const filteredData = data.filter(item =>
    item.ticket_number.toLowerCase().includes(filter.toLowerCase()) ||
    item.student_number.includes(filter) ||
    item.executive_name.toLowerCase().includes(filter.toLowerCase())
  );

  /**
   * Formats date for display
   * @param {string} dateString - Date string
   * @returns {string} - Formatted date
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  /**
   * Formats time for display
   * @param {string} timeString - Time string
   * @returns {string} - Formatted time
   */
  const formatTime = (timeString) => {
    return timeString || 'N/A';
  };

  // Table columns configuration
  const columns = [
    {
      key: 'ticket_number',
      label: 'Ticket Number',
      sortable: true,
    },
    {
      key: 'student_number',
      label: 'Student Number',
      sortable: true,
    },
    {
      key: 'executive_name',
      label: 'Granted By',
      sortable: true,
    },
    {
      key: 'date',
      label: 'Date',
      sortable: true,
      render: (value) => formatDate(value),
    },
    {
      key: 'time',
      label: 'Time',
      sortable: true,
      render: (value) => formatTime(value),
    },
  ];

  // Mock pagination data
  const pagination = {
    currentPage: 1,
    totalPages: 1,
    totalItems: filteredData.length,
    pageSize: 10,
  };

  if (loading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <span className="ml-2 text-gray-600">Loading used tickets...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Table Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Used Tickets ({filteredData.length})
        </h2>
        
        <div className="flex items-center space-x-4">
          {/* Search Filter */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search tickets..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="form-input pl-10"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="btn-secondary"
            title="Refresh data"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      {filteredData.length > 0 ? (
        <Table
          data={filteredData}
          columns={columns}
          onSort={handleSort}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      ) : (
        <div className="card text-center py-8">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg font-medium">No tickets used yet</p>
            <p className="text-sm">Granted access will appear here</p>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-2xl font-bold text-green-600">
            {filteredData.length}
          </div>
          <div className="text-sm text-gray-600">Total Used</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-blue-600">
            {filteredData.length > 0 ? Math.round(filteredData.length / 24 * 100) : 0}%
          </div>
          <div className="text-sm text-gray-600">Hourly Rate</div>
        </div>
        
        <div className="card text-center">
          <div className="text-2xl font-bold text-purple-600">
            {new Set(filteredData.map(item => item.student_number)).size}
          </div>
          <div className="text-sm text-gray-600">Unique Students</div>
        </div>
      </div>

      <div className="text-xs text-gray-500">
        <p>TODO: Implement server-side sorting and pagination</p>
        <p>TODO: Add export functionality for used tickets</p>
        <p>TODO: Add real-time updates for new access grants</p>
      </div>
    </div>
  );
}
