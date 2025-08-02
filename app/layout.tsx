import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Toaster } from 'react-hot-toast'
// import { Analytics } from '@vercel/analytics/react'
// import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Using Inter for all text for now
// const calSans = Cal_Sans({ 
//   subsets: ['latin'],
//   variable: '--font-cal-sans',
//   display: 'swap',
// })

export const metadata: Metadata = {
  title: {
    default: 'AmplifyROI - Professional ROI Calculator',
    template: '%s | AmplifyROI'
  },
  description: 'Calculate ROI for 35+ business types across 25+ countries with real-time tax data and comprehensive financial projections. Free, no signup required.',
  keywords: [
    'ROI calculator',
    'return on investment',
    'business calculator',
    'financial projections',
    'startup ROI',
    'SaaS metrics',
    'e-commerce ROI',
    'tax calculator',
    'business planning',
    'investment analysis'
  ],
  authors: [{ name: 'AmplifyROI Team' }],
  creator: 'AmplifyROI',
  publisher: 'AmplifyROI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://amplifyroi.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'AmplifyROI - Professional ROI Calculator',
    description: 'Calculate ROI for 35+ business types across 25+ countries with real-time tax data and comprehensive financial projections.',
    siteName: 'AmplifyROI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AmplifyROI - Professional ROI Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AmplifyROI - Professional ROI Calculator',
    description: 'Calculate ROI for 35+ business types across 25+ countries with real-time tax data.',
    images: ['/og-image.png'],
    creator: '@amplifyroi',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
  category: 'business',
  classification: 'Business Tools',
  referrer: 'origin-when-cross-origin',
  generator: 'Next.js',
  applicationName: 'AmplifyROI',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'AmplifyROI',
  },
  other: {
    'msapplication-TileColor': '#0ea5e9',
    'theme-color': '#0ea5e9',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light dark" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0c1117" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "AmplifyROI",
              "description": "Professional ROI Calculator for businesses",
              "url": "https://amplifyroi.com",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Any",
              "browserRequirements": "Modern browser with JavaScript enabled",
              "softwareVersion": "1.0.0",
              "author": {
                "@type": "Organization",
                "name": "AmplifyROI",
                "url": "https://amplifyroi.com"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "category": "Free"
              },
              "featureList": [
                "ROI calculation for 35+ business types",
                "Support for 25+ countries with real tax data",
                "Comprehensive financial projections",
                "PDF export functionality",
                "Email report delivery",
                "No registration required"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950`}>
        <Providers>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-100 transition-all duration-200"
          >
            Skip to main content
          </a>
          
          {/* Main content wrapper */}
          <div id="main-content" className="relative min-h-screen">
            {children}
          </div>
          
          {/* Global toast notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#1f2937',
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
              loading: {
                iconTheme: {
                  primary: '#0ea5e9',
                  secondary: '#ffffff',
                },
              },
            }}
          />
          
          {/* Performance monitoring */}
          {/* <Analytics /> */}
                      {/* <SpeedInsights /> */}
        </Providers>
        
        {/* Service worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}