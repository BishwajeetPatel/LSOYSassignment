import React from 'react';
import { Pause, Zap, Target, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatTime } from '../utils/scoring';

const GameStats = ({ score, level, gameTime, streak, missedTargets, onPauseGame }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-black/30 backdrop-blur-sm border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Stats Row */}
        <div className="flex flex-wrap gap-4 sm:gap-6 text-sm">
          <motion.div 
            className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="font-semibold">{score.toLocaleString()}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Target className="w-4 h-4 text-green-400" />
            <span>Level {level}</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full"
            animate={{ scale: streak > 5 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5, repeat: streak > 5 ? Infinity : 0 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-orange-400 text-lg">🔥</span>
            <span className={streak > 10 ? 'text-orange-400 font-bold' : ''}>
              {streak}
            </span>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-4 h-4 text-purple-400" />
            <span>{formatTime(gameTime)}</span>
          </motion.div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-red-400">❤️</span>
            <span>{3 - missedTargets}</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPauseGame}
            className="game-button-secondary text-sm px-4 py-2 flex items-center gap-2"
          >
            <Pause className="w-3 h-3" />
            Pause
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameStats;