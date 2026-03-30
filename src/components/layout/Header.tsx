import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, User, Plus } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Курсы', path: '/intensives' },
    { name: 'Подписка', path: '/plans' },
    { name: 'Обновления', path: '/changelog' },
  ];

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
            {navLinks.map((link) => (
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
            <Link
              to="/add-course"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 font-medium transition-all"
            >
              <Plus size={16} />
              <span>Добавить</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all duration-300 hover:scale-[1.02]"
            >
              <User size={16} />
              <span>Кабинет</span>
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
          {navLinks.map((link) => (
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
            Добавить курс
          </Link>
          <Link
            to="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-primary/10 text-primary-light text-sm font-semibold hover:bg-primary/20 transition-all"
          >
            <User size={16} />
            Личный кабинет
          </Link>
        </div>
      )}
    </header>
  );
}
