import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // Firebase providers are disabled until the Firebase project is configurado.
    // provideFirebaseApp(() => initializeApp({...})),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
  ],
};