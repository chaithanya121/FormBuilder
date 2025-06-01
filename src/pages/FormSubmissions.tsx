
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
  Database
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
    submissions: 24
  });

  const [submissions] = useState([
    {
      id: '1',
      timestamp: '2024-06-01T10:30:00Z',
      data: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, I would like to get more information about your services.'
      }
    },
    {
      id: '2',
      timestamp: '2024-06-01T09:15:00Z',
      data: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        message: 'Great website! Looking forward to working together.'
      }
    },
    {
      id: '3',
      timestamp: '2024-05-31T16:45:00Z',
      data: {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        message: 'Can you provide a quote for my project?'
      }
    }
  ]);

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
    } p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <Link to="/platform/forms" className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            Forms
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Submissions</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/platform/forms')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Forms
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl shadow-lg">
                <Database className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Form Submissions
                </h1>
                <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  {formData.name} - {formData.submissions} submissions
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleExportCSV}
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button
              onClick={() => navigate(`/form-builder/${formId}`)}
              className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
            >
              <FileText className="h-4 w-4 mr-2" />
              Edit Form
            </Button>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 ${theme === 'light' ? 'bg-white/80' : 'bg-gray-800/50'} backdrop-blur-sm`}
            />
          </div>
        </motion.div>

        {/* Submissions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className={`${theme === 'light' 
            ? 'bg-white/90 border-white/50 shadow-xl' 
            : 'bg-gray-800/50 border-gray-700 shadow-2xl'
          } backdrop-blur-sm`}>
            <CardHeader>
              <CardTitle className={`text-xl ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                Submissions ({filteredSubmissions.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredSubmissions.length === 0 ? (
                <div className="text-center py-12">
                  <Database className={`h-12 w-12 mx-auto mb-4 ${theme === 'light' ? 'text-gray-400' : 'text-gray-600'}`} />
                  <h3 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    No submissions found
                  </h3>
                  <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {searchTerm ? 'Try adjusting your search terms' : 'No submissions have been received yet'}
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Preview</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">
                          {formatDate(submission.timestamp)}
                        </TableCell>
                        <TableCell>
                          <div className="max-w-md">
                            {Object.entries(submission.data).slice(0, 2).map(([key, value]) => (
                              <div key={key} className="text-sm">
                                <span className="font-medium">{key}:</span> {String(value).substring(0, 50)}
                                {String(value).length > 50 ? '...' : ''}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedSubmission(submission)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
            <DialogTitle>Submission Details</DialogTitle>
            <DialogDescription>
              Submitted on {selectedSubmission && formatDate(selectedSubmission.timestamp)}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {selectedSubmission && (
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border">
                {Object.entries(selectedSubmission.data).map(([key, value]) => (
                  <div key={key} className="mb-3 last:mb-0">
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {key}
                    </div>
                    <div className="text-gray-900 dark:text-white break-words">
                      {String(value)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={() => setSelectedSubmission(null)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormSubmissions;
