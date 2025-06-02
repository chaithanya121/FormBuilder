
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
import { useAppDispatch } from "@/hooks/redux";

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
  const { toast } = useToast();
  const navigate = useNavigate()
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const loadUser = async () => {
      try {
        const currentUser = await authApi.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error loading user:", error);
        // Don't show error toast on initial load to avoid disrupting user experience
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.signIn(email, password);
      console.log(response);
      if (response.status === 200 || response.status === 201) {
        sessionStorage.setItem('auth_token', response.data.access);
          sessionStorage.setItem('refresh_token', response.data.refresh);
        setUser(response.user);
        setIsAuthenticated(true);
      }
      return response;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: (error as Error).message || "An error occurred during login",
        variant: "destructive"
      });
      throw error;
    }
  };

  const logout = async() => {
    try {
      const response = await authApi.logout( sessionStorage.getItem('refresh_token'));
      if (response.status === 200 || response.status === 201 || response.status === 205) {
          sessionStorage.removeItem('auth_token');
          sessionStorage.removeItem('refresh_token');
          setUser(null);
          setIsAuthenticated(false);
          navigate('/')
      }
      return response;
     
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = await authApi.updateProfile(userData);
        setUser(updatedUser);
      }
    } catch (error) {
      console.error("Update user error:", error);
      toast({
        title: "Profile Update Failed",
        description: (error as Error).message || "Failed to update profile",
        variant: "destructive"
      });
      throw error;
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
