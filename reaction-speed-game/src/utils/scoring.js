import { GAME_CONFIG } from './gameConfig';

export const calculateScore = (level, streak) => {
  return GAME_CONFIG.BASE_POINTS + 
         (level - 1) * GAME_CONFIG.LEVEL_BONUS + 
         streak * GAME_CONFIG.STREAK_BONUS;
};

export const calculateAccuracy = (hits, misses) => {
  const total = hits + misses;
  return total === 0 ? 0 : Math.round((hits / total) * 100);
};

export const getTargetDuration = (level) => {
  return Math.max(
    GAME_CONFIG.MIN_TARGET_DURATION,
    GAME_CONFIG.INITIAL_TARGET_DURATION - (level - 1) * GAME_CONFIG.LEVEL_SPEED_INCREASE
  );
};

export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getGrade = (score) => {
  if (score >= 3000) return { grade: 'S+', color: 'text-purple-400' };
  if (score >= 2500) return { grade: 'S', color: 'text-yellow-400' };
  if (score >= 2000) return { grade: 'A+', color: 'text-green-400' };
  if (score >= 1500) return { grade: 'A', color: 'text-green-300' };
  if (score >= 1000) return { grade: 'B+', color: 'text-blue-400' };
  if (score >= 500) return { grade: 'B', color: 'text-blue-300' };
  if (score >= 250) return { grade: 'C', color: 'text-orange-400' };
  return { grade: 'D', color: 'text-red-400' };
};