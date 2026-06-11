import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth';
import { RequestService, ContactRequest } from '../../../core/services/request';

@Component({
  selector: 'app-my-requests-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-requests-page.html',
})
export class MyRequestsPage {
  private authService = inject(AuthService);
  private requestService = inject(RequestService);

  requests = signal<ContactRequest[]>([]);

  constructor() {
    const user = this.authService.currentUser();

    if (!user) return;

    this.requestService.getRequestsByUser(user.uid).subscribe((data) => {
      this.requests.set(data);
    });
  }
}
