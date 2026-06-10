import { Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppHeroComponent } from '../../../../components/app-hero/app-hero';
import { StrapiService } from '../../../../core/services/strapi.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AppHeroComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage implements OnInit {
  private readonly strapiService = inject(StrapiService);

  technologies = [
    { name: 'Angular', initials: 'NG' },
    { name: 'React', initials: 'RC' },
    { name: 'TypeScript', initials: 'TS' },
    { name: 'Node.js', initials: 'NJ' },
    { name: 'Python', initials: 'PY' },
    { name: 'PostgreSQL', initials: 'PG' },
    { name: 'MongoDB', initials: 'MG' },
    { name: 'Docker', initials: 'DK' },
    { name: 'Git', initials: 'GT' }
  ];

  timeline = [
    { year: '2023', event: 'Inicio del equipo' },
    { year: '2024', event: 'Primeros proyectos' }
  ];

  servicios = this.strapiService.servicios;
  proyectos = this.strapiService.proyectos;
  programadores = this.strapiService.programadores;
  loading = this.strapiService.loading;
  error = this.strapiService.error;

  programadoresDinamicos = computed(() => {
    return this.programadores().map(dev => ({
      name: dev.name,
      role: dev.role,
      tagline: dev.tagline,
      slug: dev.slug,
      photo: dev.photo && dev.photo.length > 0 && dev.photo[0]?.url 
        ? `http://localhost:1337${dev.photo[0].url}` 
        : undefined,
      contact: dev.contact
    }));
  });

  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  submitted = false;

  ngOnInit(): void {
    this.strapiService.loadAllContent();
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  }

  submitContactForm() {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.message) {
      console.log('Formulario enviado:', this.contactForm);
      this.submitted = true;
      this.contactForm = { name: '', email: '', message: '' };
      setTimeout(() => {
        this.submitted = false;
      }, 3000);
    }
  }

  getImageUrl(url?: string): string {
    return this.strapiService.resolveImageUrl(url);
  }
}
