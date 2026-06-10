import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterComponent {
  readonly brand = 'Milton & Jefferson';
  readonly description = 'Desarrolladores de software construyendo productos digitales con pasión.';
  readonly year = new Date().getFullYear();

  readonly quickLinks = [
    { label: 'Nosotros', id: 'nosotros' },
    { label: 'Proyectos', id: 'proyectos' },
    { label: 'Tecnologías', id: 'tecnologias' },
    { label: 'Contacto', id: 'contacto' },
  ] as const;

  readonly socials = [
    { label: 'GitHub', href: 'https://github.com/JeffersonxG35/icc-ppw-proyecto_portafolio', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
    { label: 'Correo', href: 'mailto:contacto@ejemplo.com', icon: 'mail' },
  ] as const;
}