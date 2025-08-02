import { useState, useMemo } from 'react'
import { Search, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { countries, CountryData } from '../../data/countries'

interface CountrySelectorProps {
  selectedCountry: string
  onCountrySelect: (countryCode: string) => void
}

const CountrySelector = ({ selectedCountry, onCountrySelect }: CountrySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries
    
    return countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.currency.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input pl-10"
        />
      </div>

      {/* Countries Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto scrollbar-hide"
      >
        {filteredCountries.map((country) => (
          <motion.button
            key={country.code}
            variants={itemVariants}
            onClick={() => onCountrySelect(country.code)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
              selectedCountry === country.code
                ? 'border-primary-500 bg-primary-50 shadow-md'
                : 'border-accent-200 hover:border-primary-300 bg-white'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <div className="font-semibold text-accent-900">{country.name}</div>
                  <div className="text-sm text-accent-600">{country.code}</div>
                </div>
              </div>
              {selectedCountry === country.code && (
                <Check className="w-5 h-5 text-primary-600" />
              )}
            </div>
            
            <div className="space-y-1 text-sm text-accent-600">
              <div className="flex justify-between">
                <span>Currency:</span>
                <span className="font-medium">
                  {country.currency.symbol} {country.currency.code}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Corporate Tax:</span>
                <span className="font-medium">{country.taxRates.corporate}%</span>
              </div>
              <div className="flex justify-between">
                <span>VAT/GST:</span>
                <span className="font-medium">
                  {country.taxRates.vat === 0 ? 'Varies by state' : `${country.taxRates.vat}%`}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {filteredCountries.length === 0 && (
        <div className="text-center py-8">
          <p className="text-accent-500">No countries found matching "{searchTerm}"</p>
        </div>
      )}

      {/* Selected Country Details */}
      {selectedCountry && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-primary-50 border-primary-200 mt-6"
        >
          {(() => {
            const country = countries.find(c => c.code === selectedCountry)
            if (!country) return null

            return (
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center space-x-2">
                  <span>{country.flag}</span>
                  <span>{country.name} - Tax Information</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-accent-600">Corporate Tax Rate:</span>
                      <span className="font-medium">{country.taxRates.corporate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent-600">VAT/Sales Tax:</span>
                      <span className="font-medium">
                        {country.taxRates.vat === 0 ? 'Varies' : `${country.taxRates.vat}%`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent-600">Capital Gains Tax:</span>
                      <span className="font-medium">{country.taxRates.capitalGains}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent-600">Payroll Tax:</span>
                      <span className="font-medium">{country.taxRates.payrollTax}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-accent-600">Financial Year:</span>
                      <span className="font-medium">
                        {country.financialYear.start} to {country.financialYear.end}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent-600">Business Registration:</span>
                      <span className="font-medium">{country.businessRegistration.timeframe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent-600">GDP Growth (2025):</span>
                      <span className="font-medium text-success-600">
                        +{country.economicIndicators.gdpGrowth}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-accent-600">Ease of Business:</span>
                      <span className="font-medium">
                        #{country.economicIndicators.businessEase} globally
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </motion.div>
      )}
    </div>
  )
}

export default CountrySelector