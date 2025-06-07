
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import {
  Mail, Database, Webhook, Cloud, CreditCard, MessageSquare,
  Slack, Calendar, FileText, BarChart3, Users, Shield,
  CheckCircle, AlertCircle, Settings, Key, Globe,
  Zap, Link, Play, Save, TestTube
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'Email' | 'Storage' | 'Analytics' | 'Payment' | 'Communication' | 'Productivity';
  status: 'connected' | 'disconnected' | 'error';
  config?: any;
}

interface IntegrationConfigProps {
  integration: Integration;
  onSave: (config: any) => void;
  onTest: (config: any) => void;
  onBack: () => void;
}

const IntegrationConfig: React.FC<IntegrationConfigProps> = ({
  integration,
  onSave,
  onTest,
  onBack
}) => {
  const { toast } = useToast();
  const [config, setConfig] = useState(integration.config || {});
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await onSave(config);
      toast({
        title: "Configuration Saved",
        description: `${integration.name} integration has been configured successfully.`,
      });
    } catch (error) {
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
    setIsLoading(true);
    setTestResult(null);
    try {
      await onTest(config);
      setTestResult('success');
      toast({
        title: "Test Successful",
        description: `Connection to ${integration.name} is working properly.`,
      });
    } catch (error) {
      setTestResult('error');
      toast({
        title: "Test Failed",
        description: "Connection test failed. Please check your configuration.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderEmailConfig = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="smtp-host">SMTP Host</Label>
          <Input
            id="smtp-host"
            value={config.smtpHost || ''}
            onChange={(e) => setConfig({ ...config, smtpHost: e.target.value })}
            placeholder="smtp.gmail.com"
          />
        </div>
        <div>
          <Label htmlFor="smtp-port">SMTP Port</Label>
          <Input
            id="smtp-port"
            type="number"
            value={config.smtpPort || ''}
            onChange={(e) => setConfig({ ...config, smtpPort: e.target.value })}
            placeholder="587"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="email-username">Email Address</Label>
        <Input
          id="email-username"
          type="email"
          value={config.username || ''}
          onChange={(e) => setConfig({ ...config, username: e.target.value })}
          placeholder="your-email@gmail.com"
        />
      </div>
      
      <div>
        <Label htmlFor="email-password">App Password</Label>
        <Input
          id="email-password"
          type="password"
          value={config.password || ''}
          onChange={(e) => setConfig({ ...config, password: e.target.value })}
          placeholder="Your app password"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={config.enableSSL || false}
          onCheckedChange={(checked) => setConfig({ ...config, enableSSL: checked })}
        />
        <Label>Enable SSL/TLS</Label>
      </div>
      
      <div>
        <Label htmlFor="from-name">From Name</Label>
        <Input
          id="from-name"
          value={config.fromName || ''}
          onChange={(e) => setConfig({ ...config, fromName: e.target.value })}
          placeholder="Your Company Name"
        />
      </div>
    </div>
  );

  const renderDatabaseConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="db-type">Database Type</Label>
        <Select
          value={config.type || ''}
          onValueChange={(value) => setConfig({ ...config, type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select database type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="postgresql">PostgreSQL</SelectItem>
            <SelectItem value="mysql">MySQL</SelectItem>
            <SelectItem value="mongodb">MongoDB</SelectItem>
            <SelectItem value="sqlite">SQLite</SelectItem>
            <SelectItem value="supabase">Supabase</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="connection-string">Connection String</Label>
        <Textarea
          id="connection-string"
          value={config.connectionString || ''}
          onChange={(e) => setConfig({ ...config, connectionString: e.target.value })}
          placeholder="postgresql://username:password@localhost:5432/database"
          className="font-mono text-sm"
        />
      </div>
      
      <div>
        <Label htmlFor="table-name">Table Name</Label>
        <Input
          id="table-name"
          value={config.tableName || ''}
          onChange={(e) => setConfig({ ...config, tableName: e.target.value })}
          placeholder="form_submissions"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={config.autoCreateTable || false}
          onCheckedChange={(checked) => setConfig({ ...config, autoCreateTable: checked })}
        />
        <Label>Auto-create table if not exists</Label>
      </div>
    </div>
  );

  const renderWebhookConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="webhook-url">Webhook URL</Label>
        <Input
          id="webhook-url"
          value={config.url || ''}
          onChange={(e) => setConfig({ ...config, url: e.target.value })}
          placeholder="https://your-api.com/webhook"
        />
      </div>
      
      <div>
        <Label htmlFor="http-method">HTTP Method</Label>
        <Select
          value={config.method || 'POST'}
          onValueChange={(value) => setConfig({ ...config, method: value })}
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
        <Label htmlFor="auth-header">Authorization Header</Label>
        <Input
          id="auth-header"
          value={config.authHeader || ''}
          onChange={(e) => setConfig({ ...config, authHeader: e.target.value })}
          placeholder="Bearer your-token"
        />
      </div>
      
      <div>
        <Label htmlFor="custom-headers">Custom Headers (JSON)</Label>
        <Textarea
          id="custom-headers"
          value={config.customHeaders || ''}
          onChange={(e) => setConfig({ ...config, customHeaders: e.target.value })}
          placeholder='{"Content-Type": "application/json"}'
          className="font-mono text-sm"
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={config.retryOnFailure || false}
          onCheckedChange={(checked) => setConfig({ ...config, retryOnFailure: checked })}
        />
        <Label>Retry on failure</Label>
      </div>
    </div>
  );

  const renderCloudStorageConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="provider">Storage Provider</Label>
        <Select
          value={config.provider || ''}
          onValueChange={(value) => setConfig({ ...config, provider: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="aws-s3">Amazon S3</SelectItem>
            <SelectItem value="google-cloud">Google Cloud Storage</SelectItem>
            <SelectItem value="azure-blob">Azure Blob Storage</SelectItem>
            <SelectItem value="dropbox">Dropbox</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {config.provider === 'aws-s3' && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="access-key">Access Key ID</Label>
              <Input
                id="access-key"
                value={config.accessKey || ''}
                onChange={(e) => setConfig({ ...config, accessKey: e.target.value })}
                placeholder="AKIA..."
              />
            </div>
            <div>
              <Label htmlFor="secret-key">Secret Access Key</Label>
              <Input
                id="secret-key"
                type="password"
                value={config.secretKey || ''}
                onChange={(e) => setConfig({ ...config, secretKey: e.target.value })}
                placeholder="Your secret key"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bucket-name">Bucket Name</Label>
              <Input
                id="bucket-name"
                value={config.bucketName || ''}
                onChange={(e) => setConfig({ ...config, bucketName: e.target.value })}
                placeholder="my-bucket"
              />
            </div>
            <div>
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                value={config.region || ''}
                onChange={(e) => setConfig({ ...config, region: e.target.value })}
                placeholder="us-east-1"
              />
            </div>
          </div>
        </>
      )}
      
      <div className="flex items-center space-x-2">
        <Switch
          checked={config.publicAccess || false}
          onCheckedChange={(checked) => setConfig({ ...config, publicAccess: checked })}
        />
        <Label>Make uploaded files publicly accessible</Label>
      </div>
    </div>
  );

  const renderPaymentConfig = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="payment-provider">Payment Provider</Label>
        <Select
          value={config.provider || ''}
          onValueChange={(value) => setConfig({ ...config, provider: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select provider" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="stripe">Stripe</SelectItem>
            <SelectItem value="paypal">PayPal</SelectItem>
            <SelectItem value="square">Square</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {config.provider === 'stripe' && (
        <>
          <div>
            <Label htmlFor="publishable-key">Publishable Key</Label>
            <Input
              id="publishable-key"
              value={config.publishableKey || ''}
              onChange={(e) => setConfig({ ...config, publishableKey: e.target.value })}
              placeholder="pk_test_..."
            />
          </div>
          <div>
            <Label htmlFor="secret-key">Secret Key</Label>
            <Input
              id="secret-key"
              type="password"
              value={config.secretKey || ''}
              onChange={(e) => setConfig({ ...config, secretKey: e.target.value })}
              placeholder="sk_test_..."
            />
          </div>
          <div>
            <Label htmlFor="webhook-secret">Webhook Secret</Label>
            <Input
              id="webhook-secret"
              type="password"
              value={config.webhookSecret || ''}
              onChange={(e) => setConfig({ ...config, webhookSecret: e.target.value })}
              placeholder="whsec_..."
            />
          </div>
        </>
      )}
      
      <div>
        <Label htmlFor="currency">Default Currency</Label>
        <Select
          value={config.currency || 'USD'}
          onValueChange={(value) => setConfig({ ...config, currency: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
            <SelectItem value="JPY">JPY</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderConfig = () => {
    switch (integration.id) {
      case 'email-smtp':
      case 'sendgrid':
      case 'mailgun':
        return renderEmailConfig();
      case 'database':
      case 'supabase':
        return renderDatabaseConfig();
      case 'webhook':
      case 'zapier':
        return renderWebhookConfig();
      case 'aws-s3':
      case 'google-drive':
      case 'dropbox':
        return renderCloudStorageConfig();
      case 'stripe':
      case 'paypal':
        return renderPaymentConfig();
      default:
        return (
          <div className="text-center py-8">
            <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Configuration options coming soon...</p>
          </div>
        );
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={onBack}>
              ← Back
            </Button>
            <div className="p-2 bg-blue-100 rounded-lg">
              <integration.icon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {integration.name}
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
              </CardTitle>
              <p className="text-sm text-gray-600">{integration.description}</p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-6">
        <Tabs defaultValue="config" className="h-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="test">Test Connection</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>

          <TabsContent value="config" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {renderConfig()}
              
              <Separator />
              
              <div className="flex gap-3">
                <Button 
                  onClick={handleSave} 
                  disabled={isLoading}
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Configuration
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleTest}
                  disabled={isLoading}
                >
                  <TestTube className="h-4 w-4 mr-2" />
                  Test
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="test" className="mt-6">
            <div className="space-y-6">
              <div className="text-center">
                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                  <TestTube className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Test your integration configuration to ensure it's working correctly.
                  </p>
                </div>
                
                <Button 
                  onClick={handleTest}
                  disabled={isLoading}
                  size="lg"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Run Test
                </Button>
              </div>
              
              {testResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-lg ${
                    testResult === 'success' 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {testResult === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className={`font-medium ${
                      testResult === 'success' ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {testResult === 'success' ? 'Test Successful' : 'Test Failed'}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="docs" className="mt-6">
            <div className="prose max-w-none">
              <h3>Integration Documentation</h3>
              <p>Learn how to set up and configure your {integration.name} integration.</p>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-start gap-2">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Getting Started</h4>
                    <p className="text-sm text-blue-700">
                      Visit our documentation for detailed setup instructions and examples.
                    </p>
                    <Button variant="link" size="sm" className="p-0 h-auto text-blue-600">
                      View Documentation →
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default IntegrationConfig;
