'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Target,
  Download,
  Mail,
  Share2,
  ChevronDown,
  ChevronUp,
  Info,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  BarChart3,
  PieChart,
  LineChart,
  Users,
  Zap,
  RefreshCw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCalculator } from '@/contexts/calculator-context'
import { useAnalyticsContext } from '@/contexts/analytics-context'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

// Mock ROI calculation results (in real app, this would come from the API)
interface ROIResults {
  totalROI: number
  totalRevenue: number
  totalCosts: number
  netProfit: number
  paybackPeriod: number
  irr: number
  npv: number
  breakEvenMonth: number
  monthlyProjections: Array<{
    month: number
    revenue: number
    costs: number
    profit: number
    cumulativeProfit: number
    roi: number
  }>
  insights: Array<{
    type: 'positive' | 'negative' | 'neutral'
    title: string
    description: string
    impact: 'high' | 'medium' | 'low'
  }>
  recommendations: Array<{
    title: string
    description: string
    priority: 'high' | 'medium' | 'low'
    potentialImpact: string
  }>
  riskFactors: Array<{
    title: string
    description: string
    severity: 'high' | 'medium' | 'low'
    mitigation: string
  }>
}

const MetricCard = ({ 
  title, 
  value, 
  change, 
  isPositive = true, 
  icon: Icon,
  suffix = '',
  prefix = '',
  helpText
}: {
  title: string
  value: string | number
  change?: number
  isPositive?: boolean
  icon: any
  suffix?: string
  prefix?: string
  helpText?: string
}) => (
  <Card className="relative overflow-hidden group hover:shadow-lg transition-shadow duration-300">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5 text-primary-600" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</span>
        </div>
        {helpText && (
          <div className="group/tooltip relative">
            <Info className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-help" />
            <div className="invisible group-hover/tooltip:visible absolute right-0 top-6 z-10 w-64 p-2 bg-black text-white text-xs rounded shadow-lg">
              {helpText}
            </div>
          </div>
        )}
      </div>
    </CardHeader>
    <CardContent>
      <div className="space-y-1">
        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {prefix}{typeof value === 'number' ? formatNumber(value) : value}{suffix}
        </div>
        {change !== undefined && (
          <div className={cn(
            "flex items-center text-sm",
            isPositive ? "text-green-600" : "text-red-600"
          )}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span>{Math.abs(change)}% vs industry avg</span>
          </div>
        )}
      </div>
    </CardContent>
    <div className={cn(
      "absolute inset-x-0 bottom-0 h-1 transition-all duration-300",
      isPositive ? "bg-green-500" : "bg-red-500",
      "group-hover:h-2"
    )} />
  </Card>
)

const ChartContainer = ({ 
  title, 
  children, 
  actions 
}: { 
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
}) => (
  <Card className="col-span-2">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          {title}
        </CardTitle>
        {actions}
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-80 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg">
        {children}
      </div>
    </CardContent>
  </Card>
)

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isExporting, setIsExporting] = useState(false)
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null)
  
  const router = useRouter()
  const { state } = useCalculator()
  const { selectedCountry, selectedBusinessType, selectedScenario, calculationInputs } = state
  const { trackEvent, trackConversion } = useAnalyticsContext()

  // Mock results (in real app, this would be calculated by the backend)
  const [results, setResults] = useState<ROIResults | null>(null)
  
  useEffect(() => {
    // Redirect if no calculation inputs
    if (!calculationInputs) {
      router.push('/setup')
      return
    }

    // Simulate API call
    const generateResults = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock calculation results
      const mockResults: ROIResults = {
        totalROI: 187.5,
        totalRevenue: 2850000,
        totalCosts: 1200000,
        netProfit: 1650000,
        paybackPeriod: 8.5,
        irr: 45.2,
        npv: 1420000,
        breakEvenMonth: 6,
        monthlyProjections: Array.from({ length: 24 }, (_, i) => ({
          month: i + 1,
          revenue: 10000 * Math.pow(1.1, i),
          costs: 5000 + (i * 200),
          profit: (10000 * Math.pow(1.1, i)) - (5000 + (i * 200)),
          cumulativeProfit: 0, // Will be calculated
          roi: 0 // Will be calculated
        })),
        insights: [
          {
            type: 'positive',
            title: 'Strong ROI Performance',
            description: 'Your projected ROI of 187.5% significantly exceeds industry averages',
            impact: 'high'
          },
          {
            type: 'positive',
            title: 'Quick Payback Period',
            description: 'Your investment will pay back in just 8.5 months, which is excellent',
            impact: 'high'
          },
          {
            type: 'negative',
            title: 'High Customer Acquisition Cost',
            description: 'Your CAC is above industry benchmarks and may impact profitability',
            impact: 'medium'
          }
        ],
        recommendations: [
          {
            title: 'Optimize Customer Acquisition',
            description: 'Focus on reducing CAC through improved targeting and conversion optimization',
            priority: 'high',
            potentialImpact: '+15% ROI improvement'
          },
          {
            title: 'Expand Marketing Channels',
            description: 'Diversify your marketing mix to reduce dependency on single channels',
            priority: 'medium',
            potentialImpact: '+8% revenue growth'
          }
        ],
        riskFactors: [
          {
            title: 'Market Competition',
            description: 'Increasing competition may impact customer acquisition and pricing',
            severity: 'medium',
            mitigation: 'Focus on unique value proposition and customer retention'
          },
          {
            title: 'Churn Rate Sensitivity',
            description: 'Small increases in churn rate significantly impact long-term profitability',
            severity: 'high',
            mitigation: 'Invest in customer success and retention programs'
          }
        ]
      }

      // Calculate cumulative values
      let cumulativeProfit = 0
      mockResults.monthlyProjections = mockResults.monthlyProjections.map((proj, i) => {
        cumulativeProfit += proj.profit
        return {
          ...proj,
          cumulativeProfit,
          roi: calculationInputs ? (cumulativeProfit / calculationInputs.initial_investment) * 100 : 0
        }
      })

      setResults(mockResults)
      
      // Track successful calculation
      trackConversion('roi_calculation', mockResults.totalROI)
    }

    generateResults()
  }, [calculationInputs, router, trackConversion])

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    setIsExporting(true)
    trackEvent('export_results', { format })
    
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsExporting(false)
  }

  const handleEmailResults = () => {
    trackEvent('email_results')
    // Implement email functionality
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'projections', label: 'Projections', icon: LineChart },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
    { id: 'risks', label: 'Risk Analysis', icon: AlertCircle }
  ]

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary-600" />
          <p className="text-lg font-medium">Calculating your ROI...</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">This may take a few moments</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container-padding py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  ROI Analysis Results
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Comprehensive financial projections and insights for your business
                </p>
              </div>
              
              {/* Export Actions */}
              <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEmailResults}
                  className="flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Results</span>
                </Button>
                
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport('pdf')}
                    disabled={isExporting}
                    className="flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport('excel')}
                    disabled={isExporting}
                  >
                    Excel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleExport('csv')}
                    disabled={isExporting}
                  >
                    CSV
                  </Button>
                </div>
              </div>
            </div>

            {/* Configuration Summary */}
            <div className="flex flex-wrap items-center gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <Badge variant="secondary">🌍 {selectedCountry?.name}</Badge>
                <Badge variant="secondary">🏢 {selectedBusinessType?.name}</Badge>
                <Badge variant="secondary">📊 {selectedScenario?.name}</Badge>
                              {calculationInputs && (
                  <>
                    <Badge variant="secondary">💰 {formatCurrency(calculationInputs.initial_investment, 'USD')} investment</Badge>
                    <Badge variant="secondary">📅 {calculationInputs.timeframe_months} months</Badge>
                  </>
                )}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Total ROI"
              value={results.totalROI}
              change={12.5}
              isPositive={true}
              icon={Target}
              suffix="%"
              helpText="Return on Investment - your total percentage return over the calculation period"
            />
            <MetricCard
              title="Net Profit"
              value={formatCurrency(results.netProfit, 'USD')}
              change={8.2}
              isPositive={true}
              icon={DollarSign}
              helpText="Total profit after all costs and taxes over the calculation period"
            />
            <MetricCard
              title="Payback Period"
              value={results.paybackPeriod}
              change={-15.3}
              isPositive={true}
              icon={Calendar}
              suffix=" months"
              helpText="Time required to recover your initial investment"
            />
            <MetricCard
              title="Internal Rate of Return"
              value={results.irr}
              change={22.1}
              isPositive={true}
              icon={TrendingUp}
              suffix="%"
              helpText="The rate of return that makes the net present value of the investment zero"
            />
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                )}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue vs Costs Chart */}
                <ChartContainer title="Revenue vs Costs Projection">
                  <div className="text-center">
                    <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      Interactive chart showing monthly revenue and cost projections
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Chart implementation with Recharts would go here
                    </p>
                  </div>
                </ChartContainer>

                {/* ROI Trajectory */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChart className="w-5 h-5 mr-2" />
                      ROI Trajectory
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Break-even</span>
                        <Badge variant="success">Month {results.breakEvenMonth}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Peak ROI</span>
                        <span className="font-semibold">{results.totalROI}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">NPV</span>
                        <span className="font-semibold">{formatCurrency(results.npv, 'USD')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'projections' && (
              <div className="space-y-8">
                {/* Monthly Projections Table */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Financial Projections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="text-left py-2">Month</th>
                            <th className="text-right py-2">Revenue</th>
                            <th className="text-right py-2">Costs</th>
                            <th className="text-right py-2">Profit</th>
                            <th className="text-right py-2">Cumulative</th>
                            <th className="text-right py-2">ROI</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results.monthlyProjections.slice(0, 12).map((projection) => (
                            <tr key={projection.month} className="border-b border-gray-100 dark:border-gray-800">
                              <td className="py-2 font-medium">{projection.month}</td>
                              <td className="text-right py-2">{formatCurrency(projection.revenue, 'USD')}</td>
                              <td className="text-right py-2">{formatCurrency(projection.costs, 'USD')}</td>
                              <td className={cn(
                                "text-right py-2 font-medium",
                                projection.profit >= 0 ? "text-green-600" : "text-red-600"
                              )}>
                                {formatCurrency(projection.profit, 'USD')}
                              </td>
                              <td className="text-right py-2">{formatCurrency(projection.cumulativeProfit, 'USD')}</td>
                              <td className={cn(
                                "text-right py-2 font-medium",
                                projection.roi >= 0 ? "text-green-600" : "text-red-600"
                              )}>
                                {projection.roi.toFixed(1)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'insights' && (
              <div className="space-y-6">
                {/* AI Insights */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    AI-Powered Insights
                  </h3>
                  
                  {results.insights.map((insight, index) => (
                    <Card key={index} className={cn(
                      "border-l-4 transition-all duration-200",
                      insight.type === 'positive' && "border-l-green-500 bg-green-50 dark:bg-green-950",
                      insight.type === 'negative' && "border-l-red-500 bg-red-50 dark:bg-red-950",
                      insight.type === 'neutral' && "border-l-blue-500 bg-blue-50 dark:bg-blue-950"
                    )}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {insight.type === 'positive' && <CheckCircle className="w-5 h-5 text-green-600" />}
                              {insight.type === 'negative' && <AlertCircle className="w-5 h-5 text-red-600" />}
                              {insight.type === 'neutral' && <Info className="w-5 h-5 text-blue-600" />}
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{insight.title}</h4>
                              <Badge 
                                variant={insight.impact === 'high' ? 'destructive' : insight.impact === 'medium' ? 'warning' : 'secondary'}
                                className="text-xs"
                              >
                                {insight.impact} impact
                              </Badge>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400">{insight.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recommendations */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary-600" />
                    Recommendations
                  </h3>
                  
                  {results.recommendations.map((rec, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-100">{rec.title}</h4>
                              <Badge 
                                variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'warning' : 'secondary'}
                                className="text-xs"
                              >
                                {rec.priority} priority
                              </Badge>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">{rec.description}</p>
                            <div className="flex items-center space-x-1 text-sm">
                              <Zap className="w-4 h-4 text-yellow-500" />
                              <span className="text-green-600 font-medium">{rec.potentialImpact}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'risks' && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                  Risk Analysis
                </h3>
                
                {results.riskFactors.map((risk, index) => (
                  <Card key={index} className="border-l-4 border-l-red-500">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100">{risk.title}</h4>
                          <Badge 
                            variant={risk.severity === 'high' ? 'destructive' : risk.severity === 'medium' ? 'warning' : 'secondary'}
                            className="text-xs"
                          >
                            {risk.severity} risk
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{risk.description}</p>
                      <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded-lg">
                        <h5 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">Mitigation Strategy:</h5>
                        <p className="text-sm text-blue-700 dark:text-blue-300">{risk.mitigation}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={() => router.push('/calculator')}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Modify Inputs
            </Button>
            <Button
              onClick={() => router.push('/scenarios')}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Try Different Scenario
            </Button>
            <Button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="w-full sm:w-auto"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}