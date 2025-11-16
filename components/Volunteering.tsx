'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface VolunteeringRole {
  organization: string;
  role: string;
  period: string;
  logo: string;
}

const volunteeringRoles: VolunteeringRole[] = [
  {
    organization: 'Google Developer Student Clubs',
    role: 'Management Team Representative',
    period: '2022 - 2024',
    logo: 'https://res.cloudinary.com/dmglst5zt/image/upload/v1763310918/download_dfmab6.png', // Placeholder - replace with actual GDSC logo if available
  },
  {
    organization: 'PlaceXP',
    role: 'Event & Planning Lead',
    period: '2023 - 2024',
    logo: 'https://res.cloudinary.com/dmglst5zt/image/upload/v1762539461/PlaceXP_logo_wgrn6q.png',
  },
  {
    organization: 'NexSeed',
    role: 'Incubation Team',
    period: '2023 - 2024',
    logo: 'https://res.cloudinary.com/dmglst5zt/image/upload/v1762539467/NexSeed_logo_e1o1lo.png',
  },
  {
    organization: 'Mensa India Chapter',
    role: 'Mensa Volunteer',
    period: '2017 - 2019',
    logo: 'https://res.cloudinary.com/dmglst5zt/image/upload/v1763306085/mensa_icon_ikuvbc.jpg',
  },
];

export default function Volunteering() {
  return (
    <section id="volunteering" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-neutral-light mb-12 text-center"
        >
          Volunteering & Roles
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          {volunteeringRoles.map((role, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, delay: index * 0.1 }}
              className="bg-neutral-dark/50 rounded-2xl p-6 border border-neutral-light/10 hover:border-accent-teal/30 transition-all group text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-20 h-20 bg-white/10 rounded-xl p-3 flex items-center justify-center">
                  <Image
                    src={role.logo}
                    alt={role.organization}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 w-full">
                  <h3 className="text-lg font-semibold text-neutral-light mb-1">
                    {role.role}
                  </h3>
                  <p className="text-accent-amber text-sm mb-2 font-medium">
                    {role.organization}
                  </p>
                  <span className="text-sm text-accent-teal font-medium">
                    {role.period}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

