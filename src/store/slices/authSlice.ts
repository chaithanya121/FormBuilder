
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, authApi } from '@/services/api/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  token: string | null;
  refreshToken: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  token: sessionStorage.getItem('auth_token'),
  refreshToken: sessionStorage.getItem('refresh_token'),
};

// Async thunks for auth operations
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authApi.signIn(email, password);
      if (response.status === 200 || response.status === 201) {
        sessionStorage.setItem('auth_token', response.data.access);
        sessionStorage.setItem('refresh_token', response.data.refresh);
        return {
          user: response.user,
          token: response.data.access,
          refreshToken: response.data.refresh,
        };
      } else {
        return rejectWithValue(response.response?.data?.detail || 'Login failed');
      }
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const response = await authApi.logout(state.auth.refreshToken);
      if (response.status === 200 || response.status === 201 || response.status === 205) {
        sessionStorage.removeItem('auth_token');
        sessionStorage.removeItem('refresh_token');
        return true;
      }
      return rejectWithValue('Logout failed');
    } catch (error) {
      // Even if logout fails on server, clear local storage
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('refresh_token');
      return true;
    }
  }
);

export const loadCurrentUser = createAsyncThunk(
  'auth/loadCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const currentUser = await authApi.getCurrentUser();
      return currentUser;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const updatedUser = await authApi.updateProfile(userData);
      return updatedUser;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setCredentials: (state, action: PayloadAction<{ user: User; token: string; refreshToken: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      })
      
      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      })
      
      // Load current user
      .addCase(loadCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loadCurrentUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      
      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
