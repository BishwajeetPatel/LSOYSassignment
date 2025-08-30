import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';

const mockLeaderboardData = [
  { id: 1, name: "SpeedDemon", score: 2350, level: 12, accuracy: 94 },
  { id: 2, name: "ReactMaster", score: 1890, level: 9, accuracy: 91 },
  { id: 3, name: "ClickWizard", score: 1650, level: 8, accuracy: 87 },
  { id: 4, name: "FastFingers", score: 1420, level: 7, accuracy: 89 },
  { id: 5, name: "QuickDraw", score: 1180, level: 6, accuracy: 85 },
];

const Leaderboard = () => {
  const [expanded, setExpanded] = useState(false);

  const getRankIcon = (rank) => {
    switch (rank) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">#{rank + 1}</span>;
    }
  };

  return (
    <div className="p-4 bg-black/20 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-center"
          whileHover={{ scale: 1.02 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-purple-300">
            🏆 Global Leaderboard (Demo) {expanded ? '▼' : '▶'}
          </h3>
        </motion.button>
        
        <motion.div
          initial={false}
          animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {mockLeaderboardData.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getRankIcon(idx)}
                    <span className="font-semibold truncate">{entry.name}</span>
                  </div>
                  <span className="font-bold text-purple-300">
                    {entry.score.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Level {entry.level}</span>
                  <span>{entry.accuracy}% accuracy</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-4 text-xs text-gray-500"
          >
            * Demo data - In production, this would connect to a real leaderboard API
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;