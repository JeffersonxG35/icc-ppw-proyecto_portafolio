import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { DeveloperProfilePage } from './features/developer/pages/developer-profile-page/developer-profile-page';
import { AuthPage } from './features/auth/pages/auth-page/auth-page';
import { MyRequestsPage } from './features/requests/pages/my-requests-page/my-requests-page';
import { ReceivedRequestsPage } from './features/requests/pages/received-requests-page/received-requests-page';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
  { path: '', component: HomePage },

  { path: 'auth', component: AuthPage },
  { path: 'mis-solicitudes', component: MyRequestsPage, canActivate: [authGuard] },
  { path: 'solicitudes-recibidas', component: ReceivedRequestsPage, canActivate: [adminGuard] },

  { path: ':slug', component: DeveloperProfilePage },

  { path: '**', redirectTo: '' },
];
