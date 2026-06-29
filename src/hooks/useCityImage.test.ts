import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCityImage } from './useCityImage';
import type { SavedCity } from '../types';

// A response with a usable photo.
function imageResponse(source: string) {
  return {
    ok: true,
    json: async () => ({ originalimage: { source } }),
  } as Response;
}

// A miss: disambiguation page (no usable photo).
function disambiguationResponse() {
  return {
    ok: true,
    json: async () => ({ type: 'disambiguation' }),
  } as Response;
}

describe('useCityImage', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('walks the ladder and resolves the first candidate that has a photo', async () => {
    // city.id unique per test so the module-level cache doesn't bleed across cases.
    const city: SavedCity = {
      id: 101,
      name: 'Springfield',
      latitude: 0,
      longitude: 0,
      admin1: 'Illinois',
      country: 'United States',
    };

    const fetchMock = vi
      .fn()
      // 1st candidate "Springfield, Illinois" → disambiguation miss
      .mockResolvedValueOnce(disambiguationResponse())
      // 2nd candidate "Springfield, United States" → hit
      .mockResolvedValueOnce(imageResponse('https://img/springfield.jpg'));
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useCityImage(city));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.image).toEqual({
      title: 'Springfield, United States',
      url: 'https://img/springfield.jpg',
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('resolves to null when every candidate misses', async () => {
    const city: SavedCity = {
      id: 102,
      name: 'Nowhereville',
      latitude: 0,
      longitude: 0,
    };

    const fetchMock = vi.fn().mockResolvedValue(disambiguationResponse());
    vi.stubGlobal('fetch', fetchMock);

    const { result } = renderHook(() => useCityImage(city));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.image).toBeNull();
  });

  it('serves a cached city without a second network call', async () => {
    const city: SavedCity = {
      id: 103,
      name: 'Paris',
      latitude: 0,
      longitude: 0,
      country: 'France',
    };

    const fetchMock = vi.fn().mockResolvedValue(imageResponse('https://img/paris.jpg'));
    vi.stubGlobal('fetch', fetchMock);

    const first = renderHook(() => useCityImage(city));
    await waitFor(() => expect(first.result.current.image?.url).toBe('https://img/paris.jpg'));
    const callsAfterFirst = fetchMock.mock.calls.length;

    // Remount: the cache hit should make no new requests.
    const second = renderHook(() => useCityImage(city));
    await waitFor(() => expect(second.result.current.loading).toBe(false));
    expect(second.result.current.image?.url).toBe('https://img/paris.jpg');
    expect(fetchMock.mock.calls.length).toBe(callsAfterFirst);
  });
});
