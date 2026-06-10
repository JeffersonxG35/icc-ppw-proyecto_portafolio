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

  getAvatarUrl(name?: string) {
    return 'https://ui-avatars.com/api/?background=0f172a&color=22d3ee&bold=true&name=' + encodeURIComponent(name || '');
  }
  private router = inject(Router);

  get showCTA() {
    try {
      const current = this.router.url || '/';
      if (!this.developer || !this.developer.slug) return true;
      return !current.endsWith('/' + this.developer.slug) && current !== ('/' + this.developer.slug);
    } catch {
      return true;
    }
  }
}

