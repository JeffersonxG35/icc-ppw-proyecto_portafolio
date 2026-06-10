import { Component, ChangeDetectionStrategy, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DeveloperCardComponent } from '../developer-card/developer-card';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, DeveloperCardComponent],
  templateUrl: './app-hero.html',
  styleUrl: './app-hero.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeroComponent {
  @Input() set overrideDevelopers(value: any[]) {
    if (value && value.length > 0) {
      this.developers.set(value);
    }
  }

  readonly title = signal('Desarrolladores de Software Moderno');
  readonly description = signal(
    'Transformamos ideas en aplicaciones escalables, accesibles y con una experiencia de usuario impecable.'
  );

  readonly developers = signal<any[]>([]);
}
