
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ESMDashboard from './ESMDashboard';
import StudentManagement from './StudentManagement';
import CourseManagement from './CourseManagement';
import ActivityManagement from './ActivityManagement';
import SplashScreen from './onboarding/SplashScreen';
import RoleSelection from './onboarding/RoleSelection';
import SignUpForm from './onboarding/SignUpForm';
import MFAScreen from './onboarding/MFAScreen';
import ProfileSetup from './onboarding/ProfileSetup';

const ESMRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ESMDashboard />} />
      <Route path="/students" element={<StudentManagement />} />
      <Route path="/students/*" element={<StudentManagement />} />
      <Route path="/courses" element={<CourseManagement />} />
      <Route path="/courses/*" element={<CourseManagement />} />
      <Route path="/activities" element={<ActivityManagement />} />
      <Route path="/activities/*" element={<ActivityManagement />} />
      <Route path="/reports" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Reports Dashboard Coming Soon</h1></div>} />
      <Route path="/settings" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">ESM Settings Coming Soon</h1></div>} />
      <Route path="/schedule" element={<div className="p-8 text-center"><h1 className="text-2xl font-bold">Class Scheduler Coming Soon</h1></div>} />
      
      {/* Onboarding Routes */}
      <Route path="/splash" element={<SplashScreen />} />
      <Route path="/onboarding/role-selection" element={<RoleSelection />} />
      <Route path="/onboarding/signup/:role" element={<SignUpForm />} />
      <Route path="/onboarding/mfa" element={<MFAScreen />} />
      <Route path="/onboarding/profile-setup" element={<ProfileSetup />} />
      <Route path="/onboarding/profile-setup/:role" element={<ProfileSetup />} />
    </Routes>
  );
};

export default ESMRouter;
