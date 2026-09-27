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

### 2. CRM Lead Ingestion
`POST /api/v1/leads`

#### Request Body
```json
{
  "fullName": "Sarah Jenkins",
  "email": "sarah@acme.com",
  "budgetRange": "$15,000 - $25,000",
  "serviceNeeded": "Custom Software"
}
```

---

### 3. Active Projects SLA Tracker
`GET /api/v1/projects`
