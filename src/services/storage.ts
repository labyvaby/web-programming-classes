import type { UserProgress, UserProfile, LastVisited } from '../types';
import type { Course } from '../data/courses';

const STORAGE_KEY = 'htmllessons_v1';

interface StorageShape {
  profile: UserProfile | null;
  progress: UserProgress[];
  customCourses: Course[];
  lastVisited: LastVisited[];
}

function defaultStore(): StorageShape {
  return {
    profile: null,
    progress: [],
    customCourses: [],
    lastVisited: [],
  };
}

export function readStore(): StorageShape {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore();
    return { ...defaultStore(), ...JSON.parse(raw) };
  } catch {
    return defaultStore();
  }
}

function writeStore(data: StorageShape): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // storage full or unavailable
  }
}

export function getProfile(): UserProfile | null {
  return readStore().profile;
}

export function setProfile(p: UserProfile): void {
  const store = readStore();
  store.profile = p;
  writeStore(store);
}

export function getProgress(): UserProgress[] {
  return readStore().progress;
}

export function isLessonComplete(courseId: string, lessonId: string): boolean {
  return getProgress().some(p => p.courseId === courseId && p.lessonId === lessonId);
}

export function markLessonComplete(courseId: string, lessonId: string): void {
  if (isLessonComplete(courseId, lessonId)) return;
  const store = readStore();
  store.progress.push({ courseId, lessonId, completedAt: new Date().toISOString() });
  writeStore(store);
}

export function getCourseProgress(courseId: string, totalLessons: number): number {
  if (totalLessons === 0) return 0;
  const completed = getProgress().filter(p => p.courseId === courseId).length;
  return Math.min(completed / totalLessons, 1);
}

export function getCustomCourses(): Course[] {
  return readStore().customCourses;
}

export function addCustomCourse(course: Course): void {
  const store = readStore();
  store.customCourses.push(course);
  writeStore(store);
}

export function removeCustomCourse(id: string): void {
  const store = readStore();
  store.customCourses = store.customCourses.filter(c => c.id !== id);
  writeStore(store);
}

export function recordVisit(courseId: string, lessonId?: string): void {
  const store = readStore();
  // Remove old entry for same course+lesson
  store.lastVisited = store.lastVisited.filter(
    v => !(v.courseId === courseId && v.lessonId === lessonId)
  );
  store.lastVisited.unshift({ courseId, lessonId, visitedAt: new Date().toISOString() });
  // Keep max 20 entries
  store.lastVisited = store.lastVisited.slice(0, 20);
  writeStore(store);
}

export function getLastVisited(): LastVisited[] {
  return readStore().lastVisited;
}
