import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFooterComponent {
  readonly brand = 'Milton & Jefferson';
  readonly description = 'Desarrolladores de software construyendo productos digitales con pasión.';
  readonly year = new Date().getFullYear();

  readonly quickLinks = [
    { label: 'Nosotros', href: '/#nosotros' },
    { label: 'Proyectos', href: '/#proyectos' },
    { label: 'Experiencia', href: '/#experiencia' },
    { label: 'Contacto', href: '/#contacto' },
  ] as const;

  readonly socials = [
    { label: 'GitHub', href: 'https://github.com/', icon: 'github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
    { label: 'Correo', href: 'mailto:contacto@ejemplo.com', icon: 'mail' },
  ] as const;
}
