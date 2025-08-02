'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BarChart3,
  Users,
  Calculator,
  Mail,
  Download,
  TrendingUp,
  TrendingDown,
  Globe,
  Building,
  Eye,
  Clock,
  Filter,
  Search,
  Calendar,
  FileText,
  Shield,
  RefreshCw,
  ChevronDown,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  X,
  Lock,
  Unlock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAnalyticsContext } from '@/contexts/analytics-context'
import { cn, formatCurrency, formatNumber } from '@/lib/utils'

interface AnalyticsData {
  totalCalculations: number
  totalUsers: number
  totalExports: number
  totalEmailsSent: number
  averageSessionDuration: number
  conversionRate: number
  popularCountries: Array<{ country: string; count: number }>
  popularBusinessTypes: Array<{ type: string; count: number }>
  popularScenarios: Array<{ scenario: string; count: number }>
  dailyStats: Array<{ date: string; calculations: number; users: number }>
  recentActivity: Array<{
    id: string
    type: 'calculation' | 'export' | 'email'
    timestamp: string
    country: string
    businessType: string
    scenario: string
    userAgent: string
  }>
}

interface EmailSubmission {
  id: string
  email: string
  name?: string
  company?: string
  calculationId: string
  timestamp: string
  status: 'sent' | 'pending' | 'failed'
  country: string
  businessType: string
  scenario: string
  roiResult: number
}

interface ExportRecord {
  id: string
  type: 'pdf' | 'excel' | 'csv'
  timestamp: string
  country: string
  businessType: string
  scenario: string
  fileSize: number
  downloadCount: number
}

const AdminLogin = ({ onLogin }: { onLogin: (password: string) => void }) => {
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    if (password === 'admin123') {
      onLogin(password)
    } else {
      setError('Invalid password')
    }
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-gray-700 bg-gray-800">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Admin Access</CardTitle>
            <p className="text-gray-400">Enter password to access the admin dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                {error && (
                  <p className="mt-2 text-sm text-red-400 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {error}
                  </p>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary-600 hover:bg-primary-700"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 mr-2" />
                    Access Dashboard
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Demo password: admin123
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState('analytics')
  const [dateRange, setDateRange] = useState('30d')
  const [isLoading, setIsLoading] = useState(false)
  
  // Mock data (in real app, this would come from API)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [emailSubmissions, setEmailSubmissions] = useState<EmailSubmission[]>([])
  const [exportRecords, setExportRecords] = useState<ExportRecord[]>([])

  const { trackEvent } = useAnalyticsContext()

  useEffect(() => {
    if (isAuthenticated && !analyticsData) {
      loadAnalyticsData()
    }
  }, [isAuthenticated, analyticsData])

  const loadAnalyticsData = async () => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock analytics data
    setAnalyticsData({
      totalCalculations: 12547,
      totalUsers: 8934,
      totalExports: 3421,
      totalEmailsSent: 2156,
      averageSessionDuration: 8.5,
      conversionRate: 34.2,
      popularCountries: [
        { country: 'United States', count: 4521 },
        { country: 'United Kingdom', count: 2134 },
        { country: 'Canada', count: 1876 },
        { country: 'Australia', count: 1234 },
        { country: 'Germany', count: 987 }
      ],
      popularBusinessTypes: [
        { type: 'SaaS', count: 5234 },
        { type: 'E-commerce', count: 3456 },
        { type: 'Startup', count: 2345 },
        { type: 'Consulting', count: 1234 },
        { type: 'Agency', count: 1078 }
      ],
      popularScenarios: [
        { scenario: 'Micro SaaS', count: 2145 },
        { scenario: 'Dropshipping Store', count: 1876 },
        { scenario: 'MVP Stage Startup', count: 1543 },
        { scenario: 'B2B SaaS Platform', count: 1234 },
        { scenario: 'Private Label Brand', count: 987 }
      ],
      dailyStats: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        calculations: Math.floor(Math.random() * 200) + 50,
        users: Math.floor(Math.random() * 150) + 30
      })).reverse(),
      recentActivity: Array.from({ length: 50 }, (_, i) => ({
        id: `activity-${i}`,
        type: ['calculation', 'export', 'email'][Math.floor(Math.random() * 3)] as any,
        timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
        country: ['US', 'GB', 'CA', 'AU', 'DE'][Math.floor(Math.random() * 5)],
        businessType: ['SaaS', 'E-commerce', 'Startup', 'Consulting'][Math.floor(Math.random() * 4)],
        scenario: ['Micro SaaS', 'Dropshipping', 'MVP Startup', 'B2B Platform'][Math.floor(Math.random() * 4)],
        userAgent: 'Chrome/120.0.0.0'
      }))
    })

    // Mock email submissions
    setEmailSubmissions(Array.from({ length: 25 }, (_, i) => ({
      id: `email-${i}`,
      email: `user${i}@example.com`,
      name: `User ${i}`,
      company: `Company ${i}`,
      calculationId: `calc-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: ['sent', 'pending', 'failed'][Math.floor(Math.random() * 3)] as any,
      country: ['US', 'GB', 'CA'][Math.floor(Math.random() * 3)],
      businessType: ['SaaS', 'E-commerce', 'Startup'][Math.floor(Math.random() * 3)],
      scenario: ['Micro SaaS', 'Dropshipping', 'MVP'][Math.floor(Math.random() * 3)],
      roiResult: Math.floor(Math.random() * 300) + 50
    })))

    // Mock export records
    setExportRecords(Array.from({ length: 30 }, (_, i) => ({
      id: `export-${i}`,
      type: ['pdf', 'excel', 'csv'][Math.floor(Math.random() * 3)] as any,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      country: ['US', 'GB', 'CA'][Math.floor(Math.random() * 3)],
      businessType: ['SaaS', 'E-commerce', 'Startup'][Math.floor(Math.random() * 3)],
      scenario: ['Micro SaaS', 'Dropshipping', 'MVP'][Math.floor(Math.random() * 3)],
      fileSize: Math.floor(Math.random() * 5000) + 500,
      downloadCount: Math.floor(Math.random() * 10) + 1
    })))

    setIsLoading(false)
  }

  const handleLogin = (password: string) => {
    setIsAuthenticated(true)
    trackEvent('admin_login', { timestamp: new Date().toISOString() })
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setAnalyticsData(null)
    setEmailSubmissions([])
    setExportRecords([])
    trackEvent('admin_logout', { timestamp: new Date().toISOString() })
  }

  const exportData = async (type: 'analytics' | 'emails' | 'exports') => {
    trackEvent('admin_export', { type })
    // Simulate export
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In real app, this would trigger a download
    alert(`${type} data exported successfully!`)
  }

  const tabs = [
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'emails', label: 'Email Submissions', icon: Mail },
    { id: 'exports', label: 'Export Management', icon: Download },
    { id: 'activity', label: 'Recent Activity', icon: Clock }
  ]

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container-padding py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor usage, analytics, and manage AmplifyROI platform
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              
              <Button
                variant="outline"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <Lock className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
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

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <RefreshCw className="w-8 h-8 animate-spin text-primary-600" />
                  <span className="ml-3 text-lg">Loading dashboard data...</span>
                </div>
              ) : (
                <>
                  {/* Analytics Tab */}
                  {activeTab === 'analytics' && analyticsData && (
                    <div className="space-y-8">
                      {/* Key Metrics */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Calculations</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                  {formatNumber(analyticsData.totalCalculations)}
                                </p>
                              </div>
                              <Calculator className="w-8 h-8 text-primary-600" />
                            </div>
                            <div className="flex items-center mt-2 text-sm">
                              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                              <span className="text-green-600">+12.5%</span>
                              <span className="text-gray-500 ml-1">vs last period</span>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Users</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                  {formatNumber(analyticsData.totalUsers)}
                                </p>
                              </div>
                              <Users className="w-8 h-8 text-blue-600" />
                            </div>
                            <div className="flex items-center mt-2 text-sm">
                              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                              <span className="text-green-600">+8.3%</span>
                              <span className="text-gray-500 ml-1">vs last period</span>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Conversion Rate</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                  {analyticsData.conversionRate}%
                                </p>
                              </div>
                              <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                            <div className="flex items-center mt-2 text-sm">
                              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                              <span className="text-green-600">+5.2%</span>
                              <span className="text-gray-500 ml-1">vs last period</span>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Session</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                  {analyticsData.averageSessionDuration}m
                                </p>
                              </div>
                              <Clock className="w-8 h-8 text-purple-600" />
                            </div>
                            <div className="flex items-center mt-2 text-sm">
                              <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                              <span className="text-red-600">-2.1%</span>
                              <span className="text-gray-500 ml-1">vs last period</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Charts and Tables */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Popular Countries */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Globe className="w-5 h-5 mr-2" />
                              Popular Countries
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {analyticsData.popularCountries.map((country, index) => (
                                <div key={country.country} className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-sm font-medium text-gray-500 w-4">#{index + 1}</span>
                                    <span className="font-medium">{country.country}</span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                      <div 
                                        className="bg-primary-600 h-2 rounded-full"
                                        style={{ width: `${(country.count / analyticsData.popularCountries[0].count) * 100}%` }}
                                      />
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                                      {formatNumber(country.count)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Popular Business Types */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Building className="w-5 h-5 mr-2" />
                              Popular Business Types
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {analyticsData.popularBusinessTypes.map((type, index) => (
                                <div key={type.type} className="flex items-center justify-between">
                                  <div className="flex items-center space-x-3">
                                    <span className="text-sm font-medium text-gray-500 w-4">#{index + 1}</span>
                                    <span className="font-medium">{type.type}</span>
                                  </div>
                                  <div className="flex items-center space-x-3">
                                    <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                      <div 
                                        className="bg-blue-600 h-2 rounded-full"
                                        style={{ width: `${(type.count / analyticsData.popularBusinessTypes[0].count) * 100}%` }}
                                      />
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                                      {formatNumber(type.count)}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Export Button */}
                      <div className="flex justify-center">
                        <Button
                          onClick={() => exportData('analytics')}
                          className="flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export Analytics Data</span>
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Email Submissions Tab */}
                  {activeTab === 'emails' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          Email Submissions ({emailSubmissions.length})
                        </h2>
                        <Button
                          onClick={() => exportData('emails')}
                          size="sm"
                          className="flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export CSV</span>
                        </Button>
                      </div>

                      <Card>
                        <CardContent className="p-0">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                  <th className="text-left py-3 px-4 font-medium">Email</th>
                                  <th className="text-left py-3 px-4 font-medium">Name</th>
                                  <th className="text-left py-3 px-4 font-medium">Business Type</th>
                                  <th className="text-left py-3 px-4 font-medium">ROI Result</th>
                                  <th className="text-left py-3 px-4 font-medium">Status</th>
                                  <th className="text-left py-3 px-4 font-medium">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {emailSubmissions.slice(0, 15).map((submission) => (
                                  <tr key={submission.id} className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="py-3 px-4 font-medium">{submission.email}</td>
                                    <td className="py-3 px-4">{submission.name || '-'}</td>
                                    <td className="py-3 px-4">
                                      <Badge variant="secondary">{submission.businessType}</Badge>
                                    </td>
                                    <td className="py-3 px-4 font-medium text-green-600">
                                      {submission.roiResult}%
                                    </td>
                                    <td className="py-3 px-4">
                                      <Badge variant={
                                        submission.status === 'sent' ? 'success' :
                                        submission.status === 'pending' ? 'warning' : 'destructive'
                                      }>
                                        {submission.status}
                                      </Badge>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                      {new Date(submission.timestamp).toLocaleDateString()}
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

                  {/* Export Records Tab */}
                  {activeTab === 'exports' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                          Export Records ({exportRecords.length})
                        </h2>
                        <Button
                          onClick={() => exportData('exports')}
                          size="sm"
                          className="flex items-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Export Data</span>
                        </Button>
                      </div>

                      <Card>
                        <CardContent className="p-0">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                  <th className="text-left py-3 px-4 font-medium">Type</th>
                                  <th className="text-left py-3 px-4 font-medium">Business Type</th>
                                  <th className="text-left py-3 px-4 font-medium">Scenario</th>
                                  <th className="text-left py-3 px-4 font-medium">File Size</th>
                                  <th className="text-left py-3 px-4 font-medium">Downloads</th>
                                  <th className="text-left py-3 px-4 font-medium">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {exportRecords.slice(0, 15).map((record) => (
                                  <tr key={record.id} className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="py-3 px-4">
                                      <Badge variant={
                                        record.type === 'pdf' ? 'destructive' :
                                        record.type === 'excel' ? 'success' : 'secondary'
                                      }>
                                        {record.type.toUpperCase()}
                                      </Badge>
                                    </td>
                                    <td className="py-3 px-4">{record.businessType}</td>
                                    <td className="py-3 px-4">{record.scenario}</td>
                                    <td className="py-3 px-4">{(record.fileSize / 1024).toFixed(1)} KB</td>
                                    <td className="py-3 px-4 font-medium">{record.downloadCount}</td>
                                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                                      {new Date(record.timestamp).toLocaleDateString()}
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

                  {/* Recent Activity Tab */}
                  {activeTab === 'activity' && analyticsData && (
                    <div className="space-y-6">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Recent Activity
                      </h2>

                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {analyticsData.recentActivity.slice(0, 20).map((activity) => (
                              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                                <div className="flex items-center space-x-3">
                                  <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center",
                                    activity.type === 'calculation' && "bg-primary-100 dark:bg-primary-900",
                                    activity.type === 'export' && "bg-green-100 dark:bg-green-900",
                                    activity.type === 'email' && "bg-blue-100 dark:bg-blue-900"
                                  )}>
                                    {activity.type === 'calculation' && <Calculator className="w-4 h-4 text-primary-600" />}
                                    {activity.type === 'export' && <Download className="w-4 h-4 text-green-600" />}
                                    {activity.type === 'email' && <Mail className="w-4 h-4 text-blue-600" />}
                                  </div>
                                  <div>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                      {activity.type === 'calculation' && 'ROI Calculation'}
                                      {activity.type === 'export' && 'Report Export'}
                                      {activity.type === 'email' && 'Email Sent'}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                      {activity.businessType} • {activity.scenario} • {activity.country}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {new Date(activity.timestamp).toLocaleString()}
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}