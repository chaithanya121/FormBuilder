import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  TrendingUp, Users, Eye, Clock, MousePointer, Calendar,
  Download, Filter, RefreshCw, BarChart3, PieChart as PieChartIcon,
  ArrowUp, ArrowDown, Activity, Globe, Smartphone
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdvancedAnalytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedForm, setSelectedForm] = useState('all');

  // Sample analytics data
  const submissionData = [
    { date: '2024-01-01', submissions: 45, views: 120, conversion: 37.5 },
    { date: '2024-01-02', submissions: 52, views: 135, conversion: 38.5 },
    { date: '2024-01-03', submissions: 38, views: 98, conversion: 38.8 },
    { date: '2024-01-04', submissions: 61, views: 145, conversion: 42.1 },
    { date: '2024-01-05', submissions: 55, views: 132, conversion: 41.7 },
    { date: '2024-01-06', submissions: 67, views: 156, conversion: 43.0 },
    { date: '2024-01-07', submissions: 72, views: 168, conversion: 42.9 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 65, color: '#3b82f6' },
    { name: 'Mobile', value: 30, color: '#10b981' },
    { name: 'Tablet', value: 5, color: '#f59e0b' },
  ];

  const geographyData = [
    { name: 'United States', value: 45, color: '#3b82f6' },
    { name: 'United Kingdom', value: 20, color: '#10b981' },
    { name: 'Canada', value: 15, color: '#f59e0b' },
    { name: 'Germany', value: 12, color: '#ef4444' },
    { name: 'Others', value: 8, color: '#8b5cf6' },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Advanced Analytics
            </h1>
            <p className="text-gray-600 mt-2">Deep insights into your form performance</p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={selectedForm} onValueChange={setSelectedForm}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select form" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Forms</SelectItem>
                <SelectItem value="contact">Contact Form</SelectItem>
                <SelectItem value="survey">Survey Form</SelectItem>
                <SelectItem value="feedback">Feedback Form</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 Hours</SelectItem>
                <SelectItem value="7d">7 Days</SelectItem>
                <SelectItem value="30d">30 Days</SelectItem>
                <SelectItem value="90d">90 Days</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
            
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Total Submissions', value: '1,234', change: '+12.5%', trend: 'up', icon: Users, color: 'blue' },
            { label: 'Form Views', value: '8,456', change: '+8.2%', trend: 'up', icon: Eye, color: 'green' },
            { label: 'Conversion Rate', value: '14.6%', change: '+2.1%', trend: 'up', icon: TrendingUp, color: 'purple' },
            { label: 'Avg. Completion Time', value: '2m 34s', change: '-5.3%', trend: 'down', icon: Clock, color: 'orange' },
          ].map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        {metric.trend === 'up' ? (
                          <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-full bg-${metric.color}-100`}>
                      <metric.icon className={`h-6 w-6 text-${metric.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Submissions Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Submissions Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={submissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="submissions" 
                    stroke="#3b82f6" 
                    fill="url(#gradient)" 
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Device Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Device Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Conversion Funnel */}
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={submissionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#e5e7eb" name="Views" />
                  <Bar dataKey="submissions" fill="#3b82f6" name="Submissions" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={geographyData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {geographyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics Table */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Form Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Form Name</th>
                    <th className="text-left p-3">Views</th>
                    <th className="text-left p-3">Submissions</th>
                    <th className="text-left p-3">Conversion Rate</th>
                    <th className="text-left p-3">Avg. Time</th>
                    <th className="text-left p-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Contact Form', views: 1234, submissions: 187, conversion: '15.2%', time: '2m 15s', status: 'Active' },
                    { name: 'Newsletter Signup', views: 2156, submissions: 432, conversion: '20.0%', time: '1m 23s', status: 'Active' },
                    { name: 'Feedback Survey', views: 987, submissions: 123, conversion: '12.5%', time: '4m 12s', status: 'Active' },
                    { name: 'Event Registration', views: 543, submissions: 87, conversion: '16.0%', time: '3m 45s', status: 'Paused' },
                  ].map((form, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{form.name}</td>
                      <td className="p-3">{form.views.toLocaleString()}</td>
                      <td className="p-3">{form.submissions}</td>
                      <td className="p-3">{form.conversion}</td>
                      <td className="p-3">{form.time}</td>
                      <td className="p-3">
                        <Badge variant={form.status === 'Active' ? 'default' : 'secondary'}>
                          {form.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdvancedAnalytics;
