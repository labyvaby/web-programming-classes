import { useI18n } from '../i18n';

export default function ChangelogPage() {
  const { language } = useI18n();
  const content = {
    kg: {
      title: 'Жаңылыктар',
      subtitle: 'htmllessons платформасынын өзгөрүүлөр тарыхы',
      entries: [
        { version: 'v2.4.0', date: '2026-жылдын 28-марты', title: 'Жеке кабинет жана прогресс', changes: ['Окуу тарыхы бар жеке кабинет кошулду', 'Ар бир курс боюнча прогресс көзөмөлдөнөт', 'YouTube видеосу менен өз курстарын кошуу мүмкүнчүлүгү', 'Маалыматтар localStorageда сакталат'] },
        { version: 'v2.3.0', date: '2026-жылдын 14-февралы', title: 'Жаңы интенсивдер жана дизайн', changes: ['Платформа толук редизайндан өттү', '«Front-end башталгычтар үчүн» интенсиви кошулду', 'Мобилдик түзмөктөргө адаптивдүүлүк жакшырды', 'React 19 жана Vite 8ге өттү'] },
        { version: 'v2.2.0', date: '2026-жылдын 5-январы', title: 'Мастер-класстар жаңыртылды', changes: ['«Авторизация 4.0: Максимум» мастер-классы кошулду', 'Деплой мастер-классына Docker бөлүмү кошулду', 'Эски видеолордун шилтемелери оңдолду', 'Барак жүктөө ылдамдады'] },
        { version: 'v2.1.0', date: '2025-жылдын 20-ноябры', title: 'VIP-контент жана жазылуу', changes: ['Мастер-класстардын VIP версиялары кошулду', 'Базалык, Про жана VIP тарифтери ишке кирди', '«AI менен ылдамдатуу» VIP мастер-классы кошулду', 'Telegram аркылуу пикир системасы'] },
        { version: 'v2.0.0', date: '2025-жылдын 1-сентябры', title: 'Платформаны кайра ишке киргизүү', changes: ['React + TypeScript негизинде архитектура толук жаңыртылды', 'Алгачкы 5 интенсив ишке кирди', 'Курс карточкаларынын жаңы системасы', 'PWA колдоосу'] },
      ],
    },
    ru: {
      title: 'Обновления',
      subtitle: 'История изменений платформы htmllessons',
      entries: [
        { version: 'v2.4.0', date: '28 марта 2026', title: 'Личный кабинет и прогресс', changes: ['Добавлен личный кабинет с историей обучения', 'Отслеживание прогресса по каждому курсу', 'Возможность добавлять свои курсы с YouTube-видео', 'Сохранение данных в localStorage без регистрации'] },
        { version: 'v2.3.0', date: '14 февраля 2026', title: 'Новые интенсивы и дизайн', changes: ['Полный редизайн платформы в фиолетовой палитре', 'Добавлен интенсив «Front-end для начинающих»', 'Улучшена адаптивность для мобильных устройств', 'Переход на React 19 и Vite 8'] },
        { version: 'v2.2.0', date: '5 января 2026', title: 'Мастер-классы обновлены', changes: ['Добавлен мастер-класс «Авторизация 4.0: Максимум»', 'Обновлён мастер-класс по деплою — добавлена глава про Docker', 'Исправлены ссылки на устаревшие видео', 'Ускорена загрузка страниц (lazy loading)'] },
        { version: 'v2.1.0', date: '20 ноября 2025', title: 'VIP-контент и подписка', changes: ['Добавлены VIP-версии мастер-классов с расширенным содержимым', 'Запущены тарифы: Базовый, Про и VIP', 'Новый мастер-класс «Ускорение с AI» в VIP-доступе', 'Система отзывов через Telegram'] },
        { version: 'v2.0.0', date: '1 сентября 2025', title: 'Перезапуск платформы', changes: ['Полная переработка архитектуры платформы на React + TypeScript', 'Запущены первые 5 интенсивов', 'Новая система карточек курсов', 'Поддержка тёмной темы и PWA'] },
      ],
    },
    en: {
      title: 'Updates',
      subtitle: 'htmllessons platform change history',
      entries: [
        { version: 'v2.4.0', date: 'March 28, 2026', title: 'Profile and progress', changes: ['Added personal profile with learning history', 'Track progress for each course', 'Ability to add your own courses with YouTube videos', 'Data is saved in localStorage without registration'] },
        { version: 'v2.3.0', date: 'February 14, 2026', title: 'New intensives and design', changes: ['Full platform redesign', 'Added intensive “Front-end for beginners”', 'Improved mobile responsiveness', 'Migrated to React 19 and Vite 8'] },
        { version: 'v2.2.0', date: 'January 5, 2026', title: 'Master classes updated', changes: ['Added master class “Authorization 4.0: Maximum”', 'Updated deploy master class with Docker chapter', 'Fixed outdated video links', 'Improved page loading speed (lazy loading)'] },
        { version: 'v2.1.0', date: 'November 20, 2025', title: 'VIP content and plans', changes: ['Added VIP versions of master classes', 'Launched Basic, Pro, and VIP plans', 'New VIP master class “AI Acceleration”', 'Telegram-based review system'] },
        { version: 'v2.0.0', date: 'September 1, 2025', title: 'Platform relaunch', changes: ['Complete architecture rewrite on React + TypeScript', 'Launched first 5 intensives', 'New course card system', 'PWA support'] },
      ],
    },
  } as const;
  const t = content[language];

  return (
    <div className="min-h-screen pb-24">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-primary/8 blur-[90px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">{t.title}</h1>
          <p className="text-slate-500 text-sm">{t.subtitle}</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <div className="space-y-10">
            {t.entries.map((entry, i) => (
              <div key={i} className="relative pl-8">
                {/* Dot */}
                <div className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${i === 0 ? 'border-primary bg-primary/20' : 'border-white/20 bg-background'}`}>
                  {i === 0 && <div className="w-2 h-2 rounded-full bg-primary-light" />}
                </div>

                {/* Card */}
                <div className="p-5 rounded-2xl bg-card border border-white/8">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary-light text-xs font-bold border border-primary/20">
                      {entry.version}
                    </span>
                    <span className="text-slate-500 text-xs">{entry.date}</span>
                  </div>
                  <h2 className="text-white font-bold text-base mb-3">{entry.title}</h2>
                  <ul className="space-y-2">
                    {entry.changes.map((c, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                        <span className="text-primary-light mt-0.5">•</span>
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
