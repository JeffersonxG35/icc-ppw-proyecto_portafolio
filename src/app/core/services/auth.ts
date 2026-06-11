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
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);

  // Signal que almacena el usuario autenticado actual
  readonly currentUser = signal<User | null>(null);

  // Signal que almacena el rol obtenido desde Firestore o deducido
  private userRole = signal<'admin' | 'user' | null>(null);

  // Computed para rol del usuario (expuesto públicamente)
  readonly role = computed<'admin' | 'user' | null>(() => {
    return this.userRole();
  });

  private firestore = inject(Firestore);

  constructor() {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(this.auth, async (user) => {
      this.currentUser.set(user);

      try {
        if (user) {
          // Intentar leer documento de usuario en Firestore para obtener rol
          const ref = doc(this.firestore, 'users', user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data() as any;
            const r = (data.rol as string) ?? null; // Firestore field is 'rol'
            this.userRole.set(r === 'admin' ? 'admin' : 'user');
            return;
          }
          // Si no existe documento, intentar inferir rol desde el email (fallback)
          const email = user.email ?? '';
          const isAdminEmail = email.endsWith('@example.com') || email === 'admin@example.com';
          this.userRole.set(isAdminEmail ? 'admin' : 'user');
        } else {
          this.userRole.set(null);
        }
      } catch (err) {
        console.error('Error obteniendo rol de usuario:', err);
        // En caso de error, asumir usuario normal si está autenticado
        this.userRole.set(user ? 'user' : null);
      }
    });
  }

  // Inicia sesión con email y contraseña
  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      map((credential) => credential.user),
    );
  }

  // Registra un nuevo usuario con email y contraseña
  register(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      map((credential) => credential.user),
    );
  }

  // Inicia sesión con Google
  loginWithGoogle(): Observable<User> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider)).pipe(map((credential) => credential.user));
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
