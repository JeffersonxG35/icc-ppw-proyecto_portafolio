import { Component, ChangeDetectionStrategy, signal, Input } from '@angular/core';
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
  @Input() set overrideDevelopers(value: any[]) {
    if (value && value.length > 0) {
      this.developers.set(value);
    }
  }

  readonly title = signal('Desarrolladores de Software Moderno');
  readonly description = signal(
    'Transformamos ideas en aplicaciones escalables, accesibles y con una experiencia de usuario impecable.'
  );

  readonly developers = signal<any[]>([
    {
      name: 'Milton Chuqui',
      role: 'Frontend & UI',
      tagline: 'Diseño interactivo con foco en rendimiento',
      slug: 'programador-1', 
      image: '/assets/milton.jpg',
      contact: { github: 'https://github.com/Milton082', linkedin: 'https://www.linkedin.com', email: 'contacto@email.com' }
    },
    {
      name: 'Jefferson Guerrero',
      role: 'Full Stack',
      tagline: 'Arquitectura, APIs y experiencia productiva',
      slug: 'programador-2', 
      image: 'http://localhost:1337/jefferson.png',
      contact: { github: 'https://github.com/JeffersonxG35', linkedin: 'https://www.linkedin.com/feed/', email: 'jeffersonguerrero939@gmail.com' }
    },
  ]);
}