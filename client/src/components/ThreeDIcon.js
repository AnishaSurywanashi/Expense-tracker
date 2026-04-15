import React from 'react';
import { motion } from 'framer-motion';

const ThreeDIcon = () => {
  return (
    <motion.div 
      className="three-d-icon-container"
      animate={{ 
        y: [0, -15, 0],
        rotateX: [0, 5, -5, 0],
        rotateY: [0, 10, -10, 0]
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      style={{
        perspective: '1000px',
        width: '240px',
        height: '240px',
        margin: '0 auto 40px',
        position: 'relative'
      }}
    >
      <motion.div
        className="icon-wrapper"
        style={{
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d'
        }}
      >
        <img 
          src="/logo3d.png" 
          alt="FinanceFlow 3D Icon" 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 30px var(--accent-cyan-glow))'
          }}
        />
        {/* Glow Effects */}
        <div className="icon-glow-ring violet"></div>
        <div className="icon-glow-ring teal"></div>
      </motion.div>
    </motion.div>
  );
};

export default ThreeDIcon;
