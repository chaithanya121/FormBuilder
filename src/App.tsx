import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

// Layout
import Layout from '@/layout/Layout';

// Pages
import LandingPage from '@/pages/LandingPage';
import Index from '@/pages/Index';
import MainDashboard from '@/components/MainDashboard';
import FormBuilder from '@/components/FormBuilder';
import Dashboard from '@/components/Dashboard';
import FormSubmission from '@/components/FormSubmission';
import { ToolRouter } from '@/components/tools/ToolRouter';
import { AIFormGenerator } from '@/components/tools/ai/AIFormGenerator';

// Other pages
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Features from '@/pages/Features';
import NotFound from '@/pages/NotFound';
import FormPreview from '@/pages/FormPreview';
import FormSubmissions from '@/pages/FormSubmissions';
import FormsPage from '@/pages/platforms/FormsPage';
import ResumePage from '@/pages/platforms/ResumePage';
import ProfilePage from '@/pages/ProfilePage';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>
            <Layout>
              <Routes>
                {/* Main Routes */}
                <Route path="/" element={<MainDashboard />} />
                <Route path="/dashboard" element={<MainDashboard />} />
                <Route path="/forms" element={<Index />} />
                <Route path="/form-dashboard" element={<Dashboard />} />
                
                {/* Form Builder Routes */}
                <Route path="/form-builder/:formId?" element={<FormBuilder />} />
                <Route path="/create" element={<FormBuilder />} />
                <Route path="/form/:formId" element={<FormSubmission />} />
                <Route path="/form-preview/:formId" element={<FormPreview />} />
                <Route path="/form-submissions/:formId" element={<FormSubmissions />} />
                
                {/* Tools and AI Routes */}
                <Route path="/tools/*" element={<ToolRouter />} />
                <Route path="/ai-generator" element={<AIFormGenerator />} />
                
                {/* Platform Routes */}
                <Route path="/platforms/forms" element={<FormsPage />} />
                <Route path="/platforms/resume" element={<ResumePage />} />
                
                {/* Static Pages */}
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/features" element={<Features />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/landing" element={<LandingPage />} />
                
                {/* Catch all - 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
