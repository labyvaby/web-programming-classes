const entries = [
  {
    version: 'v2.4.0',
    date: '28 марта 2026',
    title: 'Личный кабинет и прогресс',
    changes: [
      'Добавлен личный кабинет с историей обучения',
      'Отслеживание прогресса по каждому курсу',
      'Возможность добавлять свои курсы с YouTube-видео',
      'Сохранение данных в localStorage без регистрации',
    ],
  },
  {
    version: 'v2.3.0',
    date: '14 февраля 2026',
    title: 'Новые интенсивы и дизайн',
    changes: [
      'Полный редизайн платформы в фиолетовой палитре',
      'Добавлен интенсив «Front-end для начинающих»',
      'Улучшена адаптивность для мобильных устройств',
      'Переход на React 19 и Vite 8',
    ],
  },
  {
    version: 'v2.2.0',
    date: '5 января 2026',
    title: 'Мастер-классы обновлены',
    changes: [
      'Добавлен мастер-класс «Авторизация 4.0: Максимум»',
      'Обновлён мастер-класс по деплою — добавлена глава про Docker',
      'Исправлены ссылки на устаревшие видео',
      'Ускорена загрузка страниц (lazy loading)',
    ],
  },
  {
    version: 'v2.1.0',
    date: '20 ноября 2025',
    title: 'VIP-контент и подписка',
    changes: [
      'Добавлены VIP-версии мастер-классов с расширенным содержимым',
      'Запущены тарифы: Базовый, Про и VIP',
      'Новый мастер-класс «Ускорение с AI» в VIP-доступе',
      'Система отзывов через Telegram',
    ],
  },
  {
    version: 'v2.0.0',
    date: '1 сентября 2025',
    title: 'Перезапуск платформы',
    changes: [
      'Полная переработка архитектуры платформы на React + TypeScript',
      'Запущены первые 5 интенсивов',
      'Новая система карточек курсов',
      'Поддержка тёмной темы и PWA',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen pb-24">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-primary/8 blur-[90px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Обновления</h1>
          <p className="text-slate-500 text-sm">История изменений платформы htmllessons</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <div className="space-y-10">
            {entries.map((entry, i) => (
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
