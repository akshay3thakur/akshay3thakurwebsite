import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { BotIdClient } from 'botid/client';
import '../styles/globals.css';

const protectedRoutes = [
  {
    path: '/api/smile',
    method: 'POST',
  },
];

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <BotIdClient protect={protectedRoutes} />
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
