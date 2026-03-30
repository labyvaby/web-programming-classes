import { ExternalLink, Play, Send, GitBranch, Globe, Code2, BookOpen } from 'lucide-react';

const links = [
  {
    icon: Play,
    name: 'YouTube-канал',
    description: 'Бесплатные уроки по веб-разработке, анонсы новых курсов',
    href: 'https://youtube.com',
    color: 'text-red-400 bg-red-500/10 border-red-500/20',
  },
  {
    icon: Send,
    name: 'Telegram-канал',
    description: 'Новости платформы, обновления курсов, полезные материалы',
    href: 'https://t.me',
    color: 'text-[#0088cc] bg-[#0088cc]/10 border-[#0088cc]/20',
  },
  {
    icon: Send,
    name: 'Чат поддержки',
    description: 'Задайте вопрос команде htmllessons, мы всегда на связи',
    href: 'https://t.me/red_support_chat',
    color: 'text-[#0088cc] bg-[#0088cc]/10 border-[#0088cc]/20',
  },
  {
    icon: Send,
    name: 'Отзывы',
    description: 'Отзывы студентов о курсах и платформе',
    href: 'https://t.me/s/htmllessons_reviews',
    color: 'text-[#0088cc] bg-[#0088cc]/10 border-[#0088cc]/20',
  },
  {
    icon: GitBranch,
    name: 'GitHub',
    description: 'Репозитории с исходным кодом из курсов',
    href: 'https://github.com',
    color: 'text-slate-300 bg-white/5 border-white/10',
  },
  {
    icon: Globe,
    name: 'MDN Web Docs',
    description: 'Лучшая документация по HTML, CSS и JavaScript',
    href: 'https://developer.mozilla.org',
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  },
  {
    icon: Code2,
    name: 'Can I Use',
    description: 'Проверка поддержки CSS и JS API в разных браузерах',
    href: 'https://caniuse.com',
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  },
  {
    icon: BookOpen,
    name: 'JavaScript.info',
    description: 'Самый полный русскоязычный учебник по JavaScript',
    href: 'https://javascript.info',
    color: 'text-primary-light bg-primary/10 border-primary/20',
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen pb-24">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/8 blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="mb-10">
          <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Ссылки</h1>
          <p className="text-slate-500 text-sm">Полезные ресурсы для обучения и сообщество платформы</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-white/8 hover:border-primary/30 hover:shadow-glow-sm transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${link.color}`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors">{link.name}</span>
                    <ExternalLink size={11} className="text-slate-600 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">{link.description}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
