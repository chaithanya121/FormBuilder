
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Star, Activity, TrendingUp, Users, BarChart3,
  FileText, Calendar, Clock, CheckCircle2, Zap,
  ArrowRight, Sparkles, Target, Globe, Shield,
  Brain, Rocket, Layers, Award, PieChart,
  MessageSquare, Settings, Download, Upload,
  Database, Cloud, Smartphone, Monitor
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PlatformNavigation from '@/components/PlatformNavigation';
import FormBuilderDashboard from '@/components/FormBuilder/FormBuilderDashboard';

const PlatformDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'overview' | 'forms'>('overview');

  // Enhanced platform insights with more comprehensive data
  const platformInsights = {
    totalProjects: 24,
    activeUsers: 1250,
    totalViews: 45600,
    conversionRate: 18.7,
    growthRate: 23.5,
    totalRevenue: 12450,
    satisfaction: 4.8,
    uptime: 99.9,
    apiCalls: 89234,
    storageUsed: 2.4,
    recentActivity: [
      { type: 'form_submission', message: 'New submission on Customer Survey', time: '2 minutes ago', icon: FileText, color: 'text-blue-600' },
      { type: 'form_created', message: 'Event Registration form created', time: '1 hour ago', icon: Plus, color: 'text-green-600' },
      { type: 'user_signup', message: '5 new users joined', time: '3 hours ago', icon: Users, color: 'text-purple-600' },
      { type: 'milestone', message: 'Reached 1000 total submissions!', time: '1 day ago', icon: Award, color: 'text-orange-600' },
      { type: 'ai_generated', message: 'AI form generated successfully', time: '2 days ago', icon: Brain, color: 'text-pink-600' }
    ],
    performanceMetrics: [
      { label: 'Response Time', value: '142ms', change: '-12%', color: 'text-green-600' },
      { label: 'Error Rate', value: '0.02%', change: '-45%', color: 'text-green-600' },
      { label: 'Success Rate', value: '99.8%', change: '+2%', color: 'text-green-600' },
      { label: 'User Retention', value: '94%', change: '+8%', color: 'text-green-600' }
    ],
    topCountries: [
      { name: 'United States', users: 456, flag: '🇺🇸' },
      { name: 'Canada', users: 234, flag: '🇨🇦' },
      { name: 'United Kingdom', users: 189, flag: '🇬🇧' },
      { name: 'Australia', users: 145, flag: '🇦🇺' }
    ],
    deviceBreakdown: {
      desktop: 52,
      mobile: 41,
      tablet: 7
    },
    upcomingFeatures: [
      { name: 'AI Form Builder', status: 'Coming Soon', color: 'from-purple-500 to-pink-400', progress: 85 },
      { name: 'Advanced Analytics', status: 'In Development', color: 'from-blue-500 to-cyan-400', progress: 65 },
      { name: 'Team Collaboration', status: 'Beta', color: 'from-green-500 to-emerald-400', progress: 90 },
      { name: 'Mobile App', status: 'Planning', color: 'from-orange-500 to-red-400', progress: 25 }
    ]
  };

  const quickActions = [
    {
      title: 'Create New Form',
      description: 'Start with AI or blank form',
      icon: Plus,
      color: 'from-blue-500 to-cyan-400',
      action: () => navigate('/platform/forms')
    },
    {
      title: 'AI Form Generator',
      description: 'Generate with AI power',
      icon: Brain,
      color: 'from-purple-500 to-pink-400',
      action: () => navigate('/tools/ai-form-generator')
    },
    {
      title: 'View Analytics',
      description: 'Deep insights & reports',
      icon: BarChart3,
      color: 'from-green-500 to-emerald-400',
      action: () => setActiveView('forms')
    },
    {
      title: 'Team Settings',
      description: 'Manage collaboration',
      icon: Users,
      color: 'from-orange-500 to-red-400',
      action: () => navigate('/team')
    }
  ];

  if (activeView === 'forms') {
    return <FormBuilderDashboard />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-white/50 shadow-lg mb-6">
            <Zap className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">FormCraft Pro Platform</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Welcome to Your Creative Hub
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Build, manage, and analyze your digital projects with powerful tools and beautiful design
          </p>
        </motion.div>

        {/* Enhanced Platform Insights Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: 'Total Projects', value: platformInsights.totalProjects, change: '+12%', icon: FileText, color: 'blue' },
            { title: 'Active Users', value: platformInsights.activeUsers.toLocaleString(), change: `+${platformInsights.growthRate}%`, icon: Users, color: 'green' },
            { title: 'Total Views', value: platformInsights.totalViews.toLocaleString(), change: '+8.3%', icon: Globe, color: 'purple' },
            { title: 'Revenue', value: `$${platformInsights.totalRevenue.toLocaleString()}`, change: '+15%', icon: Target, color: 'orange' }
          ].map((stat, index) => (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.02, y: -2 }}
              className="group"
            >
              <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-20 h-20 bg-${stat.color}-500/10 rounded-full -translate-y-10 translate-x-10`}></div>
                <CardContent className="p-6 relative">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm font-medium text-${stat.color}-700`}>{stat.title}</p>
                      <p className={`text-3xl font-bold text-${stat.color}-800`}>{stat.value}</p>
                      <div className="flex items-center text-sm text-green-600 mt-1">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span>{stat.change} this month</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 bg-${stat.color}-500/20 rounded-xl flex items-center justify-center`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Rocket className="h-6 w-6 text-blue-600" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group cursor-pointer"
                onClick={action.action}
              >
                <Card className="h-full bg-white/90 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <CardContent className="p-6 relative">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg mb-4`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{action.description}</p>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Performance Metrics */}
          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-blue-600" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {platformInsights.performanceMetrics.map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4"
                  >
                    <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                    <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                    <div className={`text-sm ${metric.color} flex items-center`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {metric.change}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-purple-600" />
                Device Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Desktop', value: platformInsights.deviceBreakdown.desktop, icon: Monitor, color: 'blue' },
                { name: 'Mobile', value: platformInsights.deviceBreakdown.mobile, icon: Smartphone, color: 'green' },
                { name: 'Tablet', value: platformInsights.deviceBreakdown.tablet, icon: Monitor, color: 'purple' }
              ].map((device, index) => (
                <div key={device.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <device.icon className={`h-4 w-4 text-${device.color}-600`} />
                    <span className="text-sm font-medium">{device.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${device.color}-500 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${device.value}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold w-8">{device.value}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Platform Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <PlatformNavigation />
        </motion.div>

        {/* Enhanced Recent Activity & Geographic Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Recent Activity */}
          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {platformInsights.recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0`}>
                    <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-green-600" />
                Top Countries
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {platformInsights.topCountries.map((country, index) => (
                <motion.div
                  key={country.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{country.flag}</span>
                    <span className="font-medium text-gray-900">{country.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">{country.users}</div>
                    <div className="text-xs text-gray-500">users</div>
                  </div>
                </motion.div>
              ))}
              <Button variant="outline" className="w-full">
                View Geographic Report
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 text-white border-0 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <g fill="none" fillRule="evenodd">
                  <g fill="#ffffff" fillOpacity="0.1">
                    <circle cx="30" cy="30" r="2"/>
                  </g>
                </g>
              </svg>
            </div>
            <CardContent className="p-8 text-center relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4 opacity-80"
              >
                <Zap className="w-full h-full" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Join thousands of creators who are building beautiful, functional projects with our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => setActiveView('forms')}
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Start Building Forms
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={() => navigate('/tools/ai-form-generator')}
                >
                  <Brain className="h-5 w-5 mr-2" />
                  Try AI Generator
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PlatformDashboard;
