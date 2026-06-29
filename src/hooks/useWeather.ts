import { useCallback, useEffect, useState } from 'react';
import type { SavedCity, WeatherData } from '../types';
import { fetchForecast } from '../lib/openMeteo';

interface UseWeatherResult {
  data: WeatherData | null;
  loading: boolean;
  error: boolean;
  refetch: () => void;
}

// The three-state data-fetch pattern. Keyed on the city object (stable refs come
// from SettingsContext), it creates an AbortController per request and aborts on
// city change / unmount so a stale response can't land on the wrong city.
// `refetch` backs the Retry buttons.
export function useWeather(city: SavedCity | undefined): UseWeatherResult {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [nonce, setNonce] = useState(0);

  const refetch = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    if (!city) {
      setData(null);
      setLoading(false);
      setError(false);
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(false);

    fetchForecast(city, controller.signal)
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, [city, nonce]);

  return { data, loading, error, refetch };
}
