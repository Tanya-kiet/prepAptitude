import { useState, useEffect } from 'react';

export interface QuizAttempt {
  id: string;
  date: string;
  name: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  categoryStats: Record<string, { correct: number, total: number }>;
}

export interface UserStats {
  totalAttempted: number;
  totalCorrect: number;
  totalWrong: number;
  averageAccuracy: number;
}

const STORAGE_KEY = 'prepaptitude_progress';

export function useProgress() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [stats, setStats] = useState<UserStats>({
    totalAttempted: 0,
    totalCorrect: 0,
    totalWrong: 0,
    averageAccuracy: 0
  });

  // Load from local storage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setAttempts(parsed);
        calculateStats(parsed);
      } catch (e) {
        console.error('Failed to parse progress data', e);
      }
    }
  }, []);

  const calculateStats = (data: QuizAttempt[]) => {
    if (data.length === 0) {
      setStats({ totalAttempted: 0, totalCorrect: 0, totalWrong: 0, averageAccuracy: 0 });
      return;
    }

    let totalQ = 0;
    let totalC = 0;

    data.forEach(attempt => {
      totalQ += attempt.totalQuestions;
      totalC += attempt.score;
    });

    setStats({
      totalAttempted: totalQ,
      totalCorrect: totalC,
      totalWrong: totalQ - totalC,
      averageAccuracy: totalQ > 0 ? Math.round((totalC / totalQ) * 100) : 0
    });
  };

  const recordAttempt = (attempt: Omit<QuizAttempt, 'id' | 'date'>) => {
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString()
    };

    const newAttempts = [newAttempt, ...attempts];
    setAttempts(newAttempts);
    calculateStats(newAttempts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newAttempts));
  };

  const clearProgress = () => {
    setAttempts([]);
    calculateStats([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    attempts,
    stats,
    recordAttempt,
    clearProgress
  };
}
