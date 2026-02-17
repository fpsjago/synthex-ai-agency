# SYNTHEX — Customization Guide

## Color Skins

This template ships with 3 color variants. Switch them via the color picker in the bottom-right corner, or set the default in code.

| Skin | Primary | Accent | `data-skin` value |
|------|---------|--------|-------------------|
| Cyan (default) | `#00D4FF` | `#39FF14` | `default` |
| Violet | `#7C3AED` | `#06B6D4` | `violet` |
| Amber | `#F59E0B` | `#0D9488` | `amber` |

### Change the Default Skin

Edit `src/layouts/BaseLayout.astro`, find the FOUC-prevention script and change:

```js
const skin = localStorage.getItem('synthex-skin') || 'default';
```

To e.g. `'violet'` to make violet the default.

Or set the `data-skin` attribute on the `<html>` element:

```html
<html lang="en" data-theme="dark" data-skin="violet">
```

### Create a Custom Skin

Add a new block to `src/styles/skins.css`:

```css
:root[data-skin="rose"] {
  --color-cyan: #F43F5E;
  --color-cyan-dim: rgba(244, 63, 94, 0.15);
  --color-cyan-border: rgba(244, 63, 94, 0.35);
  --shadow-cyan: 0 0 40px rgba(244, 63, 94, 0.2);
  --color-green: #8B5CF6;
  --color-green-dim: rgba(139, 92, 246, 0.12);
  --shadow-green: 0 0 40px rgba(139, 92, 246, 0.2);
}
```

Then add it to the `SKINS` array in `src/components/SkinSwitcher/SkinSwitcher.tsx`.

---

## Colors

All colors are defined as CSS custom properties in `src/styles/global.css`:

```css
:root {
  --color-bg: #0A0A0A;
  --color-bg-secondary: #111111;
  --color-surface: #161616;
  --color-text-primary: #F5F5F0;
  --color-text-secondary: rgba(245, 245, 240, 0.65);
  /* ... */
}
```

Light mode overrides are in `[data-theme="light"] { ... }`.

---

## Typography

Fonts are loaded via Fontshare in `src/styles/fonts.css`:

- **Heading**: Clash Display
- **Body**: General Sans
- **Mono**: JetBrains Mono

To change fonts:
1. Update the `@font-face` or `@import` in `src/styles/fonts.css`
2. Update `--font-heading`, `--font-body`, `--font-mono` in `src/styles/global.css`

---

## Logo

Edit `src/components/Navigation/Navigation.astro`:

```astro
<span class="nav-logo-mark">SX</span>
<span class="nav-logo-text">SYNTHEX</span>
```

Replace with your initials and company name.

---

## Site Config

Update `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://yourdomain.com',
  base: '/',  // Remove base if deploying to root domain
  // ...
});
```

> **Note:** When deploying to a custom domain (not a GitHub Pages subdirectory), set `base: '/'`.

---

## Navigation Links

Edit `src/components/Navigation/Navigation.astro`:

```js
const navItems = [
  { label: 'Services', href: `${base}services/` },
  { label: 'Work', href: `${base}work/` },
  // Add or remove items here
];
```

---

## Images

Replace images in `public/images/` with your own photography. Update `IMAGE-CREDITS.md` with new attributions.

For Astro-optimized images (WebP, AVIF), place images in `src/assets/` and use:

```astro
---
import { Image } from 'astro:assets';
import myImage from '../assets/my-image.jpg';
---

<Image src={myImage} alt="Description" width={1200} height={630} />
```

---

## Animations

### Disable Smooth Scroll

In `src/layouts/BaseLayout.astro`, comment out or remove the Lenis initialization block.

### Disable GSAP Animations

Remove the `.js-reveal` class from elements you don't want animated.

### Magnetic Buttons

Add `data-magnetic` attribute to any `<a>` or `<button>` element:

```html
<a href="/contact/" class="btn btn-primary" data-magnetic>
  Contact Us
</a>
```

### 3D Card Tilt

Add `data-tilt` attribute to any card element, or use the `.case-card` or `.team-card` class.

---

## Dark / Light Mode

The theme toggle is in the navigation. Theme preference is stored in `localStorage` under the key `synthex-theme`.

To default to light mode, change in `src/layouts/BaseLayout.astro`:

```js
const theme = stored || (prefersDark ? 'dark' : 'light');
```

To:

```js
const theme = stored || 'light';
```
