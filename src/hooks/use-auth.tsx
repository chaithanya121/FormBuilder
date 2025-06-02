
import {
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { User } from "@/services/api/auth";
import {
  setShowVerificationModal,
  setVerificationEmail,
  addNotification,
} from "@/store/slices/uiSlice";
import {
  loginUser,
  logoutUser,
  loadCurrentUser,
  updateUserProfile,
  clearError,
} from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error, token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Load user on app start if token exists
    if (token && !user) {
      dispatch(loadCurrentUser());
    }
  }, [dispatch, token, user]);

  const login = async (email: string, password: string) => {
    try {
      const result = await dispatch(loginUser({ email, password })).unwrap();
      
      dispatch(addNotification({
        type: 'success',
        message: 'You\'ve been signed in successfully'
      }));
      
      navigate("/dashboard");
      return { status: 200, user: result.user };
    } catch (error: any) {
      if (error === "Account not verified. Please check your email for a verification link.") {
        dispatch(setVerificationEmail(email));
        dispatch(setShowVerificationModal(true));
      }
      
      dispatch(addNotification({
        type: 'error',
        message: error || 'Failed to sign in. Please check your credentials.'
      }));
      
      throw error;
    }
  };

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate('/');
      return { status: 200 };
    } catch (error) {
      console.error("Logout error:", error);
      return { status: 200 }; // Return success even if server logout fails
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      await dispatch(updateUserProfile(userData)).unwrap();
      dispatch(addNotification({
        type: 'success',
        message: 'Profile updated successfully'
      }));
    } catch (error) {
      dispatch(addNotification({
        type: 'error',
        message: (error as Error).message || 'Failed to update profile'
      }));
      throw error;
    }
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        isAuthenticated, 
        loading, 
        error, 
        login, 
        logout, 
        updateUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
