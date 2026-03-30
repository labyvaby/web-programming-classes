import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'kg' | 'ru' | 'en';

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  locale: string;
}

const STORAGE_KEY = 'site-language';

const localeByLanguage: Record<Language, string> = {
  kg: 'ky-KG',
  ru: 'ru-RU',
  en: 'en-US',
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ru');

  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    if (savedLanguage === 'kg' || savedLanguage === 'ru' || savedLanguage === 'en') {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage: setLanguageState,
      locale: localeByLanguage[language],
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

export function lessonWord(count: number, language: Language) {
  if (language === 'en') {
    return count === 1 ? 'lesson' : 'lessons';
  }

  if (language === 'kg') {
    return 'сабак';
  }

  const n10 = count % 10;
  const n100 = count % 100;
  if (n10 === 1 && n100 !== 11) return 'урок';
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return 'урока';
  return 'уроков';
}
