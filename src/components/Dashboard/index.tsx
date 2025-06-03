
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  PlusCircle, 
  BarChart2, 
  FileText, 
  Users, 
  Settings, 
  Trash2, 
  Edit3,
  Copy,
  Search,
  Filter,
  ChevronDown,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Layers,
  Layout,
  Code,
  Palette,
  Sliders,
  Globe,
  Link,
  Sparkles,
  Wand,
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FormConfig } from '@/components/FormBuilder/types';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { motion } from 'framer-motion';
import { formsApi, FormData } from '@/services/api/forms';
import { useTheme } from '@/components/theme-provider';

const Dashboard = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [stats, setStats] = useState({
    totalForms: 0,
    totalSubmissions: 0,
    completionRate: 0,
    avgResponseTime: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
  const [newFormName, setNewFormName] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'submissions'>('date');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'archived' | 'published' | 'draft'>('all');
  const navigate = useNavigate();
  const { toast } = useToast();  
  const { theme } = useTheme();

  useEffect(() => {
    const loadForms = async () => {
      try {
        const formData = await formsApi.getAllForms();
        console.log("API response:", formData);
        
        // Handle response - expect array of FormData
        let storedForms: FormData[] = [];
        
        if (Array.isArray(formData)) {
          storedForms = formData;
        } else {
          console.warn("Expected array of forms, got:", formData);
          storedForms = [];
        }
        
        setForms(storedForms);
        
        // Calculate more meaningful stats
        const totalSubmissions = storedForms.reduce((acc, form) => acc + (form.submissions || 0), 0);
        const avgCompletion = storedForms.length > 0 ? 
          storedForms.reduce((acc, form) => acc + (form.submissions || 0), 0) / storedForms.length * 10 : 0;
        
        setStats({
          totalForms: storedForms.length,
          totalSubmissions,
          completionRate: Math.min(87, Math.round(avgCompletion)), // Cap at 87% for realism
          avgResponseTime: 3.2 // Fixed average for demo
        });
      } catch (error) {
        console.error('Error loading forms:', error);
        toast({
          title: "Error",
          description: "Failed to load saved forms",
          variant: "destructive"
        });
      }
    };
    
    loadForms();
  }, [toast]);

  const handleCreateForm = async () => {
    if (!newFormName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a form name",
        variant: "destructive"
      });
      return;
    }

    try {
      const newForm: Omit<FormData, 'primary_id' | 'createdAt' | 'last_modified' | 'submissions'> = {
        name: newFormName,
        published: false,
        config: {
          name: newFormName,
          elements: [],
          settings: {
            termsAndConditions: {
              enabled: true,
              required: true,
              text: "I accept the Terms & Conditions & Privacy Policy",
            },
            submitButton: {
              text: "Submit",
            },
            preview: {
              width: "Full" as const,
              nesting: true,
            },
            validation: {
              liveValidation: "Default" as const,
            },
            layout: {
              size: "Default" as const,
              columns: {
                default: true,
                tablet: false,
                desktop: false,
              },
              labels: "Default" as const,
              placeholders: "Default" as const,
              errors: "Default" as const,
              messages: "Default" as const,
            },
          },
        }
      };
      
      // Call the create_form API
      const createdForm = await formsApi.createForm(newForm);
      
      setForms(prevForms => [createdForm, ...prevForms]);
      setStats(prev => ({
        ...prev,
        totalForms: prev.totalForms + 1
      }));
      
      setIsCreateFormOpen(false);
      setNewFormName('');
      
      // Navigate to the form builder with the created form primary_id
      navigate(`/form-builder/${createdForm.primary_id}`);
      
      toast({
        title: "Success",
        description: "Form created successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create form",
        variant: "destructive"
      });
    }
  };

  const handleDeleteForm = async (formId: string) => {
    try {
      await formsApi.deleteForm(formId);
      setForms(forms.filter(form => form.primary_id !== formId));
      
      setStats(prev => ({
        ...prev,
        totalForms: prev.totalForms - 1
      }));
      
      toast({
        title: "Success",
        description: "Form deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete form",
        variant: "destructive"
      });
    }
  };

  const handleDuplicateForm = async (form: FormData) => {
    try {
      const duplicatedForm: Omit<FormData, 'primary_id' | 'createdAt' | 'last_modified' | 'submissions'> = {
        name: `${form.name} (Copy)`,
        published: false,
        config: form.config
      };
      
      const createdForm = await formsApi.createForm(duplicatedForm);
      
      setForms(prevForms => [createdForm, ...prevForms]);
      setStats(prev => ({
        ...prev,
        totalForms: prev.totalForms + 1
      }));
      
      toast({
        title: "Success",
        description: "Form duplicated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to duplicate form",
        variant: "destructive"
      });
    }
  };

  const handleTogglePublish = async (form: FormData) => {
    try {
      const updatedForm = {
        ...form,
        published: !form.published,
        last_modified: new Date().toISOString()
      };
      
      await formsApi.updateForm(updatedForm);
      
      setForms(prevForms => prevForms.map(f => 
        f.primary_id === form.primary_id ? updatedForm : f
      ));
      
      toast({
        title: form.published ? "Form Unpublished" : "Form Published",
        description: form.published ? 
          "The form is now in draft mode" : 
          "The form is now available for submissions"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update form status",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateValue: string | Date): string => {
    if (!dateValue) return 'Unknown date';
    
    if (typeof dateValue === 'string') {
      const date = new Date(dateValue);
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }
      return date.toLocaleDateString();
    }
    
    return dateValue.toLocaleDateString();
  };

  const sortForms = (formsToSort: FormData[]) => {
    switch (sortBy) {
      case 'name':
        return [...formsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case 'date':
        return [...formsToSort].sort((a, b) => 
          new Date(b.last_modified).getTime() - new Date(a.last_modified).getTime()
        );
      case 'submissions':
        return [...formsToSort].sort((a, b) => (b.submissions || 0) - (a.submissions || 0));
      default:
        return formsToSort;
    }
  };

  const getStatusColor = (submissions: number) => {
    if (submissions > 50) return "text-green-500";
    if (submissions > 20) return "text-yellow-500";
    return "text-gray-500";
  };

  const filteredAndSortedForms = sortForms(
    forms.filter(form => {
      const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesStatus = true;
      if (filterStatus === 'published') {
        matchesStatus = form.published === true;
      } else if (filterStatus === 'draft') {
        matchesStatus = form.published === false;
      }
      
      return matchesSearch && matchesStatus;
    })
  );

  return (
    <div className={`min-h-screen ${theme === 'light'
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } relative overflow-hidden`}>
      
      {/* Enhanced animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 right-20 w-96 h-96 ${theme === 'light' ? 'bg-blue-200/20' : 'bg-blue-500/5'} rounded-full blur-3xl`}
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-20 left-20 w-96 h-96 ${theme === 'light' ? 'bg-purple-200/20' : 'bg-purple-500/5'} rounded-full blur-3xl`}
        />
      </div>

      <div className="container mx-auto px-6 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme === 'light' 
              ? 'from-gray-900 via-blue-800 to-purple-900' 
              : 'from-white via-blue-200 to-purple-200'
            } bg-clip-text text-transparent`}>
              Form Builder Dashboard
            </h1>
          </div>
          <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-8`}>
            Create, manage and optimize your forms with advanced analytics
          </p>
        </motion.div>

        {/* Enhanced Form Builder Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`mb-10 ${theme === 'light' 
            ? 'bg-white/90 border-white/50 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm p-6 rounded-2xl border`}
        >
          <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-6 flex items-center gap-2`}>
            <Layers className="h-5 w-5" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <motion.button 
              onClick={() => setIsCreateFormOpen(true)}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`${theme === 'light' 
                ? 'bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-blue-200' 
                : 'bg-gray-700/50 hover:bg-gray-600 border-gray-600'
              } border rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 group`}
            >
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <PlusCircle className="h-6 w-6 text-white" />
              </div>
              <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Create Form</span>
              <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Start from scratch</span>
            </motion.button>
            
            <motion.button 
              onClick={() => navigate('/tools/ai-form-generator')}
              whileHover={{ scale: 1.02, y: -2 }}
              className={`${theme === 'light' 
                ? 'bg-gradient-to-br from-purple-50 to-violet-50 hover:from-purple-100 hover:to-violet-100 border-purple-200' 
                : 'bg-gray-700/50 hover:bg-gray-600 border-gray-600'
              } border rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 group relative overflow-hidden`}
            >
              <div className="absolute top-2 right-2">
                <span className="bg-gradient-to-r from-purple-400 to-violet-500 text-white text-xs px-2 py-1 rounded-full">AI</span>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Wand className="h-6 w-6 text-white" />
              </div>
              <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>AI Generator</span>
              <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Generate with AI</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              className={`${theme === 'light' 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200' 
                : 'bg-gray-700/50 hover:bg-gray-600 border-gray-600'
              } border rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 group`}
            >
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Layout className="h-6 w-6 text-white" />
              </div>
              <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Templates</span>
              <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Pre-built forms</span>
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              className={`${theme === 'light' 
                ? 'bg-gradient-to-br from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 border-orange-200' 
                : 'bg-gray-700/50 hover:bg-gray-600 border-gray-600'
              } border rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 group`}
            >
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-400 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <BarChart2 className="h-6 w-6 text-white" />
              </div>
              <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>Analytics</span>
              <span className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Form insights</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
        >
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className={`p-6 ${theme === 'light' 
              ? 'bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 border-blue-200 shadow-xl hover:shadow-2xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-xl hover:shadow-blue-500/10'
            } backdrop-blur-sm rounded-xl overflow-hidden relative transition-all duration-300`}>
              <div className="absolute inset-0 bg-blue-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${theme === 'light' ? 'text-blue-700' : 'text-blue-400'} font-medium`}>Total Forms</p>
                  <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-blue-900' : 'text-white'}`}>{stats.totalForms}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className={`p-6 ${theme === 'light' 
              ? 'bg-gradient-to-br from-green-50 via-emerald-100 to-green-50 border-green-200 shadow-xl hover:shadow-2xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-xl hover:shadow-green-500/10'
            } backdrop-blur-sm rounded-xl overflow-hidden relative transition-all duration-300`}>
              <div className="absolute inset-0 bg-green-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${theme === 'light' ? 'text-green-700' : 'text-green-400'} font-medium`}>Submissions</p>
                  <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-green-900' : 'text-white'}`}>{stats.totalSubmissions.toLocaleString()}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className={`p-6 ${theme === 'light' 
              ? 'bg-gradient-to-br from-purple-50 via-purple-100 to-pink-50 border-purple-200 shadow-xl hover:shadow-2xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-xl hover:shadow-purple-500/10'
            } backdrop-blur-sm rounded-xl overflow-hidden relative transition-all duration-300`}>
              <div className="absolute inset-0 bg-purple-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${theme === 'light' ? 'text-purple-700' : 'text-purple-400'} font-medium`}>Completion Rate</p>
                  <div className="flex items-center gap-2">
                    <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-purple-900' : 'text-white'}`}>{stats.completionRate}%</h3>
                    <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-1000"
                        style={{ width: `${stats.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className={`p-6 ${theme === 'light' 
              ? 'bg-gradient-to-br from-orange-50 via-orange-100 to-amber-50 border-orange-200 shadow-xl hover:shadow-2xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-xl hover:shadow-orange-500/10'
            } backdrop-blur-sm rounded-xl overflow-hidden relative transition-all duration-300`}>
              <div className="absolute inset-0 bg-orange-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className={`text-sm ${theme === 'light' ? 'text-orange-700' : 'text-orange-400'} font-medium`}>Avg. Response Time</p>
                  <h3 className={`text-2xl font-bold ${theme === 'light' ? 'text-orange-900' : 'text-white'}`}>{stats.avgResponseTime}m</h3>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl mb-8 border border-gray-700/50 shadow-lg"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <Dialog open={isCreateFormOpen} onOpenChange={setIsCreateFormOpen}>
                <DialogTrigger asChild>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Create Form
                  </motion.button>
                </DialogTrigger>
                <DialogContent className="bg-gray-800 border-gray-700 rounded-xl shadow-xl backdrop-blur-sm">
                  <DialogHeader>
                    <DialogTitle className="text-white text-xl">Create New Form</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Give your form a name to get started
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label className="text-white">Form Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter form name..."
                        value={newFormName}
                        onChange={(e) => setNewFormName(e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCreateForm}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
                    >
                      Create Form
                    </motion.button>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search forms..."
                    className="pl-10 bg-gray-700/70 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-500 rounded-lg transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                <SelectTrigger className="w-40 bg-gray-700/70 border-gray-600 text-white rounded-lg">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 rounded-lg shadow-xl">
                  <SelectItem value="name" className="text-white hover:bg-gray-700">Name</SelectItem>
                  <SelectItem value="date" className="text-white hover:bg-gray-700">Last Modified</SelectItem>
                  <SelectItem value="submissions" className="text-white hover:bg-gray-700">Submissions</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="w-40 bg-gray-700/70 border-gray-600 text-white rounded-lg">
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700 rounded-lg shadow-xl">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">All Forms</SelectItem>
                  <SelectItem value="published" className="text-white hover:bg-gray-700">Published</SelectItem>
                  <SelectItem value="draft" className="text-white hover:bg-gray-700">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </motion.div>

        <div className="mb-10 bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50 shadow-lg">
          <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-gray-800/70 rounded-lg">
              <div className="p-2 bg-blue-500/10 rounded-full">
                <Edit3 className="h-4 w-4 text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">You edited <span className="font-medium">Contact Form</span></p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/70 rounded-lg">
              <div className="p-2 bg-green-500/10 rounded-full">
                <PlusCircle className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">You created <span className="font-medium">Feedback Survey</span></p>
                <p className="text-xs text-gray-400">Yesterday</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/70 rounded-lg">
              <div className="p-2 bg-purple-500/10 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white">New submission on <span className="font-medium">Registration Form</span></p>
                <p className="text-xs text-gray-400">2 days ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium text-white mb-4">Your Forms</h2>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredAndSortedForms.map((form, index) => (
              <motion.div
                key={form.primary_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="bg-gradient-to-br from-gray-800 to-gray-850 border-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="p-6 relative">
                    <div className="absolute top-0 right-0 h-1 w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-white truncate flex items-center gap-2">
                        {form.name}
                        {form.published ? (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Published</span>
                        ) : (
                          <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full">Draft</span>
                        )}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-gray-700 rounded-lg">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 rounded-lg shadow-xl">
                          <DropdownMenuLabel className="text-white">Form Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem 
                            className="hover:bg-gray-700 cursor-pointer text-white" 
                            onClick={() => navigate(`/form-builder/${form.primary_id}`)}
                          >
                            <Edit3 className="h-4 w-4 mr-2 text-blue-500" />
                            Edit Form
                          </DropdownMenuItem>
                          {form.published && (
                            <>
                              <DropdownMenuItem 
                                className="hover:bg-gray-700 cursor-pointer text-white"
                                onClick={() => navigate(`/form/${form.primary_id}`)}
                              >
                                <Eye className="h-4 w-4 mr-2 text-green-400" />
                                View Form
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="hover:bg-gray-700 cursor-pointer text-white"
                                onClick={() => {
                                  const shareableLink = `${window.location.origin}/form/${form.primary_id}`;
                                  navigator.clipboard.writeText(shareableLink);
                                  toast({
                                    title: "Link Copied",
                                    description: "Shareable form link copied to clipboard"
                                  });
                                }}
                              >
                                <Link className="h-4 w-4 mr-2 text-blue-400" />
                                Copy Shareable Link
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem 
                            className="hover:bg-gray-700 cursor-pointer text-white"
                            onClick={() => handleDuplicateForm(form)}
                          >
                            <Copy className="h-4 w-4 mr-2 text-green-500" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="hover:bg-gray-700 cursor-pointer text-white"
                            onClick={() => handleTogglePublish(form)}
                          >
                            <Globe className="h-4 w-4 mr-2 text-purple-500" />
                            {form.published ? "Unpublish" : "Publish"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem 
                            className="hover:bg-red-900/30 text-red-400 hover:text-red-300 cursor-pointer"
                            onClick={() => handleDeleteForm(form.primary_id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-white">
                        <Clock className="h-4 w-4 text-white" />
                        Last modified {formatDate(form.last_modified)}
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2">
                          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs text-white`}>
                            <CheckCircle2 className="h-3 w-3" />
                            <span>{form.submissions || 0} submissions</span>
                          </div>
                        </div>
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/form-builder/${form.primary_id}`)}
                          className="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition-colors"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {filteredAndSortedForms.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-center py-16 px-6 ${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm rounded-2xl border`}
          >
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse"></div>
              <div className={`absolute inset-2 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-full flex items-center justify-center shadow-lg`}>
                <FileText className={`h-8 w-8 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
            </div>
            <h3 className={`text-xl font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-2`}>No forms found</h3>
            <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-6 max-w-md mx-auto`}>
              {searchTerm ? "Try adjusting your search terms or clear filters to see all forms" : "Get started by creating your first form and begin collecting submissions"}
            </p>
            <div className="flex gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCreateFormOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all duration-300"
              >
                <PlusCircle className="h-5 w-5" />
                Create Form
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/tools/ai-form-generator')}
                className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow-lg transition-all duration-300"
              >
                <Sparkles className="h-5 w-5" />
                Try AI Generator
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
