import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {EmployeeRequestDTO, EmployeeResponseDTO} from '../types';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {
  private apiUrl = '/employees';

  getEmployees(): Observable<EmployeeResponseDTO[]> {
    return this.handleRequest(this.http.get<EmployeeResponseDTO[]>(this.apiUrl));
  }

  getEmployee(employeeId: number): Observable<EmployeeResponseDTO | null> {
    return this.handleRequest(this.http.get<EmployeeResponseDTO>(`${this.apiUrl}/${employeeId}`));
  }

  createEmployee(employeeData: EmployeeRequestDTO): Observable<EmployeeResponseDTO | null> {
    return this.handleRequest(this.http.post<EmployeeResponseDTO>(this.apiUrl, employeeData));
  }

  updateEmployee(employeeId: number, updatedEmployeeData: EmployeeRequestDTO): Observable<EmployeeResponseDTO | null> {
    return this.handleRequest(this.http.put<EmployeeResponseDTO>(`${this.apiUrl}/${employeeId}`, updatedEmployeeData));
  }

  deleteEmployee(employeeId: number): Observable<void> {
    return this.handleRequest(this.http.delete<void>(`${this.apiUrl}/${employeeId}`));
  }
}
