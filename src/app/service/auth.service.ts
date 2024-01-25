import { Injectable } from '@angular/core';
import {interval, Observable, of, startWith, timer} from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { KeycloakService } from 'keycloak-angular';
import { TokenResponseDTO } from '../types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private keycloak: KeycloakService) {
  }

  getAccessTokenV2(): Observable<TokenResponseDTO> {
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

  logout() {
    this.keycloak.logout().then(r =>
      console.log("Logout: ", r)
    ).catch(error =>
      console.error("Error logging out: ", error)
    );
  }
}
