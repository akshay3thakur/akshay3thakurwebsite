'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function SmileButton() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [hasSmiled, setHasSmiled] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check if user has already smiled in this session
    try {
      const smiled = sessionStorage.getItem('akshay_smiled') === 'true';
      if (smiled) {
        setHasSmiled(true);
      }
    } catch {
      // sessionStorage unavailable
    }

    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const res = await fetch('/api/smile');
      if (res.ok) {
        const data = await res.json();
        if (typeof data?.count === 'number') {
          setCount(data.count);
          return;
        }
      }
    } catch {
      // Silently set a safe default
    }
    setCount((prev) => prev ?? 142);
  };

  const increment = async () => {
    if (hasSmiled || loading) return;

    setLoading(true);

    try {
      const res = await fetch('/api/smile', { method: 'POST' });
      let newCount = (count ?? 142) + 1;
      if (res.ok) {
        const data = await res.json();
        if (typeof data?.count === 'number') {
          newCount = data.count;
        }
      }

      setCount(newCount);
      setError(false);

      // Trigger confetti if reduced motion is off
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        confetti({
          spread: 45,
          particleCount: 50,
          scalar: 0.8,
          origin: { y: 0.6 },
        });
      }

      setHasSmiled(true);
      setShowMessage(true);
      try {
        sessionStorage.setItem('akshay_smiled', 'true');
      } catch {
        // Ignore storage error
      }

      setTimeout(() => {
        setShowMessage(false);
      }, 3500);
    } catch {
      setError(true);
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setError(false);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="space-y-4"
        >
          <p className="text-base sm:text-lg text-neutral-light/80 mb-3 font-medium">
            Did you like my portfolio?
          </p>

          <motion.button
            onClick={increment}
            disabled={loading || hasSmiled}
            whileHover={!hasSmiled && !loading ? { scale: 1.03 } : {}}
            whileTap={!hasSmiled && !loading ? { scale: 0.97 } : {}}
            className={`px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold transition-all shadow-lg flex items-center justify-center gap-3 mx-auto text-sm sm:text-base cursor-pointer ${
              hasSmiled
                ? 'bg-neutral-dark/40 text-neutral-light/50 border border-neutral-light/10 cursor-not-allowed'
                : 'bg-accent-amber text-neutral-black hover:bg-accent-amber/90 active:scale-95'
            }`}
            aria-label={hasSmiled ? "You've already added a smile" : 'Click to add a smile'}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-neutral-black/30 border-t-neutral-black rounded-full animate-spin" />
                <span>Saving...</span>
              </span>
            ) : showMessage && !error ? (
              <span className="text-accent-teal font-medium">
                Thanks! You&apos;re #{count} to add a smile!
              </span>
            ) : showMessage && error ? (
              <span>Hmm - try again</span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <span className="text-xl">😊</span>
                <span>
                  {hasSmiled
                    ? `Smiled (${count ?? 142})`
                    : `Smile (${count !== null ? count : '...'})`}
                </span>
              </span>
            )}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
