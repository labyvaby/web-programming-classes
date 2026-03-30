import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User, Plus } from 'lucide-react';
import { useI18n, type Language } from '../../i18n';

const languageOptions: Array<{ value: Language; label: string }> = [
  { value: 'kg', label: 'кыргызский' },
  { value: 'ru', label: 'ру' },
  { value: 'en', label: 'en' },
];

const content = {
  kg: {
    nav: [
      { name: 'Курстар', path: '/intensives' },
      { name: 'Жазылуу', path: '/plans' },
      { name: 'Жанылыктар', path: '/changelog' },
    ],
    add: 'Кошуу',
    cabinet: 'Кабинет',
    addCourse: 'Курс кошуу',
    profile: 'Жеке кабинет',
  },
  ru: {
    nav: [
      { name: 'Курсы', path: '/intensives' },
      { name: 'Подписка', path: '/plans' },
      { name: 'Обновления', path: '/changelog' },
    ],
    add: 'Добавить',
    cabinet: 'Кабинет',
    addCourse: 'Добавить курс',
    profile: 'Личный кабинет',
  },
  en: {
    nav: [
      { name: 'Courses', path: '/intensives' },
      { name: 'Plans', path: '/plans' },
      { name: 'Updates', path: '/changelog' },
    ],
    add: 'Add',
    cabinet: 'Profile',
    addCourse: 'Add course',
    profile: 'Personal account',
  },
} as const;

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useI18n();

  const t = content[language];

  const LanguageSwitch = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      className={`inline-flex items-center rounded-xl border border-white/10 bg-white/[0.03] p-1 ${
        mobile ? 'w-full' : ''
      }`}
      role="tablist"
      aria-label="Language switcher"
    >
      {languageOptions.map((option) => {
        const isActive = language === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setLanguage(option.value)}
            className={`relative min-w-0 px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-sm font-semibold rounded-lg transition-all duration-300 ${
              mobile ? 'flex-1' : ''
            } ${
              isActive
                ? 'text-white bg-gradient-to-r from-primary to-primary-dark shadow-glow-sm'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span className="block truncate">{option.label}</span>
          </button>
        );
      })}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/85 border-b border-white/8">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-0.5 group">
              <span className="text-xl font-black text-white tracking-tight">html</span>
              <span className="text-xl font-black gradient-text tracking-tight">lessons</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 items-center justify-center space-x-1">
            {t.nav.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-primary-light bg-primary/10'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitch />
            <Link
              to="/add-course"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-all"
            >
              <Plus size={16} />
              <span>{t.add}</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
            >
              <User size={16} />
              <span>{t.cabinet}</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-all"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-white/8 p-4 space-y-1">
          <div className="pb-3">
            <LanguageSwitch mobile />
          </div>
          {t.nav.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive ? 'text-primary-light bg-primary/10' : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <Link
            to="/add-course"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm text-slate-300 hover:bg-white/5 font-medium transition-all"
          >
            <Plus size={16} />
            {t.addCourse}
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 text-primary-light text-sm font-semibold hover:bg-primary/20 transition-all"
          >
            <User size={16} />
            {t.profile}
          </Link>
        </div>
      )}
    </header>
  );
}
