import type { NextApiRequest, NextApiResponse } from 'next';

const appKey = '9w7v8p3u';
const itemKey = 'smile';

// In-memory counter as local fallback if external key-value store is slow/down
let localCount = 142;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const response = await fetch(`https://keyvalue.immanuel.co/api/KeyVal/GetValue/${appKey}/${itemKey}`, {
        headers: { 'Accept': 'application/json, text/plain, */*' },
      });
      if (response.ok) {
        const text = await response.text();
        const num = parseFloat(text.replace(/[^0-9.]/g, ''));
        if (!isNaN(num) && num > 0) {
          localCount = Math.max(localCount, Math.round(num));
        }
      }
    } catch {
      // Fallback to localCount
    }
    return res.status(200).json({ count: localCount });
  }

  if (req.method === 'POST') {
    localCount += 1;
    try {
      await fetch(`https://keyvalue.immanuel.co/api/KeyVal/ActOnValue/${appKey}/${itemKey}/Increment`, {
        method: 'POST',
      });
    } catch {
      // Silently fall back to incremented localCount
    }
    return res.status(200).json({ count: localCount });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
