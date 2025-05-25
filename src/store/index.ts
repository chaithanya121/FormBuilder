
import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './slices/formsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
    ui: uiReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
