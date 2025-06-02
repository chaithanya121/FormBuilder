
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  previewMode: boolean;
  selectedElementId: string | null;
  activeDashboardTab: string;
  verificationEmail: string | null;
  showVerificationModal: boolean;
  loading: boolean;
  searchQuery: string;
  filterOptions: {
    status: string;
    category: string;
    dateRange: string;
  };
  viewMode: 'grid' | 'list';
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
}

const initialState: UiState = {
  sidebarOpen: false,
  previewMode: false,
  selectedElementId: null,
  activeDashboardTab: 'forms',
  verificationEmail: null,
  showVerificationModal: false,
  loading: false,
  searchQuery: '',
  filterOptions: {
    status: 'all',
    category: 'all',
    dateRange: 'all',
  },
  viewMode: 'grid',
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilterOptions: (state, action: PayloadAction<Partial<UiState['filterOptions']>>) => {
      state.filterOptions = { ...state.filterOptions, ...action.payload };
    },
    setViewMode: (state, action: PayloadAction<'grid' | 'list'>) => {
      state.viewMode = action.payload;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'read'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
        read: false,
      };
      state.notifications.unshift(notification);
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
      }
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    resetUiState: () => initialState,
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
  setLoading,
  setSearchQuery,
  setFilterOptions,
  setViewMode,
  addNotification,
  markNotificationAsRead,
  removeNotification,
  clearAllNotifications,
  resetUiState
} = uiSlice.actions;

export default uiSlice.reducer;
