import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { SettingsProvider } from './context/SettingsProvider';

describe('App', () => {
  it('renders the dashboard heading at the root route', () => {
    render(
      <SettingsProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </SettingsProvider>
    );
    expect(screen.getByRole('heading', { name: 'Your Cities' })).toBeInTheDocument();
  });

  it('renders the not-found page for an unknown route', () => {
    render(
      <SettingsProvider>
        <MemoryRouter initialEntries={['/nope']}>
          <App />
        </MemoryRouter>
      </SettingsProvider>
    );
    expect(
      screen.getByRole('heading', { name: 'Page not found' })
    ).toBeInTheDocument();
  });
});
