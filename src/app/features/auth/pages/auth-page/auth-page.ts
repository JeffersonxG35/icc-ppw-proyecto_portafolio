import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';

@Component({
  selector: 'app-auth-page',
  imports: [ReactiveFormsModule],
  templateUrl: './auth-page.html',
  styleUrl: './auth-page.css',
})
export class AuthPage {
    private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // true = mostrar login, false = mostrar registro.
  isLogin = signal(true);

  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  // Un solo formulario sirve para ambos modos.
  authForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Alterna entre modo login y registro, limpiando errores previos.
  toggleMode() {
    this.isLogin.update((v) => !v);
    this.errorMessage.set(null);
    this.authForm.reset();
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const { email, password } = this.authForm.value;
    this.isLoading.set(true);
    this.errorMessage.set(null);

    // Seleccionamos la accion segun el modo activo.
    const action$ = this.isLogin()
      ? this.authService.login(email!, password!)
      : this.authService.register(email!, password!);

    action$.subscribe({
      next: () => {
        // Tanto login como registro navegan a home al completarse.
        this.router.navigate(['/']);
      },
      error: () => {
        this.errorMessage.set(
          this.isLogin()
            ? 'Correo o contrasena incorrectos.'
            : 'No se pudo crear la cuenta. El correo puede estar en uso.'
        );
        this.isLoading.set(false);
      },
    });

    
  }

  // 👇 NUEVA FUNCIÓN PARA EL BOTÓN DE GOOGLE
  loginWithGoogle() {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.authService.loginWithGoogle().subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage.set('Ocurrió un error al iniciar sesión con Google.');
        this.isLoading.set(false);
      }
    });
  }
  
}
