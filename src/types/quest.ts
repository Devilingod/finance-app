export type QuestType = 'daily' | 'normal';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'epic';

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  difficulty: Difficulty;
  xp: number;
  completed: boolean;
  createdAt: string;
}

export interface Player {
  level: number;
  xp: number;
  xpToNext: number;
  totalCompleted: number;
}

export const DIFFICULTY_XP: Record<Difficulty, number> = {
  easy: 50,
  medium: 100,
  hard: 200,
  epic: 400,
};

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
  epic: 'Эпический',
};
