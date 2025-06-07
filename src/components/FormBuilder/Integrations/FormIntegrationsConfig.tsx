
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Save, TestTube, Zap, Mail, Webhook, 
  MessageSquare, Database, Cloud, CheckCircle, 
  AlertCircle, Settings, Copy, ExternalLink,
  Plus, Trash2, Edit, Eye, RefreshCw, Star,
  Globe, Shield, Activity, Target, Users
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FormIntegration {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  config: Record<string, any>;
  lastSync?: string;
  status: 'active' | 'error' | 'pending';
}

interface FormIntegrationsConfigProps {
  formId: string;
  formName: string;
  onBack: () => void;
}

const FormIntegrationsConfig: React.FC<FormIntegrationsConfigProps> = ({
  formId,
  formName,
  onBack
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [integrations, setIntegrations] = useState<FormIntegration[]>([
    {
      id: '1',
      name: 'Email Notifications',
      type: 'email',
      enabled: true,
      config: {
        recipientEmail: 'admin@example.com',
        subject: 'New Form Submission',
        template: 'default'
      },
      lastSync: '2024-01-01T10:00:00Z',
      status: 'active'
    },
    {
      id: '2',
      name: 'Slack Notifications',
      type: 'slack',
      enabled: false,
      config: {
        webhookUrl: '',
        channel: '#general',
        username: 'FormBot'
      },
      status: 'pending'
    }
  ]);

  const [newIntegration, setNewIntegration] = useState({
    type: '',
    config: {}
  });

  const availableIntegrations = [
    {
      type: 'email',
      name: 'Email Notifications',
      description: 'Send email alerts when forms are submitted',
      icon: Mail,
      gradient: 'from-blue-500 to-cyan-500',
      popular: true
    },
    {
      type: 'slack',
      name: 'Slack Integration',
      description: 'Post form submissions to Slack channels',
      icon: MessageSquare,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      type: 'webhook',
      name: 'Custom Webhook',
      description: 'Send data to any external API endpoint',
      icon: Webhook,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      type: 'zapier',
      name: 'Zapier Integration',
      description: 'Connect to 5000+ apps via Zapier',
      icon: Zap,
      gradient: 'from-orange-500 to-red-500',
      popular: true
    },
    {
      type: 'google-sheets',
      name: 'Google Sheets',
      description: 'Save submissions to Google Sheets',
      icon: Database,
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  const handleToggleIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, enabled: !integration.enabled }
        : integration
    ));
    
    toast({
      title: "Integration Updated",
      description: "Integration settings have been saved successfully.",
    });
  };

  const handleTestIntegration = async (integration: FormIntegration) => {
    toast({
      title: "Testing Integration",
      description: "Sending test data...",
    });

    // Simulate test
    setTimeout(() => {
      toast({
        title: "Test Successful",
        description: `${integration.name} is working correctly.`,
      });
    }, 2000);
  };

  const handleSaveConfig = (integrationId: string, config: Record<string, any>) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { ...integration, config: { ...integration.config, ...config } }
        : integration
    ));
    
    toast({
      title: "Configuration Saved",
      description: "Integration settings have been updated.",
    });
  };

  const renderConfigForm = (integration: FormIntegration) => {
    switch (integration.type) {
      case 'email':
        return (
          <EmailConfigForm 
            config={integration.config}
            onSave={(config) => handleSaveConfig(integration.id, config)}
          />
        );
      case 'slack':
        return (
          <SlackConfigForm 
            config={integration.config}
            onSave={(config) => handleSaveConfig(integration.id, config)}
          />
        );
      case 'webhook':
        return (
          <WebhookConfigForm 
            config={integration.config}
            onSave={(config) => handleSaveConfig(integration.id, config)}
          />
        );
      default:
        return <div>Configuration form not available</div>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <RefreshCw className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Builder
              </Button>
              
              <div className="h-8 w-px bg-gray-300" />
              
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-white">
                  <Settings className="h-6 w-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Form Integrations
                  </h1>
                  <p className="text-gray-600 text-sm">
                    Configure integrations for "{formName}"
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Activity className="h-3 w-3 mr-1" />
                {integrations.filter(i => i.enabled).length} Active
              </Badge>
              
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                <Save className="h-4 w-4 mr-2" />
                Save All
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="configure">Configure</TabsTrigger>
              <TabsTrigger value="add-new">Add Integration</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Integrations</p>
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
                        <p className="text-green-100 text-sm">Active</p>
                        <p className="text-3xl font-bold">{integrations.filter(i => i.enabled).length}</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Last 24h</p>
                        <p className="text-3xl font-bold">42</p>
                      </div>
                      <Activity className="h-8 w-8 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Active Integrations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {integrations.map((integration) => (
                        <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(integration.status)}
                              <div>
                                <h4 className="font-semibold">{integration.name}</h4>
                                <p className="text-sm text-gray-600">
                                  {integration.lastSync ? `Last sync: ${new Date(integration.lastSync).toLocaleString()}` : 'Never synced'}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTestIntegration(integration)}
                            >
                              <TestTube className="h-4 w-4 mr-1" />
                              Test
                            </Button>
                            
                            <Switch
                              checked={integration.enabled}
                              onCheckedChange={() => handleToggleIntegration(integration.id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Configure Tab */}
            <TabsContent value="configure" className="space-y-6">
              {integrations.map((integration) => (
                <motion.div
                  key={integration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          {getStatusIcon(integration.status)}
                          {integration.name}
                        </CardTitle>
                        <Switch
                          checked={integration.enabled}
                          onCheckedChange={() => handleToggleIntegration(integration.id)}
                        />
                      </div>
                    </CardHeader>
                    <CardContent>
                      {renderConfigForm(integration)}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </TabsContent>

            {/* Add New Tab */}
            <TabsContent value="add-new" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Available Integrations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableIntegrations.map((integration) => (
                        <Card key={integration.type} className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                          <CardContent className="p-6">
                            <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${integration.gradient} flex items-center justify-center text-white mb-4`}>
                              <integration.icon className="h-6 w-6" />
                            </div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                              {integration.name}
                              {integration.popular && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <Star className="h-3 w-3 mr-1" />
                                  Popular
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600 mb-4">{integration.description}</p>
                            <Button className="w-full">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Integration
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Integration Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <Target className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Coming Soon</h3>
                      <p className="text-gray-600">
                        Detailed analytics and performance metrics for your integrations will be available soon.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Email Configuration Component
const EmailConfigForm: React.FC<{ 
  config: Record<string, any>; 
  onSave: (config: Record<string, any>) => void; 
}> = ({ config, onSave }) => {
  const [formData, setFormData] = useState({
    recipientEmail: config.recipientEmail || '',
    subject: config.subject || 'New Form Submission',
    template: config.template || 'default',
    smtpServer: config.smtpServer || '',
    smtpPort: config.smtpPort || '587',
    username: config.username || '',
    password: config.password || ''
  });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="recipient">Recipient Email</Label>
          <Input
            id="recipient"
            type="email"
            value={formData.recipientEmail}
            onChange={(e) => setFormData(prev => ({ ...prev, recipientEmail: e.target.value }))}
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <Label htmlFor="subject">Email Subject</Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
            placeholder="New Form Submission"
          />
        </div>
      </div>
      
      <Separator />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="smtp-server">SMTP Server</Label>
          <Input
            id="smtp-server"
            value={formData.smtpServer}
            onChange={(e) => setFormData(prev => ({ ...prev, smtpServer: e.target.value }))}
            placeholder="smtp.gmail.com"
          />
        </div>
        <div>
          <Label htmlFor="smtp-port">SMTP Port</Label>
          <Input
            id="smtp-port"
            value={formData.smtpPort}
            onChange={(e) => setFormData(prev => ({ ...prev, smtpPort: e.target.value }))}
            placeholder="587"
          />
        </div>
      </div>
      
      <Button onClick={() => onSave(formData)} className="w-full">
        <Save className="h-4 w-4 mr-2" />
        Save Email Configuration
      </Button>
    </div>
  );
};

// Slack Configuration Component
const SlackConfigForm: React.FC<{ 
  config: Record<string, any>; 
  onSave: (config: Record<string, any>) => void; 
}> = ({ config, onSave }) => {
  const [formData, setFormData] = useState({
    webhookUrl: config.webhookUrl || '',
    channel: config.channel || '#general',
    username: config.username || 'FormBot'
  });

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="webhook-url">Slack Webhook URL</Label>
        <Input
          id="webhook-url"
          value={formData.webhookUrl}
          onChange={(e) => setFormData(prev => ({ ...prev, webhookUrl: e.target.value }))}
          placeholder="https://hooks.slack.com/services/..."
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="channel">Channel</Label>
          <Input
            id="channel"
            value={formData.channel}
            onChange={(e) => setFormData(prev => ({ ...prev, channel: e.target.value }))}
            placeholder="#general"
          />
        </div>
        <div>
          <Label htmlFor="username">Bot Username</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
            placeholder="FormBot"
          />
        </div>
      </div>
      
      <Button onClick={() => onSave(formData)} className="w-full">
        <Save className="h-4 w-4 mr-2" />
        Save Slack Configuration
      </Button>
    </div>
  );
};

// Webhook Configuration Component
const WebhookConfigForm: React.FC<{ 
  config: Record<string, any>; 
  onSave: (config: Record<string, any>) => void; 
}> = ({ config, onSave }) => {
  const [formData, setFormData] = useState({
    url: config.url || '',
    method: config.method || 'POST',
    headers: config.headers || '{}',
    timeout: config.timeout || '30'
  });

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="webhook-url">Webhook URL</Label>
        <Input
          id="webhook-url"
          value={formData.url}
          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
          placeholder="https://your-api.com/webhook"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="method">HTTP Method</Label>
          <Select value={formData.method} onValueChange={(value) => setFormData(prev => ({ ...prev, method: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="timeout">Timeout (seconds)</Label>
          <Input
            id="timeout"
            value={formData.timeout}
            onChange={(e) => setFormData(prev => ({ ...prev, timeout: e.target.value }))}
            placeholder="30"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="headers">Custom Headers (JSON)</Label>
        <Textarea
          id="headers"
          value={formData.headers}
          onChange={(e) => setFormData(prev => ({ ...prev, headers: e.target.value }))}
          placeholder='{"Authorization": "Bearer token", "Content-Type": "application/json"}'
          rows={3}
        />
      </div>
      
      <Button onClick={() => onSave(formData)} className="w-full">
        <Save className="h-4 w-4 mr-2" />
        Save Webhook Configuration
      </Button>
    </div>
  );
};

export default FormIntegrationsConfig;
