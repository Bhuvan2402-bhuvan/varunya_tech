# Varunya Technologies — Production Deployment & Operations Guide

> **Target Platform:** Self-Hosted Ubuntu Server (`home-server` / `192.168.29.121`)  
> **Deployment Toolchain:** Docker & Docker Compose v2  
> **Application Runtime:** Next.js 14 Standalone (`Node.js 20 Alpine`)  
> **Database:** PostgreSQL 16 Alpine (`postgres:16-alpine`)  
> **Cache / Sessions:** Redis 7 Alpine (`redis:7-alpine`)  
> **Ingress & SSL:** Cloudflare Tunnel (`cloudflared`) / Reverse Proxy  

---

## 1. System Architecture Overview

```
                      [ Cloudflare Edge / Public Ingress ]
                                      │
                              Cloudflare Tunnel
                                      │
                      ┌───────────────▼───────────────┐
                      │    Ubuntu Server Host         │
                      │    IP: 192.168.29.121         │
                      │    App Path: /opt/apps/       │
                      │              varunya_tech/    │
                      │                               │
                      │  Docker Compose Network       │
                      │  (varunya_internal_net)       │
                      │  ┌─────────────────────────┐  │
                      │  │       cloudflared       │  │
                      │  └────────────┬────────────┘  │
                      │               │ :3000         │
                      │  ┌────────────▼────────────┐  │
                      │  │   varunya_app (Next.js) │  │
                      │  │   Health: /api/health   │  │
                      │  └──────┬────────────┬─────┘  │
                      │         │ :5432      │ :6379  │
                      │  ┌──────▼──────┐ ┌───▼─────┐  │
                      │  │  PostgreSQL │ │  Redis  │  │
                      │  │   (v16.x)   │ │  (v7.x) │  │
                      │  └──────┬──────┘ └─────────┘  │
                      └─────────┼─────────────────────┘
                                │
                                ▼
                       Host Persistent Storage
                       /srv/nas1tb/varunya/
                       ├── postgres_data/
                       ├── backups/
                       └── logs/
```

---

## 2. Server Prerequisites

Ensure the target Ubuntu server meets these requirements:

1. **Docker Engine & Docker Compose v2**:
   ```bash
   docker --version          # Docker 24.x+ recommended
   docker compose version    # Docker Compose v2.20+ recommended
   ```

2. **Dedicated Storage Mounts (1TB NAS Drive)**:
   ```bash
   ls -la /srv/nas1tb/varunya/
   # Should contain: postgres_data, backups, logs
   ```

3. **Storage Directory Permissions**:
   ```bash
   sudo chown -R 70:70 /srv/nas1tb/varunya/postgres_data
   sudo chmod 700 /srv/nas1tb/varunya/postgres_data
   ```

---

## 3. Environment Configuration (`.env`)

On the Ubuntu server at `/opt/apps/varunya_tech/.env`:

```ini
# Network Binding (127.0.0.1 prevents public internet exposure of internal Node container)
HOST_BIND_IP=127.0.0.1
APP_PORT=3000
NODE_ENV=production

# Database Connection (Internal docker network connection)
DATABASE_URL="postgresql://velocity:YOUR_SECURE_PASSWORD@postgres:5432/velocity30_db?schema=public"
POSTGRES_USER=velocity
POSTGRES_PASSWORD=YOUR_SECURE_PASSWORD
POSTGRES_DB=velocity30_db

# Persistent NAS Storage Path
VARUNYA_POSTGRES_DATA_PATH=/srv/nas1tb/varunya/postgres_data

# Redis Cache
REDIS_URL="redis://redis:6379"

# Ingress & Cloudflare Tunnel
TUNNEL_TOKEN="your_cloudflare_zero_trust_tunnel_token_here"

# Security & Public URL
NEXT_PUBLIC_SITE_URL="https://varunyatech.com"
NEXTAUTH_SECRET="your_generated_32_character_base64_secret"
NEXTAUTH_URL="https://varunyatech.com"
```

> [!WARNING]
> Never commit `.env` or production credentials to Git. Always copy `.env.example` and set real credentials on the host server.

---

## 4. Pre-Deployment Data Backup

Before pulling new code or restarting containers, execute a database snapshot:

```bash
# Navigate to deployment directory
cd /opt/apps/varunya_tech

# Create timestamped database backup
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
docker compose exec -T postgres pg_dump \
  -U velocity \
  -d velocity30_db \
  -Fc > "/srv/nas1tb/varunya/backups/db_backup_${TIMESTAMP}.dump"

# Verify backup file size
ls -lh "/srv/nas1tb/varunya/backups/db_backup_${TIMESTAMP}.dump"
```

---

## 5. Deployment Step-by-Step

### Step 5.1: Update Codebase
```bash
cd /opt/apps/varunya_tech
git fetch origin main
git status
git merge origin/main --ff-only
```

### Step 5.2: Validate Docker Compose Configuration
```bash
docker compose config
```
*Ensure no syntax errors or variable substitution warnings appear.*

### Step 5.3: Build the Production Image
```bash
docker compose build --no-cache app
```
*Builds the multi-stage Next.js standalone image with zero devDependencies and sets up unprivileged user `nextjs:nodejs`.*

### Step 5.4: Launch the Updated Stack
```bash
docker compose up -d --remove-orphans
```

---

## 6. Health & Verification Runbook

### 6.1 Check Container Status
```bash
docker compose ps
```
*Expected status for all active services:*
- `varunya_app`: `Up (healthy)`
- `velocity_postgres`: `Up (healthy)`
- `velocity_redis`: `Up (healthy)`
- `velocity_cloudflared`: `Up`

### 6.2 Test Application Health Endpoint
```bash
curl -i http://127.0.0.1:3000/api/health
```
*Expected HTTP Response:*
```json
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: no-store, max-age=0

{"status":"healthy","service":"varunyatech-web","timestamp":"...","uptime":"...","environment":"production"}
```

### 6.3 Test Static SEO & LLM Endpoints
```bash
curl -I http://127.0.0.1:3000/robots.txt
curl -I http://127.0.0.1:3000/llms.txt
curl -I http://127.0.0.1:3000/sitemap.xml
```
*All three must return `HTTP/1.1 200 OK`.*

### 6.4 Inspect Container Logs
```bash
# View live application logs
docker compose logs -f --tail=100 app

# View database logs
docker compose logs -f --tail=50 postgres

# View Cloudflare Tunnel ingress logs
docker compose logs -f --tail=50 cloudflared
```

---

## 7. Rollback Procedure

If the new image fails health checks or a breaking defect is identified:

### Step 7.1: Roll back to previous Git commit
```bash
cd /opt/apps/varunya_tech
git checkout HEAD~1
```

### Step 7.2: Rebuild & Restart Previous Container
```bash
docker compose build app
docker compose up -d app
docker compose logs -f --tail=50 app
```

### Step 7.3: Database Restoration (If Schema Was Altered)
```bash
# Restore from pre-deployment snapshot
docker compose exec -T postgres pg_restore \
  -U velocity \
  -d velocity30_db \
  --clean \
  --if-exists \
  --no-owner \
  < "/srv/nas1tb/varunya/backups/db_backup_${TIMESTAMP}.dump"
```

---

## 8. Routine Operations & Maintenance

| Operational Task | Command |
| :--- | :--- |
| **Inspect all running containers** | `docker compose ps` |
| **Restart application service only** | `docker compose restart app` |
| **View resource utilization** | `docker stats --no-stream` |
| **Database CLI access** | `docker compose exec postgres psql -U velocity -d velocity30_db` |
| **Prune unused build layers** | `docker image prune -f` |
