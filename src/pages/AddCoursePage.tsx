import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Trash2, ChevronRight, AlertCircle } from 'lucide-react';
import { addCustomCourse } from '../services/storage';
import { toEmbedUrl, isYouTubeUrl } from '../utils/youtube';
import type { Lesson } from '../data/courses';

interface LessonForm {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
}

const emptyLesson = (): LessonForm => ({ title: '', description: '', videoUrl: '', duration: '' });

export default function AddCoursePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [lessons, setLessons] = useState<LessonForm[]>([emptyLesson()]);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const updateLesson = (idx: number, field: keyof LessonForm, value: string) => {
    setLessons(prev => prev.map((l, i) => i === idx ? { ...l, [field]: value } : l));
  };

  const addLesson = () => setLessons(prev => [...prev, emptyLesson()]);

  const removeLesson = (idx: number) => {
    setLessons(prev => prev.filter((_, i) => i !== idx));
  };

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!title.trim()) errs.push('Введите название курса');
    if (!description.trim()) errs.push('Введите описание курса');
    if (previewUrl && !isYouTubeUrl(previewUrl)) errs.push('Ссылка на превью должна быть YouTube-ссылкой');
    lessons.forEach((l, i) => {
      if (!l.title.trim()) errs.push(`Урок ${i + 1}: введите название`);
      if (!l.videoUrl.trim()) errs.push(`Урок ${i + 1}: введите ссылку на видео`);
      else if (!isYouTubeUrl(l.videoUrl)) errs.push(`Урок ${i + 1}: ссылка должна быть YouTube-ссылкой`);
    });
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate();
    if (errs.length > 0) { setErrors(errs); return; }

    const id = crypto.randomUUID();
    const builtLessons: Lesson[] = lessons.map((l, idx) => ({
      id: `lesson-${idx + 1}`,
      title: l.title.trim(),
      description: l.description.trim(),
      videoUrl: toEmbedUrl(l.videoUrl) ?? l.videoUrl,
      duration: l.duration.trim() || undefined,
      order: idx + 1,
    }));

    addCustomCourse({
      id,
      title: title.trim(),
      description: description.trim(),
      link: `/course/${id}`,
      type: 'user-added',
      isUserAdded: true,
      previewVideoUrl: previewUrl ? (toEmbedUrl(previewUrl) ?? undefined) : undefined,
      lessons: builtLessons,
    });

    navigate(`/course/${id}`);
  };

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all';

  return (
    <div className="min-h-screen pb-24">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-primary/8 blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-10 max-w-2xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-8">
          <Link to="/intensives" className="hover:text-slate-300 transition-colors">Курсы</Link>
          <ChevronRight size={12} />
          <span className="text-slate-400">Добавить курс</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-black text-white mb-2">Добавить курс</h1>
          <p className="text-slate-500 text-sm">Добавьте свой курс с уроками на YouTube. Курс сохранится в браузере.</p>
        </div>

        {submitted && errors.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-1">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-2">
              <AlertCircle size={15} />
              Исправьте ошибки:
            </div>
            {errors.map((e, i) => <p key={i} className="text-red-400/80 text-xs">• {e}</p>)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course info */}
          <div className="p-6 rounded-2xl bg-card border border-white/8 space-y-4">
            <h2 className="text-white font-semibold mb-4">Основная информация</h2>
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">Название курса *</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Например: React с нуля до Pro"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">Описание курса *</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Коротко опишите, чему научит этот курс"
                rows={3}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">Ссылка на YouTube-превью</label>
              <input
                value={previewUrl}
                onChange={e => setPreviewUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className={inputCls}
              />
              <p className="text-xs text-slate-600 mt-1.5">Необязательно. Видео будет отображено на странице курса.</p>
            </div>
          </div>

          {/* Lessons */}
          <div className="space-y-4">
            <h2 className="text-white font-semibold">Уроки</h2>
            {lessons.map((lesson, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-card border border-white/8 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-primary-light">Урок {idx + 1}</span>
                  {lessons.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLesson(idx)}
                      className="text-slate-600 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-500/10"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Название урока *</label>
                  <input
                    value={lesson.title}
                    onChange={e => updateLesson(idx, 'title', e.target.value)}
                    placeholder="Например: Введение в React"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Описание урока</label>
                  <textarea
                    value={lesson.description}
                    onChange={e => updateLesson(idx, 'description', e.target.value)}
                    placeholder="Что изучим на этом уроке"
                    rows={2}
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs text-slate-400 mb-1.5">Ссылка на YouTube *</label>
                    <input
                      value={lesson.videoUrl}
                      onChange={e => updateLesson(idx, 'videoUrl', e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Длительность</label>
                    <input
                      value={lesson.duration}
                      onChange={e => updateLesson(idx, 'duration', e.target.value)}
                      placeholder="15:30"
                      className={inputCls}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addLesson}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/15 text-slate-500 hover:text-primary-light hover:border-primary/30 transition-all text-sm font-medium"
            >
              <Plus size={16} />
              Добавить урок
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-glow-sm hover:shadow-glow transition-all hover:scale-[1.01]"
          >
            Сохранить курс
          </button>
        </form>
      </div>
    </div>
  );
}
