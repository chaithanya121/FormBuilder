
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ESMDashboard from './ESMDashboard';
import StudentManagement from './StudentManagement';
import CourseManagement from './CourseManagement';
import ActivityManagement from './ActivityManagement';
import SplashScreen from './onboarding/SplashScreen';
import RoleSelection from './onboarding/RoleSelection';
import SignUpForm from './onboarding/SignUpForm';
import MFAScreen from './onboarding/MFAScreen';
import ProfileSetup from './onboarding/ProfileSetup';
import ESMLogin from './auth/ESMLogin';
import AdminDashboard from './dashboards/AdminDashboard';
import TeacherDashboard from './dashboards/TeacherDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const user = JSON.parse(localStorage.getItem('esm_user') || 'null');
  
  if (!user) {
    return <Navigate to="/platform/esm/login" replace />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/platform/esm/unauthorized" replace />;
  }
  
  return <>{children}</>;
};

const ESMRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<ESMLogin />} />
      <Route path="/unauthorized" element={
        <div className="min-h-screen flex items-center justify-center bg-red-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this resource.</p>
          </div>
        </div>
      } />
      
      {/* Role-based Dashboard Routes */}
      <Route path="/dashboard/admin" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/teacher" element={
        <ProtectedRoute allowedRoles={['teacher', 'staff']}>
          <TeacherDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/student" element={
        <ProtectedRoute allowedRoles={['student']}>
          <div className="min-h-screen flex items-center justify-center bg-green-50">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-green-600 mb-4">Student Dashboard</h1>
              <p className="text-gray-600">Welcome to your learning portal!</p>
            </div>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/parent" element={
        <ProtectedRoute allowedRoles={['parent']}>
          <div className="min-h-screen flex items-center justify-center bg-purple-50">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-purple-600 mb-4">Parent Dashboard</h1>
              <p className="text-gray-600">Monitor your child's academic progress!</p>
            </div>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/dashboard/staff" element={
        <ProtectedRoute allowedRoles={['staff', 'admin']}>
          <div className="min-h-screen flex items-center justify-center bg-orange-50">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-orange-600 mb-4">Staff Dashboard</h1>
              <p className="text-gray-600">Administrative tools and functions!</p>
            </div>
          </div>
        </ProtectedRoute>
      } />

      {/* Protected Routes */}
      <Route path="/students" element={
        <ProtectedRoute>
          <StudentManagement />
        </ProtectedRoute>
      } />
      <Route path="/students/*" element={
        <ProtectedRoute>
          <StudentManagement />
        </ProtectedRoute>
      } />
      <Route path="/courses" element={
        <ProtectedRoute>
          <CourseManagement />
        </ProtectedRoute>
      } />
      <Route path="/courses/*" element={
        <ProtectedRoute>
          <CourseManagement />
        </ProtectedRoute>
      } />
      <Route path="/activities" element={
        <ProtectedRoute>
          <ActivityManagement />
        </ProtectedRoute>
      } />
      <Route path="/activities/*" element={
        <ProtectedRoute>
          <ActivityManagement />
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold">Reports Dashboard Coming Soon</h1>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/settings" element={
        <ProtectedRoute>
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold">ESM Settings Coming Soon</h1>
          </div>
        </ProtectedRoute>
      } />
      <Route path="/schedule" element={
        <ProtectedRoute>
          <div className="p-8 text-center">
            <h1 className="text-2xl font-bold">Class Scheduler Coming Soon</h1>
          </div>
        </ProtectedRoute>
      } />
      
      {/* Onboarding Routes */}
      <Route path="/splash" element={<SplashScreen />} />
      <Route path="/onboarding/role-selection" element={<RoleSelection />} />
      <Route path="/onboarding/signup/:role" element={<SignUpForm />} />
      <Route path="/onboarding/mfa" element={<MFAScreen />} />
      <Route path="/onboarding/profile-setup" element={<ProfileSetup />} />
      <Route path="/onboarding/profile-setup/:role" element={<ProfileSetup />} />
      
      {/* Default Route - Check if user is logged in */}
      <Route path="/" element={
        (() => {
          const user = JSON.parse(localStorage.getItem('esm_user') || 'null');
          if (user) {
            return <Navigate to={`/platform/esm/dashboard/${user.role}`} replace />;
          }
          return <Navigate to="/platform/esm/login" replace />;
        })()
      } />
    </Routes>
  );
};

export default ESMRouter;
