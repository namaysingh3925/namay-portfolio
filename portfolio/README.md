# Namay Singh — Portfolio

A single-page, scroll-driven resume portfolio built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion** and **Lucide** icons.

Themed after **NexStudio** (TailGrids): an editorial, monochrome agency look — white
paper broken up by full-bleed black `rounded-4xl` panels, Inter at regular weight
in a very tight display scale with an italic tail on every heading, Anonymous Pro
for all mono labels, hairline rules instead of cards, and a drifting Perlin
particle field behind the hero.

---

## Quick start

From this folder (`portfolio/`):

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:5173>.

### From scratch (if you ever need to rebuild the toolchain)

```bash
npm create vite@latest portfolio -- --template react-ts
```

```bash
cd portfolio && npm install
```

```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

```bash
npm install -D tailwindcss @tailwindcss/vite @types/node
```

Tailwind v4 needs no `tailwind.config.js` — it is configured from CSS. Register the
Vite plugin in `vite.config.ts` and add `@import 'tailwindcss';` at the top of
`src/index.css`.

### Other commands

```bash
npm run build
```

```bash
npm run preview
```

```bash
npm run typecheck
```

---

## Project structure

```
portfolio/
├── index.html                  # Vite entry, fonts, meta tags
├── vite.config.ts              # React + Tailwind plugins, "@/" alias
└── src/
    ├── main.tsx                # React root
    ├── App.tsx                 # Section composition order
    ├── index.css               # Tailwind import, design tokens, keyframes
    ├── data/
    │   └── resume.ts           # ← ALL CONTENT LIVES HERE
    ├── lib/
    │   └── utils.ts            # cn() — clsx + tailwind-merge
    ├── hooks/
    │   ├── useActiveSection.ts # IntersectionObserver nav indicator
    │   └── useCopyToClipboard.ts
    └── components/
        ├── Navbar.tsx          # Thin bar, progress hairline, full-screen overlay menu
        ├── Hero.tsx            # Display headline, CTAs, particle field, tech marquee
        ├── About.tsx           # BLACK PANEL — scroll-reveal bio, stats, capabilities
        ├── Experience.tsx      # "#1" numbered expandable rows
        ├── Projects.tsx        # BLACK PANEL — cards with ruled meta bands
        ├── Skills.tsx          # Filter tabs + ruled proficiency index
        ├── Education.tsx       # Degree + certifications, hairline lists
        ├── Contact.tsx         # CTA + black footer with outlined wordmark
        └── ui/
            ├── Layout.tsx      # Container, Section, BlackPanel, Rise, Marquee
            ├── Display.tsx     # MonoLabel, Display, SectionHeading
            ├── PillButton.tsx  # Pill with arrow + hover text-swap
            ├── ScrollRevealText.tsx        # Word-by-word paragraph resolve
            └── fluid-particles-background.tsx  # Perlin flow field canvas
```

---

## Editing content

Everything on the page comes from [`src/data/resume.ts`](src/data/resume.ts) —
name, roles, bio, experience, projects, skills, education and certifications.
You should not need to touch a component to change what the site says.

## Before you publish — three things to fill in

1. **GitHub URL** — `profile.github` in `src/data/resume.ts` is a guess
   (`https://github.com/namaysingh`). Replace it with your real handle.
2. **Resume PDF** — the "Download Resume" button points at
   `/Namay-Singh-Resume.pdf`. Create a `public/` folder in this directory and
   drop the PDF in with that exact filename, or change `profile.resumeUrl`.
3. **Project links** — each project in `projects[]` accepts optional `demo` and
   `repo` URLs. Until you add them the buttons render in a muted
   "Demo soon" / "Private" state.

## Theming

Colours, fonts and animation timings are CSS custom properties in the `@theme`
block at the top of `src/index.css`, along with the `.display`, `.mono-label`,
`.stroke-text` and `.marquee-mask` treatments.

The palette is deliberately monochrome. Text colour is bound to its surface:

| Surface                 | Headings     | Body              | Meta               | Rules               |
| ----------------------- | ------------ | ----------------- | ------------------ | ------------------- |
| white `paper`/`paper-alt` | `text-ink`   | `text-ink-soft`   | `text-ink-faint`   | `border-line`       |
| black `panel`/`panel-2`   | `text-paper` | `text-panel-soft` | `text-panel-faint` | `border-panel-line` |

Values are chosen so every pairing clears WCAG AA: `ink-soft` ~8.2:1 and
`ink-faint` ~4.7:1 on white; `panel-soft` ~8.7:1 and `panel-faint` ~4.9:1 on
black. Never mix a column with the wrong surface.

Note: this project has **no dark mode**. Tailwind v4 resolves `dark:` from
`prefers-color-scheme`, not a class, so a stray `dark:` utility will fire on any
visitor whose OS is in dark mode and break the light design — don't add them.

## Accessibility notes

- All motion is disabled under `prefers-reduced-motion: reduce`.
- Nav, filter tabs and the timeline toggle are real buttons/links with
  `aria-expanded` / `aria-selected` state.
- The typewriter exposes the full role list to screen readers via `sr-only`.
