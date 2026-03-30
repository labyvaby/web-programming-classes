import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen, CheckCircle2, Trash2, Edit2, Save, Plus } from 'lucide-react';
import { coursesData } from '../data/courses';
import {
  getProfile, setProfile,
  getProgress,
  getLastVisited,
  getCustomCourses,
  removeCustomCourse,
  getCourseProgress,
} from '../services/storage';
import type { UserProfile } from '../types';
import ProgressBar from '../components/ui/ProgressBar';

export default function ProfilePage() {
  const [profile, setProfileState] = useState<UserProfile>(() => {
    const p = getProfile();
    return p ?? { displayName: 'Пользователь', createdAt: new Date().toISOString() };
  });
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.displayName);
  const [customCourses, setCustomCourses] = useState(() => getCustomCourses());
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

  const memberSince = new Date(profile.createdAt).toLocaleDateString('ru-RU', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div className="min-h-screen pb-24">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-primary/8 blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-10 max-w-4xl space-y-8">
        {/* Profile header */}
        <div className="flex items-center gap-6 p-6 rounded-2xl bg-card border border-white/8">
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
            <p className="text-slate-500 text-sm">Участник с {memberSince}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Начато курсов', value: startedCourses.length, icon: BookOpen },
            { label: 'Уроков пройдено', value: progress.length, icon: CheckCircle2 },
            { label: 'Своих курсов', value: customCourses.length, icon: Plus },
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
            <h2 className="text-lg font-bold text-white mb-4">Прогресс по курсам</h2>
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
            <h2 className="text-lg font-bold text-white mb-4">История обучения</h2>
            <div className="space-y-2">
              {lastVisited.slice(0, 8).map((entry, i) => {
                const course = allCourses.find(c => c.id === entry.courseId);
                const lesson = course?.lessons?.find(l => l.id === entry.lessonId);
                const date = new Date(entry.visitedAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
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
            <h2 className="text-lg font-bold text-white mb-4">Мои курсы</h2>
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
            <p className="mb-4">Вы ещё не начали ни одного курса</p>
            <Link to="/intensives" className="text-primary-light hover:text-white transition-colors text-sm font-semibold">
              Перейти к курсам →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
