
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, Save, TestTube, X, CheckCircle, AlertCircle, 
  Mail, Webhook, MessageSquare, Zap, Database, FileText,
  CreditCard, Calendar, Users, Cloud, BarChart3, Copy,
  Eye, EyeOff, Plus, Trash2, Edit, ExternalLink
} from 'lucide-react';
import { IntegrationsService } from '@/services/integrations';

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

interface IntegrationConfigModalProps {
  integration: Integration | null;
  isOpen: boolean;
  onClose: () => void;
  formId: string;
}

const IntegrationConfigModal: React.FC<IntegrationConfigModalProps> = ({
  integration,
  isOpen,
  onClose,
  formId
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [activeTab, setActiveTab] = useState('config');
  
  // Email Configuration
  const [emailConfig, setEmailConfig] = useState({
    enabled: false,
    smtpServer: '',
    port: '587',
    security: 'tls',
    username: '',
    password: '',
    fromEmail: '',
    fromName: '',
    template: 'New form submission from {{formName}}\n\nSubmission Details:\n{{submissionData}}\n\nSubmitted at: {{timestamp}}',
    recipients: [''],
    subject: 'New Form Submission - {{formName}}'
  });

  // Webhook Configuration
  const [webhookConfig, setWebhookConfig] = useState({
    enabled: false,
    url: '',
    method: 'POST',
    headers: [{ key: 'Content-Type', value: 'application/json' }],
    authType: 'none',
    authToken: '',
    retryAttempts: 3,
    timeout: 30,
    payload: '{\n  "formId": "{{formId}}",\n  "submissionId": "{{submissionId}}",\n  "timestamp": "{{timestamp}}",\n  "data": {{submissionData}}\n}'
  });

  // Slack Configuration
  const [slackConfig, setSlackConfig] = useState({
    enabled: false,
    webhookUrl: '',
    channel: '#general',
    username: 'FormBot',
    emoji: ':memo:',
    template: 'New form submission received!\n\n*Form:* {{formName}}\n*Submitted at:* {{timestamp}}\n\n{{submissionData}}'
  });

  // Zapier Configuration
  const [zapierConfig, setZapierConfig] = useState({
    enabled: false,
    webhookUrl: '',
    triggerConditions: [],
    dataMapping: {}
  });

  // Database Configuration
  const [databaseConfig, setDatabaseConfig] = useState({
    enabled: false,
    type: 'postgresql',
    host: '',
    port: '5432',
    database: '',
    username: '',
    password: '',
    tableName: 'form_submissions',
    fieldMapping: {}
  });

  // Google Sheets Configuration
  const [sheetsConfig, setSheetsConfig] = useState({
    enabled: false,
    spreadsheetId: '',
    worksheetName: 'Sheet1',
    headerRow: 1,
    authType: 'service-account',
    serviceAccountKey: '',
    fieldMapping: {}
  });

  // Stripe Configuration
  const [stripeConfig, setStripeConfig] = useState({
    enabled: false,
    publicKey: '',
    secretKey: '',
    currency: 'usd',
    mode: 'test',
    successUrl: '',
    cancelUrl: '',
    products: []
  });

  // Calendar Configuration
  const [calendarConfig, setCalendarConfig] = useState({
    enabled: false,
    provider: 'google',
    calendarId: '',
    timezone: 'UTC',
    duration: 30,
    bufferTime: 15,
    availabilityRules: []
  });

  // CRM Configuration
  const [crmConfig, setCrmConfig] = useState({
    enabled: false,
    provider: 'hubspot',
    apiKey: '',
    pipeline: '',
    stage: '',
    fieldMapping: {}
  });

  // Cloud Storage Configuration
  const [cloudConfig, setCloudConfig] = useState({
    enabled: false,
    provider: 'google-drive',
    credentials: '',
    folder: '/form-uploads',
    publicAccess: false
  });

  // Analytics Configuration
  const [analyticsConfig, setAnalyticsConfig] = useState({
    enabled: false,
    provider: 'google-analytics',
    trackingId: '',
    events: ['form_view', 'form_submit', 'form_abandon'],
    customDimensions: {}
  });

  const handleSave = async () => {
    if (!integration) return;
    
    setIsLoading(true);
    
    try {
      let config = {};
      
      switch (integration.id) {
        case 'email':
          config = emailConfig;
          break;
        case 'webhook':
          config = webhookConfig;
          break;
        case 'slack':
          config = slackConfig;
          break;
        case 'zapier':
          config = zapierConfig;
          break;
        case 'database':
          config = databaseConfig;
          break;
        case 'google-sheets':
          config = sheetsConfig;
          break;
        case 'stripe':
          config = stripeConfig;
          break;
        case 'calendar':
          config = calendarConfig;
          break;
        case 'crm':
          config = crmConfig;
          break;
        case 'cloud-storage':
          config = cloudConfig;
          break;
        case 'analytics':
          config = analyticsConfig;
          break;
      }

      // Use the IntegrationsService to save configuration
      IntegrationsService.saveIntegration(formId, integration.id, config);
      
      toast({
        title: "Configuration Saved",
        description: `${integration.name} has been configured successfully.`
      });
      
      onClose();
    } catch (error) {
      console.error('Error saving integration config:', error);
      toast({
        title: "Error",
        description: "Failed to save configuration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTest = async () => {
    if (!integration) return;
    
    setIsTesting(true);
    
    try {
      const testData = {
        formId: formId,
        submissionId: 'test_' + Date.now(),
        timestamp: new Date().toISOString(),
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          message: 'This is a test submission'
        }
      };

      switch (integration.id) {
        case 'webhook':
          await testWebhook(testData);
          break;
        case 'slack':
          await testSlack(testData);
          break;
        case 'zapier':
          await testZapier(testData);
          break;
        case 'email':
          await testEmail(testData);
          break;
        default:
          throw new Error('Test not implemented for this integration');
      }
      
      toast({
        title: "Test Successful",
        description: `${integration.name} test completed successfully.`
      });
    } catch (error) {
      console.error('Test failed:', error);
      toast({
        title: "Test Failed",
        description: error instanceof Error ? error.message : "Test failed. Please check your configuration.",
        variant: "destructive"
      });
    } finally {
      setIsTesting(false);
    }
  };

  const testWebhook = async (testData: any) => {
    if (!webhookConfig.url) {
      throw new Error('Webhook URL is required');
    }

    const headers: Record<string, string> = {};
    webhookConfig.headers.forEach(header => {
      if (header.key && header.value) {
        headers[header.key] = header.value;
      }
    });

    if (webhookConfig.authType === 'bearer' && webhookConfig.authToken) {
      headers['Authorization'] = `Bearer ${webhookConfig.authToken}`;
    }

    const response = await fetch(webhookConfig.url, {
      method: webhookConfig.method,
      headers,
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  };

  const testSlack = async (testData: any) => {
    if (!slackConfig.webhookUrl) {
      throw new Error('Slack webhook URL is required');
    }

    const message = slackConfig.template
      .replace(/{{formName}}/g, 'Test Form')
      .replace(/{{timestamp}}/g, testData.timestamp)
      .replace(/{{submissionData}}/g, JSON.stringify(testData.data, null, 2));

    const payload = {
      channel: slackConfig.channel,
      username: slackConfig.username,
      icon_emoji: slackConfig.emoji,
      text: message
    };

    const response = await fetch(slackConfig.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }
  };

  const testZapier = async (testData: any) => {
    if (!zapierConfig.webhookUrl) {
      throw new Error('Zapier webhook URL is required');
    }

    const response = await fetch(zapierConfig.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testData)
    });

    if (!response.ok) {
      throw new Error(`Zapier webhook error: ${response.statusText}`);
    }
  };

  const testEmail = async (testData: any) => {
    // Mock email test - in real implementation, this would send via SMTP
    console.log('Testing email with config:', emailConfig);
    console.log('Test data:', testData);
    
    if (!emailConfig.smtpServer || !emailConfig.username || !emailConfig.fromEmail) {
      throw new Error('SMTP configuration is incomplete');
    }
  };

  // Load existing configuration
  useEffect(() => {
    if (integration && formId) {
      const savedConfig = IntegrationsService.getIntegration(formId, integration.id);
      
      if (savedConfig) {
        try {
          const config = savedConfig.config;
          
          switch (integration.id) {
            case 'email':
              setEmailConfig(prev => ({ ...prev, ...config }));
              break;
            case 'webhook':
              setWebhookConfig(prev => ({ ...prev, ...config }));
              break;
            case 'slack':
              setSlackConfig(prev => ({ ...prev, ...config }));
              break;
            case 'zapier':
              setZapierConfig(prev => ({ ...prev, ...config }));
              break;
            case 'database':
              setDatabaseConfig(prev => ({ ...prev, ...config }));
              break;
            case 'google-sheets':
              setSheetsConfig(prev => ({ ...prev, ...config }));
              break;
            case 'stripe':
              setStripeConfig(prev => ({ ...prev, ...config }));
              break;
            case 'calendar':
              setCalendarConfig(prev => ({ ...prev, ...config }));
              break;
            case 'crm':
              setCrmConfig(prev => ({ ...prev, ...config }));
              break;
            case 'cloud-storage':
              setCloudConfig(prev => ({ ...prev, ...config }));
              break;
            case 'analytics':
              setAnalyticsConfig(prev => ({ ...prev, ...config }));
              break;
          }
        } catch (error) {
          console.error('Error loading saved configuration:', error);
        }
      }
    }
  }, [integration, formId]);

  if (!integration) return null;

  const IconComponent = integration.icon;

  const renderEmailConfig = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Email Notifications</h3>
          <p className="text-sm text-gray-600">Send automated email notifications when forms are submitted</p>
        </div>
        <Switch
          checked={emailConfig.enabled}
          onCheckedChange={(checked) => setEmailConfig(prev => ({ ...prev, enabled: checked }))}
        />
      </div>

      {emailConfig.enabled && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="smtp-server">SMTP Server</Label>
              <Input
                id="smtp-server"
                value={emailConfig.smtpServer}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, smtpServer: e.target.value }))}
                placeholder="smtp.gmail.com"
              />
            </div>
            <div>
              <Label htmlFor="port">Port</Label>
              <Input
                id="port"
                value={emailConfig.port}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, port: e.target.value }))}
                placeholder="587"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={emailConfig.username}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, username: e.target.value }))}
                placeholder="your-email@gmail.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={emailConfig.password}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, password: e.target.value }))}
                placeholder="App password"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="from-email">From Email</Label>
              <Input
                id="from-email"
                value={emailConfig.fromEmail}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, fromEmail: e.target.value }))}
                placeholder="noreply@yourdomain.com"
              />
            </div>
            <div>
              <Label htmlFor="from-name">From Name</Label>
              <Input
                id="from-name"
                value={emailConfig.fromName}
                onChange={(e) => setEmailConfig(prev => ({ ...prev, fromName: e.target.value }))}
                placeholder="Your Company"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="subject">Email Subject</Label>
            <Input
              id="subject"
              value={emailConfig.subject}
              onChange={(e) => setEmailConfig(prev => ({ ...prev, subject: e.target.value }))}
              placeholder="New Form Submission"
            />
          </div>

          <div>
            <Label htmlFor="recipients">Recipients (one per line)</Label>
            <Textarea
              id="recipients"
              value={emailConfig.recipients.join('\n')}
              onChange={(e) => setEmailConfig(prev => ({ 
                ...prev, 
                recipients: e.target.value.split('\n').filter(email => email.trim()) 
              }))}
              placeholder="admin@yourdomain.com&#10;manager@yourdomain.com"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="template">Email Template</Label>
            <Textarea
              id="template"
              value={emailConfig.template}
              onChange={(e) => setEmailConfig(prev => ({ ...prev, template: e.target.value }))}
              rows={8}
            />
            <p className="text-xs text-gray-500 mt-1">
              Use placeholders: {`{{formName}}, {{submissionData}}, {{timestamp}}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderWebhookConfig = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Webhook Configuration</h3>
          <p className="text-sm text-gray-600">Send HTTP requests to external services</p>
        </div>
        <Switch
          checked={webhookConfig.enabled}
          onCheckedChange={(checked) => setWebhookConfig(prev => ({ ...prev, enabled: checked }))}
        />
      </div>

      {webhookConfig.enabled && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="webhook-url">Webhook URL</Label>
            <Input
              id="webhook-url"
              value={webhookConfig.url}
              onChange={(e) => setWebhookConfig(prev => ({ ...prev, url: e.target.value }))}
              placeholder="https://your-api.com/webhook"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="method">HTTP Method</Label>
              <Select value={webhookConfig.method} onValueChange={(value) => setWebhookConfig(prev => ({ ...prev, method: value }))}>
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
                type="number"
                value={webhookConfig.timeout}
                onChange={(e) => setWebhookConfig(prev => ({ ...prev, timeout: parseInt(e.target.value) }))}
              />
            </div>
          </div>

          <div>
            <Label>Headers</Label>
            {webhookConfig.headers.map((header, index) => (
              <div key={index} className="flex gap-2 mt-2">
                <Input
                  placeholder="Header name"
                  value={header.key}
                  onChange={(e) => {
                    const newHeaders = [...webhookConfig.headers];
                    newHeaders[index].key = e.target.value;
                    setWebhookConfig(prev => ({ ...prev, headers: newHeaders }));
                  }}
                />
                <Input
                  placeholder="Header value"
                  value={header.value}
                  onChange={(e) => {
                    const newHeaders = [...webhookConfig.headers];
                    newHeaders[index].value = e.target.value;
                    setWebhookConfig(prev => ({ ...prev, headers: newHeaders }));
                  }}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newHeaders = webhookConfig.headers.filter((_, i) => i !== index);
                    setWebhookConfig(prev => ({ ...prev, headers: newHeaders }));
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => setWebhookConfig(prev => ({ 
                ...prev, 
                headers: [...prev.headers, { key: '', value: '' }] 
              }))}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Header
            </Button>
          </div>

          <div>
            <Label htmlFor="payload">Payload Template</Label>
            <Textarea
              id="payload"
              value={webhookConfig.payload}
              onChange={(e) => setWebhookConfig(prev => ({ ...prev, payload: e.target.value }))}
              rows={8}
              className="font-mono text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderSlackConfig = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Slack Integration</h3>
          <p className="text-sm text-gray-600">Send notifications to Slack channels</p>
        </div>
        <Switch
          checked={slackConfig.enabled}
          onCheckedChange={(checked) => setSlackConfig(prev => ({ ...prev, enabled: checked }))}
        />
      </div>

      {slackConfig.enabled && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
            <Input
              id="slack-webhook"
              value={slackConfig.webhookUrl}
              onChange={(e) => setSlackConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
              placeholder="https://hooks.slack.com/services/..."
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="channel">Channel</Label>
              <Input
                id="channel"
                value={slackConfig.channel}
                onChange={(e) => setSlackConfig(prev => ({ ...prev, channel: e.target.value }))}
                placeholder="#general"
              />
            </div>
            <div>
              <Label htmlFor="username">Bot Username</Label>
              <Input
                id="username"
                value={slackConfig.username}
                onChange={(e) => setSlackConfig(prev => ({ ...prev, username: e.target.value }))}
                placeholder="FormBot"
              />
            </div>
            <div>
              <Label htmlFor="emoji">Emoji</Label>
              <Input
                id="emoji"
                value={slackConfig.emoji}
                onChange={(e) => setSlackConfig(prev => ({ ...prev, emoji: e.target.value }))}
                placeholder=":memo:"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="slack-template">Message Template</Label>
            <Textarea
              id="slack-template"
              value={slackConfig.template}
              onChange={(e) => setSlackConfig(prev => ({ ...prev, template: e.target.value }))}
              rows={6}
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderZapierConfig = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Zapier Integration</h3>
          <p className="text-sm text-gray-600">Connect to 5000+ apps via Zapier</p>
        </div>
        <Switch
          checked={zapierConfig.enabled}
          onCheckedChange={(checked) => setZapierConfig(prev => ({ ...prev, enabled: checked }))}
        />
      </div>

      {zapierConfig.enabled && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
            <Input
              id="zapier-webhook"
              value={zapierConfig.webhookUrl}
              onChange={(e) => setZapierConfig(prev => ({ ...prev, webhookUrl: e.target.value }))}
              placeholder="https://hooks.zapier.com/hooks/catch/..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Create a new Zap and use a "Webhooks by Zapier" trigger to get this URL
            </p>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">How to set up Zapier:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Create a new Zap in Zapier</li>
              <li>2. Choose "Webhooks by Zapier" as the trigger</li>
              <li>3. Select "Catch Hook" as the trigger event</li>
              <li>4. Copy the webhook URL and paste it above</li>
              <li>5. Set up your action step (Google Sheets, Email, etc.)</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  );

  const renderConfiguration = () => {
    switch (integration.id) {
      case 'email':
      case 'mailchimp':
        return renderEmailConfig();
      case 'webhook':
        return renderWebhookConfig();
      case 'slack':
      case 'discord':
        return renderSlackConfig();
      case 'zapier':
        return renderZapierConfig();
      default:
        return (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              <Settings className="h-12 w-12 mx-auto mb-2" />
              Configuration for {integration.name} coming soon
            </div>
            <p className="text-sm text-gray-600">
              This integration is in development. Basic setup will be available soon.
            </p>
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${integration.color}`}>
              <IconComponent className="h-6 w-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-xl">Configure {integration.name}</DialogTitle>
              <DialogDescription className="text-sm">
                Set up {integration.name} integration for your form
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="test">Test & Monitor</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="mt-6">
            <Card>
              <CardContent className="p-6">
                {renderConfiguration()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TestTube className="h-5 w-5" />
                    Test Integration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Send a test submission to verify your integration is working correctly.
                  </p>
                  <Button 
                    onClick={handleTest} 
                    disabled={isTesting}
                    className="w-full"
                  >
                    {isTesting ? (
                      <>Testing...</>
                    ) : (
                      <>
                        <TestTube className="h-4 w-4 mr-2" />
                        Send Test
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Integration Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{integration.metrics.connected}</div>
                      <div className="text-xs text-gray-600">Total Sent</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{integration.metrics.success}%</div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">0</div>
                      <div className="text-xs text-gray-600">Failed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="docs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Integration Guide
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Features:</h4>
                    <div className="flex flex-wrap gap-2">
                      {integration.features.map((feature, index) => (
                        <Badge key={index} variant="outline">{feature}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Description:</h4>
                    <p className="text-sm text-gray-600">{integration.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Getting Started:</h4>
                    <ol className="text-sm text-gray-600 space-y-1">
                      <li>1. Configure the integration using the Configuration tab</li>
                      <li>2. Test the integration to ensure it's working properly</li>
                      <li>3. Save your configuration</li>
                      <li>4. Monitor the integration performance in the Test & Monitor tab</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleTest}
              disabled={isTesting}
            >
              {isTesting ? (
                <>Testing...</>
              ) : (
                <>
                  <TestTube className="h-4 w-4 mr-2" />
                  Test
                </>
              )}
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isLoading}
              className={`bg-gradient-to-r ${integration.color}`}
            >
              {isLoading ? (
                <>Saving...</>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IntegrationConfigModal;
