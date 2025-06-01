
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTheme } from '@/components/theme-provider';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save,
  ChevronRight,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProfilePage = () => {
  const { theme } = useTheme();
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Passionate developer and form builder enthusiast.',
    avatar: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    console.log('Saving profile:', profile);
    // Implement save functionality
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-6`}>
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumbs */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <Link to="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <Home className="h-4 w-4" />
            Home
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-900 dark:text-white">Profile</span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-2`}>
            Profile Settings
          </h1>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Manage your account information and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Picture */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Profile Picture
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative inline-block mb-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {profile.firstName[0]}{profile.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute bottom-0 right-0 rounded-full w-10 h-10 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                  Upload a new profile picture
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/90 border-white/50 shadow-xl' 
              : 'bg-gray-800/50 border-gray-700 shadow-2xl'
            } backdrop-blur-sm`}>
              <CardHeader>
                <CardTitle className={`${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className={theme === 'light' ? 'bg-white' : 'bg-gray-700'}
                    rows={4}
                  />
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
