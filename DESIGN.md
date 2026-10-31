---
name: Beat Saber Mapping Utility
description: A focused toolkit of five mapping utilities for Beat Saber mappers.
colors:
  accent: "#21d4fd"
  accent-surface: "#12303f"
  background: "#0a0a0a"
  border: "#42526a"
  danger: "#ff7c89"
  danger-surface: "#2b1821"
  backdrop: "rgb(0 0 0 / 70%)"
  divider: "#2b384b"
  input: "#0c1119"
  muted: "#b4c0d0"
  on-accent: "#061018"
  surface: "#171717"
  surface-raised: "#1a2330"
  text: "#f5f8fc"
  light-accent: "#00667c"
  light-accent-surface: "#d9f0f5"
  light-background: "#edf2f7"
  light-border: "#8394a9"
  light-danger: "#b51e39"
  light-danger-surface: "#fff0f2"
  light-divider: "#cbd5e1"
  light-input: "#f4f7fa"
  light-muted: "#495c73"
  light-on-accent: "#ffffff"
  light-surface: "#ffffff"
  light-surface-raised: "#e3ebf3"
  light-text: "#172538"
  monochrome-accent: "#ffffff"
  monochrome-accent-surface: "#333333"
  monochrome-background: "#090909"
  monochrome-border: "#666666"
  monochrome-danger: "#ffffff"
  monochrome-danger-surface: "#303030"
  monochrome-divider: "#383838"
  monochrome-input: "#0e0e0e"
  monochrome-muted: "#bdbdbd"
  monochrome-on-accent: "#080808"
  monochrome-surface: "#151515"
  monochrome-surface-raised: "#252525"
  monochrome-text: "#f5f5f5"
typography:
  display:
    fontFamily: "'Teko', 'Arial Narrow', sans-serif"
    fontSize: "clamp(2rem, 3vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
  title:
    fontFamily: "'Teko', 'Arial Narrow', sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.1
  headline:
    fontFamily: "'Teko', 'Arial Narrow', sans-serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.1
  action:
    fontFamily: "'Teko', 'Arial Narrow', sans-serif"
    fontSize: "1.2rem"
    fontWeight: 600
    lineHeight: 1.1
  navigation:
    fontFamily: "'Teko', 'Arial Narrow', sans-serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.1
  body:
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.5
  code:
    fontFamily: "Monaco, Consolas, monospace"
    fontSize: "0.8125rem"
    lineHeight: 1.6
  caption:
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
  mobile-navigation:
    fontFamily: "'Teko', 'Arial Narrow', sans-serif"
    fontSize: "1.15rem"
    fontWeight: 600
    lineHeight: 1.1
  mobile-headline:
    fontFamily: "'Teko', 'Arial Narrow', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 600
    lineHeight: 1.1
  drawer-title:
    fontFamily: "'Teko', 'Arial Narrow', sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.1
  mobile-display:
    fontFamily: "'Teko', 'Arial Narrow', sans-serif"
    fontSize: "clamp(1.5rem, 6vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.1
rounded:
  square: "0"
  sm: "2px"
spacing:
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "1.5rem"
components:
  button-default:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.text}"
    typography: "{typography.action}"
    rounded: "{rounded.sm}"
    padding: "8px 18px"
    height: "36px"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.action}"
    rounded: "{rounded.sm}"
    padding: "8px 18px"
    height: "36px"
  input:
    backgroundColor: "{colors.input}"
    textColor: "{colors.text}"
    rounded: "{rounded.sm}"
    padding: "4px 10px"
    height: "36px"
  tool-panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.sm}"
  nav-active:
    backgroundColor: "{colors.accent-surface}"
    textColor: "{colors.accent}"
    typography: "{typography.navigation}"
    rounded: "{rounded.square}"
---

# Design System: Beat Saber Mapping Utility

## Overview

**Creative North Star: "MapCheck's Focused Workbench"**

This is a companion instrument panel for Beat Saber mappers. In Dark, the page
and main panels use charcoal. Inputs keep their blue tint, and cyan marks
action, focus, and selection. Light shifts to cool, pale surfaces and deep teal;
Monochrome reduces the palette to black, white, and gray. All three themes
preserve the same semantic roles. Depth comes from tonal surfaces and borders,
not gradients or shadows.

Operational headings, tool labels, and actions use locally hosted Teko;
explanations stay in a system sans-serif, while numeric results use tabular
figures. The workspace shows one utility at a time. Selecting another tool
updates its stable URL hash and hides the other panels without discarding their
inputs.

**Key Characteristics:**

- Three selectable semantic palettes: Dark, Light, and Monochrome.
- Italic uppercase Teko for operational hierarchy; system sans-serif for
  explanations; tabular numeric output.
- One active tool panel, with a desktop rail that opens as a left-side drawer on
  compact screens.
- Near-square controls and panels, steel dividers, restrained accent selection,
  and no decorative chrome.

## Colors

The frontmatter contains the exact role values for the default Dark theme and
the Light and Monochrome overrides. Theme changes keep the same surface, text,
accent, and error roles.

### Primary

- **Accent** (`accent`): Links, keyboard focus, selected tools, highlighted
  metrics, and primary actions.
- **Accent surface** (`accent-surface`): The subdued fill behind a selected
  navigation item.
- **On accent** (`on-accent`): Text and icons placed on the accent fill.

### Neutral

- **Canvas and surfaces** (`background`, `surface`, `surface-raised`, `input`):
  Separate the page, tool panel, raised controls, and editable fields.
- **Text** (`text`, `muted`): Primary reading contrast and supporting labels or
  hints.
- **Rules** (`border`, `divider`): Panel outlines and quieter internal
  separators.

### Status

- **Invalid input** (`danger`, `danger-surface`): Error text, invalid-field
  outlines, and error messages use the same semantic pair.
- No success feedback style is currently applied by the interface.

## Typography

**Display Font:** `typography.display` - locally hosted Teko with an Arial
Narrow and sans-serif fallback. **Body Font:** `typography.body` - the system
sans-serif stack. **Label/Mono Font:** `typography.label` for field labels;
`typography.code` for structured or code-like values.

**Character:** Teko gives the operational interface a compact, italic, uppercase
voice. System text keeps explanations and controls familiar. Tabular numerals
help users compare values. The Teko face is self-hosted at
`src/assets/fonts/teko.ttf`. The `@font-face` rule in `src/styles/_base.scss`
loads it with weights 300-700 and `font-display: swap`. The page does not
preload the font. It comes from Google Fonts' `google/fonts` `ofl/teko` source.
Its SIL Open Font License 1.1 is kept in `src/assets/fonts/OFL.txt`.

### Hierarchy

- **Display** (`typography.display`): The product heading; scales with viewport
  width.
- **Headline** (`typography.headline`): Tool headings; the h2 tier reduces to
  1.75rem below 760px.
- **Title** (`typography.title`): Smaller section headings in Teko.
- **Action / Navigation** (`typography.action`, `typography.navigation`): Italic
  uppercase button and tool-link labels.
- **Body** (`typography.body`): Explanations, descriptions, and long-form field
  hints. Paragraphs cap at 72ch.
- **Label** (`typography.label`): Compact, semibold field and group labels.
- **Structured values** (`typography.code`): Text areas and code-like table
  values; numeric outputs use tabular figures.

## Layout

The centered app frame stops at 92rem and uses a fluid side gutter. The desktop
tool rail is 12.5rem wide, narrowing to 11.5rem below 1150px. At 900px and
below, a menu button in the header opens the navigation as a left-side drawer
instead of a horizontal tool strip. At 760px general form groups stack, while
Random Pattern choices retain two columns. SPS keeps five aligned difficulty
inputs, with each reduction directly below its corresponding input and the total
below the row. The theme selector stays in the header.

Standard controls have a 36px minimum height on desktop and a 44px minimum below
760px. The desktop theme selector is a 32px exception. Color comparison values
sit in one three-column row below the channel table at every screen size, with
labels above their values. Labels wrap on smaller screens without stacking the
metrics.

Both NJS calculator input groups use one compact label-and-control row per
field. Each group is capped at 20rem, with controls capped at 8rem. Keep units
and validation errors visible without repeating minimum values as helper text.
The JD adjustment selector uses the short NJS and HJD labels.

Tool content uses a 1.25rem inset on desktop and 1rem on phones. Reduce excess
spacing before reducing readability. Inputs, results, NJS references, and color
JSON editors stay visible without collapsible sections. NJS results and pattern
timing limits sit side by side on desktop and stack on phones. Color channels
use a compact row layout on phones; other wide tables scroll within their own
region rather than expanding the page.

## Elevation & Depth

The interface is flat: no box shadows. A raised control surface, the main tool
surface, and the page canvas create depth through tonal steps. Steel-colored
borders establish panel edges; quieter dividers separate content inside a panel.

## Shapes

The form language uses the shared `rounded.sm` token for buttons, fields, and
panels. Navigation tabs have square corners. Thin borders define controls and
panels. Selection adds a bottom accent rule instead of a pill or oversized card
treatment. Preview and table regions clip or scroll their own content rather
than adding decorative silhouettes.

## Components

### Buttons

- **Shape:** Reuse `rounded.sm` and the shared minimum height from the component
  tokens.
- **Default:** Raised-surface fill, primary text, steel border, and Teko action
  label.
- **Primary:** Accent fill with its paired on-accent text.
- **Hover / Focus:** Hover strengthens the border to the accent; the primary
  variant brightens. Keyboard focus uses the shared visible outline.

### Cards / Containers

- **Tool panel:** One bordered surface per active utility, with a title-only
  header and a padded content area. Do not add descriptive introductions,
  slogans, redundant group headings, or repeated results. Keep labels, units,
  non-obvious constraints, and actionable errors.
- **Shadow Strategy:** Flat; use the tonal surface steps and rules described in
  Elevation & Depth.

### Inputs / Fields

- **Style:** Input-surface fill, steel border, and the shared near-square
  corner. Standard text fields and selects use the shared control height.
- **Focus:** Accent border plus a 2px accent `:focus-visible` outline offset by
  4px.
- **Error / Disabled:** `[aria-invalid="true"]` uses the danger border; error
  messages pair danger text with the danger surface. Disabled controls reduce
  opacity and use a not-allowed cursor. Hints and recovery feedback stay close
  to their fields.
- Checkboxes and radios use the accent color; checkbox labels keep a full-size
  interaction area.

### Navigation

- The tool rail is a tab list with one visible panel. The selected tab uses the
  accent text, accent-surface fill, and bottom accent rule; hover uses the main
  surface.
- Tabs show only an icon and tool name, without subtitles, counts, or supporting
  prose.
- The tab list stays vertical at every screen size. Up/Down arrows move between
  tabs; Home and End jump to the ends.
- At 900px and below, the header menu button opens a native modal dialog styled
  as a left-side drawer. Keep the same navigation elements and active selection
  when moving between the desktop rail and drawer.
- The drawer uses a 70% black backdrop. Its 1.5rem title and close button stay
  visible while the tool list scrolls.
- Escape, the close button, and the backdrop dismiss the drawer and return focus
  to the menu button. Selecting a tool with a click, Enter, or Space closes the
  drawer and focuses the workspace. Arrow-key navigation keeps the drawer open.
  Lock background scrolling only while the drawer is open, and reset its modal
  state when resizing to the desktop layout.
- Each tool keeps its stable hash link. Selection updates the hash, and browser
  back/forward restores the active panel. Hiding inactive panels preserves their
  current inputs.
- The skip link stays offscreen until focused and moves keyboard users to the
  workspace. Under `prefers-reduced-motion: reduce`, transitions and animations
  are disabled and scroll behavior is automatic.

### Theme Selector

- The header select switches Dark, Light, and Monochrome. It restores the saved
  theme when browser storage is available and remains usable when storage is
  unavailable.

### Reference Data and JSON Editors

- Display reference data and JSON editors directly, not behind disclosure
  controls.
- The Color Picker JSON editor uses Custom Data, V2 Info, and V4 Info tabs with
  one editable format visible at a time.
- Use compact columns on desktop and stack them on phones. Keep inputs and
  validation feedback together.

### Icons and Mapping Art

- Tool navigation uses small inline line icons with current-color strokes, not a
  separate icon font. Preserve the existing favicon and note/bomb artwork as
  product assets; do not promote them into decorative page illustration.

## Do's and Don'ts

### Do:

- **Do** keep the Dark, Light, and Monochrome palettes on the same semantic
  color roles.
- **Do** use Teko for operational headings, tool labels, and actions; keep
  explanations in the system sans-serif.
- **Do** keep focus, selection, input, result, and invalid feedback clear within
  the active tool panel.
- **Do** preserve the existing favicon and note/bomb artwork as product assets.

### Don't:

- **Don't** add gradients, drop shadows, or decorative illustrations.
- **Don't** replace the near-square `rounded.sm` shape with pill controls or
  oversized rounded cards.
- **Don't** turn the tools into a decorative card grid or remove their stable
  hash navigation.
