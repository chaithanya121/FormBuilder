
import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, Filter, Download, Eye, Trash2, Calendar, Clock,
  BarChart3, TrendingUp, Users, FileText, Mail, Phone,
  MapPin, Star, ThumbsUp, AlertCircle, CheckCircle,
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  MoreHorizontal, RefreshCw, Settings, Share, Archive
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SubmissionData {
  id: string;
  formId: string;
  formName: string;
  submissionDate: string;
  status: 'new' | 'reviewed' | 'processed' | 'archived';
  score?: number;
  location?: string;
  device: 'desktop' | 'mobile' | 'tablet';
  data: Record<string, any>;
  metadata: {
    ip: string;
    userAgent: string;
    timestamp: string;
    duration: number;
  };
}

interface AnalyticsData {
  totalSubmissions: number;
  todaySubmissions: number;
  averageScore: number;
  completionRate: number;
  deviceBreakdown: Record<string, number>;
  locationData: Record<string, number>;
  timeSeriesData: Array<{ date: string; submissions: number }>;
}

const SUBMISSIONS_PER_PAGE = 15;

const FormSubmissions: React.FC = () => {
  const { formId } = useParams();
  const { toast } = useToast();
  
  const [submissions, setSubmissions] = useState<SubmissionData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [selectedSubmissions, setSelectedSubmissions] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockSubmissions: SubmissionData[] = Array.from({ length: 87 }, (_, i) => ({
      id: `sub_${i + 1}`,
      formId: formId || 'form_1',
      formName: 'Contact Form',
      submissionDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: ['new', 'reviewed', 'processed', 'archived'][Math.floor(Math.random() * 4)] as any,
      score: Math.floor(Math.random() * 5) + 1,
      location: ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin'][Math.floor(Math.random() * 5)],
      device: ['desktop', 'mobile', 'tablet'][Math.floor(Math.random() * 3)] as any,
      data: {
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        message: `This is a sample message from user ${i + 1}`,
        rating: Math.floor(Math.random() * 5) + 1
      },
      metadata: {
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        duration: Math.floor(Math.random() * 300) + 30
      }
    }));

    const mockAnalytics: AnalyticsData = {
      totalSubmissions: 87,
      todaySubmissions: 12,
      averageScore: 4.2,
      completionRate: 85.6,
      deviceBreakdown: { desktop: 45, mobile: 35, tablet: 7 },
      locationData: { 'New York': 25, 'London': 18, 'Tokyo': 15, 'Sydney': 12, 'Berlin': 17 },
      timeSeriesData: Array.from({ length: 30 }, (_, i) => ({
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        submissions: Math.floor(Math.random() * 10) + 1
      }))
    };

    setTimeout(() => {
      setSubmissions(mockSubmissions);
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, [formId]);

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.data.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.data.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    const matchesDate = dateFilter === 'all' || (() => {
      const submissionDate = new Date(submission.submissionDate);
      const now = new Date();
      switch (dateFilter) {
        case 'today':
          return submissionDate.toDateString() === now.toDateString();
        case 'week':
          return (now.getTime() - submissionDate.getTime()) < 7 * 24 * 60 * 60 * 1000;
        case 'month':
          return (now.getTime() - submissionDate.getTime()) < 30 * 24 * 60 * 60 * 1000;
        default:
          return true;
      }
    })();
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Pagination
  const totalPages = Math.ceil(filteredSubmissions.length / SUBMISSIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * SUBMISSIONS_PER_PAGE;
  const paginatedSubmissions = filteredSubmissions.slice(startIndex, startIndex + SUBMISSIONS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'reviewed': return 'bg-yellow-100 text-yellow-700';
      case 'processed': return 'bg-green-100 text-green-700';
      case 'archived': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedSubmissions.length === 0) {
      toast({
        title: "No submissions selected",
        description: "Please select submissions to perform bulk actions",
        variant: "destructive"
      });
      return;
    }

    switch (action) {
      case 'export':
        toast({
          title: "Export Started",
          description: `Exporting ${selectedSubmissions.length} submissions...`
        });
        break;
      case 'archive':
        toast({
          title: "Submissions Archived",
          description: `${selectedSubmissions.length} submissions have been archived`
        });
        break;
      case 'delete':
        toast({
          title: "Submissions Deleted",
          description: `${selectedSubmissions.length} submissions have been deleted`
        });
        break;
    }
    setSelectedSubmissions([]);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-400">
          Showing {startIndex + 1}-{Math.min(startIndex + SUBMISSIONS_PER_PAGE, filteredSubmissions.length)} of {filteredSubmissions.length} submissions
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-white mx-auto mb-4" />
          <p className="text-white">Loading submissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-indigo-300 to-purple-200">
              Form Submissions
            </span>
          </h1>
          <p className="text-xl text-blue-100/80 max-w-3xl mx-auto">
            Comprehensive analytics and management for your form submissions
          </p>
        </motion.div>

        {/* Analytics Cards */}
        {analytics && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-400/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm font-medium">Total Submissions</p>
                    <p className="text-3xl font-bold text-white">{analytics.totalSubmissions}</p>
                  </div>
                  <FileText className="h-8 w-8 text-blue-300" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400">+{analytics.todaySubmissions} today</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur-sm border border-purple-400/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm font-medium">Average Score</p>
                    <p className="text-3xl font-bold text-white">{analytics.averageScore}</p>
                  </div>
                  <Star className="h-8 w-8 text-purple-300" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <ThumbsUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400">Excellent rating</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border border-green-400/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm font-medium">Completion Rate</p>
                    <p className="text-3xl font-bold text-white">{analytics.completionRate}%</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-300" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <BarChart3 className="h-4 w-4 text-blue-400 mr-1" />
                  <span className="text-blue-400">Above average</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-600/20 to-orange-800/20 backdrop-blur-sm border border-orange-400/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-200 text-sm font-medium">Mobile Users</p>
                    <p className="text-3xl font-bold text-white">{analytics.deviceBreakdown.mobile}%</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-300" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  <span className="text-green-400">Growing segment</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-2xl"
        >
          <Tabs defaultValue="submissions" className="w-full">
            <div className="border-b border-gray-700/50 px-6 pt-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="submissions" className="p-6">
              {/* Filters and Search */}
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search submissions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700/70 border-gray-600 text-white"
                  />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40 bg-gray-700/70 border-gray-600 text-white">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Status</SelectItem>
                    <SelectItem value="new" className="text-white hover:bg-gray-700">New</SelectItem>
                    <SelectItem value="reviewed" className="text-white hover:bg-gray-700">Reviewed</SelectItem>
                    <SelectItem value="processed" className="text-white hover:bg-gray-700">Processed</SelectItem>
                    <SelectItem value="archived" className="text-white hover:bg-gray-700">Archived</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="w-40 bg-gray-700/70 border-gray-600 text-white">
                    <SelectValue placeholder="Date" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all" className="text-white hover:bg-gray-700">All Time</SelectItem>
                    <SelectItem value="today" className="text-white hover:bg-gray-700">Today</SelectItem>
                    <SelectItem value="week" className="text-white hover:bg-gray-700">This Week</SelectItem>
                    <SelectItem value="month" className="text-white hover:bg-gray-700">This Month</SelectItem>
                  </SelectContent>
                </Select>

                <Button 
                  onClick={() => handleBulkAction('export')}
                  disabled={selectedSubmissions.length === 0}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Bulk Actions */}
              {selectedSubmissions.length > 0 && (
                <div className="mb-4 p-3 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-200 text-sm">
                      {selectedSubmissions.length} submission(s) selected
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleBulkAction('archive')}
                        className="border-blue-400 text-blue-200 hover:bg-blue-500/20"
                      >
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleBulkAction('delete')}
                        className="border-red-400 text-red-200 hover:bg-red-500/20"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Submissions Table */}
              <div className="bg-gray-800/80 rounded-lg overflow-hidden">
                <Table>
                  <TableHeader className="bg-gray-800/90">
                    <TableRow className="hover:bg-gray-700/50">
                      <TableHead className="text-white">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedSubmissions(paginatedSubmissions.map(s => s.id));
                            } else {
                              setSelectedSubmissions([]);
                            }
                          }}
                          className="rounded border-gray-600 bg-gray-700"
                        />
                      </TableHead>
                      <TableHead className="text-white">Submitter</TableHead>
                      <TableHead className="text-white">Status</TableHead>
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-white">Score</TableHead>
                      <TableHead className="text-white">Device</TableHead>
                      <TableHead className="text-white">Location</TableHead>
                      <TableHead className="text-white text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedSubmissions.map((submission) => (
                      <TableRow key={submission.id} className="hover:bg-gray-700/50">
                        <TableCell>
                          <input
                            type="checkbox"
                            checked={selectedSubmissions.includes(submission.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedSubmissions([...selectedSubmissions, submission.id]);
                              } else {
                                setSelectedSubmissions(selectedSubmissions.filter(id => id !== submission.id));
                              }
                            }}
                            className="rounded border-gray-600 bg-gray-700"
                          />
                        </TableCell>
                        <TableCell className="text-white">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-full">
                              <Users className="h-4 w-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="font-medium">{submission.data.name}</p>
                              <p className="text-sm text-gray-400">{submission.data.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-gray-500" />
                            {new Date(submission.submissionDate).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {submission.score && (
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500" />
                              {submission.score}/5
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-300 capitalize">{submission.device}</TableCell>
                        <TableCell className="text-gray-300">
                          {submission.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-500" />
                              {submission.location}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-gray-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {renderPagination()}
              </div>

              {paginatedSubmissions.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">No submissions found</h3>
                  <p className="text-gray-400 mb-4">
                    {searchTerm || statusFilter !== 'all' || dateFilter !== 'all' ? 
                      "Try adjusting your search terms or filters" : 
                      "No submissions have been received yet"
                    }
                  </p>
                  {(searchTerm || statusFilter !== 'all' || dateFilter !== 'all') && (
                    <Button 
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('all');
                        setDateFilter('all');
                      }}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600"
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Device Breakdown */}
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white">Device Breakdown</CardTitle>
                    <CardDescription className="text-gray-400">
                      Submission distribution by device type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analytics && Object.entries(analytics.deviceBreakdown).map(([device, count]) => (
                      <div key={device} className="flex items-center justify-between py-2">
                        <span className="text-gray-300 capitalize">{device}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-32 bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${(count / analytics.totalSubmissions) * 100}%` }}
                            />
                          </div>
                          <span className="text-white text-sm font-medium">{count}%</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Location Data */}
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-white">Top Locations</CardTitle>
                    <CardDescription className="text-gray-400">
                      Submissions by geographic location
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analytics && Object.entries(analytics.locationData)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 5)
                      .map(([location, count]) => (
                      <div key={location} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-blue-400" />
                          <span className="text-gray-300">{location}</span>
                        </div>
                        <Badge className="bg-blue-100 text-blue-700">
                          {count}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default FormSubmissions;
