// INTEGRATION (design placeholder): this whole file is design-only scaffolding so
// the UI renders with realistic content. Integrate REPLACES every use of it with:
//   - cities  -> SavedCity[] from SettingsContext
//   - weather -> useWeather(city) (current conditions + 7-day forecast)
//   - emoji/label -> weatherCodes[code] lookup
// DELETE this file once context + hooks are wired.

export interface PlaceholderCity {
  id: number;
  name: string;
  label?: string;
  country?: string;
  admin1?: string;
}

export interface PlaceholderWeather {
  emoji: string;
  condition: string;
  temp: number; // °C
  feelsLike: number; // °C
  humidity: number; // %
  wind: number; // km/h
}

export interface PlaceholderForecastDay {
  weekday: string;
  emoji: string;
  high: number; // °C
  low: number; // °C
}

export const placeholderCities: PlaceholderCity[] = [
  {
    id: 2643743,
    name: 'London',
    label: 'Home',
    country: 'United Kingdom',
    admin1: 'England',
  },
  {
    id: 5128581,
    name: 'New York',
    country: 'United States',
    admin1: 'New York',
  },
  {
    id: 1850147,
    name: 'Tokyo',
    country: 'Japan',
    admin1: 'Tokyo',
  },
];

export const placeholderWeatherById: Record<number, PlaceholderWeather> = {
  2643743: { emoji: '🌦️', condition: 'Light rain', temp: 14, feelsLike: 13, humidity: 82, wind: 17 },
  5128581: { emoji: '🌤️', condition: 'Partly cloudy', temp: 22, feelsLike: 23, humidity: 54, wind: 11 },
  1850147: { emoji: '☀️', condition: 'Clear sky', temp: 28, feelsLike: 30, humidity: 61, wind: 8 },
};

export const placeholderForecast: PlaceholderForecastDay[] = [
  { weekday: 'Mon', emoji: '🌤️', high: 24, low: 13 },
  { weekday: 'Tue', emoji: '☀️', high: 26, low: 15 },
  { weekday: 'Wed', emoji: '🌧️', high: 19, low: 12 },
  { weekday: 'Thu', emoji: '🌦️', high: 21, low: 13 },
  { weekday: 'Fri', emoji: '☁️', high: 20, low: 14 },
  { weekday: 'Sat', emoji: '⛈️', high: 18, low: 11 },
  { weekday: 'Sun', emoji: '🌤️', high: 23, low: 14 },
];
