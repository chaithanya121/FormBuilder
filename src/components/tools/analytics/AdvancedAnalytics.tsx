import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  ArrowLeft, 
  TrendingUp, 
  Users, 
  Eye, 
  Clock, 
  Download, 
  Filter,
  Calendar,
  PieChart,
  Activity,
  Target,
  MousePointer,
  Smartphone,
  Monitor,
  Globe,
  RefreshCw,
  Share2,
  Star,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingDown,
  Zap,
  Heart,
  MessageSquare,
  ThumbsUp,
  Award
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart as RechartsPieChart, Cell, LineChart, Line, AreaChart, Area, Pie, RadialBarChart, RadialBar, FunnelChart, Funnel, LabelList } from 'recharts';

const ENHANCED_SAMPLE_DATA = {
  submissions: [
    { month: 'Jan', submissions: 120, views: 1250, conversion: 9.6, bounceRate: 34, avgTime: 180 },
    { month: 'Feb', submissions: 145, views: 1380, conversion: 10.5, bounceRate: 32, avgTime: 195 },
    { month: 'Mar', submissions: 168, views: 1420, conversion: 11.8, bounceRate: 28, avgTime: 210 },
    { month: 'Apr', submissions: 155, views: 1680, conversion: 9.2, bounceRate: 30, avgTime: 185 },
    { month: 'May', submissions: 192, views: 1890, conversion: 10.2, bounceRate: 26, avgTime: 220 },
    { month: 'Jun', submissions: 210, views: 2100, conversion: 10.0, bounceRate: 25, avgTime: 235 }
  ],
  realTime: {
    activeUsers: 47,
    currentSessions: 23,
    pageViews: 156,
    bounceRate: 23.4,
    avgSessionDuration: 245
  },
  devices: [
    { name: 'Desktop', value: 65, color: '#3b82f6', users: 1420 },
    { name: 'Mobile', value: 28, color: '#10b981', users: 612 },
    { name: 'Tablet', value: 7, color: '#f59e0b', users: 153 }
  ],
  browsers: [
    { name: 'Chrome', value: 45, color: '#ef4444', sessions: 982 },
    { name: 'Safari', value: 25, color: '#06b6d4', sessions: 546 },
    { name: 'Firefox', value: 15, color: '#8b5cf6', sessions: 328 },
    { name: 'Edge', value: 10, color: '#10b981', sessions: 218 },
    { name: 'Other', value: 5, color: '#64748b', sessions: 109 }
  ],
  countries: [
    { name: 'United States', submissions: 450, percentage: 42, sessions: 1250, revenue: 12500 },
    { name: 'Canada', submissions: 180, percentage: 17, sessions: 520, revenue: 5200 },
    { name: 'United Kingdom', submissions: 120, percentage: 11, sessions: 380, revenue: 3800 },
    { name: 'Germany', submissions: 95, percentage: 9, sessions: 290, revenue: 2900 },
    { name: 'France', submissions: 85, percentage: 8, sessions: 260, revenue: 2600 },
    { name: 'Others', submissions: 140, percentage: 13, sessions: 450, revenue: 4500 }
  ],
  fieldAnalytics: [
    { field: 'Email', completionRate: 95, avgTime: 8, errors: 5, exitRate: 2.1, score: 'A' },
    { field: 'Name', completionRate: 98, avgTime: 12, errors: 2, exitRate: 1.8, score: 'A+' },
    { field: 'Phone', completionRate: 78, avgTime: 15, errors: 18, exitRate: 8.5, score: 'C' },
    { field: 'Message', completionRate: 85, avgTime: 45, errors: 8, exitRate: 5.2, score: 'B' },
    { field: 'Company', completionRate: 72, avgTime: 20, errors: 12, exitRate: 9.8, score: 'C+' }
  ],
  conversionFunnel: [
    { stage: 'Form View', users: 2100, percentage: 100, color: '#3b82f6', icon: Eye },
    { stage: 'Started Filling', users: 1638, percentage: 78, color: '#06b6d4', icon: MousePointer },
    { stage: 'First Field', users: 1512, percentage: 72, color: '#10b981', icon: Users },
    { stage: 'Half Complete', users: 1365, percentage: 65, color: '#f59e0b', icon: Activity },
    { stage: 'Reached Submit', users: 1218, percentage: 58, color: '#ef4444', icon: Target },
    { stage: 'Completed', users: 1050, percentage: 50, color: '#8b5cf6', icon: CheckCircle }
  ],
  topPages: [
    { page: '/contact-form', views: 1250, submissions: 210, conversionRate: 16.8 },
    { page: '/newsletter-signup', views: 890, submissions: 156, conversionRate: 17.5 },
    { page: '/feedback-form', views: 650, submissions: 98, conversionRate: 15.1 },
    { page: '/survey-form', views: 420, submissions: 67, conversionRate: 15.9 }
  ],
  engagement: [
    { metric: 'Avg. Time on Form', value: '3m 42s', trend: '+15s', color: 'green' },
    { metric: 'Field Completion Rate', value: '86%', trend: '+3%', color: 'green' },
    { metric: 'Error Rate', value: '8.5%', trend: '-2%', color: 'green' },
    { metric: 'Abandonment Rate', value: '42%', trend: '-5%', color: 'green' }
  ]
};

export const AdvancedAnalytics = () => {
  const { theme } = useTheme();
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedForm, setSelectedForm] = useState('all-forms');
  const [activeTab, setActiveTab] = useState('overview');
  const [isRealTime, setIsRealTime] = useState(false);

  const exportData = (format: string) => {
    const data = JSON.stringify(ENHANCED_SAMPLE_DATA, null, 2);
    const blob = new Blob([data], { type: format === 'json' ? 'application/json' : 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const MetricCard = ({ icon: Icon, label, value, change, trend, color = 'blue' }: any) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <Card className={`${theme === 'light' 
        ? 'bg-white/90 border-white/50 shadow-xl hover:shadow-2xl' 
        : 'bg-gray-800/50 border-gray-700 shadow-2xl hover:shadow-3xl'
      } backdrop-blur-sm transition-all duration-300`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r from-${color}-500 to-${color}-600 shadow-lg`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center gap-1">
              {trend === 'up' ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : trend === 'down' ? (
                <TrendingDown className="h-4 w-4 text-red-500" />
              ) : null}
              <span className={`text-sm font-medium ${
                change.startsWith('+') ? 'text-green-600' : change.startsWith('-') ? 'text-red-600' : 'text-gray-600'
              }`}>
                {change}
              </span>
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold mb-1">{value}</p>
            <p className="text-sm text-gray-600">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Link to="/tools">
              <Button variant="outline" size="sm" className="hover:scale-105 transition-transform">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl shadow-lg">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className={`text-4xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Advanced Analytics
                </h1>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-lg`}>
                  Comprehensive insights and performance metrics
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={isRealTime ? "default" : "outline"}
              size="sm"
              onClick={() => setIsRealTime(!isRealTime)}
              className="transition-all duration-200"
            >
              {isRealTime ? <Zap className="h-4 w-4 mr-2 animate-pulse" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              {isRealTime ? 'Live' : 'Real-time'}
            </Button>

            <Select value={selectedForm} onValueChange={setSelectedForm}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-forms">All Forms</SelectItem>
                <SelectItem value="contact-form">Contact Form</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
                <SelectItem value="feedback">Feedback Form</SelectItem>
                <SelectItem value="survey">Survey Form</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-24-hours">Last 24 hours</SelectItem>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-3-months">Last 3 months</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => exportData('json')} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </motion.div>

        {/* Real-time Dashboard Alert */}
        {isRealTime && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-xl shadow-lg"
          >
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 animate-pulse" />
              <span className="font-medium">Real-time mode active</span>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {ENHANCED_SAMPLE_DATA.realTime.activeUsers} active users
              </Badge>
            </div>
          </motion.div>
        )}

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard
            icon={Users}
            label="Total Submissions"
            value="2,187"
            change="+12.3%"
            trend="up"
            color="blue"
          />
          <MetricCard
            icon={Eye}
            label="Form Views"
            value="18,450"
            change="+8.7%"
            trend="up"
            color="green"
          />
          <MetricCard
            icon={TrendingUp}
            label="Conversion Rate"
            value="11.8%"
            change="+2.1%"
            trend="up"
            color="purple"
          />
          <MetricCard
            icon={Clock}
            label="Avg. Completion Time"
            value="3m 42s"
            change="-15s"
            trend="down"
            color="orange"
          />
          <MetricCard
            icon={Heart}
            label="User Satisfaction"
            value="4.8/5"
            change="+0.2"
            trend="up"
            color="pink"
          />
        </div>

        {/* Enhanced Analytics Tabs */}
        <Card className={`${theme === 'light' 
          ? 'bg-white/90 border-white/50 shadow-xl' 
          : 'bg-gray-800/50 border-gray-700 shadow-2xl'
        } backdrop-blur-sm`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Activity className="h-6 w-6 text-emerald-500" />
              Detailed Analytics Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="audience">Audience</TabsTrigger>
                <TabsTrigger value="conversion">Conversion</TabsTrigger>
                <TabsTrigger value="fields">Field Analysis</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Enhanced Submissions Trend */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Submissions & Views Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={350}>
                        <AreaChart data={ENHANCED_SAMPLE_DATA.submissions}>
                          <defs>
                            <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="views" stroke="#10b981" fill="url(#colorViews)" name="Views" />
                          <Area type="monotone" dataKey="submissions" stroke="#3b82f6" fill="url(#colorSubmissions)" name="Submissions" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  {/* Device Breakdown with Enhanced Design */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Monitor className="h-5 w-5" />
                        Device & Platform Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={350}>
                        <RechartsPieChart>
                          <Pie
                            data={ENHANCED_SAMPLE_DATA.devices}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({name, percent, users}) => `${name}: ${(percent * 100).toFixed(0)}% (${users})`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {ENHANCED_SAMPLE_DATA.devices.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value, name, props) => [`${value}% (${props.payload.users} users)`, name]} />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Performing Pages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Top Performing Forms
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {ENHANCED_SAMPLE_DATA.topPages.map((page, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-mono text-xs">
                              #{index + 1}
                            </Badge>
                            <div>
                              <p className="font-medium">{page.page}</p>
                              <p className="text-sm text-gray-600">{page.views.toLocaleString()} views • {page.submissions} submissions</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg">{page.conversionRate}%</p>
                            <p className="text-sm text-gray-600">conversion</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="performance" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Performance Metrics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <MessageSquare className="h-5 w-5 text-blue-500" />
                            <span>Form Views</span>
                          </div>
                          <span className="font-semibold">18,450</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <ThumbsUp className="h-5 w-5 text-green-500" />
                            <span>Submissions</span>
                          </div>
                          <span className="font-semibold">2,187</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Eye className="h-5 w-5 text-yellow-500" />
                            <span>Conversion Rate</span>
                          </div>
                          <span className="font-semibold">11.8%</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-orange-500" />
                            <span>Avg. Completion Time</span>
                          </div>
                          <span className="font-semibold">3m 42s</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Heart className="h-5 w-5 text-pink-500" />
                            <span>User Satisfaction</span>
                          </div>
                          <span className="font-semibold">4.8/5</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="audience" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Geographic Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {ENHANCED_SAMPLE_DATA.countries.map((country, index) => (
                          <div key={country.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Globe className="h-4 w-4 text-gray-500" />
                              <span className="font-medium">{country.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full" 
                                  style={{ width: `${country.percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 w-12">{country.percentage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Browser Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Pie
                            data={ENHANCED_SAMPLE_DATA.browsers}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {ENHANCED_SAMPLE_DATA.browsers.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="conversion" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Conversion Funnel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Stage</th>
                            <th className="text-left py-3 px-4">Users</th>
                            <th className="text-left py-3 px-4">Percentage</th>
                            <th className="text-left py-3 px-4">Icon</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ENHANCED_SAMPLE_DATA.conversionFunnel.map((stage, index) => (
                            <tr key={stage.stage} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4 font-medium">{stage.stage}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="h-2 rounded-full" 
                                      style={{ width: `${stage.percentage}%`, backgroundColor: stage.color }}
                                    />
                                  </div>
                                  <span className="text-sm">{stage.users.toLocaleString()}</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{stage.percentage}%</td>
                              <td className="py-3 px-4">
                                <div className="p-2 rounded-lg" style={{ backgroundColor: `${stage.color}20` }}>
                                  <stage.icon className="h-6 w-6" style={{ color: stage.color }} />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="fields" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Field Performance Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Field Name</th>
                            <th className="text-left py-3 px-4">Completion Rate</th>
                            <th className="text-left py-3 px-4">Avg. Time (seconds)</th>
                            <th className="text-left py-3 px-4">Error Rate</th>
                            <th className="text-left py-3 px-4">Performance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ENHANCED_SAMPLE_DATA.fieldAnalytics.map((field, index) => (
                            <tr key={field.field} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4 font-medium">{field.field}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2">
                                  <div className="w-16 bg-gray-200 rounded-full h-2">
                                    <div 
                                      className="bg-green-500 h-2 rounded-full" 
                                      style={{ width: `${field.completionRate}%` }}
                                    />
                                  </div>
                                  <span className="text-sm">{field.completionRate}%</span>
                                </div>
                              </td>
                              <td className="py-3 px-4">{field.avgTime}s</td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  field.errors < 5 ? 'bg-green-100 text-green-800' :
                                  field.errors < 15 ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {field.errors}%
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <Target className={`h-4 w-4 ${
                                  field.completionRate > 90 ? 'text-green-500' :
                                  field.completionRate > 75 ? 'text-yellow-500' :
                                  'text-red-500'
                                }`} />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        AI-Powered Insights
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="font-medium text-green-700">Optimization Opportunity</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          Your phone field has an 18% error rate. Consider adding input validation or formatting hints to improve completion.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertCircle className="h-5 w-5 text-yellow-500" />
                          <span className="font-medium text-yellow-700">Performance Alert</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          Mobile conversion rate is 23% lower than desktop. Consider optimizing your form for mobile devices.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                          <span className="font-medium text-green-700">Success Story</span>
                        </div>
                        <p className="text-sm text-gray-700">
                          Your form completion rate improved by 15% this month! The new design changes are working well.
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Recommended Actions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          { action: "Add field validation for phone numbers", impact: "High", effort: "Low" },
                          { action: "Optimize form for mobile devices", impact: "High", effort: "Medium" },
                          { action: "A/B test shorter form variation", impact: "Medium", effort: "Low" },
                          { action: "Add progress indicator for multi-step forms", impact: "Medium", effort: "Medium" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                            <div>
                              <p className="font-medium text-sm">{item.action}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant={item.impact === 'High' ? 'default' : 'secondary'} className="text-xs">
                                  {item.impact} Impact
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {item.effort} Effort
                                </Badge>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Apply
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
