
# Redux Usage Guide for BuildCraft Platform

## Overview
This project uses Redux Toolkit for state management across the entire application. All component state has been migrated to Redux to ensure consistency and data persistence.

## Store Structure

### Root Store (`src/store/index.ts`)
- Configured with Redux Toolkit
- Includes Redux Persist for data persistence
- Middleware configured for async actions and persistence

### State Slices

#### 1. Auth Slice (`src/store/slices/authSlice.ts`)
Manages authentication state:
- `user`: Current user object
- `isAuthenticated`: Boolean authentication status
- `loading`: Loading state for auth operations
- `error`: Error messages
- `token`: Authentication token

**Actions:**
- `loginUser(email, password)`: Authenticate user
- `logoutUser()`: Log out current user
- `getCurrentUser()`: Fetch current user data
- `updateUserProfile(userData)`: Update user profile
- `clearError()`: Clear error state
- `setUser(user)`: Set user manually
- `resetAuth()`: Reset auth state

#### 2. Forms Slice (`src/store/slices/formsSlice.ts`)
Manages form data and operations:
- `forms`: Array of all forms
- `currentForm`: Currently selected form
- `loading`: Loading state
- `error`: Error messages

**Actions:**
- `fetchForms()`: Get all forms
- `fetchFormById(id)`: Get specific form
- `createForm(formData)`: Create new form
- `updateFormAction(formData)`: Update existing form
- `deleteFormAction(id)`: Delete form
- `setCurrentForm(form)`: Set current form
- `clearError()`: Clear error state

#### 3. Resume Slice (`src/store/slices/resumeSlice.ts`)
Manages resume data:
- `resumes`: Array of all resumes
- `currentResume`: Currently selected resume
- `loading`: Loading state
- `error`: Error messages

**Actions:**
- `fetchResumes()`: Get all resumes
- `createResume(resumeData)`: Create new resume
- `updateResume(resumeData)`: Update existing resume
- `deleteResume(id)`: Delete resume
- `fetchResumeById(id)`: Get specific resume
- `setCurrentResume(resume)`: Set current resume
- `clearError()`: Clear error state

#### 4. Platform Slice (`src/store/slices/platformSlice.ts`)
Manages platform data:
- `platform`: Array of platform configurations
- `loading`: Loading state
- `error`: Error messages

**Actions:**
- `getPlatform()`: Fetch platform data
- `setCurrentPlatform(platform)`: Set platform data
- `clearError()`: Clear error state

#### 5. UI Slice (`src/store/slices/uiSlice.ts`)
Manages global UI state:
- `sidebarOpen`: Sidebar visibility
- `previewMode`: Preview mode status
- `selectedElementId`: Currently selected element
- `activeDashboardTab`: Active dashboard tab
- `verificationEmail`: Email for verification
- `showVerificationModal`: Verification modal visibility
- `loading`: Global loading state
- `searchQuery`: Search input value
- `filterOptions`: Filter settings
- `viewMode`: Grid or list view
- `notifications`: Array of notifications

**Actions:**
- `toggleSidebar()`: Toggle sidebar
- `setSidebarOpen(boolean)`: Set sidebar state
- `setPreviewMode(boolean)`: Set preview mode
- `setActiveDashboardTab(tab)`: Set active tab
- `setSearchQuery(query)`: Set search query
- `setFilterOptions(options)`: Set filter options
- `setViewMode(mode)`: Set view mode (grid/list)
- `addNotification(notification)`: Add notification
- `markNotificationAsRead(id)`: Mark notification as read
- `removeNotification(id)`: Remove notification
- `clearAllNotifications()`: Clear all notifications

## How to Use Redux in Components

### 1. Import Required Hooks
```typescript
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
```

### 2. Access State
```typescript
const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
const { forms, currentForm } = useAppSelector((state) => state.forms);
```

### 3. Dispatch Actions
```typescript
const dispatch = useAppDispatch();

// Simple action
dispatch(setSearchQuery('search term'));

// Async action
dispatch(fetchForms());

// Async action with unwrap for error handling
try {
  await dispatch(loginUser({ email, password })).unwrap();
  // Success handling
} catch (error) {
  // Error handling
}
```

### 4. Example Component Implementation
```typescript
import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/redux';
import { fetchForms, createForm } from '@/store/slices/formsSlice';
import { setSearchQuery } from '@/store/slices/uiSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { forms, loading, error } = useAppSelector((state) => state.forms);
  const { searchQuery } = useAppSelector((state) => state.ui);

  useEffect(() => {
    dispatch(fetchForms());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleCreateForm = async (formData: any) => {
    try {
      await dispatch(createForm(formData)).unwrap();
      // Form created successfully
    } catch (error) {
      // Handle error
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default MyComponent;
```

## Authentication Hook (`src/hooks/use-auth.tsx`)
The authentication hook provides a simplified interface to auth-related Redux actions:

```typescript
import { useAuth } from '@/hooks/use-auth';

const MyComponent = () => {
  const { user, isAuthenticated, loading, login, logout, updateUser } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      // Login successful
    } catch (error) {
      // Handle login error
    }
  };

  return (
    // Your component JSX
  );
};
```

## Best Practices

### 1. No Local State for Data
- Use Redux for all data that needs to be shared or persisted
- Use local state only for UI-specific state (like form inputs before submission)

### 2. Error Handling
- Always handle async action errors with try/catch when using unwrap()
- Use the error state from slices to display error messages

### 3. Loading States
- Use loading states from slices to show loading indicators
- Avoid multiple loading states for the same data

### 4. Type Safety
- Always use `useAppSelector` and `useAppDispatch` instead of the raw hooks
- Import action creators from their respective slices

### 5. Data Normalization
- Keep data flat in the store when possible
- Use IDs to reference related data

### 6. Persistence
- Critical data (auth, ui preferences) is persisted automatically
- Forms and resumes are not persisted to avoid stale data

## Debugging

### Redux DevTools
The store is configured with Redux DevTools for development:
- Install Redux DevTools browser extension
- Actions and state changes are logged
- Time-travel debugging available

### Console Logging
All async actions include console logging for debugging:
- Success responses are logged
- Errors are logged with full details

## Migration from Local State

When converting components from local state to Redux:

1. Identify what state needs to be global vs local
2. Move global state to appropriate Redux slice
3. Replace useState with useAppSelector
4. Replace state setters with dispatch calls
5. Handle loading and error states from Redux
6. Test thoroughly to ensure no functionality is lost

## Common Patterns

### Loading with Error Handling
```typescript
const { data, loading, error } = useAppSelector((state) => state.someSlice);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
return <DataComponent data={data} />;
```

### Form Submission
```typescript
const handleSubmit = async (formData: any) => {
  try {
    await dispatch(createSomething(formData)).unwrap();
    dispatch(addNotification({
      type: 'success',
      title: 'Success',
      message: 'Item created successfully'
    }));
  } catch (error) {
    dispatch(addNotification({
      type: 'error',
      title: 'Error',
      message: error.message
    }));
  }
};
```

### Search and Filter
```typescript
const { searchQuery, filterOptions } = useAppSelector((state) => state.ui);
const { items } = useAppSelector((state) => state.someSlice);

const filteredItems = useMemo(() => {
  return items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterOptions.category === 'all' || item.category === filterOptions.category;
    return matchesSearch && matchesFilter;
  });
}, [items, searchQuery, filterOptions]);
```

This guide should help you understand and effectively use Redux throughout the application. Remember to always use Redux for shared state and keep local state minimal.
