import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Sparkles } from 'lucide-react';
import CourseCard from '../components/ui/CourseCard';
import { coursesData } from '../data/courses';
import { getCustomCourses } from '../services/storage';
import { useI18n } from '../i18n';

type Filter = 'all' | 'intensive' | 'master-class' | 'user-added';

export default function IntensivesPage() {
  const { language } = useI18n();
  const [filter, setFilter] = useState<Filter>('all');
  const customCourses = getCustomCourses();
  const allCourses = useMemo(() => [...coursesData, ...customCourses], []);

  const filteredCourses = useMemo(() => {
    if (filter === 'all') return allCourses;
    return allCourses.filter(c => c.type === filter);
  }, [filter, allCourses]);

  const content = {
    kg: {
      badge: 'КЫРГЫЗСТАНДАГЫ ВЕБ-ИШТЕП ЧЫГУУ',
      title: 'Окутуу',
      titleAccent: 'программалары',
      description: 'Кыргызстандагы иштеп чыгуучулар үчүн веб-иштеп чыгуу боюнча интенсивдер жана мастер-класстар. Практика биринчи күндөн башталат.',
      filters: {
        all: 'Бардык курстар',
        intensive: 'Интенсивдер',
        masterClass: 'Мастер-класстар',
        myCourses: 'Менин курстарым',
      },
      empty: 'Курстар табылган жок',
      addOwnCourse: 'Өз курсуңду кошуу',
      addCourse: 'Курс кошуу',
    },
    ru: {
      badge: 'ВЕБ-РАЗРАБОТКА В КЫРГЫЗСТАНЕ',
      title: 'Обучающие',
      titleAccent: 'программы',
      description: 'Интенсивы и мастер-классы по веб-разработке для разработчиков из Кыргызстана. Практика с первого дня. Подходит для начинающих и продвинутых.',
      filters: {
        all: 'Все курсы',
        intensive: 'Интенсивы',
        masterClass: 'Мастер-классы',
        myCourses: 'Мои курсы',
      },
      empty: 'Курсов не найдено',
      addOwnCourse: 'Добавить свой курс',
      addCourse: 'Добавить курс',
    },
    en: {
      badge: 'WEB DEVELOPMENT IN KYRGYZSTAN',
      title: 'Learning',
      titleAccent: 'programs',
      description: 'Intensives and master classes in web development for developers in Kyrgyzstan. Practice starts from day one for beginners and advanced learners.',
      filters: {
        all: 'All courses',
        intensive: 'Intensives',
        masterClass: 'Master classes',
        myCourses: 'My courses',
      },
      empty: 'No courses found',
      addOwnCourse: 'Add your own course',
      addCourse: 'Add course',
    },
  } as const;

  const t = content[language];

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.filters.all },
    { key: 'intensive', label: t.filters.intensive },
    { key: 'master-class', label: t.filters.masterClass },
    ...(customCourses.length > 0 ? [{ key: 'user-added' as Filter, label: t.filters.myCourses }] : []),
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="relative pt-14 sm:pt-20 pb-20 sm:pb-28 overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[130px] -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-1/5 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-primary/8 rounded-full blur-[80px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-[10px] sm:text-xs font-semibold tracking-wider mb-6 sm:mb-8">
            <Sparkles size={12} />
            {t.badge}
          </div>

          <h1 className="text-3xl min-[360px]:text-4xl md:text-7xl font-black text-white mb-5 sm:mb-6 tracking-tight leading-[1.05]">
            {t.title}{' '}
            <span className="gradient-text">{t.titleAccent}</span>
          </h1>
          <p className="text-base min-[360px]:text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
            {t.description}
          </p>

          {/* Filters */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 min-[360px]:px-4 sm:px-5 py-2 rounded-xl text-xs min-[360px]:text-sm font-semibold transition-all duration-200 ${
                  filter === key
                    ? 'bg-primary text-white shadow-glow-sm scale-[1.02]'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/8'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="container mx-auto px-4">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-20 text-slate-600">
            <p className="text-lg mb-4">{t.empty}</p>
            <Link to="/add-course" className="inline-flex items-center gap-2 text-primary-light hover:text-white transition-colors">
              <Plus size={16} />
              {t.addOwnCourse}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Floating Add button */}
      <Link
        to="/add-course"
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-8 sm:bottom-8 flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-bold shadow-glow hover:shadow-glow-lg transition-all duration-300 z-40"
      >
        <Plus size={18} />
        {t.addCourse}
      </Link>
    </div>
  );
}
