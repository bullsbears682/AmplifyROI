'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  ChevronRight,
  ChevronLeft,
  Globe,
  Building,
  Lightbulb,
  Check,
  Search,
  Filter,
  Star,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  Target,
  AlertCircle,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCalculator } from '@/contexts/calculator-context'
import { useAnalyticsContext } from '@/contexts/analytics-context'
import { cn } from '@/lib/utils'

const steps = [
  {
    id: 'country',
    title: 'Select Your Country',
    description: 'Choose your business location for accurate tax calculations',
    icon: Globe
  },
  {
    id: 'business',
    title: 'Choose Business Type',
    description: 'Select the category that best describes your business',
    icon: Building
  },
  {
    id: 'scenario',
    title: 'Pick Your Scenario',
    description: 'Choose a specific scenario that matches your situation',
    icon: Lightbulb
  }
]

const countries = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: 'USD',
    corporateTax: 21,
    popular: true,
    users: 15234
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    corporateTax: 25,
    popular: true,
    users: 8456
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: 'CAD',
    corporateTax: 26.5,
    popular: true,
    users: 5678
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: 'AUD',
    corporateTax: 30,
    popular: true,
    users: 4321
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: 'EUR',
    corporateTax: 29.9,
    popular: true,
    users: 3987
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: 'EUR',
    corporateTax: 25,
    users: 2876
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    currency: 'EUR',
    corporateTax: 25.8,
    users: 2234
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    currency: 'SGD',
    corporateTax: 17,
    users: 1987
  }
]

const businessTypes = [
  {
    id: 'saas',
    name: 'SaaS',
    description: 'Software as a Service businesses',
    icon: '💻',
    scenarios: 7,
    avgROI: 156,
    difficulty: 'Medium',
    popular: true,
    examples: ['Micro SaaS', 'B2B Platform', 'Freemium App']
  },
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online retail and product sales',
    icon: '🛒',
    scenarios: 7,
    avgROI: 134,
    difficulty: 'Easy',
    popular: true,
    examples: ['Dropshipping', 'Private Label', 'Subscription Box']
  },
  {
    id: 'startup',
    name: 'Startup',
    description: 'Early-stage venture businesses',
    icon: '🚀',
    scenarios: 7,
    avgROI: 280,
    difficulty: 'Hard',
    popular: true,
    examples: ['MVP Stage', 'Series A', 'Bootstrap']
  },
  {
    id: 'consulting',
    name: 'Consulting',
    description: 'Professional services and expertise',
    icon: '🤝',
    scenarios: 7,
    avgROI: 189,
    difficulty: 'Easy',
    examples: ['Solo Consultant', 'Boutique Firm', 'Corporate']
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'Marketing and creative services',
    icon: '🎨',
    scenarios: 7,
    avgROI: 145,
    difficulty: 'Medium',
    examples: ['Digital Marketing', 'Creative', 'PR Agency']
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Physical product manufacturing',
    icon: '🏭',
    scenarios: 7,
    avgROI: 167,
    difficulty: 'Hard',
    examples: ['Small Batch', 'Mass Production', 'Custom']
  }
]

const scenarios = {
  saas: [
    {
      id: 'saas-micro',
      name: 'Micro SaaS Tool',
      description: 'Small niche SaaS serving specific market needs',
      difficulty: 'Easy',
      avgROI: 156,
      timeToBreakeven: 8,
      featured: true
    },
    {
      id: 'saas-b2b',
      name: 'B2B SaaS Platform',
      description: 'Enterprise software solution with recurring revenue',
      difficulty: 'Hard',
      avgROI: 234,
      timeToBreakeven: 12,
      featured: true
    },
    {
      id: 'saas-freemium',
      name: 'Freemium SaaS',
      description: 'Free tier with premium upgrade path',
      difficulty: 'Medium',
      avgROI: 189,
      timeToBreakeven: 10,
      trending: true
    }
  ],
  ecommerce: [
    {
      id: 'ecom-dropship',
      name: 'Dropshipping Store',
      description: 'No-inventory e-commerce with supplier fulfillment',
      difficulty: 'Easy',
      avgROI: 89,
      timeToBreakeven: 6
    },
    {
      id: 'ecom-private-label',
      name: 'Private Label Brand',
      description: 'Branded products with exclusive manufacturing',
      difficulty: 'Medium',
      avgROI: 134,
      timeToBreakeven: 9,
      featured: true
    },
    {
      id: 'ecom-subscription',
      name: 'Subscription Box',
      description: 'Curated monthly product subscriptions',
      difficulty: 'Medium',
      avgROI: 145,
      timeToBreakeven: 8,
      trending: true
    }
  ],
  startup: [
    {
      id: 'startup-mvp',
      name: 'MVP Stage Startup',
      description: 'Early-stage startup validating product-market fit',
      difficulty: 'Medium',
      avgROI: 280,
      timeToBreakeven: 15,
      featured: true
    },
    {
      id: 'startup-series-a',
      name: 'Series A Startup',
      description: 'Post-funding startup scaling operations',
      difficulty: 'Hard',
      avgROI: 312,
      timeToBreakeven: 18
    },
    {
      id: 'startup-bootstrap',
      name: 'Bootstrap Startup',
      description: 'Self-funded startup with lean operations',
      difficulty: 'Medium',
      avgROI: 198,
      timeToBreakeven: 12,
      trending: true
    }
  ]
}

export default function SetupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedBusinessType, setSelectedBusinessType] = useState('')
  const [selectedScenario, setSelectedScenario] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  const router = useRouter()
  const { goToStep, selectCountry, selectBusinessType, selectScenario } = useCalculator()
  const { trackEvent } = useAnalyticsContext()

  useEffect(() => {
    goToStep(currentStep)
  }, [currentStep, goToStep])

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
      trackEvent('wizard_step_complete', { step: currentStep + 1 })
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleCountrySelect = (countryCode: string) => {
    setSelectedCountry(countryCode)
    // TODO: Update context with full country object
    trackEvent('country_select', { country: countryCode })
  }

  const handleBusinessTypeSelect = (businessTypeId: string) => {
    setSelectedBusinessType(businessTypeId)
    // TODO: Update context with full business type object
    trackEvent('business_type_select', { businessType: businessTypeId })
  }

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId)
    // TODO: Update context with full scenario object
    trackEvent('scenario_select', { scenario: scenarioId })
  }

  const completeSetup = () => {
    setIsComplete(true)
    trackEvent('wizard_complete', {
      country: selectedCountry,
      businessType: selectedBusinessType,
      scenario: selectedScenario
    })
    
    // Redirect to calculator after animation
    setTimeout(() => {
      router.push('/calculator')
    }, 2000)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedCountry !== ''
      case 1: return selectedBusinessType !== ''
      case 2: return selectedScenario !== ''
      default: return false
    }
  }

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredBusinessTypes = businessTypes.filter(type =>
    type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const availableScenarios = selectedBusinessType ? (scenarios as any)[selectedBusinessType] || [] : []

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
          >
            Setup Complete!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-8"
          >
            Taking you to the ROI calculator...
          </motion.p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="h-2 bg-primary-600 rounded-full mx-auto max-w-xs"
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container-padding py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Let's Set Up Your ROI Calculation
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Follow these simple steps to get accurate results for your business
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex items-center">
                    <div className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg transition-all duration-300",
                      index <= currentStep ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"
                    )}>
                      {index < currentStep ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <step.icon className="w-6 h-6" />
                      )}
                    </div>
                    <div className="ml-4 hidden sm:block">
                      <p className={cn(
                        "font-semibold",
                        index <= currentStep ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
                      )}>
                        {step.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "flex-1 h-1 mx-4 rounded-full transition-all duration-300",
                      index < currentStep ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"
                    )} />
                  )}
                </div>
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
            >
              {/* Step 1: Country Selection */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Select Your Country
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      This helps us provide accurate tax calculations and currency formatting
                    </p>
                  </div>

                  {/* Search */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search countries..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    />
                  </div>

                  {/* Countries Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredCountries.map((country) => (
                      <Card
                        key={country.code}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:shadow-lg",
                          selectedCountry === country.code
                            ? "ring-2 ring-primary-600 bg-primary-50 dark:bg-primary-950"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                        onClick={() => handleCountrySelect(country.code)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <span className="text-2xl">{country.flag}</span>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                  {country.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {country.currency} • {country.corporateTax}% Corp Tax
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              {country.popular && (
                                <Badge variant="secondary" className="mb-1">Popular</Badge>
                              )}
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {country.users.toLocaleString()} users
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Business Type Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Choose Your Business Type
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Select the category that best describes your business model
                    </p>
                  </div>

                  {/* Search */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search business types..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    />
                  </div>

                  {/* Business Types Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredBusinessTypes.map((businessType) => (
                      <Card
                        key={businessType.id}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:shadow-lg h-full",
                          selectedBusinessType === businessType.id
                            ? "ring-2 ring-primary-600 bg-primary-50 dark:bg-primary-950"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                        onClick={() => handleBusinessTypeSelect(businessType.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-3xl">{businessType.icon}</span>
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                  {businessType.name}
                                </h3>
                                {businessType.popular && (
                                  <Badge variant="secondary" className="mt-1">Popular</Badge>
                                )}
                              </div>
                            </div>
                            <Badge 
                              variant={businessType.difficulty === 'Easy' ? 'success' : 
                                     businessType.difficulty === 'Medium' ? 'warning' : 'destructive'}
                            >
                              {businessType.difficulty}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            {businessType.description}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-gray-500">Scenarios:</span>
                              <span className="font-semibold ml-1">{businessType.scenarios}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Avg ROI:</span>
                              <span className="font-semibold text-green-600 ml-1">{businessType.avgROI}%</span>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Examples:</p>
                            <div className="flex flex-wrap gap-1">
                              {businessType.examples.map(example => (
                                <span key={example} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                                  {example}
                                </span>
                              ))}
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
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Pick Your Scenario
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Choose the specific scenario that best matches your business situation
                    </p>
                  </div>

                  {/* Scenarios Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {availableScenarios.map((scenario: any) => (
                      <Card
                        key={scenario.id}
                        className={cn(
                          "cursor-pointer transition-all duration-200 hover:shadow-lg",
                          selectedScenario === scenario.id
                            ? "ring-2 ring-primary-600 bg-primary-50 dark:bg-primary-950"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                        onClick={() => handleScenarioSelect(scenario.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                  {scenario.name}
                                </h3>
                                <div className="flex items-center space-x-2">
                                  {scenario.featured && <Badge variant="warning">Featured</Badge>}
                                  {scenario.trending && <Badge variant="success">Trending</Badge>}
                                  <Badge 
                                    variant={scenario.difficulty === 'Easy' ? 'success' : 
                                           scenario.difficulty === 'Medium' ? 'warning' : 'destructive'}
                                  >
                                    {scenario.difficulty}
                                  </Badge>
                                </div>
                              </div>
                              
                              <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {scenario.description}
                              </p>
                              
                              <div className="grid grid-cols-2 gap-6 text-sm">
                                <div className="flex items-center space-x-2">
                                  <TrendingUp className="w-4 h-4 text-green-600" />
                                  <span className="text-gray-500">Average ROI:</span>
                                  <span className="font-semibold text-green-600">{scenario.avgROI}%</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="w-4 h-4 text-blue-600" />
                                  <span className="text-gray-500">Breakeven:</span>
                                  <span className="font-semibold">{scenario.timeToBreakeven} months</span>
                                </div>
                              </div>
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
          <div className="flex items-center justify-between mt-12">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index <= currentStep ? "bg-primary-600" : "bg-gray-300 dark:bg-gray-600"
                  )}
                />
              ))}
            </div>

            {currentStep === steps.length - 1 ? (
              <Button
                onClick={completeSetup}
                disabled={!canProceed()}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
              >
                <span>Start Calculating</span>
                <Zap className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}