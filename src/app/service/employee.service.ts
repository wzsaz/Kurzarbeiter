import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {Employee, EmployeeRequestDTO, Qualification} from '../types';
import {map, switchMap} from 'rxjs/operators';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {
  private apiUrl = 'http://127.0.0.1:8089/employees';

  getEmployees(): Observable<Employee[]> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return this.handleRequest(this.http.get<Employee[]>(this.apiUrl, {headers}));
      })
    );
  }

  getEmployee(employeeId: number): Observable<Employee> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return this.handleRequest(this.http.get<Employee>(`${this.apiUrl}/${employeeId}`, {headers}));
      })
    );
  }

  createEmployee(employeeData: EmployeeRequestDTO): Observable<Employee> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return this.handleRequest(this.http.post<Employee>(this.apiUrl, employeeData, {headers}));
      })
    );
  }

  updateEmployee(employeeId: number, updatedEmployeeData: EmployeeRequestDTO): Observable<Employee> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return this.handleRequest(this.http.put<Employee>(`${this.apiUrl}/${employeeId}`, updatedEmployeeData, {headers}));
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

  removeQualificationFromEmployee(employeeId: number, qualificationId: number): Observable<Employee> {
    console.log('removeQualificationFromEmployee called with employeeId, qualificationId:', employeeId, qualificationId);

    return this.getEmployee(employeeId).pipe(
      switchMap((employee: Employee) => {
        console.log('Fetched employee:', employee);
        if (employee) {
          const updatedEmployee: EmployeeRequestDTO = {
            ...employee,
            skillSet: employee.skillSet.filter(({id}) => id !== qualificationId).map(({id}) => id)
          };
          console.log('Updated employee data:', updatedEmployee);
          return this.updateEmployee(employeeId, updatedEmployee);
        }
        return EMPTY;
      })
    );
  }
}
