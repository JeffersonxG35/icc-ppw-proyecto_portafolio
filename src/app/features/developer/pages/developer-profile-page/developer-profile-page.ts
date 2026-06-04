import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getDeveloper } from '../../../../core/services/data';
import { DeveloperCardComponent } from '../../../../components/developer-card/developer-card';

@Component({
  selector: 'app-developer-profile-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DeveloperCardComponent],
  templateUrl: './developer-profile-page.html',
  styleUrl: './developer-profile-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeveloperProfilePage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  slug = computed(() => this.route.snapshot.paramMap.get('slug') || '');
  developer = computed(() => getDeveloper(this.slug()));

  constructor() {
    effect(() => {
      if (this.slug() && !this.developer()) {
        this.router.navigate(['/']);
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}
