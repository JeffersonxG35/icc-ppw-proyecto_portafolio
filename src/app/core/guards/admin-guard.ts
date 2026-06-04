import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  // Firebase no está configurado. Se permite el acceso temporalmente.
  return true;
};