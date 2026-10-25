'use client';

import { motion } from 'framer-motion';

interface Project {
  name: string;
  description: string;
  link: string;
  tech: string[];
  github?: string;
  demoLink?: string;
}

const projects: Project[] = [
  {
    name: 'Avasify',
    description: 'Cloud-based platform designed to simplify property and tenant management. Organizes property details, lease agreements, tenant communications, and day-to-day operations in a unified workspace.',
    link: 'https://akshay3thakur-avas-website-application-backup2-uw4t.vercel.app/',
    demoLink: 'https://akshay3thakur-avas-website-application-backup2-uw4t.vercel.app/',
    tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    name: 'Pune Pulse',
    description: 'Civic complaint-resolution platform. Camera-first reporting workflow with geotagged uploads, unique issue-tracking tokens, automated notifications, and specialized dashboards for municipal workers.',
    link: 'https://shaktighssp.shop/',
    demoLink: 'https://shaktighssp.shop/',
    tech: ['Full-Stack', 'Geotagging', 'REST APIs', 'Role Dashboards'],
  },
  {
    name: 'PPE Kit Detector',
    description: 'Real-time safety compliance monitoring system using YOLO. Detects required protective equipment in industrial settings and generates immediate compliance alerts to prevent workplace accidents.',
    link: 'https://drive.google.com/file/d/1K71gjycLNdxhj12WU1oAcU1EocJ90bBr/view?usp=sharing',
    demoLink: 'https://drive.google.com/file/d/1K71gjycLNdxhj12WU1oAcU1EocJ90bBr/view?usp=sharing',
    tech: ['Python', 'YOLO v8', 'Computer Vision', 'Deep Learning'],
  },
  {
    name: 'WebShield Pro',
    description: 'Lightweight browser security extension utilizing machine learning heuristics to analyze URL behavior, detect phishing attempts, and block malicious destinations in real time.',
    link: 'https://github.com/akshay3thakur/Web-Shield-Pro',
    github: 'https://github.com/akshay3thakur/Web-Shield-Pro',
    tech: ['Chrome Extensions API', 'Machine Learning', 'Security Heuristics'],
  },
  {
    name: 'Web & App Stationary Mart',
    description: 'Integrated commerce system featuring synchronized web and mobile applications with inventory management, shopping workflows, and order tracking.',
    link: 'https://github.com/akshay3thakur/Stationary-Mart-App',
    github: 'https://github.com/akshay3thakur/Stationary-Mart-App',
    tech: ['React Native', 'Node.js', 'MongoDB', 'REST APIs'],
  },
];

export default function ProjectsGrid() {
  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-neutral-light tracking-tight mb-3">
            Projects
          </h2>
          <p className="text-neutral-light/70 text-sm sm:text-base max-w-xl mx-auto">
            Practical products and engineering experiments built to solve real operational bottlenecks.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-[#121517]/85 hover:bg-[#161a1d] rounded-2xl p-6 sm:p-7 border border-neutral-light/10 hover:border-accent-teal/30 transition-all duration-300 shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-xl font-semibold text-neutral-light group-hover:text-accent-teal transition-colors tracking-tight">
                    {project.name}
                  </h3>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-light/50 hover:text-accent-teal transition-colors p-1"
                      aria-label={`${project.name} GitHub repository`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Tech Stack Unboxed Metadata */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-accent-teal/90 mb-3.5">
                  {project.tech.map((t, i) => (
                    <span key={i} className="inline-flex items-center gap-2">
                      <span>{t}</span>
                      {i < project.tech.length - 1 && <span className="text-neutral-light/30" aria-hidden="true">·</span>}
                    </span>
                  ))}
                </div>

                <p className="text-neutral-light/75 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-accent-teal text-neutral-black text-xs sm:text-sm font-semibold rounded-lg hover:bg-accent-teal/90 transition-colors"
                    aria-label={`Live demo of ${project.name}`}
                  >
                    <span>Live Demo</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-dark/80 text-neutral-light text-xs sm:text-sm font-medium rounded-lg border border-neutral-light/20 hover:border-accent-teal/40 hover:text-white transition-colors"
                  aria-label={`View ${project.name} project`}
                >
                  <span>View Project</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
