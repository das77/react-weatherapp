import type { SavedCity, WeatherData } from '../types';
import { getWeatherInfo } from './weatherCodes';

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export interface GeocodeResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

interface GeocodeResponse {
  results?: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country?: string;
    admin1?: string;
  }>;
}

// Geocode a free-text city name to up to 5 matches. Empty / missing `results`
// yields [], which drives the AddCityForm not-found message.
export async function searchCity(
  query: string,
  signal?: AbortSignal
): Promise<GeocodeResult[]> {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(query)}&count=5`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Geocoding request failed (${res.status})`);
  const json = (await res.json()) as GeocodeResponse;
  if (!json.results) return [];
  return json.results.map((r) => ({
    id: r.id,
    name: r.name,
    latitude: r.latitude,
    longitude: r.longitude,
    country: r.country,
    admin1: r.admin1,
  }));
}

interface ForecastResponse {
  current: {
    temperature_2m: number;
    apparent_temperature: number;
    weather_code: number;
    wind_speed_10m: number;
    relative_humidity_2m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

function weekdayLabel(isoDate: string): string {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
  });
}

// Fetch current conditions + 7-day forecast for a city and normalize it to the
// shared WeatherData shape (temps in °C; codes resolved to emoji/label here).
export async function fetchForecast(
  city: SavedCity,
  signal?: AbortSignal
): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current:
      'temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'auto',
  });
  const res = await fetch(`${FORECAST_URL}?${params.toString()}`, { signal });
  if (!res.ok) throw new Error(`Forecast request failed (${res.status})`);
  const json = (await res.json()) as ForecastResponse;

  const currentInfo = getWeatherInfo(json.current.weather_code);
  return {
    current: {
      emoji: currentInfo.emoji,
      condition: currentInfo.label,
      temp: json.current.temperature_2m,
      feelsLike: json.current.apparent_temperature,
      humidity: Math.round(json.current.relative_humidity_2m),
      wind: Math.round(json.current.wind_speed_10m),
    },
    daily: json.daily.time.map((time, i) => {
      const dayInfo = getWeatherInfo(json.daily.weather_code[i]);
      return {
        weekday: weekdayLabel(time),
        emoji: dayInfo.emoji,
        high: json.daily.temperature_2m_max[i],
        low: json.daily.temperature_2m_min[i],
      };
    }),
  };
}
