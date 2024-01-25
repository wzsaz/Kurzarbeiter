import { Injectable } from '@angular/core';
import { Observable, of, timer } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { TokenResponseDTO } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly refreshToken$: Observable<TokenResponseDTO>;

  constructor(private keycloak: KeycloakService) {
    this.refreshToken$ = this.initTokenRefresh();
  }

  getAccessTokenV2(): Observable<TokenResponseDTO> {
    return this.refreshToken$;
  }

  private initTokenRefresh(): Observable<TokenResponseDTO> {
    return timer(0, 60000)
      .pipe(
        switchMap(() => this.refreshToken()),
        tap(token => this.logTokenRefresh(token))
      );
  }

  private refreshToken(): Observable<TokenResponseDTO> {
    return new Observable<TokenResponseDTO>(observer => {
      this.keycloak.updateToken(30)
        .then(() => this.handleTokenRefresh(observer))
        .catch(error => observer.error(error));
    });
  }

  private handleTokenRefresh(observer: any) {
    const keycloakInstance = this.keycloak.getKeycloakInstance();
    const token = keycloakInstance.token;
    const tokenParsed = keycloakInstance.tokenParsed;

    if (token && tokenParsed) {
      observer.next(this.createTokenResponseDTO(token, tokenParsed, keycloakInstance));
      observer.complete();
    } else {
      observer.error("Token or parsed token is undefined");
    }
  }

  private createTokenResponseDTO(token: string, tokenParsed: any, keycloakInstance: any): TokenResponseDTO {
    return {
      access_token: token,
      token_type: "bearer",
      expires_in: tokenParsed['exp'] ?? 0,
      refresh_expires_in: tokenParsed['refresh_exp'] ?? 0,
      refresh_token: keycloakInstance.refreshToken ?? "",
      'not-before-policy': tokenParsed['nbf'] ?? 0,
      session_state: keycloakInstance.sessionId ?? "",
      scope: tokenParsed['scope'] ?? ""
    };
  }

  private logTokenRefresh(token: TokenResponseDTO) {
    if (token) {
      console.log("Token refreshed: ", token);
    } else {
      console.error("Token refresh failed");
    }
  }

  logout() {
    this.keycloak.logout().then(r =>
      console.log("Logout: ", r)
    ).catch(error =>
      console.error("Error logging out: ", error)
    );
  }
}
