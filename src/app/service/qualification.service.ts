import {Injectable} from '@angular/core';
import {forkJoin, Observable, of, switchMap} from 'rxjs';
import {QualificationDTO} from '../types';
import {BaseService} from "./base.service";

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

  deleteQualification(id: number) {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.delete(`${this.apiUrl}/${id}`, {headers})) : of(null);
      })
    );
  }
}
