
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormList from '@/components/Forms/index';
import Submissions from '@/components/Submissions';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { FileText, Database, Plus, Search, Filter, Grid, List, TrendingUp, Users, Clock, Brain, Sparkles, Zap, Eye, BarChart3, Workflow, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const DashboardTabs = () => {
  const { theme } = useTheme();

  const quickStats = [
    {
      title: 'Total Forms',
      value: '24',
      icon: FileText,
      color: 'from-blue-500 to-cyan-400',
      change: '+3 this week',
      bgColor: theme === 'light' ? 'from-blue-50 to-cyan-50' : 'from-blue-900/20 to-cyan-900/20'
    },
    {
      title: 'Active Forms',
      value: '18',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-400',
      change: '75% completion rate',
      bgColor: theme === 'light' ? 'from-green-50 to-emerald-50' : 'from-green-900/20 to-emerald-900/20'
    },
    {
      title: 'Total Responses',
      value: '1,247',
      icon: Users,
      color: 'from-purple-500 to-pink-400',
      change: '+127 today',
      bgColor: theme === 'light' ? 'from-purple-50 to-pink-50' : 'from-purple-900/20 to-pink-900/20'
    },
    {
      title: 'AI Assists',
      value: '89',
      icon: Brain,
      color: 'from-orange-500 to-red-400',
      change: '+15 this week',
      bgColor: theme === 'light' ? 'from-orange-50 to-red-50' : 'from-orange-900/20 to-red-900/20'
    }
  ];

  const quickActions = [
    {
      title: 'AI Form Generator',
      description: 'Create forms with AI assistance',
      icon: Brain,
      gradient: 'from-violet-500 to-purple-600',
      link: '/tools/ai-form-generator',
      badge: 'AI'
    },
    {
      title: 'Smart Templates',
      description: 'Browse intelligent templates',
      icon: Sparkles,
      gradient: 'from-blue-500 to-indigo-600',
      link: '/templates',
      badge: 'NEW'
    },
    {
      title: 'Analytics Hub',
      description: 'View detailed insights',
      icon: BarChart3,
      gradient: 'from-emerald-500 to-teal-600',
      link: '/analytics'
    },
    {
      title: 'Workflow Builder',
      description: 'Automate form processes',
      icon: Workflow,
      gradient: 'from-pink-500 to-rose-600',
      link: '/tools/workflow-builder'
    }
  ];
  
  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } py-8 px-4 relative overflow-hidden`}>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-10 right-10 w-64 h-64 ${theme === 'light' ? 'bg-blue-200/20' : 'bg-blue-500/5'} rounded-full blur-3xl`}
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [180, 90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-10 left-10 w-80 h-80 ${theme === 'light' ? 'bg-purple-200/20' : 'bg-purple-500/5'} rounded-full blur-3xl`}
        ></motion.div>
        <motion.div 
          animate={{ 
            x: [-10, 10, -10],
            y: [-5, 5, -5]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/3 right-1/3 w-60 h-60 ${theme === 'light' ? 'bg-emerald-200/15' : 'bg-emerald-500/5'} rounded-full blur-3xl`}
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <motion.div 
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-2xl"
            >
              <FileText className="h-10 w-10 text-white" />
            </motion.div>
            <h1 className={`text-5xl font-bold bg-gradient-to-r ${theme === 'light' 
              ? 'from-gray-900 via-blue-800 to-indigo-900' 
              : 'from-white via-blue-200 to-indigo-200'
            } bg-clip-text text-transparent`}>
              Form Builder Studio
            </h1>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`text-xl ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-6 max-w-3xl mx-auto`}
          >
            Design, build, and optimize professional forms with AI-powered tools and advanced analytics. 
            Your complete form management ecosystem.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <Link to="/create">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-xl px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-all duration-300">
                <Plus className="h-5 w-5 mr-2" />
                Create New Form
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
            <Button variant="outline" className={`px-8 py-4 rounded-2xl text-lg hover:scale-105 transition-all duration-300 ${theme === 'light' 
              ? 'border-gray-300 hover:bg-gray-50' 
              : 'border-gray-600 hover:bg-gray-700'
            }`}>
              <Eye className="h-5 w-5 mr-2" />
              Browse Templates
            </Button>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className={`${theme === 'light' 
                ? `bg-gradient-to-br ${stat.bgColor} border-white/50 shadow-xl hover:shadow-2xl` 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl hover:shadow-purple-500/10'
              } backdrop-blur-sm transition-all duration-500 overflow-hidden relative group cursor-pointer`}>
                
                {/* Animated background effect */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {stat.title}
                  </CardTitle>
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg shadow-lg`}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {quickActions.map((action, index) => (
            <Link key={index} to={action.link}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl ${theme === 'light' 
                  ? 'bg-white/80 hover:bg-white border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl' 
                  : 'bg-gray-800/50 hover:bg-gray-700 border border-gray-700 hover:border-blue-500 shadow-xl'
                } backdrop-blur-sm transition-all duration-300 cursor-pointer group`}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-10 h-10 bg-gradient-to-r ${action.gradient} rounded-lg flex items-center justify-center shadow-md`}
                  >
                    <action.icon className="h-5 w-5 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`font-semibold text-sm ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                        {action.title}
                      </span>
                      {action.badge && (
                        <Badge className={`text-xs px-2 py-0.5 ${
                          action.badge === 'AI' ? 'bg-purple-100 text-purple-700' :
                          action.badge === 'NEW' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {action.badge}
                        </Badge>
                      )}
                    </div>
                    <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                      {action.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="forms" className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
              <TabsList className={`${theme === 'light' 
                ? 'bg-white/90 border border-gray-200/50 shadow-xl backdrop-blur-sm' 
                : 'bg-gray-800/70 border border-gray-700/50 backdrop-blur-sm'
              } p-1.5 rounded-2xl`}>
                <TabsTrigger 
                  value="forms" 
                  className={`${theme === 'light'
                    ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-600 hover:text-gray-900'
                    : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-700 data-[state=active]:text-white text-gray-400 hover:text-white'
                  } px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2`}
                >
                  <FileText className="h-4 w-4" />
                  Forms Library
                  <Badge className="ml-2 bg-blue-100 text-blue-700 text-xs">24</Badge>
                </TabsTrigger>
                <TabsTrigger 
                  value="submissions" 
                  className={`${theme === 'light'
                    ? 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg text-gray-600 hover:text-gray-900'
                    : 'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-700 data-[state=active]:text-white text-gray-400 hover:text-white'
                  } px-8 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2`}
                >
                  <Database className="h-4 w-4" />
                  Submissions & Analytics
                  <Badge className="ml-2 bg-green-100 text-green-700 text-xs">1.2K</Badge>
                </TabsTrigger>
              </TabsList>

              {/* Search and Filter Controls */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                  <Input 
                    placeholder="Search forms..." 
                    className={`pl-10 w-64 ${theme === 'light' 
                      ? 'bg-white/80 border-gray-300 focus:border-blue-500' 
                      : 'bg-gray-800/50 border-gray-600 focus:border-blue-400'
                    } rounded-xl backdrop-blur-sm`}
                  />
                </div>
                <Button variant="outline" size="icon" className={`rounded-xl ${theme === 'light' 
                  ? 'border-gray-300 hover:bg-gray-50 bg-white/80' 
                  : 'border-gray-600 hover:bg-gray-700 bg-gray-800/50'
                } backdrop-blur-sm`}>
                  <Filter className="h-4 w-4" />
                </Button>
                <div className={`flex rounded-xl overflow-hidden border ${theme === 'light' ? 'border-gray-300 bg-white/80' : 'border-gray-600 bg-gray-800/50'} backdrop-blur-sm`}>
                  <Button variant="ghost" size="sm" className="rounded-none hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-none hover:bg-gray-100 dark:hover:bg-gray-700">
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <TabsContent value="forms" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`${theme === 'light' 
                  ? 'bg-white/90 border-white/50 shadow-xl' 
                  : 'bg-gray-800/50 border-gray-700 shadow-2xl'
                } backdrop-blur-sm rounded-2xl border overflow-hidden`}
              >
                <FormList />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="submissions" className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`${theme === 'light' 
                  ? 'bg-white/90 border-white/50 shadow-xl' 
                  : 'bg-gray-800/50 border-gray-700 shadow-2xl'
                } backdrop-blur-sm rounded-2xl border overflow-hidden`}
              >
                <Submissions />
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardTabs;
