import Card from './Card';
import type { ForecastDayData, Unit } from '../types';
import { toDisplayTemp, unitSuffix } from '../lib/units';

function ForecastDay({
  weekday,
  emoji,
  high,
  low,
  suffix,
}: {
  weekday: string;
  emoji: string;
  high: number;
  low: number;
  suffix: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl border border-slate-100 bg-slate-50 px-2 py-3">
      <span className="text-sm font-medium text-slate-700">{weekday}</span>
      <span className="text-2xl" aria-hidden="true">
        {emoji}
      </span>
      <span className="text-sm text-slate-900">
        {high}
        {suffix} <span className="text-slate-400">/</span>{' '}
        <span className="text-slate-500">
          {low}
          {suffix}
        </span>
      </span>
    </div>
  );
}

interface ForecastListProps {
  days: ForecastDayData[];
  unit: Unit;
}

export default function ForecastList({ days, unit }: ForecastListProps) {
  const suffix = unitSuffix(unit);
  return (
    <Card>
      <h2 className="text-lg font-semibold text-slate-900">7-day forecast</h2>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-7">
        {days.map((day) => (
          <ForecastDay
            key={day.weekday}
            weekday={day.weekday}
            emoji={day.emoji}
            high={toDisplayTemp(day.high, unit)}
            low={toDisplayTemp(day.low, unit)}
            suffix={suffix}
          />
        ))}
      </div>
    </Card>
  );
}
