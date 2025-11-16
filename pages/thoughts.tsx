import { useEffect } from 'react';
import Head from 'next/head';

export default function Thoughts() {
  useEffect(() => {
    // Redirect to WordPress blog
    window.location.href = 'https://akshay3thakur.wordpress.com/';
  }, []);

  return (
    <>
      <Head>
        <title>Thoughts - Akshay Thakur</title>
        <meta httpEquiv="refresh" content="0;url=https://akshay3thakur.wordpress.com/" />
      </Head>
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-neutral-light">Redirecting to blog...</p>
      </div>
    </>
  );
}

