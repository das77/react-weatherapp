import AddCityForm from '../components/AddCityForm';
import CityCard from '../components/CityCard';
import EmptyState from '../components/EmptyState';
import { placeholderCities } from '../placeholder';

export default function Dashboard() {
  // INTEGRATION: `cities` comes from SettingsContext (useSettings().cities).
  const cities = placeholderCities;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Your Cities</h1>
        <p className="text-slate-600">Saved cities and their current conditions.</p>
      </header>

      <AddCityForm />

      {cities.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      )}
    </div>
  );
}
