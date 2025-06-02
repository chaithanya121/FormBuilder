
import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { User, authApi } from "@/services/api/auth";
import {
  setShowVerificationModal,
  setVerificationEmail,
} from "@/store/slices/uiSlice";
import {
  setUser,
  setTokens,
  setLoading,
  setError,
  clearAuth,
} from "@/store/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<any>;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector(state => state.auth);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const loadUser = async () => {
      try {
        dispatch(setLoading(true));
        const currentUser = await authApi.getCurrentUser();
        if (currentUser) {
          dispatch(setUser(currentUser));
        }
      } catch (error) {
        console.error("Error loading user:", error);
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadUser();
  }, [dispatch]);

  const login = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));
      const response = await authApi.signIn(email, password);
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        sessionStorage.setItem('auth_token', response.data.access);
        sessionStorage.setItem('refresh_token', response.data.refresh);
        dispatch(setTokens({
          token: response.data.access,
          refreshToken: response.data.refresh
        }));
        dispatch(setUser(response.user));
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      dispatch(setError((error as Error).message));
      toast({
        title: "Login Failed",
        description: (error as Error).message || "An error occurred during login",
        variant: "destructive"
      });
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const logout = async() => {
    try {
      dispatch(setLoading(true));
      const response = await authApi.logout(sessionStorage.getItem('refresh_token'));
      if (response.status === 200 || response.status === 201 || response.status === 205) {
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('refresh_token');
        dispatch(clearAuth());
        navigate('/');
      }
      return response;
     
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(setError((error as Error).message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      dispatch(setLoading(true));
      if (user) {
        const updatedUser = await authApi.updateProfile(userData);
        dispatch(setUser(updatedUser));
      }
    } catch (error) {
      console.error("Update user error:", error);
      dispatch(setError((error as Error).message));
      toast({
        title: "Profile Update Failed",
        description: (error as Error).message || "Failed to update profile",
        variant: "destructive"
      });
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, updateUser }}
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
