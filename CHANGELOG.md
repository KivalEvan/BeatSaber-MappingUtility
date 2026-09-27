# Changelog

## 3.0.0 [Unreleased]

### Added

- Added base color schemes:
   - Linkin Park 2.0
   - The Rolling Stones
   - Lattice
   - Daft Punk
   - Hip Hop
   - Collider
   - Britney Spears
   - Monstercat 2.0
   - Metallica
   - Cube
   - Coldplay
   - Prodigy
   - Hip Hop Mixtape 2
- Added color scheme variants.
- Added Info color scheme import and export to the Color Picker.
- Added dark, light, and monochrome themes with a saved theme preference.
- Added a sidebar menu for mobile and narrow screens.
- Added keyboard navigation between tools and a link to skip directly to the active tool.

### Changed

- Redesigned the interface to match BeatSaber-MapCheck and reduce scrolling.
- Tools now open in separate workspaces and retain their inputs when switching between tools.
- Tool selection supports direct links and the browser Back and Forward buttons.
- NJS reference tables and color JSON editors stay visible without expanding sections.
- SPS comparisons appear beneath their inputs, and color similarity results appear side by side.
- The Weeknd and Panic 2.0 color schemes now include white light values.
- Custom colors remain available when switching between color schemes.

### Fixed

- EBPM input errors no longer disappear when another field changes.
- Very large EBPM and SPS values no longer produce invalid numeric results.
- Imported colors outside the displayable range now have valid previews without changing their exported values.
- Invalid hex colors and malformed JSON now show clear error messages.
- Resetting colors or selecting a scheme now replaces invalid text and clears its error together.
- Color similarity shows N/A instead of invalid numbers when imported channels exceed the calculation range.
- Extremely large negative NJS offsets no longer replace valid calculations with invalid values.
- Incomplete SPS numbers now show an error instead of being treated as empty fields.
- Restoring the light theme also restores the matching browser toolbar color.
- Switching tools no longer adds extra space above panels after EBPM.

### Removed

- Removed Score Calculator.
- Removed Difficulty Label.
