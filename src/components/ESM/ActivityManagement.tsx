
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Search, 
  Plus, 
  Filter,
  Clock,
  Calendar,
  FileText,
  CheckCircle,
  AlertCircle,
  Users,
  TrendingUp,
  Bell,
  BookOpen,
  Award,
  MoreVertical
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ActivityManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('assignments');

  // Mock activity data
  const assignments = [
    {
      id: 1,
      title: 'Calculus Problem Set 1',
      course: 'Advanced Mathematics',
      dueDate: '2024-01-20',
      submitted: 42,
      total: 45,
      status: 'active',
      priority: 'high',
      description: 'Solve differential equation problems from Chapter 5'
    },
    {
      id: 2,
      title: 'Environmental Research Project',
      course: 'Environmental Science',
      dueDate: '2024-01-25',
      submitted: 28,
      total: 32,
      status: 'active',
      priority: 'medium',
      description: 'Research paper on climate change impacts'
    },
    {
      id: 3,
      title: 'Historical Essay Analysis',
      course: 'World History',
      dueDate: '2024-01-18',
      submitted: 38,
      total: 38,
      status: 'completed',
      priority: 'low',
      description: 'Analyze the causes of World War II'
    }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Chapter 5 Discussion Forum',
      course: 'Advanced Mathematics',
      posts: 23,
      participants: 18,
      lastActivity: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      title: 'Climate Change Debate',
      course: 'Environmental Science',
      posts: 45,
      participants: 28,
      lastActivity: '1 hour ago',
      status: 'active'
    },
    {
      id: 3,
      title: 'Writing Techniques Workshop',
      course: 'Creative Writing',
      posts: 12,
      participants: 15,
      lastActivity: '4 hours ago',
      status: 'active'
    }
  ];

  const announcements = [
    {
      id: 1,
      title: 'Midterm Exam Schedule Released',
      course: 'All Courses',
      date: '2024-01-15',
      priority: 'high',
      content: 'Midterm examinations will be held from January 25-30, 2024'
    },
    {
      id: 2,
      title: 'Library Hours Extended',
      course: 'General',
      date: '2024-01-14',
      priority: 'medium',
      content: 'Library will now be open until 10 PM on weekdays'
    },
    {
      id: 3,
      title: 'New Course Materials Available',
      course: 'Environmental Science',
      date: '2024-01-13',
      priority: 'low',
      content: 'Updated reading materials have been uploaded to the course portal'
    }
  ];

  const stats = [
    { title: 'Active Assignments', value: '24', change: '+6%', icon: FileText },
    { title: 'Discussion Posts', value: '156', change: '+23%', icon: MessageSquare },
    { title: 'Pending Reviews', value: '18', change: '-12%', icon: Clock },
    { title: 'Completion Rate', value: '92%', change: '+4%', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Activity Management
            </h1>
            <p className="text-gray-600 mt-1">Track assignments, discussions, and student interactions</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate('/platform/esm/activities/announcements/create')}>
              <Bell className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
            <Button onClick={() => navigate('/platform/esm/activities/assignments/create')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <Card key={stat.title} className="border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="mt-1">
                      {stat.change}
                    </Badge>
                  </div>
                  <stat.icon className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Search and Filter */}
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
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button variant="outline" onClick={() => setSelectedFilter('active')}>
              <Filter className="h-4 w-4 mr-2" />
              Active
            </Button>
            <Button variant="outline" onClick={() => setSelectedFilter('completed')}>
              <Filter className="h-4 w-4 mr-2" />
              Completed
            </Button>
            <Button variant="outline" onClick={() => setSelectedFilter('all')}>
              All Activities
            </Button>
          </div>
        </motion.div>

        {/* Activity Tabs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3">
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="discussions">Discussions</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>

            {/* Assignments Tab */}
            <TabsContent value="assignments" className="space-y-6">
              <div className="grid gap-6">
                {assignments.map((assignment, index) => (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold">{assignment.title}</h3>
                              <Badge 
                                variant={assignment.status === 'active' ? 'default' : 'secondary'}
                              >
                                {assignment.status}
                              </Badge>
                              <Badge 
                                variant={assignment.priority === 'high' ? 'destructive' : assignment.priority === 'medium' ? 'default' : 'secondary'}
                              >
                                {assignment.priority}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-3">{assignment.description}</p>
                            
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {assignment.course}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                Due: {assignment.dueDate}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {assignment.submitted}/{assignment.total} submitted
                              </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-2">
                                <span>Submission Progress</span>
                                <span>{Math.round((assignment.submitted / assignment.total) * 100)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-purple-500 h-2 rounded-full transition-all"
                                  style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => navigate(`/platform/esm/assignments/${assignment.id}`)}
                            >
                              View Details
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Discussions Tab */}
            <TabsContent value="discussions" className="space-y-6">
              <div className="grid gap-6">
                {discussions.map((discussion, index) => (
                  <motion.div
                    key={discussion.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold">{discussion.title}</h3>
                              <Badge variant="default">{discussion.status}</Badge>
                            </div>
                            
                            <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {discussion.course}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {discussion.posts} posts
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {discussion.participants} participants
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {discussion.lastActivity}
                              </span>
                            </div>

                            <div className="flex gap-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => navigate(`/platform/esm/discussions/${discussion.id}`)}
                              >
                                Join Discussion
                              </Button>
                              <Button variant="ghost" size="sm">
                                Moderate
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements" className="space-y-6">
              <div className="grid gap-6">
                {announcements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <h3 className="text-lg font-semibold">{announcement.title}</h3>
                              <Badge 
                                variant={announcement.priority === 'high' ? 'destructive' : announcement.priority === 'medium' ? 'default' : 'secondary'}
                              >
                                {announcement.priority}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-3">{announcement.content}</p>
                            
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4" />
                                {announcement.course}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {announcement.date}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default ActivityManagement;
