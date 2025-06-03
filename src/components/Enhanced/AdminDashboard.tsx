
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, Users, FileText, TrendingUp, Search, Filter,
  Download, Eye, MessageSquare, UserCheck, Clock, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

interface AdminDashboardProps {
  className?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ className }) => {
  const [stats, setStats] = useState({
    totalSubmissions: 1247,
    todaySubmissions: 23,
    averageTime: '2m 34s',
    conversionRate: 73.2,
    pendingApprovals: 8,
    activeUsers: 156
  });

  const [recentSubmissions] = useState([
    {
      id: '1',
      formName: 'Customer Feedback',
      submitter: 'john@example.com',
      timestamp: '2 minutes ago',
      status: 'pending'
    },
    {
      id: '2',
      formName: 'Product Registration',
      submitter: 'sarah@example.com',
      timestamp: '5 minutes ago',
      status: 'approved'
    },
    {
      id: '3',
      formName: 'Support Request',
      submitter: 'mike@example.com',
      timestamp: '12 minutes ago',
      status: 'processing'
    }
  ]);

  return (
    <div className={`p-6 space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Monitor and manage all form submissions</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
            <Eye className="h-4 w-4 mr-2" />
            Live View
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Submissions</p>
                <p className="text-3xl font-bold">{stats.totalSubmissions.toLocaleString()}</p>
              </div>
              <FileText className="h-12 w-12 text-blue-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Today's Submissions</p>
                <p className="text-3xl font-bold">{stats.todaySubmissions}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-green-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Conversion Rate</p>
                <p className="text-3xl font-bold">{stats.conversionRate}%</p>
              </div>
              <Activity className="h-12 w-12 text-purple-200" />
            </div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Pending Approvals</p>
                <p className="text-3xl font-bold">{stats.pendingApprovals}</p>
              </div>
              <AlertCircle className="h-12 w-12 text-orange-200" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="submissions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="submissions">Recent Submissions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Recent Submissions</h3>
              <div className="flex gap-2">
                <Input placeholder="Search submissions..." className="w-64" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {recentSubmissions.map((submission) => (
                <motion.div
                  key={submission.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div>
                      <h4 className="font-medium">{submission.formName}</h4>
                      <p className="text-sm text-gray-600">{submission.submitter}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500">{submission.timestamp}</span>
                    <Badge 
                      variant={submission.status === 'approved' ? 'default' : 'secondary'}
                      className={
                        submission.status === 'approved' 
                          ? 'bg-green-100 text-green-700' 
                          : submission.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-blue-100 text-blue-700'
                      }
                    >
                      {submission.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Form Analytics</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                <p>Analytics dashboard coming soon</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Notification Rules</h3>
            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600">
                Create New Notification Rule
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Dashboard Settings</h3>
            <div className="space-y-4">
              <p className="text-gray-600">Configure dashboard preferences and permissions</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
