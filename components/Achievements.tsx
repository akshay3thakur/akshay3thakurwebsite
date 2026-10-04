'use client';

import { motion } from 'framer-motion';

const achievements = [
  {
    title: 'Samsung Metaverse Prism Finalist',
    description: 'Proposed an immersive real estate experience using XR, selected among top 20 nationwide from 2000+ teams',
  },
  {
    title: 'State-level Badminton Representation',
    description: 'Represented Maharashtra at the national championships after securing top 15 rank in state-level tournaments',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-neutral-light mb-12 text-center"
        >
          Achievements
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, delay: index * 0.1 }}
              className="bg-neutral-dark/40 hover:bg-neutral-dark/60 rounded-2xl p-7 border border-neutral-light/10 hover:border-accent-amber/40 transition-all duration-300 shadow-lg group"
            >
              <h3 className="text-xl font-semibold text-neutral-light mb-2.5 group-hover:text-accent-amber transition-colors duration-200">
                {achievement.title}
              </h3>
              <p className="text-neutral-light/75 text-sm md:text-base leading-relaxed">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

