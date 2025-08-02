import { Helmet } from 'react-helmet-async'
import { Calculator as CalculatorIcon } from 'lucide-react'

const Calculator = () => {
  return (
    <>
      <Helmet>
        <title>ROI Calculator - AmplifyROI</title>
        <meta name="description" content="Calculate your business ROI with our comprehensive calculator form." />
      </Helmet>

      <div className="min-h-screen bg-gradient-bg py-8">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CalculatorIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-accent-900 mb-2">ROI Calculator</h1>
            <p className="text-xl text-accent-600">
              Input your business metrics to calculate return on investment
            </p>
          </div>

          <div className="card">
            <p className="text-center text-accent-600">
              Calculator form coming soon...
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Calculator