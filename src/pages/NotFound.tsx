import { Link } from 'react-router-dom';
import Card from '../components/Card';

export default function NotFound() {
  return (
    <div className="py-12">
      <Card className="mx-auto max-w-md text-center py-12">
        <div className="text-5xl" aria-hidden="true">
          🧭
        </div>
        <h1 className="mt-4 text-xl font-semibold text-slate-900">Page not found</h1>
        <p className="mt-1 text-slate-600">That page doesn&apos;t exist.</p>
        <Link
          to="/"
          className="mt-4 inline-block rounded-lg bg-sky-500 px-4 py-2 font-medium text-white hover:bg-sky-600"
        >
          Go to dashboard
        </Link>
      </Card>
    </div>
  );
}
