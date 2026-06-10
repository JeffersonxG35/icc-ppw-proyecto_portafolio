import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),

    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyCk3ikzj9JdrY_L59blSV8PSzwQuadAmCQ',
        authDomain: 'portafolio-cc89d.firebaseapp.com',
        projectId: 'portafolio-cc89d',
        storageBucket: 'portafolio-cc89d.firebasestorage.app',
        messagingSenderId: '562093655046',
        appId: '1:562093655046:web:f093dcf13baf92c6852f87',
        measurementId: 'G-CDBQ400N2M',
      }),
    ),

    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
