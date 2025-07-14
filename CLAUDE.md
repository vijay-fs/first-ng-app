# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm start` or `ng serve` (runs on http://localhost:4200)
- **Build for production**: `npm run build` or `ng build`
- **Build in watch mode**: `npm run watch` (development configuration with auto-rebuild)
- **Run tests**: `npm test` or `ng test` (Karma/Jasmine test runner)
- **Generate components**: `ng generate component component-name`

## Architecture Overview

This is a modern Angular 20+ application using the new standalone component architecture and zoneless change detection.

**Key architectural decisions:**
- **Standalone components**: No NgModules, components declare their own dependencies via `imports`
- **Zoneless change detection**: Uses `provideZonelessChangeDetection()` instead of Zone.js
- **Signal-based state**: Uses Angular signals (e.g., `signal()`) for reactive state management
- **Inline templates/styles**: Component schematics configured for inline templates and styles
- **SCSS styling**: Global styles in `src/styles.scss`, component styles use SCSS

**Project structure:**
- `src/app/app.config.ts`: Application configuration with providers
- `src/app/app.routes.ts`: Routing configuration (currently empty)
- `src/app/app.ts`: Root component using standalone architecture
- `angular.json`: Angular CLI configuration with SCSS support and component defaults

**Development notes:**
- Uses the new Angular builder (`@angular/build:application`)
- Prettier configured with Angular HTML parser
- Analytics disabled in Angular CLI
- Bundle size limits: 500kB warning, 1MB error for initial bundles