'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Calculator,
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  Target,
  Zap,
  Settings,
  Play,
  Eye,
  BarChart3,
  RefreshCw,
  Info,
  Sliders
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCalculator } from '@/contexts/calculator-context'
import { useAnalyticsContext } from '@/contexts/analytics-context'
import { cn, formatCurrency } from '@/lib/utils'

// Form validation schema
const calculatorSchema = z.object({
  // Revenue inputs
  initialRevenue: z.number().min(0, 'Initial revenue must be positive'),
  monthlyGrowthRate: z.number().min(0).max(100, 'Growth rate must be between 0-100%'),
  
  // Investment inputs
  initialInvestment: z.number().min(1, 'Investment must be at least $1'),
  monthlyOperatingCosts: z.number().min(0, 'Operating costs must be positive'),
  
  // Business metrics
  grossMargin: z.number().min(0).max(100, 'Gross margin must be between 0-100%'),
  customerAcquisitionCost: z.number().min(0, 'CAC must be positive'),
  averageOrderValue: z.number().min(0, 'AOV must be positive'),
  customerLifetimeValue: z.number().min(0, 'CLV must be positive'),
  churnRate: z.number().min(0).max(100, 'Churn rate must be between 0-100%'),
  
  // Timeline
  timeframe: z.number().min(1).max(60, 'Timeframe must be between 1-60 months'),
  
  // Optional advanced inputs
  marketingBudget: z.number().min(0).optional(),
  employeeCosts: z.number().min(0).optional(),
  infrastructureCosts: z.number().min(0).optional(),
})

type CalculatorFormData = z.infer<typeof calculatorSchema>

interface WhatIfVariation {
  id: string
  name: string
  field: keyof CalculatorFormData
  change: number
  type: 'percentage' | 'absolute'
}

const whatIfVariations: WhatIfVariation[] = [
  { id: 'growth-high', name: 'Higher Growth (+10%)', field: 'monthlyGrowthRate', change: 10, type: 'absolute' },
  { id: 'growth-low', name: 'Lower Growth (-5%)', field: 'monthlyGrowthRate', change: -5, type: 'absolute' },
  { id: 'margin-high', name: 'Better Margin (+10%)', field: 'grossMargin', change: 10, type: 'absolute' },
  { id: 'cac-low', name: 'Lower CAC (-20%)', field: 'customerAcquisitionCost', change: -20, type: 'percentage' },
  { id: 'investment-high', name: 'Higher Investment (+50%)', field: 'initialInvestment', change: 50, type: 'percentage' },
]

const inputSections = [
  {
    id: 'revenue',
    title: 'Revenue & Growth',
    icon: TrendingUp,
    fields: ['initialRevenue', 'monthlyGrowthRate', 'averageOrderValue']
  },
  {
    id: 'investment',
    title: 'Investment & Costs',
    icon: DollarSign,
    fields: ['initialInvestment', 'monthlyOperatingCosts', 'marketingBudget', 'employeeCosts', 'infrastructureCosts']
  },
  {
    id: 'metrics',
    title: 'Business Metrics',
    icon: Target,
    fields: ['grossMargin', 'customerAcquisitionCost', 'customerLifetimeValue', 'churnRate']
  },
  {
    id: 'timeline',
    title: 'Timeline',
    icon: Calendar,
    fields: ['timeframe']
  }
]

const fieldDefinitions: Record<keyof CalculatorFormData, {
  label: string
  placeholder: string
  helpText: string
  prefix?: string
  suffix?: string
  step?: number
  min?: number
  max?: number
}> = {
  initialRevenue: {
    label: 'Initial Monthly Revenue',
    placeholder: '10000',
    helpText: 'Your current monthly revenue or starting revenue',
    prefix: '$',
    step: 100,
    min: 0
  },
  monthlyGrowthRate: {
    label: 'Monthly Growth Rate',
    placeholder: '10',
    helpText: 'Expected monthly growth percentage',
    suffix: '%',
    step: 0.1,
    min: 0,
    max: 100
  },
  initialInvestment: {
    label: 'Initial Investment',
    placeholder: '50000',
    helpText: 'Total upfront investment amount',
    prefix: '$',
    step: 1000,
    min: 1
  },
  monthlyOperatingCosts: {
    label: 'Monthly Operating Costs',
    placeholder: '5000',
    helpText: 'Fixed monthly costs excluding marketing',
    prefix: '$',
    step: 100,
    min: 0
  },
  grossMargin: {
    label: 'Gross Margin',
    placeholder: '70',
    helpText: 'Percentage of revenue after direct costs',
    suffix: '%',
    step: 0.1,
    min: 0,
    max: 100
  },
  customerAcquisitionCost: {
    label: 'Customer Acquisition Cost (CAC)',
    placeholder: '100',
    helpText: 'Average cost to acquire one customer',
    prefix: '$',
    step: 1,
    min: 0
  },
  averageOrderValue: {
    label: 'Average Order Value',
    placeholder: '150',
    helpText: 'Average value per customer transaction',
    prefix: '$',
    step: 1,
    min: 0
  },
  customerLifetimeValue: {
    label: 'Customer Lifetime Value (CLV)',
    placeholder: '500',
    helpText: 'Total revenue from an average customer',
    prefix: '$',
    step: 10,
    min: 0
  },
  churnRate: {
    label: 'Monthly Churn Rate',
    placeholder: '5',
    helpText: 'Percentage of customers lost each month',
    suffix: '%',
    step: 0.1,
    min: 0,
    max: 100
  },
  timeframe: {
    label: 'Calculation Timeframe',
    placeholder: '24',
    helpText: 'Number of months to calculate ROI for',
    suffix: 'months',
    step: 1,
    min: 1,
    max: 60
  },
  marketingBudget: {
    label: 'Monthly Marketing Budget',
    placeholder: '2000',
    helpText: 'Monthly marketing and advertising spend',
    prefix: '$',
    step: 100,
    min: 0
  },
  employeeCosts: {
    label: 'Monthly Employee Costs',
    placeholder: '15000',
    helpText: 'Salaries, benefits, and contractor costs',
    prefix: '$',
    step: 1000,
    min: 0
  },
  infrastructureCosts: {
    label: 'Monthly Infrastructure Costs',
    placeholder: '500',
    helpText: 'Hosting, software licenses, tools',
    prefix: '$',
    step: 50,
    min: 0
  }
}

export default function CalculatorPage() {
  const [activeSection, setActiveSection] = useState('revenue')
  const [isCalculating, setIsCalculating] = useState(false)
  const [showWhatIf, setShowWhatIf] = useState(false)
  const [whatIfResults, setWhatIfResults] = useState<any[]>([])
  
  const router = useRouter()
  const { selectedCountry, selectedBusinessType, selectedScenario, setCalculationInputs } = useCalculator()
  const { trackEvent, trackFormEvent } = useAnalyticsContext()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorSchema),
    defaultValues: {
      initialRevenue: 10000,
      monthlyGrowthRate: 10,
      initialInvestment: 50000,
      monthlyOperatingCosts: 5000,
      grossMargin: 70,
      customerAcquisitionCost: 100,
      averageOrderValue: 150,
      customerLifetimeValue: 500,
      churnRate: 5,
      timeframe: 24,
      marketingBudget: 2000,
      employeeCosts: 15000,
      infrastructureCosts: 500
    },
    mode: 'onChange'
  })

  const watchedValues = watch()

  // Redirect if setup not completed
  useEffect(() => {
    if (!selectedCountry || !selectedBusinessType || !selectedScenario) {
      router.push('/setup')
    }
  }, [selectedCountry, selectedBusinessType, selectedScenario, router])

  // Track form start
  useEffect(() => {
    trackFormEvent('calculator_form', 'start', {
      country: selectedCountry,
      businessType: selectedBusinessType,
      scenario: selectedScenario
    })
  }, [trackFormEvent, selectedCountry, selectedBusinessType, selectedScenario])

  const onSubmit = async (data: CalculatorFormData) => {
    setIsCalculating(true)
    
    try {
      // Set inputs in context
      setCalculationInputs(data)
      
      // Track calculation
      trackFormEvent('calculator_form', 'complete', {
        ...data,
        country: selectedCountry,
        businessType: selectedBusinessType,
        scenario: selectedScenario
      })
      
      // Simulate calculation delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Navigate to results
      router.push('/results')
    } catch (error) {
      console.error('Calculation failed:', error)
    } finally {
      setIsCalculating(false)
    }
  }

  const runWhatIfAnalysis = () => {
    setShowWhatIf(true)
    const baseData = watchedValues
    const variations = whatIfVariations.map(variation => {
      const modifiedData = { ...baseData }
      const currentValue = baseData[variation.field] as number
      
      if (variation.type === 'percentage') {
        modifiedData[variation.field] = currentValue * (1 + variation.change / 100)
      } else {
        modifiedData[variation.field] = currentValue + variation.change
      }
      
      // Simulate ROI calculation (in real app, this would call the API)
      const simulatedROI = Math.random() * 200 + 50
      
      return {
        ...variation,
        originalValue: currentValue,
        newValue: modifiedData[variation.field],
        estimatedROI: simulatedROI,
        difference: simulatedROI - 125 // assuming base ROI of 125%
      }
    })
    
    setWhatIfResults(variations)
    trackEvent('what_if_analysis', { variationsCount: variations.length })
  }

  const presetValues = {
    conservative: {
      monthlyGrowthRate: 5,
      grossMargin: 60,
      churnRate: 8
    },
    moderate: {
      monthlyGrowthRate: 10,
      grossMargin: 70,
      churnRate: 5
    },
    aggressive: {
      monthlyGrowthRate: 20,
      grossMargin: 80,
      churnRate: 3
    }
  }

  const applyPreset = (preset: keyof typeof presetValues) => {
    Object.entries(presetValues[preset]).forEach(([field, value]) => {
      setValue(field as keyof CalculatorFormData, value)
    })
    trackEvent('preset_applied', { preset })
  }

  if (!selectedCountry || !selectedBusinessType || !selectedScenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-600" />
          <p>Redirecting to setup...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container-padding py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  ROI Calculator
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Configure your business parameters to calculate accurate ROI projections
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={runWhatIfAnalysis}
                  className="flex items-center space-x-2"
                >
                  <Sliders className="w-4 h-4" />
                  <span>What-If Analysis</span>
                </Button>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Presets:</span>
                  {Object.keys(presetValues).map((preset) => (
                    <Button
                      key={preset}
                      variant="ghost"
                      size="sm"
                      onClick={() => applyPreset(preset as keyof typeof presetValues)}
                      className="text-xs capitalize"
                    >
                      {preset}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Configuration */}
            <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <Badge variant="secondary">🌍 {selectedCountry}</Badge>
              <Badge variant="secondary">🏢 {selectedBusinessType}</Badge>
              <Badge variant="secondary">📊 {selectedScenario}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Section Navigation */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Input Sections
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {inputSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200",
                        activeSection === section.id
                          ? "bg-primary-600 text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      )}
                    >
                      <section.icon className="w-5 h-5" />
                      <span className="font-medium">{section.title}</span>
                    </button>
                  ))}
                  
                  {/* Form Validation Status */}
                  <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={cn(
                        "w-3 h-3 rounded-full",
                        isValid ? "bg-green-500" : "bg-red-500"
                      )} />
                      <span className="text-sm font-medium">
                        Form {isValid ? 'Valid' : 'Invalid'}
                      </span>
                    </div>
                    {Object.keys(errors).length > 0 && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {Object.keys(errors).length} field(s) need attention
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {inputSections.map((section) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: activeSection === section.id ? 1 : 0.6,
                      y: 0,
                      scale: activeSection === section.id ? 1 : 0.98
                    }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "transition-all duration-300",
                      activeSection !== section.id && "pointer-events-none"
                    )}
                  >
                    <Card className={cn(
                      "transition-all duration-300",
                      activeSection === section.id 
                        ? "ring-2 ring-primary-600 shadow-lg" 
                        : "opacity-60"
                    )}>
                      <CardHeader>
                        <CardTitle className="flex items-center text-xl">
                          <section.icon className="w-6 h-6 mr-3 text-primary-600" />
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {section.fields.map((fieldName) => {
                            const field = fieldDefinitions[fieldName as keyof CalculatorFormData]
                            const error = errors[fieldName as keyof CalculatorFormData]
                            
                            return (
                              <div key={fieldName} className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {field.label}
                                  {field.helpText && (
                                    <div className="flex items-center mt-1">
                                      <Info className="w-3 h-3 text-gray-400 mr-1" />
                                      <span className="text-xs text-gray-500">{field.helpText}</span>
                                    </div>
                                  )}
                                </label>
                                
                                <div className="relative">
                                  {field.prefix && (
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                      {field.prefix}
                                    </span>
                                  )}
                                  
                                  <input
                                    type="number"
                                    step={field.step}
                                    min={field.min}
                                    max={field.max}
                                    placeholder={field.placeholder}
                                    {...register(fieldName as keyof CalculatorFormData, { valueAsNumber: true })}
                                    className={cn(
                                      "w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors",
                                      field.prefix && "pl-8",
                                      field.suffix && "pr-16",
                                      error 
                                        ? "border-red-300 dark:border-red-600" 
                                        : "border-gray-300 dark:border-gray-600"
                                    )}
                                  />
                                  
                                  {field.suffix && (
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                                      {field.suffix}
                                    </span>
                                  )}
                                </div>
                                
                                {error && (
                                  <p className="text-sm text-red-600 dark:text-red-400">
                                    {error.message}
                                  </p>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}

                {/* What-If Analysis Results */}
                {showWhatIf && whatIfResults.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Eye className="w-5 h-5 mr-2" />
                        What-If Analysis Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {whatIfResults.map((result) => (
                          <div 
                            key={result.id}
                            className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                          >
                            <h4 className="font-medium text-sm mb-2">{result.name}</h4>
                            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                              <div>Original: {formatCurrency(result.originalValue, 'USD')}</div>
                              <div>New: {formatCurrency(result.newValue, 'USD')}</div>
                              <div className={cn(
                                "font-medium",
                                result.difference > 0 ? "text-green-600" : "text-red-600"
                              )}>
                                ROI Impact: {result.difference > 0 ? '+' : ''}{result.difference.toFixed(1)}%
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Submit Button */}
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    disabled={!isValid || isCalculating}
                    size="lg"
                    className="px-12 py-4 text-lg font-semibold"
                  >
                    {isCalculating ? (
                      <>
                        <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                        Calculating ROI...
                      </>
                    ) : (
                      <>
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Calculate ROI
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}