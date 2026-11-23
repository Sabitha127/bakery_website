# Butter & Bloom Bakery — Responsive Update

This package contains the responsive UI updates for the existing Next.js frontend.

## Updated areas
- Header: fluid logo sizing, compact announcement bar, responsive navigation, cart sizing, and a single Login/account control per breakpoint.
- Home page: mobile-first hero layout with the sweets hamper image visible on mobile, responsive typography, category cards, product grids, brand story, and testimonials.
- Footer: single-column mobile layout, two-column tablet layout, and four-column desktop layout.
- Shared layout and CSS: explicit device viewport settings, consistent light page background, responsive width safeguards, flexible media and form controls.
- Other routes: fluid page wrappers and narrower mobile gutters; smaller mobile typography and spacing on selected pages; product detail image height adapted for mobile.

## Suggested browser test sizes

| Device | Width | Height |
|---|---:|---:|
| Small mobile | 320px | 640px |
| Mobile | 375px | 812px |
| Large mobile | 425px | 900px |
| Tablet | 768px | 1024px |
| Small laptop | 941px | 642px |
| Laptop | 1024px | 768px |
| Desktop | 1280px | 800px |
| Large desktop | 1440px | 900px |
| Full HD | 1920px | 1080px |

## Run locally

From the `Bakery/frontend` directory:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

To create a production build:

```bash
npm run build
```

## Notes
- `node_modules` and `.next` are intentionally not included; install dependencies locally with `npm install`.
- No `.env` secrets are included.
- The existing product data, cart context, localStorage authentication flow, routes, and project dependencies were retained.
- A TypeScript/TSX syntax transpilation check passed for all 20 TypeScript source files in this package.
- A full Next.js production build could not be run in the editing environment because project dependencies were not installed there. Please run `npm install` and `npm run build` locally to complete that check.
