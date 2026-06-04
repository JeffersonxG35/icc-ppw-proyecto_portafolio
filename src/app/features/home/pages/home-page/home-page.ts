import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppHeroComponent } from '../../../../components/app-hero/app-hero';
import { developers, technologies, projects, timeline } from '../../../../core/services/data';



@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, AppHeroComponent],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HomePage {
  developers = developers;
  technologies = technologies;
  projects = projects;
  timeline = timeline;

  contactForm = {
    name: '',
    email: '',
    message: ''
  };

  submitted = false;

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