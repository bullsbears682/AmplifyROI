export interface CountryData {
  code: string;
  name: string;
  flag: string;
  currency: {
    code: string;
    symbol: string;
    name: string;
  };
  taxRates: {
    corporate: number; // percentage
    vat: number; // percentage
    personalIncome: {
      min: number;
      max: number;
    };
    capitalGains: number;
    payrollTax: number;
  };
  financialYear: {
    start: string; // MM-DD format
    end: string; // MM-DD format
  };
  businessRegistration: {
    timeframe: string;
    averageCost: number; // in local currency
  };
  economicIndicators: {
    inflation: number; // 2025 projection
    gdpGrowth: number; // 2025 projection
    businessEase: number; // World Bank ranking
  };
}

export const countries: CountryData[] = [
  {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    currency: {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar'
    },
    taxRates: {
      corporate: 21,
      vat: 0, // No federal VAT, state sales tax varies
      personalIncome: { min: 10, max: 37 },
      capitalGains: 20,
      payrollTax: 15.3
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '1-2 weeks',
      averageCost: 500
    },
    economicIndicators: {
      inflation: 2.4,
      gdpGrowth: 2.8,
      businessEase: 6
    }
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: {
      code: 'GBP',
      symbol: '£',
      name: 'British Pound'
    },
    taxRates: {
      corporate: 25,
      vat: 20,
      personalIncome: { min: 20, max: 45 },
      capitalGains: 20,
      payrollTax: 13.8
    },
    financialYear: {
      start: '04-06',
      end: '04-05'
    },
    businessRegistration: {
      timeframe: '1-3 days',
      averageCost: 12
    },
    economicIndicators: {
      inflation: 2.1,
      gdpGrowth: 1.9,
      businessEase: 8
    }
  },
  {
    code: 'CA',
    name: 'Canada',
    flag: '🇨🇦',
    currency: {
      code: 'CAD',
      symbol: 'C$',
      name: 'Canadian Dollar'
    },
    taxRates: {
      corporate: 26.5,
      vat: 13, // HST varies by province
      personalIncome: { min: 15, max: 33 },
      capitalGains: 16.5,
      payrollTax: 9.9
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '2-5 days',
      averageCost: 350
    },
    economicIndicators: {
      inflation: 2.2,
      gdpGrowth: 2.3,
      businessEase: 23
    }
  },
  {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    currency: {
      code: 'AUD',
      symbol: 'A$',
      name: 'Australian Dollar'
    },
    taxRates: {
      corporate: 30,
      vat: 10, // GST
      personalIncome: { min: 19, max: 45 },
      capitalGains: 22.5,
      payrollTax: 9.5
    },
    financialYear: {
      start: '07-01',
      end: '06-30'
    },
    businessRegistration: {
      timeframe: '1-2 days',
      averageCost: 600
    },
    economicIndicators: {
      inflation: 2.8,
      gdpGrowth: 2.5,
      businessEase: 14
    }
  },
  {
    code: 'DE',
    name: 'Germany',
    flag: '🇩🇪',
    currency: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro'
    },
    taxRates: {
      corporate: 29.8,
      vat: 19,
      personalIncome: { min: 14, max: 45 },
      capitalGains: 26.4,
      payrollTax: 20.3
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '2-4 weeks',
      averageCost: 800
    },
    economicIndicators: {
      inflation: 2.3,
      gdpGrowth: 1.4,
      businessEase: 22
    }
  },
  {
    code: 'FR',
    name: 'France',
    flag: '🇫🇷',
    currency: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro'
    },
    taxRates: {
      corporate: 25,
      vat: 20,
      personalIncome: { min: 11, max: 45 },
      capitalGains: 30,
      payrollTax: 45
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '1-2 weeks',
      averageCost: 250
    },
    economicIndicators: {
      inflation: 2.1,
      gdpGrowth: 1.3,
      businessEase: 32
    }
  },
  {
    code: 'JP',
    name: 'Japan',
    flag: '🇯🇵',
    currency: {
      code: 'JPY',
      symbol: '¥',
      name: 'Japanese Yen'
    },
    taxRates: {
      corporate: 29.7,
      vat: 10,
      personalIncome: { min: 5, max: 45 },
      capitalGains: 20,
      payrollTax: 15.4
    },
    financialYear: {
      start: '04-01',
      end: '03-31'
    },
    businessRegistration: {
      timeframe: '2-3 weeks',
      averageCost: 150000
    },
    economicIndicators: {
      inflation: 1.8,
      gdpGrowth: 1.2,
      businessEase: 29
    }
  },
  {
    code: 'SG',
    name: 'Singapore',
    flag: '🇸🇬',
    currency: {
      code: 'SGD',
      symbol: 'S$',
      name: 'Singapore Dollar'
    },
    taxRates: {
      corporate: 17,
      vat: 9, // GST
      personalIncome: { min: 0, max: 22 },
      capitalGains: 0,
      payrollTax: 20
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '1-2 days',
      averageCost: 300
    },
    economicIndicators: {
      inflation: 2.5,
      gdpGrowth: 3.2,
      businessEase: 2
    }
  },
  {
    code: 'NL',
    name: 'Netherlands',
    flag: '🇳🇱',
    currency: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro'
    },
    taxRates: {
      corporate: 25.8,
      vat: 21,
      personalIncome: { min: 9, max: 49.5 },
      capitalGains: 31,
      payrollTax: 28
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '1-2 weeks',
      averageCost: 400
    },
    economicIndicators: {
      inflation: 2.2,
      gdpGrowth: 2.1,
      businessEase: 42
    }
  },
  {
    code: 'CH',
    name: 'Switzerland',
    flag: '🇨🇭',
    currency: {
      code: 'CHF',
      symbol: 'CHF',
      name: 'Swiss Franc'
    },
    taxRates: {
      corporate: 14.9,
      vat: 8.1,
      personalIncome: { min: 0, max: 40 },
      capitalGains: 0,
      payrollTax: 11.2
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '2-3 weeks',
      averageCost: 1200
    },
    economicIndicators: {
      inflation: 1.2,
      gdpGrowth: 1.8,
      businessEase: 36
    }
  },
  {
    code: 'SE',
    name: 'Sweden',
    flag: '🇸🇪',
    currency: {
      code: 'SEK',
      symbol: 'kr',
      name: 'Swedish Krona'
    },
    taxRates: {
      corporate: 20.6,
      vat: 25,
      personalIncome: { min: 0, max: 52 },
      capitalGains: 30,
      payrollTax: 31.4
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '1-2 weeks',
      averageCost: 500
    },
    economicIndicators: {
      inflation: 2.0,
      gdpGrowth: 2.1,
      businessEase: 10
    }
  },
  {
    code: 'NO',
    name: 'Norway',
    flag: '🇳🇴',
    currency: {
      code: 'NOK',
      symbol: 'kr',
      name: 'Norwegian Krone'
    },
    taxRates: {
      corporate: 22,
      vat: 25,
      personalIncome: { min: 0, max: 47.4 },
      capitalGains: 22,
      payrollTax: 14.1
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '1-2 weeks',
      averageCost: 1000
    },
    economicIndicators: {
      inflation: 3.1,
      gdpGrowth: 1.9,
      businessEase: 9
    }
  },
  {
    code: 'DK',
    name: 'Denmark',
    flag: '🇩🇰',
    currency: {
      code: 'DKK',
      symbol: 'kr',
      name: 'Danish Krone'
    },
    taxRates: {
      corporate: 22,
      vat: 25,
      personalIncome: { min: 8, max: 55.9 },
      capitalGains: 27,
      payrollTax: 8
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '1-2 days',
      averageCost: 700
    },
    economicIndicators: {
      inflation: 1.8,
      gdpGrowth: 2.0,
      businessEase: 4
    }
  },
  {
    code: 'NZ',
    name: 'New Zealand',
    flag: '🇳🇿',
    currency: {
      code: 'NZD',
      symbol: 'NZ$',
      name: 'New Zealand Dollar'
    },
    taxRates: {
      corporate: 28,
      vat: 15, // GST
      personalIncome: { min: 10.5, max: 39 },
      capitalGains: 0,
      payrollTax: 0
    },
    financialYear: {
      start: '04-01',
      end: '03-31'
    },
    businessRegistration: {
      timeframe: '1-2 days',
      averageCost: 150
    },
    economicIndicators: {
      inflation: 2.3,
      gdpGrowth: 2.4,
      businessEase: 1
    }
  },
  {
    code: 'IE',
    name: 'Ireland',
    flag: '🇮🇪',
    currency: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro'
    },
    taxRates: {
      corporate: 12.5,
      vat: 23,
      personalIncome: { min: 20, max: 40 },
      capitalGains: 33,
      payrollTax: 11.05
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '1-2 weeks',
      averageCost: 100
    },
    economicIndicators: {
      inflation: 2.4,
      gdpGrowth: 4.1,
      businessEase: 24
    }
  },
  {
    code: 'FI',
    name: 'Finland',
    flag: '🇫🇮',
    currency: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro'
    },
    taxRates: {
      corporate: 20,
      vat: 24,
      personalIncome: { min: 6, max: 31.25 },
      capitalGains: 30,
      payrollTax: 25.2
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '1-2 weeks',
      averageCost: 380
    },
    economicIndicators: {
      inflation: 2.0,
      gdpGrowth: 1.8,
      businessEase: 20
    }
  },
  {
    code: 'BE',
    name: 'Belgium',
    flag: '🇧🇪',
    currency: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro'
    },
    taxRates: {
      corporate: 25,
      vat: 21,
      personalIncome: { min: 25, max: 50 },
      capitalGains: 0,
      payrollTax: 35
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '2-4 weeks',
      averageCost: 1500
    },
    economicIndicators: {
      inflation: 2.1,
      gdpGrowth: 1.5,
      businessEase: 45
    }
  },
  {
    code: 'AT',
    name: 'Austria',
    flag: '🇦🇹',
    currency: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro'
    },
    taxRates: {
      corporate: 23,
      vat: 20,
      personalIncome: { min: 0, max: 55 },
      capitalGains: 27.5,
      payrollTax: 22.8
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '2-3 weeks',
      averageCost: 600
    },
    economicIndicators: {
      inflation: 2.2,
      gdpGrowth: 1.6,
      businessEase: 26
    }
  },
  {
    code: 'IT',
    name: 'Italy',
    flag: '🇮🇹',
    currency: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro'
    },
    taxRates: {
      corporate: 27.8,
      vat: 22,
      personalIncome: { min: 23, max: 43 },
      capitalGains: 26,
      payrollTax: 33
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '2-6 weeks',
      averageCost: 2000
    },
    economicIndicators: {
      inflation: 1.9,
      gdpGrowth: 0.9,
      businessEase: 58
    }
  },
  {
    code: 'ES',
    name: 'Spain',
    flag: '🇪🇸',
    currency: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro'
    },
    taxRates: {
      corporate: 25,
      vat: 21,
      personalIncome: { min: 19, max: 47 },
      capitalGains: 23,
      payrollTax: 29.9
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '2-4 weeks',
      averageCost: 800
    },
    economicIndicators: {
      inflation: 2.3,
      gdpGrowth: 2.1,
      businessEase: 30
    }
  },
  {
    code: 'BR',
    name: 'Brazil',
    flag: '🇧🇷',
    currency: {
      code: 'BRL',
      symbol: 'R$',
      name: 'Brazilian Real'
    },
    taxRates: {
      corporate: 34,
      vat: 19, // ICMS varies by state
      personalIncome: { min: 0, max: 27.5 },
      capitalGains: 15,
      payrollTax: 30
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '2-8 weeks',
      averageCost: 2000
    },
    economicIndicators: {
      inflation: 4.2,
      gdpGrowth: 2.6,
      businessEase: 124
    }
  },
  {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    currency: {
      code: 'INR',
      symbol: '₹',
      name: 'Indian Rupee'
    },
    taxRates: {
      corporate: 30,
      vat: 18, // GST
      personalIncome: { min: 5, max: 30 },
      capitalGains: 20,
      payrollTax: 12
    },
    financialYear: {
      start: '04-01',
      end: '03-31'
    },
    businessRegistration: {
      timeframe: '2-4 weeks',
      averageCost: 15000
    },
    economicIndicators: {
      inflation: 4.1,
      gdpGrowth: 6.8,
      businessEase: 63
    }
  },
  {
    code: 'MX',
    name: 'Mexico',
    flag: '🇲🇽',
    currency: {
      code: 'MXN',
      symbol: '$',
      name: 'Mexican Peso'
    },
    taxRates: {
      corporate: 30,
      vat: 16, // IVA
      personalIncome: { min: 1.92, max: 35 },
      capitalGains: 10,
      payrollTax: 25
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '2-6 weeks',
      averageCost: 8000
    },
    economicIndicators: {
      inflation: 3.8,
      gdpGrowth: 2.4,
      businessEase: 60
    }
  },
  {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    currency: {
      code: 'ZAR',
      symbol: 'R',
      name: 'South African Rand'
    },
    taxRates: {
      corporate: 27,
      vat: 15,
      personalIncome: { min: 18, max: 45 },
      capitalGains: 22.4,
      payrollTax: 2
    },
    financialYear: {
      start: '03-01',
      end: '02-28'
    },
    businessRegistration: {
      timeframe: '3-6 weeks',
      averageCost: 2500
    },
    economicIndicators: {
      inflation: 4.5,
      gdpGrowth: 1.8,
      businessEase: 84
    }
  },
  {
    code: 'KR',
    name: 'South Korea',
    flag: '🇰🇷',
    currency: {
      code: 'KRW',
      symbol: '₩',
      name: 'South Korean Won'
    },
    taxRates: {
      corporate: 25,
      vat: 10,
      personalIncome: { min: 6, max: 45 },
      capitalGains: 22,
      payrollTax: 9.81
    },
    financialYear: {
      start: '01-01',
      end: '12-31'
    },
    businessRegistration: {
      timeframe: '1-2 weeks',
      averageCost: 500000
    },
    economicIndicators: {
      inflation: 2.3,
      gdpGrowth: 2.6,
      businessEase: 5
    }
  }
];

// Helper functions for country operations
export const getCountryByCode = (code: string): CountryData | undefined => {
  return countries.find(country => country.code === code);
};

export const formatCurrency = (amount: number, countryCode: string): string => {
  const country = getCountryByCode(countryCode);
  if (!country) return amount.toString();
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: country.currency.code,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getEffectiveTaxRate = (income: number, countryCode: string): number => {
  const country = getCountryByCode(countryCode);
  if (!country) return 0;
  
  // Simplified progressive tax calculation
  const { min, max } = country.taxRates.personalIncome;
  const rate = min + ((max - min) * Math.min(income / 1000000, 1));
  return Math.round(rate * 100) / 100;
};