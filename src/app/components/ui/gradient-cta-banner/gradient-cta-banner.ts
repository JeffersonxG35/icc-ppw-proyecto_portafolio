import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-gradient-cta-banner',
  imports: [],
  templateUrl: './gradient-cta-banner.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GradientCtaBanner {
   eyebrow = input<string>('Componente destacado');
  title = input.required<string>();
  description = input.required<string>();
  actionLabel = input<string>('Ver mas');
}
