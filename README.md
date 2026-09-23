<div align="center">

# Namay Singh — AI/ML Engineer and Developer Portfolio

<p align="center">
  <strong>An editorial, scroll-driven interactive portfolio and resume built with modern web technologies.</strong>
</p>

[![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Vercel](https://img.shields.io/badge/Vercel_Ready-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<br />

[Overview](#overview) • [Workflow and Architecture](#workflow-and-architecture) • [Key Features](#key-features) • [Tech Stack](#tech-stack) • [Quick Start](#quick-start) • [Deployment](#deployment-guide-vercel) • [Project Structure](#project-structure) • [Contact](#contact-and-connect)

</div>

---

## Overview

This repository contains the source code for the personal portfolio of Namay Singh, an AI/ML engineer and full-stack developer based in Bengaluru, India.

Designed with an editorial, monochrome agency aesthetic, the application transitions between light paper surfaces and dark high-contrast panels, featuring dynamic particle physics, micro-interactions, and a structured single source of truth data architecture.

---

## Workflow and Architecture

The application is structured into four decoupled layers to ensure maintainability, performance, and scalability.

```mermaid
flowchart TD
    subgraph DataLayer [1. Data Layer]
        A[src/data/resume.ts] -->|Exports Profile, Experience, Projects, Skills| B[Typed Data Models]
    end

    subgraph StateLayer [2. State and Lifecycle Layer]
        C[useActiveSection] -->|IntersectionObserver| D[Navbar Navigation State]
        E[useCopyToClipboard] -->|Async Clipboard API| F[Interactive Contact Triggers]
        G[Perlin Noise Engine] -->|RequestAnimationFrame| H[HTML5 Canvas Particle Field]
    end

    subgraph ComponentLayer [3. UI and Component Composition]
        B --> I[App.tsx Root Layout]
        D --> I
        I --> J[Navbar]
        I --> K[Hero Section]
        I --> L[About and Stats Section]
        I --> M[Experience Timeline]
        I --> N[Projects Grid]
        I --> O[Skills Index]
        I --> P[Education and Certifications]
        I --> Q[Contact and Footer]
    end

    subgraph BuildLayer [4. Build and Delivery Pipeline]
        I --> R[Tailwind CSS v4 Engine]
        R --> S[Vite Bundler and Tree Shaking]
        S --> T[Static Distribution dist]
        T --> U[Vercel Edge Network]
    end
```

### Execution Flow

1. **Data Ingestion**: All user data, metrics, experience history, and project details are loaded from `src/data/resume.ts`. No raw text is hardcoded inside UI components.
2. **Canvas and Particle Initialization**: The Hero section mounts a customized 2D HTML5 canvas that calculates a continuous Perlin noise flow field on `requestAnimationFrame` with zero external canvas dependencies.
3. **Viewport Tracking**: The custom `useActiveSection` hook registers `IntersectionObserver` instances on each section element, dynamically synchronizing scroll position with the header navigation indicator.
4. **Motion Orchestration**: Framer Motion handles staggered section reveals, scroll-based text resolutions, and hover state transitions.
5. **Compilation and Edge Distribution**: TypeScript types are validated (`tsc --noEmit`), Vite bundles and compresses assets, and the resulting static build is deployed directly to the Vercel Edge Network.

---

## Key Features

- **Editorial Monochrome Design**: Typographical scale featuring tight display headlines, italic accents, and monospaced labels.
- **Perlin Flow Field Particle Engine**: Interactive background canvas with fluid motion.
- **Dynamic Typewriter and Marquee**: Multi-role text rotator and continuous tech stack ticker.
- **Scroll-Driven Text Reveal**: Word-by-word paragraph animations powered by Framer Motion.
- **Single Source of Truth Architecture**: All resume content, projects, experience, education, and skills are decoupled into `src/data/resume.ts`.
- **Responsive and Accessible**: WCAG AA contrast compliance, keyboard navigation support, and reduced-motion handling.
- **Modern Build Tooling**: Built on React 19, Vite 6, and native Tailwind CSS v4.

---

## Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Core Framework** | React 19, TypeScript, Vite 6 |
| **Styling and Design** | Tailwind CSS v4, Custom CSS Variables |
| **Animations and Effects** | Framer Motion, Custom Perlin Canvas Engine |
| **Icons and Utilities** | Lucide React, clsx, tailwind-merge |
| **Deployment** | Vercel |

---

## Quick Start

### Prerequisites

Node.js 18 or higher is required.

```bash
node -v
npm -v
```

### Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/namaysingh3925/cogks.git
   cd cogks/portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The local application will run at `http://localhost:5173`.

### Production Build

To compile the application for production:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## Project Structure

```text
portfolio/
├── index.html
├── vite.config.ts
├── package.json
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── data/
    │   └── resume.ts
    ├── components/
    │   ├── Navbar.tsx
    │   ├── Hero.tsx
    │   ├── About.tsx
    │   ├── Experience.tsx
    │   ├── Projects.tsx
    │   ├── Skills.tsx
    │   ├── Education.tsx
    │   ├── Contact.tsx
    │   └── ui/
    │       ├── Layout.tsx
    │       ├── Display.tsx
    │       ├── PillButton.tsx
    │       ├── ScrollRevealText.tsx
    │       └── fluid-particles-background.tsx
    ├── hooks/
    │   ├── useActiveSection.ts
    │   └── useCopyToClipboard.ts
    └── lib/
        └── utils.ts
```

---

## Content Customization

To modify the portfolio contents, edit `src/data/resume.ts`:

- **Personal Information**: Update name, bio, social profiles, and email address.
- **Experience**: Edit professional background, roles, descriptions, and technology stacks.
- **Projects**: Manage project entries, descriptions, repository links, and live URLs.
- **Skills**: Configure skill proficiencies across categories (Frontend, Backend, ML / Data, Tools).
- **Education and Certifications**: Update academic qualifications and professional credentials.

---

## Deployment Guide (Vercel)

This project is configured for deployment on Vercel.

1. Push your repository to GitHub.
2. Navigate to Vercel and import the repository (`cogks`).
3. Set the following configuration parameters:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `portfolio`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Select **Deploy**.

---

## Contact and Connect

Namay Singh — AI/ML Engineer and Full-Stack Developer

- **LinkedIn**: [linkedin.com/in/namay-singh](https://www.linkedin.com/in/namay-singh-421160379/)
- **GitHub**: [github.com/namaysingh3925](https://github.com/namaysingh3925)
- **Email**: [namaysingh5@gmail.com](mailto:namaysingh5@gmail.com)

---

<div align="center">
  <sub>Built with React 19, Vite, and Tailwind CSS.</sub>
</div>
