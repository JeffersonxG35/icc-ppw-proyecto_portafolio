import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-feature-chip-list',
  imports: [],
  templateUrl: './feature-chip-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureChipList {
    title = input<string>('Características');
  chips = input<string[]>([]);
}
