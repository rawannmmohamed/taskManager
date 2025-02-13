import { createReducer, on } from '@ngrx/store';
import { AuthState, User } from '../../models/user';
import * as AuthActions from './auth.actions';


const initialState: AuthState = {
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, AuthActions.signupSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null
  })),
  on(AuthActions.loginFailure, AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(AuthActions.logout, () => ({
    user: null,
    error: null
  }))
);
