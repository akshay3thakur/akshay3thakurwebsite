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
              <Image
                src={entry.logo}
                alt={entry.company}
                width={100}
                height={32}
                className="object-contain h-8"
              />
            </div>
          )}
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold text-neutral-light mb-1">{entry.role}</h3>
                <p className="text-accent-amber text-sm md:text-base font-medium">{entry.company}</p>
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

