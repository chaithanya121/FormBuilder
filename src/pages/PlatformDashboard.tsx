
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchForms } from '@/store/slices/formsSlice';
import {
  Plus, Search, Filter, Grid, List, Trash2, Edit3, Eye,
  Calendar, Clock, Users, TrendingUp, Sparkles, Download,
  Activity, FileText, Settings, Palette, Brain, Zap,
  Calculator, Bell, Cloud, Database, Smartphone, 
  Accessibility, MessageSquare, BarChart3, Target
} from 'lucide-react';

const PlatformDashboard: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { forms, loading, error } = useAppSelector((state) => state.forms);

  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');

  // Enhanced stats with new capabilities
  const [stats] = useState({
    totalForms: 24,
    totalSubmissions: 1847,
    todaySubmissions: 47,
    conversionRate: 73.2,
    activeCalculations: 12,
    activeNotifications: 8,
    cloudIntegrations: 3,
    accessibilityScore: 94
  });

  // Enhanced quick actions
  const quickActions = [
    {
      id: 'form-wizard',
      title: 'AI Form Wizard',
      description: 'Create forms with AI assistance',
      icon: <Brain className="h-6 w-6" />,
      color: 'from-purple-500 to-purple-600',
      path: '/form-wizard'
    },
    {
      id: 'blank-form',
      title: 'Blank Form',
      description: 'Start from scratch',
      icon: <Plus className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-600',
      path: '/form-builder/new'
    },
    {
      id: 'admin-dashboard',
      title: 'Admin Dashboard',
      description: 'Monitor submissions & analytics',
      icon: <Activity className="h-6 w-6" />,
      color: 'from-green-500 to-green-600',
      path: '/admin/dashboard'
    },
    {
      id: 'realtime-tracker',
      title: 'Real-time Tracker',
      description: 'Live form activity monitoring',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-orange-500 to-orange-600',
      path: '/realtime-tracker'
    }
  ];

  // Enhanced features showcase
  const enhancedFeatures = [
    {
      icon: <Calculator className="h-5 w-5" />,
      title: 'Calculation Fields',
      description: 'Auto-calculate totals and scores',
      enabled: 12,
      color: 'text-blue-600'
    },
    {
      icon: <Bell className="h-5 w-5" />,
      title: 'Smart Notifications',
      description: 'Email/SMS alerts with conditions',
      enabled: 8,
      color: 'text-green-600'
    },
    {
      icon: <Cloud className="h-5 w-5" />,
      title: 'Cloud Storage',
      description: 'Google Drive, Dropbox integration',
      enabled: 3,
      color: 'text-purple-600'
    },
    {
      icon: <Database className="h-5 w-5" />,
      title: 'Advanced Database',
      description: 'Search, filter, and analytics',
      enabled: 1,
      color: 'text-indigo-600'
    },
    {
      icon: <Smartphone className="h-5 w-5" />,
      title: 'Mobile Optimized',
      description: 'Responsive design & mobile-first',
      enabled: 24,
      color: 'text-pink-600'
    },
    {
      icon: <Accessibility className="h-5 w-5" />,
      title: 'Accessibility',
      description: 'WCAG compliant & screen readers',
      enabled: 18,
      color: 'text-orange-600'
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: 'Team Collaboration',
      description: 'Comments, assignments, workflow',
      enabled: 6,
      color: 'text-teal-600'
    },
    {
      icon: <BarChart3 className="h-5 w-5" />,
      title: 'Advanced Reports',
      description: 'Custom reports & data visualization',
      enabled: 4,
      color: 'text-red-600'
    }
  ];

  useEffect(() => {
    dispatch(fetchForms());
  }, [dispatch]);

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'published' && form.published) ||
      (filterStatus === 'draft' && !form.published);
    return matchesSearch && matchesFilter;
  });

  const handleCreateForm = (actionId: string) => {
    const action = quickActions.find(a => a.id === actionId);
    if (action) {
      navigate(action.path);
    }
  };

  const handleEditForm = (formId: string) => {
    navigate(`/form-builder/${formId}`);
  };

  const handlePreviewForm = (formId: string) => {
    navigate(`/form-preview/${formId}`);
  };

  const handleDeleteForm = (formId: string) => {
    toast({
      title: "Form Deleted",
      description: "The form has been successfully deleted.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Enhanced Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                FormCraft Pro Enhanced
              </h1>
              <p className="text-gray-600 mt-1">AI-powered forms with advanced capabilities</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge className="bg-purple-100 text-purple-700">v4.0 Enterprise</Badge>
                <Badge className="bg-green-100 text-green-700">AI Enhanced</Badge>
                <Badge className="bg-blue-100 text-blue-700">Real-time</Badge>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate('/form-wizard')}
                className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
              >
                <Brain className="h-4 w-4 mr-2" />
                AI Wizard
              </Button>
              <Button
                onClick={() => navigate('/form-builder/new')}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Form
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Forms</p>
                  <p className="text-3xl font-bold">{stats.totalForms}</p>
                </div>
                <FileText className="h-12 w-12 text-blue-200" />
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Submissions</p>
                  <p className="text-3xl font-bold">{stats.totalSubmissions.toLocaleString()}</p>
                </div>
                <Users className="h-12 w-12 text-green-200" />
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Today's Submissions</p>
                  <p className="text-3xl font-bold">{stats.todaySubmissions}</p>
                </div>
                <TrendingUp className="h-12 w-12 text-purple-200" />
              </div>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Conversion Rate</p>
                  <p className="text-3xl font-bold">{stats.conversionRate}%</p>
                </div>
                <Target className="h-12 w-12 text-orange-200" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <motion.div
                key={action.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="p-6 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => handleCreateForm(action.id)}
                >
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center text-white mb-4`}>
                    {action.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Features Showcase */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Enhanced Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {enhancedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-md transition-all">
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gray-100 ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{feature.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{feature.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {feature.enabled} forms using
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Forms Management */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">My Forms</h2>
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              {/* Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="border rounded-md px-3 py-2 text-sm"
              >
                <option value="all">All Forms</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>

              {/* View Mode */}
              <div className="flex border rounded-md">
                <Button
                  size="sm"
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Forms Grid/List */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading forms...</p>
            </div>
          ) : filteredForms.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">No forms found</h3>
              <p className="text-gray-400">Create your first form to get started</p>
            </div>
          ) : (
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              <AnimatePresence>
                {filteredForms.map((form, index) => (
                  <motion.div
                    key={form.primary_id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {viewMode === 'grid' ? (
                      <Card className="hover:shadow-lg transition-all group">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold truncate flex-1">{form.name}</h3>
                            <Badge 
                              className={form.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                            >
                              {form.published ? 'Published' : 'Draft'}
                            </Badge>
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              Created {new Date(form.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              {form.submissions || 0} submissions
                            </div>
                          </div>

                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditForm(form.primary_id)}
                              className="flex-1"
                            >
                              <Edit3 className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePreviewForm(form.primary_id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ) : (
                      <Card className="p-4 hover:shadow-md transition-all">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <FileText className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{form.name}</h3>
                              <p className="text-sm text-gray-600">
                                {form.submissions || 0} submissions • Created {new Date(form.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Badge 
                              className={form.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                            >
                              {form.published ? 'Published' : 'Draft'}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditForm(form.primary_id)}
                            >
                              <Edit3 className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handlePreviewForm(form.primary_id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PlatformDashboard;
