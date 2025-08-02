'use client'

import React from 'react'
import Link from 'next/link'
import { Calculator, Github, Twitter, Linkedin, Mail, ExternalLink, Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const navigation = {
  product: [
    { name: 'Calculator', href: '/setup' },
    { name: 'Scenarios', href: '/scenarios' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'API', href: '/api/docs', external: true },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Documentation', href: '/docs', external: true },
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Status', href: '/status', external: true },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
  ],
}

const social = [
  {
    name: 'GitHub',
    href: 'https://github.com/yourusername/amplifyroi',
    icon: Github,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/amplifyroi',
    icon: Twitter,
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/amplifyroi',
    icon: Linkedin,
  },
  {
    name: 'Email',
    href: 'mailto:hello@amplifyroi.com',
    icon: Mail,
  },
]

const businessTypes = [
  'Startup ROI Calculator',
  'SaaS ROI Calculator', 
  'E-commerce ROI Calculator',
  'Manufacturing ROI Calculator',
  'Consulting ROI Calculator',
  'Agency ROI Calculator',
]

const countries = [
  'United States',
  'United Kingdom', 
  'Germany',
  'Canada',
  'Australia',
  'France',
  'Netherlands',
  'Singapore',
]

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-950 border-t border-border" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container-padding section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            {/* Brand section */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  AmplifyROI
                </span>
                <Badge variant="secondary" className="text-xs">
                  Beta
                </Badge>
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                Professional ROI calculator for 35+ business types across 25+ countries. 
                Get accurate financial projections with real-time 2025 tax data.
              </p>
              <div className="flex space-x-4">
                {social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors duration-200"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation sections */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {navigation.product.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 flex items-center"
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      {item.name}
                      {item.external && <ExternalLink className="ml-1 h-3 w-3" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {navigation.resources.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 flex items-center"
                      target={item.external ? '_blank' : undefined}
                      rel={item.external ? 'noopener noreferrer' : undefined}
                    >
                      {item.name}
                      {item.external && <ExternalLink className="ml-1 h-3 w-3" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {navigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SEO-friendly business types section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">
                  Business Type Calculators
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {businessTypes.map((type) => (
                    <Link
                      key={type}
                      href={`/calculator/${type.toLowerCase().replace(/\s+/g, '-').replace('roi-calculator', '')}`}
                      className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      {type}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase mb-4">
                  Countries Supported
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {countries.map((country) => (
                    <Link
                      key={country}
                      href={`/calculator/${country.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-xs text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      {country} ROI Calculator
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {/* Language selector placeholder */}
              <div className="flex items-center space-x-2">
                <select 
                  className="text-xs bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-600 dark:text-gray-400"
                  defaultValue="en"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>
            
            <div className="mt-8 md:order-1 md:mt-0">
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <span>&copy; 2025 AmplifyROI. All rights reserved.</span>
                <span>•</span>
                <span>Made with</span>
                <Heart className="h-3 w-3 text-red-500" />
                <span>for better business decisions</span>
              </div>
              <div className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                <span>Version 1.0.0 • Last updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Structured data for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "AmplifyROI",
                "description": "Professional ROI calculator for 35+ business types across 25+ countries",
                "url": "https://amplifyroi.com",
                "logo": "https://amplifyroi.com/logo.png",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+1-555-ROI-CALC",
                  "contactType": "customer service",
                  "email": "hello@amplifyroi.com"
                },
                "sameAs": [
                  "https://twitter.com/amplifyroi",
                  "https://linkedin.com/company/amplifyroi",
                  "https://github.com/yourusername/amplifyroi"
                ],
                "address": {
                  "@type": "PostalAddress",
                  "addressCountry": "US"
                }
              })
            }}
          />
        </div>
      </div>
    </footer>
  )
}