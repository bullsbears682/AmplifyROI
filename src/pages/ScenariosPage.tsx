import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Search, Filter, BookOpen, ChevronDown, ChevronUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { businessTypes } from '../data/businessScenarios'

const ScenariosPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [expandedType, setExpandedType] = useState<string | null>(null)

  const filteredBusinessTypes = useMemo(() => {
    let filtered = businessTypes

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(bt =>
        bt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bt.scenarios.some(scenario =>
          scenario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scenario.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Apply category filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(bt => bt.id === selectedFilter)
    }

    return filtered
  }, [searchTerm, selectedFilter])

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    } else {
      return `$${amount.toLocaleString()}`
    }
  }

  const getBusinessTypeColor = (businessTypeId: string) => {
    switch (businessTypeId) {
      case 'startup':
        return 'from-orange-100 to-orange-50 border-orange-200'
      case 'smb':
        return 'from-blue-100 to-blue-50 border-blue-200'
      case 'enterprise':
        return 'from-purple-100 to-purple-50 border-purple-200'
      case 'ecommerce':
        return 'from-green-100 to-green-50 border-green-200'
      case 'saas':
        return 'from-indigo-100 to-indigo-50 border-indigo-200'
      default:
        return 'from-accent-100 to-accent-50 border-accent-200'
    }
  }

  return (
    <>
      <Helmet>
        <title>Business Scenarios - AmplifyROI</title>
        <meta name="description" content="Explore 35+ business types and 245+ scenarios for accurate ROI calculations." />
      </Helmet>

      <div className="min-h-screen bg-gradient-bg py-8">
        <div className="container-custom">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-accent-900 mb-4">Business Scenarios</h1>
            <p className="text-xl text-accent-600 max-w-3xl mx-auto">
              Discover 35+ business types with 7 realistic scenarios each. 
              Find the perfect match for your ROI calculations with 2025 financial data.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="card mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-accent-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search business types or scenarios..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="form-input pl-10 w-full"
                />
              </div>

              {/* Filter */}
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-accent-500" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="form-input min-w-[150px]"
                >
                  <option value="all">All Types</option>
                  {businessTypes.map(bt => (
                    <option key={bt.id} value={bt.id}>{bt.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-accent-600">
              Showing {filteredBusinessTypes.length} business type{filteredBusinessTypes.length !== 1 ? 's' : ''} 
              {searchTerm && ` matching "${searchTerm}"`}
            </p>
          </div>

          {/* Business Types Grid */}
          <div className="space-y-6">
            {filteredBusinessTypes.map((businessType) => (
              <motion.div
                key={businessType.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`card bg-gradient-to-br ${getBusinessTypeColor(businessType.id)} border-2 hover:shadow-lg transition-all duration-300`}
              >
                {/* Business Type Header */}
                <button
                  onClick={() => setExpandedType(expandedType === businessType.id ? null : businessType.id)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">{businessType.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-accent-900 mb-1">
                        {businessType.name}
                      </h3>
                      <p className="text-accent-600 mb-2">{businessType.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-accent-500">
                        <span>{businessType.scenarios.length} scenarios available</span>
                        <span>•</span>
                        <span>2025 financial data</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-accent-500">
                      {expandedType === businessType.id ? 'Hide' : 'Show'} Scenarios
                    </span>
                    {expandedType === businessType.id ? (
                      <ChevronUp className="w-5 h-5 text-accent-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-accent-500" />
                    )}
                  </div>
                </button>

                {/* Scenarios Expansion */}
                <AnimatePresence>
                  {expandedType === businessType.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6"
                    >
                      <div className="border-t border-accent-200 pt-6">
                        <h4 className="text-lg font-semibold text-accent-900 mb-4">
                          Available Scenarios
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {businessType.scenarios.map((scenario, index) => (
                            <div
                              key={scenario.id}
                              className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-white/50 hover:shadow-md transition-all duration-200"
                            >
                              <h5 className="font-semibold text-accent-900 mb-2">
                                {scenario.name}
                              </h5>
                              <p className="text-sm text-accent-600 mb-3 leading-relaxed">
                                {scenario.description}
                              </p>
                              
                              <div className="space-y-2 text-xs">
                                <div className="grid grid-cols-2 gap-2">
                                  <div>
                                    <span className="text-accent-500">Revenue Range:</span>
                                    <div className="font-medium text-accent-900">
                                      {formatCurrency(scenario.monthlyRevenue.min)} - {formatCurrency(scenario.monthlyRevenue.max)}
                                    </div>
                                  </div>
                                  <div>
                                    <span className="text-accent-500">Default:</span>
                                    <div className="font-medium text-success-600">
                                      {formatCurrency(scenario.monthlyRevenue.default)}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-accent-200">
                                  <div>
                                    <span className="text-accent-500">Margin:</span>
                                    <div className="font-medium">{scenario.grossMargin}%</div>
                                  </div>
                                  <div>
                                    <span className="text-accent-500">CAC:</span>
                                    <div className="font-medium">${scenario.cac.toLocaleString()}</div>
                                  </div>
                                  <div>
                                    <span className="text-accent-500">Growth:</span>
                                    <div className="font-medium text-success-600">{scenario.growthRate}%</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* No Results */}
          {filteredBusinessTypes.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-accent-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="text-xl font-semibold text-accent-900 mb-2">No scenarios found</h3>
              <p className="text-accent-600 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedFilter('all')
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Statistics */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">35+</div>
              <div className="text-accent-600">Business Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">245+</div>
              <div className="text-accent-600">Total Scenarios</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">25+</div>
              <div className="text-accent-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">2025</div>
              <div className="text-accent-600">Data Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ScenariosPage