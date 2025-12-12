
# Pousada Espaço Gaia — Site

This repository contains the Vite + React + TypeScript site used for the Pousada Espaço Gaia.

Summary
- Framework: Vite + React + TypeScript
- Styling: Tailwind-style utilities
- Dev server: Vite (`npm run dev`)
- Build output: `dist` (used for static hosting / Vercel)
- Access the website here: pousadagaia.com.br

Quick Start
1. Install dependencies

```bash
npm install
# Pousada Espaço Gaia — Site

This repository contains a Vite + React + TypeScript single-page site for Pousada Espaço Gaia (Vale do Capão).

Overview
- Framework: Vite + React + TypeScript
- Styling: Tailwind utility classes
- Dev: `npm run dev` (Vite)
- Build output: `dist`

Quick start
1. Install dependencies

```bash
npm install
```

2. Run development server

```bash
npm run dev
```

Open the URL shown by Vite (typically http://localhost:5173).

Structure (important files)

```
public/                # static assets (photos, etc.)
src/
  components/          # reusable components (Carousel, Card, Nav, Footer, ArrowNav...)
  sections/            # page sections (Inicio, Acomodacoes, Atracoes, Galeria, Reservas, Localizacao)
  util/                # helpers (navigation.tsx, infos.ts, fotos.ts)
  styles/               # global styles (global.css)
  App.tsx               # app shell and routing by hash
  main.tsx              # React entry
docs/                  # deployment and structure notes
```

Developer notes
- Navigation: the app navigates between `SectionId` identifiers. See `src/util/navigation.tsx` for helpers.
- Carousel: `src/components/Carousel.tsx` supports pointer drag, autoplay, arrows and dots.
- Images: place photos under `public/fotos/` and update `src/util/fotos.ts` when adding/removing.

Suggested next steps (optional)
- Add tests for `src/util/navigation.tsx` and key components (React Testing Library).
- Add CI (GitHub Actions) that runs `npm ci && npm run build` on push.
- Optimize images (AVIF/WebP, srcset, lazy-loading) for production.

Deploy
- Build with `npm run build` and publish `dist` to Vercel, Netlify or any static host.
- See `docs/deploy-vercel.md` for Vercel-specific notes.

Contact / Credits
- Built for Pousada Espaço Gaia. For content edits, update `src/sections/` and `public/fotos/`.

License
- The Unlicense
