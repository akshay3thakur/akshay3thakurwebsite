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
    const smiled = sessionStorage.getItem('akshay_smiled') === 'true';
    if (smiled) {
      setHasSmiled(true);
    }

    fetchCount();
  }, []);

  const fetchCount = async () => {
    const appKey = '9w7v8p3u';
    const itemKey = 'smile';
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      let countValue = 0;
      if (backendUrl) {
        try {
          const response = await fetch(`${backendUrl}/api/smile/count`);
          if (!response.ok) throw new Error('Backend failed');
          const data = await response.json();
          countValue = data.count || 0;
        } catch (backendErr) {
          // Fallback to direct API call
          const response = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/${itemKey}`);
          if (response.ok) {
            const value = await response.json();
            // Handle null, empty string, or valid number
            if (value === null || value === '' || value === undefined) {
              countValue = 0;
            } else {
              countValue = Number(value) || 0;
            }
          }
        }
      } else {
        // Direct API call to Immanuel - works on localhost
        const response = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/${itemKey}`);
        if (response.ok) {
          const value = await response.json();
          // Handle null, empty string, or valid number
          if (value === null || value === '' || value === undefined) {
            countValue = 0;
          } else {
            countValue = Number(value) || 0;
          }
        }
      }
      setCount(countValue);
    } catch (err) {
      console.error('Error fetching smile count:', err);
      setCount(0);
    }
  };

  const increment = async () => {
    if (hasSmiled || loading) return;

    setLoading(true);
    const appKey = '9w7v8p3u';
    const itemKey = 'smile';
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    try {
      let newCount = 0;
      
      if (backendUrl) {
        try {
          const response = await fetch(`${backendUrl}/api/smile/increment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) throw new Error('Backend failed');
          
          const data = await response.json();
          newCount = data.count || 0;
        } catch (backendErr) {
          // Fallback to direct API call using actOnValue
          console.log('Using direct API call for increment');
          
          // First, initialize if doesn't exist (get current value)
          const currentResponse = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/${itemKey}`);
          let currentValue = 0;
          if (currentResponse.ok) {
            const current = await currentResponse.json();
            currentValue = (current === null || current === '' || current === undefined) ? 0 : (Number(current) || 0);
          }
          
          // Now increment
          const incrementResponse = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/ActOnValue/${appKey}/${itemKey}/Increment`, {
            method: 'POST',
          });

          if (!incrementResponse.ok) {
            // If increment fails, try to update manually
            newCount = currentValue + 1;
            await fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${appKey}/${itemKey}/${newCount}`, {
              method: 'POST',
            });
          } else {
            // Wait a bit then fetch the updated value
            await new Promise(resolve => setTimeout(resolve, 500));
            const countResponse = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/${itemKey}`);
            if (countResponse.ok) {
              const value = await countResponse.json();
              newCount = (value === null || value === '' || value === undefined) ? 1 : (Number(value) || 1);
            } else {
              newCount = currentValue + 1;
            }
          }
        }
      } else {
        // Direct API call to Immanuel using actOnValue
        console.log('Using direct API call for increment (no backend)');
        
        // First, get current value
        const currentResponse = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/${itemKey}`);
        let currentValue = 0;
        if (currentResponse.ok) {
          const current = await currentResponse.json();
          currentValue = (current === null || current === '' || current === undefined) ? 0 : (Number(current) || 0);
        }
        
        // Now increment
        const incrementResponse = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/ActOnValue/${appKey}/${itemKey}/Increment`, {
          method: 'POST',
        });

        if (!incrementResponse.ok) {
          // If increment fails, try to update manually
          newCount = currentValue + 1;
          await fetch(`https://keyvalue.immanuel.co/api/KeyVal/UpdateValue/${appKey}/${itemKey}/${newCount}`, {
            method: 'POST',
          });
        } else {
          // Wait a bit then fetch the updated value
          await new Promise(resolve => setTimeout(resolve, 50));
          const countResponse = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/${itemKey}`);
          if (countResponse.ok) {
            const value = await countResponse.json();
            newCount = (value === null || value === '' || value === undefined) ? 1 : (Number(value) || 1);
          } else {
            newCount = currentValue + 1;
          }
        }
      }

      console.log('New count:', newCount);
      // Update count
      setCount(newCount);
      setError(false);

      // Show confetti if motion is not reduced
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        confetti({
          spread: 45,
          particleCount: 60,
          scalar: 0.7,
          origin: { y: 0.6 },
        });
      }

      // Set hasSmiled and show message
      setHasSmiled(true);
      setShowMessage(true);
      sessionStorage.setItem('akshay_smiled', 'true');

      setTimeout(() => {
        setShowMessage(false);
      }, 3500);
    } catch (err) {
      console.error('Error incrementing smile count:', err);
      // Show error message
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48 }}
          className="space-y-4"
        >
          <p className="text-lg text-neutral-light/80 mb-4">
            Did you like my Portfolio?
          </p>

          <motion.button
            onClick={increment}
            disabled={loading || hasSmiled}
            whileHover={!hasSmiled && !loading ? { scale: 1.05 } : {}}
            whileTap={!hasSmiled && !loading ? { scale: 0.95 } : {}}
            className={`px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold text-sm sm:text-base transition-all ${
              hasSmiled
                ? 'bg-neutral-dark/50 text-neutral-light/60 cursor-not-allowed'
                : 'bg-accent-teal text-neutral-black hover:bg-accent-teal/90'
            }`}
            aria-label="Made you smile button"
          >
            {showMessage && !error && count !== null ? (
              <span className="inline-flex items-center gap-2">
                <span className="text-2xl">🎉</span>
                Thanks! You&apos;re the #{count} to add a smile!
              </span>
            ) : showMessage && error ? (
              <span>Hmm — try again</span>
            ) : (
              <span className="inline-flex items-center gap-2">
                <span className="text-2xl animate-bounce-slow">😊</span>
                {count !== null
                  ? count === 0
                    ? 'Add a smile'
                    : `Add a smile`
                  : loading
                  ? '...'
                  : 'Add a smile'}
              </span>
            )}
          </motion.button>

          {!showMessage && count !== null && count > 0 && !hasSmiled && (
            <p className="text-sm text-neutral-light/60">
              {count} {count === 1 ? 'person has' : 'people have'} smiled so far
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

