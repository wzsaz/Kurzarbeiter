import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {QualificationDTO} from '../types';
import {BaseService} from "./base.service";
import {switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class QualificationService extends BaseService {
  private apiUrl = 'http://127.0.0.1:8089/qualifications';

  getQualifications(): Observable<QualificationDTO[]> {
    return this.setAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.get<QualificationDTO[]>(this.apiUrl, {headers})))
    );
  }

  getQualification(qualificationId: number): Observable<QualificationDTO> {
    return this.setAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.get<QualificationDTO>(`${this.apiUrl}/${qualificationId}`, {headers})))
    );
  }

  createQualification(qualificationData: Partial<QualificationDTO>): Observable<QualificationDTO> {
    return this.setAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.post<QualificationDTO>(this.apiUrl, qualificationData, {headers})))
    );
  }

  updateQualification(qualificationId: number, updatedQualificationData: QualificationDTO): Observable<QualificationDTO> {
    return this.setAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.put<QualificationDTO>(`${this.apiUrl}/${qualificationId}`, updatedQualificationData, {headers})))
    );
  }

  updateQualifications(updatedQualificationsData: QualificationDTO[]): Observable<QualificationDTO[]> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        const updateRequests = updatedQualificationsData.map(qualification =>
          this.http.put<QualificationDTO>(`${this.apiUrl}/${qualification.id}`, qualification, {headers})
        );
        return this.handleRequest(forkJoin(updateRequests));
      })
    );
  }

  deleteQualification(qualificationId: number): Observable<void> {
    return this.setAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.delete<void>(`${this.apiUrl}/${qualificationId}`, {headers})))
    );
  }
}
