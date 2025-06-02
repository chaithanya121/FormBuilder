
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NavigationState {
  currentPath: string;
  previousPath: string;
  breadcrumbs: Array<{ label: string; path: string }>;
  isNavigating: boolean;
}

const initialState: NavigationState = {
  currentPath: '/',
  previousPath: '/',
  breadcrumbs: [],
  isNavigating: false,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setCurrentPath: (state, action: PayloadAction<string>) => {
      state.previousPath = state.currentPath;
      state.currentPath = action.payload;
    },
    setBreadcrumbs: (state, action: PayloadAction<Array<{ label: string; path: string }>>) => {
      state.breadcrumbs = action.payload;
    },
    setNavigating: (state, action: PayloadAction<boolean>) => {
      state.isNavigating = action.payload;
    },
  },
});

export const { setCurrentPath, setBreadcrumbs, setNavigating } = navigationSlice.actions;
export default navigationSlice.reducer;
