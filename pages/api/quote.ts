import type { NextApiRequest, NextApiResponse } from 'next';
import { getArchivedQuotes, saveDailyQuote } from '@/lib/quotesStore';

interface QuoteResponse {
  id?: string;
  quote: string;
  author: string;
  category: string;
  date?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<QuoteResponse>) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Security cache headers
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  const { category } = req.query;
  const quotes = getArchivedQuotes();

  // If a specific category is requested, filter quotes by category
  if (category && typeof category === 'string' && category.toLowerCase() !== 'all') {
    const targetCat = category.toLowerCase();
    const matching = quotes.filter(
      (q) => q.category.toLowerCase().includes(targetCat) || targetCat.includes(q.category.toLowerCase())
    );

    if (matching.length > 0) {
      // Deterministically pick quote based on day-of-year for stability
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const dayOfYear = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      const picked = matching[dayOfYear % matching.length];
      return res.status(200).json({
        id: picked.id,
        quote: picked.quote,
        author: picked.author,
        category: picked.category,
        date: picked.date,
      });
    }
  }

  // Today's primary quote
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // Check if today's quote is already in our persistent archive
  const existingToday = quotes.find((q) => q.date === dateStr);
  if (existingToday) {
    return res.status(200).json({
      id: existingToday.id,
      quote: existingToday.quote,
      author: existingToday.author,
      category: existingToday.category,
      date: existingToday.date,
    });
  }

  // If not yet stored today, try fetching from API Ninjas and save
  const apiKey = 'ZTA131RblvRW9e4VFtYeWA==UIKMGkU7mpUQQA17';
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2200);

    const apiRes = await fetch('https://api.api-ninjas.com/v2/quoteoftheday', {
      headers: { 'X-Api-Key': apiKey },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (apiRes.ok) {
      const data = await apiRes.json();
      let fetchedQuote = '';
      let fetchedAuthor = '';
      let fetchedCategory = 'Inspirational';

      if (Array.isArray(data) && data.length > 0 && data[0]?.quote) {
        fetchedQuote = data[0].quote;
        fetchedAuthor = data[0].author || 'Unknown';
        fetchedCategory = data[0].categories?.[0] || data[0].work || 'Inspirational';
      } else if (data && typeof data === 'object' && data.quote) {
        fetchedQuote = data.quote;
        fetchedAuthor = data.author || 'Unknown';
        fetchedCategory = data.category || 'Inspirational';
      }

      if (fetchedQuote) {
        const saved = saveDailyQuote(fetchedQuote, fetchedAuthor, fetchedCategory);
        return res.status(200).json({
          id: saved.id,
          quote: saved.quote,
          author: saved.author,
          category: saved.category,
          date: saved.date,
        });
      }
    }
  } catch {
    // Graceful fallback to most recent archived quote
  }

  // Safe fallback to first available quote in archive
  const fallback = quotes[0] || {
    id: 'default',
    quote: 'Simplicity is the prerequisite for reliability.',
    author: 'Edsger W. Dijkstra',
    category: 'Engineering',
    date: dateStr,
  };

  return res.status(200).json(fallback);
}
