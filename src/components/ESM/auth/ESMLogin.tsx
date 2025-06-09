
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  User, 
  Lock, 
  ChevronDown,
  Shield,
  Users,
  BookOpen,
  Home,
  Settings,
  Loader2
} from 'lucide-react';

type UserRole = 'admin' | 'teacher' | 'student' | 'parent' | 'staff';

const ESMLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: '' as UserRole | ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const roles = [
    { 
      value: 'admin' as UserRole, 
      label: 'Administrator', 
      icon: Shield, 
      color: 'from-red-500 to-pink-600',
      description: 'Full system access'
    },
    { 
      value: 'teacher' as UserRole, 
      label: 'Teacher/Staff', 
      icon: GraduationCap, 
      color: 'from-blue-500 to-indigo-600',
      description: 'Manage classes and students'
    },
    { 
      value: 'student' as UserRole, 
      label: 'Student', 
      icon: BookOpen, 
      color: 'from-green-500 to-emerald-600',
      description: 'Access learning materials'
    },
    { 
      value: 'parent' as UserRole, 
      label: 'Parent/Guardian', 
      icon: Home, 
      color: 'from-purple-500 to-violet-600',
      description: 'Monitor child progress'
    },
    { 
      value: 'staff' as UserRole, 
      label: 'Administrative Staff', 
      icon: Users, 
      color: 'from-orange-500 to-red-500',
      description: 'Administrative functions'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.username || !credentials.password || !credentials.role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields including role selection",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      // Mock authentication - in real app, this would call your auth API
      const mockUsers = {
        'admin': { username: 'admin', role: 'admin', name: 'System Administrator' },
        'teacher': { username: 'teacher', role: 'teacher', name: 'John Smith' },
        'student': { username: 'student', role: 'student', name: 'Alice Johnson' },
        'parent': { username: 'parent', role: 'parent', name: 'Mary Brown' },
        'staff': { username: 'staff', role: 'staff', name: 'David Wilson' }
      };

      const user = mockUsers[credentials.username as keyof typeof mockUsers];
      
      if (user && user.role === credentials.role) {
        // Store user data in localStorage
        localStorage.setItem('esm_user', JSON.stringify(user));
        
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.name}!`
        });

        // Navigate to role-specific dashboard
        navigate(`/platform/esm/dashboard/${credentials.role}`);
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid credentials or role mismatch",
          variant: "destructive"
        });
      }
      
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4"
            >
              <GraduationCap className="h-10 w-10 text-white" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-white">EduSmart Login</CardTitle>
            <p className="text-white/70">Access your educational portal</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label className="text-white">Select Role</Label>
                <Select value={credentials.role} onValueChange={(value: UserRole) => setCredentials(prev => ({ ...prev, role: value }))}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value} className="text-white hover:bg-slate-700">
                        <div className="flex items-center gap-3">
                          <div className={`p-1 rounded bg-gradient-to-r ${role.color}`}>
                            <role.icon className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-xs text-gray-400">{role.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="bg-blue-500/20 rounded-lg p-3 border border-blue-500/30">
                <p className="text-white/80 text-sm font-medium mb-2">Demo Credentials:</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-white/70">
                    <div>Admin: admin/admin</div>
                    <div>Teacher: teacher/teacher</div>
                    <div>Student: student/student</div>
                  </div>
                  <div className="text-white/70">
                    <div>Parent: parent/parent</div>
                    <div>Staff: staff/staff</div>
                  </div>
                </div>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  'Sign In to EduSmart'
                )}
              </Button>

              {/* Additional Options */}
              <div className="text-center space-y-2">
                <Button variant="link" className="text-blue-400 hover:text-blue-300 text-sm">
                  Forgot Password?
                </Button>
                <div className="text-white/60 text-sm">
                  Need access? Contact your administrator
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ESMLogin;
