# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    # Pousada Espaço Gaia — Site

    This repository contains the Vite + React + TypeScript site used for the Pousada Espaço Gaia.

    Summary
    - Framework: Vite + React + TypeScript
    - Styling: Tailwind-style utilities
    - Dev server: Vite (`npm run dev`)
    - Build output: `dist` (used for static hosting / Vercel)

    Quick Start
    1. Install dependencies

    ```bash
    npm install
    ```

    2. Run development server

    ```bash
    npm run dev
    ```

    3. Build for production

    ```bash
    npm run build
    ```

    4. Preview the `dist` folder locally

    ```bash
    npx serve dist
    ```

    Deploying
    - The project is ready for static hosting. Vercel is recommended and auto-detects Vite projects.
    - See `docs/deploy-vercel.md` for step-by-step instructions to deploy on Vercel and configure a `registro.br` domain.

    Project structure (important files)
    ```
    public/                # static assets (images, banner, etc.)
    src/
      components/          # reusable components (Carousel, Card, etc.)
      sections/            # page sections (Inicio, Galeria, Acomodacoes...)
      util/                # helper data (fotos.ts)
      App.tsx              # page wrapper and navigation
      main.tsx             # React entry
    package.json
    vite.config.ts
    docs/                  # documentation (deploy, structure, components)
    ```

    Important notes
    - Images: add images to `public/fotos/`. Filenames are referenced from `src/util/fotos.ts`.
    - Carousel: `src/components/Carousel.tsx` uses a 3-panel pattern (prev/current/next) and exposes `slideWidthFactor` to avoid peek.
    - Card: `src/components/Card.tsx` now detects portrait images and uses `object-contain` to avoid severe cropping.

    Useful commands
    - `npm run dev` — start dev server
    - `npm run build` — production build
    - `npx serve dist` — preview production build locally

    Documentation
    - See the `docs/` folder for deploy instructions, project structure and component notes.

    If you'd like, I can:
    - Add `vercel.json` with redirect rules (www ↔ apex),
    - Add a GitHub Action to build and deploy on push,
    - Expand docs with accessibility or testing notes.

    ---
    Made for Pousada Espaço Gaia — tell me which doc to expand next.
