import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModernPagination from '@/components/ui/modern-pagination';
import ToolsFloatingActions from '@/components/tools/ToolsFloatingActions';
import { 
  Plus, Search, Filter, Grid, List, MoreVertical, 
  Eye, Edit, Trash2, Copy, Share2, BarChart3,
  Calendar, Users, Activity, TrendingUp, Star,
  FileText, Settings, Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

// Mock data for forms
const mockForms = Array.from({ length: 47 }, (_, i) => ({
  id: i + 1,
  name: `Form ${i + 1}`,
  description: `Description for form ${i + 1}`,
  status: Math.random() > 0.5 ? 'published' : 'draft',
  submissions: Math.floor(Math.random() * 100),
  created: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
  lastModified: new Date(Date.now() - Math.random() * 1000000000).toLocaleDateString(),
  type: ['Contact', 'Survey', 'Registration', 'Feedback'][Math.floor(Math.random() * 4)],
  rating: (Math.random() * 5).toFixed(1)
}));

const PlatformDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('lastModified');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  // Filter and sort forms
  const filteredForms = mockForms
    .filter(form => {
      const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           form.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || form.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'submissions':
          return b.submissions - a.submissions;
        case 'created':
          return new Date(b.created).getTime() - new Date(a.created).getTime();
        default:
          return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      }
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredForms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedForms = filteredForms.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterStatus, sortBy, itemsPerPage]);

  const handleFloatingAction = (action: string) => {
    switch (action) {
      case 'save':
        toast({ title: "Forms saved", description: "All changes have been saved successfully." });
        break;
      case 'preview':
        navigate('/form-preview/current');
        break;
      case 'share':
        toast({ title: "Share link copied", description: "Form share link copied to clipboard." });
        break;
      case 'theme-studio':
        navigate('/tools/theme-studio');
        break;
      case 'code-export':
        toast({ title: "Code exported", description: "Form code has been exported successfully." });
        break;
      case 'ai-enhance':
        toast({ title: "AI Enhancement", description: "AI is analyzing your forms for improvements." });
        break;
      case 'integrations':
        navigate('/platform/integrations');
        break;
      case 'analytics':
        navigate('/platform/analytics');
        break;
      default:
        toast({ title: action, description: `${action} feature activated.` });
    }
  };

  const handleFormAction = (action: string, formId: number) => {
    switch (action) {
      case 'edit':
        navigate(`/form-builder/${formId}`);
        break;
      case 'preview':
        navigate(`/form-preview/${formId}`);
        break;
      case 'duplicate':
        toast({ title: "Form duplicated", description: "Form has been duplicated successfully." });
        break;
      case 'delete':
        toast({ title: "Form deleted", description: "Form has been deleted successfully.", variant: "destructive" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Forms Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Create, manage, and analyze your forms</p>
          </div>
          <Button 
            onClick={() => navigate('/form-wizard')}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Form
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Forms</p>
                  <p className="text-2xl font-bold">{mockForms.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                  <p className="text-2xl font-bold">{mockForms.reduce((acc, form) => acc + form.submissions, 0)}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published Forms</p>
                  <p className="text-2xl font-bold">{mockForms.filter(f => f.status === 'published').length}</p>
                </div>
                <Activity className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Rating</p>
                  <p className="text-2xl font-bold">4.2</p>
                </div>
                <Star className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border"
        >
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-white border shadow-lg">
                <SelectItem value="lastModified">Last Modified</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="submissions">Submissions</SelectItem>
                <SelectItem value="created">Created Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Forms Grid/List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              <motion.div 
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {paginatedForms.map((form, index) => (
                  <motion.div
                    key={form.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-200 group">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <CardTitle className="text-lg truncate">{form.name}</CardTitle>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{form.description}</p>
                          </div>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" onClick={() => handleFormAction('edit', form.id)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleFormAction('preview', form.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Badge variant={form.status === 'published' ? 'default' : 'secondary'}>
                              {form.status}
                            </Badge>
                            <span className="text-sm text-gray-600">{form.submissions} submissions</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            Modified: {form.lastModified}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white rounded-lg shadow-sm border overflow-hidden"
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left p-4 font-medium text-gray-700">Name</th>
                        <th className="text-left p-4 font-medium text-gray-700">Status</th>
                        <th className="text-left p-4 font-medium text-gray-700">Submissions</th>
                        <th className="text-left p-4 font-medium text-gray-700">Modified</th>
                        <th className="text-left p-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedForms.map((form, index) => (
                        <motion.tr
                          key={form.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 }}
                          className="border-b hover:bg-gray-50 transition-colors"
                        >
                          <td className="p-4">
                            <div>
                              <div className="font-medium">{form.name}</div>
                              <div className="text-sm text-gray-600">{form.description}</div>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant={form.status === 'published' ? 'default' : 'secondary'}>
                              {form.status}
                            </Badge>
                          </td>
                          <td className="p-4">{form.submissions}</td>
                          <td className="p-4 text-sm text-gray-600">{form.lastModified}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm" onClick={() => handleFormAction('edit', form.id)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleFormAction('preview', form.id)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleFormAction('duplicate', form.id)}>
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <ModernPagination
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            totalItems={filteredForms.length}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </motion.div>
      </div>

      {/* Floating Actions */}
      <ToolsFloatingActions onAction={handleFloatingAction} />
    </div>
  );
};

export default PlatformDashboard;
