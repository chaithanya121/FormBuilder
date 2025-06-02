import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { setSidebarOpen } from '@/store/slices/uiSlice';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { theme } = useTheme();
  const location = useLocation();
  
  // Get state from Redux
  const { user } = useAppSelector((state) => state.auth);
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  // Check if current route is a published form (starts with /form/)
  const isPublishedForm = location.pathname.startsWith('/form/');
  // Check if we're in the form builder
  const isFormBuilder = location.pathname.startsWith('/form-builder/') || location.pathname === '/create';

  // Always keep sidebar closed by default
  useEffect(() => {
    dispatch(setSidebarOpen(false));
  }, [dispatch]);

  // Close sidebar on mobile device detection
  useEffect(() => {
    if (isMobile) {
      dispatch(setSidebarOpen(false));
    }
  }, [isMobile, dispatch]);

  const toggleSidebar = () => {
    dispatch(setSidebarOpen(!sidebarOpen));
  };

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Don't show header or footer on published forms or form builder
  const showHeader = !isPublishedForm && !isFormBuilder;
  const showFooter = !user && !isPublishedForm && !isFormBuilder;

  return (
    <div className={`flex flex-col min-h-screen w-full ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-900 text-white'} transition-colors duration-300`}>
      {showHeader && (
        <div className={`fixed top-0 w-full z-30 transition-all duration-300 ${isScrolled ? (theme === 'light' ? 'bg-white/90' : 'bg-gray-900/80') + ' backdrop-blur-md shadow-md' : ''}`}>
          <Header />
        </div>
      )}
      
      <div className={`flex flex-1 ${showHeader ? 'pt-16' : ''}`}>
        <main className={`flex-1 ${theme === 'light' ? 'bg-white' : 'bg-gradient-to-b from-gray-900 to-gray-800'} transition-all duration-300`}>
          <div className="w-full">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Very minimal footer for non-logged in users only */}
      {showFooter && (
        <footer className="py-1 bg-gray-50/50 backdrop-blur-sm border-t border-gray-100">
          <div className="container mx-auto px-4 text-center">
            <p className="text-xs text-gray-400">
              © 2024 BuildCraft Platform
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;
