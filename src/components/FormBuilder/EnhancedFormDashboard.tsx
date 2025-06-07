import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Filter, MoreVertical, Eye, Edit, 
  Trash2, Copy, Share, Settings, Calendar,
  Users, BarChart3, Clock, Star, ArrowUpDown,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  responses: number;
  created: string;
  lastModified: string;
  views: number;
  conversionRate: number;
  category: string;
  isStarred: boolean;
}

const EnhancedFormDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('lastModified');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  // Sample form data
  const formsData: FormData[] = [
    {
      id: '1',
      name: 'Customer Feedback Survey',
      description: 'Collect valuable feedback from our customers',
      status: 'published',
      responses: 143,
      created: '2024-01-15',
      lastModified: '2024-01-20',
      views: 450,
      conversionRate: 31.8,
      category: 'survey',
      isStarred: true
    },
    {
      id: '2',
      name: 'Event Registration Form',
      description: 'Register attendees for our upcoming conference',
      status: 'published',
      responses: 89,
      created: '2024-01-10',
      lastModified: '2024-01-18',
      views: 320,
      conversionRate: 27.8,
      category: 'registration',
      isStarred: false
    },
    {
      id: '3',
      name: 'Job Application Form',
      description: 'Streamlined application process for new hires',
      status: 'draft',
      responses: 0,
      created: '2024-01-22',
      lastModified: '2024-01-22',
      views: 0,
      conversionRate: 0,
      category: 'application',
      isStarred: false
    },
    {
      id: '4',
      name: 'Contact Us Form',
      description: 'Simple contact form for general inquiries',
      status: 'published',
      responses: 67,
      created: '2024-01-05',
      lastModified: '2024-01-16',
      views: 280,
      conversionRate: 23.9,
      category: 'contact',
      isStarred: true
    },
    {
      id: '5',
      name: 'Product Feedback',
      description: 'Get insights about our latest product features',
      status: 'archived',
      responses: 234,
      created: '2023-12-20',
      lastModified: '2024-01-08',
      views: 890,
      conversionRate: 26.3,
      category: 'feedback',
      isStarred: false
    },
    {
      id: '6',
      name: 'Newsletter Signup',
      description: 'Build our email list with interested subscribers',
      status: 'published',
      responses: 156,
      created: '2024-01-12',
      lastModified: '2024-01-19',
      views: 520,
      conversionRate: 30.0,
      category: 'marketing',
      isStarred: false
    },
    {
      id: '7',
      name: 'Beta Testing Application',
      description: 'Applications for our beta testing program',
      status: 'published',
      responses: 78,
      created: '2024-01-08',
      lastModified: '2024-01-17',
      views: 210,
      conversionRate: 37.1,
      category: 'application',
      isStarred: true
    },
    {
      id: '8',
      name: 'Customer Support Ticket',
      description: 'Help customers submit support requests',
      status: 'published',
      responses: 92,
      created: '2024-01-14',
      lastModified: '2024-01-21',
      views: 340,
      conversionRate: 27.1,
      category: 'support',
      isStarred: false
    }
  ];

  // Filter and sort forms
  const filteredAndSortedForms = useMemo(() => {
    let filtered = formsData.filter(form => {
      const matchesSearch = form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           form.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || form.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'responses':
          aValue = a.responses;
          bValue = b.responses;
          break;
        case 'conversionRate':
          aValue = a.conversionRate;
          bValue = b.conversionRate;
          break;
        case 'created':
          aValue = new Date(a.created);
          bValue = new Date(b.created);
          break;
        case 'lastModified':
        default:
          aValue = new Date(a.lastModified);
          bValue = new Date(b.lastModified);
          break;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [formsData, searchTerm, statusFilter, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedForms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedForms = filteredAndSortedForms.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-100 text-green-700">Published</Badge>;
      case 'draft':
        return <Badge className="bg-yellow-100 text-yellow-700">Draft</Badge>;
      case 'archived':
        return <Badge className="bg-gray-100 text-gray-700">Archived</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const PaginationControls = () => (
    <div className="flex items-center justify-between mt-6 p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAndSortedForms.length)} of {filteredAndSortedForms.length} results
        </span>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }
            
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
                className="w-8 h-8 p-0"
              >
                {pageNum}
              </Button>
            );
          })}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Keep existing header and stats */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Form Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and analyze your forms
          </p>
        </div>
        
        <Button 
          onClick={() => navigate('/form-wizard')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Form
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Forms</p>
                <p className="text-3xl font-bold">{formsData.length}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Total Responses</p>
                <p className="text-3xl font-bold">{formsData.reduce((sum, form) => sum + form.responses, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg. Conversion</p>
                <p className="text-3xl font-bold">
                  {(formsData.reduce((sum, form) => sum + form.conversionRate, 0) / formsData.length).toFixed(1)}%
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Published</p>
                <p className="text-3xl font-bold">{formsData.filter(f => f.status === 'published').length}</p>
              </div>
              <Eye className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search forms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'published' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('published')}
              >
                Published
              </Button>
              <Button
                variant={statusFilter === 'draft' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('draft')}
              >
                Draft
              </Button>
              <Button
                variant={statusFilter === 'archived' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('archived')}
              >
                Archived
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('name')}
                className="flex items-center gap-1"
              >
                Name
                <ArrowUpDown className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('responses')}
                className="flex items-center gap-1"
              >
                Responses
                <ArrowUpDown className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('lastModified')}
                className="flex items-center gap-1"
              >
                Modified
                <ArrowUpDown className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Forms Grid */}
      <AnimatePresence>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedForms.map((form, index) => (
            <motion.div
              key={form.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-200 group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-lg">{form.name}</CardTitle>
                        {form.isStarred && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{form.description}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {getStatusBadge(form.status)}
                    <Badge variant="outline" className="text-xs">
                      {form.category}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{form.responses}</div>
                      <div className="text-xs text-gray-600">Responses</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{form.conversionRate}%</div>
                      <div className="text-xs text-gray-600">Conversion</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="h-3 w-3" />
                      Created: {formatDate(form.created)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Modified: {formatDate(form.lastModified)}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Pagination Controls */}
      <PaginationControls />
    </div>
  );
};

export default EnhancedFormDashboard;
