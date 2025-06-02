
import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './slices/formsSlice';
import resumeReducer from './slices/resumeSlice';
import uiReducer from './slices/uiSlice';
import platformReducer  from './slices/platformSlice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    resumes: resumeReducer,
    ui: uiReducer,
    platform: platformReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
