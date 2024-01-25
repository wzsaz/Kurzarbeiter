import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable, of, throwError, switchMap} from 'rxjs';
import {AuthService} from './auth.service';
import {catchError} from "rxjs/operators";

@Injectable()
export abstract class BaseService {
  constructor(protected http: HttpClient, private authService: AuthService) {}

  protected setAuthHeader(): Observable<HttpHeaders> {
    return this.authService.getAccessTokenV2().pipe(
      switchMap(accessToken => accessToken
        ? of(new HttpHeaders().set('Authorization', 'Bearer ' + accessToken.access_token))
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
}
