
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, Layout, BarChart3, Users, Target, Shield, Database, TestTube,
  Mail, Image, CreditCard, Smartphone, Settings, Search, Filter,
  Lightbulb, Palette, Eye, MessageSquare, Webhook, Lock, Cloud,
  Activity, Send, Camera, Receipt, QrCode, Mic, Code, FileText,
  Globe, PieChart, UserCheck, Workflow, Key, HardDrive, CheckCircle,
  Bell, Video, ScanLine, DollarSign, Calculator, Star, Wrench,
  Megaphone, Headphones, Play, Download, Upload, Share2, Link2,
  Clock, Monitor, RefreshCw, Layers, Paintbrush, Scissors, Copy,
  RotateCcw, Archive, Folder, Flag, Hash, Navigation, Compass
} from 'lucide-react';

interface Tool {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  badge?: 'NEW' | 'PRO' | 'ENTERPRISE';
  category: string;
  link?: string;
}

interface Category {
  name: string;
  icon: React.ComponentType<any>;
  color: string;
  tools: Tool[];
}

const ProfessionalTools = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    {
      name: 'AI & Generation',
      icon: Zap,
      color: 'from-violet-500 to-purple-600',
      tools: [
        {
          title: 'AI Form Generator',
          description: 'Generate forms using advanced AI prompts',
          icon: Zap,
          color: 'from-violet-500 to-purple-600',
          badge: 'NEW',
          category: 'AI & Generation',
          link: '/tools/ai-form-generator'
        },
        {
          title: 'Smart Suggestions',
          description: 'AI-powered field suggestions and optimization',
          icon: Lightbulb,
          color: 'from-yellow-500 to-orange-600',
          badge: 'PRO',
          category: 'AI & Generation',
          link: '/tools/smart-suggestions'
        },
        {
          title: 'Auto-Complete',
          description: 'Intelligent form auto-completion system',
          icon: RefreshCw,
          color: 'from-blue-500 to-indigo-600',
          category: 'AI & Generation',
          link: '/tools/auto-complete'
        }
      ]
    },
    {
      name: 'Design & Templates',
      icon: Palette,
      color: 'from-pink-500 to-rose-600',
      tools: [
        {
          title: 'Templates Gallery',
          description: 'Professional pre-made form templates',
          icon: Layout,
          color: 'from-blue-500 to-indigo-600',
          category: 'Design & Templates',
          link: '/tools/templates-gallery'
        },
        {
          title: 'Theme Studio',
          description: 'Custom design system and theme builder',
          icon: Palette,
          color: 'from-pink-500 to-rose-600',
          badge: 'PRO',
          category: 'Design & Templates',
          link: '/tools/theme-studio'
        },
        {
          title: 'Style Editor',
          description: 'Advanced CSS and styling customization',
          icon: Paintbrush,
          color: 'from-green-500 to-emerald-600',
          category: 'Design & Templates',
          link: '/tools/style-editor'
        }
      ]
    },
    {
      name: 'Analytics & Reports',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-600',
      tools: [
        {
          title: 'Advanced Analytics',
          description: 'Deep insights and comprehensive reporting',
          icon: BarChart3,
          color: 'from-emerald-500 to-teal-600',
          badge: 'PRO',
          category: 'Analytics & Reports',
          link: '/tools/advanced-analytics'
        },
        {
          title: 'Real-time Dashboard',
          description: 'Live performance monitoring and metrics',
          icon: Activity,
          color: 'from-red-500 to-pink-600',
          category: 'Analytics & Reports',
          link: '/tools/realtime-dashboard'
        },
        {
          title: 'Custom Reports',
          description: 'Build and schedule personalized reports',
          icon: FileText,
          color: 'from-blue-500 to-cyan-600',
          category: 'Analytics & Reports',
          link: '/tools/custom-reports'
        }
      ]
    },
    {
      name: 'Collaboration & Team',
      icon: Users,
      color: 'from-cyan-500 to-blue-600',
      tools: [
        {
          title: 'Team Management',
          description: 'Collaborate with team members and manage roles',
          icon: Users,
          color: 'from-cyan-500 to-blue-600',
          category: 'Collaboration & Team',
          link: '/tools/team-management'
        },
        {
          title: 'Workflow Builder',
          description: 'Design custom approval and review workflows',
          icon: Workflow,
          color: 'from-purple-500 to-indigo-600',
          badge: 'ENTERPRISE',
          category: 'Collaboration & Team',
          link: '/tools/workflow-builder'
        },
        {
          title: 'Comments System',
          description: 'Real-time form comments and feedback',
          icon: MessageSquare,
          color: 'from-orange-500 to-red-600',
          category: 'Collaboration & Team',
          link: '/tools/comments-system'
        }
      ]
    },
    {
      name: 'Integration & Automation',
      icon: Target,
      color: 'from-orange-500 to-red-600',
      tools: [
        {
          title: 'API Manager',
          description: 'Connect with external APIs and services',
          icon: Target,
          color: 'from-orange-500 to-red-600',
          category: 'Integration & Automation'
        },
        {
          title: 'Webhooks',
          description: 'Real-time data notifications and triggers',
          icon: Webhook,
          color: 'from-green-500 to-teal-600',
          category: 'Integration & Automation'
        },
        {
          title: 'Automation Rules',
          description: 'Smart form automation and conditional logic',
          icon: Settings,
          color: 'from-blue-500 to-purple-600',
          badge: 'PRO',
          category: 'Integration & Automation'
        }
      ]
    },
    {
      name: 'Security & Compliance',
      icon: Shield,
      color: 'from-green-500 to-emerald-600',
      tools: [
        {
          title: 'Security Center',
          description: 'Advanced security controls and monitoring',
          icon: Shield,
          color: 'from-green-500 to-emerald-600',
          badge: 'ENTERPRISE',
          category: 'Security & Compliance'
        },
        {
          title: 'GDPR Compliance',
          description: 'Data protection and privacy compliance tools',
          icon: Lock,
          color: 'from-red-500 to-pink-600',
          category: 'Security & Compliance'
        },
        {
          title: 'Access Control',
          description: 'User permission and access management',
          icon: Key,
          color: 'from-yellow-500 to-orange-600',
          category: 'Security & Compliance'
        }
      ]
    },
    {
      name: 'Data & Storage',
      icon: Database,
      color: 'from-blue-500 to-indigo-600',
      tools: [
        {
          title: 'Database Manager',
          description: 'Advanced data management and queries',
          icon: Database,
          color: 'from-blue-500 to-indigo-600',
          category: 'Data & Storage'
        },
        {
          title: 'Cloud Storage',
          description: 'Secure file storage and management',
          icon: Cloud,
          color: 'from-cyan-500 to-blue-600',
          category: 'Data & Storage'
        },
        {
          title: 'Version Control',
          description: 'Form version management and history',
          icon: Archive,
          color: 'from-gray-500 to-slate-600',
          badge: 'PRO',
          category: 'Data & Storage'
        }
      ]
    },
    {
      name: 'Testing & Optimization',
      icon: TestTube,
      color: 'from-purple-500 to-pink-600',
      tools: [
        {
          title: 'A/B Testing',
          description: 'Split test your forms for optimization',
          icon: TestTube,
          color: 'from-purple-500 to-pink-600',
          badge: 'PRO',
          category: 'Testing & Optimization'
        },
        {
          title: 'Performance Monitor',
          description: 'Real-time performance tracking and alerts',
          icon: Monitor,
          color: 'from-green-500 to-emerald-600',
          category: 'Testing & Optimization'
        },
        {
          title: 'Load Testing',
          description: 'Test form performance under heavy load',
          icon: CheckCircle,
          color: 'from-blue-500 to-cyan-600',
          badge: 'ENTERPRISE',
          category: 'Testing & Optimization'
        }
      ]
    },
    {
      name: 'Communication & Notifications',
      icon: Mail,
      color: 'from-red-500 to-pink-600',
      tools: [
        {
          title: 'Email Builder',
          description: 'Custom email templates and automation',
          icon: Mail,
          color: 'from-red-500 to-pink-600',
          category: 'Communication & Notifications'
        },
        {
          title: 'SMS Gateway',
          description: 'Send SMS notifications and alerts',
          icon: Send,
          color: 'from-green-500 to-teal-600',
          badge: 'PRO',
          category: 'Communication & Notifications'
        },
        {
          title: 'Push Notifications',
          description: 'Real-time push alerts and reminders',
          icon: Bell,
          color: 'from-yellow-500 to-orange-600',
          category: 'Communication & Notifications'
        }
      ]
    },
    {
      name: 'Media & Content',
      icon: Image,
      color: 'from-indigo-500 to-purple-600',
      tools: [
        {
          title: 'Media Library',
          description: 'Organize and manage media files',
          icon: Image,
          color: 'from-indigo-500 to-purple-600',
          category: 'Media & Content'
        },
        {
          title: 'Video Recorder',
          description: 'Record videos directly in forms',
          icon: Video,
          color: 'from-red-500 to-pink-600',
          badge: 'NEW',
          category: 'Media & Content'
        },
        {
          title: 'Document Scanner',
          description: 'Scan and upload documents easily',
          icon: ScanLine,
          color: 'from-blue-500 to-cyan-600',
          category: 'Media & Content'
        }
      ]
    },
    {
      name: 'Payment & E-commerce',
      icon: CreditCard,
      color: 'from-green-500 to-teal-600',
      tools: [
        {
          title: 'Payment Gateway',
          description: 'Accept online payments securely',
          icon: CreditCard,
          color: 'from-green-500 to-teal-600',
          category: 'Payment & E-commerce'
        },
        {
          title: 'Invoice Generator',
          description: 'Create professional invoices automatically',
          icon: Receipt,
          color: 'from-blue-500 to-indigo-600',
          category: 'Payment & E-commerce'
        },
        {
          title: 'Subscription Manager',
          description: 'Manage recurring payments and billing',
          icon: DollarSign,
          color: 'from-yellow-500 to-orange-600',
          badge: 'PRO',
          category: 'Payment & E-commerce'
        }
      ]
    },
    {
      name: 'Mobile & Accessibility',
      icon: Smartphone,
      color: 'from-blue-500 to-cyan-600',
      tools: [
        {
          title: 'Mobile Optimizer',
          description: 'Optimize forms for mobile devices',
          icon: Smartphone,
          color: 'from-blue-500 to-cyan-600',
          category: 'Mobile & Accessibility'
        },
        {
          title: 'QR Generator',
          description: 'Generate QR codes for easy form access',
          icon: QrCode,
          color: 'from-purple-500 to-pink-600',
          category: 'Mobile & Accessibility'
        },
        {
          title: 'Voice Assistant',
          description: 'Voice-enabled form filling and navigation',
          icon: Mic,
          color: 'from-green-500 to-emerald-600',
          badge: 'NEW',
          category: 'Mobile & Accessibility'
        }
      ]
    }
  ];

  const allTools = categories.flatMap(category => category.tools);

  const filteredTools = allTools.filter(tool =>
    tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCategories = categories.filter(category =>
    selectedCategory ? category.name === selectedCategory : true
  );

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'NEW':
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
      case 'PRO':
        return 'bg-gradient-to-r from-orange-400 to-red-500 text-white';
      case 'ENTERPRISE':
        return 'bg-gradient-to-r from-purple-400 to-pink-500 text-white';
      default:
        return '';
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6 relative overflow-hidden`}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-20 right-20 w-72 h-72 ${theme === 'light' ? 'bg-blue-200/30' : 'bg-blue-500/10'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-20 left-20 w-96 h-96 ${theme === 'light' ? 'bg-purple-200/30' : 'bg-purple-500/10'} rounded-full blur-3xl`}></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Wrench className="h-8 w-8 text-white" />
            </div>
            <h1 className={`text-5xl font-bold bg-gradient-to-r ${theme === 'light' 
              ? 'from-gray-900 via-blue-800 to-indigo-900' 
              : 'from-white via-blue-200 to-indigo-200'
            } bg-clip-text text-transparent`}>
              Professional Tools
            </h1>
          </div>
          <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-6`}>
            Complete suite of 40+ professional tools for advanced form building
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${theme === 'light' 
                ? 'bg-white/80 border-gray-300' 
                : 'bg-gray-800/50 border-gray-600'
              }`}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="h-10"
            >
              All Categories
            </Button>
            {categories.slice(0, 4).map((category) => (
              <Button
                key={category.name}
                variant={selectedCategory === category.name ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.name)}
                className="h-10"
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.name}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Categories and Tools */}
        {searchTerm ? (
          // Search Results
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
              Search Results ({filteredTools.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className={`${theme === 'light' 
                    ? 'bg-white/90 border-white/50 hover:bg-white' 
                    : 'bg-gray-800/50 border-gray-700 hover:bg-gray-800/70'
                  } backdrop-blur-sm border rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer relative overflow-hidden`}
                >
                  {tool.link ? (
                    <Link to={tool.link} className="block h-full">
                      {tool.badge && (
                        <Badge className={`absolute top-3 right-3 text-xs ${getBadgeStyle(tool.badge)} border-0`}>
                          {tool.badge}
                        </Badge>
                      )}
                      <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <tool.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {tool.title}
                      </h3>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} leading-relaxed`}>
                        {tool.description}
                      </p>
                    </Link>
                  ) : (
                    <>
                      {tool.badge && (
                        <Badge className={`absolute top-3 right-3 text-xs ${getBadgeStyle(tool.badge)} border-0`}>
                          {tool.badge}
                        </Badge>
                      )}
                      <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                        <tool.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {tool.title}
                      </h3>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} leading-relaxed`}>
                        {tool.description}
                      </p>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          // Categories View
          <div className="space-y-12">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <Card className={`${theme === 'light' 
                  ? 'bg-white/90 border-white/50 shadow-xl' 
                  : 'bg-gray-800/50 border-gray-700 shadow-2xl'
                } backdrop-blur-sm mb-6`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 bg-gradient-to-r ${category.color} rounded-xl shadow-lg`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className={`text-2xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {category.name}
                        </CardTitle>
                        <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {category.tools.length} professional tools
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.tools.map((tool, toolIndex) => (
                        <motion.div
                          key={tool.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: toolIndex * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className={`p-6 rounded-xl ${theme === 'light' 
                            ? 'bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-indigo-50 border border-gray-200 hover:border-blue-300' 
                            : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                          } transition-all duration-300 cursor-pointer group relative overflow-hidden`}
                        >
                          {tool.link ? (
                            <Link to={tool.link} className="block h-full">
                              {tool.badge && (
                                <Badge className={`absolute top-3 right-3 text-xs ${getBadgeStyle(tool.badge)} border-0`}>
                                  {tool.badge}
                                </Badge>
                              )}
                              <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                <tool.icon className="h-6 w-6 text-white" />
                              </div>
                              <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {tool.title}
                              </h3>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} leading-relaxed`}>
                                {tool.description}
                              </p>
                            </Link>
                          ) : (
                            <>
                              {tool.badge && (
                                <Badge className={`absolute top-3 right-3 text-xs ${getBadgeStyle(tool.badge)} border-0`}>
                                  {tool.badge}
                                </Badge>
                              )}
                              <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                <tool.icon className="h-6 w-6 text-white" />
                              </div>
                              <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {tool.title}
                              </h3>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} leading-relaxed`}>
                                {tool.description}
                              </p>
                            </>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`${theme === 'light' 
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50' 
            : 'bg-gradient-to-r from-gray-800/30 to-gray-900/30'
          } rounded-2xl p-8 text-center`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className={`text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent`}>
                {allTools.length}+
              </div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
                Professional Tools
              </p>
            </div>
            <div>
              <div className={`text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent`}>
                {categories.length}
              </div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
                Categories
              </p>
            </div>
            <div>
              <div className={`text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent`}>
                {allTools.filter(tool => tool.badge === 'PRO' || tool.badge === 'ENTERPRISE').length}
              </div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
                Premium Features
              </p>
            </div>
            <div>
              <div className={`text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent`}>
                100%
              </div>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
                Professional Grade
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfessionalTools;
