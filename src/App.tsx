
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';
import Index from "./pages/Index";
import FormBuilder from "./components/FormBuilder";
import FormPreview from "./pages/FormPreview";
import PlatformDashboard from "./pages/PlatformDashboard";
import PersonalizedDashboard from "./pages/PersonalizedDashboard";
import AdminDashboard from "./components/Enhanced/AdminDashboard";
import EnhancedFormWizard from "./components/Enhanced/EnhancedFormWizard";
import RealtimeTracker from "./components/Enhanced/RealtimeTracker";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/form-builder/:id?" element={<FormBuilder />} />
            <Route path="/form-preview/:id" element={<FormPreview />} />
            <Route path="/platform/forms" element={<PlatformDashboard />} />
            <Route path="/platform/dashboard" element={<PersonalizedDashboard />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/form-wizard" element={<EnhancedFormWizard />} />
            <Route path="/realtime-tracker" element={<RealtimeTracker />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
