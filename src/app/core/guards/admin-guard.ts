import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.currentUser()) {
    router.navigate(['/auth']);
    return false;
  }

  if (authService.role() === 'admin') {
    return true;
  }

  router.navigate(['/']);
  return false;
};
