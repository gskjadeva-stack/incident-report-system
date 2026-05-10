# Incident Report Monitoring System

Code scaffold for an Operational Risk Incident Report monitoring system based only on:

- `requirements_raw.md`
- `revised_ir_freestack.md`
- `OpIR_ Template.xlsx`

## Goal

Provide a shared web-based incident report form and backend monitoring dashboard so incident reports are consolidated in a database, assigned a unique reference, and monitored until closure.

## Free-stack target

| Layer | Technology |
| --- | --- |
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | Supabase PostgreSQL |
| ORM | Prisma |
| Auth-ready integration | Supabase Auth JWT parsing placeholder |
| File storage-ready integration | Supabase Storage placeholder |
| Frontend hosting target | Vercel Hobby |
| Backend hosting target | Render Free Web Service |

## Current scaffold scope

Implemented in this scaffold:

- Incident submission API
- Incident list/detail API
- Incident status update API
- Prisma schema for Supabase PostgreSQL
- React form fields based on `OpIR_ Template.xlsx`
- React monitoring table/dashboard
- Environment templates and setup notes

Not implemented yet because these were not explicitly required in the source documents:

- Complex approval workflow
- SLA/escalation rules
- Custom email workflow
- Detailed role hierarchy
- Advanced analytics

## Local setup

```bash
npm install
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
npm run prisma:generate
npm run dev
```

Update `DATABASE_URL`, `SUPABASE_URL`, and Supabase keys before running migrations or connecting to Supabase.

## Database setup

1. Create a Supabase project.
2. Copy the project PostgreSQL connection string to `DATABASE_URL` in `apps/api/.env`.
3. Run:

```bash
npm run prisma:migrate
```

The `Incident.referenceNo` field is unique. The backend generates references using a timestamp and random suffix to reduce collision risk during simultaneous submissions, and the database still enforces uniqueness.

## API endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| GET | `/health` | Health check for Render/UptimeRobot |
| POST | `/incidents` | Submit a new incident report |
| GET | `/incidents` | List incident reports for monitoring |
| GET | `/incidents/:id` | View a single incident report |
| PATCH | `/incidents/:id/status` | Update monitoring status |

## Deployment notes

- Deploy `apps/web` to Vercel.
- Deploy `apps/api` to Render.
- Point `VITE_API_URL` to the Render API URL.
- Configure Render environment variables from `.env.example`.
- Add an UptimeRobot monitor to ping `GET /health` every 5-10 minutes if you want to reduce Render spin-down delays.