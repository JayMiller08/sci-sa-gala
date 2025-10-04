
/**
 * Mock Data Services for SCI-SA Gala
 * TODO: Remove this file when connecting to real backend
 */

// Configuration flag to enable/disable mock mode
export const MOCK_MODE = true; // TODO: Set to false when backend is ready

// Mock session data
export const mockSessionData = {
  role: 'EXEC', // Change to 'ADMIN' to test admin features
  name: 'John Doe',
  userId: '12345',
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
};

// Mock sales data
export const mockMySalesData = [
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
    executive_name: 'John Doe',
  },
];

// Mock all sales data (admin only)
export const mockAllSalesData = [
  ...mockMySalesData,
  {
    ticket_number: 'M004',
    buyer_student_number: '789123456',
    date: '2024-01-18',
    executive_name: 'Jane Smith',
  },
  {
    ticket_number: 'M005',
    buyer_student_number: '321654987',
    date: '2024-01-19',
    executive_name: 'Bob Johnson',
  },
];

// Mock event day status
export const mockEventDayStatus = {
  enabled: false,
  eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
};

// Mock used tickets data
export const mockUsedTicketsData = [
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

/**
 * Mock API responses
 */
export const mockApiResponses = {
  // Session info
  sessionInfo: () => ({
    role: 'EXEC', // Change to 'ADMIN' to test admin features
    name: 'John Doe',
    userId: '12345',
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  }),

  // Sell ticket responses
  sellTicketSuccess: () => ({ success: true }),
  sellTicketDuplicate: () => ({
    duplicate: true,
    tickets: [
      { ticket_number: 'M001', buyer_student_number: '123456789', date: '2024-01-15' },
    ],
    duplicateId: 'dup_123',
  }),
  sellTicketError: () => ({ error: 'Ticket already exists' }),

  // My sales
  mySales: () => mockMySalesData,

  // All sales (admin)
  allSales: () => mockAllSalesData,

  // Event day status
  eventDayStatus: () => mockEventDayStatus,

  // Used tickets
  usedTickets: () => mockUsedTicketsData,
};

/**
 * Mock API delay for realistic testing
 */
export const mockApiDelay = (ms = 500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
