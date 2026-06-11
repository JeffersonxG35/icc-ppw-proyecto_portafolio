import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../../../core/services/auth';
import { ContactRequest, RequestService } from '../../../../core/services/request';

@Component({
  selector: 'app-recived-requests-page',
  imports: [],
  templateUrl: './recived-requests-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecivedRequestsPage {
  private authService = inject(AuthService);
  private requestService = inject(RequestService);

  requests = signal<ContactRequest[]>([]);

  responses = signal<Record<string, string>>({});

  constructor() {
    effect(() => {
      const user = this.authService.currentUser();
      const role = this.authService.role();

      if (!user || !role) return;

      if (role === 'admin') {
        this.requestService.getAllRequests().subscribe((data) => {
          this.requests.set(data);
        });
      } else {
        this.requestService.getRequestsByUser(user.uid).subscribe((data) => {
          this.requests.set(data);
        });
      }
    });
  }

  setResponse(id: string, value: string) {
    this.responses.update((r) => ({ ...r, [id]: value }));
  }

  saveResponse(id: string) {
    const response = this.responses()[id];
    if (!response) return;

    this.requestService.respondRequest(id, response).then(() => {
      this.requests.update((list) =>
        list.map((r) => (r.id === id ? { ...r, response, status: 'Respondida' } : r)),
      );
    });
  }

  changeStatus(id: string, status: 'Pendiente' | 'En proceso' | 'Respondida') {
    this.requestService.updateStatus(id, status).then(() => {
      this.requests.update((list) => list.map((r) => (r.id === id ? { ...r, status } : r)));
    });
  }
}
