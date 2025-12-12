# Project Structure

This file describes the main folders and important files in the repo.

  - Static assets that are copied as-is to the build output. Images used by the site live under `public/fotos/`.
  - `components/` — reusable UI components (Carousel, Card, Lightbox, etc.)
  - `sections/` — each top-level page/section is a component (Inicio, Galeria, Acomodacoes, Reservas, Localizacao)
  - `sections/` — each top-level page/section is a component (Inicio, Galeria, Acomodacoes, Reservas, Localizacao)
    - New: `Atracoes.tsx` — Atrações Turísticas (waterfalls) carousel. Images for nearby attractions can live in `public/fotos/cachoeiras/`.
  - `util/` — helper data and utilities (`fotos.ts` exports the canonical photo list)
  - `App.tsx` — page wrapper, hash-driven navigation and transition orchestration
  - `main.tsx` — React entry (mount point)

Notes

If you add or rename images, update `src/util/fotos.ts` accordingly.
```markdown
# Project Structure

This file describes the main folders and important files in the repo.

- `public/`
  - Static assets that are copied as-is to the build output. Images used by the site live under `public/fotos/` (including `public/fotos/cachoeiras/` for attractions).
- `src/`
  - `components/` — reusable UI components (Carousel, Card, Lightbox, NavLinks, Navbar, HamburgerMenu, Footer, ArrowNav, ArrowButton, InfoGrid, etc.)
  - `sections/` — each top-level page/section is a component (Home/Inicio, Rooms/Acomodacoes, Amenities, Attractions/Atracoes, Gallery/Galeria, Booking/Reservas, Location/Localizacao)
  - `util/` — helper data and utilities (`fotos.ts`, `infos.ts`, `navigation.tsx`)
  - `styles/` — global styles moved from inline to `src/styles/global.css` (transitions and layout helpers)
  - `App.tsx` — app shell, hash-driven navigation and transition orchestration (keeps side-effectful state here)
  - `main.tsx` — React entry (mount point)
- `package.json` — scripts and dependencies (see `dev`, `build`)
- `vite.config.ts` — Vite configuration
- `docs/` — documentation (this folder)

Notes
- `public/fotos/` is the single authoritative location for gallery and accommodation images.
- Navigation: the canonical ordered section list is in `src/util/navigation.tsx` as `sectionOrder` and `SectionId` — use that when adding new sections.
- The `Carousel` component renders 3 panels (prev/current/next) to avoid layout peeking bugs and exposes `slideWidthFactor` to tune inset/peek behavior.
- `Card.tsx` handles image fallback and portrait/landscape fit.

If you add or rename images, update `src/util/fotos.ts` accordingly.