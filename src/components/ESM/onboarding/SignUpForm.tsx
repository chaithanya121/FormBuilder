
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  School, 
  BookOpen, 
  Users,
  Shield,
  Eye,
  EyeOff,
  CheckCircle
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

type UserRole = 'teacher' | 'student' | 'parent';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  // Teacher specific
  schoolId?: string;
  subject?: string;
  // Student specific
  grade?: string;
  classCode?: string;
  // Parent specific
  childStudentId?: string;
}

const SignUpForm = () => {
  const { role } = useParams<{ role: UserRole }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const subjects = [
    'Mathematics', 'Science', 'English', 'History', 'Geography', 
    'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Art'
  ];

  const grades = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
    'Grade 11', 'Grade 12'
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSSOLogin = (provider: 'google' | 'microsoft') => {
    console.log(`Logging in with ${provider}`);
    // Implement SSO logic here
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/platform/esm/onboarding/mfa');
    }, 2000);
  };

  const getRoleConfig = () => {
    switch (role) {
      case 'teacher':
        return {
          title: 'Teacher Registration',
          icon: School,
          color: 'from-blue-500 to-indigo-600',
          fields: ['schoolId', 'subject']
        };
      case 'student':
        return {
          title: 'Student Registration',
          icon: BookOpen,
          color: 'from-green-500 to-emerald-600',
          fields: ['grade', 'classCode']
        };
      case 'parent':
        return {
          title: 'Parent Registration',
          icon: Users,
          color: 'from-purple-500 to-pink-600',
          fields: ['childStudentId']
        };
      default:
        return {
          title: 'Registration',
          icon: User,
          color: 'from-gray-500 to-gray-600',
          fields: []
        };
    }
  };

  const config = getRoleConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 flex items-center justify-center">
      <Card className="max-w-md w-full bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="text-center">
          <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${config.color} flex items-center justify-center mb-4`}>
            <config.icon className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">{config.title}</CardTitle>
          <div className="flex justify-center gap-2 mt-4">
            <Badge variant={step === 1 ? "default" : "secondary"}>1. Basic Info</Badge>
            <Badge variant={step === 2 ? "default" : "secondary"}>2. Role Specific</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {step === 1 ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {/* SSO Buttons */}
                <div className="space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => handleSSOLogin('google')}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                    onClick={() => handleSSOLogin('microsoft')}
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"/>
                    </svg>
                    Continue with Microsoft
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-transparent px-2 text-white/60">Or continue with email</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                      <Input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="John"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white">Last Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                      <Input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-white/60 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-white/60 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                {role === 'teacher' && (
                  <>
                    <div>
                      <Label htmlFor="schoolId" className="text-white">School ID</Label>
                      <div className="relative">
                        <School className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                        <Input
                          id="schoolId"
                          type="text"
                          value={formData.schoolId || ''}
                          onChange={(e) => handleInputChange('schoolId', e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="SCH001"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-white">Subject</Label>
                      <Select onValueChange={(value) => handleInputChange('subject', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select your subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map((subject) => (
                            <SelectItem key={subject} value={subject.toLowerCase()}>
                              {subject}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {role === 'student' && (
                  <>
                    <div>
                      <Label htmlFor="grade" className="text-white">Grade</Label>
                      <Select onValueChange={(value) => handleInputChange('grade', value)}>
                        <SelectTrigger className="bg-white/10 border-white/20 text-white">
                          <SelectValue placeholder="Select your grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {grades.map((grade) => (
                            <SelectItem key={grade} value={grade.toLowerCase()}>
                              {grade}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="classCode" className="text-white">Class Code</Label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                        <Input
                          id="classCode"
                          type="text"
                          value={formData.classCode || ''}
                          onChange={(e) => handleInputChange('classCode', e.target.value)}
                          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                          placeholder="CLS001"
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {role === 'parent' && (
                  <div>
                    <Label htmlFor="childStudentId" className="text-white">Child's Student ID</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-white/60" />
                      <Input
                        id="childStudentId"
                        type="text"
                        value={formData.childStudentId || ''}
                        onChange={(e) => handleInputChange('childStudentId', e.target.value)}
                        className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                        placeholder="STU001"
                        required
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </div>
              ) : step === 1 ? (
                'Continue'
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
