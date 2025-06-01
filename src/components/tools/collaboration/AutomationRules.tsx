
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/components/theme-provider';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ArrowLeft, Plus, Play, Pause, Settings, 
  Trash2, Copy, Save, Eye, Filter, Clock, Users, Mail,
  Database, Code, AlertTriangle, Check, Edit, Calendar,
  Target, BarChart3, ArrowRight, MoreVertical, Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  trigger: {
    type: string;
    conditions: Array<{
      field: string;
      operator: string;
      value: string;
    }>;
  };
  actions: Array<{
    type: string;
    config: Record<string, any>;
  }>;
  status: 'active' | 'inactive' | 'draft';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  lastTriggered?: string;
  triggerCount: number;
}

export const AutomationRules = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('rules');
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'VIP Customer Alert',
      description: 'Notify team when high-value customers submit forms',
      trigger: {
        type: 'form_submission',
        conditions: [
          { field: 'company_size', operator: 'greater_than', value: '1000' }
        ]
      },
      actions: [
        { type: 'send_email', config: { recipients: ['sales@company.com'], template: 'vip-alert' } },
        { type: 'slack_notification', config: { channel: '#sales', message: 'VIP customer inquiry received!' } }
      ],
      status: 'active',
      priority: 'high',
      createdAt: '2024-01-15',
      lastTriggered: '2 hours ago',
      triggerCount: 45
    },
    {
      id: '2',
      name: 'Lead Score Update',
      description: 'Automatically update lead scores based on form responses',
      trigger: {
        type: 'form_submission',
        conditions: [
          { field: 'form_type', operator: 'equals', value: 'contact' }
        ]
      },
      actions: [
        { type: 'update_crm', config: { system: 'salesforce', action: 'update_lead_score' } }
      ],
      status: 'active',
      priority: 'medium',
      createdAt: '2024-01-10',
      lastTriggered: '15 minutes ago',
      triggerCount: 156
    },
    {
      id: '3',
      name: 'Data Validation Alert',
      description: 'Alert when suspicious or invalid data is submitted',
      trigger: {
        type: 'form_submission',
        conditions: [
          { field: 'email', operator: 'contains', value: 'spam' }
        ]
      },
      actions: [
        { type: 'flag_submission', config: { flag: 'suspicious' } },
        { type: 'send_email', config: { recipients: ['security@company.com'] } }
      ],
      status: 'active',
      priority: 'high',
      createdAt: '2024-01-08',
      triggerCount: 12
    }
  ]);

  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    trigger: 'form_submission',
    priority: 'medium'
  });

  const triggerTypes = [
    { value: 'form_submission', label: 'Form Submission', icon: Target },
    { value: 'user_registration', label: 'User Registration', icon: Users },
    { value: 'payment_complete', label: 'Payment Complete', icon: Check },
    { value: 'schedule', label: 'Scheduled', icon: Clock },
    { value: 'api_webhook', label: 'API Webhook', icon: Code }
  ];

  const actionTypes = [
    { value: 'send_email', label: 'Send Email', icon: Mail, color: 'bg-blue-500' },
    { value: 'slack_notification', label: 'Slack Notification', icon: Bell, color: 'bg-green-500' },
    { value: 'update_crm', label: 'Update CRM', icon: Database, color: 'bg-purple-500' },
    { value: 'webhook', label: 'Send Webhook', icon: Code, color: 'bg-orange-500' },
    { value: 'flag_submission', label: 'Flag Submission', icon: AlertTriangle, color: 'bg-red-500' }
  ];

  const operators = [
    { value: 'equals', label: 'Equals' },
    { value: 'not_equals', label: 'Not Equals' },
    { value: 'contains', label: 'Contains' },
    { value: 'not_contains', label: 'Does Not Contain' },
    { value: 'greater_than', label: 'Greater Than' },
    { value: 'less_than', label: 'Less Than' },
    { value: 'is_empty', label: 'Is Empty' },
    { value: 'is_not_empty', label: 'Is Not Empty' }
  ];

  const handleCreateRule = () => {
    if (!newRule.name) {
      toast({
        title: "Name Required",
        description: "Please enter a rule name.",
        variant: "destructive"
      });
      return;
    }

    const rule: AutomationRule = {
      id: Date.now().toString(),
      name: newRule.name,
      description: newRule.description,
      trigger: {
        type: newRule.trigger,
        conditions: []
      },
      actions: [],
      status: 'draft',
      priority: newRule.priority as 'low' | 'medium' | 'high',
      createdAt: new Date().toISOString().split('T')[0],
      triggerCount: 0
    };

    setRules([...rules, rule]);
    setSelectedRule(rule);
    setActiveTab('builder');
    setNewRule({ name: '', description: '', trigger: 'form_submission', priority: 'medium' });

    toast({
      title: "Rule Created!",
      description: `"${rule.name}" has been created successfully.`,
    });
  };

  const handleDeleteRule = (id: string) => {
    setRules(rules.filter(r => r.id !== id));
    if (selectedRule?.id === id) {
      setSelectedRule(null);
    }
    toast({
      title: "Rule Deleted",
      description: "Automation rule has been removed.",
    });
  };

  const handleToggleStatus = (id: string) => {
    setRules(rules.map(r => 
      r.id === id 
        ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' }
        : r
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100' 
      : 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'
    } p-6`}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Link to="/tools">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className={`text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent`}>
                  Automation Rules
                </h1>
                <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
                  Create intelligent automation rules for your forms
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2">
              <Target className="h-4 w-4 mr-2" />
              Smart Automation
            </Badge>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Rule
            </Button>
          </div>
        </motion.div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { label: 'Active Rules', value: rules.filter(r => r.status === 'active').length, icon: Play, color: 'green' },
            { label: 'Total Triggers', value: rules.reduce((sum, r) => sum + r.triggerCount, 0), icon: Target, color: 'blue' },
            { label: 'High Priority', value: rules.filter(r => r.priority === 'high').length, icon: AlertTriangle, color: 'red' },
            { label: 'Success Rate', value: '98.1%', icon: Check, color: 'emerald' },
            { label: 'Avg Response', value: '0.8s', icon: Clock, color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-white/50 shadow-xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl'
              } backdrop-blur-sm`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                      <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm shadow-lg h-12">
            <TabsTrigger value="rules" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Zap className="w-4 h-4 mr-2" />
              Rules
            </TabsTrigger>
            <TabsTrigger value="builder" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <Copy className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rules" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Automation Rules</h2>
              <Button 
                onClick={() => setActiveTab('builder')} 
                className="bg-gradient-to-r from-green-500 to-emerald-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
            </div>

            <div className="space-y-4">
              {rules.map((rule, index) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{rule.name}</h3>
                            <Badge className={getPriorityColor(rule.priority)}>
                              {rule.priority}
                            </Badge>
                            <Badge variant={rule.status === 'active' ? 'default' : 'secondary'}>
                              {rule.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{rule.description}</p>
                          
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <span>Triggered {rule.triggerCount} times</span>
                            <span>Created {rule.createdAt}</span>
                            {rule.lastTriggered && <span>Last triggered {rule.lastTriggered}</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedRule(rule);
                              setActiveTab('builder');
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleToggleStatus(rule.id)}
                          >
                            {rule.status === 'active' ? 
                              <Pause className="h-4 w-4 text-orange-500" /> : 
                              <Play className="h-4 w-4 text-green-500" />
                            }
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteRule(rule.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>

                      {/* Rule Flow Visualization */}
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 rounded-full text-sm">
                            <Target className="h-4 w-4 text-blue-600" />
                            <span className="text-blue-800">When {rule.trigger.type.replace('_', ' ')}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400" />
                          <div className="flex items-center gap-2">
                            {rule.actions.map((action, idx) => (
                              <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full text-sm">
                                <Check className="h-4 w-4 text-green-600" />
                                <span className="text-green-800">{action.type.replace('_', ' ')}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedRule ? `Edit Rule: ${selectedRule.name}` : 'Create New Automation Rule'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedRule ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Rule Name</Label>
                      <Input
                        id="name"
                        value={newRule.name}
                        onChange={(e) => setNewRule({...newRule, name: e.target.value})}
                        placeholder="Enter rule name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={newRule.description}
                        onChange={(e) => setNewRule({...newRule, description: e.target.value})}
                        placeholder="Describe what this rule does"
                        className="mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="trigger">Trigger Type</Label>
                        <Select value={newRule.trigger} onValueChange={(value) => setNewRule({...newRule, trigger: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {triggerTypes.map(type => (
                              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={newRule.priority} onValueChange={(value) => setNewRule({...newRule, priority: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button onClick={handleCreateRule} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Rule
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Trigger Configuration */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Trigger Configuration</h3>
                      <div className="space-y-4 p-4 border rounded-lg">
                        <div>
                          <Label>When this happens:</Label>
                          <Select value={selectedRule.trigger.type}>
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {triggerTypes.map(type => (
                                <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label>Conditions:</Label>
                          <div className="space-y-2 mt-2">
                            {selectedRule.trigger.conditions.map((condition, index) => (
                              <div key={index} className="grid grid-cols-4 gap-2">
                                <Input placeholder="Field name" value={condition.field} />
                                <Select value={condition.operator}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {operators.map(op => (
                                      <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <Input placeholder="Value" value={condition.value} />
                                <Button size="sm" variant="outline">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            <Button size="sm" variant="outline" className="w-full">
                              <Plus className="h-4 w-4 mr-2" />
                              Add Condition
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions Configuration */}
                    <div>
                      <h3 className="text-lg font-medium mb-4">Actions</h3>
                      <div className="space-y-4">
                        {selectedRule.actions.map((action, index) => (
                          <div key={index} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium">Action {index + 1}</h4>
                              <Button size="sm" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Action Type</Label>
                                <Select value={action.type}>
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {actionTypes.map(type => (
                                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div>
                                <Label>Configuration</Label>
                                <Textarea 
                                  placeholder="Action configuration (JSON)"
                                  className="mt-1"
                                  rows={3}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Button variant="outline" className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Action
                        </Button>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="flex-1">
                        <Save className="w-4 w-4 mr-2" />
                        Save Rule
                      </Button>
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Test Rule
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Copy className="h-5 w-5 text-purple-500" />
                  Automation Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'VIP Customer Alert', description: 'Alert team for high-value submissions', category: 'Sales' },
                    { name: 'Lead Scoring', description: 'Auto-score leads based on responses', category: 'Marketing' },
                    { name: 'Spam Detection', description: 'Flag suspicious submissions', category: 'Security' },
                    { name: 'Follow-up Reminder', description: 'Schedule follow-up actions', category: 'Customer Success' },
                    { name: 'Data Validation', description: 'Validate form data integrity', category: 'Quality' },
                    { name: 'Integration Sync', description: 'Sync data with external systems', category: 'Integration' }
                  ].map((template, index) => (
                    <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-medium mb-2">{template.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">{template.category}</Badge>
                          <Button size="sm" variant="outline">
                            <Plus className="w-3 h-3 mr-1" />
                            Use
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-white/50 shadow-xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl'
              } backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-purple-500" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Success Rate</span>
                      <span className="font-medium text-green-600">98.1%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Execution Time</span>
                      <span className="font-medium">0.8s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Failed Executions</span>
                      <span className="font-medium text-red-600">8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rules Triggered Today</span>
                      <span className="font-medium">245</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-white/50 shadow-xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl'
              } backdrop-blur-sm`}>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { rule: 'VIP Customer Alert', status: 'success', time: '2 min ago' },
                      { rule: 'Lead Score Update', status: 'success', time: '5 min ago' },
                      { rule: 'Data Validation Alert', status: 'failed', time: '10 min ago' },
                      { rule: 'VIP Customer Alert', status: 'success', time: '15 min ago' },
                      { rule: 'Lead Score Update', status: 'success', time: '20 min ago' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm font-medium">{activity.rule}</span>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
