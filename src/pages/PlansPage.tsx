import { Check, Star, Zap, Crown } from 'lucide-react';
import { useI18n } from '../i18n';

export default function PlansPage() {
  const { language } = useI18n();
  const content = {
    kg: {
      badge: 'ТАРИФТЕР',
      title: 'Тарифти',
      titleAccent: 'тандаңыз',
      subtitle: 'Акысыз баштап, керек болгондо жогорку тарифке өтүңүз.',
      popular: 'Популярдуу',
      plans: [
        {
          name: 'Базалык',
          price: 'Акысыз',
          period: '',
          icon: Zap,
          color: 'from-slate-600 to-slate-700',
          borderColor: 'border-white/8',
          featured: false,
          features: ['Мастер-класстарга жетүү', 'Preview сабактарды көрүү', 'Жеке кабинет', 'Өз курстарын кошуу', 'Прогрессти сактоо'],
          disabled: ['Интенсивдер', 'VIP-материалдар', 'Куратордун колдоосу'],
          cta: 'Акысыз баштоо',
          href: '/intensives',
        },
        {
          name: 'Про',
          price: '990 сом',
          period: '/ ай',
          icon: Star,
          color: 'from-primary to-primary-dark',
          borderColor: 'border-primary/40',
          featured: true,
          features: ['Базалыктагынын баары', 'Интенсивдерге толук жетүү', 'Чектөөсүз мастер-класстар', 'Сабактардын баштапкы коду', 'Жабык чатка жетүү', 'Куратор колдоосу'],
          disabled: ['VIP-материалдар'],
          cta: 'Про туташтыруу',
          href: 'https://t.me/red_support_chat',
        },
        {
          name: 'VIP',
          price: '2 490 сом',
          period: '/ ай',
          icon: Crown,
          color: 'from-amber-500 to-amber-600',
          borderColor: 'border-amber-500/30',
          featured: false,
          features: ['Про тарифиндегинин баары', 'VIP курстар жана материалдар', 'Автор менен жеке жолугушуулар', 'Куратордон код ревью', 'Жаңы курстарга эрте жетүү', '24/7 приоритеттүү колдоо'],
          disabled: [],
          cta: 'VIP алуу',
          href: 'https://t.me/red_support_chat',
        },
      ],
    },
    ru: {
      badge: 'ТАРИФЫ',
      title: 'Выберите',
      titleAccent: 'тариф',
      subtitle: 'Начните бесплатно и переходите на более высокий тариф когда понадобится.',
      popular: 'Популярный',
      plans: [
        {
          name: 'Базовый',
          price: 'Бесплатно',
          period: '',
          icon: Zap,
          color: 'from-slate-600 to-slate-700',
          borderColor: 'border-white/8',
          featured: false,
          features: ['Доступ к мастер-классам', 'Просмотр превью-уроков', 'Личный кабинет', 'Добавление своих курсов', 'Сохранение прогресса'],
          disabled: ['Интенсивы', 'VIP-материалы', 'Поддержка куратора'],
          cta: 'Начать бесплатно',
          href: '/intensives',
        },
        {
          name: 'Про',
          price: '990 сом',
          period: '/ месяц',
          icon: Star,
          color: 'from-primary to-primary-dark',
          borderColor: 'border-primary/40',
          featured: true,
          features: ['Все возможности базового', 'Полный доступ к интенсивам', 'Все мастер-классы без ограничений', 'Исходные коды к урокам', 'Доступ к закрытому чату', 'Поддержка куратора'],
          disabled: ['VIP-материалы'],
          cta: 'Подключить Про',
          href: 'https://t.me/red_support_chat',
        },
        {
          name: 'VIP',
          price: '2 490 сом',
          period: '/ месяц',
          icon: Crown,
          color: 'from-amber-500 to-amber-600',
          borderColor: 'border-amber-500/30',
          featured: false,
          features: ['Всё из тарифа Про', 'VIP-курсы и материалы', 'Личные созвоны с автором', 'Ревью кода от куратора', 'Ранний доступ к новым курсам', 'Приоритетная поддержка 24/7'],
          disabled: [],
          cta: 'Получить VIP',
          href: 'https://t.me/red_support_chat',
        },
      ],
    },
    en: {
      badge: 'PLANS',
      title: 'Choose a',
      titleAccent: 'plan',
      subtitle: 'Start for free and upgrade when you need more features.',
      popular: 'Popular',
      plans: [
        {
          name: 'Basic',
          price: 'Free',
          period: '',
          icon: Zap,
          color: 'from-slate-600 to-slate-700',
          borderColor: 'border-white/8',
          featured: false,
          features: ['Access to master classes', 'Preview lessons', 'Personal account', 'Add your own courses', 'Progress tracking'],
          disabled: ['Intensives', 'VIP materials', 'Mentor support'],
          cta: 'Start free',
          href: '/intensives',
        },
        {
          name: 'Pro',
          price: '990 som',
          period: '/ month',
          icon: Star,
          color: 'from-primary to-primary-dark',
          borderColor: 'border-primary/40',
          featured: true,
          features: ['Everything in Basic', 'Full access to intensives', 'Unlimited master classes', 'Source code from lessons', 'Access to private chat', 'Mentor support'],
          disabled: ['VIP materials'],
          cta: 'Get Pro',
          href: 'https://t.me/red_support_chat',
        },
        {
          name: 'VIP',
          price: '2 490 som',
          period: '/ month',
          icon: Crown,
          color: 'from-amber-500 to-amber-600',
          borderColor: 'border-amber-500/30',
          featured: false,
          features: ['Everything in Pro', 'VIP courses and materials', 'Private calls with the author', 'Code review from mentor', 'Early access to new courses', 'Priority support 24/7'],
          disabled: [],
          cta: 'Get VIP',
          href: 'https://t.me/red_support_chat',
        },
      ],
    },
  } as const;

  const t = content[language];

  return (
    <div className="min-h-screen pb-24">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-3 min-[360px]:px-4 py-10 sm:py-16 max-w-5xl">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs font-semibold tracking-wider mb-6">
            <Star size={12} />
            {t.badge}
          </div>
          <h1 className="text-3xl min-[360px]:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            {t.title}{' '}
            <span className="gradient-text">{t.titleAccent}</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl bg-card border ${plan.borderColor} p-6 transition-all duration-300 ${plan.featured ? 'shadow-glow scale-[1.02]' : 'hover:border-primary/20 hover:shadow-glow-sm'}`}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white text-xs font-bold shadow-glow-sm">
                      {t.popular}
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
