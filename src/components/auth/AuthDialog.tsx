
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { motion } from "framer-motion";

interface AuthDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: "signin" | "signup";
}

export function AuthDialog({ isOpen, onOpenChange, defaultTab = "signin" }: AuthDialogProps) {

   console.log('auth',defaultTab)
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(defaultTab);
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-none shadow-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center space-y-2"
          >
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            </div>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              {activeTab === "signin" ? "Welcome Back" : "Create Account"}
            </DialogTitle>
            <DialogDescription className="text-gray-300 max-w-xs mx-auto">
              {activeTab === "signin" 
                ? "Sign in to your account to continue your journey with us" 
                : "Join us today and start creating beautiful forms"}
            </DialogDescription>
          </motion.div>
        </DialogHeader>
        
        <Tabs 
          defaultValue={activeTab} 
          onValueChange={(value) => setActiveTab(value as "signin" | "signup")}
          className="w-full mt-2"
        >
          <TabsList className="grid w-full grid-cols-2 bg-slate-700/50 rounded-lg p-1">
            <TabsTrigger 
              value="signin" 
              className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger 
              value="signup"
              className="rounded-md data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-violet-600 data-[state=active]:text-white"
            >
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="signin" className="mt-4">
            <SignInForm onSuccess={() => onOpenChange(false)} />
          </TabsContent>
          <TabsContent value="signup" className="mt-4">
            <SignUpForm onSuccess={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
