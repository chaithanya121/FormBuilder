
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Filter,
  Users,
  Clock,
  Calendar,
  Award,
  TrendingUp,
  Eye,
  Edit,
  MoreVertical,
  FileText,
  Video,
  MessageSquare
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CourseManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock course data
  const courses = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      description: 'Comprehensive mathematics course covering calculus, algebra, and statistics',
      instructor: 'Dr. Smith',
      enrolledStudents: 45,
      totalLessons: 24,
      completedLessons: 18,
      status: 'active',
      duration: '16 weeks',
      level: 'Advanced',
      category: 'Mathematics',
      completionRate: 85,
      avgGrade: 'B+',
      nextClass: '2024-01-15 10:00 AM'
    },
    {
      id: 2,
      title: 'Environmental Science',
      description: 'Study of environmental systems, ecology, and sustainability',
      instructor: 'Prof. Johnson',
      enrolledStudents: 32,
      totalLessons: 20,
      completedLessons: 12,
      status: 'active',
      duration: '12 weeks',
      level: 'Intermediate',
      category: 'Science',
      completionRate: 78,
      avgGrade: 'A-',
      nextClass: '2024-01-16 2:00 PM'
    },
    {
      id: 3,
      title: 'World History',
      description: 'Exploration of major historical events and civilizations',
      instructor: 'Ms. Davis',
      enrolledStudents: 38,
      totalLessons: 18,
      completedLessons: 18,
      status: 'completed',
      duration: '14 weeks',
      level: 'Beginner',
      category: 'History',
      completionRate: 92,
      avgGrade: 'A',
      nextClass: null
    },
    {
      id: 4,
      title: 'Creative Writing',
      description: 'Develop writing skills through various creative exercises',
      instructor: 'Mr. Wilson',
      enrolledStudents: 28,
      totalLessons: 16,
      completedLessons: 8,
      status: 'active',
      duration: '10 weeks',
      level: 'Intermediate',
      category: 'Literature',
      completionRate: 68,
      avgGrade: 'B',
      nextClass: '2024-01-17 11:00 AM'
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || course.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { title: 'Total Courses', value: '85', change: '+8%', icon: BookOpen },
    { title: 'Active Courses', value: '72', change: '+12%', icon: TrendingUp },
    { title: 'Total Enrollments', value: '2,450', change: '+15%', icon: Users },
    { title: 'Completion Rate', value: '89%', change: '+5%', icon: Award }
  ];

  const categories = ['Mathematics', 'Science', 'History', 'Literature', 'Art', 'Music', 'Physical Education'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Course Management
            </h1>
            <p className="text-gray-600 mt-1">Create and manage courses, curriculum, and learning materials</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate('/platform/esm/courses/templates')}>
              Course Templates
            </Button>
            <Button onClick={() => navigate('/platform/esm/courses/create')}>
              <Plus className="h-4 w-4 mr-2" />
              Create Course
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
            <Card key={stat.title} className="border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="mt-1">
                      {stat.change}
                    </Badge>
                  </div>
                  <stat.icon className="h-8 w-8 text-green-500" />
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
                placeholder="Search courses..."
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
              All Courses
            </Button>
          </div>
        </motion.div>

        {/* Courses Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-200 group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <Badge 
                        variant={course.status === 'active' ? 'default' : 'secondary'}
                        className="mb-2"
                      >
                        {course.status}
                      </Badge>
                      <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{course.description}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/platform/esm/courses/${course.id}`)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/platform/esm/courses/${course.id}/edit`)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {/* Instructor and Category */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Instructor: {course.instructor}</span>
                      <Badge variant="outline" className="text-xs">{course.category}</Badge>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{Math.round((course.completedLessons / course.totalLessons) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ width: `${(course.completedLessons / course.totalLessons) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{course.enrolledStudents} students</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-400" />
                        <span>{course.totalLessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-gray-400" />
                        <span>{course.avgGrade}</span>
                      </div>
                    </div>

                    {/* Next Class */}
                    {course.nextClass && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-blue-600" />
                          <span className="font-medium text-blue-900">Next Class:</span>
                          <span className="text-blue-700">{course.nextClass}</span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/platform/esm/courses/${course.id}/content`)}
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Content
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => navigate(`/platform/esm/courses/${course.id}/discussions`)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Discuss
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Course Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/platform/esm/courses/category/${category.toLowerCase()}`)}
                    className="hover:bg-green-50 hover:border-green-300"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseManagement;
