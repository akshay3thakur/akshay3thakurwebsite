'use client';

import { motion } from 'framer-motion';

interface Certification {
  issuer: string;
  name: string;
  year: string;
  link: string;
  context: string;
}

const certifications: Certification[] = [
  {
    issuer: 'Google',
    name: 'Google Cloud Digital Leader',
    year: '2026',
    link: 'https://drive.google.com/file/d/1WyvqEmC-F8SdtJEsQTw7B3e-E2N0D5tx/view',
    context: 'Cloud infrastructure and digital transformation fundamentals',
  },
  {
    issuer: 'Amazon',
    name: 'AWS Cloud Practitioner',
    year: '2026',
    link: 'https://drive.google.com/file/d/1YEX_28nEwbjclsTc_om2ifyiBUSxxCOz/view',
    context: 'AWS cloud services and best practices',
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-neutral-light mb-12 text-center"
        >
          Certifications
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, delay: index * 0.1 }}
              className="bg-neutral-dark/50 rounded-2xl p-6 border border-neutral-light/10 hover:border-accent-amber/30 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-neutral-light mb-1">
                    {cert.name}
                  </h3>
                  <p className="text-accent-teal text-sm font-medium mb-2">
                    {cert.issuer} • Dec {cert.year}
                  </p>
                </div>
              </div>
              
              <p className="text-neutral-light/60 text-sm mb-4 group-hover:text-neutral-light/80 transition-colors">
                {cert.context}
              </p>
              
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-accent-amber hover:text-accent-amber/80 transition-colors font-medium"
                aria-label={`View ${cert.name} certificate`}
              >
                View Certificate
                <svg
                  className="w-4 h-4"
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
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

