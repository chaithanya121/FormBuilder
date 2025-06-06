
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Zap, Mail, Database, Webhook, Cloud, Shield, 
  Settings, Check, Plus, ExternalLink, Copy,
  Slack, Github, Calendar, BarChart3, FileText,
  MessageSquare, CreditCard, Users, Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const IntegrationsPage: React.FC = () => {
  const [webhookUrl, setWebhookUrl] = useState('');
  const [emailConfig, setEmailConfig] = useState({
    enabled: false,
    smtpServer: '',
    port: '587',
    username: '',
    password: '',
    fromEmail: ''
  });
  const { toast } = useToast();

  const integrations = [
    {
      name: 'Zapier',
      description: 'Connect to 5000+ apps',
      icon: Zap,
      status: 'available',
      category: 'automation',
      color: 'bg-orange-500'
    },
    {
      name: 'Slack',
      description: 'Send notifications to Slack',
      icon: Slack,
      status: 'available',
      category: 'communication',
      color: 'bg-purple-500'
    },
    {
      name: 'Gmail',
      description: 'Email notifications',
      icon: Mail,
      status: 'configured',
      category: 'email',
      color: 'bg-red-500'
    },
    {
      name: 'Google Sheets',
      description: 'Save responses to spreadsheet',
      icon: FileText,
      status: 'available',
      category: 'storage',
      color: 'bg-green-500'
    },
    {
      name: 'Airtable',
      description: 'Store data in Airtable',
      icon: Database,
      status: 'available',
      category: 'storage',
      color: 'bg-blue-500'
    },
    {
      name: 'Stripe',
      description: 'Accept payments',
      icon: CreditCard,
      status: 'premium',
      category: 'payment',
      color: 'bg-indigo-500'
    },
    {
      name: 'Mailchimp',
      description: 'Add contacts to lists',
      icon: Users,
      status: 'available',
      category: 'email',
      color: 'bg-yellow-500'
    },
    {
      name: 'Discord',
      description: 'Send to Discord channels',
      icon: MessageSquare,
      status: 'available',
      category: 'communication',
      color: 'bg-blue-600'
    }
  ];

  const handleWebhookTest = async () => {
    if (!webhookUrl) {
      toast({
        title: "Error",
        description: "Please enter a webhook URL",
        variant: "destructive"
      });
      return;
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ test: true, timestamp: new Date().toISOString() })
      });
      
      toast({
        title: "Success",
        description: "Webhook test sent successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send webhook test",
        variant: "destructive"
      });
    }
  };

  const handleEmailSave = () => {
    toast({
      title: "Success",
      description: "Email configuration saved"
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'configured':
        return <Badge className="bg-green-100 text-green-700">Configured</Badge>;
      case 'premium':
        return <Badge className="bg-purple-100 text-purple-700">Premium</Badge>;
      default:
        return <Badge variant="outline">Available</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
            Integrations Hub
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect your forms with your favorite tools and services. Automate workflows and streamline your data processing.
          </p>
        </motion.div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse</TabsTrigger>
            <TabsTrigger value="configured">Configured</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="email">Email Setup</TabsTrigger>
          </TabsList>

          {/* Browse Integrations */}
          <TabsContent value="browse" className="space-y-6">
            <div className="flex gap-4 mb-6">
              {['all', 'automation', 'email', 'storage', 'communication', 'payment'].map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  size="sm"
                  className="capitalize"
                >
                  {category === 'all' ? 'All' : category}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-200 group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${integration.color} text-white`}>
                            <integration.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{integration.name}</CardTitle>
                            <CardDescription className="text-sm">
                              {integration.description}
                            </CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(integration.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1"
                          disabled={integration.status === 'premium'}
                        >
                          {integration.status === 'configured' ? (
                            <>
                              <Settings className="h-4 w-4 mr-2" />
                              Configure
                            </>
                          ) : integration.status === 'premium' ? (
                            'Upgrade Required'
                          ) : (
                            <>
                              <Plus className="h-4 w-4 mr-2" />
                              Connect
                            </>
                          )}
                        </Button>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Configured Integrations */}
          <TabsContent value="configured" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  Active Integrations
                </CardTitle>
                <CardDescription>
                  Manage your connected integrations and their settings.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {integrations.filter(i => i.status === 'configured').map((integration) => (
                    <div key={integration.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded ${integration.color} text-white`}>
                          <integration.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Webhooks */}
          <TabsContent value="webhooks" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Webhook className="h-5 w-5" />
                  Webhook Configuration
                </CardTitle>
                <CardDescription>
                  Send form submissions to custom endpoints in real-time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="webhook-url"
                      placeholder="https://your-domain.com/webhook"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                    />
                    <Button onClick={handleWebhookTest} variant="outline">
                      Test
                    </Button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Form submissions will be sent as POST requests to this URL.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Example Payload</h4>
                  <pre className="text-sm bg-gray-100 p-3 rounded overflow-x-auto">
{`{
  "formId": "form_123",
  "submissionId": "sub_456",
  "timestamp": "2024-01-01T12:00:00Z",
  "data": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}`}
                  </pre>
                  <Button variant="ghost" size="sm" className="mt-2">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy Example
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Email Setup */}
          <TabsContent value="email" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Configuration
                </CardTitle>
                <CardDescription>
                  Configure SMTP settings for sending email notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-enabled">Enable Email Notifications</Label>
                  <Switch
                    id="email-enabled"
                    checked={emailConfig.enabled}
                    onCheckedChange={(checked) => 
                      setEmailConfig(prev => ({ ...prev, enabled: checked }))
                    }
                  />
                </div>

                {emailConfig.enabled && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtp-server">SMTP Server</Label>
                        <Input
                          id="smtp-server"
                          placeholder="smtp.gmail.com"
                          value={emailConfig.smtpServer}
                          onChange={(e) => 
                            setEmailConfig(prev => ({ ...prev, smtpServer: e.target.value }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="port">Port</Label>
                        <Input
                          id="port"
                          placeholder="587"
                          value={emailConfig.port}
                          onChange={(e) => 
                            setEmailConfig(prev => ({ ...prev, port: e.target.value }))
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        placeholder="your-email@gmail.com"
                        value={emailConfig.username}
                        onChange={(e) => 
                          setEmailConfig(prev => ({ ...prev, username: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="App password or SMTP password"
                        value={emailConfig.password}
                        onChange={(e) => 
                          setEmailConfig(prev => ({ ...prev, password: e.target.value }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="from-email">From Email</Label>
                      <Input
                        id="from-email"
                        placeholder="noreply@your-domain.com"
                        value={emailConfig.fromEmail}
                        onChange={(e) => 
                          setEmailConfig(prev => ({ ...prev, fromEmail: e.target.value }))
                        }
                      />
                    </div>

                    <Button onClick={handleEmailSave} className="w-full">
                      Save Email Configuration
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IntegrationsPage;
