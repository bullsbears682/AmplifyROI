import { Helmet } from 'react-helmet-async'
import { Shield } from 'lucide-react'

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - AmplifyROI</title>
        <meta name="description" content="Privacy policy for AmplifyROI - GDPR compliant data handling and user privacy protection." />
      </Helmet>

      <div className="min-h-screen bg-white py-16">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-accent-900 mb-4">Privacy Policy</h1>
            <p className="text-xl text-accent-600">
              Last updated: January 15, 2025
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">1. Introduction</h2>
                <p className="text-accent-700 leading-relaxed">
                  AmplifyROI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our ROI calculator application.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">2. Information We Collect</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-accent-900 mb-2">Information You Provide</h3>
                    <ul className="list-disc pl-6 space-y-2 text-accent-700">
                      <li>Email address (only when you choose to receive calculation results)</li>
                      <li>Business metrics and financial data you input into the calculator</li>
                      <li>Country and business type selections</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-accent-900 mb-2">Automatically Collected Information</h3>
                    <ul className="list-disc pl-6 space-y-2 text-accent-700">
                      <li>Browser type and version</li>
                      <li>Device information and screen resolution</li>
                      <li>IP address (anonymized)</li>
                      <li>Usage patterns and interaction data</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">3. How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2 text-accent-700">
                  <li>To provide and improve our ROI calculation services</li>
                  <li>To send calculation results via email (when requested)</li>
                  <li>To analyze usage patterns and improve user experience</li>
                  <li>To ensure technical functionality and security</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">4. Data Storage and Security</h2>
                <p className="text-accent-700 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-accent-700">
                  <li>Data is stored locally in your browser when possible</li>
                  <li>Email data is encrypted in transit and at rest</li>
                  <li>Access to personal data is restricted to authorized personnel only</li>
                  <li>Regular security assessments and updates</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">5. Your Rights (GDPR)</h2>
                <p className="text-accent-700 leading-relaxed mb-4">
                  Under the General Data Protection Regulation (GDPR), you have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-accent-700">
                  <li><strong>Right of Access:</strong> You can request information about your personal data</li>
                  <li><strong>Right to Rectification:</strong> You can request correction of inaccurate data</li>
                  <li><strong>Right to Erasure:</strong> You can request deletion of your personal data</li>
                  <li><strong>Right to Restrict Processing:</strong> You can limit how we use your data</li>
                  <li><strong>Right to Data Portability:</strong> You can request your data in a portable format</li>
                  <li><strong>Right to Object:</strong> You can object to certain types of processing</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">6. Cookies and Tracking</h2>
                <p className="text-accent-700 leading-relaxed mb-4">
                  We use cookies and similar technologies to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-accent-700">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website usage and performance</li>
                  <li>Provide personalized content</li>
                </ul>
                <p className="text-accent-700 leading-relaxed mt-4">
                  You can control cookie settings through your browser preferences. Some features may not function properly if cookies are disabled.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">7. Third-Party Services</h2>
                <p className="text-accent-700 leading-relaxed">
                  We may use third-party services for analytics and functionality. These services have their own privacy policies:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-accent-700 mt-4">
                  <li>Analytics providers (anonymized data only)</li>
                  <li>Email delivery services</li>
                  <li>Cloud hosting providers</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">8. Data Retention</h2>
                <p className="text-accent-700 leading-relaxed">
                  We retain personal information only as long as necessary for the purposes outlined in this policy or as required by law. Email addresses for result delivery are retained for 30 days unless you request earlier deletion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">9. International Transfers</h2>
                <p className="text-accent-700 leading-relaxed">
                  Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for international transfers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">10. Children's Privacy</h2>
                <p className="text-accent-700 leading-relaxed">
                  Our service is not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">11. Changes to This Policy</h2>
                <p className="text-accent-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-accent-900 mb-4">12. Contact Us</h2>
                <p className="text-accent-700 leading-relaxed">
                  If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <div className="mt-4 p-4 bg-accent-50 rounded-lg">
                  <p className="text-accent-700">
                    <strong>Email:</strong> privacy@amplifyroi.com<br />
                    <strong>Response Time:</strong> Within 30 days<br />
                    <strong>Data Protection Officer:</strong> dpo@amplifyroi.com
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

export default PrivacyPolicy