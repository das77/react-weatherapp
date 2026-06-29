# Weather Dashboard

A small React + TypeScript app that shows current conditions and a 7-day forecast
for the cities you save. Data comes from [Open-Meteo](https://open-meteo.com)
(free, no API key). Built with Vite, React Router, Tailwind, and Vitest.

> This repository is a short learning project for a Full Stack Engineering program.

## Getting started

```bash
npm install
npm run dev      # start the dev server (Vite)
```

Then open the printed local URL. No API key or `.env` file is required — Open-Meteo
is public, so the app runs out of the box.

## Scripts

| Command         | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the dev server                          |
| `npm run build` | Type-check (`tsc`) then production build      |
| `npm run lint`  | Lint with ESLint                              |
| `npm test`      | Run the Vitest unit/component tests           |

## Features

- **Dashboard** (`/`) — saved cities as cards with live current conditions, plus an
  add-city form (controlled, validated) backed by Open-Meteo geocoding.
- **City detail** (`/city/:cityId`) — current conditions and a 7-day forecast with
  explicit loading / error+retry / success states.
- **About** (`/about`) — what the app does, the data source, and an email-format
  validation demo field.
- **°C / °F toggle** in the header, and saved cities + unit choice persisted to
  `localStorage`. Unknown URLs render a 404 view.

## Project structure

```
src/
  components/   Card, Layout, Header, CityCard, AddCityForm, CurrentConditions,
                ForecastList, EmptyState  (+ component tests)
  pages/        Dashboard, CityDetail, About, NotFound
  context/      SettingsContext + SettingsProvider (unit + saved cities)
  hooks/        useLocalStorage, useWeather  (+ hook test)
  lib/          openMeteo (API client), weatherCodes (WMO lookup), units
  types.ts      shared data-model types
```

## Testing

```bash
npm test
```

Vitest + React Testing Library run in jsdom. Network calls are mocked, so the suite
never hits the live API. Covers `CityCard` rendering, `AddCityForm` validation, and
the `useLocalStorage` hook (`renderHook`).

## Architecture

See [`RATIONALE.md`](./RATIONALE.md) for the component hierarchy, state decisions,
custom hooks, and routing.
