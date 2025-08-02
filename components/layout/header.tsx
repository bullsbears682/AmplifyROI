'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Calculator,
  BarChart3,
  FileText,
  Users,
  Settings,
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Calculator', href: '/setup' },
  { name: 'Scenarios', href: '/scenarios' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Docs', href: '/docs', external: true },
]

const features = [
  {
    icon: Calculator,
    name: 'ROI Calculator',
    description: 'Calculate ROI for 35+ business types',
    href: '/setup',
  },
  {
    icon: BarChart3,
    name: 'Analytics',
    description: 'Track and analyze your calculations',
    href: '/analytics',
  },
  {
    icon: FileText,
    name: 'Reports',
    description: 'Professional PDF and Excel exports',
    href: '/reports',
  },
  {
    icon: Users,
    name: 'Scenarios',
    description: 'Browse 245 realistic business scenarios',
    href: '/scenarios',
  },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container-padding" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">AmplifyROI</span>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                    <Calculator className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    AmplifyROI
                  </span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    Beta
                  </Badge>
                </div>
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center"
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {item.name}
                {item.external && <ExternalLink className="ml-1 h-3 w-3" />}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="relative"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* CTA Button */}
            <Button asChild className="btn-primary">
              <Link href="/setup">
                Start Calculating
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/25 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 lg:hidden"
            >
              {/* Mobile menu header */}
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                      AmplifyROI
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Mobile navigation */}
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/25">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-between"
                        onClick={() => setMobileMenuOpen(false)}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                      >
                        {item.name}
                        {item.external && <ExternalLink className="h-4 w-4" />}
                      </Link>
                    ))}
                  </div>

                  {/* Features section */}
                  <div className="py-6">
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4">
                      Features
                    </div>
                    <div className="space-y-4">
                      {features.map((feature) => (
                        <Link
                          key={feature.name}
                          href={feature.href}
                          className="-mx-3 flex items-start rounded-lg px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <div className="flex-shrink-0">
                            <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                              {feature.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {feature.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Mobile actions */}
                  <div className="py-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        Theme
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="relative"
                      >
                        <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="ml-2 text-sm">
                          {theme === 'dark' ? 'Light' : 'Dark'}
                        </span>
                      </Button>
                    </div>

                    <Button asChild className="w-full btn-primary">
                      <Link href="/setup" onClick={() => setMobileMenuOpen(false)}>
                        Start Calculating ROI
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}