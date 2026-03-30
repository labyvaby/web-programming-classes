import type { UserProgress, UserProfile, LastVisited } from '../types';
import type { Course } from '../data/courses';
import { deleteMedia } from './mediaStorage';

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

function writeStore(data: StorageShape): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch {
    // storage full or unavailable
    return false;
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

export function addCustomCourse(course: Course): boolean {
  const store = readStore();
  store.customCourses.push(course);
  return writeStore(store);
}

export function removeCustomCourse(id: string): void {
  const store = readStore();
  const course = store.customCourses.find(c => c.id === id);
  if (course) {
    // clean up IndexedDB media entries
    const mediaKeys: string[] = [];
    if (course.previewVideoUrl?.startsWith('idb:')) {
      mediaKeys.push(course.previewVideoUrl.slice(4));
    }
    for (const lesson of course.lessons ?? []) {
      if (lesson.videoUrl?.startsWith('idb:')) {
        mediaKeys.push(lesson.videoUrl.slice(4));
      }
    }
    for (const key of mediaKeys) deleteMedia(key);
  }
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

export async function clearAllData(): Promise<void> {
  const store = readStore();
  // delete all IndexedDB media
  for (const course of store.customCourses) {
    if (course.previewVideoUrl?.startsWith('idb:')) {
      await deleteMedia(course.previewVideoUrl.slice(4));
    }
    for (const lesson of course.lessons ?? []) {
      if (lesson.videoUrl?.startsWith('idb:')) {
        await deleteMedia(lesson.videoUrl.slice(4));
      }
    }
  }
  localStorage.removeItem(STORAGE_KEY);
}
