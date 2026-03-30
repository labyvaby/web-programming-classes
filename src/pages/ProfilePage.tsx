import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, BookOpen, CheckCircle2, Trash2, Edit2, Save, Plus, AlertTriangle } from 'lucide-react';
import { coursesData } from '../data/courses';
import {
  getProfile, setProfile,
  getProgress,
  getLastVisited,
  getCustomCourses,
  removeCustomCourse,
  getCourseProgress,
  clearAllData,
} from '../services/storage';
import type { UserProfile } from '../types';
import ProgressBar from '../components/ui/ProgressBar';
import { useI18n } from '../i18n';

export default function ProfilePage() {
  const { language, locale } = useI18n();
  const navigate = useNavigate();
  const [profile, setProfileState] = useState<UserProfile>(() => {
    const p = getProfile();
    const fallbackName = language === 'en' ? 'User' : language === 'kg' ? 'Колдонуучу' : 'Пользователь';
    return p ?? { displayName: fallbackName, createdAt: new Date().toISOString() };
  });
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.displayName);
  const [customCourses, setCustomCourses] = useState(() => getCustomCourses());
  const [confirmClear, setConfirmClear] = useState(false);
  const progress = getProgress();
  const lastVisited = getLastVisited();

  useEffect(() => {
    setProfile(profile);
  }, [profile]);

  const saveName = () => {
    const trimmed = nameInput.trim();
    if (trimmed) {
      setProfileState(p => ({ ...p, displayName: trimmed }));
    }
    setEditingName(false);
  };

  const handleRemoveCourse = (id: string) => {
    removeCustomCourse(id);
    setCustomCourses(getCustomCourses());
  };

  const handleClearAll = async () => {
    await clearAllData();
    navigate(0); // reload page to reset all state
  };

  const allCourses = [...coursesData, ...customCourses];
  const startedCourses = allCourses.filter(c => {
    const total = c.lessons?.length ?? 0;
    return getCourseProgress(c.id, total) > 0;
  });

  const initials = profile.displayName
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');

  const memberSince = new Date(profile.createdAt).toLocaleDateString(locale, {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const content = {
    kg: {
      memberSince: 'Катталган күнү',
      stats: ['Башталган курстар', 'Өтүлгөн сабактар', 'Өз курстары'],
      progressByCourses: 'Курстар боюнча прогресс',
      history: 'Окуу тарыхы',
      myCourses: 'Менин курстарым',
      empty: 'Сиз азырынча бир да курс баштаган жоксуз',
      toCourses: 'Курстарга өтүү ->',
      dangerZone: 'Коркунучтуу аймак',
      clearAll: 'Бардык маалыматты тазалоо',
      clearAllHint: 'Прогресс, тарых жана кошулган курстардын баары өчүрүлөт. Кайтарып алуу мүмкүн эмес.',
      clearConfirm: 'Ырастоо — баарын өчүрүү',
      clearCancel: 'Жок, артка',
    },
    ru: {
      memberSince: 'Участник с',
      stats: ['Начато курсов', 'Уроков пройдено', 'Своих курсов'],
      progressByCourses: 'Прогресс по курсам',
      history: 'История обучения',
      myCourses: 'Мои курсы',
      empty: 'Вы ещё не начали ни одного курса',
      toCourses: 'Перейти к курсам ->',
      dangerZone: 'Опасная зона',
      clearAll: 'Очистить все данные',
      clearAllHint: 'Удалит весь прогресс, историю и добавленные курсы. Действие необратимо.',
      clearConfirm: 'Подтвердить — удалить всё',
      clearCancel: 'Нет, отмена',
    },
    en: {
      memberSince: 'Member since',
      stats: ['Started courses', 'Completed lessons', 'My courses'],
      progressByCourses: 'Course progress',
      history: 'Learning history',
      myCourses: 'My courses',
      empty: 'You have not started any course yet',
      toCourses: 'Go to courses ->',
      dangerZone: 'Danger zone',
      clearAll: 'Clear all data',
      clearAllHint: 'Deletes all progress, history and added courses. This action is irreversible.',
      clearConfirm: 'Confirm — delete everything',
      clearCancel: 'No, cancel',
    },
  } as const;
  const t = content[language];

  return (
    <div className="min-h-screen pb-24">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/8 blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-3 min-[360px]:px-4 py-8 sm:py-10 max-w-4xl space-y-8">
        {/* Profile header */}
        <div className="flex flex-col min-[420px]:flex-row min-[420px]:items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-card border border-white/8">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-2xl font-black flex-shrink-0 shadow-glow-sm">
            {initials || <User size={28} />}
          </div>

          {/* Name & info */}
          <div className="flex-1 min-w-0">
            {editingName ? (
              <div className="flex items-center gap-2 mb-1">
                <input
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && saveName()}
                  autoFocus
                  className="bg-white/5 border border-primary/30 rounded-lg px-3 py-1.5 text-white text-lg font-bold focus:outline-none focus:border-primary"
                />
                <button onClick={saveName} className="text-primary-light hover:text-white transition-colors">
                  <Save size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-white">{profile.displayName}</h1>
                <button
                  onClick={() => { setNameInput(profile.displayName); setEditingName(true); }}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Edit2 size={14} />
                </button>
              </div>
            )}
            <p className="text-slate-500 text-sm">{t.memberSince} {memberSince}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 min-[420px]:grid-cols-3 gap-4">
          {[
            { label: t.stats[0], value: startedCourses.length, icon: BookOpen },
            { label: t.stats[1], value: progress.length, icon: CheckCircle2 },
            { label: t.stats[2], value: customCourses.length, icon: Plus },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="p-5 rounded-2xl bg-card border border-white/8 text-center">
              <Icon size={20} className="text-primary-light mx-auto mb-2" />
              <div className="text-2xl font-black text-white">{value}</div>
              <div className="text-xs text-slate-500 mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Course progress */}
        {startedCourses.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">{t.progressByCourses}</h2>
            <div className="space-y-3">
              {startedCourses.map(course => {
                const total = course.lessons?.length ?? 0;
                const ratio = getCourseProgress(course.id, total);
                return (
                  <Link
                    key={course.id}
                    to={`/course/${course.id}`}
                    className="block p-4 rounded-2xl bg-card border border-white/8 hover:border-primary/30 transition-all"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-white">{course.title}</span>
                      <span className="text-xs text-slate-500">{Math.round(ratio * 100)}%</span>
                    </div>
                    <ProgressBar value={ratio} />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* History */}
        {lastVisited.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">{t.history}</h2>
            <div className="space-y-2">
              {lastVisited.slice(0, 8).map((entry, i) => {
                const course = allCourses.find(c => c.id === entry.courseId);
                const lesson = course?.lessons?.find(l => l.id === entry.lessonId);
                const date = new Date(entry.visitedAt).toLocaleDateString(locale, { day: 'numeric', month: 'short' });
                const link = lesson
                  ? `/course/${entry.courseId}/lesson/${entry.lessonId}`
                  : `/course/${entry.courseId}`;
                return (
                  <Link
                    key={i}
                    to={link}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/8 hover:border-primary/30 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen size={14} className="text-primary-light" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{course?.title ?? entry.courseId}</p>
                      {lesson && <p className="text-xs text-slate-500 truncate">{lesson.title}</p>}
                    </div>
                    <div className="text-xs text-slate-600 flex-shrink-0">{date}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* My courses */}
        {customCourses.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4">{t.myCourses}</h2>
            <div className="space-y-3">
              {customCourses.map(course => (
                <div key={course.id} className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-white/8">
                  <Link to={`/course/${course.id}`} className="flex-1 min-w-0 group">
                    <p className="text-sm font-semibold text-white group-hover:text-primary-light transition-colors truncate">{course.title}</p>
                    <p className="text-xs text-slate-500 truncate">{course.description}</p>
                  </Link>
                  <button
                    onClick={() => handleRemoveCourse(course.id)}
                    className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0 p-1.5 rounded-lg hover:bg-red-500/10"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {startedCourses.length === 0 && lastVisited.length === 0 && customCourses.length === 0 && (
          <div className="text-center py-20 text-slate-600">
            <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
            <p className="mb-4">{t.empty}</p>
            <Link to="/intensives" className="text-primary-light hover:text-white transition-colors text-sm font-semibold">
              {t.toCourses}
            </Link>
          </div>
        )}

        {/* Danger zone */}
        <div className="p-5 rounded-2xl border border-red-500/20 bg-red-500/5">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle size={15} className="text-red-400" />
            <h2 className="text-sm font-bold text-red-400">{t.dangerZone}</h2>
          </div>
          <p className="text-xs text-slate-500 mb-4">{t.clearAllHint}</p>
          {!confirmClear ? (
            <button
              onClick={() => setConfirmClear(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all"
            >
              <Trash2 size={15} />
              {t.clearAll}
            </button>
          ) : (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-all"
              >
                <AlertTriangle size={15} />
                {t.clearConfirm}
              </button>
              <button
                onClick={() => setConfirmClear(false)}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm font-semibold hover:bg-white/10 transition-all"
              >
                {t.clearCancel}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
