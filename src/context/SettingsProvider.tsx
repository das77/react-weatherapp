import { useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { SavedCity, Unit } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SettingsContext } from './settingsContext';

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [unit, setUnit] = useLocalStorage<Unit>('weather:unit', 'celsius');
  const [cities, setCities] = useLocalStorage<SavedCity[]>('weather:cities', []);

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  }, [setUnit]);

  const addCity = useCallback(
    (city: SavedCity) => {
      // Dedupe by Open-Meteo id.
      setCities((prev) =>
        prev.some((c) => c.id === city.id) ? prev : [...prev, city]
      );
    },
    [setCities]
  );

  const removeCity = useCallback(
    (id: number) => {
      setCities((prev) => prev.filter((c) => c.id !== id));
    },
    [setCities]
  );

  const value = useMemo(
    () => ({ unit, cities, setUnit, toggleUnit, addCity, removeCity }),
    [unit, cities, setUnit, toggleUnit, addCity, removeCity]
  );

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}
