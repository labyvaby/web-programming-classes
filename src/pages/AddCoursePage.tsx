import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Plus, Trash2, ChevronRight, AlertCircle, Link2, Upload, PlayCircle, XCircle } from 'lucide-react';
import { addCustomCourse } from '../services/storage';
import { saveMedia } from '../services/mediaStorage';
import { toEmbedUrl, isYouTubeUrl } from '../utils/youtube';
import type { Lesson } from '../data/courses';
import { useI18n } from '../i18n';

type VideoSource = 'link' | 'file';

interface LessonForm {
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  videoSource: VideoSource;
  videoFileName?: string;
  videoFile?: File;
}

const MAX_VIDEO_SIZE_BYTES = 20 * 1024 * 1024;

const emptyLesson = (): LessonForm => ({
  title: '',
  description: '',
  videoUrl: '',
  duration: '',
  videoSource: 'link',
});

function isHttpUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('read-file-failed'));
    reader.readAsDataURL(file);
  });
}

function normalizeDurationInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}:${digits.slice(2)}`;
}

function finalizeDurationInput(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (!digits) return '';
  const minutes = digits.slice(0, 2).padStart(2, '0');
  const seconds = (digits.slice(2, 4) || '00').padEnd(2, '0');
  return `${minutes}:${seconds}`;
}

function getLessonFileFromInput(idx: number): File | null {
  const input = document.getElementById(`lesson-file-${idx}`) as HTMLInputElement | null;
  return input?.files?.[0] ?? null;
}

function getCoursePreviewFileFromInput(): File | null {
  const input = document.getElementById('course-preview-file') as HTMLInputElement | null;
  return input?.files?.[0] ?? null;
}

export default function AddCoursePage() {
  const { language } = useI18n();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewSource, setPreviewSource] = useState<VideoSource>('link');
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewFileName, setPreviewFileName] = useState('');
  const [previewFile, setPreviewFile] = useState<File | null>(null);
  const [lessons, setLessons] = useState<LessonForm[]>([emptyLesson()]);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const content = {
    kg: {
      courses: 'Курстар',
      addCourse: 'Курс кошуу',
      subtitle: 'YouTube же файл менен өз курсуңузду кошуңуз. Курс браузерде сакталат.',
      fixErrors: 'Катачылыктарды оңдоңуз:',
      mainInfo: 'Негизги маалымат',
      courseTitle: 'Курстун аталышы *',
      courseTitlePlaceholder: 'Мисалы: React нөлдөн Pro го чейин',
      courseDescription: 'Курстун сүрөттөлүшү *',
      courseDescriptionPlaceholder: 'Бул курстан эмнени үйрөнөрүңүздү кыскача жазыңыз',
      preview: 'Курстун видеосуна превью',
      previewHint: 'Милдеттүү эмес. Курс бетинде көрсөтүлөт.',
      previewSource: 'Превью булагы',
      previewLinkLabel: 'Превью шилтемеси',
      previewLinkPlaceholder: 'https://youtube.com/watch?v=... же mp4 шилтеме',
      previewFileLabel: 'Түзмөктөн превью видео',
      previewFileHint: 'MP4/WebM колдонот. Максималдуу өлчөм: 20MB.',
      previewSelectedFile: 'Превью файлы',
      removePreview: 'Превьюну өчүрүү',
      lessons: 'Сабактар',
      lesson: 'Сабак',
      lessonTitle: 'Сабактын аталышы *',
      lessonTitlePlaceholder: 'Мисалы: Reactке киришүү',
      lessonDescription: 'Сабактын сүрөттөлүшү',
      lessonDescriptionPlaceholder: 'Бул сабакта эмнени өтөбүз',
      videoSource: 'Видео булагы',
      sourceLink: 'Шилтеме',
      sourceFile: 'Файл',
      lessonVideoLink: 'Видео шилтемеси *',
      lessonVideoLinkPlaceholder: 'https://youtube.com/watch?v=... же mp4 шилтемеси',
      lessonVideoFile: 'Түзмөктөн видео файл *',
      lessonVideoFileHint: 'MP4/WebM колдонот. Максималдуу өлчөм: 20MB.',
      selectedFile: 'Тандалган файл',
      previewLabel: 'Алдын ала көрүү',
      removeVideo: 'Видеону өчүрүү',
      duration: 'Узактыгы',
      addLesson: 'Сабак кошуу',
      saveCourse: 'Курсту сактоо',
      errTitle: 'Курстун аталышын жазыңыз',
      errDescription: 'Курстун сүрөттөлүшүн жазыңыз',
      errPreview: 'Превью үчүн жарактуу шилтеме бериңиз',
      errPreviewFileSize: 'превью: файл 20MB ашпашы керек',
      errPreviewFileRead: 'превью: файлды окуу мүмкүн болгон жок',
      errLessonTitle: 'сабак: аталышты жазыңыз',
      errLessonVideo: 'сабак: видео булагын толтуруңуз',
      errLessonLink: 'сабак: жарактуу шилтеме бериңиз',
      errLessonFile: 'сабак: түзмөктөн видео файл тандаңыз',
      errLessonFileSize: 'сабак: файл 20MB ашпашы керек',
      errLessonFileRead: 'сабак: файлды окуу мүмкүн болгон жок',
      errStorageFull: 'Маалыматты сактоо мүмкүн болгон жок: localStorage толуп калды.',
    },
    ru: {
      courses: 'Курсы',
      addCourse: 'Добавить курс',
      subtitle: 'Добавьте свой курс с уроками по ссылке или видеофайлом. Курс сохранится в браузере.',
      fixErrors: 'Исправьте ошибки:',
      mainInfo: 'Основная информация',
      courseTitle: 'Название курса *',
      courseTitlePlaceholder: 'Например: React с нуля до Pro',
      courseDescription: 'Описание курса *',
      courseDescriptionPlaceholder: 'Коротко опишите, чему научит этот курс',
      preview: 'Превью видео курса',
      previewHint: 'Необязательно. Будет отображаться на странице курса.',
      previewSource: 'Источник превью',
      previewLinkLabel: 'Ссылка на превью',
      previewLinkPlaceholder: 'https://youtube.com/watch?v=... или ссылка на mp4',
      previewFileLabel: 'Видео-превью с устройства',
      previewFileHint: 'Поддерживаются MP4/WebM. Максимум: 20MB.',
      previewSelectedFile: 'Файл превью',
      removePreview: 'Удалить превью',
      lessons: 'Уроки',
      lesson: 'Урок',
      lessonTitle: 'Название урока *',
      lessonTitlePlaceholder: 'Например: Введение в React',
      lessonDescription: 'Описание урока',
      lessonDescriptionPlaceholder: 'Что изучим на этом уроке',
      videoSource: 'Источник видео',
      sourceLink: 'Ссылка',
      sourceFile: 'Файл',
      lessonVideoLink: 'Ссылка на видео *',
      lessonVideoLinkPlaceholder: 'https://youtube.com/watch?v=... или ссылка на mp4',
      lessonVideoFile: 'Видео-файл с устройства *',
      lessonVideoFileHint: 'Поддерживаются MP4/WebM. Максимум: 20MB.',
      selectedFile: 'Выбранный файл',
      previewLabel: 'Превью',
      removeVideo: 'Удалить видео',
      duration: 'Длительность',
      addLesson: 'Добавить урок',
      saveCourse: 'Сохранить курс',
      errTitle: 'Введите название курса',
      errDescription: 'Введите описание курса',
      errPreview: 'Укажите корректную ссылку для превью',
      errPreviewFileSize: 'превью: размер файла должен быть не больше 20MB',
      errPreviewFileRead: 'превью: не удалось прочитать файл',
      errLessonTitle: 'урок: введите название',
      errLessonVideo: 'урок: заполните источник видео',
      errLessonLink: 'урок: укажите корректную ссылку',
      errLessonFile: 'урок: выберите видео-файл с устройства',
      errLessonFileSize: 'урок: размер файла должен быть не больше 20MB',
      errLessonFileRead: 'урок: не удалось прочитать файл',
      errStorageFull: 'Не удалось сохранить данные: localStorage переполнен.',
    },
    en: {
      courses: 'Courses',
      addCourse: 'Add course',
      subtitle: 'Add your course with lesson links or local video files. The course is saved in your browser.',
      fixErrors: 'Please fix errors:',
      mainInfo: 'Main information',
      courseTitle: 'Course title *',
      courseTitlePlaceholder: 'For example: React from zero to Pro',
      courseDescription: 'Course description *',
      courseDescriptionPlaceholder: 'Briefly describe what this course teaches',
      preview: 'Course video preview',
      previewHint: 'Optional. Shown on the course page.',
      previewSource: 'Preview source',
      previewLinkLabel: 'Preview link',
      previewLinkPlaceholder: 'https://youtube.com/watch?v=... or direct mp4 link',
      previewFileLabel: 'Preview video from device',
      previewFileHint: 'Supports MP4/WebM. Maximum size: 20MB.',
      previewSelectedFile: 'Preview file',
      removePreview: 'Remove preview',
      lessons: 'Lessons',
      lesson: 'Lesson',
      lessonTitle: 'Lesson title *',
      lessonTitlePlaceholder: 'For example: Introduction to React',
      lessonDescription: 'Lesson description',
      lessonDescriptionPlaceholder: 'What we will learn in this lesson',
      videoSource: 'Video source',
      sourceLink: 'Link',
      sourceFile: 'File',
      lessonVideoLink: 'Video link *',
      lessonVideoLinkPlaceholder: 'https://youtube.com/watch?v=... or direct mp4 link',
      lessonVideoFile: 'Video file from device *',
      lessonVideoFileHint: 'Supports MP4/WebM. Maximum size: 20MB.',
      selectedFile: 'Selected file',
      previewLabel: 'Preview',
      removeVideo: 'Remove video',
      duration: 'Duration',
      addLesson: 'Add lesson',
      saveCourse: 'Save course',
      errTitle: 'Enter course title',
      errDescription: 'Enter course description',
      errPreview: 'Provide a valid preview link',
      errPreviewFileSize: 'preview: file size must be 20MB or less',
      errPreviewFileRead: 'preview: failed to read file',
      errLessonTitle: 'lesson: enter title',
      errLessonVideo: 'lesson: fill in video source',
      errLessonLink: 'lesson: provide a valid link',
      errLessonFile: 'lesson: choose a video file from device',
      errLessonFileSize: 'lesson: file size must be 20MB or less',
      errLessonFileRead: 'lesson: failed to read file',
      errStorageFull: 'Unable to save data: localStorage is full.',
    },
  } as const;

  const t = content[language];

  const updateLesson = (idx: number, field: keyof LessonForm, value: string) => {
    setLessons((prev) => prev.map((l, i) => (i === idx ? { ...l, [field]: value } : l)));
  };

  const setLessonSource = (idx: number, source: VideoSource) => {
    setLessons((prev) =>
      prev.map((l, i) =>
        i === idx
          ? {
              ...l,
              videoSource: source,
              videoUrl: '',
              videoFileName: undefined,
              videoFile: undefined,
            }
          : l,
      ),
    );
  };

  const setCoursePreviewSource = (source: VideoSource) => {
    setPreviewSource(source);
    setPreviewUrl('');
    setPreviewFileName('');
    setPreviewFile(null);
  };

  const onCoursePreviewFileSelect = async (file: File | null) => {
    if (!file) return;

    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      setErrors((prev) => [...prev, t.errPreviewFileSize]);
      setPreviewUrl('');
      setPreviewFileName('');
      setPreviewFile(null);
      return;
    }

    setPreviewFileName(file.name);
    setPreviewFile(file);

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setPreviewUrl(dataUrl);
    } catch {
      setErrors((prev) => [...prev, t.errPreviewFileRead]);
    }
  };

  const onVideoFileSelect = async (idx: number, file: File | null) => {
    if (!file) return;

    if (file.size > MAX_VIDEO_SIZE_BYTES) {
      setErrors((prev) => [...prev, `${t.lesson} ${idx + 1}: ${t.errLessonFileSize}`]);
      setLessons((prev) =>
        prev.map((l, i) =>
          i === idx
            ? {
                ...l,
                videoUrl: '',
                videoFileName: undefined,
                videoFile: undefined,
              }
            : l,
        ),
      );
      return;
    }

    setLessons((prev) =>
      prev.map((l, i) =>
        i === idx
          ? {
              ...l,
              videoFileName: file.name,
              videoFile: file,
            }
          : l,
      ),
    );

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setLessons((prev) =>
        prev.map((l, i) =>
          i === idx
            ? {
                ...l,
                videoUrl: dataUrl,
                videoFileName: file.name,
                videoFile: file,
              }
            : l,
        ),
      );
    } catch {
      setErrors((prev) => [...prev, `${t.lesson} ${idx + 1}: ${t.errLessonFileRead}`]);
    }
  };

  const addLesson = () => setLessons((prev) => [...prev, emptyLesson()]);

  const removeLesson = (idx: number) => {
    setLessons((prev) => prev.filter((_, i) => i !== idx));
  };

  const clearLessonVideo = (idx: number) => {
    setLessons((prev) =>
      prev.map((l, i) =>
        i === idx
          ? {
              ...l,
              videoUrl: '',
              videoFileName: undefined,
              videoFile: undefined,
            }
          : l,
      ),
    );
  };

  const clearCoursePreview = () => {
    setPreviewUrl('');
    setPreviewFileName('');
    setPreviewFile(null);
  };

  const validate = (): string[] => {
    const errs: string[] = [];
    if (!title.trim()) errs.push(t.errTitle);
    if (!description.trim()) errs.push(t.errDescription);
    if (previewSource === 'link' && previewUrl && !isHttpUrl(previewUrl)) errs.push(t.errPreview);
    if (
      previewSource === 'file' &&
      previewUrl &&
      !previewUrl.startsWith('data:video/') &&
      !previewUrl.startsWith('data:image/') &&
      !previewFile &&
      !getCoursePreviewFileFromInput()
    ) {
      errs.push(t.errPreviewFileRead);
    }

    lessons.forEach((l, i) => {
      if (!l.title.trim()) errs.push(`${t.lesson} ${i + 1}: ${t.errLessonTitle}`);
      const domFile = l.videoSource === 'file' ? getLessonFileFromInput(i) : null;
      if (!l.videoUrl.trim() && !(l.videoSource === 'file' && (l.videoFile || domFile))) {
        errs.push(`${t.lesson} ${i + 1}: ${t.errLessonVideo}`);
        return;
      }

      if (l.videoSource === 'link') {
        if (!isHttpUrl(l.videoUrl)) {
          errs.push(`${t.lesson} ${i + 1}: ${t.errLessonLink}`);
        }
      } else if (!l.videoUrl.startsWith('data:video/') && !l.videoFile && !domFile) {
        errs.push(`${t.lesson} ${i + 1}: ${t.errLessonFile}`);
      }
    });

    return errs;
  };

  const getPreview = (lesson: LessonForm): { kind: 'iframe' | 'video'; src: string } | null => {
    if (!lesson.videoUrl.trim()) return null;

    if (lesson.videoSource === 'file' && lesson.videoUrl.startsWith('data:video/')) {
      return { kind: 'video', src: lesson.videoUrl };
    }

    if (lesson.videoSource === 'link') {
      if (isYouTubeUrl(lesson.videoUrl)) {
        return { kind: 'iframe', src: toEmbedUrl(lesson.videoUrl) ?? lesson.videoUrl };
      }
      if (isHttpUrl(lesson.videoUrl)) {
        return { kind: 'video', src: lesson.videoUrl };
      }
    }

    return null;
  };

  const getCoursePreview = (): { kind: 'iframe' | 'video' | 'image'; src: string } | null => {
    if (!previewUrl.trim()) return null;
    if (previewSource === 'file') {
      if (previewUrl.startsWith('data:image/')) return { kind: 'image', src: previewUrl };
      return { kind: 'video', src: previewUrl };
    }
    if (isYouTubeUrl(previewUrl)) return { kind: 'iframe', src: toEmbedUrl(previewUrl) ?? previewUrl };
    if (isHttpUrl(previewUrl)) return { kind: 'video', src: previewUrl };
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setErrors([]);

    const errs = validate();
    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    const id = crypto.randomUUID();
    const builtLessons: Lesson[] = [];

    for (let idx = 0; idx < lessons.length; idx += 1) {
      const lesson = lessons[idx];
      let finalVideoUrl = lesson.videoUrl;

      if (lesson.videoSource === 'link') {
        finalVideoUrl = toEmbedUrl(lesson.videoUrl) ?? lesson.videoUrl;
      } else {
        // file mode — get data url
        let dataUrl = lesson.videoUrl;
        if (!dataUrl.startsWith('data:')) {
          const fallbackFile = lesson.videoFile ?? getLessonFileFromInput(idx);
          if (!fallbackFile) {
            setErrors([`${t.lesson} ${idx + 1}: ${t.errLessonFile}`]);
            return;
          }
          try {
            dataUrl = await readFileAsDataUrl(fallbackFile);
          } catch {
            setErrors([`${t.lesson} ${idx + 1}: ${t.errLessonFileRead}`]);
            return;
          }
        }
        // save to IndexedDB, store reference
        const mediaKey = `${id}_lesson_${idx + 1}`;
        try {
          await saveMedia(mediaKey, dataUrl);
          finalVideoUrl = `idb:${mediaKey}`;
        } catch {
          setErrors([`${t.lesson} ${idx + 1}: ${t.errLessonFileRead}`]);
          return;
        }
      }

      builtLessons.push({
        id: `lesson-${idx + 1}`,
        title: lesson.title.trim(),
        description: lesson.description.trim(),
        videoUrl: finalVideoUrl,
        duration: lesson.duration.trim() ? finalizeDurationInput(lesson.duration) : undefined,
        order: idx + 1,
      });
    }

    let finalPreviewVideoUrl: string | undefined;
    if (previewSource === 'link') {
      finalPreviewVideoUrl = previewUrl ? (toEmbedUrl(previewUrl) ?? previewUrl) : undefined;
    } else if (previewUrl.startsWith('data:')) {
      // already read — save to IndexedDB
      const mediaKey = `${id}_preview`;
      try {
        await saveMedia(mediaKey, previewUrl);
        finalPreviewVideoUrl = `idb:${mediaKey}`;
      } catch {
        setErrors([t.errPreviewFileRead]);
        return;
      }
    } else {
      const fallbackPreviewFile = previewFile ?? getCoursePreviewFileFromInput();
      if (fallbackPreviewFile) {
        try {
          const dataUrl = await readFileAsDataUrl(fallbackPreviewFile);
          const mediaKey = `${id}_preview`;
          await saveMedia(mediaKey, dataUrl);
          finalPreviewVideoUrl = `idb:${mediaKey}`;
        } catch {
          setErrors([t.errPreviewFileRead]);
          return;
        }
      }
    }

    const saved = addCustomCourse({
      id,
      title: title.trim(),
      description: description.trim(),
      link: `/course/${id}`,
      type: 'user-added',
      isUserAdded: true,
      previewVideoUrl: finalPreviewVideoUrl,
      lessons: builtLessons,
    });

    if (!saved) {
      setErrors([t.errStorageFull]);
      return;
    }

    navigate(`/course/${id}`);
  };

  const inputCls =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-primary/50 focus:bg-white/8 transition-all';
  const coursePreview = getCoursePreview();

  return (
    <div className="min-h-screen pb-24">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] h-[250px] bg-primary/8 blur-[100px] pointer-events-none -z-10" />

      <div className="container mx-auto px-3 min-[360px]:px-4 py-8 sm:py-10 max-w-2xl">
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
            {errors.map((error, i) => <p key={`${error}-${i}`} className="text-red-400/80 text-xs">• {error}</p>)}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 sm:p-6 rounded-2xl bg-card border border-white/8 space-y-4">
            <h2 className="text-white font-semibold mb-4">{t.mainInfo}</h2>
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">{t.courseTitle}</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.courseTitlePlaceholder}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">{t.courseDescription}</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.courseDescriptionPlaceholder}
                rows={3}
                className={`${inputCls} resize-none`}
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-2 font-medium">{t.preview}</label>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-2">{t.previewSource}</label>
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-1">
                      <button
                        type="button"
                        onClick={() => setCoursePreviewSource('link')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          previewSource === 'link'
                            ? 'bg-primary/20 text-primary-light'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Link2 size={12} />
                        {t.sourceLink}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCoursePreviewSource('file')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                          previewSource === 'file'
                            ? 'bg-primary/20 text-primary-light'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Upload size={12} />
                        {t.sourceFile}
                      </button>
                    </div>
                    {(previewUrl || previewFileName) && (
                      <button
                        type="button"
                        onClick={clearCoursePreview}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-300 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
                      >
                        <XCircle size={12} />
                        {t.removePreview}
                      </button>
                    )}
                  </div>
                </div>

                {previewSource === 'link' ? (
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">{t.previewLinkLabel}</label>
                    <input
                      value={previewUrl}
                      onChange={(e) => setPreviewUrl(e.target.value)}
                      placeholder={t.previewLinkPlaceholder}
                      className={inputCls}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">{t.previewFileLabel}</label>
                    <input
                      id="course-preview-file"
                      type="file"
                      accept="video/*,image/*"
                      onChange={(e) => onCoursePreviewFileSelect(e.target.files?.[0] ?? null)}
                      className={`${inputCls} file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-primary/20 file:text-primary-light file:text-xs`}
                    />
                    <p className="text-xs text-slate-600 mt-1.5">{t.previewFileHint}</p>
                    {previewFileName && (
                      <p className="text-xs text-slate-500 mt-1">
                        {t.previewSelectedFile}: {previewFileName}
                      </p>
                    )}
                  </div>
                )}

                <p className="text-xs text-slate-600">{t.previewHint}</p>

                {coursePreview && (
                  <div>
                    <p className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
                      <PlayCircle size={12} />
                      {t.previewLabel}
                    </p>
                    <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/30">
                      {coursePreview.kind === 'iframe' ? (
                        <iframe
                          src={coursePreview.src}
                          title="course-preview"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : coursePreview.kind === 'image' ? (
                        <img src={coursePreview.src} alt="preview" className="w-full h-full object-cover" />
                      ) : (
                        <video src={coursePreview.src} className="w-full h-full" controls preload="metadata" />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-white font-semibold">{t.lessons}</h2>
            {lessons.map((lesson, idx) => {
              const preview = getPreview(lesson);
              const sourceId = `lesson-source-${idx}`;

              return (
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
                      onChange={(e) => updateLesson(idx, 'title', e.target.value)}
                      placeholder={t.lessonTitlePlaceholder}
                      className={inputCls}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">{t.lessonDescription}</label>
                    <textarea
                      value={lesson.description}
                      onChange={(e) => updateLesson(idx, 'description', e.target.value)}
                      placeholder={t.lessonDescriptionPlaceholder}
                      rows={2}
                      className={`${inputCls} resize-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-2">{t.videoSource}</label>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="inline-flex rounded-xl bg-white/5 border border-white/10 p-1">
                        <button
                          type="button"
                          id={`${sourceId}-link`}
                          onClick={() => setLessonSource(idx, 'link')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            lesson.videoSource === 'link'
                              ? 'bg-primary/20 text-primary-light'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Link2 size={12} />
                          {t.sourceLink}
                        </button>
                        <button
                          type="button"
                          id={`${sourceId}-file`}
                          onClick={() => setLessonSource(idx, 'file')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                            lesson.videoSource === 'file'
                              ? 'bg-primary/20 text-primary-light'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          <Upload size={12} />
                          {t.sourceFile}
                        </button>
                      </div>
                      {lesson.videoUrl && (
                        <button
                          type="button"
                          onClick={() => clearLessonVideo(idx)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-red-300 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
                        >
                          <XCircle size={12} />
                          {t.removeVideo}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      {lesson.videoSource === 'link' ? (
                        <>
                          <label className="block text-xs text-slate-400 mb-1.5">{t.lessonVideoLink}</label>
                          <input
                            value={lesson.videoUrl}
                            onChange={(e) => updateLesson(idx, 'videoUrl', e.target.value)}
                            placeholder={t.lessonVideoLinkPlaceholder}
                            className={inputCls}
                          />
                        </>
                      ) : (
                        <>
                          <label className="block text-xs text-slate-400 mb-1.5">{t.lessonVideoFile}</label>
                          <input
                            id={`lesson-file-${idx}`}
                            type="file"
                            accept="video/*"
                            onChange={(e) => onVideoFileSelect(idx, e.target.files?.[0] ?? null)}
                            className={`${inputCls} file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-primary/20 file:text-primary-light file:text-xs`}
                          />
                          <p className="text-xs text-slate-600 mt-1.5">{t.lessonVideoFileHint}</p>
                          {lesson.videoFileName && (
                            <p className="text-xs text-slate-500 mt-1">
                              {t.selectedFile}: {lesson.videoFileName}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">{t.duration}</label>
                      <input
                        value={lesson.duration}
                        onChange={(e) => updateLesson(idx, 'duration', normalizeDurationInput(e.target.value))}
                        onBlur={(e) => updateLesson(idx, 'duration', finalizeDurationInput(e.target.value))}
                        placeholder="MM:SS"
                        inputMode="numeric"
                        maxLength={5}
                        className={inputCls}
                      />
                    </div>
                  </div>

                  {preview && (
                    <div>
                      <p className="text-xs text-slate-400 mb-2 flex items-center gap-1.5">
                        <PlayCircle size={12} />
                        {t.previewLabel}
                      </p>
                      <div className="aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/30">
                        {preview.kind === 'iframe' ? (
                          <iframe
                            src={preview.src}
                            title={`preview-${idx}`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                          />
                        ) : (
                          <video src={preview.src} className="w-full h-full" controls preload="metadata" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            <button
              type="button"
              onClick={addLesson}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-dashed border-white/15 text-slate-500 hover:text-primary-light hover:border-primary/30 transition-all text-sm font-medium"
            >
              <Plus size={16} />
              {t.addLesson}
            </button>
          </div>

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
