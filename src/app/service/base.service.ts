import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, EMPTY, Observable} from 'rxjs';

@Injectable()
export abstract class BaseService {
  constructor(protected http: HttpClient) {
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
