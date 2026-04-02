# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WME UA-address data is a TamperMonkey/GreaseMonkey userscript for Waze Map Editor (WME). It displays address polygons from a Ukrainian address database on the WME map, with configurable visibility, polygon fill, coordinate offset controls, and keyboard shortcuts.

Source is written in TypeScript under `src/`, built with Rollup into a single IIFE at `dist/WME_UA_address_data.user.js`. GreasyFork auto-syncs from the dist output.

## Commands

- **Install:** `npm install`
- **Build:** `npm run build`
- **Watch:** `npm run watch` (rebuild on changes)
- No test or lint steps exist.

## Architecture

```
src/
├── meta.ts              # userscript header (comment block, not TS code)
├── style.css            # plain CSS, imported as string
├── globals.d.ts         # declares WME runtime globals (WMEBase, WMEUI, etc.)
├── translations.ts      # NAME, SETTINGS, TRANSLATION (en, uk), requestsTimeout
├── layers.ts            # layerConfig (style rules for polygon rendering)
├── helpers.ts           # displayHtmlPage standalone function
├── ua-address-data.ts   # UAAddressData class (extends WMEBase)
└── index.ts             # bootstrap: registers translations/CSS, instantiates UAAddressData
```

**Build output:** `dist/WME_UA_address_data.user.js` — IIFE with userscript header prepended as banner. Version is read from `package.json` via `{{version}}` placeholder in `meta.ts`.

**Key external dependencies** (loaded via `@require` in userscript header, not bundled):
- WME-Bootstrap.js, WME-Base.js, WME-UI.js, CommonUtils.js (WME script ecosystem)
- wellknown.js v0.5.0 (WKT geometry parsing)

**Cross-origin requests:** Uses `GM_xmlhttpRequest` (old-style GM API with underscore) to fetch polygon data from `stat.waze.com.ua`.

## Coding Conventions

- TypeScript with `strict: false` — minimal type annotations, `any` for WME SDK types
- GitHub Actions auto-builds `dist/` on push to main
