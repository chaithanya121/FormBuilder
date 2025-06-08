
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { IntegrationsService } from '@/services/integrations';
import { Save, TestTube, Mail, Webhook, MessageSquare, Zap, Database, FileText } from 'lucide-react';

interface IntegrationConfigModalProps {
  integration: any;
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
  const [config, setConfig] = useState<any>({});
  const [enabled, setEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (integration && formId) {
      const existingConfig = IntegrationsService.getIntegration(formId, integration.id);
      if (existingConfig) {
        setConfig(existingConfig.config);
        setEnabled(existingConfig.enabled);
      } else {
        setConfig(getDefaultConfig(integration.id));
        setEnabled(false);
      }
    }
  }, [integration, formId]);

  const getDefaultConfig = (integrationType: string) => {
    switch (integrationType) {
      case 'email':
        return {
          recipients: '',
          subject: 'New Form Submission - {{formName}}',
          template: 'You have received a new form submission:\n\n{{submissionData}}\n\nSubmitted at: {{timestamp}}',
          smtpServer: '',
          smtpPort: '587',
          username: '',
          password: ''
        };
      case 'slack':
        return {
          webhookUrl: '',
          channel: '#general',
          username: 'FormBot',
          emoji: ':memo:',
          template: 'New form submission received!\n\nForm: {{formName}}\nSubmitted at: {{timestamp}}\n\nData:\n{{submissionData}}'
        };
      case 'webhook':
        return {
          url: '',
          method: 'POST',
          headers: [],
          payload: '{{submissionData}}',
          authType: 'none',
          authToken: ''
        };
      case 'zapier':
        return {
          webhookUrl: '',
          description: 'Send form submissions to Zapier workflow'
        };
      case 'google-sheets':
        return {
          spreadsheetId: '',
          worksheetName: 'Form Submissions',
          apiKey: '',
          description: 'Save submissions to Google Sheets'
        };
      default:
        return {};
    }
  };

  const handleSave = async () => {
    if (!formId || !integration) return;

    setIsLoading(true);
    try {
      IntegrationsService.saveIntegration(formId, integration.id, {
        ...config,
        enabled
      });

      toast({
        title: "Integration Saved",
        description: `${integration.name} has been configured successfully.`,
      });

      onClose();
    } catch (error) {
      console.error('Error saving integration:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save integration configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTest = async () => {
    if (!formId || !integration) return;

    setIsLoading(true);
    try {
      // Create test submission data
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'This is a test submission to verify the integration is working correctly.'
      };

      // Temporarily save the current config for testing
      IntegrationsService.saveIntegration(formId, integration.id, {
        ...config,
        enabled: true
      });

      // Trigger test integration
      await IntegrationsService.processSubmission({
        formId,
        submissionId: `test_${Date.now()}`,
        timestamp: new Date().toISOString(),
        data: testData,
        metadata: {
          ip: 'test',
          userAgent: 'Test Agent'
        }
      });

      toast({
        title: "Test Successful",
        description: `${integration.name} test completed. Check your integration endpoint for the test data.`,
      });
    } catch (error) {
      console.error('Test failed:', error);
      toast({
        title: "Test Failed",
        description: "Integration test failed. Please check your configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateConfig = (key: string, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const renderConfigForm = () => {
    if (!integration) return null;

    switch (integration.id) {
      case 'email':
        return <EmailConfigForm config={config} updateConfig={updateConfig} />;
      case 'slack':
        return <SlackConfigForm config={config} updateConfig={updateConfig} />;
      case 'webhook':
        return <WebhookConfigForm config={config} updateConfig={updateConfig} />;
      case 'zapier':
        return <ZapierConfigForm config={config} updateConfig={updateConfig} />;
      case 'google-sheets':
        return <GoogleSheetsConfigForm config={config} updateConfig={updateConfig} />;
      default:
        return (
          <div className="text-center py-8">
            <p className="text-gray-500">Configuration form for {integration.name} is not available yet.</p>
          </div>
        );
    }
  };

  if (!integration) return null;

  const IconComponent = integration.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-r ${integration.color}`}>
              <IconComponent className="h-5 w-5 text-white" />
            </div>
            Configure {integration.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Enable Integration</h4>
              <p className="text-sm text-gray-600">
                {integration.description}
              </p>
            </div>
            <Switch checked={enabled} onCheckedChange={setEnabled} />
          </div>

          <Separator />

          {renderConfigForm()}

          <div className="flex justify-between gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleTest}
              disabled={isLoading || !enabled}
            >
              <TestTube className="h-4 w-4 mr-2" />
              Test Integration
            </Button>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Saving...' : 'Save Configuration'}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Email Configuration Form
const EmailConfigForm: React.FC<{ config: any; updateConfig: (key: string, value: any) => void }> = ({ config, updateConfig }) => (
  <div className="space-y-4">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="recipients">Recipients (comma-separated)</Label>
        <Input
          id="recipients"
          value={config.recipients || ''}
          onChange={(e) => updateConfig('recipients', e.target.value)}
          placeholder="admin@example.com, team@example.com"
        />
      </div>
      <div>
        <Label htmlFor="subject">Email Subject</Label>
        <Input
          id="subject"
          value={config.subject || ''}
          onChange={(e) => updateConfig('subject', e.target.value)}
          placeholder="New Form Submission"
        />
      </div>
    </div>
    
    <div>
      <Label htmlFor="template">Email Template</Label>
      <Textarea
        id="template"
        value={config.template || ''}
        onChange={(e) => updateConfig('template', e.target.value)}
        placeholder="Email template with {{placeholders}}"
        rows={4}
      />
      <p className="text-xs text-gray-500 mt-1">
        Use placeholders: {{formName}}, {{submissionData}}, {{timestamp}}, {{submissionId}}
      </p>
    </div>

    <Separator />

    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="smtp-server">SMTP Server</Label>
        <Input
          id="smtp-server"
          value={config.smtpServer || ''}
          onChange={(e) => updateConfig('smtpServer', e.target.value)}
          placeholder="smtp.gmail.com"
        />
      </div>
      <div>
        <Label htmlFor="smtp-port">SMTP Port</Label>
        <Input
          id="smtp-port"
          value={config.smtpPort || ''}
          onChange={(e) => updateConfig('smtpPort', e.target.value)}
          placeholder="587"
        />
      </div>
    </div>
  </div>
);

// Slack Configuration Form
const SlackConfigForm: React.FC<{ config: any; updateConfig: (key: string, value: any) => void }> = ({ config, updateConfig }) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="webhook-url">Slack Webhook URL</Label>
      <Input
        id="webhook-url"
        value={config.webhookUrl || ''}
        onChange={(e) => updateConfig('webhookUrl', e.target.value)}
        placeholder="https://hooks.slack.com/services/..."
      />
    </div>
    
    <div className="grid grid-cols-3 gap-4">
      <div>
        <Label htmlFor="channel">Channel</Label>
        <Input
          id="channel"
          value={config.channel || ''}
          onChange={(e) => updateConfig('channel', e.target.value)}
          placeholder="#general"
        />
      </div>
      <div>
        <Label htmlFor="username">Bot Username</Label>
        <Input
          id="username"
          value={config.username || ''}
          onChange={(e) => updateConfig('username', e.target.value)}
          placeholder="FormBot"
        />
      </div>
      <div>
        <Label htmlFor="emoji">Emoji</Label>
        <Input
          id="emoji"
          value={config.emoji || ''}
          onChange={(e) => updateConfig('emoji', e.target.value)}
          placeholder=":memo:"
        />
      </div>
    </div>

    <div>
      <Label htmlFor="template">Message Template</Label>
      <Textarea
        id="template"
        value={config.template || ''}
        onChange={(e) => updateConfig('template', e.target.value)}
        placeholder="Message template with {{placeholders}}"
        rows={4}
      />
    </div>
  </div>
);

// Webhook Configuration Form
const WebhookConfigForm: React.FC<{ config: any; updateConfig: (key: string, value: any) => void }> = ({ config, updateConfig }) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="webhook-url">Webhook URL</Label>
      <Input
        id="webhook-url"
        value={config.url || ''}
        onChange={(e) => updateConfig('url', e.target.value)}
        placeholder="https://your-api.com/webhook"
      />
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="method">HTTP Method</Label>
        <Select value={config.method || 'POST'} onValueChange={(value) => updateConfig('method', value)}>
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
        <Label htmlFor="auth-type">Authentication</Label>
        <Select value={config.authType || 'none'} onValueChange={(value) => updateConfig('authType', value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">None</SelectItem>
            <SelectItem value="bearer">Bearer Token</SelectItem>
            <SelectItem value="api-key">API Key</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>

    {config.authType === 'bearer' && (
      <div>
        <Label htmlFor="auth-token">Bearer Token</Label>
        <Input
          id="auth-token"
          type="password"
          value={config.authToken || ''}
          onChange={(e) => updateConfig('authToken', e.target.value)}
          placeholder="Your bearer token"
        />
      </div>
    )}

    <div>
      <Label htmlFor="payload">Payload Template</Label>
      <Textarea
        id="payload"
        value={config.payload || ''}
        onChange={(e) => updateConfig('payload', e.target.value)}
        placeholder="JSON payload template"
        rows={4}
      />
    </div>
  </div>
);

// Zapier Configuration Form
const ZapierConfigForm: React.FC<{ config: any; updateConfig: (key: string, value: any) => void }> = ({ config, updateConfig }) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="zapier-webhook">Zapier Webhook URL</Label>
      <Input
        id="zapier-webhook"
        value={config.webhookUrl || ''}
        onChange={(e) => updateConfig('webhookUrl', e.target.value)}
        placeholder="https://hooks.zapier.com/hooks/catch/..."
      />
      <p className="text-xs text-gray-500 mt-1">
        Create a Zap with a webhook trigger and paste the URL here
      </p>
    </div>
  </div>
);

// Google Sheets Configuration Form
const GoogleSheetsConfigForm: React.FC<{ config: any; updateConfig: (key: string, value: any) => void }> = ({ config, updateConfig }) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="spreadsheet-id">Spreadsheet ID</Label>
      <Input
        id="spreadsheet-id"
        value={config.spreadsheetId || ''}
        onChange={(e) => updateConfig('spreadsheetId', e.target.value)}
        placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
      />
      <p className="text-xs text-gray-500 mt-1">
        Found in the Google Sheets URL between /d/ and /edit
      </p>
    </div>
    
    <div>
      <Label htmlFor="worksheet-name">Worksheet Name</Label>
      <Input
        id="worksheet-name"
        value={config.worksheetName || ''}
        onChange={(e) => updateConfig('worksheetName', e.target.value)}
        placeholder="Form Submissions"
      />
    </div>
  </div>
);

export default IntegrationConfigModal;
