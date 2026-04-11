# KeyBase — Key Management System

> A comprehensive desktop application for key duplicator shops to manage customer records, key details, and webcam-captured photos.

## Overview

| Field | Details |
|-------|---------|
| **Repository** | [SamSunny4/KeyBase](https://github.com/SamSunny4/KeyBase) |
| **Releases** | [SamSunny4/KeyBase-Releases](https://github.com/SamSunny4/KeyBase-Releases) |
| **Language** | Java |
| **GUI Framework** | Java Swing |
| **Database** | H2 Embedded Database |
| **Platform** | Windows 64-bit (portable JRE bundled) |
| **Current Version** | 4.0 |
| **License** | MIT |

---

## Description

KeyBase is a full-featured key shop management system built with Java Swing and an embedded H2 database. It lets shop owners record customer information, track key duplications, capture customer photos via webcam, and generate reports — all without requiring any external server or Java installation on the end user's machine (portable JRE is bundled in the installer).

---

## Features

### Core
- **Customer Records** — Store name, phone, vehicle type, vehicle number, and ID
- **Key Tracking** — Track key type, purpose (Home, Office, Locker, Department, Suspicious), date, quantity, and amount
- **Webcam Image Capture** — Live preview and photo capture for each customer record
- **Phone Validation** — Enforces exactly 10-digit phone numbers
- **Date Picker** — Built-in date chooser defaulting to today

### Search & Filter
- **Multi-criteria Search** — Case-insensitive substring match across all fields
- **Date Range Filtering** — Narrow records to a specific date window
- **Payment Filter** — Distinguish Cash vs UPI transactions
- **Service Type Filter** — In-shop vs On-site service tagging

### Analytics & Reporting
- **Sales Analytics Dashboard** — Charts for Day/Month/Year with metrics for Total Sales, Sales by Key Type, Sales by Purpose, and Sales by Quantity
- **Print Support** — Formatted record printouts with photo; Ctrl+P prints today's summary
- **CSV Export** — Export all, filtered, or individual records

### UX
- **Keyboard Navigation** — Full Enter-key flow through form fields; shortcuts: Ctrl+S, Ctrl+P, Ctrl+F, Ctrl+E, Alt+C, Alt+R
- **Context Menus** — Right-click on any record for quick actions
- **Smart Placeholders** — Missing photos are replaced by themed placeholder images
- **Camera Toggle** — Disable live camera in Preferences and use a splash placeholder instead

---

## Tech Stack

| Component | Technology |
|-----------|-----------|
| Language | Java 17 (LTS) |
| UI | Java Swing |
| Database | H2 Embedded (file-based, no server needed) |
| Webcam | Sarxos Webcam Capture (`webcam-capture-0.3.12`) |
| QR Codes | ZXing (`zxing-core`, `zxing-javase`) |
| Logging | SLF4J Simple |
| Build | Manual `javac` + PowerShell staging script |
| Packaging | Launch4j (EXE wrapper) + Inno Setup 6 (installer) |

---

## Database Schema

**Table: `duplicator`**

| Column | Type | Description |
|--------|------|-------------|
| `duplicator_id` | INT | Auto-increment primary key |
| `name` | VARCHAR(100) | Customer name |
| `phone_number` | VARCHAR(15) | 10-digit phone |
| `vehicle_type` | VARCHAR(20) | 2 Wheeler / 4 Wheeler / Other |
| `vehicle_no` | VARCHAR(20) | Registration number |
| `id_no` | VARCHAR(50) | Customer ID |
| `key_no` | VARCHAR(50) | Key identifier |
| `key_type` | VARCHAR(20) | Home / Office / Locker / Department / Suspicious |
| `date_added` | DATE | Date of entry |
| `remarks` | TEXT | Notes (auto-tagged for service type / payment) |
| `quantity` | INT | Number of keys |
| `amount` | DECIMAL(10,2) | Price charged |
| `image_path` | VARCHAR(255) | Path to customer photo |
| `created_at` | TIMESTAMP | Record creation time |
| `updated_at` | TIMESTAMP | Last modification time |

---

## Architecture

```
KeyBase/
├── src/               # Java source files
├── lib/               # Third-party JARs (H2, webcam-capture, ZXing, SLF4J)
├── config/
│   ├── app.properties          # Default runtime config
│   └── init_h2_database.sql    # Database schema
├── images/            # Captured customer photos
├── data/              # H2 database files (keybase.mv.db)
├── resources/         # Icons, placeholder images
├── installer/
│   ├── prepare-dist.ps1        # Staging script (PowerShell)
│   └── keybase.iss             # Inno Setup script
└── build/
    ├── classes/       # Compiled output
    └── sources.txt    # Source file list for javac
```

---

## Setup & Build

### End User (Windows)
Double-click `KeyBase.exe` in the installed or distributed folder. No Java required — a portable JRE is bundled.

### Developer Build
```bash
# Compile
javac -cp "lib/*" -d build/classes @build/sources.txt

# Run
java -cp "lib/*;build/classes" src.KeyBase
```

### Create Installer (Windows + Inno Setup 6)
```powershell
# Stage distribution
pwsh -File installer/prepare-dist.ps1

# Build installer
& "C:\Program Files (x86)\Inno Setup 6\ISCC.exe" installer\keybase.iss
```

---

## Configuration

`config/app.properties`:

```properties
webcam.device=0           # Webcam index (0 = default)
images.directory=images   # Directory to store captured photos
camera.disabled=false     # Set true to disable live camera
```

Per-user overrides are stored in `%LOCALAPPDATA%\KeyBase\app.properties` on Windows.

---

## Version History

| Version | Highlights |
|---------|-----------|
| 4.0 | Dual key-type dropdowns, improved UI/UX, theming, and bug fixes |
| 3.0 | Sales Analytics dashboard with interactive charts, modernized sidebar |
| 2.3 | Portable JRE bundling, deferred image commit, UPI/Cash payment filter |
| 2.2 | Purpose dropdown, Ctrl+P/Ctrl+S shortcuts, camera disable switch, ZXing QR |
| 2.0 | Edit/Print/Delete records, context menus, quantity/amount fields |
| 1.0 | Initial release — basic CRUD, webcam, search, CSV export |
