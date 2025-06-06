
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Submissions: React.FC = () => {
  const submissions = [
    {
      id: 1,
      formName: 'Contact Form',
      submittedAt: '2024-01-15',
      status: 'new',
      email: 'user@example.com'
    },
    {
      id: 2,
      formName: 'Newsletter Signup',
      submittedAt: '2024-01-14',
      status: 'reviewed',
      email: 'subscriber@example.com'
    },
    {
      id: 3,
      formName: 'Support Request',
      submittedAt: '2024-01-13',
      status: 'resolved',
      email: 'help@example.com'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'reviewed': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Form Submissions</h1>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export All
        </Button>
      </div>

      <div className="space-y-4">
        {submissions.map((submission) => (
          <Card key={submission.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h3 className="font-semibold">{submission.formName}</h3>
                  <p className="text-sm text-gray-600">{submission.email}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {submission.submittedAt}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(submission.status)}>
                    {submission.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Submissions;
