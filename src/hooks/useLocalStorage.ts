import { useEffect, useState } from 'react';

// Lazy-init from localStorage (JSON), falling back to `initial` on a missing key
// or parse error; writes JSON back whenever the value changes. Backs both
// SettingsContext values.
export function useLocalStorage<T>(
  key: string,
  initial: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw === null ? initial : (JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore write failures (e.g. storage disabled / quota exceeded).
    }
  }, [key, value]);

  return [value, setValue];
}
