import { useMemo } from 'react';
import { coursesData } from '../data/courses';
import { getCustomCourses } from '../services/storage';
import type { Course } from '../data/courses';

export function useCourses(): Course[] {
  return useMemo(() => {
    const custom = getCustomCourses();
    return [...coursesData, ...custom];
  }, []);
}

export function useCourseById(id: string): Course | undefined {
  const all = useCourses();
  return useMemo(() => all.find(c => c.id === id), [all, id]);
}
