
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import IntegrationConfig from './IntegrationConfig';
import {
  ArrowLeft, Search, Filter, Zap, CheckCircle, AlertCircle,
  Mail, Database, Webhook, Cloud, CreditCard, MessageSquare,
  Slack, Calendar, FileText, BarChart3, Users, Shield,
  Settings, Plus, Star, Sparkles
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'Email' | 'Storage' | 'Analytics' | 'Payment' | 'Communication' | 'Productivity';
  status: 'connected' | 'disconnected' | 'error';
  isPro?: boolean;
  isPopular?: boolean;
  config?: any;
}

interface IntegrationsHubProps {
  onBack: () => void;
  formConfig: any;
  onUpdate: (config: any) => void;
}

const IntegrationsHub: React.FC<IntegrationsHubProps> = ({ onBack, formConfig, onUpdate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);

  const integrations: Integration[] = [
    // Email Integrations
    {
      id: 'email-smtp',
      name: 'SMTP Email',
      description: 'Send emails via SMTP server',
      icon: Mail,
      category: 'Email',
      status: 'disconnected',
      isPopular: true
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'Email delivery service',
      icon: Mail,
      category: 'Email',
      status: 'disconnected',
      isPro: true
    },
    {
      id: 'mailgun',
      name: 'Mailgun',
      description: 'Email API service',
      icon: Mail,
      category: 'Email',
      status: 'disconnected'
    },

    // Storage Integrations
    {
      id: 'database',
      name: 'Database',
      description: 'Store submissions in database',
      icon: Database,
      category: 'Storage',
      status: 'disconnected',
      isPopular: true
    },
    {
      id: 'supabase',
      name: 'Supabase',
      description: 'Real-time database and auth',
      icon: Database,
      category: 'Storage',
      status: 'connected',
      isPro: true
    },
    {
      id: 'aws-s3',
      name: 'Amazon S3',
      description: 'Cloud file storage',
      icon: Cloud,
      category: 'Storage',
      status: 'disconnected'
    },
    {
      id: 'google-drive',
      name: 'Google Drive',
      description: 'Store files in Google Drive',
      icon: Cloud,
      category: 'Storage',
      status: 'disconnected'
    },
    {
      id: 'dropbox',
      name: 'Dropbox',
      description: 'Cloud storage integration',
      icon: Cloud,
      category: 'Storage',
      status: 'disconnected'
    },

    // Webhook Integrations
    {
      id: 'webhook',
      name: 'Custom Webhook',
      description: 'Send data to custom endpoint',
      icon: Webhook,
      category: 'Communication',
      status: 'disconnected',
      isPopular: true
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 3000+ apps',
      icon: Zap,
      category: 'Communication',
      status: 'disconnected',
      isPro: true
    },

    // Payment Integrations
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment processing',
      icon: CreditCard,
      category: 'Payment',
      status: 'disconnected',
      isPro: true,
      isPopular: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Online payments',
      icon: CreditCard,
      category: 'Payment',
      status: 'disconnected',
      isPro: true
    },

    // Communication Integrations
    {
      id: 'slack',
      name: 'Slack',
      description: 'Team notifications',
      icon: Slack,
      category: 'Communication',
      status: 'disconnected'
    },
    {
      id: 'discord',
      name: 'Discord',
      description: 'Discord notifications',
      icon: MessageSquare,
      category: 'Communication',
      status: 'disconnected'
    },

    // Analytics Integrations
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track form submissions',
      icon: BarChart3,
      category: 'Analytics',
      status: 'disconnected'
    },
    {
      id: 'mixpanel',
      name: 'Mixpanel',
      description: 'Advanced analytics',
      icon: BarChart3,
      category: 'Analytics',
      status: 'disconnected',
      isPro: true
    },

    // Productivity Integrations
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Export to spreadsheet',
      icon: FileText,
      category: 'Productivity',
      status: 'disconnected',
      isPopular: true
    },
    {
      id: 'airtable',
      name: 'Airtable',
      description: 'Database and spreadsheet hybrid',
      icon: Database,
      category: 'Productivity',
      status: 'disconnected'
    },
    {
      id: 'notion',
      name: 'Notion',
      description: 'All-in-one workspace',
      icon: FileText,
      category: 'Productivity',
      status: 'disconnected'
    },
    {
      id: 'calendly',
      name: 'Calendly',
      description: 'Schedule appointments',
      icon: Calendar,
      category: 'Productivity',
      status: 'disconnected'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Integrations', count: integrations.length },
    { id: 'Email', name: 'Email', count: integrations.filter(i => i.category === 'Email').length },
    { id: 'Storage', name: 'Storage', count: integrations.filter(i => i.category === 'Storage').length },
    { id: 'Communication', name: 'Communication', count: integrations.filter(i => i.category === 'Communication').length },
    { id: 'Payment', name: 'Payment', count: integrations.filter(i => i.category === 'Payment').length },
    { id: 'Analytics', name: 'Analytics', count: integrations.filter(i => i.category === 'Analytics').length },
    { id: 'Productivity', name: 'Productivity', count: integrations.filter(i => i.category === 'Productivity').length }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleIntegrationSave = (integration: Integration, config: any) => {
    console.log('Saving integration config:', integration.id, config);
    // Update integration status and config
    const updatedIntegration = { ...integration, status: 'connected' as const, config };
    setSelectedIntegration(updatedIntegration);
  };

  const handleIntegrationTest = (integration: Integration, config: any) => {
    console.log('Testing integration:', integration.id, config);
    // Test the integration connection
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
  };

  if (selectedIntegration) {
    return (
      <IntegrationConfig
        integration={selectedIntegration}
        onSave={(config) => handleIntegrationSave(selectedIntegration, config)}
        onTest={(config) => handleIntegrationTest(selectedIntegration, config)}
        onBack={() => setSelectedIntegration(null)}
      />
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Builder
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Integrations Hub
                  </h1>
                  <p className="text-sm text-gray-600">
                    Connect your form with powerful third-party services
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                {integrations.filter(i => i.status === 'connected').length} Connected
              </Badge>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {integrations.length} Available
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 bg-white/95 backdrop-blur-md p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search integrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full justify-between"
                  >
                    <span>{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-4 w-4 text-purple-600" />
                <span className="font-semibold text-purple-900">Pro Features</span>
              </div>
              <p className="text-sm text-purple-700">
                Unlock advanced integrations with Pro subscription.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedCategory === 'all' ? 'All Integrations' : selectedCategory}
                </h2>
                <p className="text-gray-600">
                  {filteredIntegrations.length} integrations available
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredIntegrations.map((integration, index) => (
                  <motion.div
                    key={integration.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                              <integration.icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                {integration.name}
                                {integration.isPopular && (
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                )}
                              </CardTitle>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <Badge 
                              variant={integration.status === 'connected' ? 'default' : 'secondary'}
                              className={
                                integration.status === 'connected' 
                                  ? 'bg-green-100 text-green-700 border-green-200'
                                  : integration.status === 'error'
                                  ? 'bg-red-100 text-red-700 border-red-200'
                                  : 'bg-gray-100 text-gray-700 border-gray-200'
                              }
                            >
                              {integration.status === 'connected' && <CheckCircle className="h-3 w-3 mr-1" />}
                              {integration.status === 'error' && <AlertCircle className="h-3 w-3 mr-1" />}
                              {integration.status}
                            </Badge>
                            {integration.isPro && (
                              <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                                Pro
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4">
                          {integration.description}
                        </p>
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => setSelectedIntegration(integration)}
                            className="flex-1"
                          >
                            <Settings className="h-4 w-4 mr-2" />
                            Configure
                          </Button>
                          {integration.status === 'connected' ? (
                            <Button variant="outline" size="sm">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setSelectedIntegration(integration)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsHub;
