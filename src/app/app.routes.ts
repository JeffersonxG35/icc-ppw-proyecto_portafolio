import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { AuthPage } from './features/auth/pages/auth-page/auth-page';
import { authGuard } from './core/guards/auth-guard';
import { MyRequestsPage } from './request/page/my-requests-page/my-requests-page';
import { adminGuard } from './core/guards/admin-guard';
import { RecivedRequestsPage } from './request/page/recived-requests-page/recived-requests-page/recived-requests-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'developer/:slug',
    loadComponent: () =>
      import('./features/developer/pages/developer-profile-page/developer-profile-page').then(
        (m) => m.DeveloperProfilePage,
      ),
  },

  { path: 'auth', component: AuthPage },
  { path: 'mis-solicitudes', component: MyRequestsPage, canActivate: [authGuard] },
  { path: 'solicitudes-recibidas', component: RecivedRequestsPage, canActivate: [adminGuard] },

  { path: '**', redirectTo: '' },
];
