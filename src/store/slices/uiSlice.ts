
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  previewMode: boolean;
  selectedElementId: string | null;
  activeDashboardTab: string;
  verificationEmail: string | null;
  showVerificationModal: boolean;
  theme: 'light' | 'dark' | 'system';
  isScrolled: boolean;
  isMobile: boolean;
  loading: {
    global: boolean;
    forms: boolean;
    auth: boolean;
    resumes: boolean;
  };
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
    timestamp: number;
  }>;
}

const initialState: UiState = {
  sidebarOpen: false,
  previewMode: false,
  selectedElementId: null,
  activeDashboardTab: 'forms',
  verificationEmail: null,
  showVerificationModal: false,
  theme: 'light',
  isScrolled: false,
  isMobile: false,
  loading: {
    global: false,
    forms: false,
    auth: false,
    resumes: false,
  },
  notifications: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.sidebarOpen = action.payload;
    },
    togglePreviewMode: (state) => {
      state.previewMode = !state.previewMode;
    },
    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.previewMode = action.payload;
    },
    setSelectedElementId: (state, action: PayloadAction<string | null>) => {
      state.selectedElementId = action.payload;
    },
    setActiveDashboardTab: (state, action: PayloadAction<string>) => {
      state.activeDashboardTab = action.payload;
    },
    setVerificationEmail: (state, action: PayloadAction<string | null>) => {
      state.verificationEmail = action.payload;
    },
    setShowVerificationModal: (state, action: PayloadAction<boolean>) => {
      state.showVerificationModal = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.theme = action.payload;
    },
    setIsScrolled: (state, action: PayloadAction<boolean>) => {
      state.isScrolled = action.payload;
    },
    setIsMobile: (state, action: PayloadAction<boolean>) => {
      state.isMobile = action.payload;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.global = action.payload;
    },
    setFormsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.forms = action.payload;
    },
    setAuthLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.auth = action.payload;
    },
    setResumesLoading: (state, action: PayloadAction<boolean>) => {
      state.loading.resumes = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<UiState['notifications'][0], 'id' | 'timestamp'>>) => {
      const notification = {
        ...action.payload,
        id: `notification-${Date.now()}-${Math.random()}`,
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { 
  toggleSidebar, 
  setSidebarOpen, 
  togglePreviewMode, 
  setPreviewMode,
  setSelectedElementId,
  setActiveDashboardTab,
  setVerificationEmail,
  setShowVerificationModal,
  setTheme,
  setIsScrolled,
  setIsMobile,
  setGlobalLoading,
  setFormsLoading,
  setAuthLoading,
  setResumesLoading,
  addNotification,
  removeNotification,
  clearNotifications
} = uiSlice.actions;

export default uiSlice.reducer;
