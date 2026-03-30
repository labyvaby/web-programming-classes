import { ArrowRight, Star, Lock, Archive } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Course } from '../../data/courses';
import ProgressBar from './ProgressBar';
import { getCourseProgress } from '../../services/storage';
import { lessonWord, useI18n } from '../../i18n';

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const { language } = useI18n();
  const totalLessons = course.lessons?.length ?? 0;
  const progress = getCourseProgress(course.id, totalLessons);
  const hasProgress = progress > 0;

  const typeLabelMap: Record<Course['type'], Record<'kg' | 'ru' | 'en', string>> = {
    'intensive': { kg: 'ИНТЕНСИВ', ru: 'ИНТЕНСИВ', en: 'INTENSIVE' },
    'master-class': { kg: 'МАСТЕР-КЛАСС', ru: 'МАСТЕР-КЛАСС', en: 'MASTER CLASS' },
    'user-added': { kg: 'МЕНИН КУРСУМ', ru: 'МОЙ КУРС', en: 'MY COURSE' },
  };

  const archiveLabel = language === 'en' ? 'ARCHIVE' : language === 'kg' ? 'АРХИВ' : 'АРХИВ';
  const detailsLabel = language === 'en' ? 'Details' : language === 'kg' ? 'Толугураак' : 'Подробнее';

  return (
    <Link
      to={`/course/${course.id}`}
      className="group relative flex flex-col bg-card rounded-2xl border border-white/8 hover:border-primary/40 transition-all duration-300 hover:shadow-glow hover:-translate-y-1 overflow-hidden"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* VIP shimmer overlay */}
      {course.isVip && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none rounded-2xl" />
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Badges row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {course.isVip && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-bold tracking-wider border border-amber-500/20">
              <Star size={10} className="fill-amber-400" />
              VIP
            </span>
          )}
          {course.isArchive && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-500/10 text-slate-500 text-xs font-bold tracking-wider border border-slate-500/20">
              <Archive size={10} />
              {archiveLabel}
            </span>
          )}
          {course.isUserAdded && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary-light text-xs font-bold tracking-wider border border-primary/20">
              {language === 'en' ? 'MY COURSE' : language === 'kg' ? 'МЕНИН КУРСУМ' : 'МОЙ КУРС'}
            </span>
          )}
          <span className="inline-flex px-2.5 py-1 rounded-lg bg-white/5 text-slate-400 text-xs font-bold tracking-wider border border-white/8">
            {typeLabelMap[course.type][language]}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-base font-bold text-white mb-2 group-hover:text-primary-light transition-colors duration-200 leading-snug">
            {course.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-white/5 space-y-3">
          {hasProgress && (
            <ProgressBar value={progress} showLabel />
          )}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-light group-hover:text-white transition-colors">
              {course.isVip ? <Lock size={13} /> : null}
              {detailsLabel}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
            {totalLessons > 0 && (
              <span className="text-xs text-slate-600">
                {totalLessons} {lessonWord(totalLessons, language)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
