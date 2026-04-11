# Leadis — AI-Powered Lead Generation & Gesture Interaction Platform

> A Next.js application that combines AI-driven lead generation with MediaPipe-based hand gesture recognition and a Flask ML backend.

## Overview

| Field | Details |
|-------|---------|
| **Repository** | [SamSunny4/Leadis](https://github.com/SamSunny4/Leadis) |
| **Language** | JavaScript |
| **Framework** | Next.js (App Router) |
| **ML Integration** | MediaPipe (browser), Flask (server-side) |
| **Package Manager** | pnpm / npm |

---

## Description

Leadis is a web platform focused on intelligent lead management and data collection. It features a dynamic form system driven by JSON schemas, AI/ML-based field prediction, and browser-based gesture controls powered by MediaPipe. A companion Flask server handles heavier ML inference tasks. The system supports user data storage, field mapping, and ML-encoded data for scoring and prioritization.

---

## Features

- **Schema-Driven Forms** — Forms generated from `form-schema.json` with `field-mapping.json` for flexible data collection
- **ML Encoding** — `ml-encoding.json` maps form fields to ML model inputs for lead scoring
- **MediaPipe Gesture Recognition** — Real-time browser-based hand gesture controls via webcam
- **Flask ML Backend** — Server-side inference and data processing via a Python/Flask API
- **User Data Storage** — Structured user profiles defined in `user-schema.json`
- **Demo Pages** — Built-in guided demo experience with a complete demo page
- **Training Data** — `trainingdat/` folder contains model training datasets and README

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| Language | JavaScript |
| Gesture ML | MediaPipe (browser, via CDN/npm) |
| Backend ML | Python / Flask |
| Styling | CSS / Tailwind |
| Build Tool | Vite (for some modules) |
| Package Manager | pnpm + npm |

---

## Project Structure

```
Leadis/
├── app/                        # Next.js app directory
├── src/                        # Core source modules
├── public/                     # Static assets
├── utils/                      # Utility functions
├── trainingdat/                # ML training datasets + README
├── form-schema.json            # Dynamic form field definitions
├── field-mapping.json          # Form field to data model mapping
├── ml-encoding.json            # ML feature encoding map
├── user-schema.json            # User data structure definition
├── basicinfo.md                # Intake information schema
├── main_abstract.md            # Project abstract / research summary
├── MEDIAPIPE_INTEGRATION.md    # MediaPipe setup and usage guide
├── FLASK_INTEGRATION.md        # Flask backend integration guide
├── USER_DATA_STORAGE.md        # User data storage architecture
├── DEMO_PAGE_GUIDE.md          # Guide to the demo experience
├── DEMO_PAGE_COMPLETE.md       # Complete demo page documentation
├── next.config.js
├── vite.config.js
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Python 3.9+ with Flask (for ML backend)

### Install & Run

```bash
git clone https://github.com/SamSunny4/Leadis.git
cd Leadis
pnpm install      # or: npm install
pnpm dev          # or: npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Flask Backend

```bash
cd flask-backend   # adjust to actual path
pip install -r requirements.txt
python app.py
```

---

## Documentation

| File | Purpose |
|------|---------|
| `MEDIAPIPE_INTEGRATION.md` | How MediaPipe gesture detection is wired into the UI |
| `FLASK_INTEGRATION.md` | API contract and setup for the Flask ML backend |
| `USER_DATA_STORAGE.md` | Schema and storage strategy for user profiles |
| `DEMO_PAGE_GUIDE.md` | Step-by-step guide to the interactive demo |
| `basicinfo.md` | Intake form fields for child/caregiver data collection |
| `main_abstract.md` | Full research abstract describing the AI screening concept |
