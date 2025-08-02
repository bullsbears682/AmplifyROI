import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  Calculator, 
  Globe, 
  BarChart3, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Building,
  Rocket,
  Target
} from 'lucide-react'

const LandingPage = () => {
  const features = [
    {
      icon: Globe,
      title: '25+ Countries Supported',
      description: 'Accurate tax rates and currency calculations for businesses worldwide'
    },
    {
      icon: Building,
      title: '35+ Business Types',
      description: 'From startups to enterprises, with 7 realistic scenarios each'
    },
    {
      icon: BarChart3,
      title: 'Interactive Charts',
      description: 'Visualize your ROI with professional charts and graphs'
    },
    {
      icon: Shield,
      title: 'GDPR Compliant',
      description: 'Privacy-first design with no user accounts required'
    },
    {
      icon: Zap,
      title: 'Real-time Calculations',
      description: 'Instant results with what-if scenario modeling'
    },
    {
      icon: Target,
      title: '2025 Data Accuracy',
      description: 'Latest tax rates and financial metrics for precise calculations'
    }
  ]

  const benefits = [
    'Make informed investment decisions',
    'Compare multiple business scenarios',
    'Export professional PDF reports',
    'Email results to stakeholders',
    'No registration required',
    'Mobile-friendly interface'
  ]

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
        duration: 0.5
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>AmplifyROI - Professional ROI Calculator for Businesses</title>
        <meta name="description" content="Calculate your business ROI with precision using our comprehensive calculator. Support for 35+ business types, 25+ countries, and real-time financial modeling." />
        <meta name="keywords" content="ROI calculator, return on investment, business calculator, profit calculator, investment analysis" />
      </Helmet>

      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-32">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
                <Rocket className="w-4 h-4 mr-2" />
                New: 2025 Tax Rates & Business Scenarios
              </span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-balance mb-6">
              Calculate Your Business ROI with{' '}
              <span className="gradient-text">Professional Precision</span>
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl text-accent-600 mb-8 max-w-2xl mx-auto">
              Make informed investment decisions with our comprehensive ROI calculator. 
              Supporting 35+ business types, 25+ countries, and real-time financial modeling.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/setup"
                className="btn-primary btn-xl group"
              >
                Start Calculating ROI
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/scenarios"
                className="btn-outline btn-xl"
              >
                Browse Scenarios
              </Link>
            </motion.div>
            
            <motion.p variants={itemVariants} className="text-sm text-accent-500 mt-4">
              No registration required • Free to use • GDPR compliant
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4">Everything You Need for Accurate ROI Analysis</h2>
            <p className="text-xl text-accent-600 max-w-2xl mx-auto">
              Built with modern businesses in mind, our calculator provides the tools and accuracy you need.
            </p>
          </div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="card-hover text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-accent-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-accent-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6">Why Choose AmplifyROI?</h2>
              <p className="text-xl text-accent-600 mb-8">
                Our calculator is designed by finance professionals for businesses of all sizes. 
                Get the insights you need to make confident investment decisions.
              </p>
              
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0" />
                    <span className="text-accent-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="card p-8 bg-gradient-to-br from-primary-50 to-accent-50 border-primary-200">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-accent-900">Sample ROI Calculation</h3>
                    <p className="text-sm text-accent-600">SaaS Startup • United States</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-success-600" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-accent-600">Monthly Investment</span>
                    <span className="font-semibold">$50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-accent-600">Monthly Return</span>
                    <span className="font-semibold">$85,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-accent-600">Net Profit</span>
                    <span className="font-semibold text-success-600">$35,000</span>
                  </div>
                  <div className="border-t border-accent-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-accent-900 font-semibold">ROI</span>
                      <span className="text-2xl font-bold text-success-600">70%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="mb-4">Trusted by Businesses Worldwide</h2>
            <p className="text-xl text-accent-600">
              Join thousands of companies making smarter investment decisions
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">35+</div>
              <div className="text-accent-600">Business Types</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">245</div>
              <div className="text-accent-600">Scenarios Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">25+</div>
              <div className="text-accent-600">Countries Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">99.9%</div>
              <div className="text-accent-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-white mb-4">Ready to Calculate Your ROI?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Start making data-driven investment decisions today. 
            No signup required, completely free to use.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/setup"
              className="btn bg-white text-primary-600 hover:bg-primary-50 btn-xl"
            >
              <Calculator className="w-5 h-5 mr-2" />
              Start Your ROI Calculation
            </Link>
            <Link
              to="/scenarios"
              className="btn bg-transparent text-white border-white hover:bg-white/10 btn-xl"
            >
              <Users className="w-5 h-5 mr-2" />
              Explore Business Scenarios
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default LandingPage