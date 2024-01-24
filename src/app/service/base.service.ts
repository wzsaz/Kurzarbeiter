import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, EMPTY, Observable, of, switchMap} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export abstract class BaseService {
  constructor(protected http: HttpClient, private authService: AuthService) {
  }

  protected setAuthHeader(): Observable<HttpHeaders | null> {
    return this.authService.getAccessTokenV2().pipe(
      switchMap(accessToken => {
        return accessToken ? of(new HttpHeaders().set('Authorization', 'Bearer ' + accessToken.access_token)) : of(null);
      })
    );
  }

  protected handleRequest<T>(request: Observable<T>): Observable<T> {
    return request.pipe(
      catchError(error => {
        console.error("Error: ", error);
        return EMPTY;
      })
    );
  }
}
