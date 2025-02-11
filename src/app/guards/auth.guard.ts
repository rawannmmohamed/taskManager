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
  console.log('Guard check running'); 
  if (authService.isLoggedIn()) {
    console.log("logged In");
    return true;
  } else {
    console.log("not logged In");
    const urlTree: UrlTree = router.parseUrl('auth/sign-in');
    return new RedirectCommand(urlTree, { skipLocationChange: true });
  }
};
