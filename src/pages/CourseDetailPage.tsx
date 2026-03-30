import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronRight, Star, Archive, CheckCircle2, Circle, BookOpen, Play } from 'lucide-react';
import { coursesData } from '../data/courses';
import { getCustomCourses, recordVisit, getCourseProgress, isLessonComplete } from '../services/storage';
import ProgressBar from '../components/ui/ProgressBar';

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const allCourses = [...coursesData, ...getCustomCourses()];
  const course = allCourses.find(c => c.id === id);

  useEffect(() => {
    if (id) recordVisit(id);
  }, [id]);

  if (!course) return <Navigate to="/intensives" replace />;

  const lessons = course.lessons ?? [];
  const totalLessons = lessons.length;
  const progress = getCourseProgress(course.id, totalLessons);
  const completedCount = Math.round(progress * totalLessons);

  const typeLabelMap: Record<string, string> = {
    'intensive': 'ИНТЕНСИВ',
    'master-class': 'МАСТЕР-КЛАСС',
    'user-added': 'МОЙ КУРС',
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Background glow */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/intensives" className="hover:text-slate-300 transition-colors">Курсы</Link>
          <ChevronRight size={14} />
          <span className="text-slate-300">{course.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {course.isVip && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/20">
                <Star size={10} className="fill-amber-400" /> VIP
              </span>
            )}
            {course.isArchive && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-500/10 text-slate-500 text-xs font-bold border border-slate-500/20">
                <Archive size={10} /> АРХИВ
              </span>
            )}
            <span className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary-light text-xs font-bold border border-primary/20">
              {typeLabelMap[course.type] ?? course.type.toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">{course.title}</h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">{course.description}</p>
        </div>

        {/* Video preview */}
        {course.previewVideoUrl && (
          <div className="mb-10 rounded-2xl overflow-hidden border border-white/8 shadow-glow aspect-video">
            <iframe
              src={course.previewVideoUrl}
              title={course.title}
              className="w-full h-full"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}

        {/* Progress */}
        {totalLessons > 0 && (
          <div className="mb-10 p-5 rounded-2xl bg-card border border-white/8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-white font-semibold">
                <BookOpen size={16} className="text-primary-light" />
                Прогресс курса
              </div>
              <span className="text-sm text-slate-400">
                {completedCount} из {totalLessons} уроков
              </span>
            </div>
            <ProgressBar value={progress} />
          </div>
        )}

        {/* Lessons */}
        {lessons.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Play size={18} className="text-primary-light" />
              Уроки курса
            </h2>
            <div className="space-y-3">
              {lessons.map((lesson, idx) => {
                const done = isLessonComplete(course.id, lesson.id);
                return (
                  <Link
                    key={lesson.id}
                    to={`/course/${course.id}/lesson/${lesson.id}`}
                    className="group flex items-center gap-4 p-5 rounded-2xl bg-card border border-white/8 hover:border-primary/40 hover:shadow-glow-sm transition-all duration-200"
                  >
                    {/* Number / Check */}
                    <div className="flex-shrink-0">
                      {done ? (
                        <CheckCircle2 size={24} className="text-primary-light" />
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-white/20 flex items-center justify-center">
                          <span className="text-xs text-slate-500 font-bold">{idx + 1}</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className={`font-semibold text-sm group-hover:text-primary-light transition-colors ${done ? 'text-slate-400' : 'text-white'}`}>
                        {lesson.title}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5 truncate">{lesson.description}</p>
                    </div>

                    {/* Duration */}
                    {lesson.duration && (
                      <span className="text-xs text-slate-500 flex-shrink-0">{lesson.duration}</span>
                    )}

                    {/* Arrow */}
                    <ChevronRight size={16} className="text-slate-600 flex-shrink-0 group-hover:text-primary-light transition-colors" />
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 text-slate-600">
            <Circle size={40} className="mx-auto mb-4 opacity-30" />
            <p>Уроки появятся совсем скоро</p>
          </div>
        )}
      </div>
    </div>
  );
}
