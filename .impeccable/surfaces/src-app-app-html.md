---
version: 1
slug: "src-app-app-html"
primary_target: "src/app/app.html"
related_targets: ["src/styles/global.scss", "src/app/app.scss"]
---

# Mapping toolkit

Scope: the five utilities in `src/app/app.html`: EBPM, NJS, Color Picker, SPS
Difference, and Random Pattern. Mode: Operate. Preserve their calculations,
inputs, generated data, stable hash links, and the static deployment base.

## Direction contract

**THESIS:** A companion to MapCheck, not a dashboard of decorative cards. Choose
a tool and work in one focused instrument panel; switching tools keeps their
inputs intact.

**OWN-WORLD:** MapCheck's blue-black surfaces, steel rules, restrained cyan
selection, italic Teko operational headings, system-font explanations, and
tabular numeric data. Small corners, no gradients, no decorative illustrations.

**STORY:** A mapper finds the right utility, edits clearly labeled inputs, reads
the nearby result, and corrects invalid input without losing valid work.

**COMPACTNESS:** Minimize scrolling in all five tools. Give primary inputs and
results the first viewport. Reduce excess chrome and spacing and use available
desktop width. Show reference data and JSON editors directly; do not hide tool
content in collapsible sections. Keep labels readable and controls
touch-friendly on phones; do not replace ordinary page scrolling with clipped
content or forced viewport heights.

**FIRST VIEWPORT:** A compact product header with sibling-project and source
links. A narrow left tool rail frames a generous active workspace, starting with
effective BPM. At 900px and below, a header menu button opens the vertical
navigation in a left-side modal drawer instead of a horizontal tool strip. The
workspace remains full width when the drawer is closed. Theme selection stays
reachable in the header.

**FORM:** User-pinned MapCheck companion interface; this explicit reference
overrides direction seed `7a915c17` and its assigned index 6. No alternative
visual world or comp is needed. Code-led implementation uses the reference
project's rendered screenshots and tokens as the finish bar.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, DESIGN.md, and every shipping raster carrying its
provenance.
