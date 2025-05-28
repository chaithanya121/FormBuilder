
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
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { theme } = useTheme();

  const stats = [
    {
      title: 'Total Forms',
      value: '1',
      icon: FileText,
      color: 'from-blue-400 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100',
      iconBg: 'bg-blue-500'
    },
    {
      title: 'Submissions',
      value: '0',
      icon: CheckCircle,
      color: 'from-green-400 to-green-600',
      bgGradient: 'from-green-50 to-green-100',
      iconBg: 'bg-green-500'
    },
    {
      title: 'Active Users',
      value: '70',
      icon: Users,
      color: 'from-purple-400 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100',
      iconBg: 'bg-purple-500'
    },
    {
      title: 'Completion Rate',
      value: '0%',
      icon: BarChart3,
      color: 'from-orange-400 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100',
      iconBg: 'bg-orange-500'
    }
  ];

  const tools = [
    {
      title: 'New Form',
      description: 'Create a new form from scratch',
      icon: Plus,
      color: 'from-blue-500 to-blue-600',
      link: '/create'
    },
    {
      title: 'Templates',
      description: 'Choose from pre-made templates',
      icon: Layout,
      color: 'from-purple-500 to-purple-600',
      link: '#'
    },
    {
      title: 'Form Settings',
      description: 'Configure your form settings',
      icon: Settings,
      color: 'from-green-500 to-green-600',
      link: '#'
    },
    {
      title: 'Themes',
      description: 'Customize form appearance',
      icon: Palette,
      color: 'from-orange-500 to-orange-600',
      link: '#'
    }
  ];

  const recentActivities = [
    {
      action: 'You edited Contact Form',
      time: '2 hours ago',
      icon: Edit,
      color: 'text-blue-500'
    },
    {
      action: 'You created Feedback Survey',
      time: 'Yesterday',
      icon: Circle,
      color: 'text-green-500'
    },
    {
      action: 'New submission on Registration Form',
      time: '2 days ago',
      icon: Circle,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6`}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${theme === 'light' 
            ? 'from-gray-900 via-blue-800 to-indigo-900' 
            : 'from-white via-blue-200 to-indigo-200'
          } bg-clip-text text-transparent`}>
            Form Builder Dashboard
          </h1>
          <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
            Create, manage, and analyze your forms with ease
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Card key={index} className={`${theme === 'light' 
              ? `bg-gradient-to-br ${stat.bgGradient} border-white/50 shadow-lg hover:shadow-xl` 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl hover:shadow-purple-500/10'
            } backdrop-blur-sm transition-all duration-300 hover:scale-105 overflow-hidden relative`}>
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full"></div>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  {stat.title}
                </CardTitle>
                <div className={`${stat.iconBg} p-2 rounded-lg shadow-md`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Builder Tools */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/80 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <Layout className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className={`text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Form Builder Tools
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {tools.map((tool, index) => (
                    <Link key={index} to={tool.link}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-6 rounded-xl ${theme === 'light' 
                          ? 'bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 border border-gray-200' 
                          : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
                        } transition-all duration-300 cursor-pointer group`}
                      >
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
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/80 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className={`text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Recent Activity
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex items-start gap-3 p-3 rounded-lg ${theme === 'light' 
                        ? 'bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200' 
                        : 'bg-gray-700/50 hover:bg-gray-700'
                      } transition-all duration-300`}
                    >
                      <div className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-white' : 'bg-gray-600'}`}>
                        <activity.icon className={`h-3 w-3 ${activity.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                          {activity.action}
                        </p>
                        <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                          {activity.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Your Forms Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className={`${theme === 'light' 
            ? 'bg-white/80 border-white/50 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg">
                    <FileText className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className={`text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    Your Forms
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
              <div className={`p-8 rounded-xl ${theme === 'light' 
                ? 'bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200' 
                : 'bg-gray-700/50 border border-gray-600'
              } text-center`}>
                <div className={`w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  No forms found
                </h3>
                <p className={`text-sm mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Get started by creating your first form
                </p>
                <Link to="/create">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Form
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
