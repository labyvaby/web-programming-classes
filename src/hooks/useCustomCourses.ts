import { useState, useCallback } from 'react';
import { getCustomCourses, addCustomCourse, removeCustomCourse } from '../services/storage';
import type { Course } from '../data/courses';

export function useCustomCourses() {
  const [customCourses, setCustomCourses] = useState<Course[]>(() => getCustomCourses());

  const addCourse = useCallback((course: Course) => {
    addCustomCourse(course);
    setCustomCourses(getCustomCourses());
  }, []);

  const removeCourse = useCallback((id: string) => {
    removeCustomCourse(id);
    setCustomCourses(getCustomCourses());
  }, []);

  return { customCourses, addCourse, removeCourse };
}
