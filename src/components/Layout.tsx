import { Outlet } from 'react-router-dom';
import Header from './Header';

/**
 * App shell: sticky Header + centered <main> + footer.
 * Uses <Outlet/> so nested routes render in place; also accepts `children`
 * for direct composition if ever needed.
 */
export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-6">
        {children ?? <Outlet />}
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 text-sm text-slate-600">
          Data from{' '}
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noreferrer"
            className="text-sky-600 font-medium hover:text-sky-700"
          >
            Open-Meteo
          </a>{' '}
          · Built with React + Vite
        </div>
      </footer>
    </div>
  );
}
