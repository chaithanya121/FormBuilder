
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Bell, Settings, User, Rocket, Home } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/components/theme-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationCount] = useState(3);

  const handleToggleSidebar = () => {
    if (toggleSidebar) {
      toggleSidebar();
    }
  };

  const isPlatformPage = location.pathname.startsWith('/platform/');

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
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              location.pathname === '/' 
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
            }`}
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
              >
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-3 border-b">
                <h4 className="font-medium">Notifications</h4>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Form submitted</p>
                    <p className="text-xs text-gray-500">New submission for Contact Form</p>
                    <p className="text-xs text-gray-400">2 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Resume downloaded</p>
                    <p className="text-xs text-gray-500">Your resume was downloaded</p>
                    <p className="text-xs text-gray-400">1 hour ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">System update</p>
                    <p className="text-xs text-gray-500">New features available</p>
                    <p className="text-xs text-gray-400">3 hours ago</p>
                  </div>
                </DropdownMenuItem>
              </div>
              <div className="p-3 border-t">
                <Button variant="ghost" size="sm" className="w-full">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
              >
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="h-4 w-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
