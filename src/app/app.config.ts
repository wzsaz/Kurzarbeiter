import {APP_INITIALIZER, ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {provideAnimations} from "@angular/platform-browser/animations";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {NgcCookieConsentConfig, provideNgcCookieConsent} from "ngx-cookieconsent";

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost'
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out',
  layout: 'my-custom-layout',
  layouts: {
    "my-custom-layout": '{{messagelink}}{{compliance}}'
  },
  elements: {
    messagelink: `
      <span id="cookieconsent:desc" class="cc-message">{{message}}
        <a aria-label="learn more about cookies" tabindex="0" class="cc-link" href="{{cookiePolicyHref}}" target="_blank">{{cookiePolicyLink}}</a>.
        We also have a <a aria-label="learn more about our privacy policy" tabindex="1" class="cc-link" href="{{privacyPolicyHref}}" target="_blank">{{privacyPolicyLink}}</a> and
        <a aria-label="learn more about our terms of service" tabindex="2" class="cc-link" href="{{tosHref}}" target="_blank">{{tosLink}}</a>.
        Enjoy your stay!</span>
    `,
  },
  content: {
    message: 'This website uses cookies. By continuing, you agree to be bombarded with our delicious cookies. ',
    cookiePolicyLink: 'Cookie Policy',
    cookiePolicyHref: 'http://localhost:4200/privacy-policy',
    privacyPolicyLink: 'Privacy Policy',
    privacyPolicyHref: 'http://localhost:4200/privacy-policy',
    tosLink: 'Terms of Service',
    tosHref: 'http://localhost:4200/privacy-policy'
  }
};

const keycloakProvider = [
  {provide: APP_INITIALIZER, useFactory: initializeKeycloak, multi: true, deps: [KeycloakService]},
]

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(KeycloakAngularModule),
    keycloakProvider,
    provideNgcCookieConsent(cookieConfig),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
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
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    })
}
