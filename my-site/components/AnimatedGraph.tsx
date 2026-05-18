import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AnimatedGraph() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // SVG path data for an upward trending graph with multiple peaks and valleys
  const pathData = "M 10 180 L 40 160 L 70 170 L 100 140 L 130 150 L 160 120 L 190 130 L 220 100 L 250 110 L 280 80 L 310 90 L 340 60 L 370 70 L 400 40 L 430 50 L 460 20";
  
  // Calculate path length for animation
  const pathLength = 450;

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 480 200"
        className="w-full h-full max-w-md"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines for visual context */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <line x1="0" y1="50" x2="480" y2="50" stroke="#E6CBA3" strokeWidth="1" />
          <line x1="0" y1="100" x2="480" y2="100" stroke="#E6CBA3" strokeWidth="1" />
          <line x1="0" y1="150" x2="480" y2="150" stroke="#E6CBA3" strokeWidth="1" />
        </motion.g>

        {/* Animated line */}
        <motion.path
          d={pathData}
          stroke="#E6CBA3"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{
            pathLength: { duration: 2.5, ease: "easeInOut" },
            opacity: { duration: 0.5 }
          }}
          style={{ pathLength }}
        />

        {/* Animated dots at key points */}
        {[
          { x: 10, y: 180 },
          { x: 40, y: 160 },
          { x: 70, y: 170 },
          { x: 100, y: 140 },
          { x: 130, y: 150 },
          { x: 160, y: 120 },
          { x: 190, y: 130 },
          { x: 220, y: 100 },
          { x: 250, y: 110 },
          { x: 280, y: 80 },
          { x: 310, y: 90 },
          { x: 340, y: 60 },
          { x: 370, y: 70 },
          { x: 400, y: 40 },
          { x: 430, y: 50 },
          { x: 460, y: 20 }
        ].map((point, idx) => (
          <motion.circle
            key={idx}
            cx={point.x}
            cy={point.y}
            r="3"
            fill="#E6CBA3"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{
              delay: 0.5 + (idx * 0.08),
              duration: 0.4,
              ease: "easeOut"
            }}
          />
        ))}

        {/* Glow effect for the last point */}
        <motion.circle
          cx="460"
          cy="20"
          r="6"
          fill="none"
          stroke="#E6CBA3"
          strokeWidth="1"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: [1, 1.5, 1], opacity: [0.8, 0.3, 0.8] } : { scale: 0, opacity: 0 }}
          transition={{
            delay: 2.2,
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}
