import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, EMPTY, Observable, of, tap} from 'rxjs';
import {AuthService} from './auth.service';
import {EmployeeRequestDTO, EmployeeResponseDTO} from './types';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = '/employees';
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  private getHeaders(): Observable<HttpHeaders | null> {
    console.log("Generating headers...");
    return this.authService.getAccessTokenV2().pipe(
      switchMap(accessToken => {
        console.log("Got access token: ", accessToken);
        return accessToken ? of(new HttpHeaders().set('Authorization', 'Bearer ' + accessToken.access_token)) : of(null);
      })
    );
  }

  private handleRequest<T>(request: Observable<T>): Observable<T> {
    console.log("Handling request: ", request);
    return request.pipe(
      tap(data => console.log("Got data: ", data)),
      catchError(error => {
        console.error("Error: ", error);
        return EMPTY;
      })
    );
  }

  getEmployees(): Observable<EmployeeResponseDTO[]> {
    return this.getHeaders().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.get<EmployeeResponseDTO[]>(this.apiUrl, {headers})) : of([]);
      })
    );
  }

  getEmployee(employeeId: number): Observable<EmployeeResponseDTO | null> {
    return this.getHeaders().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.get<EmployeeResponseDTO>(`${this.apiUrl}/${employeeId}`, {headers})) : of(null);
      })
    );
  }

  createEmployee(employeeData: EmployeeRequestDTO): Observable<EmployeeResponseDTO | null> {
    return this.getHeaders().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.post<EmployeeResponseDTO>(this.apiUrl, employeeData, {headers})) : of(null);
      })
    );
  }

  updateEmployee(employeeId: number, updatedEmployeeData: EmployeeRequestDTO): Observable<EmployeeResponseDTO | null> {
    return this.getHeaders().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.put<EmployeeResponseDTO>(`${this.apiUrl}/${employeeId}`, updatedEmployeeData, {headers})) : of(null);
      })
    );
  }

  deleteEmployee(employeeId: number): Observable<void> {
    return this.getHeaders().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.delete<void>(`${this.apiUrl}/${employeeId}`, {headers})) : EMPTY;
      })
    );
  }
}
