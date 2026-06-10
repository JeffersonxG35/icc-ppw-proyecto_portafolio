import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-developer-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './developer-card.html',
  styleUrls: ['./developer-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeveloperCardComponent {
  @Input() developer!: {
    name: string;
    role: string;
    tagline: string;
    slug: string;
    photo?: string;
    image?: string;
    contact?: {
      github?: string;
      linkedin?: string;
      email?: string;
    };
  };

  // Input para identificar si está en modo perfil (imagen más grande)
  @Input() profileMode: boolean = false;

  private router = inject(Router);

  // Obtener la URL de la foto, priorizando 'photo' sobre 'image'
  getPhotoUrl(): string {
    // Prioridad 1: photo (desde Strapi)
    if (this.developer.photo) {
      return this.developer.photo;
    }
    
    // Prioridad 2: image (legacy)
    if (this.developer.image) {
      return this.developer.image;
    }
    
    // Fallback: avatar generado con iniciales
    return this.getAvatarUrl(this.developer.name);
  }

  getAvatarUrl(name?: string): string {
    return 'https://ui-avatars.com/api/?background=0f172a&color=22d3ee&bold=true&name=' + encodeURIComponent(name || '');
  }

  get showCTA(): boolean {
    try {
      const current = this.router.url || '/';
      if (!this.developer || !this.developer.slug) return true;
      const developerPath = `/developer/${this.developer.slug}`;
      return !current.endsWith(developerPath) && current !== developerPath;
    } catch {
      return true;
    }
  }
}
