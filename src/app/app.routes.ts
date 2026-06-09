import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/pages/home-page/home-page').then((m) => m.HomePage),
  },
  {
    path: 'developer/:slug',
    loadComponent: () => import('./features/developer/pages/developer-profile-page/developer-profile-page').then((m) => m.DeveloperProfilePage),
  },
  { path: '**', redirectTo: '' },
];
