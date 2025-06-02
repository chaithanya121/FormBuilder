
# Redux Store Usage Guide

This guide explains how to use Redux throughout the BuildCraft Platform application.

## Table of Contents
1. [Store Structure](#store-structure)
2. [Using Redux in Components](#using-redux-in-components)
3. [Available Slices](#available-slices)
4. [Best Practices](#best-practices)
5. [Common Patterns](#common-patterns)

## Store Structure

The Redux store is configured with the following slices:

```typescript
interface RootState {
  auth: AuthState;      // User authentication and profile
  ui: UiState;          // Global UI state (modals, loading, theme)
  forms: FormsState;    // Forms data and operations
  resumes: ResumeState; // Resume data and operations
  platform: PlatformState; // Platform configuration
}
```

## Using Redux in Components

### 1. Import the hooks
```typescript
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
```

### 2. Access state
```typescript
const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
const { sidebarOpen, theme } = useAppSelector((state) => state.ui);
const { forms, currentForm } = useAppSelector((state) => state.forms);
```

### 3. Dispatch actions
```typescript
const dispatch = useAppDispatch();

// Sync actions
dispatch(setSidebarOpen(true));
dispatch(setTheme('dark'));

// Async actions
dispatch(loginUser({ email, password }));
dispatch(fetchForms());
dispatch(createForm(formData));
```

## Available Slices

### Auth Slice (`state.auth`)

**State:**
- `user`: Current user object
- `isAuthenticated`: Boolean authentication status
- `loading`: Authentication operations loading state
- `error`: Authentication error message
- `token`: JWT access token
- `refreshToken`: JWT refresh token

**Actions:**
```typescript
// Async actions
dispatch(loginUser({ email, password }));
dispatch(logoutUser());
dispatch(loadCurrentUser());
dispatch(updateUserProfile(userData));

// Sync actions
dispatch(clearError());
dispatch(setCredentials({ user, token, refreshToken }));
dispatch(clearCredentials());
```

### UI Slice (`state.ui`)

**State:**
- `sidebarOpen`: Sidebar visibility
- `previewMode`: Form preview mode
- `selectedElementId`: Currently selected form element
- `activeDashboardTab`: Active dashboard tab
- `theme`: Application theme
- `loading`: Various loading states
- `notifications`: Toast notifications array

**Actions:**
```typescript
// Sidebar
dispatch(toggleSidebar());
dispatch(setSidebarOpen(true));

// Theme
dispatch(setTheme('dark'));

// Loading states
dispatch(setGlobalLoading(true));
dispatch(setFormsLoading(false));

// Notifications
dispatch(addNotification({ type: 'success', message: 'Saved!' }));
dispatch(removeNotification(notificationId));
```

### Forms Slice (`state.forms`)

**State:**
- `forms`: Array of all forms
- `currentForm`: Currently active form
- `loading`: Forms operations loading state
- `error`: Forms error message

**Actions:**
```typescript
// Async actions
dispatch(fetchForms());
dispatch(fetchFormById(formId));
dispatch(createForm(formData));
dispatch(updateFormAction(formData));
dispatch(deleteFormAction(formId));

// Sync actions
dispatch(setCurrentForm(form));
dispatch(clearError());
```

### Resumes Slice (`state.resumes`)

**State:**
- `resumes`: Array of all resumes
- `currentResume`: Currently active resume
- `loading`: Resume operations loading state
- `error`: Resume error message

**Actions:**
```typescript
// Async actions
dispatch(fetchResumes());
dispatch(createResume(resumeData));
dispatch(updateResume(resumeData));
dispatch(deleteResume(id));
dispatch(fetchResumeById(id));

// Sync actions
dispatch(setCurrentResume(resume));
dispatch(updateCurrentResume(partialData));
dispatch(clearError());
```

### Platform Slice (`state.platform`)

**State:**
- `platform`: Platform configuration array
- `loading`: Platform loading state
- `error`: Platform error message

**Actions:**
```typescript
// Async actions
dispatch(getPlatform());

// Sync actions
dispatch(setCurrentPlatform(platformData));
```

## Best Practices

### 1. Always use typed hooks
```typescript
// ✅ Good
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

// ❌ Avoid
import { useDispatch, useSelector } from 'react-redux';
```

### 2. Select only what you need
```typescript
// ✅ Good - select specific fields
const { user, isAuthenticated } = useAppSelector((state) => state.auth);

// ❌ Avoid - selecting entire state
const authState = useAppSelector((state) => state.auth);
```

### 3. Handle async actions properly
```typescript
// ✅ Good - handle async actions with try/catch in thunks
const handleLogin = async () => {
  try {
    await dispatch(loginUser({ email, password })).unwrap();
    // Success handling is in the thunk
  } catch (error) {
    // Error handling is in the thunk
  }
};
```

### 4. Use loading states from Redux
```typescript
// ✅ Good - use Redux loading state
const { loading } = useAppSelector((state) => state.auth);

// ❌ Avoid - local loading state
const [loading, setLoading] = useState(false);
```

### 5. Clear errors when appropriate
```typescript
useEffect(() => {
  // Clear errors when component unmounts
  return () => {
    dispatch(clearError());
  };
}, [dispatch]);
```

## Common Patterns

### 1. Loading Pattern
```typescript
const ComponentWithLoading = () => {
  const { data, loading, error } = useAppSelector((state) => state.forms);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{/* Render data */}</div>;
};
```

### 2. Form Pattern
```typescript
const FormComponent = () => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.forms);
  
  const handleSubmit = async (formData) => {
    try {
      await dispatch(createForm(formData)).unwrap();
      // Success notification is handled in the thunk
    } catch (error) {
      // Error notification is handled in the thunk
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={loading}>
        {loading ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};
```

### 3. Authentication Guard Pattern
```typescript
const ProtectedComponent = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  
  return <div>Protected content for {user?.name}</div>;
};
```

### 4. Theme Pattern
```typescript
const ThemedComponent = () => {
  const { theme } = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  
  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};
```

### 5. Notification Pattern
```typescript
const ComponentWithNotifications = () => {
  const dispatch = useAppDispatch();
  
  const showSuccess = () => {
    dispatch(addNotification({
      type: 'success',
      message: 'Operation completed successfully!'
    }));
  };
  
  const showError = () => {
    dispatch(addNotification({
      type: 'error',
      message: 'Something went wrong!'
    }));
  };
  
  return (
    <div>
      <button onClick={showSuccess}>Show Success</button>
      <button onClick={showError}>Show Error</button>
    </div>
  );
};
```

## Persistence

The store automatically persists:
- `auth` state (user session)
- `ui` state (theme, preferences)

Data slices (`forms`, `resumes`, `platform`) are not persisted and will be fetched fresh on app load.

## DevTools

Redux DevTools are enabled in development mode. You can:
- Inspect state changes
- Time travel through actions
- Debug async actions

## Migration from Local State

When migrating from local state to Redux:

1. Identify the state that should be global
2. Move it to the appropriate slice
3. Replace `useState` with `useAppSelector`
4. Replace state setters with dispatch calls
5. Update components to use Redux state
6. Remove local state management

Remember: Not all state needs to be in Redux. Keep local state for:
- Form input values (before submission)
- UI state specific to one component
- Temporary/derived state
