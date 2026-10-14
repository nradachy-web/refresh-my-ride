# Design

## The idea

A shop you would trust with a car you care about. Black like the shop at
night, their own violet where it counts, their own people in the photos. The
structure is the same band pattern on every page so a visitor arriving from an
ad always finds the same things in the same places: what it is, what it costs,
proof, how it works, how to start.

## Two planes

| Plane | Token | Use |
|---|---|---|
| Ink | `--ink` #07060b | Heroes, proof, process, the quote band, the footer |
| Paper | `--paper` #f6f5fa | Services, prices, questions |
| White | `--white` | A second light plane so two light bands can sit together |

Bands alternate. A page never puts two ink bands or two paper bands side by
side unless one is the hero or the quote band.

## One accent

The violet is sampled from their logo (`--violet` #a044fc). It is spent on
actions and small marks only: buttons, the accent phrase in a hero heading,
labels, ticks, the first number in a row of facts.

- White text on a button sits on `--violet-btn` #8a2ef0 (5.6:1).
- Violet text on a light plane is `--violet-ink` #6a1dcc.
- Violet text on ink is `--violet-soft` #c9a4ff.

Stars are gold. Nothing else has colour.

## One family

Mona Sans, self-hosted as a single variable file trimmed to the weights and
widths in use. Display type is wide (font-stretch 108 to 118) and heavy
(680 to 780), set tight. Reading type is normal width, 400 to 560.
Sentence case everywhere. Do not turn on tabular figures: in this font they
are a slashed-zero set that reads like code.

## Parts

- Radii are 4 and 6 pixels. No pills, no shadows, no gradients as decoration.
- Buttons: `btn primary` (violet) and `btn ghost` (outline). Two per group at most.
- Cards are a hairline border on white (or on `--ink-2` in an ink band).
- A hero is the photo on the right melting into ink, the keyword line and the
  display line inside one h1, a paragraph, up to four ticks, two actions and
  the Google rating.
- Numbers appear only in process steps.
- Every selling page ends with the quote band: the form beside the phone.
- On phones a bar with Call and Get a free quote stays at the bottom.

## Motion

One page-load moment, in the hero: the photo settles, a band of light passes
over the paint once, the words rise into place. About a second, transform
only. Below that, motion answers the visitor: cards lift, photos ease in,
arrows nudge, the menu and the accordions open. Nothing slides in on scroll.
(Scroll-linked motion was tried and removed: it put every sliding block on its
own compositor layer, which slowed the first paint.) A page with script off or
motion reduced is complete.

## Interactive panels

Three panels let a visitor try the thing before they call. Each sits in an ink
band on its service page and on that service's town pages.

- **Tint shades** (`Shades.astro`): one studio picture of a violet sedan in
  front of a light wall, and one transparent layer holding the same glass at
  its darkest. The chosen shade sets how much of that layer shows, so every
  step lines up to the pixel. Six choices (bare glass, then 75, 50, 35, 20 and
  5 percent), a slider whose resting points sit over the six buttons, and two
  small meters for privacy and seeing out. It is radio buttons underneath and
  works with script off. The picture was made for this site (sources in
  `src/assets/illustrations`); it is an illustration and the note says so.
- **Paint under the light** (`Swirl.astro`): a canvas of dark paint and an
  inspection lamp that follows the pointer or a finger. Three stages: before,
  one-step polish (their pages say it removes roughly 60 to 70% of light
  swirls) and multi-stage correction.
- **Water on the panel** (`Water.astro`): a canvas showing water sheeting on
  bare paint and beading on coated paint. It rinses once when it scrolls into
  view, again on request, and a drag sprays it.

Rules for all three: captioned as illustrations, never as a customer's car or
a test of a product; nothing is drawn or computed until the panel is near the
screen; reduced motion gets a still result; with script off the controls that
need script are hidden. New content blocks: `swirl` and `water` (heading
fields only) beside the existing `shades`.

Measured on the preview after they shipped (2026-10-13, real PageSpeed runs):
blocking time 0 ms and layout shift 0 on every phone run of the six pages that
gained a panel, and the phone performance spread (98 to 100) matched two pages
that did not change, run in the same batch. `docs/preview-panels.jpg` shows
all three.

## Photos

Their own work only. Phone photos, so they are cropped tight and set on ink
where the dark hides the car park. A caption names a vehicle only when their
own site did or the badge is plain. Never caption a photo as being from a town.

## Performance rules

These are why the pages score 100. Do not break them.

- No client framework and no external stylesheet. CSS is inlined.
- One font file, preloaded, `font-display: swap`, with metric-matched fallbacks.
- The hero image is preloaded, `fetchpriority="high"`, never lazy, never faded
  in from invisible (that delays the largest paint).
- Every image has width and height. Everything below the hero is lazy.
- Third parties wait for the visitor: the Google tag loads on first touch,
  scroll or key press, and the quote form loads when the visitor has touched
  the page and the form is near the screen.
- No web fonts for icons, no carousels, no video on load, no scroll-linked animation.
- One exception, asked for by Josh on 2026-10-14: the home hero crossfades six
  photos of finished cars (`HERO_SLIDES` in `src/pages/index.astro`). Only the
  first is in the page load and preloaded. The other five sit in a
  `<template>` and are fetched on the visitor's first touch, scroll or key
  press, or four seconds after the page has loaded, so a speed test measures
  the single photo. A pause button and dots appear once it starts. Reduced
  motion or data saving: no slideshow.

Measured on the preview on 2026-10-13 with Google PageSpeed Insights
(Lighthouse 13.5), more than 250 runs: Accessibility 100 and Best Practices 100
on every run, phone and desktop. Performance 100 on every desktop run. On
phone, pages without a hero photo score 100 every run; pages with one score 100
on most runs and 98 or 99 on the rest. The difference is one metric, Speed
Index, and it comes from the test machine: on some runs its first paint of a
page with a large photo arrives one or two seconds late, whatever the image
format. The studio's own fastest page scored 92 to 99 in the same hour. SEO
reads 66 on the preview only because the preview is noindex; the production
build scores 100.
