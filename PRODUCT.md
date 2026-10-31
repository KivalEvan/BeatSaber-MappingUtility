# Beat Saber Mapping Utility

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Beat Saber mappers working on timing, note movement, colors, difficulty sets,
and pattern ideas.

## Product Purpose

A browser-based toolkit of five small, interactive mapping utilities. Users
adjust values and immediately inspect calculations, previews, or JSON without
uploading a map.

## Capabilities and Constraints

- Preserve Effective BPM & Time Precision, NJS Calculator, Color Picker, SPS
  Difference, and Random Pattern Generator.
- Preserve calculations, color scheme import/export, and pattern controls as the
  interface is refactored.
- Use standalone Angular components and preserve the
  `/BeatSaber-MappingUtility/` static deployment base.
- Keep dependencies free of reported audit vulnerabilities, including necessary
  major upgrades, without changing the app's package version.

## Brand Commitments

Keep the Beat Saber Mapping Utility name and author attribution. The user
selected the sibling BeatSaber-MapCheck project as the reference for the whole
toolkit's visual language and interaction patterns.

## Product Principles

- Keep all tools findable and usable with a keyboard and on smaller screens.
- Keep input, result, and recovery feedback together.
- Keep tool workspaces compact to reduce scrolling. Show inputs, results,
  reference data, and JSON editors directly; do not hide tool content in
  collapsible sections.
- Keep interface copy minimal: no slogans, tool descriptions, navigation
  subtitles, repeated results, or instructions that restate labels. Preserve
  units, non-obvious constraints, and actionable errors.
- Preserve readable text and touch-friendly controls on smaller screens rather
  than forcing every tool into one viewport.
- Do not introduce a backend, account requirement, or extra third-party
  dependencies for the redesign.
- Use Angular-scoped component styles and namespaced shared styles. Use BEM-like
  names when they improve readability, with related states and responsive rules
  nested together.
