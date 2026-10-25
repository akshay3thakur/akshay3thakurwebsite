import type { NextApiRequest, NextApiResponse } from 'next';
import { getArchivedQuotes, ArchivedQuote } from '@/lib/quotesStore';

interface ArchiveResponse {
  quotes: ArchivedQuote[];
  categories: string[];
  years: number[];
  authors: string[];
  total: number;
}

export default function handler(req: NextApiRequest, res: NextApiResponse<ArchiveResponse>) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Security headers
  res.setHeader('Cache-Control', 'public, s-maxage=600, stale-while-revalidate=1200');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  const allQuotes = getArchivedQuotes();

  // Extract metadata for filter controls
  const categoriesSet = new Set<string>();
  const yearsSet = new Set<number>();
  const authorsSet = new Set<string>();

  allQuotes.forEach((q) => {
    if (q.category) categoriesSet.add(q.category);
    if (q.year) yearsSet.add(q.year);
    if (q.author) authorsSet.add(q.author);
  });

  const categories = Array.from(categoriesSet).sort();
  const years = Array.from(yearsSet).sort((a, b) => b - a);
  const authors = Array.from(authorsSet).sort();

  // Apply filters if provided
  const { search, category, year, month, author } = req.query;

  let filtered = allQuotes;

  if (category && typeof category === 'string' && category !== 'all') {
    filtered = filtered.filter((q) => q.category.toLowerCase() === category.toLowerCase());
  }

  if (year && typeof year === 'string' && year !== 'all') {
    const yNum = parseInt(year, 10);
    if (!isNaN(yNum)) {
      filtered = filtered.filter((q) => q.year === yNum);
    }
  }

  if (month && typeof month === 'string' && month !== 'all') {
    const mNum = parseInt(month, 10);
    if (!isNaN(mNum)) {
      filtered = filtered.filter((q) => q.month === mNum);
    }
  }

  if (author && typeof author === 'string' && author !== 'all') {
    filtered = filtered.filter((q) => q.author.toLowerCase() === author.toLowerCase());
  }

  if (search && typeof search === 'string') {
    const query = search.trim().toLowerCase();
    if (query) {
      filtered = filtered.filter(
        (q) =>
          q.quote.toLowerCase().includes(query) ||
          q.author.toLowerCase().includes(query) ||
          q.category.toLowerCase().includes(query)
      );
    }
  }

  return res.status(200).json({
    quotes: filtered,
    categories,
    years,
    authors,
    total: filtered.length,
  });
}
