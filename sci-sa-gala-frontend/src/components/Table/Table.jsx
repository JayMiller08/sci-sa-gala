/**
 * Reusable Table Component for SCI-SA Gala
 * Handles sorting, pagination, and filtering
 */

import { useState, useMemo } from 'react';

/**
 * Table component with sorting and pagination
 * @param {Object} props - Component props
 * @param {Array} props.data - Table data
 * @param {Array} props.columns - Column definitions
 * @param {Function} props.onSort - Sort handler
 * @param {Object} props.pagination - Pagination config
 * @param {Function} props.onPageChange - Page change handler
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} - Table component
 */
export default function Table({ 
  data = [], 
  columns = [], 
  onSort, 
  pagination, 
  onPageChange,
  className = '' 
}) {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  /**
   * Handles column header click for sorting
   * @param {string} columnKey - Column key to sort by
   */
  const handleSort = (columnKey) => {
    if (!onSort) return;

    const newDirection = 
      sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
    
    setSortColumn(columnKey);
    setSortDirection(newDirection);
    onSort(columnKey, newDirection);
  };

  /**
   * Renders sort indicator
   * @param {string} columnKey - Column key
   * @returns {JSX.Element} - Sort indicator
   */
  const renderSortIndicator = (columnKey) => {
    if (sortColumn !== columnKey) {
      return (
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }

    return (
      <svg 
        className={`w-4 h-4 ${sortDirection === 'asc' ? 'text-primary-600' : 'text-gray-400'}`} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
      </svg>
    );
  };

  /**
   * Renders pagination controls
   * @returns {JSX.Element} - Pagination component
   */
  const renderPagination = () => {
    if (!pagination || !onPageChange) return null;

    const { currentPage, totalPages, totalItems, pageSize } = pagination;
    const startItem = (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, totalItems);

    return (
      <div className="flex items-center justify-between px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div className="text-sm text-gray-700">
          Showing {startItem} to {endItem} of {totalItems} results
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white shadow-sm rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`table-header ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {column.sortable && renderSortIndicator(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="table-cell">
                    {column.render ? column.render(row[column.key], row, index) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {renderPagination()}
    </div>
  );
}
