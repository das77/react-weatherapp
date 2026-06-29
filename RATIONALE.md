# Architecture Rationale

## Component hierarchy and extraction

The tree is `App → Layout → {Dashboard, CityDetail, About, NotFound}`. `Layout`
renders the persistent `Header` and an `<Outlet/>`, so every route shares one
chrome without repetition. Components were extracted at the points where a unit of
UI is reused or independently testable. `Card` is the composition primitive: a
single owner of the card chrome (`rounded-2xl`, `shadow-sm`, hairline border) that
renders `{children}`. `CityCard`, `CurrentConditions`, `AddCityForm`, and
`ForecastList` all compose `Card` rather than duplicating those classes, so a
styling change happens in one file. `CityCard` is separate because it appears once
per saved city on the dashboard and owns its own per-card fetch state. `ForecastDay`
is split out of `ForecastList` because a single day is a self-contained, repeated
cell — extracting it keeps the list component a thin `.map()` and makes the day's
markup trivial to reason about.

## State decisions

Temperature `unit` and the `cities` list live in `SettingsContext` because they are
read and written from unrelated places — the header's unit toggle, the dashboard
grid, and the detail page — so prop drilling would thread them through every layer.
Centralizing them also gives one source of truth to persist. Form state stays local
to `AddCityForm` (`useState`): no other component consumes the in-progress name,
label, or validation errors, so lifting them would add coupling for no benefit. The
unit is stored in °C-always data and converted at render time, so toggling never
refetches.

## Custom hooks

Two hooks isolate the two cross-cutting concerns. `useLocalStorage<T>(key, initial)`
encapsulates persistence — it mirrors a state value to `localStorage` and backs both
the saved-cities list and the unit choice inside the provider. `useWeather(city)`
encapsulates data fetching: it returns `{ data, loading, error, refetch }` (the
three-state pattern) and owns an `AbortController` whose `useEffect` cleanup aborts
in-flight requests when `cityId` changes or the component unmounts, preventing a
stale response from landing on the wrong city.

## Routing

React Router v6 drives three routes plus a wildcard 404. `CityDetail` reads its
`cityId` from the URL via `useParams`, looks the city up in `SettingsContext`, and
feeds it to `useWeather` — so the URL is the single input that keys the detail fetch,
and a saved city is shareable and reload-safe by its id.
