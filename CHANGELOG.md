# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Skill manifest served from `public/SKILL.md`, so `npx skills add raulmoracode/neuroskill` can fetch it.
- Landing hero with install and usage commands, each with a copy-to-clipboard button.
- Landing styles in `src/index.css`, loaded outside any cascade layer so they take precedence over Tailwind's base layer.
- Site commands and links in `src/config/site.ts`, next to the existing site identity values.

### Changed

- `vitest.config.ts` now merges the Vite config so the `@` alias resolves in tests.

### Fixed
