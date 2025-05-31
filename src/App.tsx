
import { Routes, Route } from 'react-router-dom';
import Layout from '@/layout/Layout';
import LandingPage from '@/pages/LandingPage';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Features from '@/pages/Features';
import NotFound from '@/pages/NotFound';
import MainDashboard from '@/components/MainDashboard';
import FormBuilder from '@/components/FormBuilder';
import Forms from '@/components/Forms';
import Submissions from '@/components/Submissions';
import FormSubmission from '@/components/FormSubmission';
import FormPreviewPage from '@/pages/FormPreview';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';
import PlanSelection from './components/PlanSelection';
import PaymentMethod from './components/PaymentMethod';
import PaymentSuccess from './components/PaymentSuccess';
import { EnhancedUserSettings } from './components/settings/EnhancedUserSettings';
import ProfessionalTools from './components/ProfessionalTools';
import ToolRouter from './components/tools/ToolRouter';


function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Layout>
          <Routes>
      
                      <Route path="/" element={<LandingPage/>} />
                      <Route path="/dashboard" element={<MainDashboard />} />
                      <Route path="/forms" element={<Forms />} />
                      <Route path="/create" element={<FormBuilder />} />
                      <Route path="/form-builder/:id" element={<FormBuilder />} />
                      <Route path="/form/:id" element={<FormSubmission />} />
                       <Route path="/form-preview/:formId" element={<FormPreviewPage />} />
                      <Route path="/select-plan" element={<PlanSelection />} />
                      <Route path="/payment" element={<PaymentMethod />} />
                      <Route path="/payment-success" element={<PaymentSuccess />} />
                      <Route path="/settings" element={<EnhancedUserSettings />} />
                      <Route path="/tools" element={<ProfessionalTools />} />
                      <Route path="/tools/:toolId" element={<ToolRouter />} />
                      <Route path="/features" element={<Features />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
