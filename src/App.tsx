
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import FormBuilder from "./components/FormBuilder";
import Dashboard from "@/components/Dashboard";
import MainDashboard from "@/components/Dashboard";
import FormSubmission from "@/components/FormSubmission";
import { AuthProvider } from "./hooks/use-auth";
import Layout from "./layout/Layout";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="fb-theme">
        <AuthProvider>
          <BrowserRouter>
            <div className="relative min-h-scree">
              <TooltipProvider delayDuration={0}>
                <Layout>
                  <Routes>
                    <Route path="/" element={<MainDashboard/>} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/forms" element={<Index />} />
                    <Route path="/create" element={<FormBuilder />} />
                    <Route path="/form-builder/:id" element={<FormBuilder />} />
                    <Route path="/form/:id" element={<FormSubmission />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
