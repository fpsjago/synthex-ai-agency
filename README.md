# SYNTHEX — Premium AI Agency Astro Template

A premium, hand-crafted website template for AI agencies and automation companies, built with **Astro 5 + React 19 + TypeScript**.

**Live Demo:** [fpsjago.github.io/synthex-ai-agency](https://fpsjago.github.io/synthex-ai-agency/)

---

## Features

- **Astro 5** with static output + ViewTransitions
- **React 19** interactive islands
- **TypeScript** strict mode throughout
- **Custom CSS** (no Tailwind) with CSS Modules
- **Lenis smooth scroll** (wheelMultiplier: 1.8)
- **GSAP ScrollTrigger** scroll animations
- **3 color skin variants** (Cyan, Violet, Amber) with live switcher
- **Magnetic buttons** + **3D card tilt** interactions
- **Dark / Light mode** with localStorage persistence
- **Content Collections** for Blog, Services, Case Studies
- **Real photography** from Unsplash (optimized)
- **Custom cursor** + gradient mesh backgrounds
- **Mobile-first responsive** (375px → 1920px)
- **6+ pages**: Home, About, Services, Work, Pricing, Blog, Contact

---

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+ (or pnpm)

### Install

```bash
git clone https://github.com/fpsjago/synthex-ai-agency.git
cd synthex-ai-agency
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:4321/synthex-ai-agency/](http://localhost:4321/synthex-ai-agency/)

### Build

```bash
npm run build
```

Output goes to `dist/`.

### Preview Built Site

```bash
npm run preview
```

---

## Project Structure

```
synthex-ai-agency/
├── public/
│   ├── images/          # Unsplash photography
│   └── favicon.svg
├── src/
│   ├── components/      # UI components
│   ├── content/         # Content Collections (blog, services, case-studies)
│   ├── layouts/
│   │   └── BaseLayout.astro   # Global layout (Lenis, GSAP, cursor)
│   ├── pages/           # Astro pages
│   ├── styles/
│   │   ├── global.css   # Design tokens + reset
│   │   ├── fonts.css    # Font imports
│   │   └── skins.css    # Color skin variants
│   └── types/           # TypeScript type definitions
├── astro.config.mjs
├── package.json
├── CUSTOMIZATION.md
├── DEPLOYMENT.md
└── IMAGE-CREDITS.md
```

---

## Content Editing

All content lives in `src/content/`:

- **Blog posts**: `src/content/blog/*.md`
- **Case studies**: `src/content/case-studies/*.md`
- **Services**: `src/content/services/*.md`

### Adding a Blog Post

Create `src/content/blog/my-post.md`:

```md
---
title: "My Post Title"
description: "Brief description."
publishDate: "2025-03-01"
author: "Author Name"
category: "Technical"
readTime: 8
featured: false
---

Post content here...
```

---

## License

Commercial use permitted. Attribution to [jagoFps](https://jagofps.dev) appreciated.
