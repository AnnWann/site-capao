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

Interaction detail (tap vs drag):
- To avoid conflict with image click handlers inside slides, the carousel now requires a short press-and-hold (about 180ms) before starting a drag. This means:
	- Quick taps on images inside a slide will register as clicks and can open the `Lightbox`.
	- Press-and-hold then drag will start the carousel drag and will not open the `Lightbox`.

## `Card` (`src/components/Card.tsx`)
Props:
- `src: string` — image path (use paths under `/fotos/...` in `public`)
- `title?: string` — caption shown over a gradient
- `heightClass?: string` — tailwind height classes (e.g., `h-64 md:h-[48vh]`)

Behavior:
- Detects image orientation on `onLoad`; portrait images use `object-contain` to avoid severe cropping, landscape images use `object-cover`.
- Provides a data-URI SVG fallback when image loading fails.

Click behavior:
- The `Card` image uses pointer handlers to distinguish taps from drags. A quick tap opens the `Lightbox`, while movement above a small threshold during the press prevents opening (so drags in a carousel do not trigger the lightbox).

## `Lightbox` (`src/components/Lightbox.tsx`)
Props:
- `src: string` — image URL
- `alt?: string` — alt text
- `title?: string` — optional caption shown under the image
- `onClose: () => void` — callback to close the lightbox

Behavior:
- Renders an overlay centered on the viewport using a React portal (so it is not clipped by transformed/overflow parents).
- Darkens the rest of the page, prevents body scrolling while open, and closes on backdrop click, Escape, or the close button.

Notes:
- The lightbox is single-image only by default. It can be extended with prev/next navigation if you want gallery navigation inside the overlay.

## Usage notes
- Prefer keeping images in `public/fotos/` and referencing them with `/fotos/<name>`.
- Tune `SlideWidthFactor` (e.g., 0.97) in `Galeria` to increase visual scale while avoiding peek.

---
If you want, I can add Storybook stories or small example pages showing each component in isolation.