
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Search, 
  Plus, 
  Filter,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const StudentManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock student data
  const students = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+1 (555) 123-4567',
      grade: 'Grade 10',
      status: 'active',
      enrolledCourses: 6,
      completedAssignments: 45,
      avgGrade: 'A-',
      lastActivity: '2 hours ago',
      avatar: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Sarah Smith',
      email: 'sarah.smith@email.com',
      phone: '+1 (555) 234-5678',
      grade: 'Grade 11',
      status: 'active',
      enrolledCourses: 7,
      completedAssignments: 52,
      avgGrade: 'A+',
      lastActivity: '1 hour ago',
      avatar: '/placeholder.svg'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.johnson@email.com',
      phone: '+1 (555) 345-6789',
      grade: 'Grade 9',
      status: 'inactive',
      enrolledCourses: 5,
      completedAssignments: 32,
      avgGrade: 'B+',
      lastActivity: '2 days ago',
      avatar: '/placeholder.svg'
    },
    {
      id: 4,
      name: 'Emily Brown',
      email: 'emily.brown@email.com',
      phone: '+1 (555) 456-7890',
      grade: 'Grade 12',
      status: 'active',
      enrolledCourses: 8,
      completedAssignments: 67,
      avgGrade: 'A',
      lastActivity: '30 minutes ago',
      avatar: '/placeholder.svg'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || student.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { title: 'Total Students', value: '1,250', change: '+12%', icon: Users },
    { title: 'Active Students', value: '1,180', change: '+8%', icon: TrendingUp },
    { title: 'New Enrollments', value: '45', change: '+25%', icon: Plus },
    { title: 'Graduation Rate', value: '96%', change: '+2%', icon: Award }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Student Management
            </h1>
            <p className="text-gray-600 mt-1">Manage student profiles, enrollments, and progress</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate('/platform/esm/students/import')}>
              Import Students
            </Button>
            <Button onClick={() => navigate('/platform/esm/students/add')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
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
            <Card key={stat.title} className="border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <Badge variant="secondary" className="mt-1">
                      {stat.change}
                    </Badge>
                  </div>
                  <stat.icon className="h-8 w-8 text-blue-500" />
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
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button variant="outline" onClick={() => setSelectedFilter('active')}>
              <Filter className="h-4 w-4 mr-2" />
              Active
            </Button>
            <Button variant="outline" onClick={() => setSelectedFilter('inactive')}>
              <Filter className="h-4 w-4 mr-2" />
              Inactive
            </Button>
            <Button variant="outline" onClick={() => setSelectedFilter('all')}>
              All Students
            </Button>
          </div>
        </motion.div>

        {/* Students List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Students ({filteredStudents.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="font-semibold">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.email}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {student.grade}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {student.enrolledCourses} courses
                          </span>
                          <Badge 
                            variant={student.status === 'active' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {student.status}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold">Avg Grade: {student.avgGrade}</p>
                        <p className="text-xs text-gray-500">{student.completedAssignments} assignments</p>
                        <p className="text-xs text-gray-400">Last activity: {student.lastActivity}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/platform/esm/students/${student.id}`)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => navigate(`/platform/esm/students/${student.id}/edit`)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentManagement;
