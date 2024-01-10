// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import Keycloak from 'keycloak-js';

export const keycloak = new Keycloak({
  url: 'http://keycloak.szut.dev/auth',
  realm: 'szut',
  clientId: 'employee-management-service',
});

keycloak.init({ onLoad: 'login-required' })
  .then(authenticated => {
    console.log(authenticated ? 'Authenticated' : 'Not authenticated');
    bootstrapApplication(AppComponent, appConfig)
      .catch((err) => console.error(err));
  })
  .catch(() => {
    console.error('Failed to initialize Keycloak');
  });
