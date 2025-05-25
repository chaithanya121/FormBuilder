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
import { Search, Filter, PlusCircle, Edit3, Eye, Trash2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { formsApi, FormData } from "@/services/api/forms";
import { useTheme } from '@/components/theme-provider';

const FormList = () => {
  const [forms, setForms] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'submissions'>('date');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme } = useTheme();

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

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 mt-6"
      >
        <h1 className={`text-3xl font-bold tracking-tight mb-3 md:text-4xl lg:text-5xl ${theme === 'light'
          ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600'
          : 'bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200'
        }`}>
          All Forms
        </h1>
        <p className={`text-lg max-w-2xl mx-auto ${theme === 'light' 
          ? 'text-gray-600' 
          : 'text-blue-100/80'
        }`}>
          View and manage all your created forms
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`p-5 rounded-xl mb-8 shadow-lg ${theme === 'light'
          ? 'bg-white/80 backdrop-blur-sm border border-white/20'
          : 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50'
        }`}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button 
              onClick={() => navigate('/create')}
              className={`${theme === 'light'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
              } text-white shadow-lg hover:shadow-xl transition-all duration-200`}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Form
            </Button>
              
            <div className="relative w-full md:w-64">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-400'}`} />
              <Input
                placeholder="Search forms..."
                className={`pl-10 ${theme === 'light'
                  ? 'bg-white/70 border-gray-300 text-gray-800 placeholder:text-gray-500'
                  : 'bg-gray-700/70 border-gray-600 text-white'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className={`w-40 ${theme === 'light'
                ? 'bg-white/70 border-gray-300 text-gray-800'
                : 'bg-gray-700/70 border-gray-600 text-white'
              }`}>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className={theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}>
                <SelectItem value="name" className={`${theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}>Name</SelectItem>
                <SelectItem value="date" className={`${theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}>Last Modified</SelectItem>
                <SelectItem value="submissions" className={`${theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}>Submissions</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className={`w-40 ${theme === 'light'
                ? 'bg-white/70 border-gray-300 text-gray-800'
                : 'bg-gray-700/70 border-gray-600 text-white'
              }`}>
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent className={theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'}>
                <SelectItem value="all" className={`${theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}>All Forms</SelectItem>
                <SelectItem value="published" className={`${theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}>Published</SelectItem>
                <SelectItem value="draft" className={`${theme === 'light' ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-gray-700'}`}>Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className={`rounded-lg overflow-hidden ${theme === 'light'
          ? 'bg-white/90 border border-gray-200/50'
          : 'bg-gray-800/80'
        }`}>
          {filteredAndSortedForms.length > 0 ? (
            <Table>
              <TableHeader className={theme === 'light' ? 'bg-gray-50/80' : 'bg-gray-800/90'}>
                <TableRow className={theme === 'light' ? 'hover:bg-gray-100/50' : 'hover:bg-gray-700/50'}>
                  <TableHead className={theme === 'light' ? 'text-gray-700' : 'text-white'}>Name</TableHead>
                  <TableHead className={theme === 'light' ? 'text-gray-700' : 'text-white'}>Status</TableHead>
                  <TableHead className={theme === 'light' ? 'text-gray-700' : 'text-white'}>Last Modified</TableHead>
                  <TableHead className={`text-right ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>Submissions</TableHead>
                  <TableHead className={`text-right ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedForms.map((form) => (
                  <TableRow 
                    key={form.primary_id} 
                    className={`cursor-pointer transition-colors ${theme === 'light' 
                      ? 'hover:bg-blue-50/50' 
                      : 'hover:bg-gray-700/50'
                    }`}
                    onClick={() => navigate(`/form-builder/${form.primary_id}`)}
                  >
                    <TableCell className={`font-medium ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>{form.name}</TableCell>
                    <TableCell>
                      {form.published ? (
                        <span className="text-xs bg-green-500/20 text-green-600 px-2 py-0.5 rounded-full border border-green-500/30">
                          Published
                        </span>
                      ) : (
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${theme === 'light'
                          ? 'bg-gray-200/50 text-gray-600 border-gray-300/50'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }`}>
                          Draft
                        </span>
                      )}
                    </TableCell>
                    <TableCell className={`flex items-center gap-1 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>
                      <Clock className={`h-3 w-3 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                      {formatDate(form.last_modified)}
                    </TableCell>
                    <TableCell className={`text-right ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>{form.submissions}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`h-8 w-8 p-0 ${theme === 'light'
                            ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                            : 'text-gray-400 hover:text-white hover:bg-gray-700'
                          }`}
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
                            className={`h-8 w-8 p-0 ${theme === 'light'
                              ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                              : 'text-gray-400 hover:text-white hover:bg-gray-700'
                            }`}
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
                          className={`h-8 w-8 p-0 ${theme === 'light'
                            ? 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                            : 'text-gray-400 hover:text-red-400 hover:bg-gray-700'
                          }`}
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
          ) : (
            <div className="text-center py-10 px-4">
              <div className="flex flex-col items-center">
                <div className={`p-3 rounded-full mb-4 ${theme === 'light'
                  ? 'bg-gray-100/80'
                  : 'bg-gray-700/50'
                }`}>
                  <Filter className={`h-6 w-6 ${theme === 'light' ? 'text-gray-400' : 'text-gray-400'}`} />
                </div>
                <h3 className={`text-lg font-medium mb-2 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>No forms found</h3>
                <p className={`mb-6 max-w-md mx-auto ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {searchTerm || filterStatus !== 'all' ? 
                    "Try adjusting your search terms or filters to see all forms" : 
                    "Get started by creating your first form"
                  }
                </p>
                <Button 
                  onClick={() => navigate('/create')}
                  className={`${theme === 'light'
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600'
                  } text-white shadow-lg hover:shadow-xl transition-all duration-200`}
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
