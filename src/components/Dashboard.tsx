
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  FileText, 
  CheckCircle, 
  Users, 
  BarChart3, 
  Plus, 
  Layout, 
  Settings, 
  Palette,
  Edit,
  Circle,
  Clock,
  TrendingUp,
  Calendar,
  Star,
  Zap,
  Target,
  Award,
  Activity,
  Eye,
  Download,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { theme } = useTheme();

  const stats = [
    {
      title: 'Total Forms',
      value: '1',
      change: '+12%',
      icon: FileText,
      color: 'from-blue-500 to-cyan-400',
      bgGradient: theme === 'light' ? 'from-blue-50 via-blue-100 to-cyan-50' : 'from-blue-900/20 to-cyan-900/20',
      iconBg: 'bg-gradient-to-r from-blue-500 to-cyan-400'
    },
    {
      title: 'Submissions',
      value: '247',
      change: '+23%',
      icon: CheckCircle,
      color: 'from-emerald-500 to-green-400',
      bgGradient: theme === 'light' ? 'from-emerald-50 via-green-100 to-emerald-50' : 'from-emerald-900/20 to-green-900/20',
      iconBg: 'bg-gradient-to-r from-emerald-500 to-green-400'
    },
    {
      title: 'Active Users',
      value: '1,847',
      change: '+8%',
      icon: Users,
      color: 'from-purple-500 to-pink-400',
      bgGradient: theme === 'light' ? 'from-purple-50 via-pink-100 to-purple-50' : 'from-purple-900/20 to-pink-900/20',
      iconBg: 'bg-gradient-to-r from-purple-500 to-pink-400'
    },
    {
      title: 'Completion Rate',
      value: '94.2%',
      change: '+5%',
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-400',
      bgGradient: theme === 'light' ? 'from-amber-50 via-orange-100 to-amber-50' : 'from-amber-900/20 to-orange-900/20',
      iconBg: 'bg-gradient-to-r from-amber-500 to-orange-400'
    }
  ];

  const tools = [
    {
      title: 'AI Form Generator',
      description: 'Generate forms using AI prompts',
      icon: Zap,
      color: 'from-violet-500 to-purple-600',
      link: '/ai-generator',
      badge: 'NEW'
    },
    {
      title: 'Templates Gallery',
      description: 'Professional pre-made templates',
      icon: Layout,
      color: 'from-blue-500 to-indigo-600',
      link: '/templates'
    },
    {
      title: 'Advanced Analytics',
      description: 'Deep insights and reporting',
      icon: BarChart3,
      color: 'from-emerald-500 to-teal-600',
      link: '/analytics',
      badge: 'PRO'
    },
    {
      title: 'Theme Studio',
      description: 'Custom design system',
      icon: Palette,
      color: 'from-pink-500 to-rose-600',
      link: '/theme-studio'
    },
    {
      title: 'Integration Hub',
      description: 'Connect with 100+ apps',
      icon: Target,
      color: 'from-orange-500 to-red-600',
      link: '/integrations'
    },
    {
      title: 'Collaboration',
      description: 'Team workspace features',
      icon: Users,
      color: 'from-cyan-500 to-blue-600',
      link: '/collaboration'
    }
  ];

  const quickActions = [
    {
      title: 'Quick Form',
      description: 'Create in 30 seconds',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      title: 'Import Data',
      description: 'From CSV or Excel',
      icon: Download,
      color: 'from-green-400 to-emerald-500'
    },
    {
      title: 'Share Link',
      description: 'Get shareable URL',
      icon: Share2,
      color: 'from-blue-400 to-indigo-500'
    }
  ];

  const recentActivities = [
    {
      action: 'New submission on Contact Form',
      time: '2 minutes ago',
      icon: Circle,
      color: 'text-green-500',
      user: 'John Doe'
    },
    {
      action: 'Form "Survey 2024" published',
      time: '1 hour ago',
      icon: Edit,
      color: 'text-blue-500',
      user: 'You'
    },
    {
      action: 'Analytics report generated',
      time: '3 hours ago',
      icon: BarChart3,
      color: 'text-purple-500',
      user: 'System'
    },
    {
      action: 'Team member invited',
      time: '1 day ago',
      icon: Users,
      color: 'text-indigo-500',
      user: 'You'
    }
  ];

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
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h1 className={`text-5xl font-bold bg-gradient-to-r ${theme === 'light' 
              ? 'from-gray-900 via-blue-800 to-indigo-900' 
              : 'from-white via-blue-200 to-indigo-200'
            } bg-clip-text text-transparent`}>
              Form Builder Pro
            </h1>
          </div>
          <p className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-6`}>
            Create, manage, and analyze forms with next-generation tools
          </p>
          <div className="flex items-center justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
              <Activity className="h-4 w-4 mr-1" />
              All Systems Operational
            </Badge>
            <Badge variant="outline" className={`px-4 py-2 text-sm ${theme === 'light' ? 'border-blue-300' : 'border-blue-500'}`}>
              <Calendar className="h-4 w-4 mr-1" />
              {new Date().toLocaleDateString()}
            </Badge>
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`${theme === 'light' 
                ? `bg-gradient-to-br ${stat.bgGradient} border-white/50 shadow-xl hover:shadow-2xl` 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl hover:shadow-purple-500/10'
              } backdrop-blur-sm transition-all duration-300 overflow-hidden relative group`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      {stat.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-400'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.iconBg} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Tools Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <Layout className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className={`text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      Professional Tools
                    </CardTitle>
                  </div>
                  <Link to="/create">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Form
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tools.map((tool, index) => (
                    <Link key={index} to={tool.link}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-6 rounded-xl ${theme === 'light' 
                          ? 'bg-gradient-to-br from-gray-50 to-white hover:from-blue-50 hover:to-indigo-50 border border-gray-200 hover:border-blue-300' 
                          : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                        } transition-all duration-300 cursor-pointer group relative overflow-hidden`}
                      >
                        {tool.badge && (
                          <Badge className="absolute top-2 right-2 text-xs bg-gradient-to-r from-orange-400 to-red-500 text-white border-0">
                            {tool.badge}
                          </Badge>
                        )}
                        <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <tool.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {tool.title}
                        </h3>
                        <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                          {tool.description}
                        </p>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                  <h4 className={`text-lg font-semibold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Quick Actions
                  </h4>
                  <div className="flex gap-3">
                    {quickActions.map((action, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme === 'light' 
                          ? 'bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700' 
                          : 'bg-gray-700/50 hover:bg-gray-600 text-gray-300'
                        } transition-all duration-200 text-sm`}
                      >
                        <div className={`w-6 h-6 bg-gradient-to-r ${action.color} rounded flex items-center justify-center`}>
                          <action.icon className="h-3 w-3 text-white" />
                        </div>
                        <span className="font-medium">{action.title}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Activity Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                    <Activity className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className={`text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      Live Activity
                    </CardTitle>
                    <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      Real-time updates
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex items-start gap-3 p-4 rounded-xl ${theme === 'light' 
                        ? 'bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-indigo-50 border border-gray-200' 
                        : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                      } transition-all duration-300 group`}
                    >
                      <div className={`p-2 rounded-full ${theme === 'light' ? 'bg-white shadow-sm' : 'bg-gray-600'} group-hover:scale-110 transition-transform duration-200`}>
                        <activity.icon className={`h-4 w-4 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-1`}>
                          {activity.action}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                            {activity.time}
                          </p>
                          <span className="text-xs">•</span>
                          <p className={`text-xs font-medium ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
                            {activity.user}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className={`w-full mt-4 ${theme === 'light' 
                    ? 'border-gray-300 hover:bg-gray-50' 
                    : 'border-gray-600 hover:bg-gray-700'
                  }`}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
