'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useAnalytics } from '@/hooks/use-analytics'
import { toast } from 'react-hot-toast'

// Types
interface Country {
  code: string
  name: string
  flag: string
  currency: {
    code: string
    symbol: string
    name: string
  }
  tax_rates: {
    corporate_tax: number
    vat?: number
    capital_gains?: number
    payroll_tax?: number
  }
  financial_year: {
    start: string
    end: string
  }
  economic_indicators: {
    inflation_2025: number
    gdp_growth_2025: number
    business_ease_rank: number
  }
}

interface BusinessType {
  id: string
  name: string
  description: string
  icon: string
  category: string
  scenarios: BusinessScenario[]
}

interface BusinessScenario {
  id: string
  name: string
  description: string
  metrics: {
    revenue: { min: number; max: number; default: number }
    gross_margin: number
    cac: { min: number; max: number; default: number }
    marketing_budget: { percentage: number; default: number }
    aov: { min: number; max: number; default: number }
    churn_rate?: number
    fulfillment_cost?: number
    payment_terms: number
    operating_expenses: number
    growth_rate: number
  }
}

interface CalculationInputs {
  country: string
  business_type: string
  scenario: string
  monthly_revenue: number
  initial_investment: number
  operating_expenses: number
  marketing_spend: number
  gross_margin?: number
  customer_acquisition_cost?: number
  average_order_value?: number
  customer_lifetime_value?: number
  churn_rate?: number
  timeframe_months: number
  fulfillment_costs?: number
  payment_processing_rate?: number
  employee_costs?: number
}

interface CalculationResult {
  calculation_id: string
  timestamp: string
  input_summary: Record<string, any>
  metrics: {
    roi_percentage: number
    roi_ratio: number
    net_profit: number
    gross_profit: number
    total_revenue: number
    total_expenses: number
    payback_period_months?: number
    irr?: number
    npv?: number
  }
  tax_calculation: {
    corporate_tax: number
    vat_tax: number
    payroll_tax: number
    total_tax: number
    effective_tax_rate: number
    after_tax_profit: number
  }
  revenue_breakdown: Array<{
    category: string
    amount: number
    percentage: number
    description: string
  }>
  expense_breakdown: Array<{
    category: string
    amount: number
    percentage: number
    description: string
  }>
  monthly_projections: Array<{
    month: number
    revenue: number
    expenses: number
    profit: number
    cumulative_profit: number
    roi: number
  }>
  insights: string[]
  recommendations: string[]
  risk_factors: string[]
  industry_benchmarks?: Record<string, number>
  currency_code: string
  formatted_values: Record<string, string>
}

interface WizardStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isActive: boolean
}

interface CalculatorState {
  // Setup wizard state
  currentStep: number
  steps: WizardStep[]
  
  // Data
  countries: Country[]
  businessTypes: BusinessType[]
  
  // User selections
  selectedCountry: Country | null
  selectedBusinessType: BusinessType | null
  selectedScenario: BusinessScenario | null
  
  // Calculation inputs
  calculationInputs: CalculationInputs | null
  
  // Results
  currentResult: CalculationResult | null
  calculationHistory: CalculationResult[]
  
  // UI state
  isLoading: boolean
  isCalculating: boolean
  error: string | null
  
  // What-if analysis
  whatIfVariations: Array<{
    name: string
    changes: Record<string, any>
    result?: CalculationResult
  }>
  
  // Export state
  isExporting: boolean
  exportFormat: 'pdf' | 'excel' | 'csv'
}

type CalculatorAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CALCULATING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_COUNTRIES'; payload: Country[] }
  | { type: 'SET_BUSINESS_TYPES'; payload: BusinessType[] }
  | { type: 'SELECT_COUNTRY'; payload: Country }
  | { type: 'SELECT_BUSINESS_TYPE'; payload: BusinessType }
  | { type: 'SELECT_SCENARIO'; payload: BusinessScenario }
  | { type: 'UPDATE_CALCULATION_INPUTS'; payload: Partial<CalculationInputs> }
  | { type: 'SET_CALCULATION_RESULT'; payload: CalculationResult }
  | { type: 'ADD_TO_HISTORY'; payload: CalculationResult }
  | { type: 'CLEAR_HISTORY' }
  | { type: 'RESET_WIZARD' }
  | { type: 'ADD_WHAT_IF_VARIATION'; payload: { name: string; changes: Record<string, any> } }
  | { type: 'UPDATE_WHAT_IF_RESULT'; payload: { index: number; result: CalculationResult } }
  | { type: 'CLEAR_WHAT_IF' }
  | { type: 'SET_EXPORT_STATE'; payload: { isExporting: boolean; format?: 'pdf' | 'excel' | 'csv' } }
  | { type: 'COMPLETE_STEP'; payload: number }
  | { type: 'LOAD_PERSISTED_STATE'; payload: Partial<CalculatorState> }

const initialSteps: WizardStep[] = [
  {
    id: 'country',
    title: 'Select Country',
    description: 'Choose your business location for accurate tax calculations',
    isCompleted: false,
    isActive: true,
  },
  {
    id: 'business-type',
    title: 'Business Type',
    description: 'Select your business model and industry',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 'scenario',
    title: 'Business Scenario',
    description: 'Choose a scenario that matches your situation',
    isCompleted: false,
    isActive: false,
  },
  {
    id: 'inputs',
    title: 'Financial Inputs',
    description: 'Enter your financial data for calculation',
    isCompleted: false,
    isActive: false,
  },
]

const initialState: CalculatorState = {
  currentStep: 0,
  steps: initialSteps,
  countries: [],
  businessTypes: [],
  selectedCountry: null,
  selectedBusinessType: null,
  selectedScenario: null,
  calculationInputs: null,
  currentResult: null,
  calculationHistory: [],
  isLoading: false,
  isCalculating: false,
  error: null,
  whatIfVariations: [],
  isExporting: false,
  exportFormat: 'pdf',
}

function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_CALCULATING':
      return { ...state, isCalculating: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    case 'SET_CURRENT_STEP':
      return {
        ...state,
        currentStep: action.payload,
        steps: state.steps.map((step, index) => ({
          ...step,
          isActive: index === action.payload,
        })),
      }
    
    case 'SET_COUNTRIES':
      return { ...state, countries: action.payload }
    
    case 'SET_BUSINESS_TYPES':
      return { ...state, businessTypes: action.payload }
    
    case 'SELECT_COUNTRY':
      return {
        ...state,
        selectedCountry: action.payload,
        steps: state.steps.map((step, index) => ({
          ...step,
          isCompleted: index === 0 ? true : step.isCompleted,
        })),
      }
    
    case 'SELECT_BUSINESS_TYPE':
      return {
        ...state,
        selectedBusinessType: action.payload,
        selectedScenario: null, // Reset scenario when business type changes
        steps: state.steps.map((step, index) => ({
          ...step,
          isCompleted: index === 1 ? true : step.isCompleted,
        })),
      }
    
    case 'SELECT_SCENARIO':
      return {
        ...state,
        selectedScenario: action.payload,
        steps: state.steps.map((step, index) => ({
          ...step,
          isCompleted: index === 2 ? true : step.isCompleted,
        })),
      }
    
    case 'UPDATE_CALCULATION_INPUTS':
      const updatedInputs = state.calculationInputs
        ? { ...state.calculationInputs, ...action.payload }
        : action.payload as CalculationInputs
      
      return {
        ...state,
        calculationInputs: updatedInputs,
      }
    
    case 'SET_CALCULATION_RESULT':
      return {
        ...state,
        currentResult: action.payload,
        isCalculating: false,
        error: null,
      }
    
    case 'ADD_TO_HISTORY':
      const newHistory = [action.payload, ...state.calculationHistory.slice(0, 9)] // Keep last 10
      return {
        ...state,
        calculationHistory: newHistory,
      }
    
    case 'CLEAR_HISTORY':
      return {
        ...state,
        calculationHistory: [],
      }
    
    case 'RESET_WIZARD':
      return {
        ...initialState,
        countries: state.countries,
        businessTypes: state.businessTypes,
      }
    
    case 'ADD_WHAT_IF_VARIATION':
      return {
        ...state,
        whatIfVariations: [...state.whatIfVariations, action.payload],
      }
    
    case 'UPDATE_WHAT_IF_RESULT':
      return {
        ...state,
        whatIfVariations: state.whatIfVariations.map((variation, index) =>
          index === action.payload.index
            ? { ...variation, result: action.payload.result }
            : variation
        ),
      }
    
    case 'CLEAR_WHAT_IF':
      return {
        ...state,
        whatIfVariations: [],
      }
    
    case 'SET_EXPORT_STATE':
      return {
        ...state,
        isExporting: action.payload.isExporting,
        exportFormat: action.payload.format || state.exportFormat,
      }
    
    case 'COMPLETE_STEP':
      return {
        ...state,
        steps: state.steps.map((step, index) => ({
          ...step,
          isCompleted: index <= action.payload ? true : step.isCompleted,
        })),
      }
    
    case 'LOAD_PERSISTED_STATE':
      return {
        ...state,
        ...action.payload,
      }
    
    default:
      return state
  }
}

interface CalculatorContextType {
  state: CalculatorState
  
  // Navigation
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  
  // Data loading
  loadCountries: () => Promise<void>
  loadBusinessTypes: () => Promise<void>
  
  // Selections
  selectCountry: (country: Country) => void
  selectBusinessType: (businessType: BusinessType) => void
  selectScenario: (scenario: BusinessScenario) => void
  
  // Calculations
  updateInputs: (inputs: Partial<CalculationInputs>) => void
  calculateROI: () => Promise<void>
  
  // History
  clearHistory: () => void
  loadFromHistory: (result: CalculationResult) => void
  
  // What-if analysis
  addWhatIfVariation: (name: string, changes: Record<string, any>) => void
  runWhatIfAnalysis: () => Promise<void>
  clearWhatIf: () => void
  
  // Export
  exportToPDF: () => Promise<void>
  exportToExcel: () => Promise<void>
  sendByEmail: (email: string, name?: string, company?: string) => Promise<void>
  
  // Utility
  reset: () => void
  canProceed: () => boolean
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined)

interface CalculatorProviderProps {
  children: ReactNode
}

export function CalculatorProvider({ children }: CalculatorProviderProps) {
  const [state, dispatch] = useReducer(calculatorReducer, initialState)
  const [persistedState, setPersistedState] = useLocalStorage('amplifyroi-calculator', {})
  const { trackEvent } = useAnalytics()

  // Load persisted state on mount
  useEffect(() => {
    if (persistedState && Object.keys(persistedState).length > 0) {
      dispatch({ type: 'LOAD_PERSISTED_STATE', payload: persistedState })
    }
  }, [persistedState])

  // Persist state changes
  useEffect(() => {
    const stateToPersist = {
      selectedCountry: state.selectedCountry,
      selectedBusinessType: state.selectedBusinessType,
      selectedScenario: state.selectedScenario,
      calculationInputs: state.calculationInputs,
      calculationHistory: state.calculationHistory,
      currentStep: state.currentStep,
    }
    setPersistedState(stateToPersist)
  }, [
    state.selectedCountry,
    state.selectedBusinessType,
    state.selectedScenario,
    state.calculationInputs,
    state.calculationHistory,
    state.currentStep,
    setPersistedState,
  ])

  // Navigation functions
  const nextStep = () => {
    if (state.currentStep < state.steps.length - 1) {
      const newStep = state.currentStep + 1
      dispatch({ type: 'SET_CURRENT_STEP', payload: newStep })
      trackEvent('wizard_step_completed', { step: state.currentStep })
    }
  }

  const prevStep = () => {
    if (state.currentStep > 0) {
      const newStep = state.currentStep - 1
      dispatch({ type: 'SET_CURRENT_STEP', payload: newStep })
    }
  }

  const goToStep = (step: number) => {
    if (step >= 0 && step < state.steps.length) {
      dispatch({ type: 'SET_CURRENT_STEP', payload: step })
    }
  }

  // Data loading functions
  const loadCountries = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/countries')
      if (!response.ok) throw new Error('Failed to load countries')
      const data = await response.json()
      dispatch({ type: 'SET_COUNTRIES', payload: data })
    } catch (error) {
      console.error('Error loading countries:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load countries' })
      toast.error('Failed to load countries')
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  const loadBusinessTypes = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await fetch('/api/business-types')
      if (!response.ok) throw new Error('Failed to load business types')
      const data = await response.json()
      dispatch({ type: 'SET_BUSINESS_TYPES', payload: data })
    } catch (error) {
      console.error('Error loading business types:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load business types' })
      toast.error('Failed to load business types')
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  // Selection functions
  const selectCountry = (country: Country) => {
    dispatch({ type: 'SELECT_COUNTRY', payload: country })
    trackEvent('country_selected', { country: country.code })
  }

  const selectBusinessType = (businessType: BusinessType) => {
    dispatch({ type: 'SELECT_BUSINESS_TYPE', payload: businessType })
    trackEvent('business_type_selected', { type: businessType.id })
  }

  const selectScenario = (scenario: BusinessScenario) => {
    dispatch({ type: 'SELECT_SCENARIO', payload: scenario })
    trackEvent('scenario_selected', { scenario: scenario.id })
  }

  // Calculation functions
  const updateInputs = (inputs: Partial<CalculationInputs>) => {
    dispatch({ type: 'UPDATE_CALCULATION_INPUTS', payload: inputs })
  }

  const calculateROI = async () => {
    if (!state.calculationInputs || !state.selectedCountry || !state.selectedBusinessType || !state.selectedScenario) {
      toast.error('Please complete all required fields')
      return
    }

    try {
      dispatch({ type: 'SET_CALCULATING', payload: true })
      
      const response = await fetch('/api/calculate-roi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Session-ID': crypto.randomUUID(),
        },
        body: JSON.stringify(state.calculationInputs),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Calculation failed')
      }

      const result = await response.json()
      dispatch({ type: 'SET_CALCULATION_RESULT', payload: result })
      dispatch({ type: 'ADD_TO_HISTORY', payload: result })
      
      trackEvent('roi_calculated', {
        country: state.selectedCountry.code,
        business_type: state.selectedBusinessType.id,
        scenario: state.selectedScenario.id,
        roi: result.metrics.roi_percentage,
      })
      
      toast.success('ROI calculation completed!')
    } catch (error) {
      console.error('Calculation error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Calculation failed'
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      toast.error(errorMessage)
    } finally {
      dispatch({ type: 'SET_CALCULATING', payload: false })
    }
  }

  // Utility functions
  const canProceed = (): boolean => {
    switch (state.currentStep) {
      case 0:
        return !!state.selectedCountry
      case 1:
        return !!state.selectedBusinessType
      case 2:
        return !!state.selectedScenario
      case 3:
        return !!state.calculationInputs?.monthly_revenue
      default:
        return false
    }
  }

  const reset = () => {
    dispatch({ type: 'RESET_WIZARD' })
    trackEvent('calculator_reset')
  }

  // Additional functions (simplified for space)
  const clearHistory = () => dispatch({ type: 'CLEAR_HISTORY' })
  const loadFromHistory = (result: CalculationResult) => {
    // Implementation would load the result back into the calculator
  }
  const addWhatIfVariation = (name: string, changes: Record<string, any>) => {
    dispatch({ type: 'ADD_WHAT_IF_VARIATION', payload: { name, changes } })
  }
  const runWhatIfAnalysis = async () => {
    // Implementation for what-if analysis
  }
  const clearWhatIf = () => dispatch({ type: 'CLEAR_WHAT_IF' })
  const exportToPDF = async () => {
    // Implementation for PDF export
  }
  const exportToExcel = async () => {
    // Implementation for Excel export
  }
  const sendByEmail = async (email: string, name?: string, company?: string) => {
    // Implementation for email sending
  }

  const contextValue: CalculatorContextType = {
    state,
    nextStep,
    prevStep,
    goToStep,
    loadCountries,
    loadBusinessTypes,
    selectCountry,
    selectBusinessType,
    selectScenario,
    updateInputs,
    calculateROI,
    clearHistory,
    loadFromHistory,
    addWhatIfVariation,
    runWhatIfAnalysis,
    clearWhatIf,
    exportToPDF,
    exportToExcel,
    sendByEmail,
    reset,
    canProceed,
  }

  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  )
}

export function useCalculator() {
  const context = useContext(CalculatorContext)
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider')
  }
  return context
}