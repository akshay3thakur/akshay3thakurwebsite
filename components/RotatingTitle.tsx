'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const titles = [
  'Customer Success Manager',
  'Product Enthusiast',
  'Entrepreneur',
  'Strategy & Ops Enthusiast',
];

export default function RotatingTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      // If reduced motion, show first title only
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (prefersReducedMotion) {
    return <span className="text-accent-teal">{titles[0]}</span>;
  }

  return (
    <span className="inline-block relative" aria-live="polite">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.3 }}
          className="inline-block text-accent-teal"
        >
          {titles[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

