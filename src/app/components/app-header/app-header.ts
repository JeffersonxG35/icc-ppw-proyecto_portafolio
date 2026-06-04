import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

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
