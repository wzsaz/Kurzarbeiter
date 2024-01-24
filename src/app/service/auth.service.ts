import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { TokenResponseDTO } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly refreshToken$: Observable<TokenResponseDTO | null>;

  constructor(private keycloak: KeycloakService) {
    this.refreshToken$ = this.initTokenRefresh();
  }

  getAccessTokenV2(): Observable<TokenResponseDTO | null> {
    return this.refreshToken$;
  }

  private initTokenRefresh(): Observable<TokenResponseDTO | null> {
    return timer(0, 60000)
      .pipe(
        switchMap(() => this.refreshToken()),
        tap(token => {
          if (token) {
            const date = new Date();
            date.setMilliseconds(date.getMilliseconds() + token.expires_in);
            console.log(`Token refreshed, expires at: ${date.toLocaleString()}`);
          }
        })
      );
  }

  private refreshToken(): Observable<TokenResponseDTO | null> {
    return new Observable<TokenResponseDTO>(observer => {
      this.keycloak.updateToken(30) // refresh token if it's expired or will expire in the next 30s
        .then(() => {
          const keycloakInstance = this.keycloak.getKeycloakInstance();
          const token = keycloakInstance.token;
          const tokenParsed = keycloakInstance.tokenParsed;

          if (token && tokenParsed) {
            observer.next({
              access_token: token,
              token_type: "bearer",
              expires_in: tokenParsed['exp'] ?? 0,
              refresh_expires_in: tokenParsed['refresh_exp'] ?? 0,
              refresh_token: keycloakInstance.refreshToken ?? "",
              'not-before-policy': tokenParsed['nbf'] ?? 0,
              session_state: keycloakInstance.sessionId ?? "",
              scope: tokenParsed['scope'] ?? ""
            });
            observer.complete();
          } else {
            console.error("Token or parsed token is undefined");
            observer.error("Token or parsed token is undefined");
          }
        })
        .catch(error => {
          console.error("Error refreshing token: ", error);
          observer.error(error);
        });
    });
  }

  logout() {
    this.keycloak.logout().then(r =>
      console.log("Logout: ", r)
    ).catch(error =>
      console.error("Error logging out: ", error)
    );
  }
}
