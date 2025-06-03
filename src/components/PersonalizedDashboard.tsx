
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, Users, FileText, Eye, 
  Calendar, Clock, Star, Target, Zap, Activity,
  BarChart3, PieChart, LineChart, ArrowUpRight,
  CheckCircle, AlertCircle, Timer, Globe,
  MousePointer, Smartphone, Monitor, Tablet
} from 'lucide-react';

const PersonalizedDashboard = () => {
  const { theme } = useTheme();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [liveMetrics, setLiveMetrics] = useState({
    activeUsers: 23,
    todaySubmissions: 47,
    conversionRate: 8.2,
    avgResponseTime: 142,
    topPerformingForm: "Contact Form V2",
    bounceRate: 12.4
  });

  // Real-time clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate live metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
        todaySubmissions: prev.todaySubmissions + (Math.random() > 0.7 ? 1 : 0),
        conversionRate: Math.max(0, prev.conversionRate + (Math.random() - 0.5) * 0.1),
        avgResponseTime: Math.max(50, prev.avgResponseTime + Math.floor(Math.random() * 20) - 10)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const weeklyData = [
    { day: 'Mon', submissions: 45, views: 234, conversion: 19.2 },
    { day: 'Tue', submissions: 52, views: 287, conversion: 18.1 },
    { day: 'Wed', submissions: 38, views: 198, conversion: 19.2 },
    { day: 'Thu', submissions: 61, views: 301, conversion: 20.3 },
    { day: 'Fri', submissions: 49, views: 256, conversion: 19.1 },
    { day: 'Sat', submissions: 33, views: 189, conversion: 17.5 },
    { day: 'Sun', submissions: 28, views: 145, conversion: 19.3 }
  ];

  const topForms = [
    { name: "Contact Form V2", submissions: 234, conversionRate: 23.4, trend: 'up' },
    { name: "Newsletter Signup", submissions: 189, conversionRate: 41.2, trend: 'up' },
    { name: "Product Feedback", submissions: 156, conversionRate: 18.7, trend: 'down' },
    { name: "Event Registration", submissions: 98, conversionRate: 67.8, trend: 'up' }
  ];

  const deviceStats = [
    { type: 'Desktop', percentage: 45.2, icon: Monitor, count: 1847 },
    { type: 'Mobile', percentage: 38.7, icon: Smartphone, count: 1582 },
    { type: 'Tablet', percentage: 16.1, icon: Tablet, count: 658 }
  ];

  const recentActivity = [
    { type: 'submission', form: 'Contact Form V2', time: '2 minutes ago', status: 'completed' },
    { type: 'view', form: 'Newsletter Signup', time: '5 minutes ago', status: 'active' },
    { type: 'submission', form: 'Product Feedback', time: '8 minutes ago', status: 'completed' },
    { type: 'view', form: 'Event Registration', time: '12 minutes ago', status: 'active' }
  ];

  const MetricCard = ({ title, value, change, icon: Icon, trend, subtitle, isLive = false }) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`p-6 ${theme === 'light' 
        ? 'bg-white/90 border-white/50 shadow-xl' 
        : 'bg-gray-800/50 border-gray-700 shadow-2xl'
      } backdrop-blur-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
          <Icon className="w-full h-full" />
        </div>
        
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`p-2 rounded-lg ${
                trend === 'up' ? 'bg-green-100 text-green-600' : 
                trend === 'down' ? 'bg-red-100 text-red-600' : 
                'bg-blue-100 text-blue-600'
              }`}>
                <Icon className="h-4 w-4" />
              </div>
              {isLive && (
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-1"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600 font-medium">LIVE</span>
                </motion.div>
              )}
            </div>
            
            <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-1`}>
              {title}
            </p>
            
            <motion.div
              key={value}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold mb-1"
            >
              {value}
            </motion.div>
            
            {subtitle && (
              <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                {subtitle}
              </p>
            )}
          </div>
          
          {change && (
            <div className={`flex items-center gap-1 text-sm font-medium ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
              {change}%
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header with Live Clock */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className={`text-3xl font-bold ${theme === 'light' 
            ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800' 
            : 'bg-gradient-to-r from-blue-400 via-purple-400 to-blue-600'
          } bg-clip-text text-transparent`}>
            Dashboard Overview
          </h1>
          <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
            Real-time insights and analytics
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.div
            key={currentTime.toLocaleTimeString()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`px-4 py-2 rounded-lg ${theme === 'light' 
              ? 'bg-white/90 border border-gray-200/50' 
              : 'bg-gray-800/50 border border-gray-700/50'
            } backdrop-blur-sm shadow-lg`}
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="font-mono text-sm">
                {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </motion.div>
          
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            <Activity className="h-3 w-3 mr-1" />
            All Systems Operational
          </Badge>
        </div>
      </motion.div>

      {/* Live Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard
          title="Active Users"
          value={liveMetrics.activeUsers}
          icon={Users}
          trend="up"
          subtitle="Currently browsing forms"
          isLive={true}
        />
        <MetricCard
          title="Today's Submissions"
          value={liveMetrics.todaySubmissions}
          change={23.5}
          icon={FileText}
          trend="up"
          subtitle="vs yesterday"
          isLive={true}
        />
        <MetricCard
          title="Conversion Rate"
          value={`${liveMetrics.conversionRate.toFixed(1)}%`}
          change={1.2}
          icon={Target}
          trend="up"
          subtitle="This week average"
          isLive={true}
        />
        <MetricCard
          title="Avg Response Time"
          value={`${liveMetrics.avgResponseTime}s`}
          change={5.8}
          icon={Timer}
          trend="down"
          subtitle="Form completion time"
          isLive={true}
        />
      </motion.div>

      {/* Main Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className={`p-6 ${theme === 'light' 
            ? 'bg-white/90 border-white/50 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Weekly Performance</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Submissions and conversion rates
                </p>
              </div>
              <BarChart3 className="h-5 w-5 text-blue-500" />
            </div>
            
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 text-sm font-medium text-gray-500">
                    {day.day}
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(day.submissions / 70) * 100}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      />
                    </div>
                    <div className="text-sm font-medium w-8">
                      {day.submissions}
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      day.conversion > 19 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {day.conversion}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Device Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className={`p-6 ${theme === 'light' 
            ? 'bg-white/90 border-white/50 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm h-full`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Device Usage</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Form access by device
                </p>
              </div>
              <PieChart className="h-5 w-5 text-purple-500" />
            </div>
            
            <div className="space-y-4">
              {deviceStats.map((device, index) => (
                <motion.div
                  key={device.type}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <device.icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium">{device.type}</div>
                      <div className="text-sm text-gray-500">{device.count} users</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{device.percentage}%</div>
                    <div className="w-16 bg-gray-100 rounded-full h-1 mt-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${device.percentage}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Performing Forms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className={`p-6 ${theme === 'light' 
            ? 'bg-white/90 border-white/50 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Top Performing Forms</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Based on conversion rates
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-500" />
            </div>
            
            <div className="space-y-4">
              {topForms.map((form, index) => (
                <motion.div
                  key={form.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`p-4 rounded-lg border ${theme === 'light' 
                    ? 'bg-gray-50/50 border-gray-200/50' 
                    : 'bg-gray-700/30 border-gray-600/30'
                  } hover:shadow-md transition-all duration-200`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="font-medium mb-1">{form.name}</div>
                      <div className="text-sm text-gray-500">
                        {form.submissions} submissions
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-semibold ${
                        form.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {form.conversionRate}%
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        {form.trend === 'up' ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        )}
                        <span className={form.trend === 'up' ? 'text-green-600' : 'text-red-600'}>
                          {form.trend}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className={`p-6 ${theme === 'light' 
            ? 'bg-white/90 border-white/50 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold mb-1">Recent Activity</h3>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Latest form interactions
                </p>
              </div>
              <Activity className="h-5 w-5 text-green-500" />
            </div>
            
            <div className="space-y-4">
              <AnimatePresence>
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50/50 transition-colors"
                  >
                    <div className={`p-2 rounded-full ${
                      activity.type === 'submission' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'submission' ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{activity.form}</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                      {activity.status}
                    </Badge>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalizedDashboard;
