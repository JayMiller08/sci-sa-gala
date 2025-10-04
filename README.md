# SCI-SA Gala Front-End & Database Connection Guide

This document provides backend setup instructions for the colleague designing the database and API for the SCI-SA Gala front-end React project.

## Backend Setup Instructions

1. **Set up a backend API**
   - Use Node.js + Express (or any server framework/language).
   - Ensure the backend connects to the database for ticketing and user info.

2. **Create REST API endpoints** that React can call:

   - `GET /api/session-info`
     - Returns logged-in user session info (name, role, id).

   - `POST /sell-ticket`
     - Request body: `{ ticketNumber, studentNumber }`
     - Saves sale in DB, returns success or duplicate warning.

   - `GET /my-sales`
     - Returns sales for the logged-in executive.

   - `GET /admin/all-sales`
     - Admin only, returns all sales with optional filters.

   - `POST /admin/eventday-enable`
     - Admin only, toggles event-day mode.

   - `POST /admin/log-fault2`
     - Used on event day to grant access and validate tickets.
     - Request body: `{ ticket, buyer, type, reporter }`

   - `GET /admin/eventday-used`
     - Returns all tickets already marked as used.

3. **Use POST for actions that change data**
   - e.g. sell-ticket, log-fault2, eventday-enable

4. **Use GET for fetching data**
   - e.g. session-info, my-sales, all-sales, eventday-used

5. **Ensure JSON responses**
   - All API responses should be in JSON (React expects JSON).

6. **Allow CORS with credentials**
   - Example React fetch request:
     ```js
     fetch("http://localhost:4000/api/session-info", {
       credentials: "include"
     });
     ```

7. **Provide the React developer with:**
   - API base URL (e.g. `http://localhost:4000`)
   - Example request & response for each endpoint

---

## Notes
- The React app will handle form validation and UI logic.
- Backend must handle authentication and session management.
- Clear, consistent API responses will make integration smooth.
