import { Link } from 'react-router-dom';
import { Play, Send, Plus } from 'lucide-react';
import { useI18n } from '../../i18n';

export default function Footer() {
  const { language } = useI18n();

  const content = {
    kg: {
      description: 'Кыргызстандагы веб-иштеп чыгуу боюнча мыкты окутуу порталы. Окуунун биринчи күнүнөн тартып практика.',
      navigation: 'Навигация',
      subscription: 'Жазылуу',
      links: 'Шилтемелер',
      addCourse: 'Курс кошуу',
      courses: 'Курстар',
      intensives: 'Интенсивдер',
      masterClasses: 'Мастер-класстар',
      updates: 'Жаңылыктар',
      information: 'Маалымат',
      agreement: 'Келишим',
      privacy: 'Купуялуулук',
      legal: 'Реквизиттер',
      rights: 'Бардык укуктар корголгон',
      writeToUs: 'Бизге жазуу',
      reviews: 'Пикирлер',
    },
    ru: {
      description: 'Лучший обучающий портал по веб-разработке в Кыргызстане. Практика с первого дня обучения.',
      navigation: 'Навигация',
      subscription: 'Подписка',
      links: 'Ссылки',
      addCourse: 'Добавить курс',
      courses: 'Курсы',
      intensives: 'Интенсивы',
      masterClasses: 'Мастер-классы',
      updates: 'Обновления',
      information: 'Информация',
      agreement: 'Соглашение',
      privacy: 'Конфиденциальность',
      legal: 'Реквизиты',
      rights: 'Все права защищены',
      writeToUs: 'Написать нам',
      reviews: 'Отзывы',
    },
    en: {
      description: 'A leading web development learning platform in Kyrgyzstan. Hands-on practice from day one.',
      navigation: 'Navigation',
      subscription: 'Plans',
      links: 'Links',
      addCourse: 'Add course',
      courses: 'Courses',
      intensives: 'Intensives',
      masterClasses: 'Master classes',
      updates: 'Updates',
      information: 'Information',
      agreement: 'Agreement',
      privacy: 'Privacy',
      legal: 'Legal details',
      rights: 'All rights reserved',
      writeToUs: 'Contact us',
      reviews: 'Reviews',
    },
  } as const;

  const t = content[language];

  return (
    <footer className="relative bg-background border-t border-white/8 pt-16 pb-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Social */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-0.5 mb-4">
              <span className="text-xl font-black text-white tracking-tight">html</span>
              <span className="text-xl font-black gradient-text tracking-tight">lessons</span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t.description}
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-red-500/20 hover:text-red-400 transition-all border border-white/8 hover:border-red-500/30"
              >
                <Play size={16} />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-[#0088cc]/20 hover:text-[#0088cc] transition-all border border-white/8 hover:border-[#0088cc]/30"
              >
                <Send size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-5 uppercase tracking-wider">{t.navigation}</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/plans" className="text-slate-500 hover:text-slate-200 text-sm transition-colors">
                  {t.subscription}
                </Link>
              </li>
              <li>
                <Link to="/links" className="text-slate-500 hover:text-slate-200 text-sm transition-colors">
                  {t.links}
                </Link>
              </li>
              <li>
                <Link to="/add-course" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-primary-light text-sm transition-colors">
                  <Plus size={13} />
                  {t.addCourse}
                </Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-5 uppercase tracking-wider">{t.courses}</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/intensives" className="text-slate-500 hover:text-slate-200 text-sm transition-colors">
                  {t.intensives}
                </Link>
              </li>
              <li>
                <Link to="/intensives" className="text-slate-500 hover:text-slate-200 text-sm transition-colors">
                  {t.masterClasses}
                </Link>
              </li>
              <li>
                <Link to="/changelog" className="text-slate-500 hover:text-slate-200 text-sm transition-colors">
                  {t.updates}
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-5 uppercase tracking-wider">{t.information}</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/docs/agreement" className="text-slate-500 hover:text-slate-200 text-sm transition-colors">
                  {t.agreement}
                </Link>
              </li>
              <li>
                <Link to="/docs/privacy" className="text-slate-500 hover:text-slate-200 text-sm transition-colors">
                  {t.privacy}
                </Link>
              </li>
              <li>
                <Link to="/docs/legal" className="text-slate-500 hover:text-slate-200 text-sm transition-colors">
                  {t.legal}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 text-sm">
          <p>htmllessons © 2017–{new Date().getFullYear()} · {t.rights}</p>
          <div className="flex space-x-6 shrink-0">
            <a
              href="https://t.me/red_support_chat"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              {t.writeToUs}
            </a>
            <a
              href="https://t.me/s/htmllessons_reviews"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors"
            >
              {t.reviews}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
