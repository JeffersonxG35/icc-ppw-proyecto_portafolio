import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { getDeveloper } from '../../../../core/services/data';
import { DeveloperCardComponent } from '../../../../components/developer-card/developer-card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';
import { RequestService } from '../../../../core/services/request';

@Component({
  selector: 'app-developer-profile-page',
  standalone: true,
  imports: [CommonModule, RouterModule, DeveloperCardComponent, ReactiveFormsModule],
  templateUrl: './developer-profile-page.html',
  styleUrl: './developer-profile-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeveloperProfilePage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private requestService = inject(RequestService);

  requestForm = this.fb.group({
    projectDescription: ['', [Validators.required, Validators.minLength(20)]],
  });
  successMessage = '';
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
  async submitRequest() {
    if (this.requestForm.invalid) return;

    const user = this.authService.currentUser();

    if (!user) {
      alert('Debes iniciar sesión para enviar una solicitud');
      return;
    }

    try {
      await this.requestService.createRequest({
        userId: user.uid,
        userEmail: user.email ?? '',
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
