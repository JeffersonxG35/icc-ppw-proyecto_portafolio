import { input, Component } from '@angular/core';

@Component({
  selector: 'app-feature-chip-list',
  imports: [],
  templateUrl: './feature-chip-list.html',
})
export class FeatureChipList {
  title = input<string>('Características');
  chips = input<string[]>([]);
}
