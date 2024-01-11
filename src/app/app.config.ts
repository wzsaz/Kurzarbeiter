import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {KeycloakService} from "keycloak-angular";
import {initializeKeycloak} from "../main";

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: APP_INITIALIZER, useFactory: initializeKeycloak, multi: true, deps: [KeycloakService]},
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
};
