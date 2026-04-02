# WME UA-address data

A TamperMonkey/GreaseMonkey userscript for Waze Map Editor that displays Ukrainian address polygons on the map.

## Features

- Fetches address polygon data from `stat.waze.com.ua` based on the current map view
- Draws colored polygons with address labels on a custom WME layer
- Toggle layer visibility via the Layer Switcher checkbox or keyboard shortcut (`Shift+Q`)
- Configurable polygon offset (horizontal/vertical) to fine-tune alignment
- Options to show/hide address labels, region names, and polygon fill colors
- Auto-loads polygons when panning or zooming in (zoom level 16+)

## Settings

| Option | Description |
|--------|-------------|
| Show addresses | Display address labels on polygons |
| Show region | Include region/district name in the label |
| Fill polygons | Fill polygons with semi-transparent color |
| Offset X / Y | Adjust polygon position (meters) to correct alignment |

## Development

```bash
npm install
npm run build       # one-off build → dist/WME_UA_address_data.user.js
npm run watch       # rebuild on changes
```

### Project Structure

Source is written in TypeScript under `src/`, built with Rollup into a single IIFE at `dist/WME_UA_address_data.user.js`.

```
src/
├── meta.ts              # userscript header
├── style.css            # plain CSS
├── globals.d.ts         # WME runtime globals + wellknown + GM_xmlhttpRequest
├── translations.ts      # NAME, SETTINGS, TRANSLATION, requestsTimeout
├── layers.ts            # layer style configuration
├── helpers.ts           # displayHtmlPage (auth redirect handler)
├── ua-address-data.ts   # UAAddressData class (main logic)
└── index.ts             # bootstrap entry point
```
