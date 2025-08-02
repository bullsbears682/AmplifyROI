import { Check, DollarSign, TrendingUp, Users, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { BusinessType, BusinessScenario } from '../../data/businessScenarios'

interface ScenarioSelectorProps {
  businessType: BusinessType
  selectedScenario: string
  onScenarioSelect: (scenarioId: string) => void
}

const ScenarioSelector = ({ businessType, selectedScenario, onScenarioSelect }: ScenarioSelectorProps) => {
  const getScenarioColor = (index: number) => {
    const colors = [
      'border-emerald-200 bg-emerald-50 hover:border-emerald-300',
      'border-blue-200 bg-blue-50 hover:border-blue-300',
      'border-purple-200 bg-purple-50 hover:border-purple-300',
      'border-orange-200 bg-orange-50 hover:border-orange-300',
      'border-pink-200 bg-pink-50 hover:border-pink-300',
      'border-indigo-200 bg-indigo-50 hover:border-indigo-300',
      'border-teal-200 bg-teal-50 hover:border-teal-300',
    ]
    return colors[index % colors.length]
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`
    } else {
      return `$${amount.toLocaleString()}`
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
      {/* Business Type Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <span className="text-2xl">{businessType.icon}</span>
          <h3 className="text-xl font-semibold text-accent-900">{businessType.name}</h3>
        </div>
        <p className="text-accent-600">{businessType.description}</p>
      </div>

      {/* Scenarios Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {businessType.scenarios.map((scenario, index) => (
          <motion.button
            key={scenario.id}
            variants={itemVariants}
            onClick={() => onScenarioSelect(scenario.id)}
            className={`p-5 rounded-lg border-2 transition-all duration-200 text-left hover:shadow-md ${
              selectedScenario === scenario.id
                ? 'border-primary-500 bg-primary-50 shadow-md'
                : getScenarioColor(index)
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="font-semibold text-accent-900 text-lg mb-1">
                  {scenario.name}
                </h4>
                <p className="text-sm text-accent-600 leading-relaxed">
                  {scenario.description}
                </p>
              </div>
              {selectedScenario === scenario.id && (
                <Check className="w-5 h-5 text-primary-600 flex-shrink-0 ml-2" />
              )}
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-success-600" />
                  <div>
                    <div className="text-xs text-accent-500">Monthly Revenue</div>
                    <div className="font-medium">
                      {formatCurrency(scenario.monthlyRevenue.default)}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-primary-600" />
                  <div>
                    <div className="text-xs text-accent-500">Gross Margin</div>
                    <div className="font-medium">{scenario.grossMargin}%</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-warning-600" />
                  <div>
                    <div className="text-xs text-accent-500">CAC</div>
                    <div className="font-medium">${scenario.cac.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-accent-600" />
                  <div>
                    <div className="text-xs text-accent-500">Payment Terms</div>
                    <div className="font-medium">
                      {scenario.paymentTerms === 0 ? 'Immediate' : `${scenario.paymentTerms} days`}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="mt-3 pt-3 border-t border-accent-200/50">
              <div className="flex justify-between text-xs">
                <span className="text-accent-500">AOV: ${scenario.averageOrderValue.toLocaleString()}</span>
                <span className="text-accent-500">Growth: {scenario.growthRate}%/mo</span>
                {scenario.churnRate && (
                  <span className="text-accent-500">Churn: {scenario.churnRate}%</span>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Selected Scenario Details */}
      {selectedScenario && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-primary-50 border-primary-200"
        >
          {(() => {
            const scenario = businessType.scenarios.find(s => s.id === selectedScenario)
            if (!scenario) return null

            return (
              <div>
                <h3 className="text-lg font-semibold text-primary-900 mb-4">
                  {scenario.name} - Detailed Metrics
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="space-y-3">
                    <h4 className="font-medium text-accent-900 uppercase tracking-wide text-xs">
                      Revenue & Costs
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-accent-600">Revenue Range:</span>
                        <span className="font-medium">
                          {formatCurrency(scenario.monthlyRevenue.min)} - {formatCurrency(scenario.monthlyRevenue.max)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-accent-600">Default Revenue:</span>
                        <span className="font-medium text-success-600">
                          {formatCurrency(scenario.monthlyRevenue.default)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-accent-600">Gross Margin:</span>
                        <span className="font-medium">{scenario.grossMargin}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-accent-600">Operating Expenses:</span>
                        <span className="font-medium">{scenario.operatingExpenses}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-accent-900 uppercase tracking-wide text-xs">
                      Customer Metrics
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-accent-600">CAC:</span>
                        <span className="font-medium">${scenario.cac.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-accent-600">Average Order Value:</span>
                        <span className="font-medium">${scenario.averageOrderValue.toLocaleString()}</span>
                      </div>
                      {scenario.churnRate && (
                        <div className="flex justify-between">
                          <span className="text-accent-600">Monthly Churn Rate:</span>
                          <span className="font-medium">{scenario.churnRate}%</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-accent-600">Growth Rate:</span>
                        <span className="font-medium text-success-600">{scenario.growthRate}%/month</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium text-accent-900 uppercase tracking-wide text-xs">
                      Business Operations
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-accent-600">Marketing Budget:</span>
                        <span className="font-medium">{scenario.marketingBudget.percentage}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-accent-600">Payment Terms:</span>
                        <span className="font-medium">
                          {scenario.paymentTerms === 0 ? 'Immediate' : `${scenario.paymentTerms} days`}
                        </span>
                      </div>
                      {scenario.fulfillmentCost && (
                        <div className="flex justify-between">
                          <span className="text-accent-600">Fulfillment Cost:</span>
                          <span className="font-medium">{scenario.fulfillmentCost}%</span>
                        </div>
                      )}
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

export default ScenarioSelector