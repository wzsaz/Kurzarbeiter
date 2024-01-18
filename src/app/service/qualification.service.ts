import {Injectable} from '@angular/core';
import {Observable, of, switchMap} from 'rxjs';
import {QualificationGetDTO, QualificationPostDTO} from '../types';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class QualificationService extends BaseService {
  private apiUrl = 'http://127.0.0.1:8089/qualifications';

  getQualifications(): Observable<QualificationGetDTO[]> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.get<QualificationGetDTO[]>(this.apiUrl, {headers})) : of([]);
      })
    );
  }

  getQualification(qualificationId: number): Observable<QualificationGetDTO | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.get<QualificationGetDTO>(`${this.apiUrl}/${qualificationId}`, {headers})) : of(null);
      })
    );
  }

  createQualification(qualificationData: QualificationPostDTO): Observable<QualificationGetDTO | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.post<QualificationGetDTO>(this.apiUrl, qualificationData, {headers})) : of(null);
      })
    );
  }

  updateQualification(qualificationId: number, updatedQualificationData: QualificationPostDTO): Observable<QualificationGetDTO | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.put<QualificationGetDTO>(`${this.apiUrl}/${qualificationId}`, updatedQualificationData, {headers})) : of(null);
      })
    );
  }
}
