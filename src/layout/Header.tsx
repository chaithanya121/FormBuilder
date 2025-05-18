
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Home, FileText, FilePlus, UserCircle, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import StyledBackdrop from '@/components/styles/StyledBackdrop';
import { motion } from "framer-motion";
import { verticalNavClasses } from './../components/styles/mainClass';
import { ThemeToggle } from '@/components/ThemeToggle';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const handleToggleSidebar = () => {
    toggleSidebar(); // Call the toggleSidebar function from Layout
  };

  // Handle Backdrop(Content Overlay) Click
  const handleBackdropClick = () => {
    // Close the verticalNav
    setIsToggled(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm sticky top-0 z-30 transition-all duration-300">
      <div className="mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleToggleSidebar}
            className="md:flex hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
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
              className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-700 opacity-90"></div>
              <FilePlus className="h-5 w-5 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 dark:bg-black/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </motion.div>
            
            <div className="flex flex-col">
              <motion.span 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="font-bold text-xl bg-gradient-to-r from-white via-blue-200 to-indigo-100 dark:from-gray-300 dark:via-blue-300 dark:to-indigo-200 bg-clip-text text-transparent tracking-tight sm:inline-block"
              >
                Form Builder
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="text-xs font-medium text-indigo-300 dark:text-indigo-400 -mt-1 tracking-wide sm:inline-block"
              >
                Pro
              </motion.span>
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {['Home', 'Features', 'About', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={item === 'Home' ? '/' : '#'} 
              className="relative text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 font-medium transition-colors px-1 py-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle variant="icon" />
          
          <Button variant="outline" size="sm" className="hidden sm:flex bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            Log in
          </Button>
          <Button 
            size="sm" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-sm hover:shadow transition-all"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
