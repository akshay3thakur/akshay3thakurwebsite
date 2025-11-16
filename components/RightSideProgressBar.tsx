'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'home', color: 'bg-accent-teal' },
  { id: 'experience', color: 'bg-accent-amber' },
  { id: 'projects', color: 'bg-accent-teal' },
  { id: 'skills', color: 'bg-accent-amber' },
  { id: 'education', color: 'bg-accent-teal' },
  { id: 'achievements', color: 'bg-accent-amber' },
  { id: 'volunteering', color: 'bg-accent-teal' },
  { id: 'certifications', color: 'bg-accent-amber' },
  { id: 'contact', color: 'bg-accent-teal' },
];

export default function RightSideProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / documentHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));

      // Determine current section
      const current = sections.findIndex((section) => {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 200 && rect.bottom >= 200;
        }
        return false;
      });

      if (current !== -1) {
        setCurrentSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentColor = sections[currentSection]?.color || 'bg-accent-teal';

  return (
    <>
      {/* Desktop: Right-side vertical bar */}
      <div className="hidden md:block fixed right-0 top-0 bottom-0 w-1 z-40 pointer-events-none">
        <div className="relative h-full w-full">
          <div className="absolute top-0 left-0 w-full h-full bg-neutral-dark/30" />
          <motion.div
            className={`absolute top-0 left-0 w-full ${currentColor} transition-colors duration-300`}
            style={{ height: `${scrollProgress}%` }}
            initial={{ height: 0 }}
          />
        </div>
      </div>

      {/* Mobile: Top horizontal bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-1 z-40 pointer-events-none">
        <div className="relative h-full w-full">
          <div className="absolute top-0 left-0 h-full w-full bg-neutral-dark/30" />
          <motion.div
            className={`absolute top-0 left-0 h-full ${currentColor} transition-colors duration-300`}
            style={{ width: `${scrollProgress}%` }}
            initial={{ width: 0 }}
          />
        </div>
      </div>
    </>
  );
}

