
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormList from '@/components/Forms/index';
import Submissions from '@/components/Submissions';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { FileText, Database, Plus, Search, Filter, Grid, List, TrendingUp, Users, Clock } from 'lucide-react';
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
      change: '+3 this week'
    },
    {
      title: 'Active Forms',
      value: '18',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-400',
      change: '75% completion rate'
    },
    {
      title: 'Total Responses',
      value: '1,247',
      icon: Users,
      color: 'from-purple-500 to-pink-400',
      change: '+127 today'
    },
    {
      title: 'Last Updated',
      value: '2m ago',
      icon: Clock,
      color: 'from-orange-500 to-red-400',
      change: 'Contact Form'
    }
  ];
  
  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } py-8 px-4 relative overflow-hidden`}>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-10 right-10 w-64 h-64 ${theme === 'light' ? 'bg-blue-200/20' : 'bg-blue-500/5'} rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-10 left-10 w-80 h-80 ${theme === 'light' ? 'bg-purple-200/20' : 'bg-purple-500/5'} rounded-full blur-3xl`}></div>
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
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme === 'light' 
              ? 'from-gray-900 via-blue-800 to-indigo-900' 
              : 'from-white via-blue-200 to-indigo-200'
            } bg-clip-text text-transparent`}>
              Form Management Center
            </h1>
          </div>
          <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-6`}>
            Create, organize, and track all your forms in one powerful dashboard
          </p>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Link to="/create">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg px-6 py-3 rounded-xl">
                <Plus className="h-5 w-5 mr-2" />
                Create New Form
              </Button>
            </Link>
            <Button variant="outline" className={`px-6 py-3 rounded-xl ${theme === 'light' 
              ? 'border-gray-300 hover:bg-gray-50' 
              : 'border-gray-600 hover:bg-gray-700'
            }`}>
              <Search className="h-5 w-5 mr-2" />
              Browse Templates
            </Button>
          </div>
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
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <Card className={`${theme === 'light' 
                ? 'bg-white/80 border-white/50 shadow-lg hover:shadow-xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-xl hover:shadow-purple-500/10'
              } backdrop-blur-sm transition-all duration-300 overflow-hidden relative group`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-1`}>
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

        {/* Enhanced Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="forms" className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
              <TabsList className={`${theme === 'light' 
                ? 'bg-white/80 border border-gray-200/50 shadow-xl backdrop-blur-sm' 
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
                    } rounded-xl`}
                  />
                </div>
                <Button variant="outline" size="icon" className={`rounded-xl ${theme === 'light' 
                  ? 'border-gray-300 hover:bg-gray-50' 
                  : 'border-gray-600 hover:bg-gray-700'
                }`}>
                  <Filter className="h-4 w-4" />
                </Button>
                <div className="flex rounded-xl overflow-hidden border border-gray-300">
                  <Button variant="ghost" size="sm" className="rounded-none">
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-none">
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
                  ? 'bg-white/80 border-white/50 shadow-xl' 
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
                  ? 'bg-white/80 border-white/50 shadow-xl' 
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
