// hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Custom hook for useDispatch with AppDispatch type
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Custom hook for useSelector with RootState type
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
