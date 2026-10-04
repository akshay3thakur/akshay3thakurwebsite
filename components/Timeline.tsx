'use client';

import { motion } from 'framer-motion';
import TimelineItem from './TimelineItem';

export interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  points: string[];
  logo?: string;
  linkedin?: string;
}

const experiences: TimelineEntry[] = [
  {
    company: 'G2',
    role: 'Scaled Customer Success Manager (AMER)',
    period: '03/2026 – Present',
    linkedin: 'https://www.linkedin.com/company/g2dotcom/',
    points: [
      'Manage a $5M ARR book across 200+ enterprise and commercial accounts in the AMER region, owning adoption, retention, and expansion end to end.',
      "Built internal tooling in Python, SQL, and Snowflake, connected to G2's MCP server and LLM APIs, to generate account briefs and performance reporting in a fraction of the usual time.",
      "Run EBRs and GTM alignment sessions that connect platform usage to each account's broader pipeline and visibility goals.",
      "Recognized company-wide as APAC MVP (FY'27), PEAK Performer (Sep 2026), and Innovative Trailblazer (Q2 FY'27).",
    ],
    logo: 'https://res.cloudinary.com/dmglst5zt/image/upload/v1776291343/G2Logo-Red_yeyj9v.png',
  },
  {
    company: 'Mailmodo',
    role: 'Customer Success Manager',
    period: '01/2025 – 02/2026',
    linkedin: 'https://www.linkedin.com/company/mailmodo',
    points: [
      'Manage onboarding for 100+ APAC and EMEA clients by understanding unique business needs and providing tailored email marketing solutions',
      'Use CS tools to build and implement automations that streamline customer lifecycle workflows and operational tasks',
      'Drive adoption by assisting with product integrations, delivering strategic guidance, and ensuring seamless communication between technical and non-technical stakeholders',
      'Collaborate cross-functionally with product and support teams to quickly resolve client issues and provide feedback for continuous platform improvement',
    ],
    logo: 'https://res.cloudinary.com/dmglst5zt/image/upload/v1762539831/mailmodo_logo_h8qngq.svg',
  },
  {
    company: 'Infigo Eye Care',
    role: "Founder's Office",
    period: '09/2024 – 01/2025',
    linkedin: 'https://www.linkedin.com/company/infigo-eye-hospital/',
    points: [
      'Worked closely with the Founder across strategy, marketing, and operations, contributing to experiments that improved patient awareness and acquisition.',
      'A high-learning stretch early in my career that shaped how I think about users, growth, and building things from first principles.',
    ],
    logo: 'https://res.cloudinary.com/dmglst5zt/image/upload/v1762539621/main-logo_uhcjcn.png',
  },
  {
    company: 'PwC India',
    role: 'Salesforce Development Apprenticeship',
    period: '05/2024 – 09/2024',
    linkedin: 'https://www.linkedin.com/company/pwc/',
    points: [
      "Selected for PwC's Cloud Technology Development Program (CTDP 2.0) receiving training on Salesforce and cloud technologies",
      'Applied Salesforce skills to real-world projects and industry-specific challenges',
    ],
    logo: 'https://res.cloudinary.com/dmglst5zt/image/upload/v1762634764/download_p8j32c.png',
  },
  {
    company: 'Avasify',
    role: 'Co-founder',
    period: '01/2024 – 07/2024',
    linkedin: 'https://www.linkedin.com/company/avasify/',
    points: [
      'Led product development, creating a web application for property management',
      'Managed cross-functional teams, launching the Avasify platform on time with high quality',
      'Spearheaded go-to-market planning and engaged with early-stage investors to explore fundraising opportunities',
    ],
    logo: 'https://res.cloudinary.com/dmglst5zt/image/upload/v1763310308/logo.95632a3e85d5b3bdc8fabfaddfb65920_gvqbve.svg',
  },
];

export default function Timeline() {
  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-neutral-light mb-12 text-center"
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <TimelineItem key={index} entry={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

