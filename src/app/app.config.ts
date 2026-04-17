import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({
    apiKey: "AIzaSyAWeN5a3ttaPT4zkO7rXgSyAkct0tFsbFs",
    authDomain: "commerce-2cf04.firebaseapp.com",
    projectId: "commerce-2cf04",
    storageBucket: "commerce-2cf04.firebasestorage.app",
    messagingSenderId: "543783940592",
    appId: "1:543783940592:web:ffb64289c840f8bd86ed35"
})),
    provideAuth(() => getAuth())
  ]
};