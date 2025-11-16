'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import NameBadge from './NameBadge';
import RotatingTitle from './RotatingTitle';

export default function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 py-20 pt-32">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <NameBadge />
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-light leading-tight">
            <RotatingTitle />
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-neutral-light/80 leading-relaxed max-w-2xl">
            I explore how things work, why they break, and what small changes can create outsized impact. 
            Whether it's a product flow, an email experiment, or an everyday inconvenience, I enjoy 
            turning curiosity into clean, workable solutions.
          </p>

          <motion.a
            href="https://akshay3thakur.wordpress.com/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-3 bg-accent-teal text-neutral-black font-semibold rounded-2xl hover:bg-accent-teal/90 transition-colors"
            aria-label="Read my thoughts"
          >
            Read my thoughts
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/20 to-accent-amber/20 rounded-2xl blur-3xl" />
            <Image
              src="https://res.cloudinary.com/dmglst5zt/image/upload/v1762539370/IMG_5192_vuqzda.png"
              alt="Akshay Thakur"
              fill
              className="object-cover rounded-2xl shadow-2xl relative z-10"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

