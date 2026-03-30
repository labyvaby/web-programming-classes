import { useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft, CheckCircle2, BookOpen } from 'lucide-react';
import { coursesData } from '../data/courses';
import { getCustomCourses, recordVisit, isLessonComplete } from '../services/storage';
import { useProgress } from '../hooks/useProgress';
import { useI18n } from '../i18n';
import { toYouTubeSearchEmbedUrl } from '../utils/youtube';
import { useMediaUrl } from '../hooks/useMediaUrl';

export default function LessonPage() {
  const { language } = useI18n();
  const { id, lessonId } = useParams<{ id: string; lessonId: string }>();
  const navigate = useNavigate();
  const { markComplete, checkComplete } = useProgress();

  const allCourses = [...coursesData, ...getCustomCourses()];
  const course = allCourses.find(c => c.id === id);
  const lessons = course?.lessons ?? [];
  const lessonIndex = lessons.findIndex(l => l.id === lessonId);
  const lesson = lessons[lessonIndex];

  const prevLesson = lessonIndex > 0 ? lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < lessons.length - 1 ? lessons[lessonIndex + 1] : null;

  useEffect(() => {
    if (id && lessonId) recordVisit(id, lessonId);
  }, [id, lessonId]);

  if (!course || !lesson) return <Navigate to={`/course/${id}`} replace />;

  const done = checkComplete(course.id, lesson.id);
  const rawLessonVideoUrl = (lesson.videoUrl && lesson.videoUrl.length > 0)
    ? lesson.videoUrl
    : toYouTubeSearchEmbedUrl(`${course.title} ${lesson.title} tutorial`);
  const lessonVideoUrl = useMediaUrl(rawLessonVideoUrl);
  const isIframeSource = Boolean(lessonVideoUrl?.includes('youtube.com/embed'));
  const content = {
    kg: {
      courses: 'Курстар',
      markComplete: 'Аткарылды деп белгилөө',
      completed: 'Сабак аткарылды',
      nextLesson: 'Кийинки сабак',
      doneNext: 'Аткарылды -> Кийинки',
      previous: 'Мурунку',
      next: 'Кийинки',
      lessons: 'Курстун сабактары',
    },
    ru: {
      courses: 'Курсы',
      markComplete: 'Отметить как выполненное',
      completed: 'Урок выполнен',
      nextLesson: 'Следующий урок',
      doneNext: 'Выполнено -> Далее',
      previous: 'Предыдущий',
      next: 'Следующий',
      lessons: 'Уроки курса',
    },
    en: {
      courses: 'Courses',
      markComplete: 'Mark as complete',
      completed: 'Lesson completed',
      nextLesson: 'Next lesson',
      doneNext: 'Done -> Next',
      previous: 'Previous',
      next: 'Next',
      lessons: 'Course lessons',
    },
  } as const;
  const t = content[language];

  const handleComplete = () => {
    if (!done) markComplete(course.id, lesson.id);
    if (nextLesson) navigate(`/course/${course.id}/lesson/${nextLesson.id}`);
  };

  // Also available as a standalone mark (already completed state)
  const handleMarkOnly = () => {
    if (!done) markComplete(course.id, lesson.id);
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-3 min-[360px]:px-4 py-6 sm:py-8 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8 flex-wrap">
          <Link to="/intensives" className="hover:text-slate-300 transition-colors">{t.courses}</Link>
          <ChevronRight size={12} />
          <Link to={`/course/${course.id}`} className="hover:text-slate-300 transition-colors">{course.title}</Link>
          <ChevronRight size={12} />
          <span className="text-slate-400">{lesson.title}</span>
        </nav>

        <div className="flex gap-8 items-start">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Video */}
            <div className="rounded-2xl overflow-hidden border border-white/8 shadow-glow mb-8 aspect-video bg-black/30">
              {lessonVideoUrl && (isIframeSource ? (
                <iframe
                  src={lessonVideoUrl}
                  title={lesson.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <video
                  src={lessonVideoUrl}
                  className="w-full h-full"
                  controls
                  preload="metadata"
                />
              ))}
            </div>

            {/* Title & description */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary-light">
                  {lessonIndex + 1}
                </span>
                {done && <CheckCircle2 size={18} className="text-primary-light" />}
              </div>
              <h1 className="text-xl min-[360px]:text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">{lesson.title}</h1>
              <p className="text-slate-400 text-base leading-relaxed">{lesson.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              {!done ? (
                <button
                  onClick={handleMarkOnly}
                  className="w-full min-[420px]:w-auto flex items-center justify-center gap-2 px-4 min-[420px]:px-5 py-2.5 rounded-xl bg-primary/10 text-primary-light border border-primary/20 text-sm font-semibold hover:bg-primary/20 transition-all"
                >
                  <CheckCircle2 size={16} />
                  {t.markComplete}
                </button>
              ) : (
                <div className="w-full min-[420px]:w-auto flex items-center justify-center gap-2 px-4 min-[420px]:px-5 py-2.5 rounded-xl bg-primary/10 text-primary-light border border-primary/20 text-sm font-semibold">
                  <CheckCircle2 size={16} />
                  {t.completed}
                </div>
              )}

              {nextLesson && (
                <button
                  onClick={handleComplete}
                  className="w-full min-[420px]:w-auto flex items-center justify-center gap-2 px-4 min-[420px]:px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all"
                >
                  {done ? t.nextLesson : t.doneNext}
                  <ChevronRight size={16} />
                </button>
              )}
            </div>

            {/* Prev/Next nav */}
            <div className="flex gap-4 mt-8 pt-8 border-t border-white/8">
              {prevLesson ? (
                <Link
                  to={`/course/${course.id}/lesson/${prevLesson.id}`}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                  <div>
                    <div className="text-xs text-slate-600 mb-0.5">{t.previous}</div>
                    <div>{prevLesson.title}</div>
                  </div>
                </Link>
              ) : <div />}

              {nextLesson && (
                <Link
                  to={`/course/${course.id}/lesson/${nextLesson.id}`}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group ml-auto text-right"
                >
                  <div>
                    <div className="text-xs text-slate-600 mb-0.5">{t.next}</div>
                    <div>{nextLesson.title}</div>
                  </div>
                  <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar — lesson list */}
          <aside className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
            <div className="bg-card rounded-2xl border border-white/8 overflow-hidden">
              <div className="p-4 border-b border-white/8 flex items-center gap-2">
                <BookOpen size={14} className="text-primary-light" />
                <span className="text-sm font-semibold text-white">{t.lessons}</span>
                <span className="ml-auto text-xs text-slate-500">{lessons.length}</span>
              </div>
              <div className="divide-y divide-white/5 max-h-[60vh] overflow-y-auto">
                {lessons.map((l, idx) => {
                  const isActive = l.id === lessonId;
                  const isDone = isLessonComplete(course.id, l.id);
                  return (
                    <Link
                      key={l.id}
                      to={`/course/${course.id}/lesson/${l.id}`}
                      className={`flex items-center gap-3 px-4 py-3 transition-colors text-sm ${
                        isActive
                          ? 'bg-primary/10 text-primary-light'
                          : 'text-slate-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <span className="flex-shrink-0">
                        {isDone
                          ? <CheckCircle2 size={14} className="text-primary-light" />
                          : <span className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center text-[10px] text-slate-600">{idx + 1}</span>
                        }
                      </span>
                      <span className="truncate">{l.title}</span>
                      {l.duration && <span className="text-xs text-slate-600 flex-shrink-0 ml-auto">{l.duration}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
