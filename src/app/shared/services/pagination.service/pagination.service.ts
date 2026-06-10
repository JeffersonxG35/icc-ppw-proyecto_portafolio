import { ChangeDetectionStrategy, Component, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-pagination.service',
  imports: [],
  templateUrl: './pagination.service.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

@Injectable({ providedIn: 'root' })
export class PaginationService {
  private activatedRoute = inject(ActivatedRoute);

  currentPage = toSignal(
    this.activatedRoute.queryParamMap.pipe(
      map(params => Number(params.get('page') ?? '1'))
    ),
    { initialValue: 1 }
  );
}
