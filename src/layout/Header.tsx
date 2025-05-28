
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Home, FileText, FilePlus, UserCircle, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import StyledBackdrop from '@/components/styles/StyledBackdrop';
import { motion } from "framer-motion";
import { verticalNavClasses } from './../components/styles/mainClass';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/components/theme-provider';

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const { theme } = useTheme();

  const handleToggleSidebar = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  const handleBackdropClick = () => {
    setIsToggled(false);
  };

  return (
    <header className={`${theme === 'light' 
      ? 'bg-white/90 border-gray-200/50 shadow-lg' 
      : 'bg-gray-900/90 border-gray-800/50 shadow-2xl'
    } border-b backdrop-blur-xl sticky top-0 z-30 transition-all duration-300`}>
      <div className="mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {toggleSidebar && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleToggleSidebar}
              className={`md:flex ${theme === 'light' 
                ? 'hover:bg-gray-100/80' 
                : 'hover:bg-gray-800/80'
              } rounded-xl transition-all duration-300`}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                duration: 0.5 
              }}
              className="relative flex items-center justify-center w-12 h-12 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-700"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
              <FilePlus className="h-6 w-6 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </motion.div>
            
            <div className="flex flex-col">
              <motion.span 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className={`font-bold text-xl bg-gradient-to-r ${theme === 'light'
                  ? 'from-gray-900 via-blue-700 to-indigo-800'
                  : 'from-gray-300 via-blue-300 to-indigo-200'
                } bg-clip-text text-transparent tracking-tight`}
              >
                Form Builder
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className={`text-xs font-medium ${theme === 'light'
                  ? 'text-indigo-600'
                  : 'text-indigo-400'
                } -mt-1 tracking-wide`}
              >
                Pro
              </motion.span>
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: 'Home', path: '/' },
            { name: 'Features', path: '/features' },
            { name: 'About', path: '/about' },
            { name: 'Contact', path: '/contact' }
          ].map((item) => (
            <Link 
              key={item.name}
              to={item.path}
              className={`relative ${theme === 'light' 
                ? 'text-gray-600 hover:text-gray-900' 
                : 'text-gray-300 hover:text-gray-100'
              } font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:scale-105 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle variant="icon" className="hover:scale-110 transition-transform duration-300" />
          
          <Button 
            variant="outline" 
            size="sm" 
            className={`hidden sm:flex ${theme === 'light'
              ? 'bg-white/80 hover:bg-gray-50/80 border-gray-300/50 text-gray-700 hover:text-gray-900'
              : 'bg-gray-800/80 hover:bg-gray-700/80 border-gray-600/50 text-gray-300 hover:text-white'
            } backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6`}
          >
            Log in
          </Button>
          
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 hover:scale-105"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
