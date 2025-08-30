import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Trophy,
  Zap,
  Clock,
  Target as TargetIcon, // ✅ renamed to TargetIcon
  Medal,
  Award,
} from "lucide-react";

// Timer Component
const Timer = ({ time }) => {
  return (
    <div className="flex items-center space-x-2 text-xl font-mono">
      <Clock className="w-5 h-5 text-blue-400" />
      <span>{time}s</span>
    </div>
  );
};

// ScoreBoard Component
const ScoreBoard = ({ score, highScore }) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-center">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-gray-400 text-sm">Score</h3>
        <p className="text-2xl font-bold text-white">{score}</p>
      </div>
      <div className="bg-yellow-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-gray-200 text-sm">High Score</h3>
        <p className="text-2xl font-bold text-yellow-300">{highScore}</p>
      </div>
    </div>
  );
};

// Target Component (Your custom game target)
const Target = ({ target, onHit }) => {
  return (
    <div
      onClick={() => onHit(target.id)}
      className="absolute w-12 h-12 bg-red-500 rounded-full cursor-pointer flex items-center justify-center transform transition-transform hover:scale-110 shadow-lg"
      style={{
        top: `${target.y}%`,
        left: `${target.x}%`,
      }}
    >
      <Zap className="w-6 h-6 text-white" />
    </div>
  );
};

// GameStats Component
const GameStats = ({ hits, misses, accuracy }) => {
  return (
    <div className="grid grid-cols-3 gap-4 mt-6">
      <div className="flex flex-col items-center bg-green-900/40 p-3 rounded-lg">
        <TargetIcon className="w-4 h-4 text-green-400" /> {/* ✅ using TargetIcon */}
        <span className="text-sm">Hits: {hits}</span>
      </div>
      <div className="flex flex-col items-center bg-red-900/40 p-3 rounded-lg">
        <Award className="w-4 h-4 text-red-400" />
        <span className="text-sm">Misses: {misses}</span>
      </div>
      <div className="flex flex-col items-center bg-blue-900/40 p-3 rounded-lg">
        <Medal className="w-4 h-4 text-blue-400" />
        <span className="text-sm">Accuracy: {accuracy}%</span>
      </div>
    </div>
  );
};

// Main App
export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );
  const [time, setTime] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [targets, setTargets] = useState([]);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  // Timer logic
  useEffect(() => {
    let timer;
    if (isPlaying && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      setIsPlaying(false);
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem("highScore", score);
      }
    }
    return () => clearInterval(timer);
  }, [isPlaying, time]);

  // Spawn targets
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTargets((prev) => [
          ...prev,
          { id: Date.now(), x: Math.random() * 80, y: Math.random() * 80 },
        ]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying]);

  // Handle target hit
  const handleHit = (id) => {
    setScore((prev) => prev + 10);
    setHits((prev) => prev + 1);
    setTargets((prev) => prev.filter((t) => t.id !== id));
  };

  // Handle game reset
  const resetGame = () => {
    setScore(0);
    setTime(30);
    setIsPlaying(false);
    setTargets([]);
    setHits(0);
    setMisses(0);
  };

  // Calculate accuracy
  const accuracy = hits + misses > 0 ? ((hits / (hits + misses)) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-extrabold mb-8 flex items-center gap-2">
        <Trophy className="w-8 h-8 text-yellow-400" />
        Aim Trainer
      </h1>

      {/* Scoreboard */}
      <ScoreBoard score={score} highScore={highScore} />

      {/* Timer */}
      <div className="mt-6">
        <Timer time={time} />
      </div>

      {/* Game Area */}
      <div className="relative w-[600px] h-[400px] bg-gray-800 rounded-xl mt-8 overflow-hidden shadow-lg border border-gray-700">
        {targets.map((target) => (
          <Target key={target.id} target={target} onHit={handleHit} />
        ))}
        {!isPlaying && time === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
              <p className="text-xl mb-2">Score: {score}</p>
              <p className="text-lg text-gray-400">High Score: {highScore}</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats */}
      <GameStats hits={hits} misses={misses} accuracy={accuracy} />

      {/* Controls */}
      <div className="flex space-x-4 mt-8">
        {!isPlaying ? (
          <button
            onClick={() => setIsPlaying(true)}
            className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg shadow-lg transition"
          >
            <Play className="w-5 h-5" /> Start
          </button>
        ) : (
          <button
            onClick={() => setIsPlaying(false)}
            className="flex items-center gap-2 px-6 py-3 bg-yellow-600 hover:bg-yellow-700 rounded-lg shadow-lg transition"
          >
            <Pause className="w-5 h-5" /> Pause
          </button>
        )}
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg shadow-lg transition"
        >
          <RotateCcw className="w-5 h-5" /> Reset
        </button>
      </div>
    </div>
  );
}
