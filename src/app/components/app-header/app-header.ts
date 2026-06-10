import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'handleScroll()',
  },
})
export class AppHeaderComponent {
  private authService = inject(AuthService);

  role = this.authService.role;
  private router = inject(Router);
  readonly brand = signal('M & J');
  readonly open = signal(false);
  readonly scrolled = signal(false);

  readonly menuLabel = computed(() => (this.open() ? 'Cerrar menú' : 'Abrir menú'));

  readonly sections = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'nosotros', label: 'Nosotros' },
    { id: 'tecnologias', label: 'Tecnologías' },
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'contacto', label: 'Contacto' },
  ] as const;

  // El signal del servicio: null = no autenticado, User = autenticado.
  currentUser = this.authService.currentUser;

  logout() {
    this.authService.logout().subscribe(() => {
      // Redirige al login despues de cerrar sesion.
      this.router.navigate(['/login']);
    });
  }
  toggleMenu() {
    this.open.update((value) => !value);
  }

  closeMenu() {
    this.open.set(false);
  }

  navigateToSection(sectionId: string) {
    this.closeMenu();
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  handleScroll() {
    this.scrolled.set(window.scrollY > 16);
  }
}
