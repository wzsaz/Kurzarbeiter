import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {EmployeeRequestDTO, EmployeeResponseDTO} from '../types';
import {switchMap} from 'rxjs/operators';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {
  private apiUrl = '/employees';

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
