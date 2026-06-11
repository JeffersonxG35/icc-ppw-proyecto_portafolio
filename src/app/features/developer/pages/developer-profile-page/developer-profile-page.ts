import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DeveloperCardComponent } from '../../../../components/developer-card/developer-card';
import { StrapiService } from '../../../../core/services/strapi.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';
import { RequestService } from '../../../../core/services/request';

@Component({
  selector: 'app-developer-profile-page',
  imports: [CommonModule, RouterModule, DeveloperCardComponent, ReactiveFormsModule],
  templateUrl: './developer-profile-page.html',
  styleUrl: './developer-profile-page.css',
})
export class DeveloperProfilePage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly strapiService = inject(StrapiService);
  private fb = inject(FormBuilder);
  readonly authService = inject(AuthService);
  private requestService = inject(RequestService);

  requestForm = this.fb.group({
    projectDescription: ['', [Validators.required, Validators.minLength(20)]],
  });
  successMessage = '';
  slug = computed(() => this.route.snapshot.paramMap.get('slug') || '');

  developer = this.strapiService.developerDetail;

  getImageUrl(url?: string): string {
    return this.strapiService.resolveImageUrl(url);
  }

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
        },
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
  constructor() {
    effect(() => {
      if (this.slug() && !this.developer()) {
        this.router.navigate(['/']);
      }
    });
  }

  async submitRequest() {
    if (this.requestForm.invalid) return;

    const user = this.authService.currentUser();

    if (!user) {
      alert('Debes iniciar sesión para enviar una solicitud');
      return;
    }

    try {
      const userName = user.displayName ?? user.email ?? '';

      await this.requestService.createRequest({
        userId: user.uid,
        userEmail: user.email ?? '',

        userName,
        developerSlug: this.slug(),
        projectDescription: this.requestForm.value.projectDescription ?? '',
      });

      this.successMessage = 'Solicitud enviada correctamente';
      this.requestForm.reset();
    } catch (error) {
      console.error(error);
      this.successMessage = 'Ocurrió un error al enviar la solicitud';
    }
  }
}
