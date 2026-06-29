// Shared data-model types for the weather dashboard. No DB — cities + unit live
// in SettingsContext (persisted to localStorage); weather is fetched on demand.

export type Unit = 'celsius' | 'fahrenheit';

export interface SavedCity {
  id: number; // Open-Meteo geocoding id — stable, used as the route :cityId
  name: string; // "London"
  label?: string; // optional user nickname
  latitude: number;
  longitude: number;
  country?: string; // "United Kingdom"
  admin1?: string; // "England"
  country_code?: string; // "GB" — persisted for completeness / flag use
}

// Normalized weather shapes shared by CityCard and CityDetail. Temperatures are
// always in °C here; the display layer converts to °F via toDisplayTemp().
export interface CurrentWeather {
  emoji: string;
  condition: string;
  temp: number; // °C
  feelsLike: number; // °C
  humidity: number; // %
  wind: number; // km/h
}

export interface ForecastDayData {
  weekday: string; // "Mon"
  emoji: string;
  high: number; // °C
  low: number; // °C
}

export interface WeatherData {
  current: CurrentWeather;
  daily: ForecastDayData[];
}
