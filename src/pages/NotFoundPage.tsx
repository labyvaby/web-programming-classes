import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { useI18n } from '../i18n';

export default function NotFoundPage() {
  const { language } = useI18n();
  const content = {
    kg: {
      title: 'Барак табылган жок',
      description: 'Мындай барак жок же башка жерге көчүрүлгөн.',
      back: 'Башкы бетке',
    },
    ru: {
      title: 'Страница не найдена',
      description: 'Такой страницы не существует или она была перемещена.',
      back: 'На главную',
    },
    en: {
      title: 'Page not found',
      description: 'This page does not exist or has been moved.',
      back: 'Back to home',
    },
  } as const;
  const t = content[language];

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

      <h1 className="text-4xl font-black text-white mb-3 tracking-tight">{t.title}</h1>
      <p className="text-slate-500 text-base mb-8 max-w-sm">
        {t.description}
      </p>

      <Link
        to="/intensives"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-glow-sm hover:shadow-glow transition-all hover:scale-[1.02]"
      >
        <Home size={16} />
        {t.back}
      </Link>
    </div>
  );
}
