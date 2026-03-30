import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Trash2, ChevronRight, AlertCircle } from 'lucide-react';
import { addCustomCourse } from '../services/storage';
import { toEmbedUrl, isYouTubeUrl } from '../utils/youtube';
import type { Lesson } from '../data/courses';
import { useI18n } from '../i18n';

interface LessonForm {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
}

const emptyLesson = (): LessonForm => ({ title: '', description: '', videoUrl: '', duration: '' });

export default function AddCoursePage() {
  const { language } = useI18n();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [lessons, setLessons] = useState<LessonForm[]>([emptyLesson()]);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const content = {
    kg: {
      courses: 'Курстар',
      addCourse: 'Курс кошуу',
      subtitle: 'YouTube сабактары менен өз курсуңузду кошуңуз. Курс браузерде сакталат.',
      fixErrors: 'Катачылыктарды оңдоңуз:',
      mainInfo: 'Негизги маалымат',
      courseTitle: 'Курстун аталышы *',
      courseTitlePlaceholder: 'Мисалы: React нөлдөн Pro го чейин',
      courseDescription: 'Курстун сүрөттөлүшү *',
      courseDescriptionPlaceholder: 'Бул курстан эмнени үйрөнөрүңүздү кыскача жазыңыз',
      preview: 'YouTube алдын ала көрүү шилтемеси',
      previewHint: 'Милдеттүү эмес. Видео курс барагында көрсөтүлөт.',
      lessons: 'Сабактар',
      lesson: 'Сабак',
      lessonTitle: 'Сабактын аталышы *',
      lessonTitlePlaceholder: 'Мисалы: Reactке киришүү',
      lessonDescription: 'Сабактын сүрөттөлүшү',
      lessonDescriptionPlaceholder: 'Бул сабакта эмнени өтөбүз',
      lessonYoutube: 'YouTube шилтемеси *',
      duration: 'Узактыгы',
      addLesson: 'Сабак кошуу',
      saveCourse: 'Курсту сактоо',
      errTitle: 'Курстун аталышын жазыңыз',
      errDescription: 'Курстун сүрөттөлүшүн жазыңыз',
      errPreview: 'Preview шилтемеси YouTube болушу керек',
      errLessonTitle: 'сабак: аталышты жазыңыз',
      errLessonVideo: 'сабак: видеого шилтеме жазыңыз',
      errLessonYoutube: 'сабак: шилтеме YouTube болушу керек',
    },
    ru: {
      courses: 'Курсы',
      addCourse: 'Добавить курс',
      subtitle: 'Добавьте свой курс с уроками на YouTube. Курс сохранится в браузере.',
      fixErrors: 'Исправьте ошибки:',
      mainInfo: 'Основная информация',
      courseTitle: 'Название курса *',
      courseTitlePlaceholder: 'Например: React с нуля до Pro',
      courseDescription: 'Описание курса *',
      courseDescriptionPlaceholder: 'Коротко опишите, чему научит этот курс',
      preview: 'Ссылка на YouTube-превью',
      previewHint: 'Необязательно. Видео будет отображено на странице курса.',
      lessons: 'Уроки',
      lesson: 'Урок',
      lessonTitle: 'Название урока *',
      lessonTitlePlaceholder: 'Например: Введение в React',
      lessonDescription: 'Описание урока',
      lessonDescriptionPlaceholder: 'Что изучим на этом уроке',
      lessonYoutube: 'Ссылка на YouTube *',
      duration: 'Длительность',
      addLesson: 'Добавить урок',
      saveCourse: 'Сохранить курс',
      errTitle: 'Введите название курса',
      errDescription: 'Введите описание курса',
      errPreview: 'Ссылка на превью должна быть YouTube-ссылкой',
      errLessonTitle: 'урок: введите название',
      errLessonVideo: 'урок: введите ссылку на видео',
      errLessonYoutube: 'урок: ссылка должна быть YouTube-ссылкой',
    },
    en: {
      courses: 'Courses',
      addCourse: 'Add course',
      subtitle: 'Add your own course with YouTube lessons. The course is saved in your browser.',
      fixErrors: 'Please fix errors:',
      mainInfo: 'Main information',
      courseTitle: 'Course title *',
      courseTitlePlaceholder: 'For example: React from zero to Pro',
      courseDescription: 'Course description *',
      courseDescriptionPlaceholder: 'Briefly describe what this course teaches',
      preview: 'YouTube preview link',
      previewHint: 'Optional. The video will be shown on the course page.',
      lessons: 'Lessons',
      lesson: 'Lesson',
      lessonTitle: 'Lesson title *',
      lessonTitlePlaceholder: 'For example: Introduction to React',
      lessonDescription: 'Lesson description',
      lessonDescriptionPlaceholder: 'What we will learn in this lesson',
      lessonYoutube: 'YouTube link *',
      duration: 'Duration',
      addLesson: 'Add lesson',
      saveCourse: 'Save course',
      errTitle: 'Enter course title',
      errDescription: 'Enter course description',
      errPreview: 'Preview link must be a YouTube link',
      errLessonTitle: 'lesson: enter title',
      errLessonVideo: 'lesson: enter video link',
      errLessonYoutube: 'lesson: link must be a YouTube link',
    },
  } as const;

  const t = content[language];

  const updateLesson = (idx: number, field: keyof LessonForm, value: string) => {
    setLessons(prev => prev.map((l, i) => i === idx ? { ...l, [field]: value } : l));
  };

  const addLesson = () => setLessons(prev => [...prev, emptyLesson()]);

  const removeLesson = (idx: number) => {
    setLessons(prev => prev.filter((_, i) => i !== idx));
  };

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!title.trim()) errs.push(t.errTitle);
    if (!description.trim()) errs.push(t.errDescription);
    if (previewUrl && !isYouTubeUrl(previewUrl)) errs.push(t.errPreview);
    lessons.forEach((l, i) => {
      if (!l.title.trim()) errs.push(`${t.lesson} ${i + 1}: ${t.errLessonTitle}`);
      if (!l.videoUrl.trim()) errs.push(`${t.lesson} ${i + 1}: ${t.errLessonVideo}`);
      else if (!isYouTubeUrl(l.videoUrl)) errs.push(`${t.lesson} ${i + 1}: ${t.errLessonYoutube}`);
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

      <div className="container mx-auto px-3 min-[360px]:px-4 py-8 sm:py-10 max-w-2xl">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-8">
          <Link to="/intensives" className="hover:text-slate-300 transition-colors">{t.courses}</Link>
          <ChevronRight size={12} />
          <span className="text-slate-400">{t.addCourse}</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-2xl min-[360px]:text-3xl font-black text-white mb-2">{t.addCourse}</h1>
          <p className="text-slate-500 text-sm">{t.subtitle}</p>
        </div>

        {submitted && errors.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 space-y-1">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm mb-2">
              <AlertCircle size={15} />
              {t.fixErrors}
            </div>
            {errors.map((e, i) => <p key={i} className="text-red-400/80 text-xs">• {e}</p>)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Course info */}
          <div className="p-4 sm:p-6 rounded-2xl bg-card border border-white/8 space-y-4">
            <h2 className="text-white font-semibold mb-4">{t.mainInfo}</h2>
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">{t.courseTitle}</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder={t.courseTitlePlaceholder}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">{t.courseDescription}</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder={t.courseDescriptionPlaceholder}
                rows={3}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">{t.preview}</label>
              <input
                value={previewUrl}
                onChange={e => setPreviewUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className={inputCls}
              />
              <p className="text-xs text-slate-600 mt-1.5">{t.previewHint}</p>
            </div>
          </div>

          {/* Lessons */}
          <div className="space-y-4">
            <h2 className="text-white font-semibold">{t.lessons}</h2>
            {lessons.map((lesson, idx) => (
              <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-card border border-white/8 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-primary-light">{t.lesson} {idx + 1}</span>
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
                  <label className="block text-xs text-slate-400 mb-1.5">{t.lessonTitle}</label>
                  <input
                    value={lesson.title}
                    onChange={e => updateLesson(idx, 'title', e.target.value)}
                    placeholder={t.lessonTitlePlaceholder}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">{t.lessonDescription}</label>
                  <textarea
                    value={lesson.description}
                    onChange={e => updateLesson(idx, 'description', e.target.value)}
                    placeholder={t.lessonDescriptionPlaceholder}
                    rows={2}
                    className={`${inputCls} resize-none`}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-400 mb-1.5">{t.lessonYoutube}</label>
                    <input
                      value={lesson.videoUrl}
                      onChange={e => updateLesson(idx, 'videoUrl', e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">{t.duration}</label>
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
              {t.addLesson}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-sm shadow-glow-sm hover:shadow-glow transition-all hover:scale-[1.01]"
          >
            {t.saveCourse}
          </button>
        </form>
      </div>
    </div>
  );
}
