
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
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
import FormPreview from '@/pages/FormPreview';
import FormSubmissions from '@/pages/FormSubmissions';
import ProfilePage from '@/pages/ProfilePage';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import PlanSelection from './components/PlanSelection';
import PaymentMethod from './components/PaymentMethod';
import PaymentSuccess from './components/PaymentSuccess';
import { EnhancedUserSettings } from './components/settings/EnhancedUserSettings';
import ProfessionalTools from './components/ProfessionalTools';
import ToolRouter from './components/tools/ToolRouter';
import FormsPage from './pages/platforms/FormsPage';
import ResumePage from './pages/platforms/ResumePage';
import { EmailVerification } from './components/auth/EmailVerification';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage/>} />
              <Route path="/dashboard" element={<MainDashboard />} />
              
              {/* Platform Routes */}
              <Route path="/platform/forms" element={<FormsPage />} />
              <Route path="/platform/resume" element={<ResumePage />} />
              <Route path="/platform/website" element={<div>Website Builder Coming Soon</div>} />
              <Route path="/platform/ecommerce" element={<div>E-Commerce Builder Coming Soon</div>} />
              <Route path="/platform/presentation" element={<div>Presentation Builder Coming Soon</div>} />
              <Route path="/platform/portfolio" element={<div>Portfolio Builder Coming Soon</div>} />
              
              {/* Form Submissions Route */}
              <Route path="/form-submissions/:formId" element={<FormSubmissions />} />
              
              {/* Profile and Settings */}
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<EnhancedUserSettings />} />
              
              {/* Legacy Form Builder Routes */}
              <Route path="/forms" element={<Forms />} />
              <Route path="/create" element={<FormBuilder />} />
              <Route path="/form-builder/:id" element={<FormBuilder />} />
              <Route path="/form/:id" element={<FormSubmission />} />
              <Route path="/form-preview/:formId" element={<FormPreview />} />
              <Route path="/select-plan" element={<PlanSelection />} />
              <Route path="/payment" element={<PaymentMethod />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/tools" element={<ProfessionalTools />} />
              <Route path="/tools/:toolId" element={<ToolRouter />} />
              <Route path="/features" element={<Features />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <EmailVerification />
            <Toaster />
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
