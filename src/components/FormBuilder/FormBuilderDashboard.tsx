import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Search, Filter, MoreVertical, Eye, Edit, 
  Trash2, Copy, Share2, Download, Upload, Star,
  BarChart3, Users, Clock, Target, TrendingUp,
  FileText, Calendar, Settings, Database,
  Link, ChevronRight, Sparkles, Activity,
  CheckCircle2, AlertTriangle, Zap, Globe,
  Heart, Award, Timer, MousePointer, Calculator,
  Smartphone, Cloud, Bell, Shield, Wand2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import AdvancedCapabilities from './AdvancedCapabilities';

interface FormInsight {
  id: string;
  name: string;
  submissions: number;
  views: number;
  conversionRate: number;
  avgCompletionTime: string;
  status: 'published' | 'draft' | 'archived';
  lastModified: string;
  category: string;
  thumbnail?: string;
  capabilities: string[];
  shareUrl: string;
  trending?: boolean;
  featured?: boolean;
  analytics: {
    dailyViews: number[];
    weeklySubmissions: number[];
    topCountries: { name: string; count: number }[];
    deviceBreakdown: { desktop: number; mobile: number; tablet: number };
    completionRate: number;
    dropoffPoints: string[];
    performance: 'excellent' | 'good' | 'average' | 'poor';
    userSatisfaction: number;
  };
}

const FormBuilderDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<FormInsight | null>(null);
  const [insightsDialogOpen, setInsightsDialogOpen] = useState(false);
  const [showCapabilities, setShowCapabilities] = useState(false);

  // Enhanced mock form data with new features
  const [forms, setForms] = useState<FormInsight[]>([
    {
      id: '1',
      name: 'Customer Feedback Survey',
      submissions: 492,
      views: 2572,
      conversionRate: 19.3,
      avgCompletionTime: '3m 45s',
      status: 'published',
      lastModified: '2 hours ago',
      category: 'Survey',
      trending: true,
      featured: true,
      capabilities: ['ai-insights', 'real-time-analytics', 'mobile-optimized'],
      shareUrl: 'https://forms.mysite.com/customer-feedback',
      analytics: {
        dailyViews: [145, 152, 138, 161, 149, 155, 143],
        weeklySubmissions: [63, 71, 68, 75, 82, 78, 69],
        topCountries: [
          { name: 'United States', count: 189 },
          { name: 'Canada', count: 127 },
          { name: 'United Kingdom', count: 95 }
        ],
        deviceBreakdown: { desktop: 55, mobile: 40, tablet: 5 },
        completionRate: 92.1,
        dropoffPoints: ['Optional Questions', 'Contact Info'],
        performance: 'excellent',
        userSatisfaction: 4.8
      }
    },
    {
      id: '2',
      name: 'Event Registration Form',
      submissions: 324,
      views: 1890,
      conversionRate: 17.1,
      avgCompletionTime: '2m 30s',
      status: 'published',
      lastModified: '1 day ago',
      category: 'Registration',
      trending: false,
      featured: false,
      capabilities: ['payment-integration', 'automated-emails', 'calendar-sync'],
      shareUrl: 'https://forms.mysite.com/event-registration',
      analytics: {
        dailyViews: [98, 105, 120, 89, 134, 112, 98],
        weeklySubmissions: [42, 48, 45, 52, 61, 55, 43],
        topCountries: [
          { name: 'United States', count: 156 },
          { name: 'Australia', count: 78 },
          { name: 'Germany', count: 65 }
        ],
        deviceBreakdown: { desktop: 45, mobile: 50, tablet: 5 },
        completionRate: 85.3,
        dropoffPoints: ['Payment Info', 'Personal Details'],
        performance: 'good',
        userSatisfaction: 4.5
      }
    },
    {
      id: '3',
      name: 'Job Application Portal',
      submissions: 156,
      views: 780,
      conversionRate: 20.0,
      avgCompletionTime: '8m 15s',
      status: 'draft',
      lastModified: '3 days ago',
      category: 'Application',
      trending: false,
      featured: false,
      capabilities: ['file-upload', 'multi-step', 'save-progress'],
      shareUrl: 'https://forms.mysite.com/job-application',
      analytics: {
        dailyViews: [45, 52, 38, 61, 49, 55, 43],
        weeklySubmissions: [18, 24, 22, 28, 31, 25, 19],
        topCountries: [
          { name: 'United States', count: 89 },
          { name: 'India', count: 42 },
          { name: 'United Kingdom', count: 25 }
        ],
        deviceBreakdown: { desktop: 75, mobile: 20, tablet: 5 },
        completionRate: 95.2,
        dropoffPoints: ['File Upload', 'References'],
        performance: 'excellent',
        userSatisfaction: 4.9
      }
    }
  ]);

  const categories = ['all', 'Survey', 'Registration', 'Application', 'Commerce', 'Contact'];

  const filteredForms = forms.filter(form => {
    const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || form.category === selectedCategory;
    const matchesTab = activeTab === 'all' || form.status === activeTab;
    return matchesSearch && matchesCategory && matchesTab;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'draft': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'archived': return 'bg-slate-100 text-slate-700 border-slate-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'excellent': return 'text-emerald-600';
      case 'good': return 'text-blue-600';
      case 'average': return 'text-amber-600';
      case 'poor': return 'text-red-600';
      default: return 'text-slate-600';
    }
  };

  const handleCopyLink = (form: FormInsight) => {
    navigator.clipboard.writeText(form.shareUrl);
    toast({
      title: "Link copied!",
      description: "Form share link has been copied to clipboard.",
    });
  };

  const handleDuplicate = (form: FormInsight) => {
    const duplicatedForm = {
      ...form,
      id: Date.now().toString(),
      name: `${form.name} (Copy)`,
      status: 'draft' as const,
      lastModified: 'just now',
      submissions: 0,
      views: 0
    };
    setForms(prev => [...prev, duplicatedForm]);
    toast({
      title: "Form duplicated!",
      description: "A copy of the form has been created.",
    });
  };

  const handleDelete = (formId: string) => {
    setForms(prev => prev.filter(form => form.id !== formId));
    toast({
      title: "Form deleted!",
      description: "The form has been permanently deleted.",
      variant: "destructive",
    });
  };

  const handleShare = (form: FormInsight) => {
    setSelectedForm(form);
    setShareDialogOpen(true);
  };

  const handleViewInsights = (form: FormInsight) => {
    setSelectedForm(form);
    setInsightsDialogOpen(true);
  };

  const totalSubmissions = forms.reduce((sum, form) => sum + form.submissions, 0);
  const totalViews = forms.reduce((sum, form) => sum + form.views, 0);
  const avgConversionRate = forms.reduce((sum, form) => sum + form.conversionRate, 0) / forms.length;

  if (showCapabilities) {
    return <AdvancedCapabilities />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header with Visual Appeal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 relative"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full px-6 py-3 shadow-lg mb-6 relative"
          >
            <Sparkles className="h-5 w-5 animate-pulse" />
            <span className="text-sm font-medium">FormCraft Builder Dashboard</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </motion.div>
          
          {/* Main Title with Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight"
          >
            Form Builder Studio
          </motion.h1>
          
          {/* Subtitle with Animation */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto mb-8"
          >
            Create, manage, and analyze your forms with comprehensive insights and advanced tools
          </motion.p>

          {/* Enhanced Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8"
          >
            <motion.div whileHover={{ scale: 1.05, y: -5 }} className="group">
              <Button
                onClick={() => navigate('/form-builder/new')}
                className="w-full h-32 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white shadow-xl border-0 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex flex-col items-center space-y-3 relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Plus className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">Quick Start</div>
                    <div className="text-sm opacity-90">Blank form</div>
                  </div>
                </div>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -5 }} className="group">
              <Button
                onClick={() => navigate('/tools/ai-form-generator')}
                className="w-full h-32 bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 hover:from-purple-600 hover:via-purple-700 hover:to-pink-700 text-white shadow-xl border-0 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex flex-col items-center space-y-3 relative z-10">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Wand2 className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold">AI Generator</div>
                    <div className="text-sm opacity-90">Smart creation</div>
                  </div>
                </div>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -5 }} className="group">
              <Button
                variant="outline"
                className="w-full h-32 bg-white/80 backdrop-blur-sm border-green-200 hover:bg-green-50 hover:border-green-300 shadow-lg relative overflow-hidden"
                onClick={()=> navigate('/form-wizard')}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex flex-col items-center space-y-3 relative z-10">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-800">Form Wizard</div>
                    <div className="text-sm text-slate-600">Step-by-step</div>
                  </div>
                </div>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -5 }} className="group">
              <Button
                onClick={() => setShowCapabilities(true)}
                variant="outline"
                className="w-full h-32 bg-white/80 backdrop-blur-sm border-orange-200 hover:bg-orange-50 hover:border-orange-300 shadow-lg relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex flex-col items-center space-y-3 relative z-10">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Zap className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-slate-800">Capabilities</div>
                    <div className="text-sm text-slate-600">Advanced tools</div>
                  </div>
                </div>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Quick Stats Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div whileHover={{ scale: 1.02, y: -2 }}>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Total Forms</p>
                    <p className="text-3xl font-bold text-blue-800">{forms.length}</p>
                    <div className="flex items-center text-sm text-blue-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+2 this week</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, y: -2 }}>
            <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">Total Submissions</p>
                    <p className="text-3xl font-bold text-green-800">{totalSubmissions}</p>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+18% this month</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                    <Database className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, y: -2 }}>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Total Views</p>
                    <p className="text-3xl font-bold text-purple-800">{totalViews}</p>
                    <div className="flex items-center text-sm text-purple-600 mt-1">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>+12% this week</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                    <Eye className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Enhanced Capabilities Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-white/90 backdrop-blur-sm border-white/50 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="h-6 w-6 text-purple-600" />
                  Enhanced Capabilities
                  <Badge className="bg-purple-100 text-purple-700">Pro Features</Badge>
                </CardTitle>
                <Button
                  onClick={() => setShowCapabilities(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                >
                  View All
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calculator className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-2">Smart Calculations</h3>
                  <p className="text-sm text-blue-600">Auto-calculate totals and scores</p>
                  <Badge className="mt-2 bg-green-100 text-green-700">Active</Badge>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">Mobile Optimized</h3>
                  <p className="text-sm text-green-600">Perfect on all devices</p>
                  <Badge className="mt-2 bg-green-100 text-green-700">Active</Badge>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Cloud className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-2">Cloud Storage</h3>
                  <p className="text-sm text-purple-600">Secure data backup</p>
                  <Badge className="mt-2 bg-purple-100 text-purple-700">Premium</Badge>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">Smart Notifications</h3>
                  <p className="text-sm text-orange-600">Real-time alerts</p>
                  <Badge className="mt-2 bg-green-100 text-green-700">Active</Badge>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg border border-slate-200 bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : ''}
              >
                List
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Forms Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/90 backdrop-blur-sm border border-white/50 rounded-xl p-1 shadow-lg">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-lg font-medium"
            >
              All Forms ({forms.length})
            </TabsTrigger>
            <TabsTrigger 
              value="published" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-green-600 data-[state=active]:text-white rounded-lg font-medium"
            >
              Published ({forms.filter(f => f.status === 'published').length})
            </TabsTrigger>
            <TabsTrigger 
              value="draft" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-600 data-[state=active]:text-white rounded-lg font-medium"
            >
              Drafts ({forms.filter(f => f.status === 'draft').length})
            </TabsTrigger>
            <TabsTrigger 
              value="archived" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-500 data-[state=active]:to-slate-600 data-[state=active]:text-white rounded-lg font-medium"
            >
              Archived ({forms.filter(f => f.status === 'archived').length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-8">
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredForms.map((form, index) => (
                <motion.div
                  key={form.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group"
                >
                  <Card className="h-full bg-white/95 backdrop-blur-sm border-white/50 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform duration-300" />
                    
                    {/* Trending/Featured Badges */}
                    {form.trending && (
                      <div className="absolute top-4 left-4 z-10">
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </Badge>
                      </div>
                    )}
                    {form.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-white" />
                        </div>
                      </div>
                    )}
                    
                    <CardHeader className="relative pb-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <FileText className="h-4 w-4 text-white" />
                            </div>
                            <Badge className={`${getStatusColor(form.status)} font-medium`}>
                              {form.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 leading-tight">
                            {form.name}
                          </CardTitle>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>Updated {form.lastModified}</span>
                            <div className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded-full ${getPerformanceColor(form.analytics.performance).replace('text-', 'bg-')}`}></div>
                              <span className={getPerformanceColor(form.analytics.performance)}>
                                {form.analytics.performance}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white/80"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white shadow-xl border border-slate-200 z-50 w-48">
                            <DropdownMenuItem onClick={() => navigate(`/form-builder/${form.id}`)} className="hover:bg-blue-50">
                              <Edit className="h-4 w-4 mr-2 text-blue-600" />
                              Edit Form
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCopyLink(form)} className="hover:bg-green-50">
                              <Link className="h-4 w-4 mr-2 text-green-600" />
                              Copy Link
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleShare(form)} className="hover:bg-purple-50">
                              <Share2 className="h-4 w-4 mr-2 text-purple-600" />
                              Share Form
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDuplicate(form)} className="hover:bg-amber-50">
                              <Copy className="h-4 w-4 mr-2 text-amber-600" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleViewInsights(form)} className="hover:bg-indigo-50">
                              <BarChart3 className="h-4 w-4 mr-2 text-indigo-600" />
                              View Insights
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => navigate(`/form-submissions/${form.id}`)} className="hover:bg-teal-50">
                              <Database className="h-4 w-4 mr-2 text-teal-600" />
                              View Submissions
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(form.id)}
                              className="text-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative space-y-6 pt-2">
                      {/* Simplified Stats Grid - Removed conversion and avg time */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-blue-700">{form.submissions}</div>
                          <div className="text-xs text-blue-600 font-medium">Submissions</div>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
                          <div className="text-2xl font-bold text-green-700">{form.views}</div>
                          <div className="text-xs text-green-600 font-medium">Views</div>
                        </div>
                      </div>

                      {/* Enhanced Performance Insights */}
                      <div className="bg-slate-50 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-slate-700">Performance</span>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-bold text-slate-800">{form.analytics.userSatisfaction}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${form.analytics.completionRate}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold text-slate-700">{form.analytics.completionRate}%</span>
                        </div>
                      </div>
                      
                      {/* Enhanced Capabilities */}
                      <div className="flex flex-wrap gap-2">
                        {form.capabilities.slice(0, 2).map((capability, idx) => (
                          <Badge 
                            key={capability} 
                            variant="outline" 
                            className="text-xs bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200 text-slate-700 font-medium"
                          >
                            {capability}
                          </Badge>
                        ))}
                        {form.capabilities.length > 2 && (
                          <Badge variant="outline" className="text-xs bg-slate-100 border-slate-200 text-slate-600">
                            +{form.capabilities.length - 2} more
                          </Badge>
                        )}
                      </div>
                      
                      {/* Enhanced Action Buttons */}
                      <div className="flex gap-2 pt-4 border-t border-slate-100">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
                          onClick={() => navigate(`/form-preview/${form.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-md"
                          onClick={() => navigate(`/form-builder/${form.id}`)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-blue-600" />
              Share Form
            </DialogTitle>
            <DialogDescription>
              Share your form with others using the link below
            </DialogDescription>
          </DialogHeader>
          {selectedForm && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border">
                <Globe className="h-4 w-4 text-slate-500" />
                <Input
                  value={selectedForm.shareUrl}
                  readOnly
                  className="border-0 bg-transparent text-sm"
                />
                <Button
                  size="sm"
                  onClick={() => handleCopyLink(selectedForm)}
                  className="shrink-0 bg-blue-600 hover:bg-blue-700"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" variant="outline">
                  <Share2 className="h-4 w-4 mr-2" />
                  Social Media
                </Button>
                <Button className="flex-1" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  QR Code
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Insights Dialog */}
      <Dialog open={insightsDialogOpen} onOpenChange={setInsightsDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[80vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <BarChart3 className="h-6 w-6 text-blue-600" />
              Advanced Form Analytics - {selectedForm?.name}
            </DialogTitle>
            <DialogDescription>
              Comprehensive insights and performance metrics with detailed analysis
            </DialogDescription>
          </DialogHeader>
          {selectedForm && (
            <div className="space-y-8">
              {/* Enhanced Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-800">{selectedForm.analytics.completionRate}%</div>
                  <div className="text-sm text-blue-600 font-medium">Completion Rate</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Database className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-green-800">{selectedForm.submissions}</div>
                  <div className="text-sm text-green-600 font-medium">Total Submissions</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                  <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-purple-800">{selectedForm.views}</div>
                  <div className="text-sm text-purple-600 font-medium">Total Views</div>
                </div>
                <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Timer className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-orange-800">{selectedForm.avgCompletionTime}</div>
                  <div className="text-sm text-orange-600 font-medium">Avg. Time</div>
                </div>
              </div>

              {/* User Satisfaction */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-100 rounded-xl p-6 border border-rose-200">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-rose-600" />
                  User Satisfaction
                </h4>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold text-rose-700">{selectedForm.analytics.userSatisfaction}</div>
                  <div className="flex-1">
                    <div className="flex gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-5 w-5 ${star <= selectedForm.analytics.userSatisfaction ? 'text-amber-400 fill-current' : 'text-slate-300'}`} />
                      ))}
                    </div>
                    <div className="text-sm text-slate-600">Based on user feedback and completion patterns</div>
                  </div>
                </div>
              </div>

              {/* Enhanced Device Breakdown */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-6 border border-slate-200">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <MousePointer className="h-5 w-5 text-slate-600" />
                  Device Analytics
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-slate-800">{selectedForm.analytics.deviceBreakdown.desktop}%</div>
                    <div className="text-sm text-slate-600 font-medium">Desktop</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${selectedForm.analytics.deviceBreakdown.desktop}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-slate-800">{selectedForm.analytics.deviceBreakdown.mobile}%</div>
                    <div className="text-sm text-slate-600 font-medium">Mobile</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${selectedForm.analytics.deviceBreakdown.mobile}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-slate-800">{selectedForm.analytics.deviceBreakdown.tablet}%</div>
                    <div className="text-sm text-slate-600 font-medium">Tablet</div>
                    <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${selectedForm.analytics.deviceBreakdown.tablet}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Top Countries */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-xl p-6 border border-emerald-200">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-emerald-600" />
                  Geographic Distribution
                </h4>
                <div className="space-y-3">
                  {selectedForm.analytics.topCountries.map((country, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold text-sm">
                          {index + 1}
                        </div>
                        <span className="font-medium text-slate-800">{country.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-700">{country.count}</span>
                        <span className="text-sm text-slate-600">submissions</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Drop-off Points */}
              <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-xl p-6 border border-red-200">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Optimization Opportunities
                </h4>
                <div className="space-y-3">
                  {selectedForm.analytics.dropoffPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-800">{point}</div>
                        <div className="text-sm text-slate-600">Common drop-off point - consider simplifying</div>
                      </div>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                        Optimize
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormBuilderDashboard;
