'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const technicalSkills = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
  'Python', 'Salesforce', 'SQL', 'MongoDB', 'REST APIs',
  'Git', 'AWS', 'Google Cloud', 'HTML/CSS', 'Tailwind CSS',
  'Firebase', 'Webhooks', 'Machine Learning', 'TensorFlow',
  'Chrome Extensions API', 'Apex', 'Flows', 'Lightning Components',
  'Snowflake', 'Model Context Protocol (MCP)', 'LLM APIs', 'Google Apps Script',
];

const csGtmPlatforms = [
  'Gainsight', 'Groove', 'Gong', 'Looker',
  'ZoomInfo', 'LinkedIn Sales Navigator', 'Crossbeam',
  'HubSpot', 'Linear', 'Clerk', 'Jira', 'Sigma Computing',
];

const softSkills = [
  'Customer Success', 'Product Management', 'Growth Strategy',
  'Data Analysis', 'Team Leadership', 'Communication',
  'Problem Solving', 'Strategic Thinking', 'Stakeholder Management',
  'Adaptability', 'Flexibility', 'In-depth Research',
  'Executive Business Reviews (EBRs)', 'Expansion Strategy', 'Quota Attainment',
  'Renewal Strategy', 'Churn Prevention', 'Cross-functional Collaboration',
  'Technical Communication',
];

type CategoryKey = 'all' | 'technical' | 'cs-gtm' | 'soft-skills';

interface SkillCategory {
  key: CategoryKey;
  title: string;
  skills: string[];
  accentColor: string;
  hoverBorder: string;
  badgeBg: string;
}

const categories: SkillCategory[] = [
  {
    key: 'technical',
    title: 'Technical',
    skills: technicalSkills,
    accentColor: 'text-accent-teal',
    hoverBorder: 'hover:border-accent-teal/40 hover:text-white',
    badgeBg: 'bg-accent-teal/10 text-accent-teal',
  },
  {
    key: 'cs-gtm',
    title: 'CS & GTM Platforms',
    skills: csGtmPlatforms,
    accentColor: 'text-accent-amber',
    hoverBorder: 'hover:border-accent-amber/40 hover:text-white',
    badgeBg: 'bg-accent-amber/10 text-accent-amber',
  },
  {
    key: 'soft-skills',
    title: 'Soft Skills',
    skills: softSkills,
    accentColor: 'text-accent-teal',
    hoverBorder: 'hover:border-accent-teal/40 hover:text-white',
    badgeBg: 'bg-accent-teal/10 text-accent-teal',
  },
];

export default function SkillsGrid() {
  const [activeTab, setActiveTab] = useState<CategoryKey>('all');

  const visibleCategories =
    activeTab === 'all'
      ? categories
      : categories.filter((cat) => cat.key === activeTab);

  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-light tracking-tight mb-4">
            Skills & Capabilities
          </h2>
          <p className="text-neutral-light/70 text-base max-w-2xl mx-auto">
            Technical tooling, enterprise GTM platforms, and core competencies developed across customer success and engineering.
          </p>
        </motion.div>

        {/* Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border ${
              activeTab === 'all'
                ? 'bg-neutral-light/15 text-white border-neutral-light/30 shadow-sm'
                : 'bg-neutral-dark/40 text-neutral-light/70 border-neutral-light/10 hover:border-neutral-light/20 hover:text-neutral-light'
            }`}
          >
            All Categories ({technicalSkills.length + csGtmPlatforms.length + softSkills.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border ${
                activeTab === cat.key
                  ? 'bg-neutral-light/15 text-white border-neutral-light/30 shadow-sm'
                  : 'bg-neutral-dark/40 text-neutral-light/70 border-neutral-light/10 hover:border-neutral-light/20 hover:text-neutral-light'
              }`}
            >
              {cat.title} ({cat.skills.length})
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div
          className={`grid gap-8 ${
            activeTab === 'all'
              ? 'grid-cols-1 lg:grid-cols-3'
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((cat) => (
              <motion.div
                key={cat.key}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-dark/35 hover:bg-neutral-dark/50 rounded-2xl p-6 md:p-7 border border-neutral-light/10 hover:border-neutral-light/20 transition-all duration-300 shadow-lg flex flex-col"
              >
                <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-neutral-light/10">
                  <h3 className={`text-xl font-semibold tracking-tight ${cat.accentColor}`}>
                    {cat.title}
                  </h3>
                  <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${cat.badgeBg}`}>
                    {cat.skills.length}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2.5 flex-1 content-start">
                  {cat.skills.map((skill, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.015 }}
                      whileHover={{ y: -2 }}
                      className={`px-3 py-1.5 bg-[#171717] rounded-lg text-xs md:text-sm text-neutral-light/90 border border-neutral-light/10 ${cat.hoverBorder} transition-all duration-200 cursor-default select-none shadow-sm`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
