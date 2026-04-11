# Rainiest — Kerala Rainfall & Education Leave Dashboard

> A smart web dashboard showing real-time rainfall status and whether District Collectors have declared education leave for each of Kerala's 14 districts.

## Overview

| Field | Details |
|-------|---------|
| **Repository** | [SamSunny4/Rainiest](https://github.com/SamSunny4/Rainiest) |
| **Language** | JavaScript (Next.js) |
| **Framework** | Next.js 15, React 19 |
| **Styling** | Tailwind CSS |
| **Deployment** | Vercel |
| **Forks** | 1 |

---

## Description

Rainiest is a modern web application built for citizens of Kerala, India. It provides a single view of all 14 districts showing live rainfall conditions and whether the local District Collector has officially declared an education leave (school holiday due to rain). It also surfaces the latest public Facebook posts from each Collector's page, so residents get authoritative updates in one place.

The project was originally written as a legacy HTML + Python app and was later rewritten as a full Next.js application for Vercel deployment.

---

## Features

- **Live District Status** — Real-time rain condition cards for all 14 Kerala districts
- **Education Leave Alerts** — Clearly flags whether school leave has been declared per district
- **Weather Animations** — HTML5 Canvas animations: rain, sun, moon, and cloud effects
- **Day / Night Theme** — Automatic theme switching based on local time
- **Facebook Integration** — Displays latest public posts from District Collector Facebook pages
- **Mobile Responsive** — Fully responsive layout for phones, tablets, and desktops
- **Collector Profiles** — Dedicated page (`collector_profiles.html`) listing collector contact info

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS |
| Animations | HTML5 Canvas |
| API Layer | Next.js API Routes |
| Deployment | Vercel |
| Config | `vercel.json` for routing/headers |

---

## Project Structure

```
Rainiest/
├── src/               # Next.js app source
├── public/            # Static assets
├── scripts/           # Utility / data scripts
├── lib/               # Shared helpers
├── utilities/         # Additional utility modules
├── legacy/            # Original HTML/Python version
├── collector_profiles.html   # Collector contact reference page
├── FACEBOOK_SETUP.md         # Guide for Facebook API integration
├── SOLUTION_OVERVIEW.md      # Architecture and design overview
├── next.config.mjs
├── vercel.json
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
git clone https://github.com/SamSunny4/Rainiest.git
cd Rainiest
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect the GitHub repository to Vercel for automatic deployments on every push.

---

## Districts Covered

All 14 districts of Kerala:
Thiruvananthapuram, Kollam, Pathanamthitta, Alappuzha, Kottayam, Idukki, Ernakulam, Thrissur, Palakkad, Malappuram, Kozhikode, Wayanad, Kannur, Kasaragod.

---

## Background

Kerala experiences heavy monsoon rainfall every year, and District Collectors are authorized to declare sudden education leaves on days of extreme rain. Previously, residents had to check multiple social media accounts and government websites to confirm leave status. Rainiest consolidates all of this information into a single, real-time dashboard.
