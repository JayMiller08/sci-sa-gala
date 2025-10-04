# SCI-SA Gala — Website Requirements for Backend Developer

## Purpose
This document tells the backend developer exactly what the React front-end will ask users to provide **and** what the frontend expects the backend/database to return.  
Keep field names, types, and validation **exact** — the frontend code depends on them.

---

## Sessions & Roles

**Endpoint:**  
`GET /api/session-info`

**Frontend expects JSON:**
```json
{
  "role": "ADMIN" | "EXEC",
  "name": "User Name",
  "userId": "uuid-or-id",
  "expiresAt": "ISO8601"
}
```

- The session endpoint is called on app load.  
- If `401` is returned, frontend will redirect to `/login`.  
- Role determines navigation & access (`ADMIN` or `EXEC`).

---

## Common Response Format

**Success example:**
```json
{
  "status": "success",
  "message": "Request completed successfully"
}
```

**Error example:**
```json
{
  "status": "error",
  "message": "Something went wrong. Please try again."
}
```

**Duplicate/Conflict (use HTTP 409):**
```json
{
  "duplicate": true,
  "tickets": [ ... ],
  "duplicateId": "optional-id"
}
```

---

## End-User Forms & Required Fields

### 1. Sell Ticket (Executive)
- **Form fields (frontend names / types / validation):**
  - `ticketNumber` (string) — format: `^M\d{3}$` (example: `M045`)
  - `studentNumber` (string) — exactly 9 digits: `^\d{9}$`
- **Endpoint (frontend POSTs):**  
  `POST /sell-ticket`
- **Body (JSON):**
```json
{
  "ticketNumber": "M045",
  "studentNumber": "225063425",
  "confirm": false
}
```

**Important Rules:**
- **No duplicate tickets allowed**: A `ticketNumber` can only be sold once.  
- **No student re-use**: A `studentNumber` can only be assigned to **one** ticket.  

**Responses:**
- `200 OK`
```json
{ "success": true, "sale": { ... } }
```
- `409 Conflict`
```json
{
  "error": "duplicate_ticket_or_student",
  "tickets": [
    { "ticket_number": "M045", "buyer_student_number": "225063425", "date":"2025-10-03" }
  ]
}
```

---

### 2. My Sales (Executive)
- **GET /my-sales**
- **Response:**
```json
[
  {
    "ticket_number": "M045",
    "buyer_student_number": "225063425",
    "date": "2025-10-03",
    "executive_name": "Exec Name"
  }
]
```

---

### 3. Admin: View All Sales
- **GET /admin/all-sales**
- Optional query params: `startDate`, `endDate`, `executiveId`, `ticketNumber`
- **Response:** Same as `/my-sales` but includes all sales.

---

### 4. Event Status
- **GET /admin/eventday-status**
```json
{ "enabled": true, "eventDate": "2025-10-05T14:00:00Z" }
```
- **POST /admin/eventday-enable**
```json
{ "enabled": true, "eventDate": "2025-10-05T14:00:00Z" }
```

---

### 5. Event Day - Grant Access (Scan Ticket)
- **Form fields:**
  - `ticket` (string, `M###` format)
  - `buyer` (string, 9-digit student number)
  - `type` (string, always `"grant_access"`)  
  - `reporter` (string|null, optional)
- **POST /admin/log-fault2**
```json
{ "ticket": "M045", "buyer": "225063425", "type": "grant_access", "reporter": null }
```
- **Responses:**
```json
{ "success": true }
```
```json
{ "error": "Ticket not found" }
```
```json
{ "error": "already_used" }
```

**Important Rule:**  
- A **ticket cannot be reused** once marked as used.  

---

### 6. Used Tickets (Event Day Table)
- **GET /admin/eventday-used**
```json
[
  {
    "ticket_number": "M045",
    "student_number": "225063425",
    "executive_name": "Exec Name",
    "date": "2025-10-03",
    "time": "14:35"
  }
]
```

---

### 7. Attendees (Optional)
- **GET /attendees**
```json
{
  "attendees": [
    { "name": "John Doe", "ticket_id": "TCK123", "student_number": "20250123" }
  ]
}
```
- **POST /attendees**
```json
{ "name": "John Doe", "ticket_id": "TCK123", "student_number": "20250123" }
```

---

## Validation Rules (Backend MUST Enforce)
- `ticketNumber`: regex `^M\d{3}$`
- `studentNumber`: regex `^\d{9}$`
- **One ticket per student only.**
- **Ticket IDs must be unique.**
- Tickets can only be used once.

---

## Expected HTTP Status Codes
- `200 OK` — success
- `201 Created` — resource created
- `400 Bad Request` — invalid input
- `401 Unauthorized` — session missing/expired
- `403 Forbidden` — user lacks role
- `409 Conflict` — duplicate ticket/student, or already-used ticket
- `500 Server Error` — backend error

---

## Quick Checklist for Backend Developer
- Enforce **no duplicate tickets**.
- Enforce **one student = one ticket**.
- Enforce **no ticket re-use** after granting access.
- Implement endpoints with **exact JSON field names**.
- Return correct **HTTP status codes**.
- Notify frontend if field names change.

---
