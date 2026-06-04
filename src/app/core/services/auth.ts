import { computed, Injectable, signal } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly user = signal<null>(null);
  readonly currentUser = signal<null>(null);
  readonly role = computed<'admin' | 'user' | null>(() => null);

  login(email: string, password: string) {
    console.warn('Firebase no está configurado. login() devuelve null.');
    return of(null);
  }

  register(email: string, password: string) {
    console.warn('Firebase no está configurado. register() devuelve null.');
    return of(null);
  }

  loginWithGoogle() {
    console.warn('Firebase no está configurado. loginWithGoogle() devuelve null.');
    return of(null);
  }

  logout() {
    console.warn('Firebase no está configurado. logout() devuelve null.');
    return of(null);
  }

  get uid(): string | null {
    return null;
  }

  isAdmin() {
    return of(false);
  }
}
