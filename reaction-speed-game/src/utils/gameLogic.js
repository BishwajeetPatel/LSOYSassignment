import { SHAPES, COLORS, TARGET_POSITIONS, TARGET_SIZES, GAME_CONFIG } from './gameConfig';

export const generateTarget = () => {
  const sizeWeights = { small: 0.3, medium: 0.5, large: 0.2 };
  const sizeRandom = Math.random();
  let selectedSize;
  
  if (sizeRandom < sizeWeights.small) {
    selectedSize = 'small';
  } else if (sizeRandom < sizeWeights.small + sizeWeights.medium) {
    selectedSize = 'medium';
  } else {
    selectedSize = 'large';
  }

  return {
    id: Date.now() + Math.random(),
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    position: TARGET_POSITIONS[Math.floor(Math.random() * TARGET_POSITIONS.length)],
    size: selectedSize
  };
};

export const getTargetDuration = (level) => {
  return Math.max(
    GAME_CONFIG.MIN_TARGET_DURATION,
    GAME_CONFIG.INITIAL_TARGET_DURATION - (level - 1) * GAME_CONFIG.LEVEL_SPEED_INCREASE
  );
};