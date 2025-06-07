
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Zap, Mail, Webhook, Database, Cloud, 
  MessageSquare, Calendar, Users, BarChart3, Settings,
  CheckCircle, AlertCircle, Clock, Star, Play, Pause,
  Globe, Lock, Shield, Sparkles, Target, Activity,
  FileText, Eye, Edit, Trash2, Plus, Search,
  ExternalLink, Copy, RefreshCw, Download, Upload
} from 'lucide-react';
import { FormConfig } from '../types';
import { useToast } from '@/hooks/use-toast';

interface ModernIntegrationsHubProps {
  onBack: () => void;
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: any;
  category: string;
  status: 'connected' | 'available' | 'premium';
  popular?: boolean;
  gradient: string;
  features: string[];
  connected?: boolean;
}

const ModernIntegrationsHub: React.FC<ModernIntegrationsHubProps> = ({
  onBack,
  formConfig,
  onUpdate
}) => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const integrations: Integration[] = [
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Send automatic email notifications when forms are submitted',
      icon: Mail,
      category: 'notifications',
      status: 'connected',
      popular: true,
      gradient: 'from-blue-500 to-cyan-500',
      features: ['Auto-responses', 'Admin notifications', 'Custom templates', 'SMTP support'],
      connected: formConfig.settings.integrations?.email?.enabled
    },
    {
      id: 'webhook',
      name: 'Webhooks',
      description: 'Send form data to external APIs in real-time',
      icon: Webhook,
      category: 'apis',
      status: 'connected',
      gradient: 'from-purple-500 to-pink-500',
      features: ['Real-time data', 'Custom headers', 'Retry logic', 'Security'],
      connected: formConfig.settings.integrations?.webhook?.enabled
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect to 5000+ apps with automation workflows',
      icon: Zap,
      category: 'automation',
      status: 'available',
      popular: true,
      gradient: 'from-orange-500 to-red-500',
      features: ['5000+ apps', 'Workflows', 'Triggers', 'Actions'],
      connected: formConfig.settings.integrations?.zapier?.enabled
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Get form submissions directly in your Slack channels',
      icon: MessageSquare,
      category: 'notifications',
      status: 'available',
      gradient: 'from-green-500 to-emerald-500',
      features: ['Channel notifications', 'Direct messages', 'Rich formatting', 'Bot integration'],
      connected: formConfig.settings.integrations?.slack?.enabled
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Automatically save submissions to Google Sheets',
      icon: BarChart3,
      category: 'storage',
      status: 'available',
      gradient: 'from-green-600 to-green-700',
      features: ['Auto-sync', 'Real-time updates', 'Custom formatting', 'Shared access']
    },
    {
      id: 'airtable',
      name: 'Airtable',
      description: 'Store and organize form data in powerful databases',
      icon: Database,
      category: 'storage',
      status: 'premium',
      gradient: 'from-indigo-500 to-purple-500',
      features: ['Relational data', 'Views', 'Automation', 'API access']
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'Create leads and contacts from form submissions',
      icon: Cloud,
      category: 'crm',
      status: 'premium',
      gradient: 'from-blue-600 to-indigo-600',
      features: ['Lead creation', 'Contact management', 'Custom fields', 'Workflows']
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Sync form data with your HubSpot CRM',
      icon: Users,
      category: 'crm',
      status: 'premium',
      gradient: 'from-orange-600 to-red-600',
      features: ['Contact sync', 'Deal creation', 'Marketing automation', 'Analytics']
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Add subscribers to your email marketing lists',
      icon: Mail,
      category: 'marketing',
      status: 'available',
      gradient: 'from-yellow-500 to-orange-500',
      features: ['List management', 'Segmentation', 'Campaigns', 'Analytics']
    },
    {
      id: 'calendly',
      name: 'Calendly',
      description: 'Schedule meetings from form submissions',
      icon: Calendar,
      category: 'scheduling',
      status: 'available',
      gradient: 'from-blue-500 to-purple-500',
      features: ['Meeting scheduling', 'Calendar sync', 'Time zones', 'Reminders']
    }
  ];

  const categories = [
    { id: 'all', label: 'All Integrations', count: integrations.length },
    { id: 'notifications', label: 'Notifications', count: integrations.filter(i => i.category === 'notifications').length },
    { id: 'storage', label: 'Data Storage', count: integrations.filter(i => i.category === 'storage').length },
    { id: 'automation', label: 'Automation', count: integrations.filter(i => i.category === 'automation').length },
    { id: 'crm', label: 'CRM', count: integrations.filter(i => i.category === 'crm').length },
    { id: 'marketing', label: 'Marketing', count: integrations.filter(i => i.category === 'marketing').length },
    { id: 'apis', label: 'APIs', count: integrations.filter(i => i.category === 'apis').length }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const connectedIntegrations = integrations.filter(i => i.connected);
  const popularIntegrations = integrations.filter(i => i.popular);

  const handleConnect = (integration: Integration) => {
    setSelectedIntegration(integration);
  };

  const handleDisconnect = (integrationId: string) => {
    toast({
      title: "Integration Disconnected",
      description: "The integration has been successfully disconnected.",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'available':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'premium':
        return <Star className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string, connected?: boolean) => {
    if (connected) {
      return <Badge className="bg-green-100 text-green-700">Connected</Badge>;
    }
    
    switch (status) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-700">Ready to Connect</Badge>;
      case 'available':
        return <Badge className="bg-blue-100 text-blue-700">Available</Badge>;
      case 'premium':
        return <Badge className="bg-yellow-100 text-yellow-700">Premium</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const IntegrationCard = ({ integration }: { integration: Integration }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden group">
        <div className={`h-2 bg-gradient-to-r ${integration.gradient}`} />
        
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${integration.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <integration.icon className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-2">
              {integration.popular && (
                <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
              {getStatusIcon(integration.status)}
            </div>
          </div>
          
          <div className="space-y-2 mt-4">
            <CardTitle className="text-xl font-bold text-gray-900">
              {integration.name}
            </CardTitle>
            <p className="text-gray-600 text-sm leading-relaxed">
              {integration.description}
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {getStatusBadge(integration.status, integration.connected)}
              <div className="text-xs text-gray-500">
                {integration.features.length} features
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Key Features:</h4>
              <div className="grid grid-cols-2 gap-1">
                {integration.features.slice(0, 4).map((feature, index) => (
                  <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span className="truncate">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              {integration.connected ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleConnect(integration)}
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Configure
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDisconnect(integration.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Button 
                  className={`w-full bg-gradient-to-r ${integration.gradient} hover:opacity-90`}
                  onClick={() => handleConnect(integration)}
                  disabled={integration.status === 'premium'}
                >
                  {integration.status === 'premium' ? (
                    <>
                      <Star className="h-4 w-4 mr-2" />
                      Upgrade to Connect
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Connect
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={onBack}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Builder
              </Button>
              
              <div className="h-8 w-px bg-gray-300" />
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Integration Hub
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Connect your forms to powerful external services
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="h-3 w-3 mr-1" />
                {connectedIntegrations.length} Connected
              </Badge>
              
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Browse All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Available Integrations</p>
                    <p className="text-3xl font-bold">{integrations.length}</p>
                  </div>
                  <Globe className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Connected</p>
                    <p className="text-3xl font-bold">{connectedIntegrations.length}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Categories</p>
                    <p className="text-3xl font-bold">{categories.length - 1}</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Popular</p>
                    <p className="text-3xl font-bold">{popularIntegrations.length}</p>
                  </div>
                  <Star className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Filters and Search */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search integrations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/80 border-gray-200"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedCategory(category.id)}
                        className={selectedCategory === category.id ? 
                          "bg-gradient-to-r from-blue-500 to-purple-600" : 
                          "bg-white/80 hover:bg-gray-50"
                        }
                      >
                        {category.label}
                        <Badge 
                          variant="secondary" 
                          className="ml-2 text-xs bg-gray-100 text-gray-600"
                        >
                          {category.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Connected Integrations */}
          {connectedIntegrations.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Connected Integrations</h2>
                  <p className="text-gray-600">Manage your active connections</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {connectedIntegrations.map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </div>
              
              <Separator className="my-8" />
            </motion.div>
          )}

          {/* All Integrations */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Integrations' : 
                   categories.find(c => c.id === selectedCategory)?.label}
                </h2>
                <p className="text-gray-600">
                  {filteredIntegrations.length} integration{filteredIntegrations.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
            
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredIntegrations.map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </div>
            </AnimatePresence>
            
            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No integrations found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or selecting a different category.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernIntegrationsHub;
