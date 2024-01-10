import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Injectable} from "@angular/core";
import { keycloak } from '../main';

@Injectable()
export class KeycloakInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (keycloak.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${keycloak.token}`
        }
      });
    }

    return next.handle(request);
  }
}

// Periodically update the Keycloak token
setInterval(() => {
  keycloak.updateToken(70).catch(() => {
    console.error('Failed to refresh token');
  });
}, 60000);
