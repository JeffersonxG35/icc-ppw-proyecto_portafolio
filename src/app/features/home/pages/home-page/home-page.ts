import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppHeroComponent } from '../../../../components/app-hero/app-hero';
import { developers, technologies, projects, timeline, Project } from '../../../../core/services/data';
import { StrapiService } from '../../../../core/services/strapi.service';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AppHeroComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomePage {
  private readonly strapiService = inject(StrapiService);

  developers = developers;
  technologies = technologies;
  localProjects = projects;
  timeline = timeline;

  featuredProjects = computed<Project[]>(() =>
    this.strapiService.featuredProjects().length ? this.strapiService.featuredProjects() : this.localProjects
  );

  services = [
    { title: 'Desarrollo Web', description: 'Interfaces accesibles, responsivas y con alto rendimiento.' },
    { title: 'Arquitectura de Software', description: 'Sistemas escalables con diseño modular y documentación clara.' },
    { title: 'Cloud & DevOps', description: 'Implementaciones seguras en la nube con despliegues automatizados.' },
    { title: 'Consultoría Técnica', description: 'Roadmaps, análisis de requerimientos y asesoría en producto digital.' },
  ] as const;

  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  submitted = false;

  constructor() {
    this.strapiService.loadFeaturedProjects().subscribe();
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
}