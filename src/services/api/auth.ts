import api, { API_CONFIG, formatUrl, getApiUrl } from './index';
import { toast } from 'sonner';
import process from 'process'


export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  emailVerified?: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
  status:number;
  response: {
    data: {
      detial: string
    }
  },
  name:string,
  access_token:string,
  

}

// Authentication API services
export const authApi = {
  // Sign in user
  signIn: async (email: string, password: string)=> {
    try {
      // For real API integration, uncomment this code and remove the simulation
      const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.SIGN_IN);
      console.log(url)
      const response = await api.post(url, { email, password });
      // sessionStorage.setItem('auth_token', response);
    
      return response;
      
      // Simulation for demo purposes
      // const response = await new Promise<AuthResponse>((resolve) => {
      //   setTimeout(() => {
      //     resolve({
      //       user: {
      //         id: `user-${Date.now()}`,
      //         email,
      //         name: email.split('@')[0],
      //         avatar: null,
      //         emailVerified: true
      //       },
      //       token: `token-${Date.now()}`
      //     });
      //   }, 1000);
      // });
      
      // // Store auth token in session storage (not localStorage)
      // sessionStorage.setItem('auth_token', response.token);
      // return response;
    } catch (error) {
      console.error("Login error:", error);
     
      // throw new Error("Failed to sign in");

      return error
    }
  },

  // Register new user
  signUp: async (userData: object): Promise<{ email: string }> => {
    try {
      // For real API integration, uncomment this code
      const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.SIGN_UP);
      const { data } = await api.post(url, userData);
      return data;
      
      // Simulation for demo purposes
      // await new Promise(resolve => setTimeout(resolve, 1000));
      
      // // Return the email for verification
      // return { email };
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Failed to create account");
    }
  },

  // Verify email with OTP
  verifyEmail: async (email: string, otp: string): Promise<AuthResponse> => {
    try {
      // For real API integration, uncomment this code
        const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.VERIFY_EMAIL);
        const { data } = await api.post(url, { email, otp });
        sessionStorage.setItem('auth_token', data.token);
        return data;
      
      // Simulation for demo purposes
      // const response = await new Promise<AuthResponse>((resolve) => {
      //   setTimeout(() => {
      //     resolve({
      //       user: {
      //         id: `user-${Date.now()}`,
      //         email,
      //         name: email.split('@')[0],
      //         avatar: null,
      //         emailVerified: true
      //       },
      //       token: `token-${Date.now()}`
      //     });
      //   }, 1000);
      // });
      
      // // Store auth token in session storage
      // sessionStorage.setItem('auth_token', response.token);
      // return response;
    } catch (error) {
      console.error("Verification error:", error);
      throw new Error("Failed to verify email");
    }
  },

  // Resend verification code
  resendVerificationCode: async (email: string): Promise<void> => {
    try {
      // For real API integration, uncomment this code
      // const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.RESEND_CODE);
      // await api.post(url, { email });
      
      // Simulation for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Verification code resent to ${email}`);
    } catch (error) {
      console.error("Error resending code:", error);
      throw new Error("Failed to resend verification code");
    }
  },

  // Logout user
  logout: (): void => {
    // For real API integration, you might want to invalidate the token on the server
    // const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    // api.post(url);
    sessionStorage.removeItem('auth_token');
  },

  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const token = sessionStorage.getItem('auth_token');
      if (!token) return null;
      
      // For real API integration, uncomment this code
      // const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.CURRENT_USER);
      // const { data } = await api.get(url);
      // return data.user;
      
      // Simulation for demo purposes
      return {
        id: 'user-demo',
        email: 'demo@example.com',
        name: 'Demo User',
        avatar: null,
        emailVerified: true
      };
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  },

  // Update user profile
  updateProfile: async (userData: Partial<User>): Promise<User> => {
    try {
      // For real API integration, uncomment this code
      // const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.UPDATE_PROFILE);
      // const { data } = await api.put(url, userData);
      // return data.user;
      
      // Simulation for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get current user data (in a real app, this would come from the backend)
      const currentUser = await authApi.getCurrentUser();
      if (!currentUser) {
        throw new Error("Not authenticated");
      }
      
      // Update user with new data
      const updatedUser = {
        ...currentUser,
        ...userData
      };
      
      return updatedUser;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw new Error("Failed to update profile");
    }
  },

  // Change password
  changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
    try {
      // For real API integration, uncomment this code
      // const url = getApiUrl(API_CONFIG.ENDPOINTS.AUTH.CHANGE_PASSWORD);
      // await api.post(url, { currentPassword, newPassword });
      
      // Simulation for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password updated successfully');
    } catch (error) {
      console.error("Error changing password:", error);
      throw new Error("Failed to change password");
    }
  }
};
