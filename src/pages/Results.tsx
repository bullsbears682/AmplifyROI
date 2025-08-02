import { Helmet } from 'react-helmet-async'
import { BarChart3 } from 'lucide-react'

const Results = () => {
  return (
    <>
      <Helmet>
        <title>ROI Results - AmplifyROI</title>
        <meta name="description" content="View your ROI calculation results with detailed charts and analysis." />
      </Helmet>

      <div className="min-h-screen bg-gradient-bg py-8">
        <div className="container-custom max-w-6xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-success-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-accent-900 mb-2">ROI Results</h1>
            <p className="text-xl text-accent-600">
              Your return on investment analysis and insights
            </p>
          </div>

          <div className="card">
            <p className="text-center text-accent-600">
              Results dashboard coming soon...
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Results