import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si hay usuario autenticado, permite el acceso
  if (authService.currentUser()) {
    return true;
  }

  // Si no hay usuario, redirige al login
  router.navigate(['/auth']);
  return false;
};
