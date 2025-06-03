
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity, Users, Eye, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RealtimeEvent {
  id: string;
  type: 'view' | 'start' | 'submit' | 'abandon';
  formName: string;
  user: string;
  timestamp: Date;
  location?: string;
}

const RealtimeTracker: React.FC = () => {
  const [events, setEvents] = useState<RealtimeEvent[]>([]);
  const [stats, setStats] = useState({
    activeUsers: 12,
    currentViews: 8,
    submissionsToday: 23,
    averageTime: '2m 34s'
  });

  useEffect(() => {
    // Simulate real-time events
    const interval = setInterval(() => {
      const newEvent: RealtimeEvent = {
        id: Date.now().toString(),
        type: ['view', 'start', 'submit', 'abandon'][Math.floor(Math.random() * 4)] as any,
        formName: ['Contact Form', 'Registration', 'Feedback', 'Survey'][Math.floor(Math.random() * 4)],
        user: `user_${Math.floor(Math.random() * 1000)}`,
        timestamp: new Date(),
        location: ['New York', 'London', 'Tokyo', 'Sydney'][Math.floor(Math.random() * 4)]
      };

      setEvents(prev => [newEvent, ...prev.slice(0, 9)]);
      
      // Update stats randomly
      setStats(prev => ({
        ...prev,
        activeUsers: Math.floor(Math.random() * 20) + 5,
        currentViews: Math.floor(Math.random() * 15) + 3
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'view': return <Eye className="h-4 w-4" />;
      case 'start': return <Activity className="h-4 w-4" />;
      case 'submit': return <Users className="h-4 w-4" />;
      case 'abandon': return <Clock className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'view': return 'bg-blue-100 text-blue-700';
      case 'start': return 'bg-green-100 text-green-700';
      case 'submit': return 'bg-purple-100 text-purple-700';
      case 'abandon': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Active Users</span>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.activeUsers}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-600">Current Views</span>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.currentViews}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-500" />
            <span className="text-sm text-gray-600">Today's Submissions</span>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.submissionsToday}</p>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-gray-600">Avg. Time</span>
          </div>
          <p className="text-2xl font-bold mt-1">{stats.averageTime}</p>
        </Card>
      </div>

      {/* Live Events */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-semibold">Live Activity</h3>
        </div>
        
        <div className="space-y-2 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Badge className={getEventColor(event.type)}>
                    {getEventIcon(event.type)}
                    <span className="ml-1 capitalize">{event.type}</span>
                  </Badge>
                  <div>
                    <p className="font-medium">{event.formName}</p>
                    <p className="text-sm text-gray-600">{event.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {event.timestamp.toLocaleTimeString()}
                  </p>
                  {event.location && (
                    <p className="text-xs text-gray-400">{event.location}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
};

export default RealtimeTracker;
