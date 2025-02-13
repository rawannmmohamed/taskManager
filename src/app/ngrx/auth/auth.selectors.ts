import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../models/user';

// Select the auth state
const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selector for user
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

// Selector for error message
export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
