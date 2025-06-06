
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
  Link
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
    activeUsers: 0,
    completionRate: 0
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
        
        setStats({
          totalForms: storedForms.length,
          totalSubmissions: storedForms.reduce((acc, form) => acc + (form.submissions || 0), 0),
          activeUsers: Math.floor(Math.random() * 100), // This would come from a real API
          completionRate: 0 // This would come from a real API
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

  console.log(theme)

  return (
    <div className={`min-h-screen ${theme === 'light'
      ? 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
      : 'bg-gray-900'
      } text-${theme === 'light' ? 'gray-800' : 'white'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Form Builder Dashboard</h1>
          <p className="text-gray-400">Manage your forms and view statistics</p>
        </div>

        <div className="mb-10 bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700/50 shadow-lg">
          <h2 className="text-lg font-medium text-white mb-4">Form Builder Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => setIsCreateFormOpen(true)}
              className="bg-gradient-to-br from-gray-800 to-gray-850 hover:from-gray-750 hover:to-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 group"
            >
              <div className="p-3 bg-blue-500/10 rounded-full group-hover:bg-blue-500/20 transition-colors">
                <PlusCircle className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-white">New Form</span>
            </button>
            
            <button className="bg-gradient-to-br from-gray-800 to-gray-850 hover:from-gray-750 hover:to-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 group">
              <div className="p-3 bg-purple-500/10 rounded-full group-hover:bg-purple-500/20 transition-colors">
                <Layout className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-white">Templates</span>
            </button>
            
            <button className="bg-gradient-to-br from-gray-800 to-gray-850 hover:from-gray-750 hover:to-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 group">
              <div className="p-3 bg-green-500/10 rounded-full group-hover:bg-green-500/20 transition-colors">
                <Sliders className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-sm font-medium text-white">Form Settings</span>
            </button>
            
            <button className="bg-gradient-to-br from-gray-800 to-gray-850 hover:from-gray-750 hover:to-gray-800 border border-gray-700 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 group">
              <div className="p-3 bg-orange-500/10 rounded-full group-hover:bg-orange-500/20 transition-colors">
                <Palette className="h-6 w-6 text-orange-400" />
              </div>
              <span className="text-sm font-medium text-white">Themes</span>
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10"
        >
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-850 border-gray-700 shadow-lg backdrop-blur-sm rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-blue-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-md">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Total Forms</p>
                  <h3 className="text-2xl font-bold text-white">{stats.totalForms}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-850 border-gray-700 shadow-lg backdrop-blur-sm rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-green-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-md">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Submissions</p>
                  <h3 className="text-2xl font-bold text-white">{stats.totalSubmissions}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-850 border-gray-700 shadow-lg backdrop-blur-sm rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-purple-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-md">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Active Users</p>
                  <h3 className="text-2xl font-bold text-white">{stats.activeUsers}</h3>
                </div>
              </div>
            </Card>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-850 border-gray-700 shadow-lg backdrop-blur-sm rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 bg-orange-500 opacity-5 rounded-xl"></div>
              <div className="flex items-center gap-4 relative z-10">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg shadow-md">
                  <BarChart2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-medium">Completion Rate</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-white">{stats.completionRate}%</h3>
                    <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"
                        style={{ width: `${stats.completionRate}%` }}
                      ></div>
                    </div>
                  </div>
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
            className="text-center py-16 px-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg"
          >
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gray-800 rounded-full flex items-center justify-center">
                <FileText className="h-8 w-8 text-gray-500" />
              </div>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No forms found</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              {searchTerm ? "Try adjusting your search terms or clear filters to see all forms" : "Get started by creating your first form and begin collecting submissions"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsCreateFormOpen(true)}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 mx-auto"
            >
              <PlusCircle className="h-4 w-4" />
              Create Form
            </motion.button>
          </motion.div>
        )}
      </div>
    
    </div>
  );
};

export default Dashboard;
