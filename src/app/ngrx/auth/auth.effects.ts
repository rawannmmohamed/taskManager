import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import * as AuthActions from './auth.actions';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(private authService: AuthService,  private router: Router ) {}
  private actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((user: User | null) =>
            user
              ? AuthActions.loginSuccess({ user })
              : AuthActions.loginFailure({ error: 'Invalid email or password' })
          ),
          catchError(() =>
            of(AuthActions.loginFailure({ error: 'Login failed' }))
          )
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ email, password, role }) =>
        this.authService.signup(email, password, role).pipe(
          map((user: User) => AuthActions.signupSuccess({ user })),
          catchError(() =>
            of(AuthActions.signupFailure({ error: 'Signup failed' }))
          )
        )
      )
    )
  );
  
}
