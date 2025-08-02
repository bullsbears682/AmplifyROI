'use client'

import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CalculatorProvider } from '@/contexts/calculator-context'
import { AnalyticsProvider } from '@/contexts/analytics-context'
import { I18nProvider } from '@/contexts/i18n-context'
import { ErrorBoundary } from '@/components/error-boundary'
import { useState } from 'react'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            cacheTime: 10 * 60 * 1000, // 10 minutes
            retry: (failureCount, error: any) => {
              // Don't retry on 4xx errors
              if (error?.response?.status >= 400 && error?.response?.status < 500) {
                return false
              }
              return failureCount < 3
            },
            refetchOnWindowFocus: false,
            refetchOnMount: true,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  )

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
          themes={['light', 'dark', 'system']}
          storageKey="amplifyroi-theme"
        >
          <I18nProvider>
            <AnalyticsProvider>
              <CalculatorProvider>
                {children}
                <ReactQueryDevtools 
                  initialIsOpen={false} 
                  buttonPosition="bottom-left"
                />
              </CalculatorProvider>
            </AnalyticsProvider>
          </I18nProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}