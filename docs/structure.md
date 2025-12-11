# Project Structure

This file describes the main folders and important files in the repo.

- `public/`
  - Static assets that are copied as-is to the build output. Images used by the site live under `public/fotos/`.
- `src/`
  - `components/` — reusable UI components (Carousel, Card, Lightbox, etc.)
  - `sections/` — each top-level page/section is a component (Inicio, Galeria, Acomodacoes, Reservas, Localizacao)
  - `sections/` — each top-level page/section is a component (Inicio, Galeria, Acomodacoes, Reservas, Localizacao)
    - New: `Atracoes.tsx` — Atrações Turísticas (waterfalls) carousel. Images for nearby attractions can live in `public/fotos/cachoeiras/`.
  - `util/` — helper data and utilities (`fotos.ts` exports the canonical photo list)
  - `App.tsx` — page wrapper, hash-driven navigation and transition orchestration
  - `main.tsx` — React entry (mount point)
- `package.json` — scripts and dependencies
- `vite.config.ts` — Vite configuration
- `docs/` — documentation (this folder)

Notes
- `public/fotos/` is the single authoritative location for gallery and accommodation images.
- The `Carousel` component renders 3 panels (prev/current/next) to avoid layout peeking bugs. It exposes a `slideWidthFactor` prop to tune slide inset.
- `Card.tsx` handles image fallback and portrait/landscape fit.

If you add or rename images, update `src/util/fotos.ts` accordingly.