'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
  eventId?: string
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorFallbackProps {
  error: Error
  resetError: () => void
  eventId?: string
}

function DefaultErrorFallback({ error, resetError, eventId }: ErrorFallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  const handleReportError = () => {
    // In a real app, this would send the error to your error reporting service
    const errorData = {
      message: error.message,
      stack: error.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
      eventId,
    }

    console.error('Error reported:', errorData)
    
    // Copy error details to clipboard for easy reporting
    navigator.clipboard?.writeText(JSON.stringify(errorData, null, 2))
      .then(() => {
        alert('Error details copied to clipboard!')
      })
      .catch(() => {
        // Fallback for browsers that don't support clipboard API
        const textarea = document.createElement('textarea')
        textarea.value = JSON.stringify(errorData, null, 2)
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        alert('Error details copied to clipboard!')
      })
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl text-red-600 dark:text-red-400">
            Oops! Something went wrong
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300 text-center">
            We're sorry, but something unexpected happened. Don't worry, this has been reported 
            and our team will look into it.
          </p>

          {eventId && (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Error ID: <code className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">{eventId}</code>
              </p>
            </div>
          )}

          {isDevelopment && (
            <details className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <summary className="cursor-pointer font-medium text-red-800 dark:text-red-200 mb-2">
                Development Error Details
              </summary>
              <div className="mt-2 space-y-2">
                <div>
                  <strong className="text-red-700 dark:text-red-300">Error:</strong>
                  <pre className="mt-1 text-sm bg-white dark:bg-gray-900 p-2 rounded border overflow-auto">
                    {error.message}
                  </pre>
                </div>
                {error.stack && (
                  <div>
                    <strong className="text-red-700 dark:text-red-300">Stack Trace:</strong>
                    <pre className="mt-1 text-xs bg-white dark:bg-gray-900 p-2 rounded border overflow-auto max-h-40">
                      {error.stack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}

          <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
              What you can do:
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Try refreshing the page</li>
              <li>• Go back to the homepage</li>
              <li>• Clear your browser cache</li>
              <li>• Try again in a few minutes</li>
              <li>• Report this error if it persists</li>
            </ul>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={resetError} 
            className="flex-1"
            variant="default"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          
          <Button 
            onClick={handleGoHome} 
            variant="outline"
            className="flex-1"
          >
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
          
          <Button 
            onClick={handleReportError} 
            variant="ghost"
            size="sm"
            className="sm:flex-none"
          >
            <Bug className="w-4 h-4 mr-2" />
            Report Error
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private resetTimeoutId: number | null = null

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Generate a unique error ID
    const eventId = `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    this.setState({
      errorInfo,
      eventId,
    })

    // Call the onError callback if provided
    this.props.onError?.(error, errorInfo)

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error)
      console.error('Error info:', errorInfo)
    }

    // In production, you would send this to your error reporting service
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: undefined,
    })
  }

  componentWillUnmount() {
    if (this.resetTimeoutId) {
      window.clearTimeout(this.resetTimeoutId)
    }
  }

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          eventId={this.state.eventId}
        />
      )
    }

    return this.props.children
  }
}

// Hook for using error boundary in functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: React.ErrorInfo) => {
    // In a real app, you would throw the error to be caught by the nearest error boundary
    // For now, we'll just log it
    console.error('Error handled by hook:', error)
    if (errorInfo) {
      console.error('Error info:', errorInfo)
    }
    
    // You could also show a toast notification
    // toast.error(`An error occurred: ${error.message}`)
  }
}

// Higher-order component for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<ErrorBoundaryProps, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}