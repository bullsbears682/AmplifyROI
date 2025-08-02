import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Settings, BarChart3, Mail, Download, Users, TrendingUp } from 'lucide-react'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics')

  const tabs = [
    { id: 'analytics', name: 'Usage Analytics', icon: BarChart3 },
    { id: 'submissions', name: 'Email Submissions', icon: Mail },
    { id: 'settings', name: 'Settings', icon: Settings },
  ]

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - AmplifyROI</title>
        <meta name="description" content="Administrative dashboard for AmplifyROI analytics and management." />
      </Helmet>

      <div className="min-h-screen bg-gradient-bg py-8">
        <div className="container-custom max-w-7xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-accent-900 mb-2">Admin Dashboard</h1>
            <p className="text-xl text-accent-600">
              Monitor usage analytics and manage AmplifyROI
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="card mb-8">
            <div className="flex space-x-1 bg-accent-100 rounded-lg p-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-white text-primary-700 shadow-sm'
                        : 'text-accent-600 hover:text-accent-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-accent-500">Total Calculations</p>
                        <p className="text-2xl font-bold text-accent-900">12,847</p>
                      </div>
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                        <BarChart3 className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-accent-500">Active Users</p>
                        <p className="text-2xl font-bold text-accent-900">3,428</p>
                      </div>
                      <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-success-600" />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-accent-500">PDF Exports</p>
                        <p className="text-2xl font-bold text-accent-900">8,921</p>
                      </div>
                      <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                        <Download className="w-6 h-6 text-warning-600" />
                      </div>
                    </div>
                  </div>

                  <div className="card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-accent-500">Growth Rate</p>
                        <p className="text-2xl font-bold text-success-600">+23%</p>
                      </div>
                      <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-success-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Charts Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="card">
                    <h3 className="text-lg font-semibold text-accent-900 mb-4">Popular Business Types</h3>
                    <div className="h-64 bg-accent-100 rounded-lg flex items-center justify-center">
                      <p className="text-accent-500">Chart placeholder</p>
                    </div>
                  </div>

                  <div className="card">
                    <h3 className="text-lg font-semibold text-accent-900 mb-4">Usage Over Time</h3>
                    <div className="h-64 bg-accent-100 rounded-lg flex items-center justify-center">
                      <p className="text-accent-500">Chart placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'submissions' && (
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-accent-900">Email Submissions</h3>
                  <button className="btn-primary btn-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-accent-200">
                        <th className="text-left py-3 text-accent-600">Email</th>
                        <th className="text-left py-3 text-accent-600">Date</th>
                        <th className="text-left py-3 text-accent-600">Business Type</th>
                        <th className="text-left py-3 text-accent-600">Scenario</th>
                        <th className="text-left py-3 text-accent-600">ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-accent-100">
                        <td className="py-3">user@example.com</td>
                        <td className="py-3">2025-01-15</td>
                        <td className="py-3">SaaS</td>
                        <td className="py-3">SMB SaaS</td>
                        <td className="py-3 text-success-600 font-medium">45.2%</td>
                      </tr>
                      <tr>
                        <td className="py-3 text-center text-accent-500" colSpan={5}>
                          No submissions data available
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="card">
                <h3 className="text-lg font-semibold text-accent-900 mb-6">Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Admin Password</label>
                    <input
                      type="password"
                      placeholder="Current password"
                      className="form-input"
                      disabled
                    />
                    <p className="form-help">Password is managed via environment variables</p>
                  </div>
                  
                  <div>
                    <label className="form-label">Analytics Tracking</label>
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm text-accent-700">Enable usage analytics</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="form-label">Data Retention</label>
                    <select className="form-input">
                      <option>30 days</option>
                      <option>90 days</option>
                      <option>1 year</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard