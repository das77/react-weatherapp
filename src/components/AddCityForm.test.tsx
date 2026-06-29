import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddCityForm from './AddCityForm';
import { SettingsProvider } from '../context/SettingsProvider';

// Mock the geocoding call so the test never hits the live API.
vi.mock('../lib/openMeteo', () => ({ searchCity: vi.fn() }));
import { searchCity } from '../lib/openMeteo';

function renderForm() {
  return render(
    <SettingsProvider>
      <AddCityForm />
    </SettingsProvider>
  );
}

describe('AddCityForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('blocks submit and shows a validation error for a too-short name', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText('City name'), 'L');
    await user.click(screen.getByRole('button', { name: 'Add city' }));

    expect(screen.getByText('Enter at least 2 characters.')).toBeInTheDocument();
    expect(searchCity).not.toHaveBeenCalled();
  });

  it('clears the error and searches once a valid name is submitted', async () => {
    const user = userEvent.setup();
    vi.mocked(searchCity).mockResolvedValue([
      {
        id: 1,
        name: 'London',
        latitude: 51.5,
        longitude: -0.12,
        country: 'United Kingdom',
        admin1: 'England',
      },
    ]);
    renderForm();

    const input = screen.getByLabelText('City name');
    await user.type(input, 'L');
    await user.click(screen.getByRole('button', { name: 'Add city' }));
    expect(screen.getByText('Enter at least 2 characters.')).toBeInTheDocument();

    await user.type(input, 'ondon'); // -> "London"
    expect(screen.queryByText('Enter at least 2 characters.')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Add city' }));
    expect(searchCity).toHaveBeenCalledWith('London');
  });
});
