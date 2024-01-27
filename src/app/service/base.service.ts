import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  constructor(protected http: HttpClient, protected keycloak: KeycloakService) {}

  protected getAuthHeader(): Observable<HttpHeaders> {
    return this.keycloak.addTokenToHeader(new HttpHeaders());
  }

  protected handleRequest<T>(request: Observable<T>): Observable<T> {
    return request.pipe(catchError(error => {
      console.error("Error: ", error);
      return EMPTY;
    }));
  }

  getKeycloakInstance(): KeycloakService {
    return this.keycloak;
  }
}
