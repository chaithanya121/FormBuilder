
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Search, 
  Download, 
  Eye, 
  Trash2, 
  FileText,
  ChevronRight,
  Home,
  Database,
  Filter,
  Calendar,
  TrendingUp,
  Users,
  Clock,
  BarChart3,
  Target,
  Sparkles,
  Export
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const FormSubmissions = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  
  // Mock data - replace with actual API call
  const [formData] = useState({
    name: 'Contact Form',
    submissions: 24,
    conversionRate: '89.2%',
    avgCompletionTime: '2m 15s'
  });

  const [submissions] = useState([
    {
      id: '1',
      timestamp: '2024-06-01T10:30:00Z',
      status: 'completed',
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I would like to get more information about your services.'
      }
    },
    {
      id: '2',
      timestamp: '2024-06-01T09:15:00Z',
      status: 'completed',
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'Great website! Looking forward to working together.'
      }
    },
    {
      id: '3',
      timestamp: '2024-05-31T16:45:00Z',
      status: 'completed',
      data: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        message: 'Can you provide a quote for my project?'
      }
    }
  ]);

  const quickStats = [
    {
      title: 'Total Submissions',
      value: formData.submissions.toString(),
      icon: Database,
      color: 'from-blue-500 to-cyan-400',
      change: '+12 today'
    },
    {
      title: 'Conversion Rate',
      value: formData.conversionRate,
      icon: Target,
      color: 'from-green-500 to-emerald-400',
      change: '+5.1% vs last week'
    },
    {
      title: 'Avg. Completion',
      value: formData.avgCompletionTime,
      icon: Clock,
      color: 'from-purple-500 to-pink-400',
      change: '15s faster'
    },
    {
      title: 'Response Quality',
      value: '94%',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-400',
      change: 'High quality responses'
    }
  ];

  const filteredSubmissions = submissions.filter(submission => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return Object.values(submission.data).some(value => 
      String(value).toLowerCase().includes(searchLower)
    );
  });

  const handleExportCSV = () => {
    console.log('Exporting submissions to CSV...');
    // Implement CSV export functionality
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6 relative overflow-hidden`}>
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`absolute top-20 right-20 w-64 h-64 ${theme === 'light' ? 'bg-emerald-200/20' : 'bg-emerald-500/5'} rounded-full blur-3xl`}
        ></motion.div>
        <motion.div 
          animate={{ 
            scale: [1.1, 1, 1.1],
            x: [-10, 10, -10]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute bottom-20 left-20 w-80 h-80 ${theme === 'light' ? 'bg-blue-200/20' : 'bg-blue-500/5'} rounded-full blur-3xl`}
        ></motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <Link to="/platform/forms" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors">
            Forms
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Submissions</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/platform/forms')}
              className={`${theme === 'light' ? 'bg-white/80 hover:bg-white' : 'bg-gray-800/50 hover:bg-gray-700'} backdrop-blur-sm`}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Forms
            </Button>
            <div className="flex items-center gap-4">
              <motion.div 
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5 }}
                className="p-4 bg-gradient-to-r from-emerald-500 to-green-400 rounded-3xl shadow-2xl"
              >
                <Database className="h-10 w-10 text-white" />
              </motion.div>
              <div>
                <h1 className={`text-4xl font-bold bg-gradient-to-r ${theme === 'light' 
                  ? 'from-gray-900 via-emerald-800 to-green-900' 
                  : 'from-white via-emerald-200 to-green-200'
                } bg-clip-text text-transparent`}>
                  Form Analytics
                </h1>
                <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {formData.name} - Detailed insights and submissions
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleExportCSV}
              className={`${theme === 'light' ? 'bg-white/80 hover:bg-white' : 'bg-gray-800/50 hover:bg-gray-700'} backdrop-blur-sm`}
            >
              <Export className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button
              onClick={() => navigate(`/form-builder/${formId}`)}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-lg"
            >
              <FileText className="h-4 w-4 mr-2" />
              Edit Form
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <Card className={`${theme === 'light' 
                ? 'bg-white/90 border-white/50 shadow-xl hover:shadow-2xl' 
                : 'bg-gray-800/50 border-gray-700 shadow-2xl hover:shadow-emerald-500/10'
              } backdrop-blur-sm transition-all duration-500 overflow-hidden relative group cursor-pointer`}>
                
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    {stat.title}
                  </CardTitle>
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className={`p-2 bg-gradient-to-r ${stat.color} rounded-lg shadow-lg`}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${theme === 'light' ? 'bg-white/80 border-gray-300' : 'bg-gray-800/50 border-gray-600'} backdrop-blur-sm rounded-xl`}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className={`${theme === 'light' ? 'bg-white/80' : 'bg-gray-800/50'} backdrop-blur-sm`}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className={`${theme === 'light' ? 'bg-white/80' : 'bg-gray-800/50'} backdrop-blur-sm`}>
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </motion.div>

        {/* Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className={`${theme === 'light' 
            ? 'bg-white/90 border-white/50 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm overflow-hidden`}>
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <CardTitle className={`text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'} flex items-center gap-2`}>
                  <Database className="h-5 w-5" />
                  Submissions ({filteredSubmissions.length})
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-100 text-green-700 px-3 py-1">
                    {filteredSubmissions.filter(s => s.status === 'completed').length} Completed
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-16">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Database className={`h-16 w-16 mx-auto mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`} />
                    <h3 className={`text-xl font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                      No submissions found
                    </h3>
                    <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-6`}>
                      {searchTerm ? 'Try adjusting your search terms' : 'No submissions have been received yet'}
                    </p>
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Share Form
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className={theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50'}>
                        <TableHead className="font-semibold">Date & Time</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                        <TableHead className="font-semibold">Preview</TableHead>
                        <TableHead className="text-right font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSubmissions.map((submission, index) => (
                        <motion.tr
                          key={submission.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`border-b border-gray-200 dark:border-gray-700 hover:${theme === 'light' ? 'bg-gray-50' : 'bg-gray-700/50'} transition-colors cursor-pointer`}
                        >
                          <TableCell className="font-medium py-4">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              {formatDate(submission.timestamp)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${
                              submission.status === 'completed' 
                                ? 'bg-green-100 text-green-700 border-green-200' 
                                : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                            }`}>
                              {submission.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-md">
                              {Object.entries(submission.data).slice(0, 2).map(([key, value]) => (
                                <div key={key} className="text-sm mb-1">
                                  <span className={`font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                    {key}:
                                  </span>{' '}
                                  <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>
                                    {String(value).substring(0, 50)}
                                    {String(value).length > 50 ? '...' : ''}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedSubmission(submission)}
                                  className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </motion.div>
                              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </motion.div>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Submission Details Dialog */}
      <Dialog
        open={!!selectedSubmission}
        onOpenChange={() => setSelectedSubmission(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Submission Details
            </DialogTitle>
            <DialogDescription>
              Submitted on {selectedSubmission && formatDate(selectedSubmission.timestamp)}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {selectedSubmission && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${theme === 'light' ? 'bg-gray-50' : 'bg-gray-800'} p-6 rounded-xl border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}
              >
                {Object.entries(selectedSubmission.data).map(([key, value]) => (
                  <div key={key} className="mb-4 last:mb-0">
                    <div className={`text-sm font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'} mb-2 flex items-center gap-2`}>
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </div>
                    <div className={`${theme === 'light' ? 'text-gray-900' : 'text-white'} break-words p-3 rounded-lg ${theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-700 border border-gray-600'}`}>
                      {String(value)}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setSelectedSubmission(null)}>
                Close
              </Button>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormSubmissions;
