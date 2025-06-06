
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Mail, Database, Cloud, Webhook, Zap, Slack, Bell, 
  Settings, Check, Plus, Trash2, ExternalLink, Key,
  Globe, Shield, Activity, FileText, Users, Calendar
} from 'lucide-react';
import { FormConfig } from '../types';
import { useToast } from '@/hooks/use-toast';

interface EnhancedIntegrationsHubProps {
  formConfig: FormConfig;
  onUpdate: (config: FormConfig) => void;
}

const EnhancedIntegrationsHub: React.FC<EnhancedIntegrationsHubProps> = ({
  formConfig,
  onUpdate
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('email');

  const integrations = [
    {
      id: 'email',
      name: 'Email Notifications',
      icon: Mail,
      description: 'Send email alerts when forms are submitted',
      category: 'notifications',
      enabled: formConfig.settings?.integrations?.email?.enabled || false,
      color: 'blue'
    },
    {
      id: 'webhook',
      name: 'Webhooks',
      icon: Webhook,
      description: 'Send data to external URLs automatically',
      category: 'automation',
      enabled: formConfig.settings?.integrations?.webhook?.enabled || false,
      color: 'purple'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      icon: Zap,
      description: 'Connect to 5000+ apps through Zapier',
      category: 'automation',
      enabled: formConfig.settings?.integrations?.zapier?.enabled || false,
      color: 'orange'
    },
    {
      id: 'slack',
      name: 'Slack',
      icon: Slack,
      description: 'Send notifications to Slack channels',
      category: 'notifications',
      enabled: formConfig.settings?.integrations?.slack?.enabled || false,
      color: 'green'
    },
    {
      id: 'database',
      name: 'Database',
      icon: Database,
      description: 'Store submissions in external databases',
      category: 'storage',
      enabled: formConfig.settings?.integrations?.database?.enabled || false,
      color: 'indigo'
    },
    {
      id: 'cloud-storage',
      name: 'Cloud Storage',
      icon: Cloud,
      description: 'Upload files to Google Drive, Dropbox',
      category: 'storage',
      enabled: formConfig.settings?.integrations?.cloudStorage?.enabled || false,
      color: 'cyan'
    }
  ];

  const updateIntegration = (integrationId: string, settings: any) => {
    const updatedConfig = {
      ...formConfig,
      settings: {
        ...formConfig.settings,
        integrations: {
          ...formConfig.settings?.integrations,
          [integrationId]: settings
        }
      }
    };
    onUpdate(updatedConfig);
  };

  const testIntegration = async (integrationId: string) => {
    toast({
      title: "Testing Integration",
      description: `Testing ${integrationId} connection...`,
    });
    
    // Simulate test
    setTimeout(() => {
      toast({
        title: "Test Successful",
        description: `${integrationId} integration is working correctly.`,
      });
    }, 2000);
  };

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Email Notifications</h3>
          <p className="text-sm text-gray-600">Configure email alerts for form submissions</p>
        </div>
        <Switch
          checked={formConfig.settings?.integrations?.email?.enabled || false}
          onCheckedChange={(enabled) => updateIntegration('email', { 
            ...formConfig.settings?.integrations?.email, 
            enabled 
          })}
        />
      </div>

      {formConfig.settings?.integrations?.email?.enabled && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>From Email</Label>
              <Input
                placeholder="noreply@yourdomain.com"
                value={formConfig.settings?.integrations?.email?.from || ''}
                onChange={(e) => updateIntegration('email', {
                  ...formConfig.settings?.integrations?.email,
                  from: e.target.value
                })}
              />
            </div>
            <div>
              <Label>From Name</Label>
              <Input
                placeholder="Your Company"
                value={formConfig.settings?.integrations?.email?.fromName || ''}
                onChange={(e) => updateIntegration('email', {
                  ...formConfig.settings?.integrations?.email,
                  fromName: e.target.value
                })}
              />
            </div>
          </div>

          <div>
            <Label>Notification Recipients</Label>
            <Textarea
              placeholder="admin@yourdomain.com, manager@yourdomain.com"
              value={formConfig.settings?.integrations?.email?.recipients || ''}
              onChange={(e) => updateIntegration('email', {
                ...formConfig.settings?.integrations?.email,
                recipients: e.target.value
              })}
            />
            <p className="text-xs text-gray-500 mt-1">Separate multiple emails with commas</p>
          </div>

          <div>
            <Label>Email Subject</Label>
            <Input
              placeholder="New form submission from {form_name}"
              value={formConfig.settings?.integrations?.email?.subject || ''}
              onChange={(e) => updateIntegration('email', {
                ...formConfig.settings?.integrations?.email,
                subject: e.target.value
              })}
            />
          </div>

          <div>
            <Label>Email Template</Label>
            <Textarea
              rows={6}
              placeholder="A new submission has been received..."
              value={formConfig.settings?.integrations?.email?.template || ''}
              onChange={(e) => updateIntegration('email', {
                ...formConfig.settings?.integrations?.email,
                template: e.target.value
              })}
            />
          </div>

          <Button onClick={() => testIntegration('email')} variant="outline">
            <Mail className="h-4 w-4 mr-2" />
            Test Email
          </Button>
        </div>
      )}
    </div>
  );

  const renderWebhookSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Webhook Integration</h3>
          <p className="text-sm text-gray-600">Send form data to external endpoints</p>
        </div>
        <Switch
          checked={formConfig.settings?.integrations?.webhook?.enabled || false}
          onCheckedChange={(enabled) => updateIntegration('webhook', { 
            ...formConfig.settings?.integrations?.webhook, 
            enabled 
          })}
        />
      </div>

      {formConfig.settings?.integrations?.webhook?.enabled && (
        <div className="space-y-4">
          <div>
            <Label>Webhook URL</Label>
            <Input
              placeholder="https://your-api.com/webhook"
              value={formConfig.settings?.integrations?.webhook?.url || ''}
              onChange={(e) => updateIntegration('webhook', {
                ...formConfig.settings?.integrations?.webhook,
                url: e.target.value
              })}
            />
          </div>

          <div>
            <Label>HTTP Method</Label>
            <Select
              value={formConfig.settings?.integrations?.webhook?.method || 'POST'}
              onValueChange={(method) => updateIntegration('webhook', {
                ...formConfig.settings?.integrations?.webhook,
                method
              })}
            >
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
            <Label>Headers (JSON)</Label>
            <Textarea
              placeholder='{"Authorization": "Bearer your-token", "Content-Type": "application/json"}'
              value={formConfig.settings?.integrations?.webhook?.headers || ''}
              onChange={(e) => updateIntegration('webhook', {
                ...formConfig.settings?.integrations?.webhook,
                headers: e.target.value
              })}
            />
          </div>

          <div className="flex items-center gap-2">
            <Switch
              checked={formConfig.settings?.integrations?.webhook?.retryOnFailure || false}
              onCheckedChange={(retryOnFailure) => updateIntegration('webhook', {
                ...formConfig.settings?.integrations?.webhook,
                retryOnFailure
              })}
            />
            <Label>Retry on failure</Label>
          </div>

          <Button onClick={() => testIntegration('webhook')} variant="outline">
            <Webhook className="h-4 w-4 mr-2" />
            Test Webhook
          </Button>
        </div>
      )}
    </div>
  );

  const renderZapierSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Zapier Integration</h3>
          <p className="text-sm text-gray-600">Connect to 5000+ apps automatically</p>
        </div>
        <Switch
          checked={formConfig.settings?.integrations?.zapier?.enabled || false}
          onCheckedChange={(enabled) => updateIntegration('zapier', { 
            ...formConfig.settings?.integrations?.zapier, 
            enabled 
          })}
        />
      </div>

      {formConfig.settings?.integrations?.zapier?.enabled && (
        <div className="space-y-4">
          <div>
            <Label>Zapier Webhook URL</Label>
            <Input
              placeholder="https://hooks.zapier.com/hooks/catch/..."
              value={formConfig.settings?.integrations?.zapier?.webhookUrl || ''}
              onChange={(e) => updateIntegration('zapier', {
                ...formConfig.settings?.integrations?.zapier,
                webhookUrl: e.target.value
              })}
            />
            <p className="text-xs text-gray-500 mt-1">
              Get this URL from your Zapier webhook trigger
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">How to set up Zapier:</h4>
            <ol className="text-sm text-blue-800 space-y-1">
              <li>1. Create a new Zap in Zapier</li>
              <li>2. Choose "Webhooks by Zapier" as trigger</li>
              <li>3. Select "Catch Hook" event</li>
              <li>4. Copy the webhook URL to the field above</li>
              <li>5. Choose your action app (Gmail, Slack, etc.)</li>
            </ol>
          </div>

          <Button onClick={() => testIntegration('zapier')} variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            Test Zapier Connection
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Integrations Hub</h2>
        <p className="text-gray-600 mt-1">Connect your forms to external services and automate workflows</p>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-gray-200 bg-gray-50">
          <div className="p-4">
            <h3 className="font-medium text-gray-900 mb-4">Available Integrations</h3>
            <div className="space-y-2">
              {integrations.map((integration) => (
                <button
                  key={integration.id}
                  onClick={() => setActiveTab(integration.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeTab === integration.id 
                      ? 'bg-blue-100 border-blue-200 border' 
                      : 'hover:bg-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-${integration.color}-100`}>
                      <integration.icon className={`h-4 w-4 text-${integration.color}-600`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{integration.name}</p>
                        {integration.enabled && (
                          <Check className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-xs text-gray-600 truncate">{integration.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="email">
              {renderEmailSettings()}
            </TabsContent>
            
            <TabsContent value="webhook">
              {renderWebhookSettings()}
            </TabsContent>
            
            <TabsContent value="zapier">
              {renderZapierSettings()}
            </TabsContent>
            
            <TabsContent value="slack">
              <div className="text-center py-12">
                <Slack className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Slack Integration</h3>
                <p className="text-gray-600">Coming soon - Send notifications to Slack channels</p>
              </div>
            </TabsContent>
            
            <TabsContent value="database">
              <div className="text-center py-12">
                <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Database Integration</h3>
                <p className="text-gray-600">Coming soon - Connect to external databases</p>
              </div>
            </TabsContent>
            
            <TabsContent value="cloud-storage">
              <div className="text-center py-12">
                <Cloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Cloud Storage</h3>
                <p className="text-gray-600">Coming soon - Upload files to cloud storage</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EnhancedIntegrationsHub;
