
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, Filter, Plus, Star, CheckCircle, ExternalLink,
  Zap, Database, Mail, MessageSquare, Globe, BarChart3, Shield,
  Calendar, CreditCard, Users, Camera, FileText, Clock, MapPin,
  Smartphone, Cloud, Settings, Play, Pause, Trash2, Edit3,
  Link2, Key, AlertCircle, Info, HelpCircle, Download, Upload
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'communication' | 'analytics' | 'storage' | 'payment' | 'automation' | 'productivity';
  isPopular?: boolean;
  isPremium?: boolean;
  isConnected?: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  setupTime: string;
  features: string[];
}

interface IntegrationsHubProps {
  onBack: () => void;
  formConfig: any;
  onUpdate: (config: any) => void;
}

const IntegrationsHub: React.FC<IntegrationsHubProps> = ({ onBack, formConfig, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showConnectedOnly, setShowConnectedOnly] = useState(false);
  const [activeIntegration, setActiveIntegration] = useState<Integration | null>(null);

  const integrations: Integration[] = [
    // Communication
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Sync form submissions to Mailchimp email lists and automate campaigns',
      icon: Mail,
      category: 'communication',
      isPopular: true,
      difficulty: 'easy',
      setupTime: '5 min',
      features: ['Email list sync', 'Campaign automation', 'Segmentation', 'Analytics']
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'Send transactional emails and notifications via SendGrid API',
      icon: Mail,
      category: 'communication',
      difficulty: 'medium',
      setupTime: '10 min',
      features: ['Transactional emails', 'Email templates', 'Delivery tracking', 'A/B testing']
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send form submissions and notifications directly to Slack channels',
      icon: MessageSquare,
      category: 'communication',
      isPopular: true,
      difficulty: 'easy',
      setupTime: '3 min',
      features: ['Channel notifications', 'Direct messages', 'Custom formatting', 'File attachments']
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Post form submissions to Discord servers and channels',
      icon: MessageSquare,
      category: 'communication',
      difficulty: 'easy',
      setupTime: '5 min',
      features: ['Server notifications', 'Webhook integration', 'Rich embeds', 'Role mentions']
    },
    {
      id: 'twilio',
      name: 'Twilio',
      description: 'Send SMS notifications and voice calls based on form submissions',
      icon: Smartphone,
      category: 'communication',
      isPremium: true,
      difficulty: 'medium',
      setupTime: '15 min',
      features: ['SMS notifications', 'Voice calls', 'WhatsApp integration', 'Global coverage']
    },

    // Analytics
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track form submissions and user behavior with Google Analytics',
      icon: BarChart3,
      category: 'analytics',
      isPopular: true,
      difficulty: 'easy',
      setupTime: '5 min',
      features: ['Event tracking', 'Conversion goals', 'User behavior', 'Custom dimensions']
    },
    {
      id: 'mixpanel',
      name: 'Mixpanel',
      description: 'Advanced analytics and user tracking for form interactions',
      icon: BarChart3,
      category: 'analytics',
      isPremium: true,
      difficulty: 'medium',
      setupTime: '20 min',
      features: ['Event analytics', 'User cohorts', 'Funnel analysis', 'A/B testing']
    },
    {
      id: 'hotjar',
      name: 'Hotjar',
      description: 'Record user sessions and analyze form completion behavior',
      icon: Camera,
      category: 'analytics',
      difficulty: 'easy',
      setupTime: '10 min',
      features: ['Session recordings', 'Heatmaps', 'Form analysis', 'User feedback']
    },

    // Storage & Database
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Automatically save form submissions to Google Sheets spreadsheets',
      icon: FileText,
      category: 'storage',
      isPopular: true,
      difficulty: 'easy',
      setupTime: '5 min',
      features: ['Real-time sync', 'Custom formatting', 'Data validation', 'Collaboration']
    },
    {
      id: 'airtable',
      name: 'Airtable',
      description: 'Store and organize form data in powerful Airtable databases',
      icon: Database,
      category: 'storage',
      isPopular: true,
      difficulty: 'easy',
      setupTime: '8 min',
      features: ['Database storage', 'Rich field types', 'Views & filters', 'API access']
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'Create database entries in Notion workspaces from form submissions',
      icon: FileText,
      category: 'storage',
      difficulty: 'medium',
      setupTime: '12 min',
      features: ['Database creation', 'Rich content', 'Team collaboration', 'Templates']
    },
    {
      id: 'mongodb',
      name: 'MongoDB',
      description: 'Store form data in MongoDB Atlas cloud database',
      icon: Database,
      category: 'storage',
      isPremium: true,
      difficulty: 'hard',
      setupTime: '30 min',
      features: ['NoSQL storage', 'Scalable', 'Advanced queries', 'Real-time sync']
    },

    // Payment
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Accept payments and process transactions securely with Stripe',
      icon: CreditCard,
      category: 'payment',
      isPopular: true,
      isPremium: true,
      difficulty: 'medium',
      setupTime: '25 min',
      features: ['Payment processing', 'Subscriptions', 'Multi-currency', 'Fraud protection']
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Integrate PayPal payments and checkout experience',
      icon: CreditCard,
      category: 'payment',
      isPremium: true,
      difficulty: 'medium',
      setupTime: '20 min',
      features: ['Payment buttons', 'Express checkout', 'Recurring payments', 'Dispute handling']
    },

    // Automation
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect to 5000+ apps with automated workflows and triggers',
      icon: Zap,
      category: 'automation',
      isPopular: true,
      difficulty: 'easy',
      setupTime: '10 min',
      features: ['5000+ app connections', 'Multi-step workflows', 'Conditional logic', 'Error handling']
    },
    {
      id: 'make',
      name: 'Make (Integromat)',
      description: 'Visual automation platform for complex workflow scenarios',
      icon: Zap,
      category: 'automation',
      difficulty: 'medium',
      setupTime: '20 min',
      features: ['Visual builder', 'Complex scenarios', 'Data transformation', 'Real-time execution']
    },
    {
      id: 'n8n',
      name: 'n8n',
      description: 'Open-source workflow automation for developers',
      icon: Zap,
      category: 'automation',
      isPremium: true,
      difficulty: 'hard',
      setupTime: '45 min',
      features: ['Self-hosted', 'Custom nodes', 'Code execution', 'Advanced workflows']
    },

    // Productivity
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      description: 'Create calendar events from form submissions automatically',
      icon: Calendar,
      category: 'productivity',
      difficulty: 'easy',
      setupTime: '8 min',
      features: ['Event creation', 'Invitations', 'Reminders', 'Calendar sharing']
    },
    {
      id: 'trello',
      name: 'Trello',
      description: 'Create Trello cards and manage projects from form data',
      icon: FileText,
      category: 'productivity',
      difficulty: 'easy',
      setupTime: '10 min',
      features: ['Card creation', 'List management', 'Due dates', 'Team collaboration']
    },
    {
      id: 'asana',
      name: 'Asana',
      description: 'Create tasks and projects in Asana from form submissions',
      icon: FileText,
      category: 'productivity',
      difficulty: 'medium',
      setupTime: '15 min',
      features: ['Task creation', 'Project management', 'Team assignment', 'Progress tracking']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Integrations', count: integrations.length },
    { id: 'communication', name: 'Communication', count: integrations.filter(i => i.category === 'communication').length },
    { id: 'analytics', name: 'Analytics', count: integrations.filter(i => i.category === 'analytics').length },
    { id: 'storage', name: 'Storage', count: integrations.filter(i => i.category === 'storage').length },
    { id: 'payment', name: 'Payment', count: integrations.filter(i => i.category === 'payment').length },
    { id: 'automation', name: 'Automation', count: integrations.filter(i => i.category === 'automation').length },
    { id: 'productivity', name: 'Productivity', count: integrations.filter(i => i.category === 'productivity').length }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    const matchesConnected = !showConnectedOnly || integration.isConnected;
    
    return matchesSearch && matchesCategory && matchesConnected;
  });

  const popularIntegrations = integrations.filter(i => i.isPopular);
  const connectedIntegrations = integrations.filter(i => i.isConnected);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleConnect = (integration: Integration) => {
    setActiveIntegration(integration);
  };

  const renderIntegrationCard = (integration: Integration) => (
    <motion.div
      key={integration.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg border-2 ${
        integration.isConnected 
          ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50' 
          : integration.isPremium 
            ? 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50'
            : 'border-gray-200 bg-white hover:border-blue-300'
      }`}>
        {/* Status Badges */}
        <div className="absolute top-3 right-3 flex gap-1">
          {integration.isPopular && (
            <Badge className="bg-orange-500 text-white">Popular</Badge>
          )}
          {integration.isPremium && (
            <Badge className="bg-purple-500 text-white">Premium</Badge>
          )}
          {integration.isConnected && (
            <Badge className="bg-green-500 text-white">Connected</Badge>
          )}
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${
              integration.isConnected ? 'bg-green-100' :
              integration.isPremium ? 'bg-purple-100' : 'bg-blue-100'
            } group-hover:scale-110 transition-transform duration-300`}>
              <integration.icon className={`h-6 w-6 ${
                integration.isConnected ? 'text-green-600' :
                integration.isPremium ? 'text-purple-600' : 'text-blue-600'
              }`} />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg font-bold group-hover:text-blue-600 transition-colors">
                {integration.name}
              </CardTitle>
              <p className="text-gray-600 text-sm leading-relaxed mt-1">
                {integration.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="flex items-center gap-2 mb-4">
            <Badge className={getDifficultyColor(integration.difficulty)}>
              {integration.difficulty}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="h-3 w-3" />
              {integration.setupTime}
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Key Features:</h4>
            <div className="grid grid-cols-2 gap-1">
              {integration.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                  <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            {integration.isConnected ? (
              <Button variant="outline" size="sm" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            ) : (
              <Button 
                onClick={() => handleConnect(integration)}
                size="sm" 
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Connect
              </Button>
            )}
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
      >
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Integrations Hub
                </h1>
                <p className="text-gray-600">Connect your forms with powerful external services</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                {connectedIntegrations.length} Connected
              </Badge>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Custom Integration
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col max-w-7xl mx-auto px-6 py-6">
          {/* Search and Filters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/80 border-gray-300"
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Connected only</span>
                  <Switch checked={showConnectedOnly} onCheckedChange={setShowConnectedOnly} />
                </div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="text-sm"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Integrations Tabs */}
          <Tabs defaultValue="all" className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="all">All Integrations</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="connected">Connected</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="all" className="mt-0">
                <AnimatePresence>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredIntegrations.map(renderIntegrationCard)}
                  </div>
                </AnimatePresence>

                {filteredIntegrations.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
                    <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                    <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setShowConnectedOnly(false); }}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="popular" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {popularIntegrations.map(renderIntegrationCard)}
                </div>
              </TabsContent>

              <TabsContent value="connected" className="mt-0">
                {connectedIntegrations.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {connectedIntegrations.map(renderIntegrationCard)}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Zap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No connected integrations</h3>
                    <p className="text-gray-600 mb-4">Start by connecting your first integration</p>
                    <Button onClick={() => setSelectedCategory('all')}>
                      Browse Integrations
                    </Button>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsHub;
