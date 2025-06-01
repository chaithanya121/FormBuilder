
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Search, Bell, Settings, User, Rocket, Zap, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/components/theme-provider';

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const { theme } = useTheme();
  const location = useLocation();

  const handleToggleSidebar = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  const isPlatformPage = location.pathname.startsWith('/platform/');
  const currentPlatform = location.pathname.split('/')[2];

  const platformNames = {
    forms: 'Forms',
    resume: 'Resume Builder',
    website: 'Website Builder',
    ecommerce: 'E-Commerce',
    presentation: 'Presentation Builder',
    portfolio: 'Portfolio Builder'
  };

  return (
    <header className={`${theme === 'light' 
      ? 'bg-white/95 border-gray-200/50 shadow-lg backdrop-blur-xl' 
      : 'bg-gray-900/95 border-gray-800/50 shadow-2xl backdrop-blur-xl'
    } border-b sticky top-0 z-30 transition-all duration-300`}>
      <div className="mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {toggleSidebar && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleToggleSidebar}
              className={`md:flex ${theme === 'light' 
                ? 'hover:bg-gray-100/80 text-gray-700' 
                : 'hover:bg-gray-800/80 text-gray-300'
              } rounded-xl transition-all duration-300`}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          
          <Link to="/dashboard" className="flex items-center gap-3 group">
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
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-600"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent"></div>
              <Rocket className="h-6 w-6 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            </motion.div>
            
            <div className="flex flex-col">
              <motion.span 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className={`font-bold text-xl bg-gradient-to-r ${theme === 'light'
                  ? 'from-gray-900 via-blue-700 to-purple-800'
                  : 'from-gray-300 via-blue-300 to-purple-200'
                } bg-clip-text text-transparent tracking-tight`}
              >
                BuildCraft
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className={`text-xs font-medium ${theme === 'light'
                  ? 'text-purple-600'
                  : 'text-purple-400'
                } -mt-1 tracking-wide`}
              >
                {isPlatformPage && currentPlatform ? platformNames[currentPlatform as keyof typeof platformNames] || 'Platform' : 'Platform'}
              </motion.span>
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {[
            { name: 'Dashboard', path: '/dashboard', icon: Rocket },
            { name: 'Forms', path: '/platform/forms', icon: Plus },
            { name: 'Resume', path: '/platform/resume', icon: User },
            { name: 'Analytics', path: '/analytics', icon: Zap }
          ].map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.name}
                to={item.path}
                className={`relative ${isActive 
                  ? theme === 'light' ? 'text-blue-600' : 'text-blue-400'
                  : theme === 'light' ? 'text-gray-700 hover:text-blue-600' : 'text-gray-300 hover:text-blue-400'
                } font-medium transition-all duration-300 px-4 py-2 rounded-xl hover:scale-105 group flex items-center gap-2`}
              >
                <item.icon className="h-4 w-4" />
                <span className="relative z-10">{item.name}</span>
                <div className={`absolute inset-0 ${isActive 
                  ? theme === 'light' ? 'bg-blue-50' : 'bg-blue-500/20'
                  : theme === 'light' ? 'bg-blue-50 group-hover:bg-blue-100' : 'bg-blue-500/10 group-hover:bg-blue-500/20'
                } rounded-xl ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-all duration-300 scale-95 group-hover:scale-100`}></div>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
            <input 
              placeholder="Search..." 
              className={`pl-10 pr-4 py-2 w-48 rounded-xl border ${theme === 'light' 
                ? 'bg-white/80 border-gray-300 focus:border-blue-500 text-gray-900' 
                : 'bg-gray-800/50 border-gray-600 focus:border-blue-400 text-white'
              } focus:outline-none transition-all duration-300`}
            />
          </div>
          
          <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
            <Bell className="h-5 w-5" />
          </Button>
          
          <ThemeToggle variant="icon" className="hover:scale-110 transition-transform duration-300" />
          
          <Button variant="ghost" size="icon" className="hover:scale-110 transition-transform duration-300">
            <Settings className="h-5 w-5" />
          </Button>
          
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-4 w-4 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
