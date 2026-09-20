# Sam Sunny — Portfolio Website

A fast, modern, glassmorphic portfolio website showcasing Sam Sunny's AI engineering, commercial software deployments, national hackathon wins, and verified credentials.

Built with semantic HTML5, modern vanilla CSS3 design system, and ES6+ JavaScript. Designed for zero-build deployment on **Vercel**.

---

## 🚀 Live Preview Locally

You can preview the website locally using any static web server:

```bash
# Using npx serve (recommended)
npx -y serve . -l 3000

# Or using Python's built-in server
python -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

---

## 🌐 Deploying to Vercel

### Option 1: Direct Deploy via Vercel CLI (Quickest)
1. Open PowerShell or Terminal in the `Portfolioweb` folder:
   ```bash
   cd e:\Resume\Portfolioweb
   ```
2. Run Vercel CLI (no prior installation needed):
   ```bash
   npx vercel
   ```
3. Follow the quick interactive prompts:
   - **Set up and deploy?** `Y`
   - **Which scope?** (Select your account)
   - **Link to existing project?** `N`
   - **Project name?** `sam-sunny-portfolio` (or press Enter)
   - **In which directory is your code located?** `./`
4. For production deployment:
   ```bash
   npx vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard (Git Connected)
1. Commit and push your repository to GitHub: `https://github.com/SamSunny4/Resume`
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import your `Resume` repository.
4. In the **Project Settings**:
   - Set **Root Directory** to: `Portfolioweb`
   - Framework Preset: **Other**
   - Build & Output Settings: Leave as default (No build command needed)
5. Click **Deploy**! Vercel will give you a live production URL (e.g. `https://sam-sunny-portfolio.vercel.app`).

---

## 📁 Project Structure

```
Portfolioweb/
├── index.html            # Main semantic markup with SEO & OpenGraph tags
├── style.css             # Glassmorphic CSS design system with Magic UI aesthetics
├── script.js             # Client interactivity, certificate lightbox, filters & toast
├── vercel.json           # Vercel caching and clean-URL configuration
├── README.md             # Deployment and usage guide
└── assets/
    └── certificates/     # Verified certificate media & documents
        ├── nationalhackathon.jpg
        ├── isrohackathon.png
        ├── nptel.png
        ├── programrep.jpg
        ├── mernstack.jpg
        ├── Eneryahackathon.png
        └── industryvisit.jpeg
```

---

## ✨ Key Features
- **Commercial & Flagship Showcase**: Highlights KeyBase (sold and running in business firms), ShareDash, Leadis (National Hackathon 2nd Prize), and Blockchain Graph Explorer.
- **Interactive Certificate Lightbox**: Modal viewer with full certificate previews, issue dates, and verification details.
- **Project Filter System**: Instant tab filtering (All, AI/ML, Desktop & Systems, Full-Stack & Cloud).
- **Interactive Contact Card**: One-click copy email & phone with toast confirmation.
- **Spotlight Hover Glows**: Cursor-aware glowing borders inspired by Magic UI and 21st.dev.
