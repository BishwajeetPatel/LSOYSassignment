import { useState, useCallback } from 'react';
import { GAME_STATES, GAME_CONFIG } from '../utils/gameConfig';

export const useGameState = () => {
  const [gameState, setGameState] = useState(GAME_STATES.MENU);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameTime, setGameTime] = useState(0);
  const [streak, setStreak] = useState(0);
  const [missedTargets, setMissedTargets] = useState(0);

  const startGame = useCallback(() => {
    setGameState(GAME_STATES.PLAYING);
    setScore(0);
    setLevel(1);
    setGameTime(0);
    setStreak(0);
    setMissedTargets(0);
  }, []);

  const pauseGame = useCallback(() => {
    setGameState(GAME_STATES.PAUSED);
  }, []);

  const resumeGame = useCallback(() => {
    setGameState(GAME_STATES.PLAYING);
  }, []);

  const endGame = useCallback(() => {
    setGameState(GAME_STATES.GAME_OVER);
  }, []);

  const resetGame = useCallback(() => {
    setGameState(GAME_STATES.MENU);
    setScore(0);
    setLevel(1);
    setGameTime(0);
    setStreak(0);
    setMissedTargets(0);
  }, []);

  const incrementScore = useCallback((points) => {
    setScore(prev => {
      const newScore = prev + points;
      // Level up every POINTS_PER_LEVEL points
      if (Math.floor(newScore / GAME_CONFIG.POINTS_PER_LEVEL) > level - 1) {
        setLevel(prev => prev + 1);
      }
      return newScore;
    });
  }, [level]);

  const incrementStreak = useCallback(() => {
    setStreak(prev => prev + 1);
  }, []);

  const resetStreak = useCallback(() => {
    setStreak(0);
  }, []);

  const incrementMissed = useCallback(() => {
    setMissedTargets(prev => prev + 1);
    resetStreak();
  }, [resetStreak]);

  const incrementGameTime = useCallback(() => {
    setGameTime(prev => prev + 1);
  }, []);

  return {
    gameState,
    score,
    level,
    gameTime,
    streak,
    missedTargets,
    startGame,
    pauseGame,
    resumeGame,
    endGame,
    resetGame,
    incrementScore,
    incrementStreak,
    resetStreak,
    incrementMissed,
    incrementGameTime
  };
};