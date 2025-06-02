
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  sidebarOpen: boolean;
  previewMode: boolean;
  selectedElementId: string | null;
  activeDashboardTab: string;
  verificationEmail: string | null;
  showVerificationModal: boolean;
}

const initialState: UiState = {
  sidebarOpen: false,
  previewMode: false,
  selectedElementId: null,
  activeDashboardTab: 'forms',
  verificationEmail: null,
  showVerificationModal: false,
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
  setShowVerificationModal
} = uiSlice.actions;

export default uiSlice.reducer;
