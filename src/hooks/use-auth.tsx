
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { 
  loginUser, 
  logoutUser, 
  getCurrentUser, 
  updateUserProfile,
  clearError 
} from "@/store/slices/authSlice";
import { setShowVerificationModal, setVerificationEmail } from "@/store/slices/uiSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is logged in on mount
    if (!user && sessionStorage.getItem('auth_token')) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    // Handle auth errors
    if (error) {
      toast({
        title: "Authentication Error",
        description: error,
        variant: "destructive"
      });
      dispatch(clearError());
    }
  }, [error, toast, dispatch]);

  const login = async (email: string, password: string) => {
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      toast({
        title: "Login Successful",
        description: "Welcome back!",
        variant: "default"
      });
      return result;
    } catch (error) {
      throw error; // Let the component handle the error
    }
  };

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
        variant: "default"
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUser = async (userData: Parameters<typeof updateUserProfile>[0]) => {
    try {
      await dispatch(updateUserProfile(userData)).unwrap();
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
        variant: "default"
      });
    } catch (error) {
      throw error;
    }
  };

  const showVerificationModal = (email: string) => {
    dispatch(setVerificationEmail(email));
    dispatch(setShowVerificationModal(true));
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    showVerificationModal,
  };
};
