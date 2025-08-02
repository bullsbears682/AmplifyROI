'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  ChevronLeft, 
  ChevronRight, 
  Globe, 
  Building, 
  Target,
  CheckCircle,
  Search,
  Filter,
  Star,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCalculator } from '@/contexts/calculator-context'
import { useAnalyticsContext } from '@/contexts/analytics-context'
import { useI18n } from '@/contexts/i18n-context'
import { cn } from '@/lib/utils'

interface Country {
  code: string
  name: string
  flag: string
  currency: string
  taxRate: number
  popular?: boolean
}

interface BusinessType {
  id: string
  name: string
  description: string
  icon: string
  category: string
  scenarioCount: number
  averageROI: number
  popular?: boolean
}

interface Scenario {
  id: string
  name: string
  description: string
  businessTypeId: string
  metrics: {
    revenueRange: string
    grossMargin: number
    growthRate: number
    difficulty: 'Easy' | 'Medium' | 'Hard'
  }
  popular?: boolean
}

const steps = [
  { id: 'country', title: 'Select Country', icon: Globe },
  { id: 'business', title: 'Business Type', icon: Building },
  { id: 'scenario', title: 'Choose Scenario', icon: Target },
]

const countries: Country[] = [
  { code: 'US', name: 'United States', flag: '🇺🇸', currency: 'USD', taxRate: 21, popular: true },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currency: 'GBP', taxRate: 19, popular: true },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currency: 'CAD', taxRate: 15, popular: true },
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currency: 'AUD', taxRate: 25 },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currency: 'EUR', taxRate: 29.9 },
  { code: 'FR', name: 'France', flag: '🇫🇷', currency: 'EUR', taxRate: 28 },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currency: 'SGD', taxRate: 17 },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currency: 'EUR', taxRate: 25.8 },
]

const businessTypes: BusinessType[] = [
  {
    id: 'saas',
    name: 'SaaS',
    description: 'Software as a Service platform',
    icon: '💻',
    category: 'Technology',
    scenarioCount: 7,
    averageROI: 145,
    popular: true
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online retail business',
    icon: '🛒',
    category: 'Retail',
    scenarioCount: 7,
    averageROI: 89,
    popular: true
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'Early-stage company',
    icon: '🚀',
    category: 'Technology',
    scenarioCount: 7,
    averageROI: 234,
    popular: true
  },
  {
    id: 'consulting',
    name: 'Consulting',
    description: 'Professional services',
    icon: '👔',
    category: 'Services',
    scenarioCount: 7,
    averageROI: 123
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'Marketing & creative agency',
    icon: '🎨',
    category: 'Services',
    scenarioCount: 7,
    averageROI: 98
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Physical product manufacturing',
    icon: '🏭',
    category: 'Manufacturing',
    scenarioCount: 7,
    averageROI: 67
  }
]

const scenarios: { [key: string]: Scenario[] } = {
  saas: [
    {
      id: 'saas-micro',
      name: 'Micro SaaS',
      description: 'Small niche SaaS tool',
      businessTypeId: 'saas',
      metrics: { revenueRange: '$1K-10K MRR', grossMargin: 85, growthRate: 15, difficulty: 'Easy' },
      popular: true
    },
    {
      id: 'saas-b2b',
      name: 'B2B SaaS Platform',
      description: 'Enterprise software solution',
      businessTypeId: 'saas',
      metrics: { revenueRange: '$50K-500K MRR', grossMargin: 82, growthRate: 25, difficulty: 'Hard' }
    },
    {
      id: 'saas-freemium',
      name: 'Freemium SaaS',
      description: 'Free tier with premium upgrades',
      businessTypeId: 'saas',
      metrics: { revenueRange: '$10K-100K MRR', grossMargin: 88, growthRate: 20, difficulty: 'Medium' },
      popular: true
    }
  ],
  ecommerce: [
    {
      id: 'ecom-dropship',
      name: 'Dropshipping Store',
      description: 'No inventory e-commerce',
      businessTypeId: 'ecommerce',
      metrics: { revenueRange: '$5K-50K/mo', grossMargin: 25, growthRate: 30, difficulty: 'Easy' },
      popular: true
    },
    {
      id: 'ecom-private',
      name: 'Private Label',
      description: 'Branded product sales',
      businessTypeId: 'ecommerce',
      metrics: { revenueRange: '$20K-200K/mo', grossMargin: 45, growthRate: 20, difficulty: 'Medium' }
    }
  ],
  startup: [
    {
      id: 'startup-mvp',
      name: 'MVP Stage',
      description: 'Minimum viable product',
      businessTypeId: 'startup',
      metrics: { revenueRange: '$0-5K/mo', grossMargin: 70, growthRate: 50, difficulty: 'Medium' },
      popular: true
    },
    {
      id: 'startup-series-a',
      name: 'Series A',
      description: 'Post-funding growth',
      businessTypeId: 'startup',
      metrics: { revenueRange: '$100K-1M/mo', grossMargin: 65, growthRate: 35, difficulty: 'Hard' }
    }
  ]
}

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | null>(null)
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const router = useRouter()
  const { setWizardStep, setSelectedCountry: setContextCountry, setSelectedBusinessType: setContextBusinessType, setSelectedScenario: setContextScenario } = useCalculator()
  const { trackEvent, trackFormEvent } = useAnalyticsContext()
  const { t } = useI18n()

  useEffect(() => {
    trackFormEvent('setup_wizard', 'start', { step: currentStep })
  }, [trackFormEvent, currentStep])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      setWizardStep(currentStep + 1)
      trackEvent('setup_wizard_next', { step: currentStep + 1 })
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setWizardStep(currentStep - 1)
      trackEvent('setup_wizard_previous', { step: currentStep - 1 })
    }
  }

  const handleComplete = () => {
    if (selectedCountry && selectedBusinessType && selectedScenario) {
      setContextCountry(selectedCountry.code)
      setContextBusinessType(selectedBusinessType.id)
      setContextScenario(selectedScenario.id)
      
      trackFormEvent('setup_wizard', 'complete', {
        country: selectedCountry.code,
        businessType: selectedBusinessType.id,
        scenario: selectedScenario.id
      })
      
      router.push('/calculator')
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedCountry !== null
      case 1: return selectedBusinessType !== null
      case 2: return selectedScenario !== null
      default: return false
    }
  }

  const filteredBusinessTypes = businessTypes.filter(type => {
    const matchesSearch = type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         type.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || type.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const availableScenarios = selectedBusinessType ? scenarios[selectedBusinessType.id] || [] : []

  const categories = Array.from(new Set(businessTypes.map(type => type.category)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container-padding py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Setup Your ROI Calculator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us about your business to get accurate ROI calculations
                </p>
              </div>
              <Badge variant="secondary" className="text-sm">
                Step {currentStep + 1} of {steps.length}
              </Badge>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="flex items-center">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                      index <= currentStep
                        ? "bg-primary-600 border-primary-600 text-white"
                        : "bg-gray-100 border-gray-300 text-gray-400 dark:bg-gray-800 dark:border-gray-600"
                    )}>
                      {index < currentStep ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <div className={cn(
                        "text-sm font-medium",
                        index <= currentStep ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
                      )}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "flex-1 h-1 mx-4 rounded-full transition-all duration-300",
                      index < currentStep ? "bg-primary-600" : "bg-gray-200 dark:bg-gray-700"
                    )} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              {/* Step 1: Country Selection */}
              {currentStep === 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    Select Your Country
                  </h2>
                  
                  {/* Popular Countries */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 mr-2" />
                      Popular Countries
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {countries.filter(country => country.popular).map((country) => (
                        <Card
                          key={country.code}
                          className={cn(
                            "cursor-pointer transition-all duration-200 hover:shadow-lg",
                            selectedCountry?.code === country.code
                              ? "ring-2 ring-primary-600 bg-primary-50 dark:bg-primary-950"
                              : "hover:shadow-md"
                          )}
                          onClick={() => setSelectedCountry(country)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{country.flag}</span>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                  {country.name}
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {country.currency} • {country.taxRate}% tax
                                </div>
                              </div>
                              {selectedCountry?.code === country.code && (
                                <CheckCircle className="w-5 h-5 text-primary-600" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* All Countries */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                      All Countries
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {countries.filter(country => !country.popular).map((country) => (
                        <Card
                          key={country.code}
                          className={cn(
                            "cursor-pointer transition-all duration-200",
                            selectedCountry?.code === country.code
                              ? "ring-2 ring-primary-600 bg-primary-50 dark:bg-primary-950"
                              : "hover:shadow-md"
                          )}
                          onClick={() => setSelectedCountry(country)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">{country.flag}</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                  {country.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {country.taxRate}% tax
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Business Type Selection */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    What Type of Business?
                  </h2>

                  {/* Search and Filter */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search business types..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Business Types Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBusinessTypes.map((businessType) => (
                      <Card
                        key={businessType.id}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:shadow-lg group",
                          selectedBusinessType?.id === businessType.id
                            ? "ring-2 ring-primary-600 bg-primary-50 dark:bg-primary-950"
                            : "hover:shadow-md"
                        )}
                        onClick={() => setSelectedBusinessType(businessType)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-3xl">{businessType.icon}</span>
                              <div>
                                <CardTitle className="text-lg">{businessType.name}</CardTitle>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {businessType.category}
                                </div>
                              </div>
                            </div>
                            {businessType.popular && (
                              <Badge variant="secondary" className="text-xs">Popular</Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {businessType.description}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1">
                              <Target className="w-4 h-4 text-primary-600" />
                              <span className="text-gray-600 dark:text-gray-400">
                                {businessType.scenarioCount} scenarios
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              <span className="text-green-600 font-medium">
                                {businessType.averageROI}% avg ROI
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Scenario Selection */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Choose Your Scenario
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Select a scenario that best matches your {selectedBusinessType?.name} business
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {availableScenarios.map((scenario) => (
                      <Card
                        key={scenario.id}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:shadow-lg",
                          selectedScenario?.id === scenario.id
                            ? "ring-2 ring-primary-600 bg-primary-50 dark:bg-primary-950"
                            : "hover:shadow-md"
                        )}
                        onClick={() => setSelectedScenario(scenario)}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{scenario.name}</CardTitle>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {scenario.description}
                              </p>
                            </div>
                            {scenario.popular && (
                              <Badge variant="secondary" className="text-xs">Popular</Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Revenue Range:</span>
                              <span className="font-medium">{scenario.metrics.revenueRange}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Gross Margin:</span>
                              <span className="font-medium">{scenario.metrics.grossMargin}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Growth Rate:</span>
                              <span className="font-medium">{scenario.metrics.growthRate}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                              <Badge 
                                variant={scenario.metrics.difficulty === 'Easy' ? 'success' : 
                                       scenario.metrics.difficulty === 'Medium' ? 'warning' : 'destructive'}
                                className="text-xs"
                              >
                                {scenario.metrics.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === currentStep ? "bg-primary-600 w-8" : "bg-gray-300 dark:bg-gray-600"
                  )}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center space-x-2"
            >
              <span>{currentStep === steps.length - 1 ? 'Start Calculating' : 'Next'}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}