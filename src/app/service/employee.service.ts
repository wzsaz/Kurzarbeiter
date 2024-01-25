import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {EmployeeRequestDTO, EmployeeResponseDTO} from '../types';
import {switchMap} from 'rxjs/operators';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {
  private apiUrl = 'http://127.0.0.1:8089/employees';

  getEmployees(): Observable<EmployeeResponseDTO[]> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return this.handleRequest(this.http.get<EmployeeResponseDTO[]>(this.apiUrl, {headers}));
      })
    );
  }

  getEmployee(employeeId: number): Observable<EmployeeResponseDTO> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return this.handleRequest(this.http.get<EmployeeResponseDTO>(`${this.apiUrl}/${employeeId}`, {headers}));
      })
    );
  }

  createEmployee(employeeData: EmployeeRequestDTO): Observable<EmployeeResponseDTO> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return this.handleRequest(this.http.post<EmployeeResponseDTO>(this.apiUrl, employeeData, {headers}));
      })
    );
  }

  updateEmployee(employeeId: number, updatedEmployeeData: EmployeeRequestDTO): Observable<EmployeeResponseDTO> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return this.handleRequest(this.http.put<EmployeeResponseDTO>(`${this.apiUrl}/${employeeId}`, updatedEmployeeData, {headers}));
      })
    );
  }

  deleteEmployee(employeeId: number): Observable<void> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return this.handleRequest(this.http.delete<void>(`${this.apiUrl}/${employeeId}`, {headers}));
      })
    );
  }

  removeQualificationFromEmployee(employeeId: number, qualificationId: number): Observable<EmployeeResponseDTO> {
    console.log('removeQualificationFromEmployee called with employeeId, qualificationId:', employeeId, qualificationId);

    return this.getEmployee(employeeId).pipe(
      switchMap((employee: EmployeeResponseDTO) => {
        console.log('Fetched employee:', employee);
        if (employee) {
          const updatedEmployee: EmployeeRequestDTO = {
            ...employee,
            skillSet: employee.skillSet.filter(skill => skill.id !== qualificationId).map(skill => skill.id)
          };
          console.log('Updated employee data:', updatedEmployee);
          return this.updateEmployee(employeeId, updatedEmployee);
        }
        return EMPTY;
      })
    );
  }
}
