import { computed, inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  // Signal que almacena el usuario autenticado actual
  readonly currentUser = signal<User | null>(null);

  // Computed para rol del usuario (expandible en el futuro)
  readonly role = computed<'admin' | 'user' | null>(() => {
    return this.currentUser() ? 'user' : null;
  });

  constructor() {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser.set(user);
    });
  }

  // Inicia sesión con email y contraseña
  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((credential) => credential.user)
    );
  }

  // Registra un nuevo usuario con email y contraseña
  register(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map((credential) => credential.user)
    );
  }

  // Inicia sesión con Google
  loginWithGoogle(): Observable<User> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(
      map((credential) => credential.user)
    );
  }

  // Cierra sesión
  logout(): Observable<void> {
    return from(signOut(this.auth));
  }

  // Obtiene el UID del usuario actual
  get uid(): string | null {
    return this.currentUser()?.uid ?? null;
  }


}
