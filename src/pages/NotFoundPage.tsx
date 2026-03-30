import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
        <div className="text-[20rem] font-black text-white/[0.02] leading-none select-none">404</div>
      </div>

      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 shadow-glow-sm">
        <span className="text-2xl font-black gradient-text">4</span>
        <span className="text-2xl font-black gradient-text">0</span>
        <span className="text-2xl font-black gradient-text">4</span>
      </div>

      <h1 className="text-4xl font-black text-white mb-3 tracking-tight">Страница не найдена</h1>
      <p className="text-slate-500 text-base mb-8 max-w-sm">
        Такой страницы не существует или она была перемещена.
      </p>

      <Link
        to="/intensives"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-glow-sm hover:shadow-glow transition-all hover:scale-[1.02]"
      >
        <Home size={16} />
        На главную
      </Link>
    </div>
  );
}
