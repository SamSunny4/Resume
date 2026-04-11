# InfoGrid — Digital Display & Content Management System

> A CMS and display board built for a 43-inch vertical indoor screen, showing AI news, events, scrolling posters, and QR codes managed through a built-in admin panel.

## Overview

| Field | Details |
|-------|---------|
| **Repository** | [SamSunny4/InfoGrid](https://github.com/SamSunny4/InfoGrid) |
| **Language** | TypeScript |
| **Framework** | Next.js 16 (App Router) |
| **Database** | MongoDB Atlas (via Mongoose) |
| **Image Storage** | Cloudflare R2 (S3-compatible) |
| **Styling** | Tailwind CSS v4 |

---

## Description

InfoGrid is a full-stack digital signage solution designed for deployment on a 43-inch vertical indoor display (e.g., in a college lab, office, or event space). The public-facing display board auto-rotates between AI-related news, upcoming events, poster carousels, and QR codes. All content is managed through a secure admin panel with full CRUD operations, and images are stored in Cloudflare R2.

---

## Features

### Display Board (`/`)
- Auto-rotating carousel of news, events, posters, and QR codes
- Optimised for vertical 43" screens
- Real-time content from MongoDB Atlas

### Admin Panel (`/admin`)
| Section | Route | Capability |
|---------|-------|-----------|
| News | `/admin/news` | Create, edit, and delete news articles with cover images |
| Events | `/admin/events` | Manage events with dates, times, images, and links |
| Posters | `/admin/posters` | Upload and publish poster images to the carousel |
| QR Codes | `/admin/qrcodes` | Add titled QR codes with optional redirect URLs |

Each section supports full **Create / Read / Update / Delete** via REST API routes.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | MongoDB Atlas via Mongoose |
| Image Storage | Cloudflare R2 (S3-compatible, AWS SDK) |
| Styling | Tailwind CSS v4 |
| News Feed | NewsAPI (auto-fetch in admin) |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Public display board
│   ├── admin/
│   │   ├── page.tsx          # Admin dashboard
│   │   ├── news/page.tsx
│   │   └── events/page.tsx
│   └── api/                  # REST API routes
│       ├── news/
│       └── events/
├── components/               # Shared UI components
├── lib/
│   ├── mongodb.ts            # Mongoose connection helper
│   └── storage.ts            # Cloudflare R2 upload/delete helpers
└── models/                   # Mongoose models
    ├── News.ts
    └── Event.ts
```

---

## Database Schema

### `news` Collection

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Required, max 200 chars |
| `description` | String | Required, max 2000 chars |
| `imageUrl` | String | Public URL (R2 or external) |
| `imagePath` | String | R2 object key for deletion |
| `newsUrl` | String | Original article URL |
| `category` | String | General / AI / Technology |
| `createdAt` | Date | Auto-managed |
| `updatedAt` | Date | Auto-managed |

### `events` Collection

| Field | Type | Notes |
|-------|------|-------|
| `title` | String | Required, max 200 chars |
| `description` | String | Required, max 2000 chars |
| `imageUrl` | String | R2 public URL |
| `imagePath` | String | R2 object key |
| `eventDate` | Date | Optional |
| `eventTime` | String | e.g. `14:30` |
| `eventUrl` | String | Registration / info link |

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/news` | List all news |
| POST | `/api/news` | Create a news article |
| GET | `/api/news/[id]` | Get single article |
| PUT | `/api/news/[id]` | Update an article |
| DELETE | `/api/news/[id]` | Delete article + R2 image |
| GET | `/api/events` | List all events |
| POST | `/api/events` | Create an event |
| GET/PUT/DELETE | `/api/events/[id]` | Single event operations |

---

## Setup & Configuration

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables (`.env.local`)
```env
# MongoDB
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/
MONGODB_DB=infogrid

# Cloudflare R2
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY=your_r2_access_key_id
R2_SECRET_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=your_bucket_name
R2_PUBLIC_URL=https://your-public-bucket-url.com

# NewsAPI
NEWSAPI_KEY=your_newsapi_key
```

### 3. Run development server
```bash
npm run dev
```

- Display board: [http://localhost:3000](http://localhost:3000)
- Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Cloudflare R2 Setup

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) → **R2 Object Storage**
2. Create a bucket (e.g. `infogrid`) and enable **Public Access**
3. Create an API token with **Object Read & Write** permissions
4. Copy Account ID, Access Key, and Secret Key to `.env.local`
5. Set `R2_PUBLIC_URL` to your bucket's public domain
