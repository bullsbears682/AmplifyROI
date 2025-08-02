'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calculator, Globe, TrendingUp, Shield, Download, Mail, Users, DollarSign, ChevronRight, Star, Check, Zap, Target, BarChart3 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { StatsCounter } from '@/components/ui/stats-counter'
import { TechLogos } from '@/components/ui/tech-logos'
import { TestimonialCarousel } from '@/components/ui/testimonial-carousel'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const features = [
  {
    icon: Calculator,
    title: '35+ Business Types',
    description: 'From startups to enterprises, SaaS to e-commerce - comprehensive scenarios for every business model.',
    color: 'bg-blue-500'
  },
  {
    icon: Globe,
    title: '25+ Countries',
    description: 'Real-time 2025 tax rates and economic data for accurate international calculations.',
    color: 'bg-green-500'
  },
  {
    icon: TrendingUp,
    title: 'Advanced Analytics',
    description: 'NPV, IRR, payback period, and comprehensive financial projections with growth modeling.',
    color: 'bg-purple-500'
  },
  {
    icon: Shield,
    title: 'GDPR Compliant',
    description: 'Privacy-first design with secure data handling and transparent analytics.',
    color: 'bg-orange-500'
  },
  {
    icon: Download,
    title: 'Export Options',
    description: 'Professional PDF reports, Excel exports, and email delivery for easy sharing.',
    color: 'bg-pink-500'
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Lightning-fast calculations with real-time updates and what-if analysis.',
    color: 'bg-cyan-500'
  }
]

const benefits = [
  {
    icon: Target,
    title: 'Make Informed Decisions',
    description: 'Get accurate ROI calculations with country-specific tax implications and industry benchmarks.'
  },
  {
    icon: BarChart3,
    title: 'Visualize Growth',
    description: 'Interactive charts and month-by-month projections help you understand your business trajectory.'
  },
  {
    icon: Users,
    title: 'Compare Scenarios',
    description: 'Test multiple business scenarios and compare results to find the optimal strategy.'
  }
]

const stats = [
  { value: 35, label: 'Business Types', suffix: '+' },
  { value: 25, label: 'Countries', suffix: '+' },
  { value: 245, label: 'Scenarios', suffix: '' },
  { value: 100, label: 'Free Forever', suffix: '%' }
]

const testimonials = [
  {
    name: 'Sarah Chen',
    title: 'Startup Founder',
    company: 'TechFlow',
    content: 'AmplifyROI helped me validate my business model and secure funding. The detailed projections were exactly what investors wanted to see.',
    avatar: '/avatars/sarah.jpg',
    rating: 5
  },
  {
    name: 'Marcus Rodriguez',
    title: 'E-commerce Director',
    company: 'GrowthCart',
    content: 'The multi-country tax calculations saved us weeks of research. Perfect for planning our international expansion.',
    avatar: '/avatars/marcus.jpg',
    rating: 5
  },
  {
    name: 'Emily Watson',
    title: 'Financial Analyst',
    company: 'InvestCorp',
    content: 'Finally, a ROI calculator that considers all the variables that matter. The professional reports are presentation-ready.',
    avatar: '/avatars/emily.jpg',
    rating: 5
  }
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float floating-delayed" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
      </div>

      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative section-padding container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="text-center space-y-8"
            >
              <motion.div variants={fadeInUp} className="space-y-4">
                <Badge variant="secondary" className="glass-strong text-primary-700 dark:text-primary-300 px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  2025's Most Advanced ROI Calculator
                </Badge>
                
                <h1 className="text-display font-display text-balance">
                  Calculate ROI for{' '}
                  <span className="text-gradient-vibrant">35+ Business Types</span>
                  {' '}Across{' '}
                  <span className="text-gradient">25+ Countries</span>
                </h1>
                
                <p className="text-body text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-pretty">
                  Get accurate ROI calculations with real-time 2025 tax rates, comprehensive financial projections, 
                  and professional reports. No signup required, completely free forever.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild size="lg" className="btn-primary group">
                  <Link href="/setup">
                    Start Calculating ROI
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="btn-glass">
                  <Link href="/scenarios">
                    Browse Scenarios
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex justify-center items-center space-x-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  No signup required
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  100% free forever
                </div>
                <div className="flex items-center">
                  <Check className="w-4 h-4 mr-2 text-green-500" />
                  GDPR compliant
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding container-padding bg-glass">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <StatsCounter
                  key={stat.label}
                  value={stat.value}
                  label={stat.label}
                  suffix={stat.suffix}
                  delay={index * 0.1}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-headline font-display">
                Everything You Need for{' '}
                <span className="text-gradient">Accurate ROI</span>
              </h2>
              <p className="text-body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Comprehensive features designed for modern businesses, startups, and enterprises.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div key={feature.title} variants={fadeInUp}>
                  <Card className="card-glass p-8 text-center group hover:scale-105 transition-all duration-300 border-0">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl ${feature.color} bg-opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-8 h-8 text-white`} style={{ filter: 'drop-shadow(0 0 8px currentColor)' }} />
                    </div>
                    <h3 className="text-subtitle mb-4 font-semibold">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="section-padding container-padding bg-glass">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div className="space-y-8">
                <div>
                  <h2 className="text-headline font-display mb-6">
                    Why Choose{' '}
                    <span className="text-gradient">AmplifyROI</span>?
                  </h2>
                  <p className="text-body text-gray-600 dark:text-gray-300">
                    Built by financial experts for modern businesses. Get professional-grade 
                    calculations with the simplicity of a consumer app.
                  </p>
                </div>

                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-400 to-secondary-500 p-1">
                    <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-900 p-8 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <DollarSign className="w-24 h-24 mx-auto text-primary-600 dark:text-primary-400" />
                        <div className="space-y-2">
                          <div className="text-4xl font-bold text-gradient">156%</div>
                          <div className="text-sm text-gray-500">Average ROI Calculated</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-2xl rotate-12 animate-float opacity-80" />
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-2xl -rotate-12 animate-float floating-delayed opacity-80" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section-padding container-padding">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-headline font-display">
                Trusted by{' '}
                <span className="text-gradient">10,000+</span>
                {' '}Businesses
              </h2>
              <p className="text-body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                See what founders, analysts, and business leaders say about AmplifyROI.
              </p>
            </motion.div>

            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="section-padding container-padding bg-glass">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h3 className="text-title font-display">
                Built with{' '}
                <span className="text-gradient">Modern Technology</span>
              </h3>
              
              <TechLogos />
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding container-padding">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-glass p-12 text-center space-y-8 border-0"
            >
              <div className="space-y-4">
                <h2 className="text-headline font-display">
                  Ready to Calculate Your{' '}
                  <span className="text-gradient">ROI</span>?
                </h2>
                <p className="text-body text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Join thousands of businesses making smarter decisions with accurate ROI calculations. 
                  Get started in less than 2 minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="btn-primary group">
                  <Link href="/setup">
                    Calculate Your ROI Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" size="lg" className="btn-glass">
                  <Link href="/scenarios">
                    Explore Scenarios
                  </Link>
                </Button>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                No credit card required • No hidden fees • Always free
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}