import { createContext, useContext } from 'react';
import type { SavedCity, Unit } from '../types';

export interface SettingsContextValue {
  unit: Unit;
  cities: SavedCity[];
  setUnit: (u: Unit) => void;
  toggleUnit: () => void;
  addCity: (c: SavedCity) => void;
  removeCity: (id: number) => void;
}

export const SettingsContext = createContext<SettingsContextValue | null>(null);

// Consumed everywhere instead of useContext directly; throws if used outside the
// provider so a missing <SettingsProvider> fails loudly rather than silently.
export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return ctx;
}
