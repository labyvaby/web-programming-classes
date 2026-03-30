import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useI18n } from '../../i18n';

interface Section {
  heading: string;
  body: string;
}

interface Props {
  title: string;
  subtitle?: string;
  sections: Section[];
}

export default function DocPage({ title, subtitle, sections }: Props) {
  const { language } = useI18n();
  const homeLabel = language === 'en' ? 'Home' : language === 'kg' ? 'Башкы бет' : 'Главная';

  return (
    <div className="min-h-screen pb-24">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-primary/6 blur-[80px] pointer-events-none -z-10" />

      <div className="container mx-auto px-3 min-[360px]:px-4 py-8 sm:py-10 max-w-3xl">
        <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-8">
          <Link to="/" className="hover:text-slate-300 transition-colors">{homeLabel}</Link>
          <ChevronRight size={12} />
          <span className="text-slate-400">{title}</span>
        </nav>

        <div className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">{title}</h1>
          {subtitle && <p className="text-slate-500 text-sm">{subtitle}</p>}
        </div>

        <div className="p-4 sm:p-8 rounded-2xl bg-card border border-white/8 space-y-6 sm:space-y-8">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-base font-bold text-white mb-3">{s.heading}</h2>
              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
