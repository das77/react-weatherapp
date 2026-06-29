import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CityCard from './CityCard';
import { SettingsProvider } from '../context/SettingsProvider';
import type { SavedCity, WeatherData } from '../types';

// Mock the data hook so the test never hits the live API.
vi.mock('../hooks/useWeather', () => ({ useWeather: vi.fn() }));
import { useWeather } from '../hooks/useWeather';

const city: SavedCity = {
  id: 1,
  name: 'London',
  latitude: 51.5,
  longitude: -0.12,
  country: 'United Kingdom',
  admin1: 'England',
};

const data: WeatherData = {
  current: { emoji: '☀️', condition: 'Clear sky', temp: 20, feelsLike: 19, humidity: 50, wind: 10 },
  daily: [],
};

function renderCard() {
  return render(
    <SettingsProvider>
      <MemoryRouter>
        <CityCard city={city} />
      </MemoryRouter>
    </SettingsProvider>
  );
}

describe('CityCard', () => {
  it('renders the city name and temperature on success', () => {
    vi.mocked(useWeather).mockReturnValue({
      data,
      loading: false,
      error: false,
      refetch: vi.fn(),
    });

    renderCard();

    expect(screen.getByRole('heading', { name: 'London' })).toBeInTheDocument();
    expect(screen.getByText(/20°C/)).toBeInTheDocument();
  });
});
