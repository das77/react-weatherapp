import { Link } from 'react-router-dom';
import Card from './Card';
import type { SavedCity } from '../types';
import { useWeather } from '../hooks/useWeather';
import { useSettings } from '../context/settingsContext';
import { toDisplayTemp, unitSuffix } from '../lib/units';

interface CityCardProps {
  city: SavedCity;
}

export default function CityCard({ city }: CityCardProps) {
  const { unit, removeCity } = useSettings();
  const { data, loading, error, refetch } = useWeather(city);
  const suffix = unitSuffix(unit);

  function handleRemove(e: React.MouseEvent) {
    // stopPropagation/preventDefault so removing doesn't follow the card's Link.
    e.preventDefault();
    e.stopPropagation();
    removeCity(city.id);
  }

  function handleRetry(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    refetch();
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
          {loading && (
            <div className="flex items-center gap-3 text-slate-500">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500" />
              <span className="text-sm">Loading…</span>
              <span className="ml-auto h-8 w-16 animate-pulse rounded bg-slate-100" />
            </div>
          )}

          {error && (
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

          {!loading && !error && data && (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-5xl" aria-hidden="true">
                  {data.current.emoji}
                </span>
                <span className="text-sm text-slate-600">{data.current.condition}</span>
              </div>
              <div className="text-right">
                <div className="text-3xl font-semibold text-slate-900">
                  {toDisplayTemp(data.current.temp, unit)}
                  {suffix}
                </div>
                <div className="text-xs text-slate-500">
                  Humidity {data.current.humidity}% · Wind {data.current.wind} km/h
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
