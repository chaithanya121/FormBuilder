
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
  ArrowRight,
  Users,
  BarChart3,
  Settings,
  Zap,
  Palette,
  Mail,
  Calendar,
  Shield,
  Cloud,
  Database,
  Smartphone
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const PlatformNavigation = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const mainPlatforms = [
    {
      id: 'forms',
      name: 'Forms',
      description: 'Create and manage forms',
      icon: FileText,
      color: 'from-blue-500 to-cyan-400',
      path: '/platform/forms',
      active: true,
      stats: { forms: 12, submissions: 450 }
    },
    {
      id: 'resume',
      name: 'Resume',
      description: 'Professional CV builder',
      icon: Briefcase,
      color: 'from-emerald-500 to-green-400',
      path: '/platform/resume',
      active: true,
      stats: { templates: 25, downloads: 120 }
    },
    {
      id: 'website',
      name: 'Website',
      description: 'Build stunning websites',
      icon: Globe,
      color: 'from-purple-500 to-pink-400',
      path: '/platform/website',
      active: false,
      stats: { sites: 0, visitors: 0 }
    },
    {
      id: 'ecommerce',
      name: 'E-Commerce',
      description: 'Online store builder',
      icon: ShoppingCart,
      color: 'from-orange-500 to-red-400',
      path: '/platform/ecommerce',
      active: false,
      stats: { products: 0, sales: 0 }
    },
    {
      id: 'presentation',
      name: 'Slides',
      description: 'Interactive presentations',
      icon: Book,
      color: 'from-indigo-500 to-blue-400',
      path: '/platform/presentation',
      active: false,
      stats: { slides: 0, views: 0 }
    },
    {
      id: 'portfolio',
      name: 'Portfolio',
      description: 'Showcase your work',
      icon: Camera,
      color: 'from-pink-500 to-rose-400',
      path: '/platform/portfolio',
      active: false,
      stats: { projects: 0, views: 0 }
    }
  ];

  const additionalTools = [
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Track performance',
      icon: BarChart3,
      color: 'from-green-500 to-teal-400',
      path: '/analytics',
      active: true
    },
    {
      id: 'team',
      name: 'Team',
      description: 'Collaborate with others',
      icon: Users,
      color: 'from-blue-500 to-indigo-400',
      path: '/team',
      active: true
    },
    {
      id: 'integrations',
      name: 'Integrations',
      description: 'Connect your tools',
      icon: Zap,
      color: 'from-yellow-500 to-orange-400',
      path: '/integrations',
      active: true
    },
    {
      id: 'design-system',
      name: 'Design System',
      description: 'Brand consistency',
      icon: Palette,
      color: 'from-purple-500 to-violet-400',
      path: '/design-system',
      active: true
    },
    {
      id: 'automation',
      name: 'Automation',
      description: 'Workflow automation',
      icon: Settings,
      color: 'from-gray-500 to-slate-400',
      path: '/automation',
      active: true
    },
    {
      id: 'email-marketing',
      name: 'Email Marketing',
      description: 'Send campaigns',
      icon: Mail,
      color: 'from-red-500 to-pink-400',
      path: '/email-marketing',
      active: false
    },
    {
      id: 'scheduler',
      name: 'Scheduler',
      description: 'Booking system',
      icon: Calendar,
      color: 'from-cyan-500 to-blue-400',
      path: '/scheduler',
      active: false
    },
    {
      id: 'security',
      name: 'Security',
      description: 'Data protection',
      icon: Shield,
      color: 'from-emerald-500 to-green-400',
      path: '/security',
      active: true
    },
    {
      id: 'cloud-storage',
      name: 'Cloud Storage',
      description: 'File management',
      icon: Cloud,
      color: 'from-sky-500 to-cyan-400',
      path: '/cloud-storage',
      active: true
    },
    {
      id: 'database',
      name: 'Database',
      description: 'Data management',
      icon: Database,
      color: 'from-violet-500 to-purple-400',
      path: '/database',
      active: true
    },
    {
      id: 'mobile-app',
      name: 'Mobile App',
      description: 'Native app builder',
      icon: Smartphone,
      color: 'from-indigo-500 to-blue-400',
      path: '/mobile-app',
      active: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Main Platforms */}
      <Card className={`${theme === 'light' 
        ? 'bg-white/90 border-white/50 shadow-xl' 
        : 'bg-gray-800/50 border-gray-700 shadow-2xl'
      } backdrop-blur-sm`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Main Platforms
            </h3>
            <Link to="/" className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mainPlatforms.map((platform) => {
              const isActive = location.pathname === platform.path;
              
              return (
                <Link key={platform.id} to={platform.path}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 rounded-xl transition-all duration-200 ${
                      isActive 
                        ? `bg-gradient-to-r ${platform.color} text-white shadow-lg` 
                        : theme === 'light' 
                          ? 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200' 
                          : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300 border border-gray-600'
                    } ${!platform.active ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <platform.icon className="h-8 w-8" />
                      {!platform.active && (
                        <Badge variant="secondary" className="text-xs">Soon</Badge>
                      )}
                    </div>
                    
                    <h4 className="font-semibold mb-1">{platform.name}</h4>
                    <p className={`text-sm mb-3 ${isActive ? 'text-white/80' : 'text-gray-600'}`}>
                      {platform.description}
                    </p>
                    
                    {platform.active && platform.stats && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(platform.stats).map(([key, value]) => (
                          <div key={key} className={`${isActive ? 'text-white/70' : 'text-gray-500'}`}>
                            <div className="font-medium">{value}</div>
                            <div className="capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Additional Tools */}
      <Card className={`${theme === 'light' 
        ? 'bg-white/90 border-white/50 shadow-xl' 
        : 'bg-gray-800/50 border-gray-700 shadow-2xl'
      } backdrop-blur-sm`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Additional Tools
            </h3>
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              {additionalTools.filter(tool => tool.active).length} Available
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {additionalTools.map((tool) => {
              const isActive = location.pathname === tool.path;
              
              return (
                <Link key={tool.id} to={tool.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? `bg-gradient-to-r ${tool.color} text-white shadow-lg` 
                        : theme === 'light' 
                          ? 'bg-gray-50 hover:bg-gray-100 text-gray-700' 
                          : 'bg-gray-700/50 hover:bg-gray-700 text-gray-300'
                    } ${!tool.active ? 'opacity-50' : ''}`}
                  >
                    <div className="flex flex-col items-center gap-2 text-center">
                      <tool.icon className="h-6 w-6" />
                      <div>
                        <div className="text-sm font-medium">{tool.name}</div>
                        <div className={`text-xs ${isActive ? 'text-white/70' : 'text-gray-500'}`}>
                          {tool.description}
                        </div>
                      </div>
                      {!tool.active && (
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
    </div>
  );
};

export default PlatformNavigation;
