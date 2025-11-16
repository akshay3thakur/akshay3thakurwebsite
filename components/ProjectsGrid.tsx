'use client';

import { motion } from 'framer-motion';

interface Project {
  name: string;
  description: string;
  link: string;
  github?: string;
  demoLink?: string;
}

const projects: Project[] = [
  {
    name: 'Avasify',
    description: 'Avasify is a cloud-based platform designed to simplify property and tenant management. It helps organize property details, track leases, manage tenants, and streamline day-to-day real estate operations in one centralized system.',
    link: 'https://akshay3thakur-avas-website-application-backup2-uw4t.vercel.app/',
    demoLink: 'https://akshay3thakur-avas-website-application-backup2-uw4t.vercel.app/',
  },
  {
    name: 'Pune Pulse',
    description: 'One-stop complaint-resolution platform. Built full-stack, camera-first reporting with geotagged photo uploads, unique tracking tokens, email notifications, and admin/worker dashboards to streamline issue resolution.',
    link: 'https://shaktighssp.shop/',
    demoLink: 'https://shaktighssp.shop/',
  },
  {
    name: 'PPE Kit Detector',
    description: 'Real Time PPE KIT Detector using Yolo. Developed a real-time system to detect missing PPE and alert for compliance, enhancing workplace safety.',
    link: 'https://drive.google.com/file/d/1K71gjycLNdxhj12WU1oAcU1EocJ90bBr/view?usp=sharing',
    demoLink: 'https://drive.google.com/file/d/1K71gjycLNdxhj12WU1oAcU1EocJ90bBr/view?usp=sharing',
  },
  {
    name: 'WebShield Pro',
    description: 'Chrome extension using ML to detect phishing and harmful online links',
    link: 'https://github.com/akshay3thakur/Web-Shield-Pro',
    github: 'https://github.com/akshay3thakur/Web-Shield-Pro',
  },
  {
    name: 'Web & App Stationary Mart',
    description: 'Built integrated mobile and web platforms for efficient product management and seamless online shopping experience',
    link: 'https://github.com/akshay3thakur/Stationary-Mart-App',
    github: 'https://github.com/akshay3thakur/Stationary-Mart-App',
  },
];

export default function ProjectsGrid() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-neutral-light mb-12 text-center"
        >
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-neutral-dark/50 rounded-2xl p-6 border border-neutral-light/10 hover:border-accent-teal/30 transition-all shadow-lg group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-semibold text-neutral-light group-hover:text-accent-teal transition-colors">
                  {project.name}
                </h3>
                {project.github && (
                  <svg
                    className="w-5 h-5 text-neutral-light/60 group-hover:text-accent-teal transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-label="GitHub"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                )}
              </div>
              <p className="text-neutral-light/80 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-3">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-accent-teal text-neutral-black text-sm font-medium rounded-lg hover:bg-accent-teal/90 transition-colors"
                    aria-label={`Live demo of ${project.name}`}
                  >
                    Live Demo
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
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-dark text-neutral-light text-sm font-medium rounded-lg border border-neutral-light/20 hover:border-accent-teal/30 transition-colors"
                  aria-label={`View ${project.name} project`}
                >
                  View Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

