import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calculator, BarChart3, Settings, Home, BookOpen } from 'lucide-react'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation()
  
  const isActive = (path: string) => {
    return location.pathname === path
  }
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Calculator', href: '/setup', icon: Calculator },
    { name: 'Scenarios', href: '/scenarios', icon: BookOpen },
    { name: 'Results', href: '/results', icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-accent-200 sticky top-0 z-40">
        <div className="container-custom">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AmplifyROI</span>
            </Link>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      isActive(item.href)
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-accent-600 hover:text-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
            
            {/* Admin Link (Hidden) */}
            <Link
              to="/admin"
              className="hidden md:flex items-center space-x-2 px-3 py-2 text-sm text-accent-500 hover:text-accent-700 transition-colors duration-200"
            >
              <Settings className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-accent-200">
          <nav className="flex justify-around py-2">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-primary-700'
                      : 'text-accent-600 hover:text-primary-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-accent-900 text-accent-300">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AmplifyROI</span>
              </div>
              <p className="text-accent-400 mb-4 max-w-md">
                Professional ROI calculator designed to help businesses make informed 
                investment decisions with precision and confidence.
              </p>
              <div className="flex space-x-4 text-sm">
                <span>© 2025 AmplifyROI</span>
                <span>•</span>
                <span>All rights reserved</span>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/scenarios" className="hover:text-white transition-colors duration-200">
                    Business Scenarios
                  </Link>
                </li>
                <li>
                  <Link to="/setup" className="hover:text-white transition-colors duration-200">
                    Start Calculator
                  </Link>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors duration-200">
                    About
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/privacy" className="hover:text-white transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white transition-colors duration-200">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <a href="mailto:support@amplifyroi.com" className="hover:text-white transition-colors duration-200">
                    Contact Support
                  </a>
                </li>
                <li>
                  <a href="mailto:feedback@amplifyroi.com" className="hover:text-white transition-colors duration-200">
                    Send Feedback
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-accent-800 mt-8 pt-8 text-center text-sm">
            <p>
              Built with ❤️ for businesses worldwide. 
              Designed to be GDPR compliant and accessibility-friendly.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout