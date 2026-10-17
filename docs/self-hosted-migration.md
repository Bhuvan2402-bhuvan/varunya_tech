# Varunya Technologies — Self-Hosted Production Migration Guide

## 1. Overview & Current Architecture

Varunya Technologies (`varunya_tech`) runs on a dedicated Ubuntu production server (`home-server` / `192.168.29.121`).

### Current Production Stack:
- **Application Directory:** `/opt/apps/varunya_tech`
- **Compose Project:** `varunya_tech`
- **Next.js App:** Standalone production container (`node server.js` on port 3000)
- **Database Engine:** PostgreSQL 16 Alpine (`image: postgres:16-alpine`, `container_name: velocity_postgres`)
- **Database Name:** `velocity30_db`
- **Database User:** `velocity`
- **Database Storage:** Docker named volume `postgres_data` (`varunya_tech_postgres_data`)
- **Cache Engine:** Redis 7 Alpine (`velocity_redis`)
- **Ingress & SSL:** Cloudflare Tunnel (`velocity_cloudflared`) routing `https://varunyatech.in` -> `http://app:3000`

---

## 2. Verified NAS Storage & Pre-Migration Backup

A 1 TB storage drive (`/dev/sdb`) is mounted on the production server at `/srv/nas1tb`.

### Verified Directory Layout:
```
/srv/nas1tb/varunya/
├── postgres_data/      <-- Target persistent storage for PostgreSQL 16
├── app_uploads/        <-- Target persistent storage for application media & files
├── backups/            <-- Database dumps and configuration backups
└── logs/               <-- Container & service runtime logs
```

### Verified Pre-Migration Database Backup:
- **Location:** `/srv/nas1tb/varunya/backups/velocity30_db_pre_nas.dump`
- **Format:** PostgreSQL Custom Format (pg_dump -Fc)
- **Engine Version:** PostgreSQL 16.15
- **Integrity:** 78 TOC entries verified; contains all application tables, schemas, indexes, and existing data.

> [!IMPORTANT]
> **Safety Rule:** The existing Docker named volume `postgres_data` (`varunya_tech_postgres_data`) must remain **100% intact** and must NOT be deleted or pruned until the NAS-backed PostgreSQL cluster has been independently restored, tested, and validated.

---

## 3. Target NAS-Backed Architecture

```
                       [ Cloudflare Edge ]
                               │
                       Cloudflare Tunnel
                               │
                    ┌──────────▼──────────┐
                    │    Ubuntu Server    │
                    │  (192.168.29.121)   │
                    │                     │
                    │    Docker Compose   │
                    │ ┌─────────────────┐ │
                    │ │   cloudflared   │ │
                    │ └────────┬────────┘ │
                    │          │ :3000    │
                    │ ┌────────▼────────┐ │
                    │ │     Next.js     │ │
                    │ └────────┬────────┘ │
                    │          │ :5432    │
                    │ ┌────────▼────────┐ │
                    │ │  PostgreSQL 16  │ │
                    │ └────────┬────────┘ │
                    └──────────┼──────────┘
                               │
                               ▼
                    /srv/nas1tb/varunya/
                    ├── postgres_data
                    ├── app_uploads
                    ├── backups
                    └── logs
```

---

## 4. Environment & Volume Configuration

In `docker-compose.yml`, the PostgreSQL volume is configured with environment variable override:
```yaml
services:
  postgres:
    image: postgres:16-alpine
    container_name: velocity_postgres
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-velocity}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-velocity_secret}
      POSTGRES_DB: ${POSTGRES_DB:-velocity30_db}
    volumes:
      - ${VARUNYA_POSTGRES_DATA_PATH:-postgres_data}:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U $${POSTGRES_USER:-velocity} -d $${POSTGRES_DB:-velocity30_db}"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: always
```

- **Default / Development:** Uses named volume `postgres_data`.
- **Production (Ubuntu Server):** Set `VARUNYA_POSTGRES_DATA_PATH=/srv/nas1tb/varunya/postgres_data` in `/opt/apps/varunya_tech/.env`.

---

## 5. Step-by-Step Server Migration Procedure

### Step 5.1: Initialize PostgreSQL on NAS Storage
1. Ensure permissions on host storage:
   ```bash
   sudo chown -R 70:70 /srv/nas1tb/varunya/postgres_data
   sudo chmod 700 /srv/nas1tb/varunya/postgres_data
   ```

2. Point Compose to NAS storage in `/opt/apps/varunya_tech/.env`:
   ```bash
   VARUNYA_POSTGRES_DATA_PATH=/srv/nas1tb/varunya/postgres_data
   ```

3. Launch PostgreSQL:
   ```bash
   docker compose up -d postgres
   ```

4. Verify database readiness:
   ```bash
   docker compose exec postgres pg_isready -U velocity -d velocity30_db
   ```

### Step 5.2: Restore Verified Backup into NAS Database
Restore data from the pre-nas dump file:
```bash
docker compose exec -T postgres pg_restore \
  -U velocity \
  -d velocity30_db \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  /srv/nas1tb/varunya/backups/velocity30_db_pre_nas.dump
```
*(Or pipe via standard input from host)*:
```bash
docker compose exec -T postgres pg_restore -U velocity -d velocity30_db --clean --if-exists --no-owner < /srv/nas1tb/varunya/backups/velocity30_db_pre_nas.dump
```

### Step 5.3: Validate Restored Tables & Row Counts
```bash
docker compose exec postgres psql -U velocity -d velocity30_db -c "\dt"
docker compose exec postgres psql -U velocity -d velocity30_db -c "SELECT count(*) FROM \"User\";"
docker compose exec postgres psql -U velocity -d velocity30_db -c "SELECT count(*) FROM \"Project\";"
```

### Step 5.4: Start Application & Cloudflared
```bash
docker compose up -d app redis cloudflared
docker compose ps
```

---

## 6. Rollback Procedure

If any anomaly occurs during or after restoration:

1. Stop the NAS-backed containers:
   ```bash
   docker compose down
   ```
2. Revert `.env` to the named volume by commenting out or unsetting `VARUNYA_POSTGRES_DATA_PATH`:
   ```bash
   # VARUNYA_POSTGRES_DATA_PATH=/srv/nas1tb/varunya/postgres_data
   ```
3. Restart the original named-volume stack:
   ```bash
   docker compose up -d
   ```
4. Verify original database connectivity:
   ```bash
   docker compose exec postgres pg_isready -U velocity -d velocity30_db
   ```
*(Zero data loss is assured because the named volume remains completely untouched).*
