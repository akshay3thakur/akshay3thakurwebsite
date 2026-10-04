'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { TimelineEntry } from './Timeline';

interface TimelineItemProps {
  entry: TimelineEntry;
  index: number;
}

export default function TimelineItem({ entry, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.48, delay: index * 0.1 }}
      className="relative"
    >
      <div className="bg-neutral-dark/50 rounded-2xl p-5 md:p-6 border border-neutral-light/10 hover:border-accent-teal/30 transition-all shadow-lg">
        <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">
          {entry.logo && (
            <div className="flex-shrink-0">
              {entry.linkedin ? (
                <a
                  href={entry.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${entry.company} on LinkedIn`}
                  className="block hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={entry.logo}
                    alt={entry.company}
                    width={100}
                    height={32}
                    className="object-contain h-8"
                  />
                </a>
              ) : (
                <Image
                  src={entry.logo}
                  alt={entry.company}
                  width={100}
                  height={32}
                  className="object-contain h-8"
                />
              )}
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-neutral-light mb-1">{entry.role}</h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-accent-amber text-sm md:text-base font-medium">{entry.company}</p>
                  {entry.linkedin && (
                    <a
                      href={entry.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-neutral-light/60 hover:text-accent-teal transition-colors underline-offset-2 hover:underline"
                      aria-label={`${entry.company} LinkedIn`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start md:items-end flex-shrink-0">
                {entry.period.includes(' – ') ? (
                  <>
                    <span className="text-xs md:text-sm text-accent-teal font-semibold">{entry.period.split(' – ')[0]}</span>
                    <span className="text-xs text-neutral-light/60">{entry.period.split(' – ')[1]}</span>
                  </>
                ) : (
                  <span className="text-xs md:text-sm text-accent-teal font-semibold">{entry.period}</span>
                )}
              </div>
            </div>
            
            <ul className="space-y-2 mt-3">
              {entry.points.map((point, idx) => (
                <li key={idx} className="text-neutral-light/80 text-sm md:text-base leading-relaxed flex gap-2.5">
                  <span className="text-accent-teal flex-shrink-0 mt-0.5">•</span>
                  <span className="flex-1 break-words">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

