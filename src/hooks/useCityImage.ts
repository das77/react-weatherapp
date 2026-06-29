import { useEffect, useState } from 'react';
import type { SavedCity } from '../types';
import { fetchWikipediaImage } from '../lib/openMeteo';

export interface CityImage {
  title: string;
  url: string;
}

interface UseCityImageResult {
  image: CityImage | null;
  loading: boolean;
}

// Module-level cache keyed by Open-Meteo city id. The (up to 3-request)
// disambiguation ladder runs ONCE per city; revisiting a city is instant and
// makes no network calls. A resolved miss is cached as { title: null, url: null }
// so the gradient fallback is also remembered.
const imageCache = new Map<number, { title: string | null; url: string | null }>();

// Candidate Wikipedia page titles, most specific first. Open-Meteo supplies no
// direct Wikipedia title today; if a SavedCity record ever carries one, it would
// be tried before this ladder. Deduped to avoid a redundant request when admin1
// or country is absent.
function candidateTitles(city: SavedCity): string[] {
  const titles: string[] = [];
  if (city.admin1) titles.push(`${city.name}, ${city.admin1}`);
  if (city.country) titles.push(`${city.name}, ${city.country}`);
  titles.push(city.name);
  return [...new Set(titles)];
}

// Resolves a representative Wikipedia photo for the city header. Takes the full
// saved-city record so it has name/admin1/country for disambiguation. Returns
// { image, loading }; `image` is null when the ladder misses (drives CityHero's
// sky-blue gradient fallback). Never throws.
export function useCityImage(city: SavedCity | undefined): UseCityImageResult {
  const [image, setImage] = useState<CityImage | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city) {
      setImage(null);
      setLoading(false);
      return;
    }

    // Cache hit — no network. A cached miss resolves to the gradient (null).
    const cached = imageCache.get(city.id);
    if (cached) {
      setImage(cached.title && cached.url ? { title: cached.title, url: cached.url } : null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let active = true;
    setLoading(true);
    setImage(null);

    (async () => {
      try {
        for (const title of candidateTitles(city)) {
          const url = await fetchWikipediaImage(title, controller.signal);
          if (url) {
            imageCache.set(city.id, { title, url });
            if (active) {
              setImage({ title, url });
              setLoading(false);
            }
            return;
          }
        }
        // Every candidate missed → cache the miss and render the gradient.
        imageCache.set(city.id, { title: null, url: null });
        if (active) {
          setImage(null);
          setLoading(false);
        }
      } catch (err: unknown) {
        // Stale request cancelled on city change / unmount — ignore.
        if (err instanceof DOMException && err.name === 'AbortError') return;
        // Any other failure is tolerated as a miss; not cached, so a later
        // visit retries.
        if (active) {
          setImage(null);
          setLoading(false);
        }
      }
    })();

    return () => {
      active = false;
      controller.abort();
    };
  }, [city]);

  return { image, loading };
}
