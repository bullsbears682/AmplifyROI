'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  rtl?: boolean
}

interface I18nContextType {
  language: string
  setLanguage: (language: string) => void
  languages: Language[]
  isRTL: boolean
  t: (key: string, params?: Record<string, string | number>) => string
  formatNumber: (value: number) => string
  formatCurrency: (value: number, currency: string) => string
  formatDate: (date: Date) => string
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', rtl: true },
]

// Basic translations (in a real app, these would be loaded from translation files)
const translations: Record<string, Record<string, string>> = {
  en: {
    'nav.home': 'Home',
    'nav.calculator': 'Calculator',
    'nav.scenarios': 'Scenarios',
    'nav.pricing': 'Pricing',
    'nav.docs': 'Docs',
    'hero.title': 'Calculate ROI for {businessTypes}+ Business Types Across {countries}+ Countries',
    'hero.subtitle': 'Get accurate ROI calculations with real-time 2025 tax rates, comprehensive financial projections, and professional reports. No signup required, completely free forever.',
    'button.start': 'Start Calculating ROI',
    'button.browse': 'Browse Scenarios',
    'footer.rights': 'All rights reserved',
    'footer.made_with': 'Made with',
    'footer.for_better': 'for better business decisions',
  },
  es: {
    'nav.home': 'Inicio',
    'nav.calculator': 'Calculadora',
    'nav.scenarios': 'Escenarios',
    'nav.pricing': 'Precios',
    'nav.docs': 'Documentos',
    'hero.title': 'Calcule el ROI para {businessTypes}+ Tipos de Negocio en {countries}+ Países',
    'hero.subtitle': 'Obtenga cálculos precisos de ROI con tasas impositivas en tiempo real de 2025, proyecciones financieras integrales e informes profesionales. No se requiere registro, completamente gratis para siempre.',
    'button.start': 'Comenzar a Calcular ROI',
    'button.browse': 'Explorar Escenarios',
    'footer.rights': 'Todos los derechos reservados',
    'footer.made_with': 'Hecho con',
    'footer.for_better': 'para mejores decisiones comerciales',
  },
  fr: {
    'nav.home': 'Accueil',
    'nav.calculator': 'Calculatrice',
    'nav.scenarios': 'Scénarios',
    'nav.pricing': 'Tarification',
    'nav.docs': 'Docs',
    'hero.title': 'Calculez le ROI pour {businessTypes}+ Types d\'Entreprises dans {countries}+ Pays',
    'hero.subtitle': 'Obtenez des calculs de ROI précis avec les taux d\'imposition en temps réel de 2025, des projections financières complètes et des rapports professionnels. Aucune inscription requise, entièrement gratuit pour toujours.',
    'button.start': 'Commencer à Calculer le ROI',
    'button.browse': 'Parcourir les Scénarios',
    'footer.rights': 'Tous droits réservés',
    'footer.made_with': 'Fait avec',
    'footer.for_better': 'pour de meilleures décisions commerciales',
  },
  de: {
    'nav.home': 'Startseite',
    'nav.calculator': 'Rechner',
    'nav.scenarios': 'Szenarien',
    'nav.pricing': 'Preise',
    'nav.docs': 'Dokumentation',
    'hero.title': 'ROI für {businessTypes}+ Geschäftstypen in {countries}+ Ländern berechnen',
    'hero.subtitle': 'Erhalten Sie genaue ROI-Berechnungen mit Echtzeit-Steuersätzen für 2025, umfassenden Finanzprognosen und professionellen Berichten. Keine Anmeldung erforderlich, für immer völlig kostenlos.',
    'button.start': 'ROI-Berechnung starten',
    'button.browse': 'Szenarien durchsuchen',
    'footer.rights': 'Alle Rechte vorbehalten',
    'footer.made_with': 'Gemacht mit',
    'footer.for_better': 'für bessere Geschäftsentscheidungen',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.calculator': '計算機',
    'nav.scenarios': 'シナリオ',
    'nav.pricing': '料金',
    'nav.docs': 'ドキュメント',
    'hero.title': '{countries}+ヶ国の{businessTypes}+種類のビジネスタイプでROIを計算',
    'hero.subtitle': '2025年のリアルタイム税率、包括的な財務予測、プロフェッショナルなレポートで正確なROI計算を取得。登録不要、永続的に完全無料。',
    'button.start': 'ROI計算を開始',
    'button.browse': 'シナリオを閲覧',
    'footer.rights': '全著作権所有',
    'footer.made_with': '作成者',
    'footer.for_better': 'より良いビジネス決定のために',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.calculator': 'حاسبة',
    'nav.scenarios': 'السيناريوهات',
    'nav.pricing': 'التسعير',
    'nav.docs': 'الوثائق',
    'hero.title': 'احسب عائد الاستثمار لـ {businessTypes}+ نوع عمل عبر {countries}+ دولة',
    'hero.subtitle': 'احصل على حسابات دقيقة لعائد الاستثمار مع معدلات الضرائب في الوقت الفعلي لعام 2025، والتوقعات المالية الشاملة، والتقارير المهنية. لا حاجة للتسجيل، مجاني تماماً إلى الأبد.',
    'button.start': 'ابدأ حساب عائد الاستثمار',
    'button.browse': 'تصفح السيناريوهات',
    'footer.rights': 'جميع الحقوق محفوظة',
    'footer.made_with': 'صنع بـ',
    'footer.for_better': 'لقرارات تجارية أفضل',
  },
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

interface I18nProviderProps {
  children: ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [language, setLanguageState] = useState('en')

  // Load language from localStorage or browser
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const storedLanguage = localStorage.getItem('amplifyroi-language')
      if (storedLanguage && languages.find(lang => lang.code === storedLanguage)) {
        setLanguageState(storedLanguage)
      } else {
        // Detect browser language
        const browserLanguage = navigator.language.split('-')[0]
        if (languages.find(lang => lang.code === browserLanguage)) {
          setLanguageState(browserLanguage)
        }
      }
    } catch (error) {
      console.warn('Failed to load language preference:', error)
    }
  }, [])

  // Save language to localStorage
  const setLanguage = (newLanguage: string) => {
    if (languages.find(lang => lang.code === newLanguage)) {
      setLanguageState(newLanguage)
      try {
        localStorage.setItem('amplifyroi-language', newLanguage)
      } catch (error) {
        console.warn('Failed to save language preference:', error)
      }
    }
  }

  // Translation function
  const t = (key: string, params?: Record<string, string | number>): string => {
    const translation = translations[language]?.[key] || translations.en[key] || key
    
    if (!params) return translation

    // Replace parameters in translation
    return Object.entries(params).reduce((text, [param, value]) => {
      return text.replace(new RegExp(`{${param}}`, 'g'), String(value))
    }, translation)
  }

  // Get current language info
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0]
  const isRTL = currentLanguage.rtl || false

  // Formatting functions using Intl API
  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat(language).format(value)
  }

  const formatCurrency = (value: number, currency: string): string => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency,
    }).format(value)
  }

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat(language, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  }

  // Apply RTL class to document
  useEffect(() => {
    if (typeof document === 'undefined') return

    if (isRTL) {
      document.documentElement.dir = 'rtl'
      document.documentElement.classList.add('rtl')
    } else {
      document.documentElement.dir = 'ltr'
      document.documentElement.classList.remove('rtl')
    }
  }, [isRTL])

  const contextValue: I18nContextType = {
    language,
    setLanguage,
    languages,
    isRTL,
    t,
    formatNumber,
    formatCurrency,
    formatDate,
  }

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}