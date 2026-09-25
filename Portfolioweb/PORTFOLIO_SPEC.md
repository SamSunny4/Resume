# Portfolio Website — Architectural Blueprint & Specification

> **Project**: Sam Sunny Portfolio Website  
> **Reference Model**: [landonorris.com](https://landonorris.com/)  
> **Target Directory**: `e:/Resume/Portfolioweb`  
> **Status**: Phase 2 Complete — Ready for Phase 3  

---

## 1. Verified Analysis of Reference Site (landonorris.com)

A thorough deconstruction of the visual, interaction, and technical patterns verified directly from the source code and assets of `landonorris.com`.

### 1.1 Visual Style & Aesthetics
- **Editorial High-Impact Dark Mode**: Deep, moody base palette paired with high-contrast text and razor-sharp borders.
- **Custom Silhouette Geometry**: Extensive use of bespoke SVG mask paths (`mask-image` and `-webkit-mask-image`) instead of generic rounded rectangles for cards, section frames, and images.
- **Micro-HUD Elements**: High-tech pill badges and floating status widgets that display contextual live data.

### 1.2 Page Structure & Layout
- **Sticky Viewport Hero**: A full-height pinned hero section (`min-height: 100vh`) anchored to a sticky track (`sticky-track home-hero`) where foreground items animate smoothly as the user initiates scrolling.
- **Contextual Status Module**: Floating HUD-style widget ("Next Race") containing dynamic vector track outlines, countdowns, and metadata.
- **Marquee & Narrative Strips**: Continuous horizontal ticker loops with alpha-gradient edge masks (`linear-gradient(90deg, transparent, white 7.5%, white 92.5%, transparent)`).
- **Masked Monumental Footer**: Heavyweight brand footer with custom SVG cutout clipping, sponsor/partner logo carousels, and legal sub-footer.

### 1.3 Typography System
- **Primary Technical Sans**: **Mona Sans** (GitHub’s open-source variable font, utilizing variable axis parameters: `font-variation-settings: "wght" 660, "wdth" 93`).
- **Editorial Display Accent**: **Brier** (high-contrast serif/display font used to accentuate single punchy words within headline blocks).
- **Mathematical Fluid Typography**: Responsive font scaling governed by CSS variables:
  ```css
  :root {
    --min-width: 992px;
    --max-width: 1920px;
    --design-width: 1728;
    --design-unit: 16;
    --scale-factor: 1;
    --fluid-container: clamp(var(--min-width), 100vw, var(--max-width));
    --fluid-font: calc(var(--fluid-container) / var(--design-width) * var(--design-unit) * var(--scale-factor));
  }
  html {
    font-size: var(--fluid-font);
  }
  ```

### 1.4 Color System
| Variable | Hex / Value | Purpose |
| :--- | :--- | :--- |
| `--color--dark-green` | `#101400` | Deep obsidian olive base canvas |
| `--color--lime` | `#D2FF00` | Signature electric neon accent (buttons, active states, selections) |
| `--color--black` | `#000000` | Pure black card layers and contrast blocks |
| `--color--white` | `#FFFFFF` | Primary high-contrast text |
| `--color--green-off-white-2` | `#E3E8DC` | Muted secondary editorial accents |
| `--color--grey-1` / `grey-2` | Border tones | Subdued 1px structural framing lines |

### 1.5 Navigation & Interactivity
- **Dynamic Contextual Header**: Navbar dynamically toggles themes (`data-nav-theme="light"` / `"dark"`) based on viewport collision with target sections (`data-nav-theme-target`).
- **Full-Screen Editorial Overlay**: Interactive hamburger menu that opens a full-screen navigation layout displaying preview imagery on destination link hover.
- **Orientation Lock Prompt**: Detects mobile landscape orientation and prompts visitors to rotate back to vertical orientation.

### 1.6 Motion & Animation Pipeline
- **Lenis**: Smooth inertia-based scrolling (`html.lenis`).
- **Rive Canvas**: Interactive vector state machines (`<canvas data-rive-object>`, hamburger, circuit map, animated signature).
- **Taxi.js**: Single-page transitions without browser page reloads (`data-taxi`, `data-taxi-view`).
- **Split-Text Reveals**: Character and line clipping for animated headline reveals (`[split-text="chars"]`, `clip-path: polygon(...)`).

### 1.7 Verified Technology Stack
- **Verified Platform**: Built on **Webflow** (confirmed via `data-wf-site`, `data-wf-page`, CDN asset hosting `cdn.prod.website-files.com`, and Webflow’s CloudFront runtime).
- **Verified Custom Agency Scripts**: Authored by digital agency **OFF+BRAND** (`https://lando.itsoffbrand.io/dev-js/`).
- **Verified Client Libraries**: jQuery, Lenis, Rive Web Runtime, Taxi.js.
- **Reliable Estimates (Unverified without live execution)**: Three.js / WebGL for 3D canvases, GSAP / ScrollTrigger for scroll-pinned coordinate synchronization.

---

## 2. Creative Translation for Sam Sunny

We borrow the **design spirit and structural hierarchy** from the reference while developing a completely original aesthetic tailored to Sam Sunny's identity:

1. **Identity & Core Narrative**:
   - Software Engineer specializing in **Applied AI, Computer Vision, and Full-Stack Systems**.
   - Focus on tangible, production-proven software: commercial software running in business firms and national hackathon achievements.
2. **Monumental Hero Presentation & System Showcases**:
   - The hero header leads with a high-impact, slow cinematic animated typographic reveal: **"I AM SAM SUNNY"** pairing editorial italic serif with heavyweight monumental display type.
   - Flagship achievements (*KeyBase* commercial software and *Leadis / AiSam* National 2nd Prize) are showcased directly in the dedicated Flagship Systems interactive bento architecture below.
3. **Typography Direction**:
   - Clean, technical sans-serif paired with a high-contrast serif or mono accent for impactful headlines.
4. **Color Palette**:
   - Deep obsidian dark theme with electric accent tones (e.g. electric cyan, indigo, or high-visibility neon lime) and subtle glassmorphic backdrop filters.
5. **Interactive Bento Grid & Credentials Drawer**:
   - Interactive project case cards with architecture badges, GitHub links, and live previews.
   - Built-in modal/drawer to inspect verified certificates (ISRO, AI Samasya, NPTEL Elite, etc.).

---

## 3. Practical Asset Inventory

### 3.1 Workspace Assets Ready for Use
- **Profile Photo**: `Portfolioweb/assets/me.png`
- **Resume**: `Portfolioweb/assets/Sam_Sunny_Resume.pdf`
- **Tech Stack SVGs (28 icons)**: `Portfolioweb/assets/tech-icons/` (Python, JavaScript, TypeScript, Java, C#, C, PostgreSQL, Next.js, React, Flask, .NET, Tailwind, MongoDB, Docker, Git, Linux, Windows, Android, MediaPipe, etc.)
- **Verified Certificates (9 documents)**: `Portfolioweb/assets/certificates/`
  1. `nationalhackathon.jpg` (AI Samasya National 2nd Prize)
  2. `isrohackathon.png` (ISRO × Hack2Skill Bharatiya Antariksh Hackathon 2025)
  3. `nptel.png` / `nptelcopyaspdf.pdf` (NPTEL Elite — Python for Data Science)
  4. `mernstack.jpg` (Full-Stack MERN Certification)
  5. `Eneryahackathon.png` (Enerya Hackathon)
  6. `liguaskill.PDF` (Linguaskill Cambridge C1 Proficiency)
  7. `programrep.jpg` (CSE AI Program Representative, MITS College Union)
  8. `industryvisit.jpeg` (Academic / Industry Credential)
- **Project Graphics**:
  - `keybase-icon.png` & `keybase-splash.png`
  - `leadis-ferret.png` & `leadis-logo.svg`
  - `sharedash-logo.svg`
- **Project Documentation**: Full technical specs in `projects/` (`KeyBase.md`, `Leadis.md`, `AiSam.md`, `InfoGrid.md`, `Rainiest.md`, `3DS.md`).

### 3.2 Resolved Specifications & Inputs
- **Primary Tagline**: *"Building useful things with AI and software."*
- **Personal Narrative / Bio**: *"Software Engineer specializing in Applied AI, Computer Vision, and Full-Stack Systems. Creator of commercial software running in business firms (KeyBase) and 2nd prize winner at the National AI Samasya Hackathon (Leadis / AiSam)."*
- **Public Contact Links**:
  - Email: `samsunnymodern12@gmail.com`
  - GitHub: `https://github.com/SamSunny4`
  - LinkedIn: `https://www.linkedin.com/in/sam-sunny-36b4772bb/`
- **Page Architecture**: Single-page continuous scroll architecture with sticky pinned sections, smooth Lenis momentum scrolling, and camera scroll synchronization.
- **3D & Creative Engineering Strategy**:
  - **WebGL Core**: Lightweight Three.js canvas embedded in the hero viewport, featuring an interactive 3D particle/neural mesh or cybernetic geometric core with mouse parallax and scroll-driven rotation/dispersion.
  - **Animation Coordination**: GSAP + ScrollTrigger paired with Lenis for high-precision timeline scrubbing and section pinning.
  - **GPU Safety**: IntersectionObserver pauses Three.js render loop when the 3D canvas is outside the viewport; reduced-motion query respects system settings.

---

## 4. Phase-by-Phase Roadmap

### Phase 1: Discovery & Planning (Completed)
- [x] Complete visual & interaction analysis of `landonorris.com`.
- [x] Document project requirements, asset inventory, and technical approach.
- [x] Define exact 3D architecture, performance constraints, and library stack.
- [x] Confirm branding, personal narrative, public contact links, and single-page layout.
- **Deliverable**: `PORTFOLIO_SPEC.md` approved and finalized.

### Phase 2: Design System & Architectural Foundation (Completed)
- [x] Setup fluid scaling CSS variables (`clamp()`, font-size ratio engine).
- [x] Implement color tokens, typography scales, glassmorphism layers, and reset rules.
- [x] Setup semantic HTML skeleton and zero-dependency ES6 module structure.
- **Deliverable**: `style.css` design system token sheet and base layout wrapper.

### Phase 3: Interactive Header & Hero Section
- Build sticky header with contextual contrast switching and mobile menu.
- Construct the hero section featuring high-impact typography, profile silhouette integration, and the "Live System Status" HUD module.
- **Deliverable**: Functioning hero experience with fluid responsive scaling.

### Phase 4: Flagship Projects & Case Studies
- Build editorial bento cards for *KeyBase*, *Leadis*, *InfoGrid*, and *Rainiest*.
- Integrate tech stack badges, system architecture highlights, and outbound GitHub/Demo triggers.
- **Deliverable**: Fully styled project showcase section.

### Phase 5: Verified Credentials & Hackathon Gallery
- Implement interactive certificate viewer with modal lightbox.
- Highlight national awards (ISRO Antariksh Hackathon, AI Samasya National 2nd Prize, NPTEL Elite).
- **Deliverable**: Interactive credentials gallery with instant document preview.

### Phase 6: Contact Section, Polish, SEO & Launch
- Construct contact card with 1-click email/phone copy with toast feedback.
- Optimize OpenGraph metadata, SEO tags, performance, and cross-device testing.
- **Deliverable**: Production-ready website ready for zero-build deployment on Vercel.

---

## 5. Development Principles & Behavioral Commitments
- **Zero Fabrication**: Never invent metrics, testimonials, biographical facts, or credentials. Use only verified information from workspace documents or user input.
- **Phase Discipline**: Only execute the agreed phase, present the results, and pause for approval before progressing to subsequent phases.
- **Performance First**: Prioritize lightweight semantic HTML, vanilla CSS, and standard ES6 to guarantee instant load times and clean hosting compatibility.
