'use client';

import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section id="education" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-neutral-light mb-12 text-center"
        >
          Education
        </motion.h2>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48 }}
            className="bg-neutral-dark/50 rounded-2xl p-6 md:p-8 border border-neutral-light/10"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-neutral-light mb-2">
                  Vellore Institute of Technology, Chennai
                </h3>
                <p className="text-lg text-accent-teal mb-2">B.Tech Computer Science and Engineering</p>
                <p className="text-neutral-light/80">CGPA: 8.16</p>
              </div>
              <span className="text-sm md:text-base text-accent-teal font-semibold">2019 - 2025</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, delay: 0.1 }}
            className="bg-neutral-dark/50 rounded-2xl p-6 md:p-8 border border-neutral-light/10"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-neutral-light mb-2">
                  Dr. Kalmadi Shamrao Junior College, Pune
                </h3>
                <p className="text-lg text-accent-teal mb-2">Higher Secondary School</p>
                <p className="text-neutral-light/80">XII: 83.3%</p>
              </div>
              <span className="text-sm md:text-base text-accent-teal font-semibold">2019 - 2021</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, delay: 0.2 }}
            className="bg-neutral-dark/50 rounded-2xl p-6 md:p-8 border border-neutral-light/10"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-neutral-light mb-2">
                  Dr. Kalmadi Shamrao High School, Pune
                </h3>
                <p className="text-lg text-accent-teal mb-2">Secondary School</p>
                <p className="text-neutral-light/80">X: 82.6%</p>
              </div>
              <span className="text-sm md:text-base text-accent-teal font-semibold">2007 - 2019</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

