# SYNTHEX — Deployment Guide

## Vercel (Recommended)

Vercel is the recommended platform for this template. Zero-config deployment.

### Option 1: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project root
cd synthex-ai-agency

# First deploy (interactive setup)
vercel

# Production deploy
vercel --prod
```

### Option 2: Vercel Dashboard (Git Integration)

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repository
4. Vercel auto-detects Astro — no configuration needed
5. Click **Deploy**

### Vercel Configuration

When deploying to a root domain (not a subdirectory), update `astro.config.mjs`:

```js
export default defineConfig({
  site: 'https://your-vercel-url.vercel.app',
  base: '/',  // Use '/' for root deployment
  // ...
});
```

And remove the `base` prefix from all hrefs, or update the base URL.

---

## GitHub Pages

Currently configured for GitHub Pages at `fpsjago.github.io/synthex-ai-agency`.

### Setup

1. Push to `master` branch
2. Go to repository Settings → Pages
3. Set source to **GitHub Actions**
4. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/
      - id: deployment
        uses: actions/deploy-pages@v4
```

---

## Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set environment variables if needed

For root domain deployment, update `astro.config.mjs`:
```js
site: 'https://your-site.netlify.app',
base: '/',
```

---

## Self-Hosted / VPS

```bash
npm run build
# Upload dist/ to your server
# Configure your web server to serve from dist/
```

### Nginx Example

```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /var/www/synthex/dist;
  index index.html;

  location / {
    try_files $uri $uri/ $uri.html =404;
  }
}
```

---

## Environment Variables

No environment variables are required for the static build. If you add server-side features (contact form API, CMS), create a `.env` file:

```env
PUBLIC_SITE_URL=https://yourdomain.com
# Add your API keys here
```

---

## Build Configuration

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist/` |
| Node version | 18+ |
| Package manager | npm |

---

## Switching from GitHub Pages to Custom Domain (Vercel)

1. Update `astro.config.mjs`:
   ```js
   site: 'https://synthex.yourdomain.com',
   base: '/',
   ```

2. Update all internal `href` prefixes (or leave as-is if you keep using `import.meta.env.BASE_URL`)

3. Deploy to Vercel and add your custom domain in the Vercel dashboard
