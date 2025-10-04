# SCI-SA Gala Frontend

A minimalistic, professional React frontend for the SCI-SA Gala ticket management system.

## Features

- **Role-based Access Control**: Executive and Admin user roles
- **Ticket Sales Management**: Sell tickets with validation and duplicate detection
- **Event Day Management**: Countdown timer and ticket access granting
- **Admin Panel**: Event status control and sales monitoring
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Accessibility**: Semantic HTML and ARIA attributes

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd sci-sa-gala-frontend/sci-sa-gala-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── api/
│   └── client.js              # Centralized API client
├── components/
│   ├── NavBar.jsx            # Navigation component
│   ├── ProtectedRoute.jsx    # Route protection
│   └── Table/
│       └── Table.jsx         # Reusable table component
├── config/
│   └── api.js                # API configuration
├── hooks/
│   └── useSession.js         # Session management hook
├── pages/
│   ├── Dashboard/            # Executive dashboard
│   │   ├── ExecutiveDashboard.jsx
│   │   └── components/
│   │       ├── SellTicketForm.jsx
│   │       ├── MySalesTable.jsx
│   │       └── DuplicateConfirmModal.jsx
│   ├── Admin/                # Admin panel
│   │   ├── AdminPanel.jsx
│   │   └── components/
│   │       ├── EventStatus.jsx
│   │       ├── AllSalesTable.jsx
│   │       └── ResolveTicketModal.jsx
│   ├── EventDay/             # Event day interface
│   │   ├── EventDay.jsx
│   │   └── components/
│   │       ├── Countdown.jsx
│   │       ├── GrantAccessForm.jsx
│   │       └── UsedTicketsTable.jsx
│   ├── Login.jsx             # Login page
│   └── NotFound.jsx          # 404 page
├── services/
│   └── mockData.js           # Mock data for development
├── styles/
│   └── tailwind.css          # Tailwind CSS styles
├── utils/
│   ├── validation.js         # Validation utilities
│   └── __tests__/
│       └── validation.test.js # Unit tests
├── App.jsx                   # Main app component
├── AppRoutes.jsx             # Route definitions
└── main.jsx                  # Entry point
```

## Configuration

### API Configuration

The API base URL is configured in `src/config/api.js`:

```javascript
// TODO: Set API_BASE_URL in environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
```

**To configure for production:**

1. Create a `.env` file in the project root:
   ```
   VITE_API_BASE_URL=https://your-api-domain.com
   ```

2. Or set the environment variable when building:
   ```bash
   VITE_API_BASE_URL=https://your-api-domain.com npm run build
   ```

### Authentication

The application currently uses cookie-based authentication. To switch to token-based authentication:

1. Update `src/config/api.js`:
   ```javascript
   export const getAuthHeaders = () => {
     const token = localStorage.getItem('authToken');
     return token ? { 'Authorization': `Bearer ${token}` } : {};
   };
   ```

2. Remove `credentials: 'include'` from `src/api/client.js`

### Mock Data

For development, mock data is enabled by default. To disable:

1. Update `src/services/mockData.js`:
   ```javascript
   export const MOCK_MODE = false;
   ```

2. Update `src/hooks/useSession.js` to use real API calls

## API Endpoints

The frontend expects these backend endpoints:

- `GET /api/session-info` - Get user session information
- `POST /sell-ticket` - Sell a ticket
- `GET /my-sales` - Get executive's sales
- `GET /admin/all-sales` - Get all sales (admin only)
- `GET /admin/eventday-status` - Get event day status
- `POST /admin/eventday-enable` - Enable/disable event day
- `POST /admin/log-fault2` - Log ticket issues
- `GET /admin/eventday-used` - Get used tickets

## TODO: Backend Integration

### Critical TODOs for Production

1. **API Configuration** (`src/config/api.js`):
   - Set `API_BASE_URL` environment variable
   - Configure authentication method (cookies vs tokens)

2. **API Client** (`src/api/client.js`):
   - Replace mock responses with real API calls
   - Add proper error handling for network issues
   - Implement retry logic for failed requests

3. **Session Management** (`src/hooks/useSession.js`):
   - Connect to real authentication endpoint
   - Handle session expiration and refresh
   - Implement proper logout functionality

4. **Database Connection**:
   - Replace mock data in `src/services/mockData.js`
   - Implement real data fetching in all components
   - Add proper loading states and error handling

5. **Environment Variables**:
   - Create `.env` files for different environments
   - Add production build configuration
   - Set up CI/CD pipeline

### Component-Specific TODOs

- **SellTicketForm**: Connect to real ticket sales API
- **MySalesTable**: Implement server-side sorting and pagination
- **EventStatus**: Connect to real event management API
- **AllSalesTable**: Add export functionality and advanced filtering
- **Countdown**: Connect to real event date configuration
- **GrantAccessForm**: Validate against real ticket database
- **UsedTicketsTable**: Add real-time updates for new access grants

## Testing

Run the validation tests:

```bash
npm test
```

The test suite includes:
- Validation utility functions
- Form validation logic
- Error message generation

## Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Environment Variables for Production

Set these environment variables:

- `VITE_API_BASE_URL` - Backend API URL
- `VITE_APP_NAME` - Application name (optional)
- `VITE_APP_VERSION` - Application version (optional)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code structure and naming conventions
2. Add proper JSDoc comments for all functions
3. Include TODO comments for backend integration points
4. Test your changes thoroughly
5. Update this README if needed

## License

This project is part of the SCI-SA Gala system. All rights reserved.