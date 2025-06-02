
import React from 'react';
import { useAppSelector } from '@/hooks/redux';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, User, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const { forms } = useAppSelector((state) => state.forms);

  const quickActions = [
    {
      title: 'Create New Form',
      description: 'Build a custom form from scratch',
      icon: Plus,
      action: () => navigate('/create'),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      title: 'View Forms',
      description: 'Manage your existing forms',
      icon: FileText,
      action: () => navigate('/forms'),
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      title: 'Profile',
      description: 'Update your profile settings',
      icon: User,
      action: () => navigate('/profile'),
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      title: 'Settings',
      description: 'Configure your preferences',
      icon: Settings,
      action: () => navigate('/settings'),
      color: 'bg-gray-500 hover:bg-gray-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name || 'User'}!
          </h1>
          <p className="text-gray-600">
            Here's what you can do today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Forms</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{forms?.length || 0}</div>
              <p className="text-xs text-muted-foreground">
                Forms created
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Forms</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {forms?.filter(form => form.published === true).length || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently published
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Submissions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">
                Total responses
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`w-12 h-12 rounded-lg ${action.color} text-white flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {action.description}
                    </p>
                    <Button 
                      onClick={action.action}
                      variant="outline" 
                      size="sm"
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Forms */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Forms
          </h2>
          <Card>
            <CardContent className="p-6">
              {forms && forms.length > 0 ? (
                <div className="space-y-4">
                  {forms.slice(0, 5).map((form, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{form.name}</h3>
                        <p className="text-sm text-gray-600">
                          Created {new Date(form.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/form-builder/${form.primary_id}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No forms yet
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get started by creating your first form
                  </p>
                  <Button onClick={() => navigate('/create')}>
                    Create Your First Form
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
