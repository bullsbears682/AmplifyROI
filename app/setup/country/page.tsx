'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  ArrowRight, 
  ArrowLeft, 
  Search, 
  Globe, 
  Star, 
  TrendingUp,
  Users,
  MapPin,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const countries = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    corporateTax: 21,
    popular: true,
    users: 15234,
    gdp: '$26.9T',
    ease: 'Very High'
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    corporateTax: 25,
    popular: true,
    users: 8456,
    gdp: '$3.1T',
    ease: 'Very High'
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    corporateTax: 26.5,
    popular: true,
    users: 5678,
    gdp: '$2.1T',
    ease: 'Very High'
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    corporateTax: 30,
    popular: true,
    users: 4321,
    gdp: '$1.6T',
    ease: 'High'
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    corporateTax: 29.9,
    popular: true,
    users: 3987,
    gdp: '$4.3T',
    ease: 'High'
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    corporateTax: 25,
    users: 2876,
    gdp: '$2.9T',
    ease: 'Medium'
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    currency: 'EUR',
    corporateTax: 25.8,
    users: 2234,
    gdp: '$1.0T',
    ease: 'Very High'
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    corporateTax: 17,
    users: 1987,
    gdp: '$397B',
    ease: 'Very High'
  },
  {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    currency: 'CHF',
    corporateTax: 21.1,
    users: 1654,
    gdp: '$841B',
    ease: 'High'
  },
  {
    code: 'IE',
    name: 'Ireland',
    flag: '🇮🇪',
    currency: 'EUR',
    corporateTax: 12.5,
    users: 1432,
    gdp: '$504B',
    ease: 'High'
  },
  {
    code: 'SE',
    name: 'Sweden',
    flag: '🇸🇪',
    currency: 'SEK',
    corporateTax: 20.6,
    users: 1321,
    gdp: '$636B',
    ease: 'High'
  },
  {
    code: 'NO',
    name: 'Norway',
    flag: '🇳🇴',
    currency: 'NOK',
    corporateTax: 22,
    users: 1198,
    gdp: '$482B',
    ease: 'High'
  }
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
      staggerChildren: 0.05
    }
  }
}

export default function CountrySelectionPage() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.currency.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const popularCountries = filteredCountries.filter(c => c.popular)
  const otherCountries = filteredCountries.filter(c => !c.popular)

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode)
  }

  const handleContinue = () => {
    if (selectedCountry) {
      // Store selection in localStorage or context
      localStorage.setItem('selectedCountry', selectedCountry)
      router.push('/setup/business-type')
    }
  }

  const getTaxColor = (tax: number) => {
    if (tax < 20) return 'text-green-600'
    if (tax < 25) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="relative min-h-screen">
      {/* Infinex-style Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float floating-delayed" />
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-infinex rounded-full flex items-center justify-center text-white text-sm font-bold">
                1
              </div>
              <div className="w-16 h-1 bg-primary-200 dark:bg-primary-800 rounded" />
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">
                2
              </div>
              <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">
                3
              </div>
              <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">
                4
              </div>
            </div>
          </div>

          {/* Header */}
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp}>
              <Badge className="bg-gradient-infinex text-white border-0 px-4 py-2 mb-4">
                <Globe className="w-4 h-4 mr-2" />
                Step 1 of 4
              </Badge>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold bg-gradient-infinex bg-clip-text text-transparent mb-4">
              Choose Your Country
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select your business location for accurate tax calculations and currency formatting. We support 25+ countries with real-time 2025 data.
            </motion.p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-md mx-auto mb-12"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search countries or currencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-primary-200 dark:border-primary-800 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </motion.div>

          {/* Popular Countries */}
          {popularCountries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center space-x-2 mb-6">
                <Star className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-semibold text-foreground">Popular Countries</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularCountries.map((country, index) => (
                  <motion.div
                    key={country.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Card
                      variant={selectedCountry === country.code ? 'elevated' : 'glass'}
                      className={cn(
                        "cursor-pointer transition-all duration-300 hover:scale-105 group",
                        selectedCountry === country.code
                          ? "ring-2 ring-primary-500 bg-primary-50/50 dark:bg-primary-950/50"
                          : "hover:shadow-lg hover:shadow-primary-500/10"
                      )}
                      onClick={() => handleCountrySelect(country.code)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                              {country.flag}
                            </span>
                            <div>
                              <h3 className="font-semibold text-foreground text-lg">
                                {country.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {country.currency} • GDP {country.gdp}
                              </p>
                            </div>
                          </div>
                          {selectedCountry === country.code && (
                            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className={cn("w-4 h-4", getTaxColor(country.corporateTax))} />
                            <span className="text-muted-foreground">Corp Tax:</span>
                            <span className={cn("font-semibold", getTaxColor(country.corporateTax))}>
                              {country.corporateTax}%
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className="text-muted-foreground">Users:</span>
                            <span className="font-semibold">{country.users.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            Ease: {country.ease}
                          </Badge>
                          <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Other Countries */}
          {otherCountries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center space-x-2 mb-6">
                <MapPin className="w-5 h-5 text-primary-500" />
                <h2 className="text-xl font-semibold text-foreground">All Countries</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherCountries.map((country, index) => (
                  <motion.div
                    key={country.code}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                  >
                    <Card
                      variant={selectedCountry === country.code ? 'elevated' : 'glass'}
                      className={cn(
                        "cursor-pointer transition-all duration-300 hover:scale-105 group",
                        selectedCountry === country.code
                          ? "ring-2 ring-primary-500 bg-primary-50/50 dark:bg-primary-950/50"
                          : "hover:shadow-lg hover:shadow-primary-500/10"
                      )}
                      onClick={() => handleCountrySelect(country.code)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                              {country.flag}
                            </span>
                            <div>
                              <h3 className="font-semibold text-foreground text-lg">
                                {country.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {country.currency} • GDP {country.gdp}
                              </p>
                            </div>
                          </div>
                          {selectedCountry === country.code && (
                            <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <TrendingUp className={cn("w-4 h-4", getTaxColor(country.corporateTax))} />
                            <span className="text-muted-foreground">Corp Tax:</span>
                            <span className={cn("font-semibold", getTaxColor(country.corporateTax))}>
                              {country.corporateTax}%
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-blue-500" />
                            <span className="text-muted-foreground">Users:</span>
                            <span className="font-semibold">{country.users.toLocaleString()}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <Badge variant="outline" className="text-xs">
                            Ease: {country.ease}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex items-center justify-between"
          >
            <Link href="/setup" passHref>
              <Button variant="outline" size="lg" className="flex items-center space-x-2">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            </Link>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {selectedCountry ? 'Great choice!' : 'Select a country to continue'}
              </p>
            </div>

            <Button 
              size="lg" 
              disabled={!selectedCountry}
              onClick={handleContinue}
              className="flex items-center space-x-2 shadow-lg disabled:opacity-50"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  )
}