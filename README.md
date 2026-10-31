<img align="left" src="https://github.com/KivalEvan/BeatSaber-MapCheck/blob/main/public/img/icon-large.png" height="176" width="176">

# Beat Saber Mapping Utility

A side project for Beat Saber mapping.

by **Kival Evan#5480**

## Using the toolkit

Select a tool from the sidebar to open its workspace. On narrow screens, use the
menu button in the header to open the sidebar. Select a tool to close it, or
dismiss it with Escape, the close button, or the backdrop. Your inputs stay in
place when you switch tools. Reloading the page resets tool inputs. The Theme
selector offers dark, light, and monochrome appearances and remembers your
choice when browser storage is available. Dark uses neutral charcoal page and
panel backgrounds. Inputs keep their blue tint and controls keep cyan accents.
NJS references stay visible. The Color Picker JSON editor has tabs for Custom
Data, V2 Info, and V4 Info.

Each tool has a direct link, such as `#njs-calculator` or `#color-picker`. Use
Up and Down to move between focused tool tabs. Home and End select the first and
last tools. In the mobile sidebar, press Enter or Space to open the selected
tool and close the menu. The toolkit includes five tools:

- Effective BPM and time precision
- Note jump speed, jump distance, and reaction time
- Color schemes with Custom Data and Info JSON
- SPS differences across difficulties
- Random note patterns with parity controls

In the Color Picker, paste JSON into the matching format tab to import it.
Switch tabs to convert the current colors. V2 Info accepts a plain scheme or a
`{useOverride, colorScheme}` wrapper and exports the plain scheme.

V4 Info uses hex colors and overrides notes and lights by group. Its hex output
rounds channels to 8-bit values and projects out-of-range colors into the
displayable range; original numeric values stay in the editor. Excluded required
colors within an enabled group export as transparent black. Use Custom Data for
individual color inclusion.

## Development

### Start here

Use Node.js 22.22.3 or newer in the Node 22 series, Node 24.15.0 or newer in the
Node 24 series, or Node 26+. The GitHub Pages build uses Node.js 22. Angular 22
uses TypeScript 6.0.

From the project directory:

1. Run `npm ci` to install the locked dependencies.
2. Run `npm run dev` to open the development server at
   `http://localhost:4321/BeatSaber-MappingUtility/`.
3. Run `npm run check` after an edit to check TypeScript and Angular templates.

Run `npm run format:check` to check source formatting without changing files.
Run `npm run format` to apply formatting. Run `npm test` for the color import
regression checks. Pull requests run these checks alongside TypeScript,
template, formatting, and production build checks through GitHub Actions.

Start with the file that owns the change:

- Change page layout or tool links in `src/app/app.html` and `src/app/app.ts`.
- Change a tool's labels or controls in its HTML file under
  `src/app/tools/<tool-name>/`.
- Change calculations in the tool's calculation file, such as
  `ebpm-calculations.ts` or `jump-calculations.ts`.
- Change signals, validation, and input handling in the tool's component file,
  such as `ebpm.ts` or `njs-calculator.ts`.

### Follow an input through the code

A signal is a value that Angular tracks for updates. Read it with `results()`
and replace it with `results.set(nextResults)`. Each tool owns its signals, so
switching tools does not discard entered values.

For example, follow a tempo edit in the EBPM tool:

1. `ebpm.html` passes the input to `updateFromInput` in `ebpm.ts`.
2. The handler reads the number and rejects an empty, non-finite, or
   non-positive value.
3. `calculateEbpmResults` calculates possible results without changing saved
   values.
4. `areEbpmResultsValid` rejects numeric overflow, including overflow during
   display rounding.
5. The handler saves valid results or keeps the previous results and shows a
   field error.

The draft is the text that a user entered. Keep it separate from valid results
so that an invalid edit remains visible for correction.

### Styles

Use Angular's scoped component styles for feature-specific rules. Keep each
stylesheet beside its component. Small components can keep their templates and
styles inline.

Keep each BEM block at the top level. Nest its elements with `&__element` and
its modifiers with `&--modifier` directly inside the block. For example, define
`&__header` inside `.tool-panel`. These suffixes produce a single class
selector, not a descendant selector.

Keep unrelated classes at the top level. Use shallow nesting for related states,
child relationships, and responsive overrides, not to mirror the HTML structure.
Angular already scopes component styles, so do not add a `.root` wrapper just
for isolation.

Put declarations before nested rules. Separate logical blocks with blank lines,
and keep responsive overrides near the rules they change. Preserve selector
specificity and rule order when shared styles overlap. Avoid mixins or `@extend`
for rules that do not need reuse.

`src/styles/global.scss` loads the shared foundations, form controls, results,
and tool layout. Shared rules use the `form-`, `data-`, and `tool-` class
prefixes to avoid collisions with local component classes. The app's scoped
navigation styles live in `src/app/app-navigation.scss`.

Shared stylesheets use Sass partial filenames, which start with `_`. Keep their
responsibilities separate:

- `_theme.scss`: Theme colors and font variables, with theme variants nested
  under `:root`.
- `_base.scss`: Font loading, browser defaults, and typography.
- `_accessibility.scss`: Reduced-motion rules.
- `_forms.scss`: Field layout, shared control rules, control variants, and
  disabled states.
- `_data-display.scss`: Notes, metrics, tables, and messages. Keep table rules
  inside `.data-table`.
- `_tool-layout.scss`: Tool panels, groups, and grids, with BEM elements and
  modifiers nested inside their blocks.

Use plain class names in Angular templates. Use template references for element
access. Keep stable IDs for labels, hash links, and accessibility relationships.

### Component organization

Keep each standalone Angular tool in a folder under `src/app/tools`, with its
component, HTML template, stylesheet, and supporting logic. Keep
single-component signals, validation, and input handlers in the component class.
Separate independent calculations and format conversion from rendering. Keep
tool-specific data beside its owner, such as `custom-colors.ts` in the
color-picker folder. Extract shared state only when multiple owners need it.
Import files directly without adding barrel files that only re-export other
modules.

Keep small components such as `Icon`, `Watermark`, and `ToolSection` flat in
`src/app/ui`. The application shell lives directly in `src/app`. Its component
owns tool selection, browser history, and the mobile drawer. One Angular
template renders the navigation in either the sidebar or the drawer. Keep tool
panels mounted and use `[hidden]` to switch tools without discarding their
inputs. Before Angular initializes, ordinary links and all tool panels remain
available.

### Deploying

Run `npm run check` to check TypeScript and Angular templates. Run
`npm run build` to generate the static site in
`dist/angular/BeatSaber-MappingUtility/`. The build prerenders the page, so
static hosting does not need a Node.js server. GitHub Pages uploads this
directory.

Run `npm run preview` for a local server using the production build
configuration. This command builds from source.

After `npm run build`, run `npm run preview:static` to serve the generated files
at `http://127.0.0.1:4322/BeatSaber-MappingUtility/`. This command uses
`sirv-cli` and does not rebuild the site. After source changes, rebuild the site
and restart the static preview.

For another deployment path, update `baseHref` and `servePath` in `angular.json`
and the base element in `src/index.html`.

Tools import directly from `bsmap`. Version 3.0.2 and later provide browser
mappings, so no preparation script or generated bundle is needed. Angular copies
the installed library's license into the static site at
`licenses/bsmap/LICENSE`.

## Contributing

If you wish to contribute, do follow the guidelines. Make pull request for
feature addition/enhancement/fix or create an issue if you encounter
error/problem or want an improvement.

### Guidelines

- Follow the current [Angular style guide](https://angular.dev/style-guide)
  naming conventions, rather than the older 2016 conventions.
- Separate words in file and feature-folder names with hyphens, such as
  `color-picker/color-picker.ts` and `jump-calculations.ts`.
- Use PascalCase for class names, such as `ColorPicker` and `NjsCalculator`, and
  camelCase for functions and properties, such as `calculateJumpResults`.
- Match component filenames to their class names without adding a `Component`
  suffix. For example, `ColorPicker` lives in `color-picker.ts` and `App` lives
  in `app.ts`.
- Give each component's TypeScript, template, and stylesheet the same base name,
  such as `color-picker.ts`, `color-picker.html`, and `color-picker.scss`.
- Use one blank line between logical steps, such as input reading, validation,
  calculation, and state updates. Keep statements within each step together.
- Preserve framework route names and existing naming conventions for scripts and
  data files.
- Use formatting standard given in prettier config.
- Top-level function must use regular function.
- Use `dev` branch as base for new development and only merge here.
- No other third-dependencies unless absolutely necessary.
- Avoid circular imports.

Any beatmap related has to be done in
[Beat Saber Deno](https://github.com/KivalEvan/BeatSaber-Deno) repository
instead.
