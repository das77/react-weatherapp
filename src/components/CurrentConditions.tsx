import Card from './Card';
import type { CurrentWeather, Unit } from '../types';
import { toDisplayTemp, unitSuffix } from '../lib/units';

interface CurrentConditionsProps {
  weather: CurrentWeather;
  unit: Unit;
}

export default function CurrentConditions({ weather, unit }: CurrentConditionsProps) {
  const suffix = unitSuffix(unit);
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
              {toDisplayTemp(weather.temp, unit)}
              {suffix}
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-600">
          Feels like {toDisplayTemp(weather.feelsLike, unit)}
          {suffix} · Humidity {weather.humidity}% · Wind {weather.wind} km/h
        </div>
      </div>
    </Card>
  );
}
