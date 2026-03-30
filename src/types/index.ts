export interface UserProgress {
  courseId: string;
  lessonId: string;
  completedAt: string;
  watchedSeconds?: number;
}

export interface UserProfile {
  displayName: string;
  createdAt: string;
}

export interface LastVisited {
  courseId: string;
  lessonId?: string;
  visitedAt: string;
}
