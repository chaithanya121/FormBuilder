
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { fetchForms } from '@/store/slices/formsSlice';
import { fetchResumes } from '@/store/slices/resumeSlice';
import { getPlatform } from '@/store/slices/platformSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, User, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { forms, loading: formsLoading } = useAppSelector((state) => state.forms);
  const { resumes, loading: resumesLoading } = useAppSelector((state) => state.resumes);
  const { platform, loading: platformLoading } = useAppSelector((state) => state.platform);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Fetch all data when component mounts
    dispatch(fetchForms());
    dispatch(fetchResumes());
    dispatch(getPlatform());
  }, [dispatch]);

  const handleCreateForm = () => {
    navigate('/create');
  };

  const handleCreateResume = () => {
    navigate('/platform/resume');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.first_name || 'User'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your projects today.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formsLoading ? '...' : forms.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {resumesLoading ? '...' : resumes.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Platforms Available</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {platformLoading ? '...' : Array.isArray(platform) ? platform.length : 6}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Create New Form</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Build custom forms with our drag-and-drop builder.
              </p>
              <Button onClick={handleCreateForm} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Form
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create New Resume</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Design professional resumes with modern templates.
              </p>
              <Button onClick={handleCreateResume} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create Resume
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Forms */}
        {forms.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Recent Forms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {forms.slice(0, 6).map((form) => (
                <Card key={form.primary_id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="font-medium">{form.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {form.submissions || 0} submissions
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Updated {new Date(form.last_modified).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
