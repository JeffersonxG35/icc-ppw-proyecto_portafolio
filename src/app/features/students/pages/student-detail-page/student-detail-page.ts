import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-student-detail-page',
  imports: [RouterLink],
  styleUrl: './student-detail-page.css',
  templateUrl: './student-detail-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentDetailPage {
  //ActivedRoute nos permite leer los parametros de la ruta 
  //que definimos en app.rout.ts
  
  private route = inject(ActivatedRoute);

  readonly id= this.route.snapshot.paramMap.get('id');

}