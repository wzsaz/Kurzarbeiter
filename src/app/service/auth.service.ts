import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {TokenResponseDTO} from "../types";
import {KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private keycloak: KeycloakService) {
  }

  getAccessTokenV2(): Observable<TokenResponseDTO | null> {
    try {
      const keycloakInstance = this.keycloak.getKeycloakInstance();
      const token = keycloakInstance.token;
      const tokenParsed = keycloakInstance.tokenParsed;

      if (token && tokenParsed) {
        return new Observable<TokenResponseDTO>(observer => {
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
        });
      } else {
        console.error("Token or parsed token is undefined");
        return of(null);
      }
    } catch (error) {
      console.error("Error getting token: ", error);
      throw error;
    }
  }
}
