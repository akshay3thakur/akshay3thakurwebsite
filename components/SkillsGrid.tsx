'use client';

import { motion } from 'framer-motion';

const technicalSkills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'Python', 'Salesforce', 'SQL', 'MongoDB', 'REST APIs',
  'Git', 'AWS', 'Google Cloud', 'HTML/CSS', 'Tailwind CSS',
  'HubSpot', 'Linear', 'Clerk',
];

const softSkills = [
  'Customer Success', 'Product Management', 'Growth Strategy',
  'Data Analysis', 'Team Leadership', 'Communication',
  'Problem Solving', 'Strategic Thinking', 'Stakeholder Management',
  'Adaptability', 'Flexibility', 'In-depth Research',
];

export default function SkillsGrid() {
  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-neutral-light mb-12 text-center"
        >
          Skills
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48 }}
          >
            <h3 className="text-2xl font-semibold text-neutral-light mb-6">Technical</h3>
            <div className="flex flex-wrap gap-3">
              {technicalSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-neutral-dark/50 rounded-full text-sm text-neutral-light border border-neutral-light/10 hover:border-accent-teal/30 hover:text-accent-teal transition-all"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.48, delay: 0.1 }}
          >
            <h3 className="text-2xl font-semibold text-neutral-light mb-6">Soft Skills</h3>
            <div className="flex flex-wrap gap-3">
              {softSkills.map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  className="px-4 py-2 bg-neutral-dark/50 rounded-full text-sm text-neutral-light border border-neutral-light/10 hover:border-accent-amber/30 hover:text-accent-amber transition-all"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

