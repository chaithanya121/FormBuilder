
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import {
  setShowVerificationModal,
  setVerificationEmail,
} from "@/store/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

interface SignInFormProps {
  onSuccess: () => void;
}

export function SignInForm({ onSuccess }: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      const response = await login(email, password);
      
      if (response.status === 200 || response.status === 201) {
        onSuccess();
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error === "Account not verified. Please check your email for a verification link.") {
        onSuccess();
        dispatch(setVerificationEmail(email));
        dispatch(setShowVerificationModal(true));
      }
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white text-sm font-medium">
          Email
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="email"
            placeholder="your.email@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-10 bg-slate-700/50 border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-white text-sm font-medium">
            Password
          </Label>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-blue-400 hover:text-blue-300 px-0"
          >
            Forgot password?
          </Button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="pl-10 bg-slate-700/50 border-slate-600 text-white focus:ring-blue-500 focus:border-blue-500"
            disabled={loading}
          />
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
    </motion.form>
  );
}
