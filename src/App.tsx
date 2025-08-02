import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import CookieConsent from 'react-cookie-consent'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import SetupWizard from './pages/SetupWizard'
import Calculator from './pages/Calculator'
import Results from './pages/Results'
import ScenariosPage from './pages/ScenariosPage'
import AdminDashboard from './pages/AdminDashboard'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'

function App() {
  return (
    <>
      <Helmet>
        <title>AmplifyROI - Professional ROI Calculator</title>
        <meta name="description" content="Calculate your business ROI with precision using our comprehensive calculator with 35+ business types and scenarios." />
      </Helmet>
      
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/setup" element={<SetupWizard />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/results" element={<Results />} />
          <Route path="/scenarios" element={<ScenariosPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
        </Routes>
      </Layout>
      
      <CookieConsent
        location="bottom"
        buttonText="Accept All Cookies"
        declineButtonText="Decline"
        enableDeclineButton
        cookieName="AmplifyROI-cookie-consent"
        style={{
          background: '#1e293b',
          color: '#f1f5f9',
          fontSize: '14px',
          padding: '20px',
        }}
        buttonStyle={{
          background: '#0ea5e9',
          color: '#ffffff',
          fontSize: '14px',
          borderRadius: '8px',
          padding: '10px 20px',
          border: 'none',
          cursor: 'pointer',
        }}
        declineButtonStyle={{
          background: 'transparent',
          color: '#94a3b8',
          fontSize: '14px',
          borderRadius: '8px',
          padding: '10px 20px',
          border: '1px solid #475569',
          cursor: 'pointer',
          marginRight: '10px',
        }}
        expires={365}
        overlay
      >
        <div>
          <p className="mb-2">
            We use cookies to enhance your experience and provide personalized content. 
            By continuing to use our site, you consent to our use of cookies.
          </p>
          <p className="text-sm text-slate-300">
            Read our{' '}
            <a href="/privacy" className="text-primary-400 hover:text-primary-300 underline">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="text-primary-400 hover:text-primary-300 underline">
              Terms of Service
            </a>{' '}
            for more information.
          </p>
        </div>
      </CookieConsent>
    </>
  )
}

export default App