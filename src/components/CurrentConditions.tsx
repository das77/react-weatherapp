import Card from './Card';
import type { PlaceholderWeather } from '../placeholder';

// INTEGRATION: `weather` comes from useWeather(city).data.current mapped through
// weatherCodes; temperature is unit-aware via toDisplayTemp() + SettingsContext.
interface CurrentConditionsProps {
  weather: PlaceholderWeather;
  unitSuffix?: string;
}

export default function CurrentConditions({
  weather,
  unitSuffix = '°C',
}: CurrentConditionsProps) {
  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-6xl" aria-hidden="true">
            {weather.emoji}
          </span>
          <div>
            <div className="text-sm text-slate-600">{weather.condition}</div>
            <div className="text-4xl font-bold text-slate-900">
              {weather.temp}
              {unitSuffix}
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-600">
          Feels like {weather.feelsLike}
          {unitSuffix} · Humidity {weather.humidity}% · Wind {weather.wind} km/h
        </div>
      </div>
    </Card>
  );
}
