import React from 'react';
import { ShieldCheck, Scale, FileText, Lock, AlertCircle } from 'lucide-react';

const TermsAndConditions: React.FC = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Terms & Conditions</h1>
          <p className="text-slate-500 text-lg">Last updated: May 24, 2025</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12 space-y-12">
            
            {/* Introduction */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-accent rounded-lg">
                  <FileText className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">1. Introduction</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Welcome to DeepNeurax Technologies. These Terms and Conditions govern your use of our website and services. By accessing or using our website, you agree to be bound by these terms. If you disagree with any part of these terms, you may not access our services.
              </p>
            </section>

            {/* Intellectual Property */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-accent rounded-lg">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">2. Intellectual Property</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                The content, features, and functionality of this website, including but not limited to text, graphics, logos, and software, are the exclusive property of DeepNeurax Technologies and are protected by international copyright, trademark, and other intellectual property laws.
              </p>
            </section>

            {/* User Responsibilities */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-accent rounded-lg">
                  <Scale className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">3. User Responsibilities</h2>
              </div>
              <ul className="list-disc list-inside space-y-2 text-slate-600 ml-2">
                <li>You must not use our website for any unlawful purpose.</li>
                <li>You agree not to compromise the security of the website.</li>
                <li>You must not attempt to access restricted areas of our systems.</li>
                <li>You are responsible for maintaining the confidentiality of your account information.</li>
              </ul>
            </section>

            {/* Privacy & Data */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-accent rounded-lg">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">4. Privacy & Data Security</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Your privacy is paramount to us. Our use of your personal information is governed by our Privacy Policy. By using our services, you consent to the processing of your data as described therein. We employ enterprise-grade security measures (SOC-compliant processes) to protect your data.
              </p>
            </section>

            {/* Liability */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-50 text-accent rounded-lg">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">5. Limitation of Liability</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                In no event shall DeepNeurax Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
              </p>
            </section>

            {/* Contact */}
            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Have Questions?</h2>
              <p className="text-slate-600 mb-4">
                If you have any questions about these Terms, please contact us.
              </p>
              <div className="text-accent font-semibold">
                support@deepneurax.com
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;