import { Helmet } from 'react-helmet-async'
import { FileText } from 'lucide-react'

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - AmplifyROI</title>
        <meta name="description" content="Terms of service for AmplifyROI - Legal terms and conditions for using our ROI calculator." />
      </Helmet>

      <div className="min-h-screen bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-accent-900 mb-4">Terms of Service</h1>
            <p className="text-xl text-accent-600">
              Last updated: January 15, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-accent-700 leading-relaxed">
                  By accessing and using AmplifyROI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">2. Description of Service</h2>
                <p className="text-accent-700 leading-relaxed mb-4">
                  AmplifyROI is a web-based ROI (Return on Investment) calculator that provides:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-accent-700">
                  <li>Business ROI calculations based on user inputs</li>
                  <li>Country-specific tax rate applications</li>
                  <li>Business scenario templates and examples</li>
                  <li>PDF export and email delivery of results</li>
                  <li>Interactive charts and visualizations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">3. Use License</h2>
                <p className="text-accent-700 leading-relaxed mb-4">
                  Permission is granted to temporarily use AmplifyROI for personal and commercial purposes. This license shall automatically terminate if you violate any of these restrictions.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-accent-900 mb-2">You may:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-accent-700">
                      <li>Use the calculator for legitimate business purposes</li>
                      <li>Export and share calculation results</li>
                      <li>Reference our service in your business documents</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-accent-900 mb-2">You may not:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-accent-700">
                      <li>Modify or copy the service materials</li>
                      <li>Use the materials for commercial purposes without permission</li>
                      <li>Attempt to reverse engineer any software</li>
                      <li>Remove any copyright or proprietary notations</li>
                      <li>Transfer materials to another person</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">4. Disclaimer</h2>
                <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg mb-4">
                  <p className="text-warning-800 font-medium">
                    Important: AmplifyROI provides estimates and should not be considered professional financial advice.
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-accent-700">
                  <li>Calculations are estimates based on provided inputs and assumptions</li>
                  <li>Tax rates and business data are for informational purposes only</li>
                  <li>Results should be verified with qualified professionals</li>
                  <li>We do not guarantee accuracy of third-party data sources</li>
                  <li>The service is provided "as is" without warranties</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">5. Limitations of Liability</h2>
                <p className="text-accent-700 leading-relaxed">
                  In no event shall AmplifyROI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use AmplifyROI, even if AmplifyROI or its authorized representatives have been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">6. Data Accuracy and Sources</h2>
                <p className="text-accent-700 leading-relaxed mb-4">
                  We strive to provide accurate and up-to-date information, but we cannot guarantee:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-accent-700">
                  <li>Complete accuracy of tax rates and financial data</li>
                  <li>Real-time updates to changing regulations</li>
                  <li>Applicability to specific business circumstances</li>
                  <li>Compliance with local laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">7. User Conduct</h2>
                <p className="text-accent-700 leading-relaxed mb-4">
                  Users agree to use AmplifyROI responsibly and not to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-accent-700">
                  <li>Input false or misleading information deliberately</li>
                  <li>Attempt to overload or disrupt the service</li>
                  <li>Use automated tools to access the service excessively</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">8. Intellectual Property</h2>
                <p className="text-accent-700 leading-relaxed">
                  All content, features, and functionality of AmplifyROI are owned by us, our licensors, or other providers and are protected by copyright, trademark, patent, trade secret, and other intellectual property laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">9. Privacy and Data Protection</h2>
                <p className="text-accent-700 leading-relaxed">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">10. Service Availability</h2>
                <p className="text-accent-700 leading-relaxed">
                  We strive to maintain high availability but do not guarantee uninterrupted access. The service may be temporarily unavailable due to maintenance, updates, or technical issues. We reserve the right to modify or discontinue the service at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">11. Third-Party Links and Services</h2>
                <p className="text-accent-700 leading-relaxed">
                  AmplifyROI may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party sites or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">12. Modifications to Terms</h2>
                <p className="text-accent-700 leading-relaxed">
                  We reserve the right to revise these terms of service at any time without notice. By using this web site, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">13. Termination</h2>
                <p className="text-accent-700 leading-relaxed">
                  We may terminate or suspend your access to the service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">14. Governing Law</h2>
                <p className="text-accent-700 leading-relaxed">
                  These Terms shall be interpreted and governed by the laws of the jurisdiction in which AmplifyROI operates, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">15. Contact Information</h2>
                <p className="text-accent-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 p-4 bg-accent-50 rounded-lg">
                  <p className="text-accent-700">
                    <strong>Email:</strong> legal@amplifyroi.com<br />
                    <strong>Response Time:</strong> Within 5 business days<br />
                    <strong>Subject Line:</strong> "Terms of Service Inquiry"
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsOfService