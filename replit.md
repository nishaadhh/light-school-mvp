# Replit MD

## Overview

This is a **Kindergarten School Management System** ("Little Gems") — a visual prototype/demo web app for managing an LKG/UKG kindergarten school. It supports three user roles (Admin, Teacher, Parent) with mock authentication (role selector, no real auth). The app manages students, attendance, fees, and notices with a soft pastel UI designed for mobile-first use.

The project uses a monorepo structure with a React frontend (Vite) and an Express backend. Data is stored in-memory using a `MemStorage` class, though the schema is defined with Drizzle ORM targeting PostgreSQL. The database connection is required at startup (`DATABASE_URL` env var), but the actual data operations use in-memory storage for the demo.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Directory Structure
- `client/` — React frontend (Vite, TypeScript)
- `server/` — Express backend (TypeScript)
- `shared/` — Shared types, schemas, and API route contracts
- `script/` — Build scripts
- `migrations/` — Drizzle migration output folder
- `attached_assets/` — Project requirements and reference docs

### Frontend Architecture
- **Framework**: React with TypeScript, bundled by Vite
- **Routing**: `wouter` (lightweight client-side router)
- **State Management**: 
  - `zustand` with `persist` middleware for auth state (stored in localStorage)
  - `@tanstack/react-query` for server state (API data fetching/caching)
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming; soft pastel color palette (mint, baby blue, soft pink)
- **Fonts**: 'Outfit' for display/headings, 'DM Sans' for body text
- **Animations**: framer-motion for page transitions and interactions
- **Charts**: recharts for dashboard analytics
- **Path aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/`

### Role-Based Views
- **Admin**: Sidebar navigation → Dashboard, Students, Fees, Notices
- **Teacher**: Sidebar navigation → Attendance, My Class
- **Parent**: Mobile bottom nav → Home, Notices, Profile

### Backend Architecture
- **Framework**: Express 5 on Node.js
- **API Design**: RESTful JSON API under `/api/` prefix
- **Route Contract**: Shared `api` object in `shared/routes.ts` defines all endpoints with Zod input/output schemas — used by both frontend hooks and backend handlers
- **Storage**: `MemStorage` class implements `IStorage` interface — all data lives in JavaScript Maps (in-memory, session-only persistence)
- **Database Schema**: Defined via Drizzle ORM in `shared/schema.ts` with PostgreSQL dialect. Tables: `users`, `students`, `attendance`, `fees`, `notices`
- **Dev Server**: Vite dev server middleware is integrated into Express for HMR during development
- **Production**: Client is built to `dist/public/`, server is bundled with esbuild to `dist/index.cjs`

### API Endpoints
- `POST /api/login` — Mock login by role
- `GET /api/students` — List all students
- `GET /api/students/:id` — Get single student
- `POST /api/students` — Create student
- `GET /api/attendance` — List attendance (optional date filter)
- `POST /api/attendance` — Mark attendance
- `GET /api/attendance/student/:id` — Student attendance history
- `GET /api/fees` — List all fees
- `GET /api/fees/student/:id` — Student fees
- `GET /api/notices` — List notices
- `POST /api/notices` — Create notice
- `GET /api/dashboard/stats` — Dashboard statistics

### Build System
- **Dev**: `npm run dev` runs `tsx server/index.ts` with Vite middleware
- **Build**: `npm run build` runs custom `script/build.ts` — Vite builds client, esbuild bundles server
- **DB Push**: `npm run db:push` uses drizzle-kit to push schema to PostgreSQL

### Key Design Decisions
1. **In-memory storage with DB schema**: Schema is defined in Drizzle for type generation and future DB migration, but the demo runs entirely in-memory via `MemStorage`. This means PostgreSQL must be provisioned (for `DATABASE_URL`), but is not actively used for data storage yet.
2. **Shared route contracts**: The `shared/routes.ts` file acts as a single source of truth for API shape, validated with Zod on both client and server.
3. **Mock authentication**: No real auth — just a role selector stored in zustand/localStorage. No sessions, no tokens, no passwords checked.
4. **Mobile-first parent view**: Parent role gets a bottom mobile nav; Admin/Teacher get a sidebar layout.

## External Dependencies

### Database
- **PostgreSQL** (required) — `DATABASE_URL` environment variable must be set. Drizzle ORM is configured for PostgreSQL dialect. The `connect-pg-simple` package is included for session storage capability. Currently the app uses in-memory storage but the DB connection is established at startup.

### Key NPM Packages
- `drizzle-orm` + `drizzle-zod` + `drizzle-kit` — ORM, schema validation, and migrations
- `express` v5 — HTTP server
- `@tanstack/react-query` — Server state management
- `zustand` — Client state management (auth)
- `wouter` — Client-side routing
- `zod` — Schema validation (shared between client/server)
- `framer-motion` — Animations
- `recharts` — Charts
- `date-fns` — Date utilities
- `lucide-react` — Icons
- shadcn/ui component library (Radix UI primitives)

### Replit-Specific
- `@replit/vite-plugin-runtime-error-modal` — Runtime error overlay
- `@replit/vite-plugin-cartographer` — Dev tooling (dev only)
- `@replit/vite-plugin-dev-banner` — Dev banner (dev only)