# LateLoggy — Campus Late Entry Verification & Live Monitoring System

<p align="center">
  <img src="public/lateloggy.svg" alt="LateLoggy Logo" width="96" height="96" />
</p>

<p align="center">
  <strong>A campus-wide digital late entry management platform built with Next.js 16, Prisma v7, Supabase Auth, and shadcn/ui.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=flat&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Prisma-v7.9-2D3748?style=flat&logo=prisma" alt="Prisma" />
  <img src="https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=flat&logo=supabase" alt="Supabase" />
  <img src="https://img.shields.io/badge/Tailwind-CSS_v4-38B2AC?style=flat&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/UI-shadcn%2Fui-black?style=flat" alt="shadcn/ui" />
  <img src="https://img.shields.io/badge/Institution-%40mgits.ac.in-blue" alt="MGiTS" />
</p>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [Key Features](#-key-features)
  - [1. Student Check-in Experience](#1-student-check-in-experience)
  - [2. Tamper-Proof Digital Verification Pass](#2-tamper-proof-digital-verification-pass)
  - [3. Smart Email Prefix & Classroom Matching](#3-smart-email-prefix--classroom-matching)
  - [4. Faculty Dashboard & Live Monitoring](#4-faculty-dashboard--live-monitoring)
  - [5. Automated Email Notification & Digest Engine](#5-automated-email-notification--digest-engine)
  - [6. Superuser Admin Management Portal](#6-superuser-admin-management-portal)
  - [7. Public Classroom & QR Directory](#7-public-classroom--qr-directory)
- [Security & Anti-Fraud Mechanisms](#-security--anti-fraud-mechanisms)
- [Data Models & Schema](#-data-models--schema)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Database Initialization](#database-initialization)
  - [Running Locally](#running-locally)
- [Daily Digest & Cron Automation](#-daily-digest--cron-automation)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🌟 Overview

**LateLoggy** eliminates outdated, easily forged paper late registers by replacing them with a secure, instant, contactless QR verification flow. Designed specifically for educational institutions (configured for `@mgits.ac.in`), LateLoggy connects students, faculty, and administrative staff into a unified, tamper-resistant system.

- **Students** scan a QR code placed outside their classroom, authenticate with their institutional Google account, and present a dynamic, color-cycling live pass to the instructor.
- **Faculty** receive real-time email alerts when late entries occur, access an authenticated classroom dashboard, monitor student trends, and export attendance logs.
- **Administrators** control campus classrooms, configure email alerts and scheduled digests, manage scanning time windows, download high-resolution printable QR codes, and audit system access logs.

---

## 🏛️ System Architecture

LateLoggy implements a **split-stack architecture** that cleanly decouples authentication identity from database operations:

```mermaid
flowchart TD
    subgraph Client["Client (Browser / Mobile)"]
        Student["Student Scan (/qr/[id] or /)"]
        FacultyClient["Faculty Dashboard (/dashboard)"]
        AdminClient["Admin Portal (/admin)"]
    end

    subgraph Auth["Authentication Layer"]
        SupabaseAuth["Supabase Auth (Google OAuth)"]
        AdminCookie["Admin HttpOnly Cookie Session"]
    end

    subgraph AppServer["Next.js 16 Application Server"]
        ServerActions["Server Actions (src/app/actions/*.js)"]
        APIRoute["Digest Route (/api/email-digest)"]
        VerifyEngine["Verification Pass Engine"]
    end

    subgraph Data["Database & External Services"]
        PrismaORM["Prisma Client v7 (@prisma/adapter-pg)"]
        SupabasePG["Supabase Postgres (Transaction Pooler :6543)"]
        Web3Forms["Web3Forms Email API"]
        CronService["Cron Scheduler (Vercel / External)"]
    end

    Student -->|OAuth Redirect| SupabaseAuth
    FacultyClient -->|OAuth Verify| SupabaseAuth
    AdminClient -->|Credentials| AdminCookie

    Student -->|Server Action| ServerActions
    FacultyClient -->|Server Action| ServerActions
    AdminClient -->|Server Action| ServerActions
    CronService -->|HTTP GET + Secret| APIRoute

    ServerActions --> PrismaORM
    APIRoute --> PrismaORM
    PrismaORM --> SupabasePG

    ServerActions -->|Async Background Email| Web3Forms
    APIRoute -->|Daily Summary| Web3Forms
```

### Architectural Principles
1. **Prisma ORM (v7)**: Handles **all** database reads, writes, migrations, and relational queries via `@prisma/adapter-pg`. Raw client RPCs and direct Supabase database calls (`supabase.from()`) are strictly avoided.
2. **Supabase Auth**: Strictly handles Google OAuth identity tokens and user sessions. It verifies the `@mgits.ac.in` domain restriction before issuing tokens.
3. **Connection Pooling**: Uses Supabase Transaction Pooler (Port 6543 with PgBouncer) for serverless scalability and Session Pooler (Port 5432) for schema migrations.
4. **Zero-Latency Pass Delivery**: Heavy side-effects like faculty notification emails are executed in asynchronous background tasks using Next.js `after()`, keeping student scan response times instantaneous.

---

## ⚡ Key Features

### 1. Student Check-in Experience
- **QR Code Scanning**: Scan classroom QR codes directly with any smartphone camera or search via the built-in classroom locator (`/find`).
- **Institutional Single Sign-On**: One-tap sign-in restricted exclusively to `@mgits.ac.in` Google accounts; personal Gmail accounts are automatically rejected.
- **Allowed Entry Time Window**: Administrators can enforce allowed campus entry hours (e.g., 08:00 AM – 01:40 PM IST). Scans attempted outside these hours are safely rejected with clear contextual messaging.
- **Idempotency & Re-scan Protection**: If a student already generated an active pass within the expiration window (e.g. 5 minutes), the existing pass is returned without creating duplicate database entries.
- **Active Pass Persistence**: Active passes are securely cached in `localStorage`. If a student accidentally refreshes or closes their browser, an animated "Active Pass Available" alert with a 1-tap restore button is displayed on the homepage and navigation bar.

### 2. Tamper-Proof Digital Verification Pass
When a scan is successfully recorded, the student receives a live verification pass (`/verify?scan_id=...`) engineered to eliminate proxy entries and static screenshots:

- **15-Minute Dynamic Color Cycle**: Pass borders, badges, and background tints rotate through 4 distinct colors based on the current quarter of the hour:
  - `00–14 min`: Blue (`#2563eb`)
  - `15–29 min`: Green (`#16a34a`)
  - `30–44 min`: Amber (`#d97706`)
  - `45–59 min`: Orange (`#ea580c`)
  Faculty can verify pass authenticity at a glance simply by matching the screen accent against the current time block.
- **Live Animated Clock**: A real-time digital clock updates every second with tabular numerals and date indicators.
- **Heartbeat Connection Pulse**: An animated indicator pulses every 2 seconds to prove an active, live DOM connection.
- **Live Countdown & Expiration**: Shows a countdown timer ("Valid for X:XX") matching the configured TTL (default 5 minutes), automatically displaying an expired state upon elapsed time.
- **Single-Use Zero-Width Watermarking**: Once displayed, the pass triggers a server action that appends a zero-width invisible character (`\u200B`) to the record in the database and sets an ephemeral cookie, marking the pass as consumed.
- **Anti-Screenshot & Cache Guards**: Includes `pageshow` listeners to force reload on browser back/forward cache (bfcache) and `visibilitychange` listeners to recalculate expiration age immediately when re-opening background tabs.
- **Classroom Peer Activity**: Shows recent entries in that classroom today, enabling faculty to cross-reference group arrivals.

### 3. Smart Email Prefix & Classroom Matching
- **Automated Class Recognition**: Classrooms can be configured with comma-separated student email prefixes (e.g., `24ct,24cs` matches student IDs such as `24ct363@mgits.ac.in`).
- **Auto-Selection**: When a student signs into the student portal, their classroom is automatically pre-selected based on their email prefix.
- **Mismatch Detection Dialog**: If a student scans a classroom QR that doesn't match their departmental prefix, the system displays a warning dialog showing their suggested class and asking for explicit confirmation, logging an `is_mismatch: true` audit flag.

### 4. Faculty Dashboard & Live Monitoring
- **Google OAuth Access Guard**: Accessible at `/dashboard` and `/faculty` with verified institutional credentials.
- **Role-Based Classroom Filtering**: Automatically associates faculty emails with their assigned classrooms (supports multiple faculty emails per room).
- **Tabbed Analytical Views**:
  - **Live Feed**: Real-time incoming late scans for today with timestamps, student identity, and mismatch alerts.
  - **All Entries / History**: Complete log with date-range filters (Today, Yesterday, Custom Date, All Time).
  - **Per-Student Analytics**: Aggregated metrics per student (total late arrivals, unique dates, classes attended, and expandable per-entry breakdowns).
  - **Per-Day Attendance**: High-level aggregated daily counts.
- **Live Staleness Counter**: Displays time elapsed since the last data refresh ("Updated X seconds ago") with manual one-click refresh.
- **Record Correction**: Faculty can delete invalid or duplicate scan entries for their classrooms.
- **CSV Data Export**: Download filtered attendance logs directly into CSV format for semester grading or departmental archiving.

### 5. Automated Email Notification & Digest Engine
- **Instant Scan Notifications**: Dispatches an instant email alert via Web3Forms API to assigned faculty as soon as a student scans in.
- **Scheduled Daily Digest (`/api/email-digest`)**:
  - Compiles an automated summary table of all late arrivals for the day.
  - Configurable daily send time (in IST).
  - Daily idempotency guard (`last_digest_sent_at`) ensures digests are sent only once per day.
  - Secured with `CRON_SECRET` authorization for external schedulers (Vercel Cron, UptimeRobot, cron-job.org).
- **Manual Summary Dispatch**: Admins can trigger an immediate manual summary email to all faculty for today's scans directly from the portal.
- **Granular Toggles**: Global immediate email toggle, global daily digest toggle, and per-classroom notification mutes.

### 6. Superuser Admin Management Portal
- **Protected Route (`/admin`)**: Secured via authenticated session credentials (`ADMIN_USERNAME` / `ADMIN_PASSWORD`).
- **Classroom Administration**:
  - Create and delete classrooms with cascading scan cleanup.
  - Edit classroom names, multiple faculty emails (comma-separated), and student email pattern prefixes.
  - Per-classroom notification toggles.
- **QR Code Management & Print View**:
  - Generates high-resolution SVG and PNG QR codes for every room.
  - Print-optimized view (`/qr/[id]`) with auto-print formatting for physical door postings.
- **System Configuration Panel**:
  - Configure digital pass expiration duration (`pass_expiry_minutes`).
  - Configure campus scanning time window (`entry_window_enabled`, `allowed_start_time`, `allowed_end_time`).
  - Configure daily digest schedule and notification modes.
- **Security Audit Logs (`dashboard_access_logs`)**:
  - Tracks every faculty login to the dashboard, including email, name, and exact timestamp.
- **Data Maintenance**:
  - Export system-wide or class-specific logs to CSV.
  - Selective or global scan record purge with confirmation modal.

### 7. Public Classroom & QR Directory
- Accessible at `/find` for students and faculty to quickly search for any classroom by name.
- View and share classroom QR links (`/qr/[id]`) or download QR codes without requiring administrative credentials.

---

## 🔒 Security & Anti-Fraud Mechanisms

| Security Feature | Mechanism | Attack Vector Mitigated |
|---|---|---|
| **15-Minute Color Sync** | Background and borders shift across 4 predefined hex colors based on current 15-minute time block | Static screenshots, pre-recorded video replays |
| **Real-time Live Clock** | Client-side animated timer with second & date precision | Static image forgery |
| **Pulsing Heartbeat** | Active 2-second visual pulse animation | Screenshot captures |
| **Pass Expiry Window (TTL)** | Configurable lifespan (e.g. 5 min); auto-redirects to expired view | Reusing old passes from previous days |
| **Single-Use Watermarking** | Zero-width character `\u200B` appended to DB record on view + cookie tracking | Sharing pass links with peers |
| **Cache & Tab Guards** | `pageshow` listener forces reload on bfcache; `visibilitychange` recalculates TTL on tab switch | Pausing/freezing browser tabs to preserve passes |
| **Email Pattern Matching** | Matches student email prefix against class pattern; flags mismatches | Scanning into wrong/different classes |
| **Allowed Entry Hours** | Validates scans against allowed IST hours (e.g., 08:00 to 13:40) | Generating late passes outside class hours |
| **Domain Restriction** | Supabase OAuth + server-side validation strictly enforces `@mgits.ac.in` | External or non-institutional accounts |
| **Audit Access Logging** | Server records every faculty dashboard access | Unauthorized faculty account access |

---

## 🗄️ Data Models & Schema

The PostgreSQL schema is managed through Prisma ORM v7:

```prisma
model classes {
  id                    String       @id @default(uuid())
  name                  String
  faculty_email         String?
  email_pattern         String?
  notifications_enabled Boolean      @default(true)
  created_at            DateTime     @default(now())
  late_scans            late_scans[]
}

model late_scans {
  id            String   @id @default(uuid())
  class_id      String
  student_name  String
  student_email String
  is_mismatch   Boolean  @default(false)
  scanned_at    DateTime @default(now())

  classes       classes  @relation(fields: [class_id], references: [id], onDelete: Cascade)

  @@index([class_id])
  @@index([student_email])
  @@index([scanned_at])
}

model email_settings {
  id                   Int       @id @default(1)
  immediate_enabled    Boolean   @default(true)
  daily_digest_enabled Boolean   @default(false)
  daily_digest_time    String    @default("08:00")
  last_digest_sent_at  DateTime?
  pass_expiry_minutes  Int       @default(5)
  entry_window_enabled Boolean   @default(true)
  allowed_start_time   String    @default("08:00")
  allowed_end_time     String    @default("13:40")
}

model dashboard_access_logs {
  id            String   @id @default(uuid())
  faculty_email String
  faculty_name  String
  accessed_at   DateTime @default(now())
}
```

---

## 📁 Project Structure

```
LateLoggy/
├── prisma/
│   └── schema.prisma            # Prisma schema definitions & relationships
├── prisma.config.ts             # Prisma v7 connection configuration
├── public/
│   ├── lateloggy.svg            # Official LateLoggy vector logo
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── actions/             # Next.js Server Actions ('use server')
│   │   │   ├── auth.js          # Admin login, logout, session verification
│   │   │   ├── classes.js       # Classroom CRUD & email pattern matching
│   │   │   ├── email.js         # Instant Web3Forms faculty notifications
│   │   │   ├── emailSettings.js # System settings, manual summaries, digests
│   │   │   ├── faculty.js       # Faculty classroom & scan data queries
│   │   │   ├── logs.js          # Dashboard security access logs
│   │   │   └── scans.js         # Late entry record creation, deletion, analytics
│   │   ├── admin/
│   │   │   ├── login/           # Admin authentication page
│   │   │   └── page.js          # Superuser administration dashboard
│   │   ├── api/
│   │   │   └── email-digest/    # Daily digest cron route (GET /api/email-digest)
│   │   ├── dashboard/           # Authenticated faculty monitoring dashboard
│   │   ├── faculty/             # Faculty classroom selector view
│   │   ├── find/                # Public classroom & QR code search directory
│   │   ├── login/               # Role-based Google OAuth login page
│   │   ├── qr/[id]/             # Public printable classroom QR code view
│   │   ├── student/             # Student portal & manual class selector
│   │   ├── verify/              # Dynamic live verification pass view
│   │   ├── globals.css          # Tailwind CSS v4 styling & theme tokens
│   │   ├── layout.js            # Root layout with font configuration
│   │   └── page.js              # Home scanner & active pass landing
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components (Button, Card, Table, etc.)
│   │   ├── AdminPortal.jsx      # Multi-tab admin management component
│   │   └── Navbar.jsx           # Global responsive navigation header
│   └── lib/
│       ├── prisma.js            # Prisma client singleton with PG adapter
│       ├── supabase.js          # Supabase client singleton for Auth
│       └── utils.js             # Utility functions (cn, clsx)
├── .env.example                 # Environment variables reference template
├── next.config.mjs              # Next.js 16 configuration
├── package.json                 # Project dependencies & scripts
└── vercel.json                  # Vercel deployment & cron configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or later (Node.js 22 LTS recommended)
- **npm** or **pnpm**
- **Supabase Account**: With a PostgreSQL database and Google OAuth enabled
- **Web3Forms Account**: Free access key for transactional email dispatch

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SamSunny4/LateLoggy.git
   cd LateLoggy
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the root directory by copying the example:

```bash
cp .env.example .env
```

Populate the required environment variables:

| Variable | Description | Example / Source |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase Anon/Publishable API key | Found in Supabase API settings |
| `DATABASE_URL` | Supabase Transaction Pooler (Port 6543) | `postgres://postgres.[ref]:[pass]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | Supabase Session Pooler (Port 5432) | `postgres://postgres.[ref]:[pass]@aws-0-[region].pooler.supabase.com:5432/postgres` |
| `ADMIN_USERNAME` | Admin portal username | `admin` |
| `ADMIN_PASSWORD` | Admin portal password | Strong master password |
| `GOOGLE_CLIENT_ID` | Google Cloud OAuth Client ID | Configured in Supabase Auth Providers |
| `GOOGLE_CLIENT_SECRET` | Google Cloud OAuth Client Secret | Configured in Supabase Auth Providers |
| `WEB3FORMS_ACCESS_KEY` | Web3Forms API key for sending emails | Obtain from [web3forms.com](https://web3forms.com) |
| `CRON_SECRET` | Bearer token / secret to secure cron route | Custom random secret |
| `NEXT_PUBLIC_APP_URL` | Base application URL | `http://localhost:3000` (Dev) or production URL |

### Database Initialization

Generate the Prisma Client and sync the schema to your Supabase PostgreSQL instance:

```bash
# Generate Prisma Client
npx prisma generate

# Push the schema directly to PostgreSQL
npx prisma db push
```

### Running Locally

Start the Next.js development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⏰ Daily Digest & Cron Automation

LateLoggy includes an automated endpoint at `/api/email-digest` that checks if the daily digest is due and sends a consolidated summary to all faculty.

### Configuring Vercel Cron
Add the job to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/email-digest",
      "schedule": "0 3 * * *"
    }
  ]
}
```
*(Runs at 03:00 UTC = 08:30 IST; the endpoint will check against your configured IST send time).*

### External Schedulers (UptimeRobot, cron-job.org)
Trigger the endpoint periodically with the secret:

```bash
curl -X GET "https://your-domain.com/api/email-digest?secret=YOUR_CRON_SECRET"
```

---

## 🚢 Deployment

### Deploying to Vercel

1. Push your repository to GitHub.
2. Import your repository into [Vercel](https://vercel.com).
3. Set the Framework Preset to **Next.js**.
4. Configure all environment variables from `.env` in the Vercel project settings.
5. In your Supabase Dashboard:
   - Add your production domain to **Authentication > URL Configuration > Redirect URLs** (`https://your-domain.vercel.app/**`).
   - Enable Google provider under **Authentication > Providers > Google**.
6. Trigger deployment. The `postinstall` script (`prisma generate`) will automatically generate the Prisma client during the build.

---

## 📄 License

This project is licensed for educational and institutional use under the MIT License. Developed for the Muthoot Institute of Technology and Science (MGiTS).
