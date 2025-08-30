import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameStats from './GameStats';
import Target from './Target';
import { generateTarget, getTargetDuration } from '../utils/gameLogic';
import { calculateScore } from '../utils/scoring';
import { GAME_CONFIG } from '../utils/gameConfig';

const GameBoard = ({ 
  score, 
  level, 
  gameTime, 
  streak, 
  missedTargets, 
  onPauseGame, 
  onEndGame,
  onScoreUpdate,
  onStreakUpdate,
  onMissedUpdate 
}) => {
  const [currentTarget, setCurrentTarget] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3000);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successPoints, setSuccessPoints] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const targetDuration = getTargetDuration(level);

  // Generate new target
  const createNewTarget = useCallback(() => {
    setCurrentTarget(generateTarget());
    setTimeLeft(targetDuration);
  }, [targetDuration]);

  // Hit target success
  const handleTargetHit = useCallback(() => {
    const points = calculateScore(level, streak);
    setSuccessPoints(points);
    setShowSuccess(true);
    
    // Update game state
    if (onScoreUpdate) onScoreUpdate(points);
    if (onStreakUpdate) onStreakUpdate();
    
    // Check for level up
    const newScore = score + points;
    const newLevel = Math.floor(newScore / GAME_CONFIG.POINTS_PER_LEVEL) + 1;
    if (newLevel > level) {
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }
    
    setTimeout(() => setShowSuccess(false), 500);
    createNewTarget();
  }, [level, streak, score, onScoreUpdate, onStreakUpdate, createNewTarget]);

  // Miss target
  const handleTargetMiss = useCallback(() => {
    if (onMissedUpdate) onMissedUpdate();
    
    if (missedTargets >= GAME_CONFIG.MAX_MISSES - 1) {
      onEndGame();
      return;
    }
    
    createNewTarget();
  }, [missedTargets, onMissedUpdate, onEndGame, createNewTarget]);

  // Timer logic
  useEffect(() => {
    if (!currentTarget) {
      createNewTarget();
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, targetDuration - elapsed);
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        handleTargetMiss();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentTarget, targetDuration, handleTargetMiss, createNewTarget]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Game Stats */}
      <GameStats
        score={score}
        level={level}
        gameTime={gameTime}
        streak={streak}
        missedTargets={missedTargets}
        onPauseGame={onPauseGame}
      />

      {/* Timer Bar */}
      <div className="w-full bg-gray-800 h-2">
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / targetDuration) * 100}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* Game Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence>
          {currentTarget && (
            <Target
              key={currentTarget.id}
              target={currentTarget}
              onHit={handleTargetHit}
            />
          )}
        </AnimatePresence>

        {/* Success Animation */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: -50 }}
              exit={{ opacity: 0, scale: 0.5, y: -100 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
            >
              <div className="text-4xl md:text-6xl font-bold text-green-400 text-shadow">
                +{successPoints}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Level Up Animation */}
        <AnimatePresence>
          {showLevelUp && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="fixed inset-0 flex items-center justify-center pointer-events-none z-50 bg-black/50"
            >
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                className="text-center"
              >
                <div className="text-5xl md:text-7xl font-bold text-yellow-400 text-shadow mb-4">
                  LEVEL {level}!
                </div>
                <div className="text-xl text-gray-300">
                  Speed increased! 🚀
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lives Indicator */}
        <div className="absolute top-4 right-4 flex gap-2">
          {Array.from({ length: GAME_CONFIG.MAX_MISSES }, (_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: i >= GAME_CONFIG.MAX_MISSES - missedTargets ? 1 : 0.5,
                opacity: i >= GAME_CONFIG.MAX_MISSES - missedTargets ? 1 : 0.3
              }}
              className="text-2xl"
            >
              ❤️
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;