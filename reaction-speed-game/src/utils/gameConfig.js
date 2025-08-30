export const GAME_STATES = {
    MENU: 'menu',
    PLAYING: 'playing',
    PAUSED: 'paused',
    GAME_OVER: 'gameOver'
  };
  
  export const SHAPES = ['circle', 'square', 'triangle', 'diamond'];
  
  export const COLORS = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 
    'bg-yellow-500', 'bg-purple-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-cyan-500'
  ];
  
  export const TARGET_SIZES = {
    small: 'w-12 h-12',
    medium: 'w-16 h-16',
    large: 'w-20 h-20'
  };
  
  export const GAME_CONFIG = {
    INITIAL_TARGET_DURATION: 3000,
    MIN_TARGET_DURATION: 1000,
    LEVEL_SPEED_INCREASE: 200,
    MAX_MISSES: 3,
    POINTS_PER_LEVEL: 500,
    BASE_POINTS: 100,
    LEVEL_BONUS: 20,
    STREAK_BONUS: 10
  };
  
  export const TARGET_POSITIONS = [
    { top: '15%', left: '15%' },
    { top: '15%', right: '15%' },
    { top: '35%', left: '10%' },
    { top: '35%', right: '10%' },
    { top: '55%', left: '20%' },
    { top: '55%', right: '20%' },
    { top: '75%', left: '15%' },
    { top: '75%', right: '15%' },
    { top: '25%', left: '50%', transform: 'translateX(-50%)' },
    { top: '45%', left: '50%', transform: 'translateX(-50%)' },
    { top: '65%', left: '50%', transform: 'translateX(-50%)' }
  ];