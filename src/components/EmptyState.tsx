import Card from './Card';

export default function EmptyState() {
  return (
    <Card className="text-center py-12">
      <div className="text-5xl" aria-hidden="true">
        🗺️
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">No cities yet</h3>
      <p className="mt-1 text-slate-600">
        Add a city above to see its current weather and forecast.
      </p>
    </Card>
  );
}
