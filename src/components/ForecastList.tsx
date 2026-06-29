import Card from './Card';
import type { PlaceholderForecastDay } from '../placeholder';

function ForecastDay({
  day,
  unitSuffix,
}: {
  day: PlaceholderForecastDay;
  unitSuffix: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 px-2 py-3">
      <span className="text-sm font-medium text-slate-700">{day.weekday}</span>
      <span className="text-2xl" aria-hidden="true">
        {day.emoji}
      </span>
      <span className="text-sm text-slate-900">
        {day.high}
        {unitSuffix} <span className="text-slate-400">/</span>{' '}
        <span className="text-slate-500">
          {day.low}
          {unitSuffix}
        </span>
      </span>
    </div>
  );
}

// INTEGRATION: `days` come from useWeather(city).data.daily mapped through
// weatherCodes; temps are unit-aware via toDisplayTemp() + SettingsContext.
interface ForecastListProps {
  days: PlaceholderForecastDay[];
  unitSuffix?: string;
}

export default function ForecastList({ days, unitSuffix = '°' }: ForecastListProps) {
  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-900">7-day forecast</h2>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
        {days.map((day) => (
          <ForecastDay key={day.weekday} day={day} unitSuffix={unitSuffix} />
        ))}
      </div>
    </Card>
  );
}
