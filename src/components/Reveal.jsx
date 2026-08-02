import React from 'react';
import { motion } from 'framer-motion';

const Reveal = ({
  children,
  direction = 'up',
  delay = 0,
  width = '100%',
  className = ''
}) => {
  let initial = { opacity: 0 };

  // Directions (d'où vient l'élément)
  if (direction === 'up') initial.y = 40;
  else if (direction === 'down') initial.y = -40;
  else if (direction === 'left') initial.x = 40;
  else if (direction === 'right') initial.x = -40;
  else if (direction === 'scale') {
    initial.scale = 0.8;
  }

  const animate = { opacity: 1, y: 0, x: 0, scale: 1 };

  // Style "Doux & Élégant" (Mouvement lent et fluide)
  const transition = {
    type: "tween",
    duration: 1,
    ease: "easeOut",
    delay: delay * 1
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-40px" }}
      transition={transition}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
