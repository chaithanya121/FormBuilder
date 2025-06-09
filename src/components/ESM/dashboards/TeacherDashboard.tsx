
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  BookOpen, 
  Calendar,
  ClipboardList,
  MessageSquare,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  Award,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'My Classes', value: '8', change: '+2 new', icon: BookOpen, color: 'from-blue-500 to-cyan-400' },
    { title: 'Total Students', value: '245', change: '+12 enrolled', icon: Users, color: 'from-emerald-500 to-green-400' },
    { title: 'Pending Assignments', value: '15', change: '3 due today', icon: ClipboardList, color: 'from-orange-500 to-red-400' },
    { title: 'Attendance Rate', value: '94%', change: '+2% this week', icon: CheckCircle, color: 'from-purple-500 to-violet-400' }
  ];

  const myClasses = [
    { name: 'Mathematics - Grade 10', students: 32, schedule: 'Mon, Wed, Fri - 9:00 AM', room: 'Room 101' },
    { name: 'Physics - Grade 11', students: 28, schedule: 'Tue, Thu - 10:30 AM', room: 'Lab 201' },
    { name: 'Calculus - Grade 12', students: 24, schedule: 'Mon, Wed, Fri - 2:00 PM', room: 'Room 305' }
  ];

  const todaySchedule = [
    { time: '9:00 AM', subject: 'Mathematics', class: 'Grade 10-A', room: 'Room 101', type: 'Regular Class' },
    { time: '10:30 AM', subject: 'Physics', class: 'Grade 11-B', room: 'Lab 201', type: 'Lab Session' },
    { time: '2:00 PM', subject: 'Calculus', class: 'Grade 12-A', room: 'Room 305', type: 'Regular Class' },
    { time: '3:30 PM', subject: 'Math Club', class: 'All Grades', room: 'Room 101', type: 'Extra Activity' }
  ];

  const recentActivities = [
    { type: 'assignment', student: 'Alice Johnson', action: 'submitted Physics Lab Report', time: '30 minutes ago' },
    { type: 'attendance', class: 'Grade 10-A', action: 'marked attendance for Math class', time: '2 hours ago' },
    { type: 'grade', student: 'Bob Smith', action: 'graded Calculus homework', time: '3 hours ago' },
    { type: 'message', parent: 'Mrs. Brown', action: 'sent message about Sarah\'s progress', time: '5 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Teacher Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Manage your classes, students, and academic activities</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-blue-100 text-blue-800 border-blue-300">Active Classes: 3</Badge>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Messages (5)
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-5`} />
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <Badge variant="secondary" className="mt-2 text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                    <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classes">My Classes</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaySchedule.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-blue-50 transition-colors">
                        <div className="text-center">
                          <div className="text-sm font-medium">{item.time}</div>
                          <div className="text-xs text-gray-500">{item.room}</div>
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{item.subject}</div>
                          <div className="text-sm text-gray-600">{item.class}</div>
                          <Badge variant="outline" className="text-xs mt-1">{item.type}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activities */}
              <Card className="shadow-lg border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 rounded-full bg-blue-100">
                          <Users className="h-3 w-3 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.student || activity.class || activity.parent}</p>
                          <p className="text-sm text-gray-600">{activity.action}</p>
                          <p className="text-xs text-gray-400">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myClasses.map((classItem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-blue-100">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{classItem.name}</h3>
                          <Badge variant="secondary">{classItem.students} students</Badge>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {classItem.schedule}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {classItem.room}
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <Button size="sm" variant="outline">View Students</Button>
                        <Button size="sm">Take Attendance</Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Class Schedule</h3>
                  <p className="text-gray-600 mb-6">View and manage your weekly teaching schedule</p>
                  <Button>View Full Schedule</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">My Students</h3>
                  <p className="text-gray-600 mb-6">View student profiles, grades, and progress</p>
                  <Button>View All Students</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Academic Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">Class Reports</h3>
                  <p className="text-gray-600 mb-6">Generate reports on student performance and attendance</p>
                  <Button>View Reports</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;
