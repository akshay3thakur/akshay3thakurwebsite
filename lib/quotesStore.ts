import fs from 'fs';
import path from 'path';

export interface ArchivedQuote {
  id: string;
  quote: string;
  author: string;
  category: string;
  date: string; // YYYY-MM-DD
  year: number;
  month: number;
  day: number;
}

const dataFilePath = path.join(process.cwd(), 'data', 'quotes-archive.json');

// In-memory cache for fast lookups
let cachedQuotes: ArchivedQuote[] | null = null;

export function getArchivedQuotes(): ArchivedQuote[] {
  if (cachedQuotes && cachedQuotes.length > 0) {
    return cachedQuotes;
  }

  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, 'utf8');
      cachedQuotes = JSON.parse(fileData);
      return cachedQuotes || [];
    }
  } catch (err) {
    console.error('Error reading quotes archive:', err);
  }

  return [];
}

export function saveDailyQuote(quote: string, author: string, category: string = 'Inspirational'): ArchivedQuote {
  const quotes = getArchivedQuotes();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // Check if today's quote is already stored
  const existing = quotes.find((q) => q.date === dateStr);
  if (existing) {
    return existing;
  }

  const newEntry: ArchivedQuote = {
    id: `q-${dateStr}`,
    quote: quote.trim(),
    author: author.trim() || 'Unknown',
    category: category.trim() || 'Inspirational',
    date: dateStr,
    year,
    month,
    day,
  };

  // Prepend so latest is first
  quotes.unshift(newEntry);
  cachedQuotes = quotes;

  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(quotes, null, 2), 'utf8');
  } catch (err) {
    console.error('Error persisting new daily quote:', err);
  }

  return newEntry;
}

export function getCategories(): string[] {
  const quotes = getArchivedQuotes();
  const cats = new Set<string>();
  quotes.forEach((q) => {
    if (q.category) cats.add(q.category);
  });
  return Array.from(cats);
}
