import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { DeveloperProfilePage } from './features/developer/pages/developer-profile-page/developer-profile-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: ':slug', component: DeveloperProfilePage },
  // Catch-all redirect
  { path: '**', redirectTo: '' },
];
