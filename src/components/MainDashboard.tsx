import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Users, 
  BarChart3, 
  Plus, 
  Briefcase,
  Globe,
  ShoppingCart,
  Book,
  Camera,
  Layers,
  Rocket,
  TrendingUp,
  Award,
  Activity,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Download,
  Star,
  CheckCircle,
  Eye,
  MousePointer,
  Calendar,
  Target,
  Sparkles,
  PlayCircle,
  PauseCircle,
  RefreshCw,
  Wrench,
  Clock,
  Brain,
  Workflow,
  Lightbulb
} from 'lucide-react';
import { icon_map } from '@/types';
import { Link } from 'react-router-dom';
import { getPlatform, PlatForm,PlatFormState } from '@/store/slices/platformSlice';
import {isEmpty} from 'lodash'
import { useSelector, useDispatch } from 'react-redux'
import { platformApi } from '@/services/api/platform';
import { AppDispatch, RootState } from '@/store';

interface Base64ImageProps {
  base64String: string;
  contentType: string;
  alt?: string;
  className?: string;
}

const MainDashboard = () => {
  const { theme } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [platformCards,setPlatFormCards]= useState([])
  const platform = useSelector((state: RootState) => state.platform.platform)

  useEffect(() => {
    dispatch(getPlatform());
  }, []);
  
  // Updated stats to focus on work insights rather than revenue
  const overallStats = [
    {
      title: 'Active Projects',
      value: '12',
      change: '+3 this week',
      changeType: 'positive',
      icon: Layers,
      gradient: 'from-blue-500 to-cyan-400',
      bgGradient: theme === 'light' ? 'from-blue-50 via-blue-100 to-cyan-50' : 'from-blue-900/20 to-cyan-900/20',
      subtitle: 'Across all platforms',
      trend: [8, 9, 10, 9, 11, 12, 11, 12]
    },
    {
      title: 'Form Submissions',
      value: '847',
      change: '+23 today',
      changeType: 'positive',
      icon: FileText,
      gradient: 'from-green-500 to-emerald-400',
      bgGradient: theme === 'light' ? 'from-green-50 via-emerald-100 to-green-50' : 'from-green-900/20 to-emerald-900/20',
      subtitle: 'Total form responses',
      trend: [650, 720, 780, 750, 810, 830, 820, 847]
    },
    {
      title: 'Completion Rate',
      value: '89.2%',
      change: '+5.1%',
      changeType: 'positive',
      icon: Target,
      gradient: 'from-purple-500 to-pink-400',
      bgGradient: theme === 'light' ? 'from-purple-50 via-pink-100 to-purple-50' : 'from-purple-900/20 to-pink-900/20',
      subtitle: 'Average form completion',
      trend: [75, 78, 82, 80, 85, 87, 88, 89.2]
    },
    {
      title: 'AI Assists',
      value: '156',
      change: '+28 this week',
      changeType: 'positive',
      icon: Brain,
      gradient: 'from-amber-500 to-orange-400',
      bgGradient: theme === 'light' ? 'from-amber-50 via-orange-100 to-amber-50' : 'from-amber-900/20 to-orange-900/20',
      subtitle: 'AI-powered enhancements',
      trend: [98, 110, 125, 120, 135, 145, 150, 156]
    }
  ];

  const recentActivity = [
    {
      type: 'form_creation',
      title: 'New form created',
      description: 'Customer Feedback Survey - Marketing Team',
      time: '5 minutes ago',
      icon: Plus,
      status: 'success',
      avatar: 'bg-gradient-to-r from-blue-500 to-cyan-400'
    },
    {
      type: 'ai_enhancement',
      title: 'AI enhancement applied',
      description: 'Smart validation added to Contact Form',
      time: '12 minutes ago',
      icon: Brain,
      status: 'info',
      avatar: 'bg-gradient-to-r from-purple-500 to-pink-400'
    },
    {
      type: 'workflow_completed',
      title: 'Workflow automation triggered',
      description: 'Lead generation form → CRM integration',
      time: '25 minutes ago',
      icon: Workflow,
      status: 'success',
      avatar: 'bg-gradient-to-r from-emerald-500 to-green-400'
    },
    {
      type: 'insight_generated',
      title: 'New insight available',
      description: 'Form performance analysis ready for review',
      time: '1 hour ago',
      icon: Lightbulb,
      status: 'info',
      avatar: 'bg-gradient-to-r from-amber-500 to-orange-400'
    }
  ];

  const quickActions = [
    {
      title: 'AI Form Generator',
      description: 'Create forms with advanced AI assistance',
      icon: Brain,
      gradient: 'from-violet-500 to-purple-600',
      link: '/tools/ai-form-generator',
      badge: 'AI',
      badgeColor: 'from-purple-400 to-violet-500'
    },
    {
      title: 'Professional Tools',
      description: '40+ advanced tools for power users',
      icon: Wrench,
      gradient: 'from-blue-500 to-indigo-600',
      link: '/tools',
      badge: 'NEW',
      badgeColor: 'from-orange-400 to-red-500'
    },
    {
      title: 'Analytics Center',
      description: 'Deep insights and performance metrics',
      icon: BarChart3,
      gradient: 'from-emerald-500 to-teal-600',
      link: '/analytics',
      badge: 'PRO',
      badgeColor: 'from-blue-400 to-indigo-500'
    },
    {
      title: 'Template Library',
      description: 'Browse professional form templates',
      icon: Star,
      gradient: 'from-cyan-500 to-blue-600',
      link: '/templates'
    },
    {
      title: 'Workflow Builder',
      description: 'Automate your form processes',
      icon: Workflow,
      gradient: 'from-pink-500 to-rose-600',
      link: '/tools/workflow-builder'
    }
  ];

  console.log(platform)

function Base64Svg({ base64String, className = "" }) {
  const svgString = atob(base64String);
  
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
}

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } relative overflow-hidden`}>
      
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 right-20 w-96 h-96 ${theme === 'light' ? 'bg-blue-200/20' : 'bg-blue-500/5'} rounded-full blur-3xl`}
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-20 left-20 w-96 h-96 ${theme === 'light' ? 'bg-purple-200/20' : 'bg-purple-500/5'} rounded-full blur-3xl`}
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            x: [-20, 20, -20],
            y: [-10, 10, -10]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 ${theme === 'light' ? 'bg-emerald-200/15' : 'bg-emerald-500/5'} rounded-full blur-3xl`}
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10 p-6">
        {/* Welcome Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl shadow-2xl">
              <Rocket className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-5xl font-bold mb-4 bg-gradient-to-r ${theme === 'light' 
              ? 'from-gray-900 via-blue-800 to-purple-900' 
              : 'from-white via-blue-200 to-purple-200'
            } bg-clip-text text-transparent`}
          >
            Your Creative Workspace
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-8 max-w-2xl mx-auto`}
          >
            Build powerful forms, track insights, and optimize your workflow with AI-powered tools. 
            Your productivity hub for creating professional digital experiences.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex items-center justify-center gap-4"
          >
            <Link to="/platform/forms">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-all duration-300">
                <Plus className="h-5 w-5 mr-2" />
                Create Form
              </Button>
            </Link>
            <Link to="/tools/ai-form-generator">
              <Button variant="outline" className={`px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-all duration-300 ${theme === 'light' 
                ? 'border-gray-300 hover:bg-gray-50' 
                : 'border-gray-600 hover:bg-gray-700'
              }`}>
                <Brain className="h-5 w-5 mr-2" />
                Try AI Generator
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {overallStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className={`${theme === 'light' 
                ? `bg-gradient-to-br ${stat.bgGradient} border-white/50 shadow-xl hover:shadow-2xl` 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl hover:shadow-purple-500/10'
              } backdrop-blur-sm transition-all duration-500 overflow-hidden relative group cursor-pointer`}>
                
                {/* Animated background effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex-1">
                    <CardTitle className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-1`}>
                      {stat.title}
                    </CardTitle>
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                        stat.changeType === 'positive' 
                          ? theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-400'
                          : theme === 'light' ? 'bg-red-100 text-red-700' : 'bg-red-900/30 text-red-400'
                      }`}>
                        {stat.changeType === 'positive' ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {stat.change}
                      </div>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`bg-gradient-to-r ${stat.gradient} p-3 rounded-xl shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </motion.div>
                </CardHeader>
                
                <CardContent>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} mb-3`}>
                    {stat.subtitle}
                  </p>
                  
                  {/* Mini trend chart */}
                  <div className="flex items-end gap-1 h-8">
                    {stat.trend.map((value, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / Math.max(...stat.trend)) * 100}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className={`bg-gradient-to-t ${stat.gradient} rounded-sm flex-1 opacity-60 group-hover:opacity-100 transition-opacity`}
                      ></motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Enhanced Platform Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm mb-6`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                      <Layers className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className={`text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        Your Creative Platforms
                      </CardTitle>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        Build, create, and deploy across all platforms
                      </p>
                    </div>
                  </div>
                  <Link to="/platform/forms">
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                      <Plus className="h-4 w-4 mr-2" />
                      New Project
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {!isEmpty(platform) && platform.map((platform, index) => (
                    <Link key={platform.id} to={platform.link}>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, x: 8 }}
                        className={`p-6 rounded-2xl ${theme === 'light' 
                          ? `bg-gradient-to-r ${platform.bgGradient} hover:shadow-xl border border-gray-200 hover:border-blue-300` 
                          : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600 hover:border-blue-500'
                        } transition-all duration-500 cursor-pointer group relative overflow-hidden`}
                      >
                        {/* Animated background */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${platform.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                        
                        <div className="flex items-center justify-between relative z-10">
                          <div className="flex items-center gap-4 flex-1">
                            <motion.div 
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              className={`w-16 h-16 bg-gradient-to-r ${platform.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                            >
                                <Base64Svg 
                                  base64String={platform.icon.data} 
                                  className="h-8 w-8 text-white flex items-center justify-center"
                                />
                            </motion.div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                  {platform.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                  <Badge className={`${platform.stats.active 
                                    ? 'bg-green-100 text-green-700 border-green-200' 
                                    : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                  } text-xs px-3 py-1`}>
                                    {platform.stats.active ? 'Active' : 'Coming Soon'}
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                                      {platform.popularity}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-3`}>
                                {platform.description}
                              </p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {platform.features.map((feature, i) => (
                                  <span key={i} className={`text-xs px-2 py-1 rounded-full ${theme === 'light' 
                                    ? 'bg-white/60 text-gray-700' 
                                    : 'bg-gray-600/50 text-gray-300'
                                  }`}>
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 45 }}
                            className={`p-2 rounded-full ${theme === 'light' ? 'bg-white/50' : 'bg-gray-600/50'}`}
                          >
                            <ArrowUpRight className={`h-6 w-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
                          </motion.div>
                        </div>
                        
                        {platform.stats.active && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="grid grid-cols-4 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-600 relative z-10"
                          >
                            {Object.entries(platform.stats).filter(([key]) => !['active'].includes(key)).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <div className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                  {typeof value === 'string' && value.includes('$') ? value : 
                                   typeof value === 'number' ? value.toLocaleString() : 
                                   String(value)}
                                </div>
                                <div className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} capitalize`}>
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sidebar Content */}
          <div className="space-y-6">
            {/* Enhanced Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-white/50 shadow-xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl'
              } backdrop-blur-sm`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'} flex items-center gap-2`}>
                      <Activity className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                    <Button variant="ghost" size="sm">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-start gap-3 p-3 rounded-xl ${theme === 'light' 
                          ? 'hover:bg-gray-50' 
                          : 'hover:bg-gray-700/50'
                        } transition-colors cursor-pointer group`}
                      >
                        <div className={`p-2 rounded-lg ${activity.avatar} shadow-md group-hover:scale-110 transition-transform`}>
                          <activity.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'} truncate`}>
                            {activity.title}
                          </p>
                          <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
                            {activity.description}
                          </p>
                          <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'} mt-1 flex items-center gap-1`}>
                            <Clock className="h-3 w-3" />
                            {activity.time}
                          </p>
                        </div>
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'success' ? 'bg-green-400' :
                          activity.status === 'info' ? 'bg-blue-400' :
                          'bg-gray-400'
                        }`}></div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Enhanced Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-white/50 shadow-xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl'
              } backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className={`text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'} flex items-center gap-2`}>
                    <Zap className="h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {quickActions.map((action, index) => (
                      <Link key={index} to={action.link}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-3 p-4 rounded-xl ${theme === 'light' 
                            ? 'bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 border border-gray-200' 
                            : 'bg-gray-700/50 hover:bg-gray-600 border border-gray-600'
                          } transition-all duration-300 cursor-pointer relative overflow-hidden group`}
                        >
                          <motion.div 
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className={`w-12 h-12 bg-gradient-to-r ${action.gradient} rounded-xl flex items-center justify-center shadow-lg`}
                          >
                            <action.icon className="h-6 w-6 text-white" />
                          </motion.div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                                {action.title}
                              </span>
                              {action.badge && (
                                <Badge className={`text-xs bg-gradient-to-r ${action.badgeColor} text-white border-0 shadow-sm`}>
                                  {action.badge}
                                </Badge>
                              )}
                            </div>
                            <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                              {action.description}
                            </p>
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 45 }}
                            className="opacity-50 group-hover:opacity-100 transition-opacity"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </motion.div>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
