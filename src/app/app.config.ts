import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {TokenInterceptor} from "./TokenInterceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(KeycloakAngularModule),
    {provide: APP_INITIALIZER, useFactory: initializeKeycloak, multi: true, deps: [KeycloakService]},
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
};

export function initializeKeycloak(keycloak: KeycloakService): () => Promise<boolean> {
  return (): Promise<boolean> =>
    keycloak.init({
      config: {
        url: 'https://keycloak.szut.dev/auth/',
        realm: 'szut',
        clientId: 'employee-management-service',
      },
      initOptions: {
        //onLoad: 'check-sso',
        onLoad: 'login-required',
      },
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/assets'],
    })
}



