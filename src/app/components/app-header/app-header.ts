import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [UpperCasePipe, RouterLink, RouterLinkActive],
  templateUrl: './app-header.html',
  styleUrl: './app-header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppHeaderComponent {
  readonly brand = signal('PPW Angular');
  readonly showInfo = signal(false);
  readonly toggleLabel = computed(() => (this.showInfo() ? 'Ocultar info' : 'Mostrar info'));

  toggleInfo() {
    this.showInfo.update((value) => !value);
  }
  changeBrand(): void {
    //actualiza el valor de la señal brand
    this.brand.update((valor) => valor + '!');
  }

  resetBrand(): void {
    this.brand.set('PPW Angular');
  }
}
