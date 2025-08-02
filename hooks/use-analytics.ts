import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './use-local-storage'
import { generateUUID, getBrowserInfo, getDeviceType } from '@/lib/utils'

interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp?: number
  sessionId?: string
  userId?: string
}

interface SessionData {
  sessionId: string
  startTime: number
  userId: string
  events: AnalyticsEvent[]
  device: string
  browser: string
  userAgent: string
  language: string
  platform: string
}

export function useAnalytics() {
  const [sessionData, setSessionData] = useLocalStorage<SessionData | null>('amplifyroi-session', null)
  const [userId, setUserId] = useLocalStorage<string>('amplifyroi-user-id', '')

  // Initialize session
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Generate or retrieve user ID
    if (!userId) {
      const newUserId = generateUUID()
      setUserId(newUserId)
    }

    // Initialize session if not exists or expired (24 hours)
    const now = Date.now()
    const sessionExpiry = 24 * 60 * 60 * 1000 // 24 hours
    
    if (!sessionData || (now - sessionData.startTime) > sessionExpiry) {
      const browserInfo = getBrowserInfo()
      const newSession: SessionData = {
        sessionId: generateUUID(),
        startTime: now,
        userId: userId || generateUUID(),
        events: [],
        device: getDeviceType(),
        browser: browserInfo.browser,
        userAgent: browserInfo.userAgent,
        language: browserInfo.language,
        platform: browserInfo.platform,
      }
      setSessionData(newSession)
    }
  }, [userId, sessionData, setUserId, setSessionData])

  // Track page view
  const trackPageView = useCallback((page: string, title?: string) => {
    if (!sessionData) return

    const event: AnalyticsEvent = {
      event: 'page_view',
      properties: {
        page,
        title: title || document.title,
        url: window.location.href,
        referrer: document.referrer,
      },
      timestamp: Date.now(),
      sessionId: sessionData.sessionId,
      userId: sessionData.userId,
    }

    setSessionData({
      ...sessionData,
      events: [...sessionData.events, event],
    })

    // Send to analytics API (optional)
    sendAnalyticsEvent(event)
  }, [sessionData, setSessionData])

  // Track custom event
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (!sessionData) return

    const event: AnalyticsEvent = {
      event: eventName,
      properties: {
        ...properties,
        url: window.location.href,
        timestamp: Date.now(),
      },
      timestamp: Date.now(),
      sessionId: sessionData.sessionId,
      userId: sessionData.userId,
    }

    setSessionData({
      ...sessionData,
      events: [...sessionData.events, event],
    })

    // Send to analytics API (optional)
    sendAnalyticsEvent(event)
  }, [sessionData, setSessionData])

  // Track form interaction
  const trackFormEvent = useCallback((formName: string, action: 'start' | 'complete' | 'error', data?: Record<string, any>) => {
    trackEvent(`form_${action}`, {
      form_name: formName,
      ...data,
    })
  }, [trackEvent])

  // Track button click
  const trackButtonClick = useCallback((buttonName: string, location?: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      location,
    })
  }, [trackEvent])

  // Track conversion event
  const trackConversion = useCallback((type: string, value?: number, currency?: string) => {
    trackEvent('conversion', {
      conversion_type: type,
      value,
      currency,
    })
  }, [trackEvent])

  // Track error
  const trackError = useCallback((error: string, context?: Record<string, any>) => {
    trackEvent('error', {
      error_message: error,
      error_context: context,
    })
  }, [trackEvent])

  // Track performance metric
  const trackPerformance = useCallback((metric: string, value: number, unit?: string) => {
    trackEvent('performance', {
      metric_name: metric,
      metric_value: value,
      metric_unit: unit,
    })
  }, [trackEvent])

  // Track user engagement
  const trackEngagement = useCallback((action: string, duration?: number) => {
    trackEvent('engagement', {
      action,
      duration_ms: duration,
    })
  }, [trackEvent])

  // Get session analytics
  const getSessionAnalytics = useCallback(() => {
    if (!sessionData) return null

    const events = sessionData.events
    const sessionDuration = Date.now() - sessionData.startTime
    const pageViews = events.filter(e => e.event === 'page_view').length
    const interactions = events.filter(e => e.event !== 'page_view').length

    return {
      sessionId: sessionData.sessionId,
      userId: sessionData.userId,
      sessionDuration,
      pageViews,
      interactions,
      totalEvents: events.length,
      device: sessionData.device,
      browser: sessionData.browser,
      language: sessionData.language,
      platform: sessionData.platform,
      events: events.slice(-50), // Last 50 events
    }
  }, [sessionData])

  // Send analytics event to API
  const sendAnalyticsEvent = async (event: AnalyticsEvent) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Analytics Event:', event)
      return
    }

    try {
      // Only send to API in production and if user hasn't opted out
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
      })

      if (!response.ok) {
        console.warn('Failed to send analytics event')
      }
    } catch (error) {
      console.warn('Analytics tracking failed:', error)
    }
  }

  // Clear session data
  const clearSession = useCallback(() => {
    setSessionData(null)
  }, [setSessionData])

  // Export session data
  const exportSessionData = useCallback(() => {
    if (!sessionData) return null

    const analytics = getSessionAnalytics()
    const blob = new Blob([JSON.stringify(analytics, null, 2)], {
      type: 'application/json',
    })
    
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `amplifyroi-session-${sessionData.sessionId}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }, [sessionData, getSessionAnalytics])

  // Auto-track page views
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleRouteChange = () => {
      trackPageView(window.location.pathname)
    }

    // Track initial page view
    trackPageView(window.location.pathname)

    // Listen for route changes (for SPA)
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [trackPageView])

  // Auto-track performance metrics
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Track Core Web Vitals
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          const navEntry = entry as PerformanceNavigationTiming
          trackPerformance('page_load_time', navEntry.loadEventEnd - navEntry.loadEventStart, 'ms')
          trackPerformance('dom_content_loaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart, 'ms')
        }
      }
    })

    try {
      observer.observe({ entryTypes: ['navigation'] })
    } catch (error) {
      // Browser doesn't support Performance Observer
    }

    return () => {
      observer.disconnect()
    }
  }, [trackPerformance])

  return {
    // Core tracking functions
    trackEvent,
    trackPageView,
    trackFormEvent,
    trackButtonClick,
    trackConversion,
    trackError,
    trackPerformance,
    trackEngagement,
    
    // Session management
    getSessionAnalytics,
    clearSession,
    exportSessionData,
    
    // Session data
    sessionData,
    userId,
  }
}