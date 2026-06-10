import { CanActivateFn } from '@angular/router';

export const guestGuard: CanActivateFn = () => {
  // Firebase no está configurado. Se permite el acceso temporalmente.
  return true;
};
