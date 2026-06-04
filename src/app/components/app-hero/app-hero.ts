import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeveloperCardComponent } from '../developer-card/developer-card';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, DeveloperCardComponent],
  templateUrl: './app-hero.html',
  styleUrl: './app-hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeroComponent {
  readonly title = signal('Desarrolladores de Software Moderno');
  readonly description = signal(
    'Transformamos ideas en aplicaciones escalables, accesibles y con una experiencia de usuario impecable.'
  );

  // Agregamos la propiedad 'slug' de forma explícita a cada perfil
  readonly developers = signal([
    {
      name: 'Milton Chuqui',
      role: 'Frontend & UI',
      tagline: 'Diseño interactivo con foco en rendimiento',
      slug: 'milton',
      image: '/assets/milton.jpg'
    },
    {
      name: 'Jefferson Guerrero',
      role: 'Full Stack',
      tagline: 'Arquitectura, APIs y experiencia productiva',
      slug: 'jefferson',
      image: '/assets/jefferson.jpg'
    },
  ] as const);

  scrollToSection(id: string) {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  contact() {
    window.location.href = 'mailto:contacto@ejemplo.com';
  }
}