import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User, Plus, ChevronDown, Check } from 'lucide-react';
import { useI18n, type Language } from '../../i18n';

const languageOptions: Array<{ value: Language; label: string; code: string }> = [
  { value: 'kg', label: 'Кыргызча', code: 'KG' },
  { value: 'ru', label: 'Русский', code: 'RU' },
  { value: 'en', label: 'English', code: 'EN' },
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
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { language, setLanguage } = useI18n();

  const t = content[language];
  const activeLanguage = languageOptions.find((option) => option.value === language) ?? languageOptions[1];

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener('mousedown', onDocumentClick);
    return () => document.removeEventListener('mousedown', onDocumentClick);
  }, []);

  const LanguageDropdown = ({ mobile = false }: { mobile?: boolean }) => (
    <div
      ref={dropdownRef}
      className={`relative ${mobile ? 'w-full' : 'w-[132px]'}`}
    >
      <button
        type="button"
        onClick={() => setIsLanguageOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border border-white/10 bg-white/[0.03] text-sm font-semibold text-slate-200 hover:bg-white/[0.06] transition-all"
        aria-haspopup="menu"
        aria-expanded={isLanguageOpen}
        aria-label="Language selector"
      >
        <span className="text-xs tracking-wider text-white">{activeLanguage.code}</span>
        <ChevronDown
          size={15}
          className={`text-slate-400 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isLanguageOpen && (
        <div
          className={`absolute z-50 mt-2 w-full rounded-xl border border-white/10 bg-card/95 backdrop-blur-xl shadow-glow-sm overflow-hidden ${
            mobile ? 'left-0 top-full' : 'left-0 top-full'
          }`}
          role="menu"
          aria-label="Language options"
        >
          {languageOptions.map((option) => {
            const isActive = language === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setLanguage(option.value);
                  setIsLanguageOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/15 text-primary-light'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
                role="menuitemradio"
                aria-checked={isActive}
              >
                <span>{option.label}</span>
                {isActive ? <Check size={14} /> : null}
              </button>
            );
          })}
        </div>
      )}
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
          <div className="hidden md:flex w-[360px] items-center justify-end gap-2">
            <LanguageDropdown />
            <Link
              to="/add-course"
              className="flex w-[112px] items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-all"
            >
              <Plus size={16} />
              <span>{t.add}</span>
            </Link>
            <Link
              to="/profile"
              className="flex w-[132px] items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
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
            <LanguageDropdown mobile />
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
