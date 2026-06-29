import { NavLink } from 'react-router-dom';
import { useSettings } from '../context/settingsContext';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'text-sky-600 font-semibold'
    : 'text-slate-600 hover:text-slate-900';

export default function Header() {
  const { unit, setUnit } = useSettings();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Left — title */}
        <NavLink to="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span aria-hidden="true">⛅</span>
          <span>Weather Dashboard</span>
        </NavLink>

        {/* Center — primary nav */}
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          <NavLink to="/" end className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
        </nav>

        {/* Right — unit toggle pill */}
        <div
          role="group"
          aria-label="Temperature unit"
          className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 p-0.5 text-sm"
        >
          <button
            type="button"
            aria-pressed={unit === 'celsius'}
            onClick={() => setUnit('celsius')}
            className={
              'rounded-full px-3 py-1 transition-colors ' +
              (unit === 'celsius'
                ? 'bg-sky-500 text-white'
                : 'text-slate-600 hover:text-slate-900')
            }
          >
            °C
          </button>
          <button
            type="button"
            aria-pressed={unit === 'fahrenheit'}
            onClick={() => setUnit('fahrenheit')}
            className={
              'rounded-full px-3 py-1 transition-colors ' +
              (unit === 'fahrenheit'
                ? 'bg-sky-500 text-white'
                : 'text-slate-600 hover:text-slate-900')
            }
          >
            °F
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <nav className="sm:hidden border-t border-slate-200 flex items-center gap-6 px-4 py-2 text-sm">
        <NavLink to="/" end className={navLinkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
      </nav>
    </header>
  );
}
