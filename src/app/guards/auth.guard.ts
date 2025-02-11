import { inject } from '@angular/core';
import {
  CanActivateFn,
  RedirectCommand,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../core/services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) {
    return true;
  } else {
    const urlTree: UrlTree = router.parseUrl('auth/sign-in');
    return new RedirectCommand(urlTree, { skipLocationChange: true });
  }
};
