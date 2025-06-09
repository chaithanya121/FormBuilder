
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Smartphone, 
  Mail, 
  RefreshCw,
  CheckCircle,
  Fingerprint
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MFAScreen = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [mfaMethod, setMfaMethod] = useState<'sms' | 'email' | 'biometric'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVerify = async () => {
    setIsLoading(true);
    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      navigate('/platform/esm/onboarding/profile-setup');
    }, 2000);
  };

  const handleResendCode = () => {
    setTimeLeft(300);
    setCanResend(false);
    // Implement resend logic
  };

  const handleBiometricAuth = () => {
    // Simulate biometric authentication
    setTimeout(() => {
      navigate('/platform/esm/onboarding/profile-setup');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 flex items-center justify-center">
      <Card className="max-w-md w-full bg-white/10 backdrop-blur-lg border-white/20">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-green-500 to-blue-600 flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Multi-Factor Authentication</CardTitle>
          <p className="text-white/70">Secure your account with an additional layer of protection</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* MFA Method Selection */}
          <div className="space-y-3">
            <Label className="text-white">Choose verification method:</Label>
            <div className="grid grid-cols-1 gap-3">
              <Button
                variant={mfaMethod === 'email' ? 'default' : 'outline'}
                className={`flex items-center justify-start gap-3 h-12 ${
                  mfaMethod === 'email' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                onClick={() => setMfaMethod('email')}
              >
                <Mail className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Email Verification</div>
                  <div className="text-xs opacity-70">Send code to your email</div>
                </div>
              </Button>
              
              <Button
                variant={mfaMethod === 'sms' ? 'default' : 'outline'}
                className={`flex items-center justify-start gap-3 h-12 ${
                  mfaMethod === 'sms' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                onClick={() => setMfaMethod('sms')}
              >
                <Smartphone className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">SMS Verification</div>
                  <div className="text-xs opacity-70">Send code to your phone</div>
                </div>
              </Button>

              <Button
                variant={mfaMethod === 'biometric' ? 'default' : 'outline'}
                className={`flex items-center justify-start gap-3 h-12 ${
                  mfaMethod === 'biometric' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
                onClick={() => setMfaMethod('biometric')}
              >
                <Fingerprint className="h-5 w-5" />
                <div className="text-left">
                  <div className="font-medium">Biometric</div>
                  <div className="text-xs opacity-70">FaceID or TouchID</div>
                </div>
              </Button>
            </div>
          </div>

          {mfaMethod !== 'biometric' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="code" className="text-white">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 text-center text-2xl font-mono tracking-widest"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>

              <div className="text-center space-y-2">
                <p className="text-white/70 text-sm">
                  We sent a code to your {mfaMethod === 'email' ? 'email' : 'phone'}
                </p>
                {timeLeft > 0 ? (
                  <Badge variant="secondary" className="bg-white/10 text-white">
                    Code expires in {formatTime(timeLeft)}
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    Code expired
                  </Badge>
                )}
              </div>

              <Button
                onClick={handleVerify}
                disabled={verificationCode.length !== 6 || isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </div>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Verify Code
                  </>
                )}
              </Button>

              <Button
                variant="outline"
                onClick={handleResendCode}
                disabled={!canResend}
                className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                {canResend ? 'Resend Code' : `Resend in ${formatTime(timeLeft)}`}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6"
            >
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <Fingerprint className="h-12 w-12 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Biometric Authentication</h3>
                <p className="text-white/70 text-sm">
                  Use your device's biometric sensor to authenticate
                </p>
              </div>
              <Button
                onClick={handleBiometricAuth}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
              >
                <Fingerprint className="mr-2 h-4 w-4" />
                Authenticate with Biometrics
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MFAScreen;
