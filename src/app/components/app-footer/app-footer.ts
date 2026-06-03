import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './app-footer.html',
  styleUrl: './app-footer.css',
})
export class AppFooterComponent {
  readonly hoy = new Date();
  readonly costoCurso = 45.99;
  readonly progreso = signal(0.85);
  readonly estudiante = 'Jefferson Guerrero';
  readonly version = '21.0.0';
}
