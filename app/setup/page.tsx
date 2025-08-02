'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calculator, Globe, BarChart3, Target, Zap, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

const steps = [
  {
    step: 1,
    title: 'Choose Your Country',
    description: 'Select from 25+ countries with 2025 tax rates',
    icon: Globe,
    color: 'from-primary-500 to-primary-600'
  },
  {
    step: 2,
    title: 'Select Business Type',
    description: 'Pick from 35+ comprehensive business categories',
    icon: BarChart3,
    color: 'from-accent-500 to-accent-600'
  },
  {
    step: 3,
    title: 'Choose Scenario',
    description: 'Select from 7 realistic scenarios per business type',
    icon: Target,
    color: 'from-primary-500 to-accent-500'
  },
  {
    step: 4,
    title: 'Calculate & Analyze',
    description: 'Get comprehensive ROI insights and reports',
    icon: Calculator,
    color: 'from-accent-500 to-primary-500'
  }
]

const benefits = [
  'No credit card required',
  'GDPR compliant & secure',
  'Professional PDF reports',
  'Real-time calculations',
  'Multi-currency support',
  'Export to Excel/CSV'
]

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function SetupPage() {
  return (
    <div className="relative min-h-screen">
      {/* Infinex-style Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float floating-delayed" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-4 sm:px-6 lg:px-8 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="bg-gradient-infinex text-white border-0 px-6 py-2 text-sm">
                  <Zap className="w-4 h-4 mr-2" />
                  Ready in 3 Minutes
                </Badge>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-balance bg-gradient-infinex bg-clip-text text-transparent">
                  Calculate Your ROI
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Professional ROI calculations for any business, anywhere. Get precise insights with our advanced 4-step wizard.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/setup/country" passHref>
                  <Button size="xl" className="min-w-[200px] shadow-lg">
                    Start Calculator <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/scenarios" passHref>
                  <Button size="xl" variant="outline" className="min-w-[200px]">
                    Browse Scenarios
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="text-center mb-16"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                How It Works
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our intelligent wizard guides you through each step to deliver accurate, actionable ROI insights.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.step}
                    variants={fadeInUp}
                    className="relative"
                  >
                    <Card variant="glass" className="h-full text-center p-6 group hover:scale-105 transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="relative mx-auto w-16 h-16 mb-4">
                          <div className={`w-full h-full bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                            <Icon className="w-8 h-8" />
                          </div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {step.step}
                          </div>
                        </div>
                        <CardTitle className="text-xl font-semibold">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{step.description}</CardDescription>
                      </CardContent>
                    </Card>
                    
                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transform -translate-y-1/2 z-10" />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-b from-transparent to-primary-50/50 dark:to-primary-950/20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="text-center"
            >
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-foreground mb-12">
                Why Choose AmplifyROI?
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    variants={fadeInUp}
                    className="flex items-center space-x-3 p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-primary-200/20 dark:border-primary-800/20"
                  >
                    <CheckCircle2 className="w-5 h-5 text-accent-500 flex-shrink-0" />
                    <span className="text-foreground font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div variants={fadeInUp} className="mt-12">
                <Link href="/setup/country" passHref>
                  <Button size="xl" className="shadow-xl">
                    Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}