import { useState } from 'react';
import Card from '../components/Card';

// Pure client-side format check — SECTION A: "// INTEGRATION: none needed".
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function About() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<'idle' | 'valid' | 'invalid'>('idle');

  function handleValidate(e: React.FormEvent) {
    e.preventDefault();
    setResult(EMAIL_RE.test(email.trim()) ? 'valid' : 'invalid');
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">About</h1>
      </header>

      <div className="space-y-4 text-slate-600 leading-relaxed">
        <p>
          Weather Dashboard is a small React app that shows current conditions and a
          7-day forecast for the cities you save.
        </p>
        <p>
          It demonstrates component composition, React hooks, client-side routing, the
          loading/success/error data-fetch pattern, controlled forms with validation,
          and component tests.
        </p>
        <p>
          Weather data comes from{' '}
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 font-medium hover:text-sky-700"
          >
            Open-Meteo
          </a>
          , a free API that requires no key.
        </p>
        <p>
          Read the architecture rationale in{' '}
          <a
            href="https://github.com/das77/react-weatherapp/blob/main/RATIONALE.md"
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 font-medium hover:text-sky-700"
          >
            RATIONALE.md
          </a>
          .
        </p>
      </div>

      <Card className="max-w-md">
        <h2 className="text-base font-semibold text-slate-900">
          Email me this dashboard link (demo)
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Demo field only — nothing is sent. Validates email format.
        </p>
        <form onSubmit={handleValidate} noValidate className="mt-3 flex items-start gap-2">
          <div className="flex-1">
            <input
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setResult('idle');
              }}
              placeholder="you@example.com"
              aria-invalid={result === 'invalid'}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {result === 'invalid' && (
              <p className="text-sm text-red-600 mt-1">Enter a valid email address.</p>
            )}
            {result === 'valid' && (
              <p className="text-sm text-emerald-600 mt-1">Looks good ✓</p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-white hover:bg-sky-600"
          >
            Validate
          </button>
        </form>
      </Card>
    </div>
  );
}
