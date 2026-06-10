import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppHeroComponent } from '../../../../components/app-hero/app-hero';
import { technologies, timeline } from '../../../../core/services/data';
import { StrapiService } from '../../../../core/services/strapi.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AppHeroComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css' // <-- Eliminamos ChangeDetectionStrategy para activar la reactividad automática
})
export class HomePage implements OnInit {
  // Inyección moderna con inject()
  private readonly strapiService = inject(StrapiService);

  // Datos estáticos
  technologies = technologies;
  timeline = timeline;

  // Enlazamos directamente las Signals del servicio centralizado
  servicios = this.strapiService.servicios;
  proyectos = this.strapiService.proyectos;
  programadores = this.strapiService.programadores;
  loading = this.strapiService.loading;
  error = this.strapiService.error;

  // Formulario de contacto
  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  submitted = false;

  ngOnInit(): void {
    // Forzamos la carga de los datos de Strapi al inicializar
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