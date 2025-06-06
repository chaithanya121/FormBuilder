
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './components/theme-provider';
import { AuthProvider } from './hooks/use-auth';
import { Toaster } from './components/ui/toaster';
import Layout from './layout/Layout';
import FormBuilder from './components/FormBuilder';
import FormPreview from '@/components/FormBuilder/FormPreview';
import FormSubmissions from './pages/FormSubmissions';
import AIChatInterface from './pages/AIChatInterface';
import FormBuilderDashboard from '@/components/FormBuilder/FormBuilderDashboard';
import LandingPage from '@/pages/LandingPage';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Features from '@/pages/Features';
import NotFound from '@/pages/NotFound';
import MainDashboard from '@/components/MainDashboard';
import Forms from '@/components/Forms';
import FormSubmission from '@/components/FormSubmission';
import ProfilePage from '@/pages/ProfilePage';
import PlanSelection from './components/PlanSelection';
import PaymentMethod from './components/PaymentMethod';
import PaymentSuccess from './components/PaymentSuccess';
import { EnhancedUserSettings } from './components/settings/EnhancedUserSettings';
import ProfessionalTools from './components/ProfessionalTools';
import ToolRouter from './components/tools/ToolRouter';
import ResumePage from './pages/platforms/ResumePage';
import { EmailVerification } from './components/auth/EmailVerification';
import ResumeBuilderStudio from './components/ResumeBuilder/ResumeBuilderStudio';
import EnhancedFormWizard from './components/Enhanced/EnhancedFormWizard';
import PersonalizedDashboard from './components/PersonalizedDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <AuthProvider>
            <div className="flex min-h-screen w-full">
              <Routes>
                <Route path="/" element={<Layout><LandingPage /></Layout>} />
                <Route path="/dashboard" element={<Layout><PersonalizedDashboard /></Layout>} />
                <Route path="/platform/forms" element={<Layout><FormBuilderDashboard /></Layout>} />
                <Route path="/platform/resume" element={<Layout><ResumePage /></Layout>} />
                <Route path="/platform/website" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-600">Website Builder Coming Soon</h1></div></Layout>} />
                <Route path="/platform/ecommerce" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-600">E-Commerce Builder Coming Soon</h1></div></Layout>} />
                <Route path="/platform/presentation" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-600">Presentation Builder Coming Soon</h1></div></Layout>} />
                <Route path="/platform/portfolio" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-600">Portfolio Builder Coming Soon</h1></div></Layout>} />
                
                {/* Form Creation and Wizard */}
                <Route path="/form-wizard" element={<Layout><EnhancedFormWizard /></Layout>} />
                <Route path="/form-builder/:id?" element={<Layout><FormBuilder /></Layout>} />
                <Route path="/form-preview/:id" element={<Layout><FormPreview formConfig={{
                  name: 'Preview Form',
                  elements: [],
                  settings: {
                    submitButton: { text: 'Submit' },
                    canvasStyles: {}
                  }
                }} /></Layout>} />
                <Route path="/form-submissions/:formId" element={<Layout><FormSubmissions /></Layout>} />
                <Route path="/forms/:id/submissions" element={<Layout><FormSubmissions /></Layout>} />
                
                {/* Resume Builder */}
                <Route path="/resume-builder" element={<Layout><ResumeBuilderStudio /></Layout>} />
                <Route path="/resume-builder/:id" element={<Layout><ResumeBuilderStudio /></Layout>} />
                
                {/* Legacy and Additional Routes */}
                <Route path="/forms" element={<Layout><Forms /></Layout>} />
                <Route path="/create" element={<Layout><EnhancedFormWizard /></Layout>} />
                <Route path="/form/:id" element={<Layout><FormSubmission /></Layout>} />
                <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
                <Route path="/settings" element={<Layout><EnhancedUserSettings /></Layout>} />
                <Route path="/select-plan" element={<Layout><PlanSelection /></Layout>} />
                <Route path="/payment" element={<Layout><PaymentMethod /></Layout>} />
                <Route path="/payment-success" element={<Layout><PaymentSuccess /></Layout>} />
                <Route path="/tools" element={<Layout><ProfessionalTools /></Layout>} />
                <Route path="/tools/:toolId" element={<Layout><ToolRouter /></Layout>} />
                <Route path="/ai-chat" element={<Layout><AIChatInterface /></Layout>} />
                <Route path="/features" element={<Layout><Features /></Layout>} />
                <Route path="/about" element={<Layout><About /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />
                <Route path="*" element={<Layout><NotFound /></Layout>} />
              </Routes>
              <EmailVerification />
              <Toaster />
            </div>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
