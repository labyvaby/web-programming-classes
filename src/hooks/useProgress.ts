import { useState, useCallback } from 'react';
import { getProgress, markLessonComplete, isLessonComplete, getCourseProgress } from '../services/storage';
import type { UserProgress } from '../types';

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress[]>(() => getProgress());

  const markComplete = useCallback((courseId: string, lessonId: string) => {
    markLessonComplete(courseId, lessonId);
    setProgress(getProgress());
  }, []);

  const checkComplete = useCallback((courseId: string, lessonId: string) => {
    return isLessonComplete(courseId, lessonId);
  }, [progress]);

  const courseRatio = useCallback((courseId: string, totalLessons: number) => {
    return getCourseProgress(courseId, totalLessons);
  }, [progress]);

  return { progress, markComplete, checkComplete, courseRatio };
}
