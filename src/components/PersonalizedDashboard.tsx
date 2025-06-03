
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  TrendingUp, 
  Target, 
  Clock, 
  Award, 
  Calendar,
  BarChart3,
  FileText,
  Users,
  Zap,
  Star,
  ArrowUp,
  Activity,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PersonalizedDashboard = () => {
  const { theme } = useTheme();
  const [userStats, setUserStats] = useState({
    name: 'John Doe',
    totalForms: 12,
    totalSubmissions: 847,
    completionRate: 89.2,
    aiAssists: 156,
    productivity: 94,
    streak: 7,
    thisWeekActivity: [
      { day: 'Mon', forms: 3, submissions: 45 },
      { day: 'Tue', forms: 2, submissions: 67 },
      { day: 'Wed', forms: 4, submissions: 89 },
      { day: 'Thu', forms: 1, submissions: 34 },
      { day: 'Fri', forms: 2, submissions: 56 },
      { day: 'Sat', forms: 0, submissions: 12 },
      { day: 'Sun', forms: 1, submissions: 23 }
    ],
    recentActivity: [
      { type: 'form_created', title: 'Contact Form', time: '2 hours ago', status: 'success' },
      { type: 'submission_received', title: 'Newsletter Signup', time: '4 hours ago', status: 'info' },
      { type: 'ai_assist', title: 'Form Optimization', time: '6 hours ago', status: 'warning' },
      { type: 'analytics_viewed', title: 'Weekly Report', time: '1 day ago', status: 'success' }
    ],
    goals: [
      { title: 'Complete 15 forms this month', progress: 80, target: 15, current: 12 },
      { title: 'Reach 1000 submissions', progress: 84.7, target: 1000, current: 847 },
      { title: 'Maintain 90% completion rate', progress: 99.1, target: 90, current: 89.2 }
    ]
  });

  const personalizedInsights = [
    {
      title: 'Active Projects',
      value: userStats.totalForms.toString(),
      icon: FileText,
      color: 'from-blue-500 to-cyan-400',
      change: '+3 this week',
      trend: 'up',
      bgColor: theme === 'light' ? 'from-blue-50 to-cyan-50' : 'from-blue-900/20 to-cyan-900/20'
    },
    {
      title: 'Form Submissions',
      value: userStats.totalSubmissions.toString(),
      icon: Users,
      color: 'from-green-500 to-emerald-400',
      change: '+23 today',
      trend: 'up',
      bgColor: theme === 'light' ? 'from-green-50 to-emerald-50' : 'from-green-900/20 to-emerald-900/20'
    },
    {
      title: 'Completion Rate',
      value: `${userStats.completionRate}%`,
      icon: Target,
      color: 'from-purple-500 to-pink-400',
      change: '+5.1% vs last week',
      trend: 'up',
      bgColor: theme === 'light' ? 'from-purple-50 to-pink-50' : 'from-purple-900/20 to-pink-900/20'
    },
    {
      title: 'AI Assists',
      value: userStats.aiAssists.toString(),
      icon: Zap,
      color: 'from-orange-500 to-red-400',
      change: '+28 this week',
      trend: 'up',
      bgColor: theme === 'light' ? 'from-orange-50 to-red-50' : 'from-orange-900/20 to-red-900/20'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Welcome back, {userStats.name}! 👋
          </h2>
          <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-2`}>
            Here's what's happening with your workspace today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-700 px-3 py-1">
            <Star className="h-4 w-4 mr-1" />
            {userStats.streak} day streak
          </Badge>
          <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
            {userStats.productivity}% productive
          </Badge>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {personalizedInsights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <Card className={`${theme === 'light' 
              ? `bg-gradient-to-br ${insight.bgColor} border-white/50 shadow-xl hover:shadow-2xl` 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl hover:shadow-purple-500/10'
            } backdrop-blur-sm transition-all duration-500 overflow-hidden relative group cursor-pointer`}>
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  {insight.title}
                </CardTitle>
                <motion.div 
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  className={`p-2 bg-gradient-to-r ${insight.color} rounded-lg shadow-lg`}
                >
                  <insight.icon className="h-5 w-5 text-white" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold bg-gradient-to-r ${insight.color} bg-clip-text text-transparent mb-1`}>
                  {insight.value}
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <p className={`text-xs ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`}>
                    {insight.change}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Goals & Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Goals Section */}
        <Card className={`${theme === 'light' 
          ? 'bg-white/90 border-white/50 shadow-xl' 
          : 'bg-gray-800/50 border-gray-700 shadow-2xl'
        } backdrop-blur-sm`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Your Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userStats.goals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {goal.title}
                  </span>
                  <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </div>
            ))}
            <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Set New Goal
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className={`${theme === 'light' 
          ? 'bg-white/90 border-white/50 shadow-xl' 
          : 'bg-gray-800/50 border-gray-700 shadow-2xl'
        } backdrop-blur-sm`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {userStats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  activity.status === 'success' ? 'bg-green-100 text-green-600' :
                  activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  {activity.status === 'success' ? <CheckCircle className="h-4 w-4" /> :
                   activity.status === 'warning' ? <AlertCircle className="h-4 w-4" /> :
                   <FileText className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {activity.title}
                  </p>
                  <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <Link to="/create">
          <Card className={`${theme === 'light' 
            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-blue-200' 
            : 'bg-gradient-to-r from-blue-900/20 to-indigo-900/20 hover:from-blue-800/30 hover:to-indigo-800/30 border-blue-700'
          } transition-all duration-300 cursor-pointer group hover:shadow-lg`}>
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Plus className="h-6 w-6 text-white" />
              </div>
              <h3 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-1`}>
                Create New Form
              </h3>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Start building your next form
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/platform/resume">
          <Card className={`${theme === 'light' 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200' 
            : 'bg-gradient-to-r from-green-900/20 to-emerald-900/20 hover:from-green-800/30 hover:to-emerald-800/30 border-green-700'
          } transition-all duration-300 cursor-pointer group hover:shadow-lg`}>
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h3 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-1`}>
                Build Resume
              </h3>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Create professional resumes
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/tools">
          <Card className={`${theme === 'light' 
            ? 'bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border-purple-200' 
            : 'bg-gradient-to-r from-purple-900/20 to-pink-900/20 hover:from-purple-800/30 hover:to-pink-800/30 border-purple-700'
          } transition-all duration-300 cursor-pointer group hover:shadow-lg`}>
            <CardContent className="p-6 text-center">
              <div className={`w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className={`font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-1`}>
                AI Tools
              </h3>
              <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                Enhance with AI power
              </p>
            </CardContent>
          </Card>
        </Link>
      </motion.div>
    </div>
  );
};

export default PersonalizedDashboard;
