'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { Button } from './button'

interface Testimonial {
  name: string
  title: string
  company: string
  content: string
  avatar?: string
  rating: number
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  autoPlay?: boolean
  interval?: number
}

export function TestimonialCarousel({ 
  testimonials, 
  autoPlay = true, 
  interval = 5000 
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(nextTestimonial, interval)
    return () => clearInterval(timer)
  }, [isAutoPlaying, interval])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(autoPlay)

  if (!testimonials.length) return null

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div 
      className="relative max-w-4xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main testimonial */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="card-glass p-8 lg:p-12 text-center relative"
          >
            {/* Quote icon */}
            <div className="absolute top-6 left-6 text-primary-300 dark:text-primary-700">
              <Quote className="w-8 h-8" />
            </div>

            {/* Rating */}
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < currentTestimonial.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <blockquote className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
              "{currentTestimonial.content}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-center space-x-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center text-white font-semibold">
                {currentTestimonial.avatar ? (
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  currentTestimonial.name.charAt(0)
                )}
              </div>

              {/* Author info */}
              <div className="text-left">
                <div className="font-semibold text-gray-900 dark:text-gray-100">
                  {currentTestimonial.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {currentTestimonial.title}
                  {currentTestimonial.company && (
                    <span> at {currentTestimonial.company}</span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8">
        {/* Previous button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={prevTestimonial}
          className="relative group"
          disabled={testimonials.length <= 1}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        {/* Dots indicator */}
        <div className="flex space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-primary-600 scale-110'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={nextTestimonial}
          className="relative group"
          disabled={testimonials.length <= 1}
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Progress bar for auto-play */}
      {isAutoPlaying && (
        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 overflow-hidden">
          <motion.div
            className="h-full bg-primary-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: interval / 1000, ease: 'linear' }}
            key={currentIndex}
          />
        </div>
      )}

      {/* Keyboard navigation hint */}
      <div className="text-center mt-4 text-xs text-gray-500 dark:text-gray-400">
        Use arrow keys to navigate • Hover to pause auto-play
      </div>
    </div>
  )
}

// Keyboard navigation
export function useKeyboardNavigation(
  nextCallback: () => void,
  prevCallback: () => void
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        nextCallback()
      } else if (event.key === 'ArrowLeft') {
        prevCallback()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextCallback, prevCallback])
}