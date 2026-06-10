import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeveloperCardComponent } from '../../../../components/developer-card/developer-card';
import { StrapiService } from '../../../../core/services/strapi.service';

@Component({
  selector: 'app-developer-profile-page',
  imports: [CommonModule, RouterModule, DeveloperCardComponent],
  templateUrl: './developer-profile-page.html',
  styleUrl: './developer-profile-page.css'
})
export class DeveloperProfilePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly strapiService = inject(StrapiService);

  slug = computed(() => this.route.snapshot.paramMap.get('slug') || '');
  
  developer = this.strapiService.developerDetail;

  ngOnInit(): void {
    const currentSlug = this.slug();
    if (currentSlug) {
      this.strapiService.getProgramadorBySlug(currentSlug).subscribe({
        next: (data) => {
          if (!data) {
            console.warn('Programador no encontrado en Strapi.');
            this.router.navigate(['/']);
          }
        },
        error: () => {
          this.router.navigate(['/']);
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  goHome() {
    this.router.navigate(['/']);
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }
}