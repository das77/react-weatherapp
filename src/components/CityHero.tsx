import type { SavedCity } from '../types';
import { useCityImage } from '../hooks/useCityImage';

interface CityHeroProps {
  city: SavedCity;
}

/**
 * Full-width banner at the top of the City Detail page. A Wikipedia photo of the
 * city sits behind a dark gradient so the overlaid header text stays legible.
 * Three states: loading (animated placeholder), miss (sky-blue gradient fallback,
 * no broken-image icon), success (photo + "Photo: Wikipedia" attribution chip).
 */
export default function CityHero({ city }: CityHeroProps) {
  // Wikipedia photo via the disambiguation ladder (SECTION B). `image` is null
  // when the ladder misses → the gradient-fallback branch below renders.
  const { image, loading } = useCityImage(city);

  const location = [city.country, city.admin1].filter(Boolean).join(', ');

  return (
    <div className="relative h-48 sm:h-64 overflow-hidden rounded-2xl">
      {/* Background layer */}
      {loading ? (
        <div className="absolute inset-0 animate-pulse bg-slate-200" />
      ) : image ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${image.url})` }}
          role="img"
          aria-label={`Photo of ${city.name}`}
        />
      ) : (
        // Miss / no image found: graceful sky-blue gradient, no broken-image icon.
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600" />
      )}

      {/* Dark gradient overlay for legibility (not needed over the pulse). */}
      {!loading && (
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
      )}

      {/* Attribution chip (success only). */}
      {!loading && image && (
        <span className="absolute bottom-2 right-2 rounded-full bg-black/40 px-2 py-0.5 text-xs text-white/90 backdrop-blur">
          Photo: Wikipedia
        </span>
      )}

      {/* Overlaid page header — white text on the gradient. */}
      {!loading && (
        <header className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <h1 className="text-2xl font-bold text-white drop-shadow-sm">{city.name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            {location && <p className="text-sm text-white/90">{location}</p>}
            {city.label && (
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs text-white backdrop-blur">
                {city.label}
              </span>
            )}
          </div>
        </header>
      )}
    </div>
  );
}
