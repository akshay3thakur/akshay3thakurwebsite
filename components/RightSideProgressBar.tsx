'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  // Smooth, jitter-free spring animation that tracks scroll position natively on GPU
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none bg-white/[0.04]"
    >
      <motion.div
        className="h-full w-full bg-gradient-to-r from-accent-teal via-teal-400 to-accent-amber origin-left shadow-[0_0_8px_rgba(20,184,166,0.5)]"
        style={{ scaleX }}
      />
    </div>
  );
}
