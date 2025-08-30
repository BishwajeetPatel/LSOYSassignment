import React from 'react';
import { motion } from 'framer-motion';
import { TARGET_SIZES } from '../utils/gameConfig';

const Target = ({ target, onHit }) => {
  const sizeClasses = TARGET_SIZES[target.size];
  const baseClasses = `${sizeClasses} ${target.color} cursor-pointer shadow-lg`;

  const getShapeClasses = () => {
    switch (target.shape) {
      case 'circle':
        return 'rounded-full';
      case 'square':
        return 'rounded-lg';
      case 'triangle':
        return 'triangle-shape';
      case 'diamond':
        return 'rotate-45 rounded-md';
      default:
        return 'rounded-lg';
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: 180, opacity: 0 }}
      animate={{ scale: 1, rotate: 0, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
      style={{
        position: 'absolute',
        ...target.position
      }}
      className={`${baseClasses} ${getShapeClasses()} hover:shadow-xl active:shadow-2xl transition-shadow duration-200`}
      onClick={onHit}
    />
  );
};

export default Target;