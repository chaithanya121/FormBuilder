import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Search, Filter, PlusCircle, Edit3, Eye, Trash2, Clock,
  Zap, Wand2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { formsApi, FormData } from "@/services/api/forms";

const FORMS_PER_PAGE = 10;

const FormList = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'submissions'>('date');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadForms = async () => {
      try {
        console.log('Loading forms...');
        const formData = await formsApi.getAllForms();
        setForms(formData);
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

  const handleDeleteForm = async (formId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await formsApi.deleteForm(formId);
      setForms(forms.filter(form => form.primary_id !== formId));
      
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

  const sortForms = (formsToSort: FormData[]) => {
    switch (sortBy) {
      case 'name':
        return [...formsToSort].sort((a, b) => a.name.localeCompare(b.name));
      case 'date':
        return [...formsToSort].sort((a, b) => 
          new Date(b.last_modified).getTime() - new Date(a.last_modified).getTime()
        );
      case 'submissions':
        return [...formsToSort].sort((a, b) => b.submissions - a.submissions);
      default:
        return formsToSort;
    }
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

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedForms.length / FORMS_PER_PAGE);
  const startIndex = (currentPage - 1) * FORMS_PER_PAGE;
  const paginatedForms = filteredAndSortedForms.slice(startIndex, startIndex + FORMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between mt-6 px-4">
        <div className="text-sm text-gray-400">
          Showing {startIndex + 1}-{Math.min(startIndex + FORMS_PER_PAGE, filteredAndSortedForms.length)} of {filteredAndSortedForms.length} forms
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
            className="bg-gray-700/70 border-gray-600 text-white hover:bg-gray-600 disabled:opacity-50"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-700/70 border-gray-600 text-white hover:bg-gray-600 disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let page;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (currentPage <= 3) {
                page = i + 1;
              } else if (currentPage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = currentPage - 2 + i;
              }
              
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => goToPage(page)}
                  className={
                    currentPage === page
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-700/70 border-gray-600 text-white hover:bg-gray-600"
                  }
                >
                  {page}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-700/70 border-gray-600 text-white hover:bg-gray-600 disabled:opacity-50"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
            className="bg-gray-700/70 border-gray-600 text-white hover:bg-gray-600 disabled:opacity-50"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 mt-6"
      >
        <h1 className="text-3xl font-bold tracking-tight text-white mb-3 md:text-4xl lg:text-5xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200">
            All Forms
          </span>
        </h1>
        <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
          View and manage all your created forms
        </p>
      </motion.div>

      {/* Enhanced Quick Action Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <Card 
          className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-400/30 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
          onClick={() => navigate('/create')}
        >
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-blue-500/20 rounded-full w-fit mx-auto mb-4">
              <PlusCircle className="h-8 w-8 text-blue-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Create Form</h3>
            <p className="text-blue-200 text-sm">Start building your next form</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm border border-purple-400/30 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
          onClick={() => navigate('/integrations')}
        >
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-purple-500/20 rounded-full w-fit mx-auto mb-4">
              <Zap className="h-8 w-8 text-purple-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Integrations</h3>
            <p className="text-purple-200 text-sm">Connect external services</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border border-green-400/30 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
          onClick={() => navigate('/form-wizard')}
        >
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-green-500/20 rounded-full w-fit mx-auto mb-4">
              <Wand2 className="h-8 w-8 text-green-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Form Wizard</h3>
            <p className="text-green-200 text-sm">AI-powered form creation</p>
          </CardContent>
        </Card>

        <Card 
          className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 backdrop-blur-sm border border-orange-400/30 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300"
          onClick={() => navigate('/integrations')}
        >
          <CardContent className="p-6 text-center">
            <div className="p-3 bg-orange-500/20 rounded-full w-fit mx-auto mb-4">
              <Activity className="h-8 w-8 text-orange-300" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Integration Hub</h3>
            <p className="text-orange-200 text-sm">Advanced connections</p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl mb-8 border border-gray-700/50 shadow-lg"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search forms..."
                className="pl-10 bg-gray-700/70 border-gray-600 text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-40 bg-gray-700/70 border-gray-600 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="name" className="text-white hover:bg-gray-700">Name</SelectItem>
                <SelectItem value="date" className="text-white hover:bg-gray-700">Last Modified</SelectItem>
                <SelectItem value="submissions" className="text-white hover:bg-gray-700">Submissions</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-40 bg-gray-700/70 border-gray-600 text-white">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="all" className="text-white hover:bg-gray-700">All Forms</SelectItem>
                <SelectItem value="published" className="text-white hover:bg-gray-700">Published</SelectItem>
                <SelectItem value="draft" className="text-white hover:bg-gray-700">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-gray-800/80 rounded-lg overflow-hidden">
          {paginatedForms.length > 0 ? (
            <>
              <Table>
                <TableHeader className="bg-gray-800/90">
                  <TableRow className="hover:bg-gray-700/50">
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white">Last Modified</TableHead>
                    <TableHead className="text-white text-right">Submissions</TableHead>
                    <TableHead className="text-white text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedForms.map((form) => (
                    <TableRow 
                      key={form.primary_id} 
                      className="hover:bg-gray-700/50 cursor-pointer"
                      onClick={() => navigate(`/form-builder/${form.primary_id}`)}
                    >
                      <TableCell className="font-medium text-white">{form.name}</TableCell>
                      <TableCell>
                        {form.published ? (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                            Published
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-full">
                            Draft
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-300 flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-500" />
                        {formatDate(form.last_modified)}
                      </TableCell>
                      <TableCell className="text-right text-gray-300">{form.submissions}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/form-builder/${form.primary_id}`);
                            }}
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          {form.published && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/form/${form.primary_id}`);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700"
                            onClick={(e) => handleDeleteForm(form.primary_id, e)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {renderPagination()}
            </>
          ) : (
            <div className="text-center py-10 px-4">
              <div className="flex flex-col items-center">
                <div className="p-3 bg-gray-700/50 rounded-full mb-4">
                  <Filter className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No forms found</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  {searchTerm || filterStatus !== 'all' ? 
                    "Try adjusting your search terms or filters to see all forms" : 
                    "Get started by creating your first form"
                  }
                </p>
                <Button 
                  onClick={() => navigate('/create')}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Form
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FormList;
