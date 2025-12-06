'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactCard() {
  const [showToast, setShowToast] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const handleMailto = (e: React.MouseEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('Hi Akshay…');
    const body = encodeURIComponent('Hi Akshay,\n\nI wanted to reach out...');
    window.location.href = `mailto:akshay3thakur@gmail.com?subject=${subject}&body=${body}`;
    
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  return (
    <>
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48 }}
            className="bg-neutral-dark/50 rounded-2xl p-8 md:p-12 border border-neutral-light/10 text-center"
          >
            <h2 className="text-4xl font-bold text-neutral-light mb-6">Get in Touch</h2>
            <p className="text-lg text-neutral-light/80 mb-8">
              Have a project in mind or just want to chat? I&apos;d love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="mailto:akshay3thakur@gmail.com?subject=Hi%20Akshay…"
                onClick={handleMailto}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-accent-teal text-neutral-black font-semibold rounded-2xl hover:bg-accent-teal/90 transition-colors text-center text-sm sm:text-base"
                aria-label="Send email to Akshay"
              >
                Email Me
              </motion.a>
              <motion.a
                href="https://drive.google.com/file/d/1IkNnCYwzxfeoC8hEFPs1nXDqxS-N_SGM/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-neutral-dark/50 text-neutral-light font-semibold rounded-2xl border border-neutral-light/20 hover:border-accent-amber/30 hover:text-accent-amber transition-colors text-center text-sm sm:text-base"
                aria-label="Download resume"
              >
                Download Resume
              </motion.a>
            </div>

            <div className="mt-8 flex justify-center gap-6">
              <a
                href="https://github.com/akshay3thakur"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-light/60 hover:text-accent-teal transition-colors"
                aria-label="GitHub profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/akshay3thakur"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-light/60 hover:text-accent-teal transition-colors"
                aria-label="LinkedIn profile"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: 0 }}
            transition={{ 
              duration: prefersReducedMotion ? 0.01 : 0.3 
            }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 bg-neutral-dark border border-accent-teal/30 rounded-2xl px-6 py-4 shadow-lg z-50 max-w-sm mx-auto md:mx-0"
            role="alert"
            aria-live="polite"
          >
            <p className="text-neutral-light text-sm">
              I&apos;ll get back to you within 24 hours :)
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

