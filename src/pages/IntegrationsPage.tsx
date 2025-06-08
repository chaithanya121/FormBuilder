import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Mail, Database, Webhook, Cloud, Shield, 
  Settings, Check, Plus, ExternalLink, Copy,
  Slack, Github, Calendar, BarChart3, FileText,
  MessageSquare, CreditCard, Users, Globe, Activity,
  Monitor, TrendingUp, AlertCircle, FormInput,
  Sparkles, Star, ArrowRight, Eye, Filter,
  ChevronDown, Search, Bell, Layers
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { formsApi, FormData } from '@/services/api/forms';
import IntegrationConfigModal from '@/components/FormBuilder/Integrations/IntegrationConfigModal';
import { IntegrationsService } from '@/services/integrations';

const IntegrationsPage: React.FC = () => {
  const [selectedFormId, setSelectedFormId] = useState<string>('');
  const [availableForms, setAvailableForms] = useState<FormData[]>([]);
  const [activeTab, setActiveTab] = useState('hub');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null);
  const { toast } = useToast();

  // Load available forms
  useEffect(() => {
    const loadForms = async () => {
      try {
        const forms = await formsApi.getAllForms();
        setAvailableForms(forms);
        if (forms.length > 0) {
          setSelectedFormId(forms[0].primary_id);
        }
      } catch (error) {
        console.error('Error loading forms:', error);
      }
    };
    loadForms();
  }, []);

  const integrations = [
    {
      id: 'email',
      name: 'Email',
      description: 'Send automated email notifications when forms are submitted',
      icon: Mail,
      status: 'available',
      category: 'email',
      color: 'from-red-500 to-pink-500',
      isPopular: true,
      metrics: { connected: 89, success: 97.8 },
      features: ['SMTP Support', 'Templates', 'Multiple Recipients']
    },
    {
      id: 'webhook',
      name: 'Webhook',
      description: 'Send HTTP requests to external services with form data',
      icon: Webhook,
      status: 'available',
      category: 'automation',
      color: 'from-blue-500 to-cyan-500',
      isPopular: true,
      metrics: { connected: 156, success: 99.2 },
      features: ['Custom Headers', 'Authentication', 'Retry Logic']
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect to 5000+ apps and automate complex workflows',
      icon: Zap,
      status: 'available',
      category: 'automation',
      color: 'from-orange-500 to-red-500',
      isPopular: true,
      metrics: { connected: 234, success: 98.5 },
      features: ['5000+ Apps', 'Multi-step Workflows', 'Conditional Logic']
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send instant notifications to Slack channels and direct messages',
      icon: Slack,
      status: 'available',
      category: 'communication',
      color: 'from-purple-500 to-pink-500',
      isPopular: true,
      metrics: { connected: 156, success: 99.2 },
      features: ['Channel Notifications', 'Custom Messages', 'Rich Formatting']
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Real-time data sync with advanced field mapping',
      icon: FileText,
      status: 'available',
      category: 'storage',
      color: 'from-green-500 to-emerald-500',
      isPopular: true,
      metrics: { connected: 67, success: 99.1 },
      features: ['Real-time Sync', 'Field Mapping', 'Multiple Sheets']
    },
    {
      id: 'airtable',
      name: 'Airtable',
      description: 'Structured data management with custom workflows',
      icon: Database,
      status: 'available',
      category: 'storage',
      color: 'from-blue-500 to-cyan-500',
      metrics: { connected: 45, success: 98.9 },
      features: ['Custom Fields', 'Workflows', 'Team Collaboration']
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Secure payment processing with subscription management',
      icon: CreditCard,
      status: 'premium',
      category: 'payment',
      color: 'from-indigo-500 to-purple-500',
      isPremium: true,
      metrics: { connected: 23, success: 99.8 },
      features: ['Payment Processing', 'Subscriptions', 'Security']
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Advanced email marketing with audience segmentation',
      icon: Users,
      status: 'available',
      category: 'email',
      color: 'from-yellow-500 to-orange-500',
      metrics: { connected: 78, success: 98.3 },
      features: ['List Management', 'Automation', 'Analytics']
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Community engagement with rich embed notifications',
      icon: MessageSquare,
      status: 'available',
      category: 'communication',
      color: 'from-blue-600 to-indigo-600',
      metrics: { connected: 34, success: 99.0 },
      features: ['Rich Embeds', 'Bot Integration', 'Server Notifications']
    }
  ];

  const categories = [
    { id: 'all', name: 'All', count: integrations.length },
    { id: 'automation', name: 'Automation', count: integrations.filter(i => i.category === 'automation').length },
    { id: 'email', name: 'Email', count: integrations.filter(i => i.category === 'email').length },
    { id: 'storage', name: 'Storage', count: integrations.filter(i => i.category === 'storage').length },
    { id: 'communication', name: 'Communication', count: integrations.filter(i => i.category === 'communication').length },
    { id: 'payment', name: 'Payment', count: integrations.filter(i => i.category === 'payment').length }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get configured integrations for selected form
  const getConfiguredIntegrations = () => {
    if (!selectedFormId) return [];
    return IntegrationsService.getFormIntegrations(selectedFormId);
  };

  const isIntegrationConfigured = (integrationId: string) => {
    if (!selectedFormId) return false;
    const config = IntegrationsService.getIntegration(selectedFormId, integrationId);
    return config && config.enabled;
  };

  const handleConfigureIntegration = (integration: any) => {
    if (!selectedFormId) {
      toast({
        title: "No Form Selected",
        description: "Please select a form first to configure integrations.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedIntegration(integration);
    setConfigModalOpen(true);
  };

  const handleModalClose = () => {
    setConfigModalOpen(false);
    setSelectedIntegration(null);
    // Refresh the configured integrations status
    setActiveTab(activeTab); // Force re-render
  };

  const getStatusBadge = (integration: any) => {
    if (isIntegrationConfigured(integration.id)) {
      return <Badge className="bg-green-100 text-green-700 border-green-200">Configured</Badge>;
    }
    if (integration.status === 'premium') {
      return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">Premium</Badge>;
    }
    return <Badge variant="outline" className="border-gray-300">Available</Badge>;
  };

  const IntegrationCard = ({ integration }: { integration: any }) => {
    const IconComponent = integration.icon;
    const isConfigured = isIntegrationConfigured(integration.id);
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="group"
      >
        <Card className={`relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 ${
          isConfigured
            ? 'bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 ring-2 ring-green-400/50' 
            : 'bg-white hover:bg-gradient-to-br hover:from-gray-50 hover:to-white'
        }`}>
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${integration.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
          
          {/* Premium badge */}
          {integration.isPremium && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
                <Sparkles className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            </div>
          )}
          
          {/* Popular badge */}
          {integration.isPopular && !integration.isPremium && (
            <div className="absolute top-4 left-4 z-10">
              <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 shadow-lg">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            </div>
          )}

          {/* Status indicator */}
          {isConfigured && (
            <div className="absolute top-4 right-4 z-10">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
            </div>
          )}

          <CardHeader className="pb-4 relative z-10">
            <div className="flex items-start gap-4">
              <div className={`p-4 rounded-2xl bg-gradient-to-r ${integration.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className="h-8 w-8 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {integration.name}
                  </CardTitle>
                  {isConfigured && (
                    <Check className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <CardDescription className="text-sm text-gray-600 leading-relaxed">
                  {integration.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0 relative z-10">
            {/* Metrics */}
            <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800">{integration.metrics.connected}</div>
                <div className="text-xs text-gray-600">Connected</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-600">{integration.metrics.success}%</div>
                <div className="text-xs text-gray-600">Success Rate</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge 
                variant="outline" 
                className="text-xs font-medium capitalize bg-white/80 border-gray-300"
              >
                {integration.category}
              </Badge>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-300 hover:bg-gray-50"
                  onClick={() => handleConfigureIntegration(integration)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={isConfigured ? "outline" : "default"}
                  className={`transition-all duration-300 ${
                    isConfigured
                      ? 'border-green-300 text-green-700 hover:bg-green-50' 
                      : `bg-gradient-to-r ${integration.color} hover:shadow-lg text-white border-0`
                  }`}
                  onClick={() => handleConfigureIntegration(integration)}
                >
                  {isConfigured ? (
                    <>
                      <Settings className="h-4 w-4 mr-2" />
                      Configure
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Setup
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
              <Layers className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Integration Hub
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connect your forms with powerful tools and services. Automate workflows, enhance capabilities, and streamline your processes with enterprise-grade integrations.
          </p>
          
          {/* Stats Bar */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600">Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">99.2%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">1M+</div>
              <div className="text-sm text-gray-600">Connections</div>
            </div>
          </div>
        </motion.div>

        {/* Form Selection */}
        {availableForms.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-xl"
          >
            <div className="flex items-center gap-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <FormInput className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Select Target Form</h3>
                <p className="text-gray-600">Choose which form to configure integrations for and monitor its performance</p>
              </div>
              <div className="min-w-80">
                <Select value={selectedFormId} onValueChange={setSelectedFormId}>
                  <SelectTrigger className="h-14 text-lg bg-white border-gray-300 shadow-sm">
                    <SelectValue placeholder="Select a form" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-xl">
                    {availableForms.map((form) => (
                      <SelectItem key={form.primary_id} value={form.primary_id} className="text-lg py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          {form.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 h-16 bg-white/50 backdrop-blur-sm p-2 shadow-lg">
            <TabsTrigger value="hub" className="h-12 text-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Zap className="h-5 w-5 mr-2" />
              Integration Hub
            </TabsTrigger>
            <TabsTrigger value="configured" className="h-12 text-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Check className="h-5 w-5 mr-2" />
              Configured
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="h-12 text-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-md">
              <Monitor className="h-5 w-5 mr-2" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="insights" className="h-12 text-lg font-medium data-[state=active]:bg-white data-[state=active]:shadow-md">
              <BarChart3 className="h-5 w-5 mr-2" />
              Insights
            </TabsTrigger>
          </TabsList>

          {/* Integration Hub */}
          <TabsContent value="hub" className="space-y-8">
            {/* Search and Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col lg:flex-row gap-6"
            >
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
                <Input
                  placeholder="Search integrations by name or capability..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-16 h-16 text-lg border-gray-300 bg-white/80 backdrop-blur-sm shadow-sm rounded-2xl"
                />
              </div>
              
              <div className="flex gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48 h-16 bg-white/80 backdrop-blur-sm border-gray-300 shadow-sm rounded-2xl">
                    <Filter className="h-5 w-5 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-xl">
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name} ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Category Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`h-12 px-6 rounded-2xl transition-all duration-300 ${
                    selectedCategory === category.id 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white hover:shadow-md'
                  }`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </motion.div>

            {/* Integrations Grid */}
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredIntegrations.map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </AnimatePresence>
            </motion.div>
          </TabsContent>

          {/* Configured Integrations */}
          <TabsContent value="configured" className="space-y-6">
            <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Check className="h-6 w-6 text-green-500" />
                  Active Integrations for {availableForms.find(f => f.primary_id === selectedFormId)?.name || 'Selected Form'}
                </CardTitle>
                <CardDescription className="text-lg">
                  Manage your connected integrations and their settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getConfiguredIntegrations().length > 0 ? (
                    getConfiguredIntegrations().map((config) => {
                      const integration = integrations.find(i => i.id === config.type);
                      if (!integration) return null;
                      
                      return (
                        <div key={config.id} className="flex items-center justify-between p-6 border border-gray-200 rounded-2xl bg-white shadow-sm">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl bg-gradient-to-r ${integration.color}`}>
                              <integration.icon className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">{integration.name}</h4>
                              <p className="text-sm text-gray-600">{integration.description}</p>
                              <p className="text-xs text-gray-500">
                                Configured on {new Date(config.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-10"
                              onClick={() => handleConfigureIntegration(integration)}
                            >
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Switch checked={config.enabled} />
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-500 mb-4">
                        <Settings className="h-12 w-12 mx-auto mb-2" />
                        No integrations configured yet
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        {selectedFormId ? 'Configure your first integration from the Integration Hub tab.' : 'Please select a form first.'}
                      </p>
                      <Button onClick={() => setActiveTab('hub')}>
                        Browse Integrations
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Active Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">{getConfiguredIntegrations().length}</div>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <TrendingUp className="h-4 w-4" />
                    for selected form
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">98.7%</div>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <TrendingUp className="h-4 w-4" />
                    +0.3% today
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Failed Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-red-600">3</div>
                  <div className="flex items-center gap-1 text-sm text-red-600 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    Last 24h
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Data Processed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">2.4k</div>
                  <div className="flex items-center gap-1 text-sm text-green-600 mt-1">
                    <Activity className="h-4 w-4" />
                    entries today
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Activity className="h-5 w-5 text-blue-500" />
                  Real-time Activity Monitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: '2 min ago', action: 'Slack notification sent', status: 'success', form: 'Contact Form' },
                    { time: '5 min ago', action: 'Zapier webhook triggered', status: 'success', form: 'Registration Form' },
                    { time: '12 min ago', action: 'Email notification failed', status: 'error', form: 'Feedback Form' },
                    { time: '18 min ago', action: 'Google Sheets updated', status: 'success', form: 'Survey Form' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <div>
                          <div className="font-medium">{activity.action}</div>
                          <div className="text-sm text-gray-600">{activity.form}</div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    Integration Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getConfiguredIntegrations().map((config) => {
                      const integration = integrations.find(i => i.id === config.type);
                      if (!integration) return null;
                      
                      return (
                        <div key={config.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${integration.color}`}>
                              <integration.icon className="h-4 w-4 text-white" />
                            </div>
                            <span className="font-medium">{integration.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-gray-600">{integration.metrics.success}%</div>
                            <div className="w-20 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${integration.metrics.success}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {getConfiguredIntegrations().length === 0 && (
                      <p className="text-gray-500 text-center py-4">No configured integrations to display</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-white/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Usage Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-gray-500 mb-4">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      Advanced analytics dashboard coming soon
                    </div>
                    <Button variant="outline">
                      Request Early Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Integration Configuration Modal */}
      <IntegrationConfigModal
        integration={selectedIntegration}
        isOpen={configModalOpen}
        onClose={handleModalClose}
        formId={selectedFormId}
      />
    </div>
  );
};

export default IntegrationsPage;
