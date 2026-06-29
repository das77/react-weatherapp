import type { Unit } from '../types';

// Presentation helpers. The API is always queried in °C (see openMeteo.ts), so
// the unit toggle never triggers a refetch — temps are converted at render time.

export function toDisplayTemp(celsius: number, unit: Unit): number {
  const value = unit === 'fahrenheit' ? (celsius * 9) / 5 + 32 : celsius;
  return Math.round(value);
}

export function unitSuffix(unit: Unit): string {
  return unit === 'fahrenheit' ? '°F' : '°C';
}
