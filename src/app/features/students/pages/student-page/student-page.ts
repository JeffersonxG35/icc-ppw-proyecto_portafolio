import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-page',
  imports: [RouterLink],
  styleUrl: './student-page.css',
  templateUrl: './student-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentPage {
  readonly students = signal([
    { id: 1, name: 'Jefferson' },
    { id: 2, name: 'Maria' },
    { id: 3, name: 'Leonel' },
    { id: 4, name: 'Pepe' },
    { id: 5, name: 'Juan' },
  ]);
}
