import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable, of, throwError, switchMap} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
  constructor(protected http: HttpClient, protected keycloak: KeycloakService) {}

  protected setAuthHeader(): Observable<HttpHeaders> {
    return this.keycloak.addTokenToHeader().pipe(
      switchMap(headers => headers
        ? of(headers)
        : throwError(() => new Error('Authorization header not set'))
      ),
      catchError(error => {
        console.error("Error: ", error);
        return throwError(() => error);
      })
    );
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
