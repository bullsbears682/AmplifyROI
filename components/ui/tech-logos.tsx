'use client'

import React from 'react'
import { motion } from 'framer-motion'

const technologies = [
  {
    name: 'Next.js',
    logo: '/logos/nextjs.svg',
    description: 'React Framework',
  },
  {
    name: 'TypeScript',
    logo: '/logos/typescript.svg',
    description: 'Type Safety',
  },
  {
    name: 'Python',
    logo: '/logos/python.svg',
    description: 'Backend Logic',
  },
  {
    name: 'FastAPI',
    logo: '/logos/fastapi.svg',
    description: 'API Framework',
  },
  {
    name: 'Tailwind CSS',
    logo: '/logos/tailwind.svg',
    description: 'Styling',
  },
  {
    name: 'Framer Motion',
    logo: '/logos/framer.svg',
    description: 'Animations',
  },
]

export function TechLogos() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="flex flex-col items-center group"
        >
          <div className="relative w-12 h-12 lg:w-16 lg:h-16 mb-2 grayscale group-hover:grayscale-0 transition-all duration-300">
            {/* Fallback to text logo if SVG not available */}
            <div className="w-full h-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
              {tech.name.charAt(0)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">
              {tech.name}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {tech.description}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}