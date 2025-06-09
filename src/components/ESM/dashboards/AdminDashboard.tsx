
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Settings,
  BarChart3,
  Shield,
  Database,
  UserPlus,
  FileText,
  Calendar,
  Bell,
  TrendingUp,
  DollarSign,
  Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'Total Students', value: '2,847', change: '+12%', icon: Users, color: 'from-blue-500 to-cyan-400' },
    { title: 'Active Teachers', value: '156', change: '+8%', icon: GraduationCap, color: 'from-emerald-500 to-green-400' },
    { title: 'Total Courses', value: '89', change: '+15%', icon: BookOpen, color: 'from-purple-500 to-violet-400' },
    { title: 'Revenue', value: '$45,320', change: '+23%', icon: DollarSign, color: 'from-orange-500 to-red-400' }
  ];

  const systemModules = [
    { name: 'Student Information System', description: 'Manage student data and records', icon: Users, path: '/platform/esm/admin/sis' },
    { name: 'Academic Management', description: 'Courses, curriculum, and academics', icon: BookOpen, path: '/platform/esm/admin/academics' },
    { name: 'Finance Management', description: 'Fee collection and financial reports', icon: DollarSign, path: '/platform/esm/admin/finance' },
    { name: 'HR & Staff Management', description: 'Employee records and payroll', icon: Shield, path: '/platform/esm/admin/hr' },
    { name: 'Reports & Analytics', description: 'System reports and insights', icon: BarChart3, path: '/platform/esm/admin/reports' },
    { name: 'System Settings', description: 'Configure system parameters', icon: Settings, path: '/platform/esm/admin/settings' }
  ];

  const recentActivities = [
    { type: 'user', action: 'New student registered', user: 'John Doe', time: '5 minutes ago' },
    { type: 'payment', action: 'Fee payment received', user: 'Sarah Smith', time: '15 minutes ago' },
    { type: 'system', action: 'System backup completed', user: 'System', time: '1 hour ago' },
    { type: 'alert', action: 'Low attendance alert', user: 'Class 10-A', time: '2 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 bg-clip-text text-transparent">
              Administrator Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Complete system overview and management</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-100 text-green-800 border-green-300">System Online</Badge>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications (3)
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {stat.change} from last month
                      </Badge>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="modules">Modules</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Modules */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    System Modules
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {systemModules.slice(0, 4).map((module, index) => (
                      <div key={index} className="p-3 rounded-lg border hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-blue-100">
                            <module.icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{module.name}</h4>
                            <p className="text-xs text-gray-600">{module.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-blue-100">
                          <Users className="h-3 w-3 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-gray-600">{activity.user}</p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {systemModules.map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                        <module.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2">{module.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{module.description}</p>
                      <Button className="w-full" variant="outline">
                        Access Module
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">User Management System</h3>
                  <p className="text-gray-600 mb-6">Manage all system users and their permissions</p>
                  <Button>Access User Management</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">System Reports</h3>
                  <p className="text-gray-600 mb-6">Generate comprehensive reports and analytics</p>
                  <Button>View Reports</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">System Configuration</h3>
                  <p className="text-gray-600 mb-6">Configure system settings and parameters</p>
                  <Button>Access Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
