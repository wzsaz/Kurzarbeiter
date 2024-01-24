import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('ApiInterceptor#intercept called with URL: ', req.url);
    if (req.url.includes('employees'||'qualifications')) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer your-token')
      });
      console.log('Modified request: ', modifiedReq);
      return next.handle(modifiedReq);
    }
    console.log('Unmodified request: ', req);
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true }
];
