
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';
import { 
  Users, 
  FileText, 
  TrendingUp, 
  Target, 
  Clock, 
  Star,
  MessageSquare,
  MousePointer,
  Smartphone,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  Zap,
  Activity
} from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

export const B2CFormInsights = () => {
  const { theme } = useTheme();

  const formMetrics = {
    totalResponses: 2847,
    completionRate: 87,
    averageTime: 3.2,
    mobileUsers: 68,
    userSatisfaction: 4.7,
    conversionRate: 23.5,
    dropoffRate: 13,
    peakHours: '2PM - 4PM'
  };

  const insights = [
    {
      title: 'Form Completion Rate',
      value: `${formMetrics.completionRate}%`,
      change: '+12%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'from-green-50 to-emerald-50',
      description: 'Users completing your forms'
    },
    {
      title: 'Mobile Engagement',
      value: `${formMetrics.mobileUsers}%`,
      change: '+8%',
      trend: 'up',
      icon: Smartphone,
      color: 'text-blue-500',
      bgColor: 'from-blue-50 to-cyan-50',
      description: 'Mobile device users'
    },
    {
      title: 'User Satisfaction',
      value: `${formMetrics.userSatisfaction}/5`,
      change: '+0.3',
      trend: 'up',
      icon: Star,
      color: 'text-yellow-500',
      bgColor: 'from-yellow-50 to-orange-50',
      description: 'Average user rating'
    },
    {
      title: 'Conversion Rate',
      value: `${formMetrics.conversionRate}%`,
      change: '+5.2%',
      trend: 'up',
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'from-purple-50 to-pink-50',
      description: 'Form to action conversion'
    }
  ];

  const userJourney = [
    { step: 'Form View', users: 3420, rate: 100, color: 'bg-blue-500' },
    { step: 'Started Filling', users: 3145, rate: 92, color: 'bg-green-500' },
    { step: 'Halfway Complete', users: 2986, rate: 87, color: 'bg-yellow-500' },
    { step: 'Submitted', users: 2847, rate: 83, color: 'bg-purple-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3"
      >
        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
          <Activity className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Form Builder Insights
          </h2>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Track your form performance and user engagement
          </p>
        </div>
      </motion.div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <Card className={`${theme === 'light' 
              ? `bg-gradient-to-br ${insight.bgColor} border-white/50 shadow-lg hover:shadow-xl` 
              : 'bg-gray-800/50 border-gray-700 shadow-xl hover:shadow-purple-500/10'
            } backdrop-blur-sm transition-all duration-300 overflow-hidden relative group cursor-pointer`}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <insight.icon className={`h-8 w-8 ${insight.color}`} />
                  <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                    insight.trend === 'up' 
                      ? theme === 'light' ? 'bg-green-100 text-green-700' : 'bg-green-900/30 text-green-400'
                      : theme === 'light' ? 'bg-red-100 text-red-700' : 'bg-red-900/30 text-red-400'
                  }`}>
                    <ArrowUpRight className="h-3 w-3" />
                    {insight.change}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${insight.color} mb-1`}>
                  {insight.value}
                </div>
                <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-1`}>
                  {insight.title}
                </p>
                <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  {insight.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* User Journey Flow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className={`${theme === 'light' 
          ? 'bg-white/90 border-white/50 shadow-xl' 
          : 'bg-gray-800/50 border-gray-700 shadow-2xl'
        } backdrop-blur-sm`}>
          <CardHeader>
            <CardTitle className={`text-lg ${theme === 'light' ? 'text-gray-900' : 'text-white'} flex items-center gap-2`}>
              <Users className="h-5 w-5 text-blue-500" />
              User Journey Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userJourney.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/50 dark:to-gray-600/50 hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${step.color}`}></div>
                    <div>
                      <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {step.step}
                      </span>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        {step.users.toLocaleString()} users
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      {step.rate}%
                    </div>
                    <Progress value={step.rate} className="w-20 h-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={`${theme === 'light' 
          ? 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200' 
          : 'bg-gray-800/50 border-gray-700'
        } shadow-lg`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-orange-500" />
              <div>
                <div className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {formMetrics.averageTime}m
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Avg. completion time
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === 'light' 
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' 
          : 'bg-gray-800/50 border-gray-700'
        } shadow-lg`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-green-500" />
              <div>
                <div className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {formMetrics.totalResponses.toLocaleString()}
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Total responses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`${theme === 'light' 
          ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200' 
          : 'bg-gray-800/50 border-gray-700'
        } shadow-lg`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-purple-500" />
              <div>
                <div className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  {formMetrics.peakHours}
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Peak usage hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
