
import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './slices/formsSlice';
import resumeReducer from './slices/resumeSlice';
import uiReducer from './slices/uiSlice';
import platformReducer from './slices/platformSlice';
import authReducer from './slices/authSlice';
import navigationReducer from './slices/navigationSlice';
import appReducer from './slices/appSlice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    resumes: resumeReducer,
    ui: uiReducer,
    platform: platformReducer,
    auth: authReducer,
    navigation: navigationReducer,
    app: appReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export selectors for easy access
export const selectAuth = (state: RootState) => state.auth;
export const selectForms = (state: RootState) => state.forms;
export const selectResumes = (state: RootState) => state.resumes;
export const selectUI = (state: RootState) => state.ui;
export const selectPlatform = (state: RootState) => state.platform;
export const selectNavigation = (state: RootState) => state.navigation;
export const selectApp = (state: RootState) => state.app;
