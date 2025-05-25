import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Outlet, useLocation } from 'react-router-dom';
import { useTheme } from '@/components/theme-provider';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { theme } = useTheme();
  const location = useLocation();

  // Check if current route is a published form (starts with /form/)
  const isPublishedForm = location.pathname.startsWith('/form/');

  // Always keep sidebar closed by default
  useEffect(() => {
    setSidebarOpen(false); // Ensure sidebar is closed on initial load
  }, []);

  // Close sidebar on mobile device detection
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
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

  return (
    <div className={`flex flex-col min-h-screen w-full ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-900 text-white'} transition-colors duration-300`}>
      {!isPublishedForm && (
        <div className={`fixed top-0 w-full z-30 transition-all duration-300 ${isScrolled ? (theme === 'light' ? 'bg-white/90' : 'bg-gray-900/80') + ' backdrop-blur-md shadow-md' : ''}`}>
          <Header />
        </div>
      )}
      
      <div className={`flex flex-1 ${!isPublishedForm ? 'pt-16' : ''}`}>
        {/* <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} /> */}
        
        <main className={`flex-1 ${theme === 'light' ? 'bg-white' : 'bg-gradient-to-b from-gray-900 to-gray-800'} transition-all duration-300 ${sidebarOpen && !isMobile ? 'md:ml-64' : ''}`}>
          <div className="w-full">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {!isPublishedForm && <Footer />}
    </div>
  );
};

export default Layout;
