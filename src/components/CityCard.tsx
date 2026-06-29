import { Link } from 'react-router-dom';
import Card from './Card';
import type { PlaceholderCity } from '../placeholder';
import { placeholderWeatherById } from '../placeholder';

// INTEGRATION: prop type becomes `SavedCity` from the data model. The unit suffix
// (°C/°F) and the displayed temperature come from SettingsContext + toDisplayTemp().
interface CityCardProps {
  city: PlaceholderCity;
}

export default function CityCard({ city }: CityCardProps) {
  // INTEGRATION: replace this block with `const { data, loading, error, refetch } = useWeather(city);`
  // and drive `state` off loading/error/data. Design hardcodes the success state
  // (with loading/error branches below kept renderable for the integrate session).
  const state = 'success' as 'loading' | 'error' | 'success';
  const weather = placeholderWeatherById[city.id];
  const unitSuffix = '°C'; // INTEGRATION: derive from SettingsContext unit.

  function handleRemove(e: React.MouseEvent) {
    // stopPropagation/preventDefault so removing doesn't follow the card's Link.
    e.preventDefault();
    e.stopPropagation();
    // INTEGRATION: call removeCity(city.id) from SettingsContext.
  }

  function handleRetry(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    // INTEGRATION: call refetch() from useWeather.
  }

  return (
    <Link to={`/city/${city.id}`} className="block group">
      <Card className="relative h-full transition-shadow duration-200 group-hover:shadow-md">
        {/* Remove control */}
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${city.name}`}
          className="absolute top-3 right-3 grid h-7 w-7 place-items-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
        >
          <span aria-hidden="true">✕</span>
        </button>

        {/* Header: name + optional label chip + location line */}
        <div className="pr-8">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-900">{city.name}</h3>
            {city.label && (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                {city.label}
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500">
            {[city.name, city.admin1, city.country].filter(Boolean).join(', ')}
          </p>
        </div>

        {/* Body: three-state */}
        <div className="mt-4">
          {state === 'loading' && (
            <div className="flex items-center gap-3 text-slate-500">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500" />
              <span className="text-sm">Loading…</span>
              <span className="ml-auto h-8 w-16 animate-pulse rounded bg-slate-100" />
            </div>
          )}

          {state === 'error' && (
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-600">Couldn&apos;t load weather.</p>
              <button
                type="button"
                onClick={handleRetry}
                className="rounded-lg border border-slate-300 px-3 py-1 text-sm text-slate-700 hover:bg-slate-50"
              >
                Retry
              </button>
            </div>
          )}

          {state === 'success' && weather && (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-5xl" aria-hidden="true">
                  {weather.emoji}
                </span>
                <span className="text-sm text-slate-600">{weather.condition}</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold text-slate-900">
                  {weather.temp}
                  {unitSuffix}
                </div>
                <div className="text-xs text-slate-500">
                  Humidity {weather.humidity}% · Wind {weather.wind} km/h
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
