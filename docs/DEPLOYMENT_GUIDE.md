# VELOCITY 30 Production Deployment Guide

## 1. Local Development Setup

```bash
# Install node dependencies
cmd /c npm install

# Initialize Prisma Database Client
cmd /c npm run prisma:generate

# Start local Next.js dev server
cmd /c npm run dev
```

Visit `http://localhost:3000` to preview the local application.

---

## 2. Docker Deployment

```bash
# Build and run containers with Docker Compose
docker-compose up --build -d
```

---

## 3. Production Deployment to Vercel & Railway

1. Push your repository to GitHub.
2. Link the repository to your Vercel project dashboard.
3. Configure environment variables matching `.env.example`.
4. Run static build verification: `cmd /c npm run build`.
