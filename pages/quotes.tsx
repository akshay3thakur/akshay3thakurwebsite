'use client';

import { useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { GetServerSideProps } from 'next';
import { getArchivedQuotes, ArchivedQuote } from '@/lib/quotesStore';
import ScrollProgressBar from '@/components/RightSideProgressBar';

interface QuotesPageProps {
  initialQuotes: ArchivedQuote[];
  categories: string[];
  years: number[];
  authors: string[];
}

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export default function QuotesPage({
  initialQuotes,
  categories,
  years,
  authors,
}: QuotesPageProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedAuthor, setSelectedAuthor] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter quotes in memory
  const filteredQuotes = useMemo(() => {
    return initialQuotes.filter((q) => {
      if (selectedCategory !== 'all' && q.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }
      if (selectedYear !== 'all' && String(q.year) !== selectedYear) {
        return false;
      }
      if (selectedMonth !== 'all' && String(q.month) !== selectedMonth) {
        return false;
      }
      if (selectedAuthor !== 'all' && q.author.toLowerCase() !== selectedAuthor.toLowerCase()) {
        return false;
      }
      if (search.trim()) {
        const query = search.trim().toLowerCase();
        const matchesQuote = q.quote.toLowerCase().includes(query);
        const matchesAuthor = q.author.toLowerCase().includes(query);
        const matchesCat = q.category.toLowerCase().includes(query);
        if (!matchesQuote && !matchesAuthor && !matchesCat) {
          return false;
        }
      }
      return true;
    });
  }, [initialQuotes, selectedCategory, selectedYear, selectedMonth, selectedAuthor, search]);

  const hasActiveFilters =
    search.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedYear !== 'all' ||
    selectedMonth !== 'all' ||
    selectedAuthor !== 'all';

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedYear('all');
    setSelectedMonth('all');
    setSelectedAuthor('all');
  };

  const handleCopyQuote = (q: ArchivedQuote) => {
    if (typeof window === 'undefined') return;
    const textToCopy = `"${q.quote}" - ${q.author}`;
    navigator.clipboard?.writeText(textToCopy).then(() => {
      setCopiedId(q.id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleRandomQuote = () => {
    if (filteredQuotes.length === 0) return;
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const target = filteredQuotes[randomIndex];
    const el = document.getElementById(target.id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-accent-teal');
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-accent-teal');
      }, 2000);
    }
  };

  return (
    <>
      <Head>
        <title>Quote Archive · Akshay Thakur</title>
        <meta
          name="description"
          content="Historical archive of daily quotes and thoughts curated by Akshay Thakur. Search and filter by category, author, date, and keyword."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          type="image/png"
          href="https://res.cloudinary.com/dmglst5zt/image/upload/v1762539370/IMG_5192_vuqzda.png"
        />
      </Head>

      <ScrollProgressBar />

      <div className="min-h-screen bg-[#090B0D] text-neutral-light antialiased pb-24">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-40 bg-[#090B0D]/90 backdrop-blur-md border-b border-neutral-light/10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link
              href="/#quoteoftheday"
              className="inline-flex items-center gap-2 text-sm text-neutral-light/70 hover:text-accent-teal transition-colors font-medium group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Portfolio</span>
            </Link>

            <span className="text-xs font-mono text-neutral-light/50">
              {filteredQuotes.length} {filteredQuotes.length === 1 ? 'quote' : 'quotes'}
            </span>
          </div>
        </header>

        {/* Hero Header */}
        <section className="pt-12 pb-8 px-6 max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-accent-teal" />
              <span className="text-xs uppercase font-mono tracking-wider text-accent-teal">
                Historical Archive
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
              Daily Sparks & Quotes
            </h1>
            <p className="text-neutral-light/75 text-base sm:text-lg leading-relaxed">
              Every day&apos;s line stored and organized across engineering, design, productivity, and strategy.
              Search by concept or filter across years, months, and authors.
            </p>
          </div>
        </section>

        {/* Search & Filter Controls */}
        <section className="px-6 max-w-6xl mx-auto mb-10">
          <div className="bg-[#121517] rounded-2xl border border-neutral-light/10 p-5 sm:p-6 shadow-xl space-y-5">
            {/* Search Input Bar */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg
                  className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-light/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search quotes, authors, or concepts (e.g., Dijkstra, systems, simplicity)..."
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-dark/60 rounded-xl text-sm text-white placeholder-neutral-light/40 border border-neutral-light/10 focus:border-accent-teal/50 focus:outline-none transition-colors"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-light/40 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button
                onClick={handleRandomQuote}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-neutral-dark text-neutral-light text-xs font-medium rounded-xl border border-neutral-light/10 hover:border-accent-amber/40 hover:text-accent-amber transition-colors whitespace-nowrap cursor-pointer"
                title="Jump to a random quote in current view"
              >
                <span>Surprise Me</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-neutral-light/50 font-mono mr-1">Category:</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all border cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-accent-teal/15 text-accent-teal border-accent-teal/40'
                    : 'bg-neutral-dark/40 text-neutral-light/60 border-neutral-light/10 hover:text-white'
                }`}
              >
                All ({initialQuotes.length})
              </button>
              {categories.map((cat) => {
                const count = initialQuotes.filter((q) => q.category === cat).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all border cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-accent-teal/15 text-accent-teal border-accent-teal/40'
                        : 'bg-neutral-dark/40 text-neutral-light/60 border-neutral-light/10 hover:text-white'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Date & Author Dropdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-neutral-light/10 text-xs">
              {/* Year Filter */}
              <div>
                <label className="block text-neutral-light/50 font-mono mb-1.5">Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-dark/80 rounded-lg border border-neutral-light/10 text-neutral-light focus:border-accent-teal/50 focus:outline-none"
                >
                  <option value="all">All Years</option>
                  {years.map((y) => (
                    <option key={y} value={String(y)}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              {/* Month Filter */}
              <div>
                <label className="block text-neutral-light/50 font-mono mb-1.5">Month</label>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-dark/80 rounded-lg border border-neutral-light/10 text-neutral-light focus:border-accent-teal/50 focus:outline-none"
                >
                  <option value="all">All Months</option>
                  {MONTH_NAMES.map((m, idx) => (
                    <option key={m} value={String(idx + 1)}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Author Filter */}
              <div>
                <label className="block text-neutral-light/50 font-mono mb-1.5">Author</label>
                <select
                  value={selectedAuthor}
                  onChange={(e) => setSelectedAuthor(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-dark/80 rounded-lg border border-neutral-light/10 text-neutral-light focus:border-accent-teal/50 focus:outline-none"
                >
                  <option value="all">All Authors ({authors.length})</option>
                  {authors.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filters Reset */}
            {hasActiveFilters && (
              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="text-neutral-light/60">
                  Showing {filteredQuotes.length} of {initialQuotes.length} quotes
                </span>
                <button
                  onClick={resetFilters}
                  className="text-accent-amber hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Quotes Grid */}
        <section className="px-6 max-w-6xl mx-auto">
          {filteredQuotes.length === 0 ? (
            <div className="bg-[#121517] rounded-2xl border border-neutral-light/10 p-12 text-center max-w-md mx-auto my-8">
              <p className="text-lg font-medium text-white mb-2">No quotes found</p>
              <p className="text-sm text-neutral-light/60 mb-5 leading-relaxed">
                Try widening your search terms or resetting the active category/date filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-accent-teal text-neutral-black text-xs font-semibold rounded-lg hover:bg-accent-teal/90 transition-colors"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <AnimatePresence mode="popLayout">
                {filteredQuotes.map((q) => (
                  <motion.article
                    key={q.id}
                    id={q.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="bg-[#121517]/85 hover:bg-[#15191C] rounded-2xl p-6 border border-neutral-light/10 hover:border-neutral-light/25 transition-all duration-300 shadow-md flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Header: Category & Date */}
                      <div className="flex items-center justify-between gap-2 mb-3.5 text-xs text-neutral-light/50 font-mono">
                        <span className="text-accent-teal/90 font-sans font-medium text-xs">
                          {q.category}
                        </span>
                        <time dateTime={q.date} className="tabular-nums">
                          {q.date}
                        </time>
                      </div>

                      {/* Quote Text */}
                      <blockquote className="text-base sm:text-lg text-white font-medium leading-relaxed mb-4 text-balance">
                        &quot;{q.quote}&quot;
                      </blockquote>
                    </div>

                    {/* Card Footer: Author & Copy Action */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-neutral-light/10 text-xs">
                      <button
                        onClick={() => setSelectedAuthor(q.author)}
                        className="text-accent-amber hover:underline text-left font-medium"
                        title={`Filter by ${q.author}`}
                      >
                        - {q.author}
                      </button>

                      <button
                        onClick={() => handleCopyQuote(q)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-neutral-light/60 hover:text-white bg-neutral-dark/60 hover:bg-neutral-dark border border-neutral-light/10 transition-colors cursor-pointer"
                        title="Copy quote to clipboard"
                      >
                        {copiedId === q.id ? (
                          <>
                            <svg className="w-3 h-3 text-accent-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-accent-teal">Copied</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<QuotesPageProps> = async () => {
  const allQuotes = getArchivedQuotes();

  const categoriesSet = new Set<string>();
  const yearsSet = new Set<number>();
  const authorsSet = new Set<string>();

  allQuotes.forEach((q) => {
    if (q.category) categoriesSet.add(q.category);
    if (q.year) yearsSet.add(q.year);
    if (q.author) authorsSet.add(q.author);
  });

  return {
    props: {
      initialQuotes: allQuotes,
      categories: Array.from(categoriesSet).sort(),
      years: Array.from(yearsSet).sort((a, b) => b - a),
      authors: Array.from(authorsSet).sort(),
    },
  };
};
