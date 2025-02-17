// Background.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced keyframes with smoother transitions
const keyframes = `
  @keyframes floatComplex {
    0% { transform: translate(0, 0) rotate(0deg) scale(1); }
    25% { transform: translate(50px, -25px) rotate(45deg) scale(1.1); }
    50% { transform: translate(25px, 50px) rotate(90deg) scale(0.9); }
    75% { transform: translate(-50px, 25px) rotate(135deg) scale(1.05); }
    100% { transform: translate(0, 0) rotate(180deg) scale(1); }
  }

  @keyframes pulseGlow {
    0%, 100% { 
      transform: scale(1);
      opacity: 0.2;
      filter: blur(10px) brightness(1);
    }
    50% { 
      transform: scale(1.1);
      opacity: 0.4;
      filter: blur(15px) brightness(1.2);
    }
  }

  @keyframes smoothOrbit {
    0% { 
      transform: rotate(0deg) translateX(80px) rotate(0deg) scale(1);
      filter: hue-rotate(0deg);
    }
    50% { 
      transform: rotate(180deg) translateX(120px) rotate(-180deg) scale(1.1);
      filter: hue-rotate(180deg);
    }
    100% { 
      transform: rotate(360deg) translateX(80px) rotate(-360deg) scale(1);
      filter: hue-rotate(360deg);
    }
  }

  @keyframes gradientFlow {
    0% { 
      background-position: 0% 50%;
      filter: hue-rotate(0deg) brightness(1);
    }
    50% { 
      background-position: 100% 50%;
      filter: hue-rotate(180deg) brightness(1.1);
    }
    100% { 
      background-position: 0% 50%;
      filter: hue-rotate(360deg) brightness(1);
    }
  }

  @keyframes smoothPulse {
    0%, 100% {
      transform: scale(1) translate(0, 0);
      filter: blur(8px) brightness(1);
    }
    50% {
      transform: scale(1.1) translate(10px, 10px);
      filter: blur(12px) brightness(1.2);
    }
  }
`;

const Background = ({ darkMode }) => {
  // Enhanced gradient color palette
  const colors = darkMode ? [
    'bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5',
    'bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-rose-500/5',
    'bg-gradient-to-r from-indigo-500/5 via-cyan-500/5 to-teal-500/5',
    'bg-gradient-to-r from-violet-500/5 via-blue-500/5 to-cyan-500/5',
    'bg-gradient-to-r from-rose-500/5 via-purple-500/5 to-indigo-500/5'
  ] : [
    'bg-gradient-to-r from-blue-300/15 via-indigo-300/15 to-purple-300/15',
    'bg-gradient-to-r from-purple-300/15 via-pink-300/15 to-rose-300/15',
    'bg-gradient-to-r from-indigo-300/15 via-cyan-300/15 to-teal-300/15',
    'bg-gradient-to-r from-violet-300/15 via-blue-300/15 to-cyan-300/15',
    'bg-gradient-to-r from-rose-300/15 via-purple-300/15 to-indigo-300/15'
  ];

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 overflow-hidden -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <style>{keyframes}</style>
        
        {/* Smooth gradient background */}
        <motion.div 
          className={`absolute inset-0 transition-colors duration-1000 bg-gradient-to-br ${
            darkMode 
              ? 'from-gray-900/95 via-gray-800/95 to-gray-900/95' 
              : 'from-white/95 via-gray-50/95 to-white/95'
          }`}
          style={{
            backgroundSize: '400% 400%',
            animation: 'gradientFlow 30s ease infinite'
          }}
        />

        {/* Floating gradient orbs */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`float-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.1, 1],
                x: [0, Math.random() * 200 - 100, 0],
                y: [0, Math.random() * 200 - 100, 0],
                rotate: [0, 180, 0]
              }}
              transition={{
                duration: Math.random() * 15 + 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className={`absolute rounded-full ${colors[i % colors.length]}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 200}px`,
                height: `${Math.random() * 300 + 200}px`,
                animation: `smoothPulse ${Math.random() * 10 + 15}s infinite ease-in-out`
              }}
            />
          ))}
        </motion.div>

        {/* Smooth orbiting elements */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`orbit-${i}`}
              className={`absolute rounded-full ${colors[(i + 2) % colors.length]}`}
              style={{
                left: `${Math.random() * 60 + 20}%`,
                top: `${Math.random() * 60 + 20}%`,
                width: `${Math.random() * 80 + 40}px`,
                height: `${Math.random() * 80 + 40}px`,
                animation: `smoothOrbit ${Math.random() * 20 + 20}s infinite ease-in-out`
              }}
            />
          ))}
        </motion.div>

        {/* Smooth pulsing particles */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute rounded-full ${colors[i % colors.length]}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 15 + 5}px`,
                height: `${Math.random() * 15 + 5}px`,
                animation: `pulseGlow ${Math.random() * 6 + 4}s infinite ease-in-out alternate`
              }}
            />
          ))}
        </motion.div>

        {/* Smooth blur overlay */}
        <motion.div 
          className="absolute inset-0 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            background: `linear-gradient(to bottom, 
              transparent, 
              ${darkMode ? 'rgba(17, 24, 39, 0.1)' : 'rgba(255, 255, 255, 0.1)'}
            )`
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default Background;