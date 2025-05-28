import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, Mail } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setShowVerificationModal, setVerificationEmail } from "@/store/slices/uiSlice";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "framer-motion";
import { authApi } from "@/services/api/auth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function EmailVerification() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { verificationEmail, showVerificationModal } = useAppSelector(state => state.ui);

  useEffect(() => {
    // When email changes, reset OTP
    setOtp("");
    setVerificationSuccess(false);
  }, [verificationEmail]);

  const handleVerifyOTP = async () => {
    if (!verificationEmail || otp.length !== 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit verification code",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Attempt to verify the email with the API
      await authApi.verifyEmail(verificationEmail, otp);
      
      // Set success state to show animation
      setVerificationSuccess(true);
      
      // Delay to show success animation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified",
      });
      
      // Close the verification modal and navigate to plan selection
      dispatch(setShowVerificationModal(false));
      dispatch(setVerificationEmail(null));
      navigate("/select-plan");
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Verification Failed",
        description: "Failed to verify the code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!verificationEmail) return;
    
    setIsResending(true);
    
    try {
      await authApi.resendVerificationCode(verificationEmail);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend the verification code",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleClose = () => {
    // Warning before closing
    if (confirm("Are you sure you want to close? You will need to verify your email later to access all features.")) {
      dispatch(setShowVerificationModal(false));
    }
  };

  return (
    <Dialog open={showVerificationModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] border-none shadow-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <DialogHeader>
          <AnimatePresence mode="wait">
            {!verificationSuccess ? (
              <motion.div 
                key="verification-form"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center space-y-2"
              >
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center mb-2">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                  Verify Your Email
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Please enter the 4-digit code sent to<br />
                  <span className="font-medium text-blue-300">{verificationEmail}</span>
                </DialogDescription>
              </motion.div>
            ) : (
              <motion.div 
                key="verification-success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
                className="flex flex-col items-center text-center space-y-4 py-4"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center"
                >
                  <CheckCircle className="h-10 w-10 text-white" />
                </motion.div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white">Verified!</h2>
                  <p className="text-gray-300">Your email has been successfully verified</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogHeader>

        <AnimatePresence>
          {!verificationSuccess && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 py-2"
            >
              <div className="flex justify-center">
                <InputOTP maxLength={4} value={otp} onChange={setOtp} disabled={isLoading}>
                  <InputOTPGroup>
                    <motion.div whileTap={{ scale: 0.95 }} className="w-9 h-12">
                      <InputOTPSlot index={0} className="bg-slate-700/50 border-slate-600 text-white h-full" />
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.95 }} className="w-9 h-12">
                      <InputOTPSlot index={1} className="bg-slate-700/50 border-slate-600 text-white h-full" />
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.95 }} className="w-9 h-12">
                      <InputOTPSlot index={2} className="bg-slate-700/50 border-slate-600 text-white h-full" />
                    </motion.div>
                    <motion.div whileTap={{ scale: 0.95 }} className="w-9 h-12">
                      <InputOTPSlot index={3} className="bg-slate-700/50 border-slate-600 text-white h-full" />
                    </motion.div>
                 
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex flex-col space-y-3">
                <Button
                  onClick={handleVerifyOTP}
                  className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
                  disabled={isLoading || otp.length !== 4}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </Button>
                
                <div className="flex justify-center">
                  <Button 
                    variant="link" 
                    onClick={handleResendCode} 
                    disabled={isResending}
                    className="text-blue-400 hover:text-blue-300"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      "Resend Code"
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
