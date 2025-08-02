'use client'

import React, { useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'

interface StatsCounterProps {
  value: number
  label: string
  suffix?: string
  prefix?: string
  delay?: number
  duration?: number
  className?: string
}

export function StatsCounter({ 
  value, 
  label, 
  suffix = '', 
  prefix = '', 
  delay = 0, 
  duration = 2,
  className = ''
}: StatsCounterProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true })
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { 
    damping: 30,
    stiffness: 100
  })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.round(latest))
    })
    return unsubscribe
  }, [springValue])

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay: delay }}
      className={`text-center ${className}`}
    >
      <div className="text-4xl lg:text-5xl font-bold text-gradient mb-2">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-sm lg:text-base text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </div>
    </motion.div>
  )
}