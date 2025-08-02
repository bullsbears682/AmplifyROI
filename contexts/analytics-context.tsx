'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { useAnalytics } from '@/hooks/use-analytics'

interface AnalyticsContextType {
  // Analytics functions from hook
  trackEvent: (eventName: string, properties?: Record<string, any>) => void
  trackPageView: (page: string, title?: string) => void
  trackFormEvent: (formName: string, action: 'start' | 'complete' | 'error', data?: Record<string, any>) => void
  trackButtonClick: (buttonName: string, location?: string) => void
  trackConversion: (type: string, value?: number, currency?: string) => void
  trackError: (error: string, context?: Record<string, any>) => void
  trackPerformance: (metric: string, value: number, unit?: string) => void
  trackEngagement: (action: string, duration?: number) => void
  
  // Session data
  sessionData: any
  userId: string
  
  // Consent management
  hasConsent: boolean
  setConsent: (consent: boolean) => void
  
  // Privacy mode
  isPrivacyMode: boolean
  togglePrivacyMode: () => void
}

interface AnalyticsState {
  hasConsent: boolean
  isPrivacyMode: boolean
  consentTimestamp: number | null
}

type AnalyticsAction =
  | { type: 'SET_CONSENT'; payload: boolean }
  | { type: 'TOGGLE_PRIVACY_MODE' }
  | { type: 'LOAD_CONSENT'; payload: AnalyticsState }

const initialState: AnalyticsState = {
  hasConsent: false,
  isPrivacyMode: false,
  consentTimestamp: null,
}

function analyticsReducer(state: AnalyticsState, action: AnalyticsAction): AnalyticsState {
  switch (action.type) {
    case 'SET_CONSENT':
      return {
        ...state,
        hasConsent: action.payload,
        consentTimestamp: action.payload ? Date.now() : null,
      }
    case 'TOGGLE_PRIVACY_MODE':
      return {
        ...state,
        isPrivacyMode: !state.isPrivacyMode,
      }
    case 'LOAD_CONSENT':
      return action.payload
    default:
      return state
  }
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined)

interface AnalyticsProviderProps {
  children: ReactNode
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [state, dispatch] = useReducer(analyticsReducer, initialState)
  const analytics = useAnalytics()

  // Load consent from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const storedConsent = localStorage.getItem('amplifyroi-analytics-consent')
      if (storedConsent) {
        const consentData = JSON.parse(storedConsent)
        dispatch({ type: 'LOAD_CONSENT', payload: consentData })
      }
    } catch (error) {
      console.warn('Failed to load analytics consent:', error)
    }
  }, [])

  // Persist consent to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem('amplifyroi-analytics-consent', JSON.stringify(state))
    } catch (error) {
      console.warn('Failed to save analytics consent:', error)
    }
  }, [state])

  // Set consent
  const setConsent = (consent: boolean) => {
    dispatch({ type: 'SET_CONSENT', payload: consent })
  }

  // Toggle privacy mode
  const togglePrivacyMode = () => {
    dispatch({ type: 'TOGGLE_PRIVACY_MODE' })
  }

  // Wrapper functions that respect consent and privacy settings
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (!state.hasConsent || state.isPrivacyMode) return
    analytics.trackEvent(eventName, properties)
  }

  const trackPageView = (page: string, title?: string) => {
    if (!state.hasConsent || state.isPrivacyMode) return
    analytics.trackPageView(page, title)
  }

  const trackFormEvent = (formName: string, action: 'start' | 'complete' | 'error', data?: Record<string, any>) => {
    if (!state.hasConsent || state.isPrivacyMode) return
    analytics.trackFormEvent(formName, action, data)
  }

  const trackButtonClick = (buttonName: string, location?: string) => {
    if (!state.hasConsent || state.isPrivacyMode) return
    analytics.trackButtonClick(buttonName, location)
  }

  const trackConversion = (type: string, value?: number, currency?: string) => {
    if (!state.hasConsent || state.isPrivacyMode) return
    analytics.trackConversion(type, value, currency)
  }

  const trackError = (error: string, context?: Record<string, any>) => {
    // Always track errors for debugging, but anonymize in privacy mode
    const errorContext = state.isPrivacyMode ? undefined : context
    analytics.trackError(error, errorContext)
  }

  const trackPerformance = (metric: string, value: number, unit?: string) => {
    if (!state.hasConsent || state.isPrivacyMode) return
    analytics.trackPerformance(metric, value, unit)
  }

  const trackEngagement = (action: string, duration?: number) => {
    if (!state.hasConsent || state.isPrivacyMode) return
    analytics.trackEngagement(action, duration)
  }

  const contextValue: AnalyticsContextType = {
    // Tracking functions
    trackEvent,
    trackPageView,
    trackFormEvent,
    trackButtonClick,
    trackConversion,
    trackError,
    trackPerformance,
    trackEngagement,
    
    // Session data (only if consent given)
    sessionData: state.hasConsent && !state.isPrivacyMode ? analytics.sessionData : null,
    userId: state.hasConsent && !state.isPrivacyMode ? analytics.userId : '',
    
    // Consent management
    hasConsent: state.hasConsent,
    setConsent,
    
    // Privacy mode
    isPrivacyMode: state.isPrivacyMode,
    togglePrivacyMode,
  }

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export function useAnalyticsContext() {
  const context = useContext(AnalyticsContext)
  if (context === undefined) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider')
  }
  return context
}