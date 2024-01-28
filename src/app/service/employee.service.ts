import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {Employee, EmployeeRequestDTO} from '../types';
import {switchMap} from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://127.0.0.1:8089/employees';

  constructor(private http: HttpClient) {}

  getEmployee(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${employeeId}`);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  createEmployee(employeeData: EmployeeRequestDTO): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employeeData);
  }

  updateEmployee(employeeId: number, updatedEmployeeData: EmployeeRequestDTO): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employeeId}`, updatedEmployeeData);
  }

  deleteEmployee(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${employeeId}`);
  }

  removeQualificationFromEmployee(employeeId: number, qualificationId: number): Observable<Employee> {
    return this.getEmployee(employeeId).pipe(
      switchMap((employee: Employee) => {
        if (employee) {
          const updatedEmployee: EmployeeRequestDTO = {
            ...employee,
            skillSet: employee.skillSet.filter(({id}) => id !== qualificationId).map(({id}) => id)
          };
          return this.updateEmployee(employeeId, updatedEmployee);
        }
        return EMPTY;
      })
    );
  }
}
