
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
import FormBuilderDashboardWithPagination from '@/components/FormBuilder/FormBuilderDashboardWithPagination';
import LandingPage from '@/pages/LandingPage';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Features from '@/pages/Features';
import NotFound from '@/pages/NotFound';
import MainDashboard from '@/components/MainDashboard';
import Forms from '@/components/Forms';
import FormSubmission from '@/components/FormSubmission';
import ProfilePage from '@/pages/ProfilePage';
import FormBuilderDashboard from './components/FormBuilder/FormBuilderDashboard';
import PlanSelection from './components/PlanSelection';
import PaymentMethod from './components/PaymentMethod';
import PaymentSuccess from './components/PaymentSuccess';
import { EnhancedUserSettings } from './components/settings/EnhancedUserSettings';
import ProfessionalTools from './components/ProfessionalTools';
import ToolRouter from './components/tools/ToolRouter';
import ResumePage from './pages/platforms/ResumePage';
import { EmailVerification } from './components/auth/EmailVerification';
import EnhancedFormWizard from './components/Enhanced/EnhancedFormWizard';
import PersonalizedDashboard from './components/PersonalizedDashboard';
import ESMRouter from './components/ESM/ESMRouter';

// Import onboarding components for direct access
import SplashScreen from './components/ESM/onboarding/SplashScreen';
import RoleSelection from './components/ESM/onboarding/RoleSelection';
import SignUpForm from './components/ESM/onboarding/SignUpForm';
import MFAScreen from './components/ESM/onboarding/MFAScreen';
import ProfileSetup from './components/ESM/onboarding/ProfileSetup';

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
                <Route path="/resume-builder/:id" element={<Layout><ResumePage /></Layout>} />
                
                {/* ESM Platform Routes - No Layout wrapper since ESM has its own auth flow */}
                <Route path="/platform/esm/*" element={<ESMRouter />} />
                
                <Route path="/platform/website" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-600">Website Builder Coming Soon</h1></div></Layout>} />
                <Route path="/platform/ecommerce" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-600">E-Commerce Builder Coming Soon</h1></div></Layout>} />
                <Route path="/platform/presentation" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-600">Presentation Builder Coming Soon</h1></div></Layout>} />
                <Route path="/platform/portfolio" element={<Layout><div className="p-8 text-center"><h1 className="text-2xl font-bold text-gray-600">Portfolio Builder Coming Soon</h1></div></Layout>} />
                
                {/* Direct onboarding routes (for backwards compatibility) */}
                <Route path="/splash" element={<SplashScreen />} />
                <Route path="/onboarding/role-selection" element={<RoleSelection />} />
                <Route path="/onboarding/signup/:role" element={<SignUpForm />} />
                <Route path="/onboarding/mfa" element={<MFAScreen />} />
                <Route path="/onboarding/profile-setup" element={<ProfileSetup />} />
                <Route path="/onboarding/profile-setup/:role" element={<ProfileSetup />} />
                
                {/* Form Creation and Wizard */}
                <Route path="/form-wizard" element={<Layout><EnhancedFormWizard /></Layout>} />
                <Route path="/form-builder/:id?" element={<Layout><FormBuilder /></Layout>} />
                <Route path="/form-preview/:id" element={<FormPreview formConfig={{
                  name: 'Preview Form',
                  elements: [],
                  settings: {
                    submitButton: { text: 'Submit' },
                    canvasStyles: {},
                    logo: {
                      enabled: false,
                      url: '',
                      width: 100,
                      height: 100,
                      position: { top: 20, left: 20 },
                      opacity: 1,
                      borderRadius: 0
                    },
                    preview: { width: "Full", nesting: false },
                    validation: { liveValidation: "Default" },
                    layout: {
                      size: "Default",
                      columns: { default: true, tablet: true, desktop: true },
                      labels: "Default", 
                      placeholders: "Default", 
                      errors: "Default",
                      messages: "Default",
                      questionSpacing: 24,
                      labelAlignment: "top"
                    },
                    termsAndConditions: {
                      enabled: false,
                      required: false,
                      text: "I accept the Terms & Conditions"
                    },
                    calculations: {
                      enabled: false,
                      fields: []
                    },
                    notifications: {
                      enabled: false,
                      rules: []
                    },
                    integrations: {
                      api: false,
                      cloudStorage: {
                        enabled: false,
                        providers: []
                      },
                      database: {
                        enabled: false,
                        type: "",
                        connectionString: ""
                      },
                      realTimeTracking: true
                    },
                    accessibility: {
                      screenReader: true,
                      wcagCompliant: true,
                      highContrast: false
                    },
                    collaboration: {
                      comments: true,
                      assignments: true,
                      workflow: false
                    },
                    mobileLayout: {
                      responsive: true,
                      customBreakpoints: {
                        mobile: 768,
                        tablet: 1024,
                        desktop: 1200
                      },
                      mobileSpecificElements: []
                    }
                  }
                }} isPreviewMode={true} />} />
                <Route path="/form-submissions/:formId" element={<Layout><FormSubmissions /></Layout>} />
                <Route path="/forms/:id/submissions" element={<Layout><FormSubmissions /></Layout>} />
                
                {/* Resume Builder */}
                <Route path="/resume-builder" element={<Layout><ResumePage /></Layout>} />
                
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
