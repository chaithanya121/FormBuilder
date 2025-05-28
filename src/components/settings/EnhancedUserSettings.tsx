
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, User, Mail, Key, LogOut, CreditCard, Bell, Shield, Palette } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";
import { authApi } from "@/services/api/auth";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";

export function EnhancedUserSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, updateUser, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  // Mock subscription data
  const [subscriptionData] = useState({
    plan: "Professional",
    status: "Active",
    nextBilling: "December 25, 2024",
    amount: "$54.00/month"
  });

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAvatarPreview(user.avatar);
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    if (!name || !email) {
      toast({
        title: "Error",
        description: "Name and email are required",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await updateUser({
        name,
        email,
        avatar: avatarPreview
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Error",
        description: "All password fields are required",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await authApi.changePassword(currentPassword, newPassword);
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title: "Error",
        description: "Failed to update password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
    navigate("/");
  };

  return (
    <div className={`min-h-screen ${theme === 'light' 
      ? 'bg-gradient-to-br from-gray-50 to-blue-50' 
      : 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
    } p-4`}>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className={`text-3xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Account Settings
          </h1>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Manage your account settings and preferences
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/80 border-gray-200 shadow-lg' 
              : 'bg-gray-800/50 border-gray-700 shadow-xl'
            } backdrop-blur-sm p-6`}>
              <div className="flex items-center space-x-3 mb-6">
                <User className={`h-5 w-5 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`} />
                <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Profile Information
                </h2>
              </div>
              
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 mb-3">
                  <div className={`w-24 h-24 rounded-full overflow-hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'} flex items-center justify-center border-2 ${theme === 'light' ? 'border-gray-200' : 'border-gray-600'}`}>
                    {avatarPreview ? (
                      <img 
                        src={avatarPreview} 
                        alt="User avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className={`h-12 w-12 ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}`} />
                    )}
                  </div>
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute -bottom-1 -right-1 bg-blue-600 hover:bg-blue-700 rounded-full p-2 cursor-pointer transition-colors"
                  >
                    <Upload className="h-4 w-4 text-white" />
                  </label>
                  <input 
                    id="avatar-upload" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleAvatarChange}
                  />
                </div>
                <p className={`text-sm ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                  Click to upload a new avatar
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`mt-1 ${theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900' 
                      : 'bg-gray-700 border-gray-600 text-white'
                    }`}
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-1 ${theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900' 
                      : 'bg-gray-700 border-gray-600 text-white'
                    }`}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleProfileUpdate} 
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Card>
          </motion.div>

          {/* Subscription Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/80 border-gray-200 shadow-lg' 
              : 'bg-gray-800/50 border-gray-700 shadow-xl'
            } backdrop-blur-sm p-6 mb-6`}>
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className={`h-5 w-5 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`} />
                <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Subscription
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Current Plan</span>
                  <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {subscriptionData.plan}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Status</span>
                  <span className="font-medium text-green-600">{subscriptionData.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Next Billing</span>
                  <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {subscriptionData.nextBilling}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>Amount</span>
                  <span className={`font-medium ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                    {subscriptionData.amount}
                  </span>
                </div>
              </div>
              
              <Button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white">
                Manage Subscription
              </Button>
            </Card>

            {/* Theme Settings */}
            <Card className={`${theme === 'light' 
              ? 'bg-white/80 border-gray-200 shadow-lg' 
              : 'bg-gray-800/50 border-gray-700 shadow-xl'
            } backdrop-blur-sm p-6`}>
              <div className="flex items-center space-x-3 mb-6">
                <Palette className={`h-5 w-5 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Appearance
                </h2>
              </div>
              
              <div className="space-y-4">
                <Label className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                  Theme Preference
                </Label>
                <div className="flex space-x-4">
                  <Button
                    variant={theme === 'light' ? 'default' : 'outline'}
                    onClick={() => setTheme('light')}
                    className="flex-1"
                  >
                    Light
                  </Button>
                  <Button
                    variant={theme === 'dark' ? 'default' : 'outline'}
                    onClick={() => setTheme('dark')}
                    className="flex-1"
                  >
                    Dark
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/80 border-gray-200 shadow-lg' 
              : 'bg-gray-800/50 border-gray-700 shadow-xl'
            } backdrop-blur-sm p-6`}>
              <div className="flex items-center space-x-3 mb-6">
                <Shield className={`h-5 w-5 ${theme === 'light' ? 'text-red-600' : 'text-red-400'}`} />
                <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Security
                </h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="current-password" className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                    Current Password
                  </Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className={`mt-1 ${theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900' 
                      : 'bg-gray-700 border-gray-600 text-white'
                    }`}
                    disabled={isLoading}
                    placeholder="Enter current password"
                  />
                </div>
                
                <div>
                  <Label htmlFor="new-password" className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`mt-1 ${theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900' 
                      : 'bg-gray-700 border-gray-600 text-white'
                    }`}
                    disabled={isLoading}
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirm-password" className={theme === 'light' ? 'text-gray-700' : 'text-gray-300'}>
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`mt-1 ${theme === 'light' 
                      ? 'bg-white border-gray-300 text-gray-900' 
                      : 'bg-gray-700 border-gray-600 text-white'
                    }`}
                    disabled={isLoading}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <Button 
                onClick={handlePasswordChange} 
                className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </Card>
          </motion.div>

          {/* Account Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className={`${theme === 'light' 
              ? 'bg-white/80 border-gray-200 shadow-lg' 
              : 'bg-gray-800/50 border-gray-700 shadow-xl'
            } backdrop-blur-sm p-6`}>
              <div className="flex items-center space-x-3 mb-6">
                <LogOut className={`h-5 w-5 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`} />
                <h2 className={`text-xl font-semibold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                  Account Actions
                </h2>
              </div>
              
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className={`w-full ${theme === 'light' 
                    ? 'border-gray-300 text-gray-700 hover:bg-gray-50' 
                    : 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => navigate('/dashboard')}
                >
                  Back to Dashboard
                </Button>
                
                <Button 
                  variant="destructive" 
                  className="w-full" 
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
