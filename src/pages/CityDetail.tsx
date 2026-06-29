import { Link, useParams } from 'react-router-dom';
import Card from '../components/Card';
import CityHero from '../components/CityHero';
import CurrentConditions from '../components/CurrentConditions';
import ForecastList from '../components/ForecastList';
import { useSettings } from '../context/settingsContext';
import { useWeather } from '../hooks/useWeather';

const backLink = (
  <Link to="/" className="text-sky-600 font-medium hover:text-sky-700">
    ← Back to dashboard
  </Link>
);

export default function CityDetail() {
  const { cityId } = useParams();
  const { cities, unit } = useSettings();
  const city = cities.find((c) => String(c.id) === cityId);

  // Hook is called unconditionally (rules of hooks); it no-ops for an undefined
  // city. The AbortController cleanup in useWeather fires when cityId changes /
  // on unmount.
  const { data, loading, error, refetch } = useWeather(city);

  // City id not present in the saved list (distinct from the network 404 route).
  if (!city) {
    return (
      <div className="space-y-4">
        {backLink}
        <Card>
          <p className="text-slate-600">City not found in your saved list.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {backLink}

      {/* CityHero renders the overlaid page header (name + location + label). */}
      <CityHero city={city} />

      {loading && (
        <Card className="flex items-center gap-3 py-10 text-slate-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-500" />
          <span>Loading forecast…</span>
        </Card>
      )}

      {error && (
        <Card className="flex flex-col items-center gap-3 py-10 text-center">
          <p className="text-slate-600">Couldn&apos;t load the forecast.</p>
          <button
            type="button"
            onClick={refetch}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Retry
          </button>
        </Card>
      )}

      {!loading && !error && data && (
        <div className="space-y-6">
          <CurrentConditions weather={data.current} unit={unit} />
          <ForecastList days={data.daily} unit={unit} />
        </div>
      )}
    </div>
  );
}
