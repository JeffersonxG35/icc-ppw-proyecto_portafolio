import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { StudentDetailPage } from './features/students/pages/student-detail-page/student-detail-page';
import { StudentPage } from './features/students/pages/student-page/student-page';
import { SignupPage } from './features/signup/pages/signup-page/signup-page';
import { LayoutsPage } from './features/layouts/pages/layouts-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';
import ProjectConfigPage from './features/project/pages/project-config-page/project-config-page';
import { UiComponentsPage } from './features/ui-components/pages/ui-components-page/ui-components-page';
import { SimpsonsPage } from './features/simpsons/pages/simpsons-page/simpsons-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'students', component: StudentPage },
  { path: 'students/:id', component: StudentDetailPage },
  { path: 'layouts', component: LayoutsPage },
  { path: 'signup', component: SignupPage },
  { path: 'profile', component: ProfilePage },
  { path: 'project-config', component: ProjectConfigPage },
  { path: 'ui-components', component: UiComponentsPage },
  { path: 'simpsons', component: SimpsonsPage },
  //redireccionamiento
  { path: '**', redirectTo: '' },
];
