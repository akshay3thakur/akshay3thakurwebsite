'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Quote {
  quote: string;
  author: string;
  category?: string;
}

export default function QuoteCard() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      // Check if we have today's quote cached
      const today = new Date().toDateString();
      const cachedData = sessionStorage.getItem('dailyQuote');
      
      if (cachedData) {
        try {
          const parsed = JSON.parse(cachedData);
          // Check if cached quote is from today
          if (parsed.date === today) {
            setQuote(parsed);
            setLoading(false);
            return;
          }
        } catch (e) {
          // Invalid cache, continue to fetch
        }
      }

      const apiKey = 'ZTA131RblvRW9e4VFtYeWA==UIKMGkU7mpUQQA17';
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

        // Try backend first, fallback to direct API call
        let response;
        if (backendUrl) {
          try {
            response = await fetch(`${backendUrl}/api/quote`, {
              signal: controller.signal,
            });
            if (!response.ok) throw new Error('Backend failed');
          } catch (backendErr) {
            // Fallback to direct API call
            response = await fetch('https://api.api-ninjas.com/v2/quoteoftheday', {
              headers: { 'X-Api-Key': apiKey },
              signal: controller.signal,
            });
          }
        } else {
          // Direct API call
          response = await fetch('https://api.api-ninjas.com/v2/quoteoftheday', {
            headers: { 'X-Api-Key': apiKey },
            signal: controller.signal,
          });
        }

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error('Failed to fetch quote');
        }

        const data = await response.json();
        
        // Handle API Ninjas format (array response)
        let quoteData;
        if (Array.isArray(data) && data.length > 0) {
          quoteData = {
            quote: data[0].quote,
            author: data[0].author,
            category: data[0].categories?.[0] || data[0].work,
          };
        } else if (data.quote && data.author) {
          quoteData = data;
        } else {
          throw new Error('Invalid quote format');
        }

        const today = new Date().toDateString();
        const quoteWithDate = { ...quoteData, date: today };
        setQuote(quoteWithDate);
        sessionStorage.setItem('dailyQuote', JSON.stringify(quoteWithDate));
      } catch (err) {
        console.error('Error fetching quote:', err);
        setError(true);
        setQuote({ quote: 'Keep shipping.', author: 'Akshay' });
      } finally {
        setLoading(false);
      }
    };

    fetchQuote();
  }, []);

  if (loading) {
    return (
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-pulse text-neutral-light/60">Loading quote...</div>
        </div>
      </section>
    );
  }

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <section id="daily-spark" className="py-6 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-neutral-dark/40 hover:bg-neutral-dark/60 border border-neutral-light/10 hover:border-accent-teal/30 p-6 sm:p-8 backdrop-blur-md transition-all duration-300 shadow-xl"
        >
          {/* Top bar with subtle pulse and date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-neutral-light/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-teal animate-pulse" />
              <span className="text-xs uppercase tracking-wider text-accent-teal font-semibold">
                A line to power up your day :)
              </span>
            </div>
            <span className="text-xs font-mono text-neutral-light/60">
              {formattedDate}
            </span>
          </div>

          {/* Quote */}
          <blockquote className="text-lg sm:text-xl md:text-2xl italic text-neutral-light leading-relaxed mb-3">
            &quot;{quote?.quote || 'Keep shipping.'}&quot;
          </blockquote>

          {/* Footer with author and subtle hook */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pt-2">
            <p className="text-sm md:text-base text-accent-amber font-medium">
              - {quote?.author || 'Akshay'}
              {quote?.category && (
                <span className="text-xs text-neutral-light/50 font-normal ml-2">
                  ({quote.category})
                </span>
              )}
            </p>

            <a
              href="#experience"
              className="inline-flex items-center gap-1.5 text-xs text-neutral-light/70 hover:text-accent-teal transition-colors group font-medium"
              aria-label="Scroll to experience section"
            >
              <span>Explore career journey</span>
              <svg
                className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

