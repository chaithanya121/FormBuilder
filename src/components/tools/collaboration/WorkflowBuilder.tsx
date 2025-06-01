
import React, { useState, useCallback } from 'react';
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
  GitBranch, ArrowLeft, Plus, Play, Pause, Settings, 
  Trash2, Copy, Save, Eye, Zap, Clock, Users, Mail,
  Database, Code, Filter, Webhook, AlertTriangle, Check,
  ArrowRight, ArrowDown, MoreVertical, Edit, Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'delay';
  title: string;
  description: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft';
  nodes: WorkflowNode[];
  createdAt: string;
  lastRun?: string;
  runs: number;
}

export const WorkflowBuilder = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('workflows');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Form Submission Alert',
      description: 'Send email notification when a form is submitted',
      status: 'active',
      nodes: [],
      createdAt: '2024-01-15',
      lastRun: '2 hours ago',
      runs: 156
    },
    {
      id: '2',
      name: 'Lead Qualification',
      description: 'Automatically qualify leads based on form responses',
      status: 'active',
      nodes: [],
      createdAt: '2024-01-10',
      lastRun: '5 minutes ago',
      runs: 89
    },
    {
      id: '3',
      name: 'Weekly Report',
      description: 'Generate and send weekly form analytics report',
      status: 'inactive',
      nodes: [],
      createdAt: '2024-01-05',
      runs: 12
    }
  ]);

  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    trigger: 'form_submission'
  });

  const nodeTypes = [
    {
      type: 'trigger',
      title: 'Form Submitted',
      icon: Zap,
      color: 'bg-green-500',
      description: 'Triggers when a form is submitted'
    },
    {
      type: 'action',
      title: 'Send Email',
      icon: Mail,
      color: 'bg-blue-500',
      description: 'Send email notification'
    },
    {
      type: 'action',
      title: 'Save to Database',
      icon: Database,
      color: 'bg-purple-500',
      description: 'Store data in database'
    },
    {
      type: 'condition',
      title: 'If/Then',
      icon: Filter,
      color: 'bg-orange-500',
      description: 'Conditional logic branch'
    },
    {
      type: 'action',
      title: 'Webhook',
      icon: Webhook,
      color: 'bg-red-500',
      description: 'Send data to external service'
    },
    {
      type: 'delay',
      title: 'Wait',
      icon: Clock,
      color: 'bg-gray-500',
      description: 'Add delay before next action'
    }
  ];

  const handleCreateWorkflow = () => {
    if (!newWorkflow.name) {
      toast({
        title: "Name Required",
        description: "Please enter a workflow name.",
        variant: "destructive"
      });
      return;
    }

    const workflow: Workflow = {
      id: Date.now().toString(),
      name: newWorkflow.name,
      description: newWorkflow.description,
      status: 'draft',
      nodes: [],
      createdAt: new Date().toISOString().split('T')[0],
      runs: 0
    };

    setWorkflows([...workflows, workflow]);
    setSelectedWorkflow(workflow);
    setActiveTab('builder');
    setNewWorkflow({ name: '', description: '', trigger: 'form_submission' });

    toast({
      title: "Workflow Created!",
      description: `"${workflow.name}" has been created successfully.`,
    });
  };

  const handleDeleteWorkflow = (id: string) => {
    setWorkflows(workflows.filter(w => w.id !== id));
    if (selectedWorkflow?.id === id) {
      setSelectedWorkflow(null);
    }
    toast({
      title: "Workflow Deleted",
      description: "Workflow has been removed.",
    });
  };

  const handleToggleStatus = (id: string) => {
    setWorkflows(workflows.map(w => 
      w.id === id 
        ? { ...w, status: w.status === 'active' ? 'inactive' : 'active' }
        : w
    ));
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
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
              <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-lg">
                <GitBranch className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className={`text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent`}>
                  Workflow Builder
                </h1>
                <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-1`}>
                  Create and manage automated workflows
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              Advanced Automation
            </Badge>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Workflow
            </Button>
          </div>
        </motion.div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Workflows', value: workflows.filter(w => w.status === 'active').length, icon: Play, color: 'green' },
            { label: 'Total Runs', value: workflows.reduce((sum, w) => sum + w.runs, 0), icon: Zap, color: 'blue' },
            { label: 'Draft Workflows', value: workflows.filter(w => w.status === 'draft').length, icon: Edit, color: 'yellow' },
            { label: 'Success Rate', value: '94.2%', icon: Check, color: 'emerald' }
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
            <TabsTrigger value="workflows" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <GitBranch className="w-4 h-4 mr-2" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="builder" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Copy className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="workflows" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Your Workflows</h2>
              <Button 
                onClick={() => setActiveTab('builder')} 
                className="bg-gradient-to-r from-green-500 to-emerald-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workflows.map((workflow, index) => (
                <motion.div
                  key={workflow.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg ${
                            workflow.status === 'active' ? 'bg-green-100' : 
                            workflow.status === 'inactive' ? 'bg-gray-100' : 'bg-yellow-100'
                          }`}>
                            <GitBranch className={`h-4 w-4 ${
                              workflow.status === 'active' ? 'text-green-600' : 
                              workflow.status === 'inactive' ? 'text-gray-600' : 'text-yellow-600'
                            }`} />
                          </div>
                          <span className="truncate">{workflow.name}</span>
                        </CardTitle>
                        <div className="flex items-center gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleStatus(workflow.id);
                            }}
                          >
                            {workflow.status === 'active' ? 
                              <Pause className="h-4 w-4 text-orange-500" /> : 
                              <Play className="h-4 w-4 text-green-500" />
                            }
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteWorkflow(workflow.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>
                      
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant={workflow.status === 'active' ? 'default' : 'secondary'}>
                          {workflow.status}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {workflow.runs} runs
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Created {workflow.createdAt}</span>
                        {workflow.lastRun && <span>Last run {workflow.lastRun}</span>}
                      </div>

                      <Button 
                        className="w-full mt-4" 
                        variant="outline"
                        onClick={() => {
                          setSelectedWorkflow(workflow);
                          setActiveTab('builder');
                        }}
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Workflow
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="builder" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Node Palette */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Components</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {nodeTypes.map((node) => (
                    <motion.div
                      key={node.type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-3 border-2 border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${node.color} text-white`}>
                          <node.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{node.title}</p>
                          <p className="text-xs text-gray-500">{node.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Workflow Canvas */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {selectedWorkflow ? `Edit: ${selectedWorkflow.name}` : 'Create New Workflow'}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                      <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500">
                        <Save className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {!selectedWorkflow ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Workflow Name</Label>
                        <Input
                          id="name"
                          value={newWorkflow.name}
                          onChange={(e) => setNewWorkflow({...newWorkflow, name: e.target.value})}
                          placeholder="Enter workflow name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={newWorkflow.description}
                          onChange={(e) => setNewWorkflow({...newWorkflow, description: e.target.value})}
                          placeholder="Describe what this workflow does"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="trigger">Trigger Event</Label>
                        <Select value={newWorkflow.trigger} onValueChange={(value) => setNewWorkflow({...newWorkflow, trigger: value})}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="form_submission">Form Submission</SelectItem>
                            <SelectItem value="user_registration">User Registration</SelectItem>
                            <SelectItem value="payment_complete">Payment Complete</SelectItem>
                            <SelectItem value="schedule">Scheduled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleCreateWorkflow} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Workflow
                      </Button>
                    </div>
                  ) : (
                    <div className="h-96 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <GitBranch className="h-12 w-12 mx-auto mb-4" />
                        <p className="text-lg font-medium">Workflow Canvas</p>
                        <p className="text-sm">Drag components from the left panel to build your workflow</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Copy className="h-5 w-5 text-amber-500" />
                  Workflow Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Email Notification', description: 'Send email when form is submitted', category: 'Notifications' },
                    { name: 'Lead Scoring', description: 'Automatically score leads based on responses', category: 'Sales' },
                    { name: 'Data Export', description: 'Export form data to external systems', category: 'Integration' },
                    { name: 'Follow-up Sequence', description: 'Automated email follow-up series', category: 'Marketing' },
                    { name: 'Approval Process', description: 'Route submissions for approval', category: 'Process' },
                    { name: 'Slack Notification', description: 'Send notifications to Slack channels', category: 'Notifications' }
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
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-amber-500" />
                  Workflow Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Success Rate</span>
                        <span className="font-medium text-green-600">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Execution Time</span>
                        <span className="font-medium">1.2s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Failed Executions</span>
                        <span className="font-medium text-red-600">12</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                    <div className="space-y-2">
                      {[
                        { workflow: 'Form Submission Alert', status: 'success', time: '2 min ago' },
                        { workflow: 'Lead Qualification', status: 'success', time: '5 min ago' },
                        { workflow: 'Form Submission Alert', status: 'failed', time: '10 min ago' },
                        { workflow: 'Lead Qualification', status: 'success', time: '15 min ago' }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm">{activity.workflow}</span>
                          </div>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
