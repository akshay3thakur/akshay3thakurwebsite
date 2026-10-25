'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Quote {
  id?: string;
  quote: string;
  author: string;
  category?: string;
  date?: string;
}

const DEFAULT_QUOTE: Quote = {
  quote: 'Simplicity is the prerequisite for reliability.',
  author: 'Edsger W. Dijkstra',
  category: 'Engineering',
};

const CATEGORIES = [
  { id: 'today', label: "Today's Line" },
  { id: 'inspirational', label: 'Inspirational' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'design', label: 'Design' },
  { id: 'strategy', label: 'Strategy' },
  { id: 'engineering', label: 'Engineering' },
];

export default function QuoteCard() {
  const [selectedCategory, setSelectedCategory] = useState('today');
  const [quote, setQuote] = useState<Quote>(DEFAULT_QUOTE);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  // Fetch or load quote based on category
  const loadQuote = async (catId: string) => {
    setLoading(true);
    try {
      const endpoint = catId === 'today' ? '/api/quote' : `/api/quote?category=${encodeURIComponent(catId)}`;
      const res = await fetch(endpoint);
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object' && data.quote) {
          setQuote({
            id: data.id,
            quote: data.quote,
            author: data.author || 'Unknown',
            category: data.category || (catId !== 'today' ? catId : 'Perspective'),
            date: data.date,
          });
        }
      }
    } catch {
      // Keep existing quote if network hiccup
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date();
    setFormattedDate(
      today.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      })
    );

    // Initial fetch for today's quote
    loadQuote('today');
  }, []);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    loadQuote(catId);
  };

  const handleCopyLink = () => {
    if (typeof window === 'undefined') return;
    const url = `${window.location.origin}${window.location.pathname}#quoteoftheday`;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }).catch(() => {
      window.location.hash = 'quoteoftheday';
    });
  };

  return (
    <section id="quoteoftheday" className="py-6 px-6 relative scroll-mt-28">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-2xl bg-[#121517]/90 border border-neutral-light/10 hover:border-accent-teal/30 p-6 sm:p-7 backdrop-blur-md transition-all duration-300 shadow-xl group"
        >
          {/* Top metadata strip: Anchor, Date, Bookmark button */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-neutral-light/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-pulse" />
              <a
                href="#quoteoftheday"
                className="font-mono text-accent-teal hover:underline tracking-tight flex items-center gap-1 group-hover:text-accent-teal transition-colors"
                title="Direct bookmark link to this section"
              >
                #quoteoftheday
              </a>
              <span className="text-neutral-light/40" aria-hidden="true">·</span>
              <span className="text-neutral-light/60 font-sans">A line to power up your day</span>
            </div>

            <div className="flex items-center gap-3">
              {formattedDate && (
                <span className="font-mono tabular-nums text-neutral-light/50">
                  {formattedDate}
                </span>
              )}
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-neutral-light/60 hover:text-white bg-neutral-dark/60 hover:bg-neutral-dark border border-neutral-light/10 hover:border-accent-teal/30 transition-all cursor-pointer"
                title="Bookmark or copy direct link"
              >
                {copied ? (
                  <>
                    <svg className="w-3 h-3 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-accent-teal">Copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>Bookmark</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-5" role="tablist" aria-label="Browse quotes by category">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.id}
                onClick={() => handleCategorySelect(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-accent-teal/15 text-accent-teal border-accent-teal/40 shadow-sm'
                    : 'bg-neutral-dark/40 text-neutral-light/60 border-neutral-light/10 hover:border-neutral-light/25 hover:text-neutral-light'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Quote display with smooth transition */}
          <div className="min-h-[72px] flex flex-col justify-center mb-4">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={quote.quote}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-neutral-light font-medium leading-relaxed text-balance"
              >
                &quot;{quote.quote}&quot;
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Attribution and subtle links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-neutral-light/10">
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="text-accent-amber font-medium">- {quote.author}</span>
              {quote.category && (
                <>
                  <span className="text-neutral-light/30" aria-hidden="true">·</span>
                  <span className="text-neutral-light/50 text-xs">{quote.category}</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              {/* Subtle archive finder link */}
              <Link
                href="/quotes"
                className="text-neutral-light/60 hover:text-accent-amber transition-colors flex items-center gap-1 group/archive"
                title="Browse full historical quote archive"
              >
                <span>Browse archive</span>
                <span className="text-[10px] text-neutral-light/40 group-hover/archive:text-accent-amber">→</span>
              </Link>

              <span className="text-neutral-light/30" aria-hidden="true">·</span>

              {/* Scroll to Experience hook */}
              <a
                href="#experience"
                className="inline-flex items-center gap-1 text-neutral-light/60 hover:text-accent-teal transition-colors group/link"
                aria-label="Scroll to experience section"
              >
                <span>Explore career journey</span>
                <svg
                  className="w-3.5 h-3.5 group-hover/link:translate-y-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
