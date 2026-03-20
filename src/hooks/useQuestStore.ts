import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Quest, Player, Difficulty } from '../types/quest';
import { DIFFICULTY_XP } from '../types/quest';
import { playCompleteSound, playLevelUpSound } from '../utils/sounds';

const QUESTS_KEY = 'questboard_quests';
const PLAYER_KEY = 'questboard_player';
const RESET_KEY = 'questboard_last_reset';

const defaultPlayer: Player = {
  level: 1,
  xp: 0,
  xpToNext: 100,
  totalCompleted: 0,
};

function xpToNext(level: number): number {
  return level * 100;
}

function loadQuests(): Quest[] {
  try {
    const raw = localStorage.getItem(QUESTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function loadPlayer(): Player {
  try {
    const raw = localStorage.getItem(PLAYER_KEY);
    return raw ? JSON.parse(raw) : { ...defaultPlayer };
  } catch {
    return { ...defaultPlayer };
  }
}

function saveQuests(quests: Quest[]) {
  localStorage.setItem(QUESTS_KEY, JSON.stringify(quests));
}

function savePlayer(player: Player) {
  localStorage.setItem(PLAYER_KEY, JSON.stringify(player));
}

function todayString(): string {
  return new Date().toDateString();
}

export function useQuestStore() {
  const [quests, setQuests] = useState<Quest[]>(() => {
    const loaded = loadQuests();
    const lastReset = localStorage.getItem(RESET_KEY);
    const today = todayString();
    if (lastReset !== today) {
      const reset = loaded.map((q) =>
        q.type === 'daily' ? { ...q, completed: false } : q
      );
      saveQuests(reset);
      localStorage.setItem(RESET_KEY, today);
      return reset;
    }
    return loaded;
  });

  const [player, setPlayer] = useState<Player>(loadPlayer);
  const [leveledUp, setLeveledUp] = useState(false);
  const [xpGain, setXpGain] = useState<{ id: string; amount: number } | null>(null);

  useEffect(() => { saveQuests(quests); }, [quests]);
  useEffect(() => { savePlayer(player); }, [player]);

  const addQuest = useCallback((
    title: string,
    description: string,
    type: Quest['type'],
    difficulty: Difficulty
  ) => {
    const quest: Quest = {
      id: uuidv4(),
      title,
      description,
      type,
      difficulty,
      xp: DIFFICULTY_XP[difficulty],
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setQuests((prev) => [quest, ...prev]);
  }, []);

  const completeQuest = useCallback((id: string) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: true } : q))
    );
    const quest = quests.find((q) => q.id === id);
    if (!quest || quest.completed) return;

    const earned = quest.xp;
    setXpGain({ id, amount: earned });
    setTimeout(() => setXpGain(null), 1500);

    playCompleteSound();

    setPlayer((prev) => {
      let newXp = prev.xp + earned;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNext;
      let didLevel = false;

      while (newXp >= newXpToNext) {
        newXp -= newXpToNext;
        newLevel += 1;
        newXpToNext = xpToNext(newLevel);
        didLevel = true;
      }

      if (didLevel) {
        setLeveledUp(true);
        setTimeout(() => setLeveledUp(false), 3000);
        playLevelUpSound();
      }

      return {
        level: newLevel,
        xp: newXp,
        xpToNext: newXpToNext,
        totalCompleted: prev.totalCompleted + 1,
      };
    });
  }, [quests]);

  const deleteQuest = useCallback((id: string) => {
    setQuests((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const dailyQuests = quests.filter((q) => q.type === 'daily');
  const dailyCompleted = dailyQuests.filter((q) => q.completed).length;

  return {
    quests,
    player,
    leveledUp,
    xpGain,
    dailyCompleted,
    dailyTotal: dailyQuests.length,
    addQuest,
    completeQuest,
    deleteQuest,
  };
}
