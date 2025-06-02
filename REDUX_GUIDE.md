
# Redux Store Implementation Guide

This guide explains how to use Redux for state management in the BuildCraft Platform application.

## Overview

The Redux store is configured with multiple slices to manage different aspects of the application state:

- **authSlice**: User authentication and session management
- **formsSlice**: Form data and operations
- **resumeSlice**: Resume data and operations  
- **uiSlice**: UI state like modals, sidebar, preview mode
- **platformSlice**: Platform-specific data
- **navigationSlice**: Routing and navigation state
- **appSlice**: Global app state like notifications, theme, loading

## Store Structure

```typescript
interface RootState {
  auth: AuthState;
  forms: FormsState;
  resumes: ResumeState;
  ui: UiState;
  platform: PlatFormState;
  navigation: NavigationState;
  app: AppState;
}
```

## How to Use Redux in Components

### 1. Import Required Hooks

```typescript
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
// Or use specific slice hooks
import { useAuth, useForms, useUI } from '@/hooks/redux';
```

### 2. Access State

```typescript
// Method 1: Using useAppSelector
const Component = () => {
  const user = useAppSelector(state => state.auth.user);
  const forms = useAppSelector(state => state.forms.forms);
  const sidebarOpen = useAppSelector(state => state.ui.sidebarOpen);
  
  return <div>...</div>;
};

// Method 2: Using slice-specific hooks (Recommended)
const Component = () => {
  const { user, isAuthenticated } = useAuth();
  const { forms, loading } = useForms();
  const { sidebarOpen, previewMode } = useUI();
  
  return <div>...</div>;
};
```

### 3. Dispatch Actions

```typescript
import { toggleSidebar, setPreviewMode } from '@/store/slices/uiSlice';
import { fetchForms, createForm } from '@/store/slices/formsSlice';

const Component = () => {
  const dispatch = useAppDispatch();
  // Or use slice hook
  const { dispatch: uiDispatch } = useUI();
  
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
    // or uiDispatch(toggleSidebar());
  };
  
  const handleCreateForm = async () => {
    const formData = { /* form data */ };
    await dispatch(createForm(formData));
  };
  
  return <div>...</div>;
};
```

## Available Actions by Slice

### Auth Slice (`authSlice`)
```typescript
// Actions
setUser(user: User | null)
setTokens({ token: string, refreshToken: string })
setLoading(loading: boolean)
setError(error: string | null)
clearAuth()

// Usage
dispatch(setUser(userData));
dispatch(setTokens({ token: 'abc', refreshToken: 'xyz' }));
dispatch(clearAuth());
```

### UI Slice (`uiSlice`)
```typescript
// Actions
toggleSidebar()
setSidebarOpen(open: boolean)
togglePreviewMode()
setPreviewMode(preview: boolean)
setSelectedElementId(id: string | null)
setActiveDashboardTab(tab: string)
setVerificationEmail(email: string | null)
setShowVerificationModal(show: boolean)

// Usage
dispatch(toggleSidebar());
dispatch(setActiveDashboardTab('forms'));
dispatch(setShowVerificationModal(true));
```

### Forms Slice (`formsSlice`)
```typescript
// Async Actions
fetchForms()
fetchFormById(formId: string)
createForm(formData)
updateFormAction(formData)
deleteFormAction(formId: string)

// Sync Actions
setCurrentForm(form)
resetFormsState()
clearError()

// Usage
await dispatch(fetchForms());
await dispatch(createForm(newFormData));
dispatch(setCurrentForm(selectedForm));
```

### App Slice (`appSlice`)
```typescript
// Actions
setOnlineStatus(online: boolean)
addNotification({ type, message })
removeNotification(id: string)
clearNotifications()
setGlobalLoading(loading: boolean)
setTheme(theme: 'light' | 'dark' | 'system')
setLanguage(language: string)

// Usage
dispatch(addNotification({ type: 'success', message: 'Form saved!' }));
dispatch(setTheme('dark'));
dispatch(setGlobalLoading(true));
```

## Best Practices

### 1. Use Slice-Specific Hooks
Instead of `useAppSelector`, prefer slice-specific hooks for cleaner code:

```typescript
// ✅ Good
const { user, isAuthenticated } = useAuth();
const { forms, loading } = useForms();

// ❌ Avoid
const user = useAppSelector(state => state.auth.user);
const forms = useAppSelector(state => state.forms.forms);
```

### 2. Handle Async Actions Properly
```typescript
const handleSubmit = async () => {
  try {
    setLoading(true);
    const result = await dispatch(createForm(formData));
    if (createForm.fulfilled.match(result)) {
      // Success
      navigate('/forms');
    }
  } catch (error) {
    // Handle error
  } finally {
    setLoading(false);
  }
};
```

### 3. Use Selectors for Complex Data
```typescript
// Create reusable selectors
const selectFormsByStatus = (status: string) => (state: RootState) =>
  state.forms.forms.filter(form => form.status === status);

// Use in component
const publishedForms = useAppSelector(selectFormsByStatus('published'));
```

### 4. Normalize State Structure
Keep state flat and normalized. Use IDs to reference related data:

```typescript
// ✅ Good
interface FormsState {
  forms: FormData[];
  currentFormId: string | null;
}

// ❌ Avoid deeply nested structures
interface FormsState {
  forms: {
    [id: string]: {
      data: FormData;
      submissions: {
        [submissionId: string]: SubmissionData;
      };
    };
  };
}
```

## Error Handling

### Global Error Handling
```typescript
// In components
const { error } = useForms();

useEffect(() => {
  if (error) {
    dispatch(addNotification({
      type: 'error',
      message: error
    }));
    dispatch(clearError());
  }
}, [error, dispatch]);
```

### Loading States
```typescript
const { loading, globalLoading } = useApp();
const { loading: formsLoading } = useForms();

if (loading || globalLoading || formsLoading) {
  return <LoadingSpinner />;
}
```

## Debugging Redux

### 1. Enable Redux DevTools
Redux DevTools are enabled in development mode. Use browser extension to inspect state and actions.

### 2. Log State Changes
```typescript
// Add logging middleware in store configuration
const logger = (store) => (next) => (action) => {
  console.log('Dispatching:', action);
  const result = next(action);
  console.log('Next state:', store.getState());
  return result;
};
```

### 3. State Inspection
```typescript
// In any component
const { dispatch } = useAppDispatch();

// Log current state
console.log('Current state:', useAppSelector(state => state));
```

## Migration from Local State

### Before (Local State)
```typescript
const [user, setUser] = useState(null);
const [loading, setLoading] = useState(false);
const [forms, setForms] = useState([]);
```

### After (Redux)
```typescript
const { user } = useAuth();
const { loading } = useApp();
const { forms } = useForms();
const dispatch = useAppDispatch();

// Update state
dispatch(setUser(userData));
dispatch(setGlobalLoading(true));
dispatch(fetchForms());
```

## Performance Optimization

### 1. Memoized Selectors
```typescript
import { createSelector } from '@reduxjs/toolkit';

const selectFilteredForms = createSelector(
  [state => state.forms.forms, (state, filter) => filter],
  (forms, filter) => forms.filter(form => form.status === filter)
);
```

### 2. Avoid Unnecessary Re-renders
```typescript
// ✅ Select only what you need
const formCount = useAppSelector(state => state.forms.forms.length);

// ❌ Selecting entire forms array when you only need count
const forms = useAppSelector(state => state.forms.forms);
const formCount = forms.length;
```

This guide provides a comprehensive overview of using Redux in the BuildCraft Platform. Follow these patterns for consistent and maintainable state management.
