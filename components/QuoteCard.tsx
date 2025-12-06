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
    <section className="py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48 }}
          className="bg-neutral-dark/50 rounded-2xl p-8 md:p-12 border border-neutral-light/10 text-center"
        >
          <div className="mb-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-neutral-light mb-2">A Line to Power Up Your Day :)</h3>
            <p className="text-base text-neutral-light/60">{formattedDate}</p>
          </div>
          <blockquote className="text-xl sm:text-2xl md:text-3xl italic text-neutral-light mb-6 leading-relaxed px-2">
            &quot;{quote?.quote || 'Keep shipping.'}&quot;
          </blockquote>
          <p className="text-lg text-accent-teal font-medium">
            — {quote?.author || 'Akshay'}
          </p>
          {quote?.category && (
            <p className="text-sm text-neutral-light/60 mt-2">{quote.category}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

