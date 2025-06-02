
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { useCallback } from 'react';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Enhanced hooks for specific slices
export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  
  return {
    ...auth,
    dispatch,
  };
};

export const useForms = () => {
  const forms = useAppSelector((state) => state.forms);
  const dispatch = useAppDispatch();
  
  return {
    ...forms,
    dispatch,
  };
};

export const useResumes = () => {
  const resumes = useAppSelector((state) => state.resumes);
  const dispatch = useAppDispatch();
  
  return {
    ...resumes,
    dispatch,
  };
};

export const useUI = () => {
  const ui = useAppSelector((state) => state.ui);
  const dispatch = useAppDispatch();
  
  return {
    ...ui,
    dispatch,
  };
};

export const usePlatform = () => {
  const platform = useAppSelector((state) => state.platform);
  const dispatch = useAppDispatch();
  
  return {
    ...platform,
    dispatch,
  };
};

export const useNavigation = () => {
  const navigation = useAppSelector((state) => state.navigation);
  const dispatch = useAppDispatch();
  
  return {
    ...navigation,
    dispatch,
  };
};

export const useApp = () => {
  const app = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();
  
  return {
    ...app,
    dispatch,
  };
};

// Utility hook for creating memoized selectors
export const useAppSelectorMemo = <T>(
  selector: (state: RootState) => T,
  deps?: React.DependencyList
) => {
  const memoizedSelector = useCallback(selector, deps || []);
  return useAppSelector(memoizedSelector);
};
