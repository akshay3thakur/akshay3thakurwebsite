'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-neutral-light/10">
      <div className="max-w-6xl mx-auto">
        {/* Thoughts CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.48 }}
          className="text-center mb-12"
        >
          <h3 className="text-2xl font-semibold text-neutral-light mb-4">
            Read my thoughts
          </h3>
          <p className="text-neutral-light/80 mb-6">
            Short essays & technical notes
          </p>
          <motion.a
            href="https://akshay3thakur.wordpress.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-amber text-neutral-black font-semibold rounded-2xl hover:bg-accent-amber/90 transition-colors"
            aria-label="Go to blog"
          >
            Go to blog
            <svg
              className="w-4 h-4 transform rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </motion.a>
        </motion.section>

        {/* Footer links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-neutral-light/10">
          <p className="text-neutral-light/60 text-sm">
            © {new Date().getFullYear()} Akshay Thakur. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#home"
              className="text-neutral-light/60 hover:text-accent-teal transition-colors text-sm"
              aria-label="Back to top"
            >
              Back to top
            </a>
            <a
              href="https://akshay3thakur.wordpress.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-light/60 hover:text-accent-teal transition-colors text-sm"
              aria-label="Thoughts blog"
            >
              Thoughts
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

