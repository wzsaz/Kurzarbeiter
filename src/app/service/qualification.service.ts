import {Injectable} from '@angular/core';
import {forkJoin, Observable, of, switchMap} from 'rxjs';
import {EmployeeRequestDTO, EmployeeResponseDTO, QualificationDTO} from '../types';
import {BaseService} from "./base.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QualificationService extends BaseService {
  private apiUrl = 'http://127.0.0.1:8089/qualifications';

  getQualifications(): Observable<QualificationDTO[]> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.get<QualificationDTO[]>(this.apiUrl, {headers})) : of([]);
      })
    );
  }

  getQualification(qualificationId: number): Observable<QualificationDTO | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.get<QualificationDTO>(`${this.apiUrl}/${qualificationId}`, {headers})) : of(null);
      })
    );
  }

  createQualification(qualificationData: Partial<QualificationDTO>): Observable<QualificationDTO | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.post<QualificationDTO>(this.apiUrl, qualificationData, {headers})) : of(null);
      })
    );
  }

  updateQualification(qualificationId: number, updatedQualificationData: QualificationDTO): Observable<QualificationDTO | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.put<QualificationDTO>(`${this.apiUrl}/${qualificationId}`, updatedQualificationData, {headers})) : of(null);
      })
    );
  }

  updateQualifications(updatedQualificationsData: QualificationDTO[]): Observable<QualificationDTO[] | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        if (headers) {
          const updateRequests = updatedQualificationsData.map(qualification =>
            this.http.put<QualificationDTO>(`${this.apiUrl}/${qualification.id}`, qualification, {headers})
          );
          return this.handleRequest(forkJoin(updateRequests));
        } else {
          return of(null);
        }
      })
    );
  }

  deleteQualification(qualificationId: number): Observable<EmployeeResponseDTO[] | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        if (!headers) {
          return of(null);
        }

        // First, get the list of employees that have this qualification
        return this.http.get<EmployeeResponseDTO[]>(`${this.apiUrl}/${qualificationId}/employees`, {headers}).pipe(
          switchMap(employees => {
            if (employees.length > 0) {
              // If there are employees with this qualification, delete the qualification from their skill set
              const updateRequests = employees.map(employee => {
                const updatedEmployee = {...employee};
                updatedEmployee.skillSet = updatedEmployee.skillSet.filter(skill => skill.id !== qualificationId);
                return this.http.put<EmployeeRequestDTO>(`http://127.0.0.1:8089/employees/${updatedEmployee.id}`, updatedEmployee, {headers});
              });
              return forkJoin(updateRequests).pipe(
                switchMap(() => {
                  // After updating all employees, proceed with the deletion of the qualification
                  return this.http.delete(`${this.apiUrl}/${qualificationId}`, {headers}).pipe(
                    map(() => null) // Return null to indicate that the qualification was deleted
                  );
                })
              );
            } else {
              // If there are no employees with this qualification, proceed with the deletion
              return this.http.delete(`${this.apiUrl}/${qualificationId}`, {headers}).pipe(
                map(() => null) // Return null to indicate that the qualification was deleted
              );
            }
          })
        );
      })
    );
  }
}
