import { Check, Star, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Базовый',
    price: 'Бесплатно',
    period: '',
    icon: Zap,
    color: 'from-slate-600 to-slate-700',
    borderColor: 'border-white/8',
    featured: false,
    features: [
      'Доступ к мастер-классам',
      'Просмотр превью-уроков',
      'Личный кабинет',
      'Добавление своих курсов',
      'Сохранение прогресса',
    ],
    disabled: ['Интенсивы', 'VIP-материалы', 'Поддержка куратора'],
    cta: 'Начать бесплатно',
    href: '/intensives',
  },
  {
    name: 'Про',
    price: '990 ₽',
    period: '/ месяц',
    icon: Star,
    color: 'from-primary to-primary-dark',
    borderColor: 'border-primary/40',
    featured: true,
    features: [
      'Все возможности базового',
      'Полный доступ к интенсивам',
      'Все мастер-классы без ограничений',
      'Исходные коды к урокам',
      'Доступ к закрытому чату',
      'Поддержка куратора',
    ],
    disabled: ['VIP-материалы'],
    cta: 'Подключить Про',
    href: 'https://t.me/red_support_chat',
  },
  {
    name: 'VIP',
    price: '2 490 ₽',
    period: '/ месяц',
    icon: Crown,
    color: 'from-amber-500 to-amber-600',
    borderColor: 'border-amber-500/30',
    featured: false,
    features: [
      'Всё из тарифа Про',
      'VIP-курсы и материалы',
      'Личные созвоны с автором',
      'Ревью кода от куратора',
      'Ранний доступ к новым курсам',
      'Приоритетная поддержка 24/7',
    ],
    disabled: [],
    cta: 'Получить VIP',
    href: 'https://t.me/red_support_chat',
  },
];

export default function PlansPage() {
  return (
    <div className="min-h-screen pb-24">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs font-semibold tracking-wider mb-6">
            <Star size={12} />
            ТАРИФЫ
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Выберите{' '}
            <span className="gradient-text">тариф</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Начните бесплатно и переходите на более высокий тариф когда понадобится.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl bg-card border ${plan.borderColor} p-6 transition-all duration-300 ${plan.featured ? 'shadow-glow scale-[1.02]' : 'hover:border-primary/20 hover:shadow-glow-sm'}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold shadow-glow-sm">
                      Популярный
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-glow-sm`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-white mb-1">{plan.name}</h2>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-white">{plan.price}</span>
                    {plan.period && <span className="text-slate-500 text-sm">{plan.period}</span>}
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1 space-y-2.5 mb-8">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-2.5">
                      <Check size={14} className="text-primary-light flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{f}</span>
                    </div>
                  ))}
                  {plan.disabled.map(f => (
                    <div key={f} className="flex items-start gap-2.5 opacity-40">
                      <div className="w-3.5 h-px bg-slate-600 flex-shrink-0 mt-2" />
                      <span className="text-sm text-slate-500">{f}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <a
                  href={plan.href}
                  target={plan.href.startsWith('http') ? '_blank' : undefined}
                  rel={plan.href.startsWith('http') ? 'noreferrer' : undefined}
                  className={`block text-center py-3 rounded-xl text-sm font-bold transition-all ${
                    plan.featured
                      ? 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-glow-sm hover:shadow-glow'
                      : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
