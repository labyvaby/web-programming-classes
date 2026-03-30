import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Sparkles } from 'lucide-react';
import CourseCard from '../components/ui/CourseCard';
import { coursesData } from '../data/courses';
import { getCustomCourses } from '../services/storage';

type Filter = 'all' | 'intensive' | 'master-class' | 'user-added';

export default function IntensivesPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const customCourses = getCustomCourses();
  const allCourses = useMemo(() => [...coursesData, ...customCourses], []);

  const filteredCourses = useMemo(() => {
    if (filter === 'all') return allCourses;
    return allCourses.filter(c => c.type === filter);
  }, [filter, allCourses]);

  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'Все курсы' },
    { key: 'intensive', label: 'Интенсивы' },
    { key: 'master-class', label: 'Мастер-классы' },
    ...(customCourses.length > 0 ? [{ key: 'user-added' as Filter, label: 'Мои курсы' }] : []),
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <section className="relative pt-20 pb-28 overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[130px] -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-1/5 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-primary/8 rounded-full blur-[80px] -z-10 pointer-events-none" />

        <div className="container mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary-light text-xs font-semibold tracking-wider mb-8">
            <Sparkles size={12} />
            ВЕБ-РАЗРАБОТКА С НУЛЯ
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-[1.05]">
            Обучающие{' '}
            <span className="gradient-text">программы</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Интенсивы и мастер-классы по веб-разработке. Практика с первого дня. Подходит для начинающих и продвинутых разработчиков.
          </p>

          {/* Filters */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {filters.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
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
            <p className="text-lg mb-4">Курсов не найдено</p>
            <Link to="/add-course" className="inline-flex items-center gap-2 text-primary-light hover:text-white transition-colors">
              <Plus size={16} />
              Добавить свой курс
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
        className="fixed bottom-8 right-8 flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-bold shadow-glow hover:shadow-glow-lg hover:scale-105 transition-all duration-300 z-40"
      >
        <Plus size={18} />
        Добавить курс
      </Link>
    </div>
  );
}
