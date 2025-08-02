import { useState } from 'react'
import { Search, Check, Users, Building, Rocket } from 'lucide-react'
import { motion } from 'framer-motion'
import { businessTypes, BusinessType } from '../../data/businessScenarios'

interface BusinessTypeSelectorProps {
  selectedBusinessType: string
  onBusinessTypeSelect: (businessTypeId: string) => void
}

const BusinessTypeSelector = ({ selectedBusinessType, onBusinessTypeSelect }: BusinessTypeSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredBusinessTypes = businessTypes.filter(bt =>
    bt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bt.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getBusinessTypeColor = (businessTypeId: string) => {
    switch (businessTypeId) {
      case 'startup':
        return 'border-orange-200 bg-orange-50 hover:border-orange-300'
      case 'smb':
        return 'border-blue-200 bg-blue-50 hover:border-blue-300'
      case 'enterprise':
        return 'border-purple-200 bg-purple-50 hover:border-purple-300'
      case 'ecommerce':
        return 'border-green-200 bg-green-50 hover:border-green-300'
      case 'saas':
        return 'border-indigo-200 bg-indigo-50 hover:border-indigo-300'
      default:
        return 'border-accent-200 bg-accent-50 hover:border-accent-300'
    }
  }

  const getBusinessTypeIcon = (businessTypeId: string) => {
    switch (businessTypeId) {
      case 'startup':
        return Rocket
      case 'smb':
        return Building
      case 'enterprise':
        return Building
      default:
        return Users
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
          placeholder="Search business types..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input pl-10"
        />
      </div>

      {/* Business Types Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredBusinessTypes.map((businessType) => {
          const IconComponent = getBusinessTypeIcon(businessType.id)
          return (
            <motion.button
              key={businessType.id}
              variants={itemVariants}
              onClick={() => onBusinessTypeSelect(businessType.id)}
              className={`p-6 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
                selectedBusinessType === businessType.id
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : `${getBusinessTypeColor(businessType.id)}`
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{businessType.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-accent-900 text-lg mb-1">
                      {businessType.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-sm text-accent-600">
                      <IconComponent className="w-4 h-4" />
                      <span>{businessType.scenarios.length} scenarios</span>
                    </div>
                  </div>
                </div>
                {selectedBusinessType === businessType.id && (
                  <Check className="w-5 h-5 text-primary-600 flex-shrink-0" />
                )}
              </div>
              
              <p className="text-accent-600 text-sm leading-relaxed mb-4">
                {businessType.description}
              </p>
              
              {/* Sample Scenarios Preview */}
              <div className="space-y-2">
                <div className="text-xs font-medium text-accent-700 uppercase tracking-wide">
                  Sample Scenarios
                </div>
                <div className="space-y-1">
                  {businessType.scenarios.slice(0, 3).map((scenario, index) => (
                    <div key={scenario.id} className="text-xs text-accent-600 flex items-center space-x-1">
                      <div className="w-1 h-1 bg-accent-400 rounded-full"></div>
                      <span>{scenario.name}</span>
                    </div>
                  ))}
                  {businessType.scenarios.length > 3 && (
                    <div className="text-xs text-accent-500 italic">
                      +{businessType.scenarios.length - 3} more scenarios
                    </div>
                  )}
                </div>
              </div>
            </motion.button>
          )
        })}
      </motion.div>

      {filteredBusinessTypes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-accent-500">No business types found matching "{searchTerm}"</p>
        </div>
      )}

      {/* Selected Business Type Details */}
      {selectedBusinessType && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-primary-50 border-primary-200"
        >
          {(() => {
            const businessType = businessTypes.find(bt => bt.id === selectedBusinessType)
            if (!businessType) return null

            return (
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-4 flex items-center space-x-2">
                  <span>{businessType.icon}</span>
                  <span>{businessType.name} - Available Scenarios</span>
                </h3>
                
                <p className="text-accent-700 mb-4">{businessType.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {businessType.scenarios.map((scenario, index) => (
                    <div key={scenario.id} className="p-3 bg-white rounded-lg border border-primary-200">
                      <h4 className="font-medium text-accent-900 mb-1">{scenario.name}</h4>
                      <p className="text-sm text-accent-600 mb-2">{scenario.description}</p>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-accent-500">Revenue Range:</span>
                          <div className="font-medium">
                            ${scenario.monthlyRevenue.min.toLocaleString()} - ${scenario.monthlyRevenue.max.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <span className="text-accent-500">Gross Margin:</span>
                          <div className="font-medium">{scenario.grossMargin}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })()}
        </motion.div>
      )}
    </div>
  )
}

export default BusinessTypeSelector