
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Home,
  ChevronRight,
  Sparkles,
  BarChart3,
  MessageCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type UserRole = 'teacher' | 'student' | 'parent';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: 'teacher' as UserRole,
      title: 'Teacher',
      description: 'Create classes, manage students, and deliver engaging lessons',
      icon: GraduationCap,
      color: 'from-blue-500 to-indigo-600',
      features: ['Live Classes', 'AI Grading', 'Analytics', 'Whiteboard'],
      badge: 'Most Popular'
    },
    {
      id: 'student' as UserRole,
      title: 'Student',
      description: 'Join classes, submit assignments, and track your progress',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-600',
      features: ['Interactive Learning', 'AI Assistant', 'Progress Tracking', 'Note Taking'],
      badge: null
    },
    {
      id: 'parent' as UserRole,
      title: 'Parent',
      description: 'Monitor your child\'s progress and stay connected with teachers',
      icon: Home,
      color: 'from-purple-500 to-pink-600',
      features: ['Progress Reports', 'Teacher Meetings', 'Attendance', 'Grade Tracking'],
      badge: null
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      navigate(`/platform/esm/onboarding/signup/${selectedRole}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Role</h1>
          <p className="text-xl text-white/70">Select how you'll be using EduSmart</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 ${
                  selectedRole === role.id 
                    ? 'ring-2 ring-white bg-white/10 backdrop-blur-lg border-white/30' 
                    : 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                }`}
                onClick={() => handleRoleSelect(role.id)}
              >
                <CardHeader className="text-center pb-4">
                  {role.badge && (
                    <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      {role.badge}
                    </Badge>
                  )}
                  <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center mb-4 relative`}>
                    <role.icon className="h-8 w-8 text-white" />
                    {selectedRole === role.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <Sparkles className="h-3 w-3 text-white" />
                      </motion.div>
                    )}
                  </div>
                  <CardTitle className="text-white text-xl">{role.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-center mb-6">{role.description}</p>
                  <div className="space-y-2">
                    {role.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-white/60">
                        <ChevronRight className="h-4 w-4 text-green-400" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ${
              selectedRole
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg transform hover:scale-105'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continue as {selectedRole ? roles.find(r => r.id === selectedRole)?.title : 'User'}
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;
