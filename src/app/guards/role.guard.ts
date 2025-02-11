import {
  CanActivateChildFn,
  RedirectCommand,
  Router,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isAdmin()) {
    return true;
  } else {
    const urlTree: UrlTree = router.parseUrl('dashboard/user');
    return new RedirectCommand(urlTree, { skipLocationChange: true });
  }
};
