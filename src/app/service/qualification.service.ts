import {Injectable} from '@angular/core';
import {Observable, of, switchMap} from 'rxjs';
import {QualificationRequestDTO, QualificationResponseDTO} from '../types';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class QualificationService extends BaseService {
  private apiUrl = 'http://127.0.0.1:8089/qualifications';

  getQualifications(): Observable<QualificationResponseDTO[]> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.get<QualificationResponseDTO[]>(this.apiUrl, {headers})) : of([]);
      })
    );
  }

  getQualification(qualificationId: number): Observable<QualificationResponseDTO | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.get<QualificationResponseDTO>(`${this.apiUrl}/${qualificationId}`, {headers})) : of(null);
      })
    );
  }

  createQualification(qualificationData: QualificationRequestDTO): Observable<QualificationResponseDTO | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.post<QualificationResponseDTO>(this.apiUrl, qualificationData, {headers})) : of(null);
      })
    );
  }

  updateQualification(qualificationId: number, updatedQualificationData: QualificationRequestDTO): Observable<QualificationResponseDTO | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.put<QualificationResponseDTO>(`${this.apiUrl}/${qualificationId}`, updatedQualificationData, {headers})) : of(null);
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
