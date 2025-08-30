
import React from 'react';
import { Play, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import Leaderboard from './Leaderboard';

const GameMenu = ({ onStartGame, bestScore }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-4 bg-black/20 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Reaction Speed Challenge
          </h1>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span>Best: {bestScore}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Menu */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-8 max-w-4xl"
        >
          <div className="space-y-4">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent text-shadow"
            >
              Test Your Reflexes
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Click the shapes before time runs out! Speed increases with each level.
              Build streaks for bonus points and climb the leaderboard.
            </motion.p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            {/* How to Play Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              <div className="glass-panel p-6">
                <h3 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                  🎯 How to Play
                </h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Click shapes before timer ends</li>
                  <li>• Speed increases each level</li>
                  <li>• 3 misses = game over</li>
                  <li>• Build streaks for bonus points</li>
                </ul>
              </div>
              
              <div className="glass-panel p-6">
                <h3 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
                  💎 Scoring System
                </h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>• Base: 100 points</li>
                  <li>• Level bonus: +20/level</li>
                  <li>• Streak bonus: +10/streak</li>
                  <li>• Level up: every 500 pts</li>
                </ul>
              </div>
            </div>
            
            {/* Best Score Display */}
            {bestScore > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="glass-panel p-4 max-w-sm mx-auto"
              >
                <div className="flex items-center justify-center gap-2 text-yellow-400">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">Personal Best: {bestScore}</span>
                </div>
              </motion.div>
            )}
            
            {/* Start Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 300 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartGame}
              className="game-button-primary text-xl px-12 py-4 mx-auto flex items-center gap-3 glow"
            >
              <Play className="w-6 h-6" />
              Start Challenge
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <Leaderboard />
    </div>
  );
};

export default GameMenu;