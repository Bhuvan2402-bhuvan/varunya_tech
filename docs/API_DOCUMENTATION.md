# VELOCITY 30 Platform API Specifications

## Base URL
`/api/v1`

---

## Endpoints

### 1. AI Instant Quote Generator
`POST /api/v1/quote`

#### Request Body
```json
{
  "projectType": "Web Development",
  "industry": "Healthcare",
  "expectedUsers": "10k - 100k",
  "features": ["Authentication", "Payment Gateway"],
  "description": "Custom telemedicine portal"
}
```

#### Response
```json
{
  "success": true,
  "data": {
    "estimatedCost": "$14,500",
    "durationDays": 30,
    "confidenceScore": 96,
    "recommendedStack": [
      "Next.js 15 App Router",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL + Prisma"
    ]
  }
}
```

---

### 2. CRM Lead Ingestion & Inbox Integration
`POST /api/v1/leads`

Atomically ingests a lead into the CRM and persists a linked inbox `Message` inside a Prisma transaction.

#### Request Body
```json
{
  "fullName": "Sarah Jenkins",
  "email": "sarah@acme.com",
  "company": "Acme Corp",
  "budgetRange": "$15,000 - $25,000",
  "serviceNeeded": "Custom Software",
  "message": "Looking for a cloud infrastructure audit and Next.js development."
}
```

#### Response
```json
{
  "success": true,
  "leadId": "cly1234567890",
  "messageId": "cly0987654321",
  "referenceId": "VT-LEAD-cly123"
}
```

---

### 3. Admin Messages & Inbox
`GET /api/v1/messages` (Staff Auth Required)

Lists inbound messages with full-text search, pagination, status filtering, category filtering, and unread counts.

#### Query Parameters:
- `status`: `ALL` | `UNREAD` | `READ` | `NEW` | `IN_PROGRESS` | `RESOLVED` | `ARCHIVED` | `SPAM`
- `category`: `GENERAL_CONTACT` | `SALES_ENQUIRY` | `CONSULTATION` | `SUPPORT_TICKET`
- `search`: Case-insensitive search on sender name, email, subject, or content
- `sortBy`: `newest` | `oldest` | `status`
- `page`: Page index (default: 1)
- `limit`: Items per page (default: 20)

---

### 4. Message Detail & Lifecycle Management
`GET /api/v1/messages/:id` (Staff Auth Required)
`PATCH /api/v1/messages/:id` (Staff Auth Required)
`DELETE /api/v1/messages/:id` (Staff Auth Required)

#### PATCH Request Body:
```json
{
  "isRead": true,
  "status": "IN_PROGRESS",
  "assignedToId": "staff-user-id"
}
```

---

### 5. Confidential Staff Notes
`GET /api/v1/messages/:id/notes` (Staff Auth Required)
`POST /api/v1/messages/:id/notes` (Staff Auth Required)

#### POST Request Body:
```json
{
  "content": "Followed up with client regarding project scope. Awaiting RFP draft."
}
```

---

### 6. Active Projects SLA Tracker
`GET /api/v1/projects`

