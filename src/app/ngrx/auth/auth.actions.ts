import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';


// Action for logging in
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Action for signing up
export const signup = createAction(
  '[Auth] Signup',
  props<{ email: string; password: string; role: 'user' }>()
);

export const signupSuccess = createAction(
  '[Auth] Signup Success',
  props<{ user: User }>()
);

export const signupFailure = createAction(
  '[Auth] Signup Failure',
  props<{ error: string }>()
);

// Action for logging out
export const logout = createAction('[Auth] Logout');
