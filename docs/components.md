# Components Notes

This document describes the main components and their important props.

## `Carousel` (`src/components/Carousel.tsx`)
Props:
- `items: T[]` — array of items to render
- `renderItem: (item, index) => JSX.Element` — render function used for each panel
- `heightClass?: string` — tailwind height class applied to the wrapper
- `interval?: number` — autoplay interval in ms (0 disables autoplay)
- `showDots?: boolean` — show pagination dots
- `showArrows?: boolean` — show next/prev arrows
- `slideWidthFactor?: number` — fraction of the wrapper width each slide should occupy (0 < v <= 1). Use values < 1 to inset slides and avoid peek.

Behavior:
- Renders three panels (prev/current/next) sized by `panelWidth = wrapperWidth * slideWidthFactor`.
- Animations are pixel-based; translateX is measured in px to avoid rounding/peeking artifacts.
- Supports pointer dragging and autoplay (pauses on interaction).

## `Card` (`src/components/Card.tsx`)
Props:
- `src: string` — image path (use paths under `/fotos/...` in `public`)
- `title?: string` — caption shown over a gradient
- `heightClass?: string` — tailwind height classes (e.g., `h-64 md:h-[48vh]`)

Behavior:
- Detects image orientation on `onLoad`; portrait images use `object-contain` to avoid severe cropping, landscape images use `object-cover`.
- Provides a data-URI SVG fallback when image loading fails.

## Usage notes
- Prefer keeping images in `public/fotos/` and referencing them with `/fotos/<name>`.
- Tune `SlideWidthFactor` (e.g., 0.97) in `Galeria` to increase visual scale while avoiding peek.

---
If you want, I can add Storybook stories or small example pages showing each component in isolation.