
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Briefcase, 
  Globe, 
  ShoppingCart, 
  Book, 
  Camera,
  ArrowRight
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const PlatformNavigation = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const platforms = [
    {
      id: 'forms',
      name: 'Forms',
      icon: FileText,
      color: 'from-blue-500 to-cyan-400',
      path: '/platform/forms',
      active: true
    },
    {
      id: 'resume',
      name: 'Resume',
      icon: Briefcase,
      color: 'from-emerald-500 to-green-400',
      path: '/platform/resume',
      active: true
    },
    {
      id: 'website',
      name: 'Website',
      icon: Globe,
      color: 'from-purple-500 to-pink-400',
      path: '/platform/website',
      active: false
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce',
      icon: ShoppingCart,
      color: 'from-orange-500 to-red-400',
      path: '/platform/ecommerce',
      active: false
    },
    {
      id: 'presentation',
      name: 'Slides',
      icon: Book,
      color: 'from-indigo-500 to-blue-400',
      path: '/platform/presentation',
      active: false
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      icon: Camera,
      color: 'from-pink-500 to-rose-400',
      path: '/platform/portfolio',
      active: false
    }
  ];

  return (
    <Card className={`${theme === 'light' 
      ? 'bg-white/90 border-white/50 shadow-xl' 
      : 'bg-gray-800/50 border-gray-700 shadow-2xl'
    } backdrop-blur-sm`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Platforms
          </h3>
          <Link to="/" className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
          {platforms.map((platform) => {
            const isActive = location.pathname === platform.path;
            
            return (
              <Link key={platform.id} to={platform.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? `bg-gradient-to-r ${platform.color} text-white shadow-lg` 
                      : theme === 'light' 
                        ? 'bg-gray-50 hover:bg-gray-100 text-gray-700' 
                        : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
                  } ${!platform.active ? 'opacity-50' : ''}`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <platform.icon className="h-5 w-5" />
                    <span className="text-xs font-medium">{platform.name}</span>
                    {!platform.active && (
                      <Badge variant="secondary" className="text-xs">Soon</Badge>
                    )}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformNavigation;
