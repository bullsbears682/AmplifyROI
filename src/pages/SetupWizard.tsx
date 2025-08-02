import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import toast from 'react-hot-toast'

import CountrySelector from '../components/wizard/CountrySelector'
import BusinessTypeSelector from '../components/wizard/BusinessTypeSelector'
import ScenarioSelector from '../components/wizard/ScenarioSelector'
import { countries } from '../data/countries'
import { businessTypes } from '../data/businessScenarios'

interface SetupData {
  country: string
  businessType: string
  scenario: string
}

const SetupWizard = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [setupData, setSetupData] = useState<SetupData>({
    country: '',
    businessType: '',
    scenario: ''
  })

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('amplifyroi-setup')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setSetupData(parsed)
      } catch (error) {
        console.error('Error loading saved setup data:', error)
      }
    }
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('amplifyroi-setup', JSON.stringify(setupData))
  }, [setupData])

  const updateSetupData = (key: keyof SetupData, value: string) => {
    setSetupData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return setupData.country !== ''
      case 2:
        return setupData.businessType !== ''
      case 3:
        return setupData.scenario !== ''
      default:
        return false
    }
  }

  const handleContinue = () => {
    if (!canProceed()) {
      toast.error('Please make a selection to continue')
      return
    }

    if (currentStep === totalSteps) {
      // Save final setup and navigate to calculator
      localStorage.setItem('amplifyroi-setup', JSON.stringify(setupData))
      toast.success('Setup complete! Redirecting to calculator...')
      navigate('/calculator')
    } else {
      nextStep()
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Select Your Country'
      case 2:
        return 'Choose Business Type'
      case 3:
        return 'Pick a Scenario'
      default:
        return ''
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case 1:
        return 'Choose your country to apply correct tax rates and currency formatting'
      case 2:
        return 'Select the type that best describes your business or investment'
      case 3:
        return 'Pick a scenario that matches your business stage and model'
      default:
        return ''
    }
  }

  const selectedCountry = countries.find(c => c.code === setupData.country)
  const selectedBusinessType = businessTypes.find(bt => bt.id === setupData.businessType)

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  }

  return (
    <>
      <Helmet>
        <title>Setup Your ROI Calculator - AmplifyROI</title>
        <meta name="description" content="Configure your ROI calculator with country-specific settings and business scenarios." />
      </Helmet>

      <div className="min-h-screen bg-gradient-bg py-8">
        <div className="container-custom max-w-4xl">
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-accent-900">Setup Your Calculator</h1>
              <span className="text-sm text-accent-600">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-accent-200 rounded-full h-2">
              <motion.div
                className="bg-primary-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            
            {/* Step Indicators */}
            <div className="flex justify-between mt-4">
              {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                <div
                  key={step}
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors duration-200 ${
                    step < currentStep
                      ? 'bg-success-600 text-white'
                      : step === currentStep
                      ? 'bg-primary-600 text-white'
                      : 'bg-accent-300 text-accent-600'
                  }`}
                >
                  {step < currentStep ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    step
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="card mb-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-accent-900 mb-2">
                {getStepTitle()}
              </h2>
              <p className="text-accent-600">
                {getStepDescription()}
              </p>
            </div>

            <div className="relative min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  custom={1}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0"
                >
                  {currentStep === 1 && (
                    <CountrySelector
                      selectedCountry={setupData.country}
                      onCountrySelect={(country) => updateSetupData('country', country)}
                    />
                  )}
                  
                  {currentStep === 2 && (
                    <BusinessTypeSelector
                      selectedBusinessType={setupData.businessType}
                      onBusinessTypeSelect={(businessType) => updateSetupData('businessType', businessType)}
                    />
                  )}
                  
                  {currentStep === 3 && selectedBusinessType && (
                    <ScenarioSelector
                      businessType={selectedBusinessType}
                      selectedScenario={setupData.scenario}
                      onScenarioSelect={(scenario) => updateSetupData('scenario', scenario)}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="flex items-center space-x-4">
              {/* Current Selection Summary */}
              {setupData.country && (
                <div className="hidden sm:flex items-center space-x-2 text-sm text-accent-600">
                  {selectedCountry && (
                    <span className="flex items-center space-x-1">
                      <span>{selectedCountry.flag}</span>
                      <span>{selectedCountry.name}</span>
                    </span>
                  )}
                  {setupData.businessType && (
                    <>
                      <span>•</span>
                      <span>{selectedBusinessType?.name}</span>
                    </>
                  )}
                </div>
              )}
              
              <button
                onClick={handleContinue}
                disabled={!canProceed()}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{currentStep === totalSteps ? 'Start Calculating' : 'Continue'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Summary Card */}
          {(setupData.country || setupData.businessType || setupData.scenario) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mt-8 bg-primary-50 border-primary-200"
            >
              <h3 className="text-lg font-semibold text-primary-900 mb-4">Current Selection</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-accent-600">Country:</span>
                  <div className="font-medium text-accent-900">
                    {selectedCountry ? (
                      <span className="flex items-center space-x-2 mt-1">
                        <span>{selectedCountry.flag}</span>
                        <span>{selectedCountry.name}</span>
                      </span>
                    ) : (
                      <span className="text-accent-400">Not selected</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-accent-600">Business Type:</span>
                  <div className="font-medium text-accent-900 mt-1">
                    {selectedBusinessType ? (
                      <span className="flex items-center space-x-2">
                        <span>{selectedBusinessType.icon}</span>
                        <span>{selectedBusinessType.name}</span>
                      </span>
                    ) : (
                      <span className="text-accent-400">Not selected</span>
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-accent-600">Scenario:</span>
                  <div className="font-medium text-accent-900 mt-1">
                    {setupData.scenario && selectedBusinessType ? (
                      selectedBusinessType.scenarios.find(s => s.id === setupData.scenario)?.name || 'Not found'
                    ) : (
                      <span className="text-accent-400">Not selected</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

export default SetupWizard