import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Zap, Mail, Webhook, Database, 
  Cloud, MessageSquare, Calendar, CreditCard, 
  FileText, Users, Settings, Plus, Check,
  ArrowRight, Star, Sparkles, FormInput, 
  Layers, Palette, Wand2, TrendingUp, Activity,
  Monitor, BarChart3, Bell, Eye, ExternalLink,
  Shield, Globe, Code, Clock, AlertCircle
} from 'lucide-react';
import IntegrationConfigModal from './IntegrationConfigModal';
import { useToast } from '@/hooks/use-toast';
import { formsApi, FormData } from '@/services/api/forms';
import { IntegrationsService } from '@/services/integrations';
import { FormConfig } from '@/components/FormBuilder/types';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  isEnabled: boolean;
  isPremium?: boolean;
  isPopular?: boolean;
  color: string;
  metrics: {
    connected: number;
    success: number;
    lastUsed?: string;
  };
  features: string[];
}

const ModernIntegrationsHub: React.FC<{ formId?: string }> = ({ formId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [configModalOpen, setConfigModalOpen] = useState(false);
  const [selectedFormId, setSelectedFormId] = useState('');
  const [availableForms, setAvailableForms] = useState<FormData[]>([]);
  const [activeView, setActiveView] = useState('grid');
  const [formsLoading, setFormsLoading] = useState(false);
  const [integrationStates, setIntegrationStates] = useState<Record<string, boolean>>({});
  const { toast } = useToast();

  console.log('🔄 ModernIntegrationsHub rendered with:', { 
    formId, 
    selectedFormId, 
    configModalOpen, 
    selectedIntegration: selectedIntegration?.id 
  });

  // Load available forms with error handling
  useEffect(() => {
    console.log('📋 Loading forms...');
    const loadForms = async () => {
      setFormsLoading(true);
      try {
        console.log('🌐 Fetching forms from API...');
        const forms = await formsApi.getAllForms();
        console.log('✅ Forms loaded successfully:', forms.length, 'forms');
        setAvailableForms(forms);
        
        // Set the selected form properly
        if (formId && forms.some(f => f.primary_id === formId)) {
          console.log('🎯 Using provided formId:', formId);
          setSelectedFormId(formId);
        } else if (forms.length > 0) {
          const firstFormId = forms[0].primary_id;
          console.log('🎯 Auto-selecting first form:', firstFormId);
          setSelectedFormId(firstFormId);
        }
      } catch (error) {
        console.error('❌ Error loading forms:', error);
        console.log('🔄 Creating demo form fallback...');
        
        // Create a demo form if API fails
        const demoFormConfig: FormConfig = {
          elements: [],
          settings: {
            theme: 'default',
            layout: {
              style: 'default'
            },
            submitButton: {
              text: 'Submit'
            }
          }
        };
        
        const demoForm: FormData = {
          primary_id: 'demo-form-123',
          name: 'Demo Contact Form',
          createdAt: new Date().toISOString(),
          last_modified: new Date().toISOString(),
          published: true,
          config: demoFormConfig,
          submissions: 0
        };
        
        setAvailableForms([demoForm]);
        setSelectedFormId('demo-form-123');
        console.log('🎭 Demo form created and selected');
        
        toast({
          title: "Using Demo Mode",
          description: "Using demo form for integration setup. Connect to view your actual forms.",
          variant: "default"
        });
      } finally {
        setFormsLoading(false);
        console.log('🏁 Forms loading completed');
      }
    };
    loadForms();
  }, []); // Remove selectedFormId dependency to prevent loops

  // Update integration states when form changes
  useEffect(() => {
    if (selectedFormId) {
      console.log('🔄 Updating integration states for form:', selectedFormId);
      const states: Record<string, boolean> = {};
      
      // Check each integration type
      const integrationTypes = ['email', 'webhook', 'slack', 'zapier', 'database', 'google-sheets', 'stripe', 'calendar', 'crm', 'cloud-storage', 'analytics'];
      
      integrationTypes.forEach(type => {
        const isConfigured = isIntegrationConfigured(type);
        states[type] = isConfigured;
        console.log(`🔍 Integration ${type}:`, isConfigured ? 'ENABLED' : 'DISABLED');
      });
      
      setIntegrationStates(states);
      console.log('✅ Integration states updated:', states);
    }
  }, [selectedFormId]);

  // Listen for integration updates
  useEffect(() => {
    console.log('👂 Setting up integration update listener...');
    const handleIntegrationUpdate = () => {
      console.log('🔔 Integration updated, refreshing states...');
      if (selectedFormId) {
        const states: Record<string, boolean> = {};
        const integrationTypes = ['email', 'webhook', 'slack', 'zapier', 'database', 'google-sheets', 'stripe', 'calendar', 'crm', 'cloud-storage', 'analytics'];
        
        integrationTypes.forEach(type => {
          states[type] = isIntegrationConfigured(type);
        });
        
        setIntegrationStates(states);
        console.log('🔄 Integration states refreshed:', states);
      }
    };

    window.addEventListener('integrationUpdated', handleIntegrationUpdate);
    return () => {
      console.log('🧹 Cleaning up integration update listener');
      window.removeEventListener('integrationUpdated', handleIntegrationUpdate);
    };
  }, [selectedFormId]);

  // Check if integration is configured - fixed to return boolean
  const isIntegrationConfigured = (integrationId: string): boolean => {
    if (!selectedFormId) {
      console.log('⚠️ No form selected, integration check failed for:', integrationId);
      return false;
    }
    
    try {
      console.log('🔍 Checking integration config for:', { formId: selectedFormId, integrationId });
      const config = IntegrationsService.getIntegration(selectedFormId, integrationId);
      const isEnabled = config ? config.enabled === true : false;
      console.log(`✅ Integration ${integrationId} check result:`, isEnabled ? 'ENABLED' : 'DISABLED');
      return isEnabled;
    } catch (error) {
      console.error('❌ Error checking integration config:', error);
      return false;
    }
  };

  const integrations: Integration[] = [
    {
      id: 'email',
      name: 'Email Notifications',
      description: 'Send automated email notifications with customizable templates and smart triggers',
      icon: Mail,
      category: 'communication',
      isEnabled: integrationStates['email'] === true,
      isPopular: true,
      color: 'from-blue-500 to-cyan-500',
      metrics: { connected: 1247, success: 99.2, lastUsed: '2 min ago' },
      features: ['Template Builder', 'Smart Triggers', 'A/B Testing', 'Analytics']
    },
    {
      id: 'webhook',
      name: 'Custom Webhooks',
      description: 'Send real-time data to any URL endpoint with advanced retry mechanisms and monitoring',
      icon: Webhook,
      category: 'automation',
      isEnabled: integrationStates['webhook'] === true,
      isPopular: true,
      color: 'from-purple-500 to-pink-500',
      metrics: { connected: 892, success: 98.7, lastUsed: '5 min ago' },
      features: ['Real-time Data', 'Retry Logic', 'Monitoring', 'Custom Headers']
    },
    {
      id: 'slack',
      name: 'Slack Integration',
      description: 'Send instant notifications to Slack channels with rich formatting and interactive buttons',
      icon: MessageSquare,
      category: 'communication',
      isEnabled: integrationStates['slack'] === true,
      color: 'from-green-500 to-emerald-500',
      metrics: { connected: 634, success: 99.8, lastUsed: '1 min ago' },
      features: ['Rich Messages', 'Interactive Buttons', 'Channel Routing', 'User Mentions']
    },
    {
      id: 'zapier',
      name: 'Zapier Connect',
      description: 'Connect with 5000+ apps and automate complex workflows with conditional logic',
      icon: Zap,
      category: 'automation',
      isEnabled: integrationStates['zapier'] === true,
      isPopular: true,
      color: 'from-orange-500 to-red-500',
      metrics: { connected: 2156, success: 97.9, lastUsed: '3 min ago' },
      features: ['5000+ Apps', 'Conditional Logic', 'Multi-step Workflows', 'Error Handling']
    },
    {
      id: 'database',
      name: 'Database Storage',
      description: 'Store submissions in popular databases with custom field mapping and data validation',
      icon: Database,
      category: 'storage',
      isEnabled: integrationStates['database'] === true,
      color: 'from-indigo-500 to-purple-500',
      metrics: { connected: 445, success: 99.1, lastUsed: '12 min ago' },
      features: ['Field Mapping', 'Data Validation', 'Multiple DBs', 'Schema Sync']
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      description: 'Automatically populate Google Sheets with form responses and advanced formatting',
      icon: FileText,
      category: 'storage',
      isEnabled: integrationStates['google-sheets'] === true,
      isPopular: true,
      color: 'from-green-400 to-blue-500',
      metrics: { connected: 1567, success: 99.5, lastUsed: '7 min ago' },
      features: ['Auto-formatting', 'Charts & Graphs', 'Collaboration', 'Version History']
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Add subscribers to email lists with advanced segmentation and campaign automation',
      icon: Mail,
      category: 'marketing',
      isEnabled: integrationStates['mailchimp'] === true,
      color: 'from-yellow-500 to-orange-500',
      metrics: { connected: 789, success: 98.3, lastUsed: '15 min ago' },
      features: ['List Segmentation', 'Campaign Automation', 'Analytics', 'A/B Testing']
    },
    {
      id: 'stripe',
      name: 'Stripe Payments',
      description: 'Accept secure payments and subscriptions with advanced fraud protection',
      icon: CreditCard,
      category: 'payment',
      isEnabled: integrationStates['stripe'] === true,
      isPremium: true,
      color: 'from-blue-600 to-indigo-600',
      metrics: { connected: 234, success: 99.9, lastUsed: '4 min ago' },
      features: ['Fraud Protection', 'Subscriptions', 'Multi-currency', 'Tax Calculation']
    },
    {
      id: 'calendar',
      name: 'Calendar Booking',
      description: 'Enable appointment scheduling with calendar integration and automated reminders',
      icon: Calendar,
      category: 'scheduling',
      isEnabled: integrationStates['calendar'] === true,
      isPremium: true,
      color: 'from-teal-500 to-cyan-500',
      metrics: { connected: 156, success: 98.8, lastUsed: '8 min ago' },
      features: ['Auto Scheduling', 'Reminders', 'Time Zones', 'Availability Rules']
    },
    {
      id: 'crm',
      name: 'CRM Integration',
      description: 'Sync contacts and leads with popular CRM systems with advanced field mapping',
      icon: Users,
      category: 'crm',
      isEnabled: integrationStates['crm'] === true,
      isPremium: true,
      color: 'from-pink-500 to-rose-500',
      metrics: { connected: 378, success: 98.6, lastUsed: '6 min ago' },
      features: ['Contact Sync', 'Lead Scoring', 'Pipeline Management', 'Custom Fields']
    },
    {
      id: 'cloud-storage',
      name: 'Cloud Storage',
      description: 'Upload and manage files in cloud storage services with advanced organization',
      icon: Cloud,
      category: 'storage',
      isEnabled: integrationStates['cloud-storage'] === true,
      color: 'from-gray-500 to-slate-500',
      metrics: { connected: 512, success: 99.3, lastUsed: '11 min ago' },
      features: ['Auto Organization', 'Version Control', 'Access Control', 'Backup & Sync']
    },
    {
      id: 'analytics',
      name: 'Advanced Analytics',
      description: 'Track detailed insights and performance metrics with custom dashboards',
      icon: BarChart3,
      category: 'analytics',
      isEnabled: integrationStates['analytics'] === true,
      isPremium: true,
      color: 'from-violet-500 to-purple-500',
      metrics: { connected: 167, success: 99.7, lastUsed: '9 min ago' },
      features: ['Custom Dashboards', 'Real-time Data', 'Export Reports', 'Predictive Analytics']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Integrations', count: integrations.length, icon: Layers },
    { id: 'communication', name: 'Communication', count: integrations.filter(i => i.category === 'communication').length, icon: MessageSquare },
    { id: 'automation', name: 'Automation', count: integrations.filter(i => i.category === 'automation').length, icon: Zap },
    { id: 'storage', name: 'Storage', count: integrations.filter(i => i.category === 'storage').length, icon: Database },
    { id: 'marketing', name: 'Marketing', count: integrations.filter(i => i.category === 'marketing').length, icon: Mail },
    { id: 'payment', name: 'Payment', count: integrations.filter(i => i.category === 'payment').length, icon: CreditCard },
    { id: 'scheduling', name: 'Scheduling', count: integrations.filter(i => i.category === 'scheduling').length, icon: Calendar },
    { id: 'crm', name: 'CRM', count: integrations.filter(i => i.category === 'crm').length, icon: Users },
    { id: 'analytics', name: 'Analytics', count: integrations.filter(i => i.category === 'analytics').length, icon: BarChart3 }
  ];

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || integration.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const enabledIntegrations = integrations.filter(i => i.isEnabled);
  const popularIntegrations = integrations.filter(i => i.isPopular);

  const handleConfigureIntegration = (integration: Integration) => {
    console.log('🚀 Configure integration clicked:', {
      integrationId: integration.id,
      integrationName: integration.name,
      selectedFormId,
      currentModalState: configModalOpen
    });
    
    if (!selectedFormId) {
      console.error('❌ No form selected for integration configuration');
      toast({
        title: "Select a Form",
        description: "Please select a form to configure integrations for.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('✅ Opening configuration modal for:', integration.name);
    setSelectedIntegration(integration);
    setConfigModalOpen(true);
    console.log('🔄 Modal state updated - should be opening...');
  };

  const handleModalClose = () => {
    console.log('🔒 Closing integration modal');
    setConfigModalOpen(false);
    setSelectedIntegration(null);
    
    // Force refresh of integration states
    console.log('🔄 Triggering integration update event...');
    window.dispatchEvent(new Event('integrationUpdated'));
  };

  const handleFormChange = (newFormId: string) => {
    console.log('📋 Form selection changed:', { from: selectedFormId, to: newFormId });
    setSelectedFormId(newFormId);
  };

  const IntegrationCard = ({ integration }: { integration: Integration }) => {
    const IconComponent = integration.icon;
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -12, scale: 1.03 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Card className={`relative overflow-hidden transition-all duration-500 hover:shadow-2xl group ${
          integration.isEnabled ? 'ring-2 ring-green-400 bg-gradient-to-br from-green-50 to-emerald-50' : 'hover:shadow-xl bg-white'
        }`}>
          {/* Animated Background Gradient */}
          <div className={`absolute inset-0 bg-gradient-to-r ${integration.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
          
          {/* Premium Badge */}
          {integration.isPremium && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 left-4 z-10"
            >
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg">
                <Sparkles className="h-3 w-3 mr-1" />
                Premium
              </Badge>
            </motion.div>
          )}
          
          {/* Popular Badge */}
          {integration.isPopular && !integration.isPremium && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 left-4 z-10"
            >
              <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0 shadow-lg">
                <Star className="h-3 w-3 mr-1" />
                Popular
              </Badge>
            </motion.div>
          )}

          {/* Status Indicator */}
          {integration.isEnabled && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 z-10"
            >
              <div className="flex items-center gap-2 bg-green-100 rounded-full px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-700 font-medium">Active</span>
              </div>
            </motion.div>
          )}

          <CardHeader className="pb-4">
            <div className="flex items-start gap-4">
              <motion.div 
                whileHover={{ rotate: 5, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  integration.isEnabled 
                    ? 'bg-gradient-to-br from-green-100 to-emerald-100 shadow-md' 
                    : `bg-gradient-to-br ${integration.color} shadow-lg`
                }`}
              >
                <IconComponent className={`h-8 w-8 transition-colors duration-300 ${
                  integration.isEnabled ? 'text-green-600' : 'text-white'
                }`} />
              </motion.div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className="text-xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {integration.name}
                  </CardTitle>
                  {integration.isEnabled && (
                    <Check className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 mb-3">
                  {integration.description}
                </p>
                
                {/* Metrics */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {integration.metrics.connected.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Activity className="h-3 w-3" />
                    {integration.metrics.success}%
                  </div>
                  {integration.metrics.lastUsed && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {integration.metrics.lastUsed}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {integration.features.slice(0, 3).map((feature, index) => (
                  <Badge 
                    key={index}
                    variant="outline" 
                    className="text-xs bg-gray-50 text-gray-600 border-gray-200"
                  >
                    {feature}
                  </Badge>
                ))}
                {integration.features.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-gray-50 text-gray-600 border-gray-200">
                    +{integration.features.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs font-medium capitalize bg-white/80">
                {integration.category}
              </Badge>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('👁️ Preview button clicked for:', integration.name);
                    handleConfigureIntegration(integration);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant={integration.isEnabled ? "outline" : "default"}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('⚙️ Setup/Configure button clicked for:', integration.name, 'with form:', selectedFormId);
                    handleConfigureIntegration(integration);
                  }}
                  className={`transition-all duration-300 ${
                    integration.isEnabled 
                      ? 'border-green-300 text-green-700 hover:bg-green-50' 
                      : `bg-gradient-to-r ${integration.color} hover:shadow-lg text-white border-0`
                  }`}
                >
                  {integration.isEnabled ? (
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
    <div className="space-y-8 p-6">
      {/* Enhanced Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-4 mb-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl shadow-xl"
          >
            <Sparkles className="h-10 w-10 text-white" />
          </motion.div>
          <div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Integration Hub
            </h2>
            <p className="text-lg text-gray-600 mt-2">Enterprise-grade integrations for modern workflows</p>
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex justify-center gap-12 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">50+</div>
            <div className="text-sm text-gray-600">Integrations</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">99.2%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">1M+</div>
            <div className="text-sm text-gray-600">Connections</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Enhanced Form Selection */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-200"
      >
        <div className="flex items-center gap-6">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg"
          >
            <FormInput className="h-8 w-8 text-white" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Configure Integrations</h3>
            <p className="text-gray-600 mb-4">Select a form to configure integrations and monitor their performance</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Form</label>
                <Select value={selectedFormId} onValueChange={handleFormChange} disabled={formsLoading}>
                  <SelectTrigger className="w-full h-12 bg-white border-gray-300 shadow-sm">
                    <SelectValue placeholder="Select a form to configure integrations" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border shadow-lg">
                    {availableForms.map((form) => (
                      <SelectItem key={form.primary_id} value={form.primary_id}>
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${form.published ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <span>{form.name}</span>
                          <span className="text-xs text-gray-500">({form.submissions} submissions)</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedFormId && (
                <div className="text-sm text-gray-600">
                  <div className="font-medium">Active Integrations</div>
                  <div className="text-green-600">{enabledIntegrations.length} enabled</div>
                </div>
              )}
            </div>
            {formsLoading && (
              <div className="flex items-center gap-2 mt-2 text-blue-600">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Loading forms...</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col lg:flex-row gap-6"
      >
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
          <Input
            placeholder="Search integrations by name, capability, or feature..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-16 h-16 text-lg border-gray-300 bg-white shadow-sm rounded-2xl"
          />
        </div>
        
        <div className="flex gap-4">
          <Button
            variant={activeView === 'grid' ? 'default' : 'outline'}
            onClick={() => setActiveView('grid')}
            className="h-16 px-6"
          >
            <Layers className="h-5 w-5 mr-2" />
            Grid View
          </Button>
          <Button
            variant={activeView === 'list' ? 'default' : 'outline'}
            onClick={() => setActiveView('list')}
            className="h-16 px-6"
          >
            <FileText className="h-5 w-5 mr-2" />
            List View
          </Button>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-3"
      >
        {categories.map((category, index) => {
          const IconComponent = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Button
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-3 h-14 px-6 transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105' 
                    : 'bg-white border-gray-300 hover:bg-gray-50 hover:shadow-md'
                }`}
              >
                <IconComponent className="h-5 w-5" />
                {category.name} ({category.count})
              </Button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-16 bg-gray-100 p-2 rounded-2xl">
            <TabsTrigger value="browse" className="h-12 text-lg rounded-xl">Browse All</TabsTrigger>
            <TabsTrigger value="enabled" className="h-12 text-lg rounded-xl">Enabled ({enabledIntegrations.length})</TabsTrigger>
            <TabsTrigger value="popular" className="h-12 text-lg rounded-xl">Popular</TabsTrigger>
          </TabsList>
          
          <TabsContent value="browse" className="mt-8">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredIntegrations.map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </AnimatePresence>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="enabled" className="mt-8">
            {enabledIntegrations.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <AnimatePresence>
                  {enabledIntegrations.map((integration) => (
                    <IntegrationCard key={integration.id} integration={integration} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mx-auto w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6"
                >
                  <Zap className="h-12 w-12 text-gray-400" />
                </motion.div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">No integrations enabled</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Start by enabling your first integration from the browse tab to automate your form workflows.
                </p>
                <Button 
                  onClick={() => setSelectedCategory('all')}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                >
                  <Wand2 className="mr-2 h-5 w-5" />
                  Browse Integrations
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="popular" className="mt-8">
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              <AnimatePresence>
                {popularIntegrations.map((integration) => (
                  <IntegrationCard key={integration.id} integration={integration} />
                ))}
              </AnimatePresence>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Enhanced Debug info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs space-y-2">
          <div><strong>Debug Information:</strong></div>
          <div>Selected Form: {selectedFormId || 'None'}</div>
          <div>Available Forms: {availableForms.length}</div>
          <div>Modal Open: {configModalOpen.toString()}</div>
          <div>Selected Integration: {selectedIntegration?.name || 'None'}</div>
          <div>Integration States: {JSON.stringify(integrationStates, null, 2)}</div>
          <div>Enabled Integrations Count: {enabledIntegrations.length}</div>
        </div>
      )}

      {/* Configuration Modal */}
      <IntegrationConfigModal
        integration={selectedIntegration}
        isOpen={configModalOpen}
        onClose={handleModalClose}
        formId={selectedFormId}
      />
    </div>
  );
};

export default ModernIntegrationsHub;
