'use client';

import { motion } from 'framer-motion';

export default function NameBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-dark/50 rounded-full border border-neutral-light/20"
    >
      <span className="text-sm text-neutral-light">Hi, I&apos;m</span>
      <span className="text-sm font-semibold text-accent-teal">Akshay Thakur</span>
    </motion.div>
  );
}

