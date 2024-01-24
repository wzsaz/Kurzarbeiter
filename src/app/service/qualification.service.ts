import {Injectable} from '@angular/core';
import {forkJoin, Observable, of, switchMap} from 'rxjs';
import {Qualification} from '../types';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class QualificationService extends BaseService {
  private apiUrl = 'http://127.0.0.1:8089/qualifications';

  getQualifications(): Observable<Qualification[]> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.get<Qualification[]>(this.apiUrl, {headers})) : of([]);
      })
    );
  }

  getQualification(qualificationId: number): Observable<Qualification | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.get<Qualification>(`${this.apiUrl}/${qualificationId}`, {headers})) : of(null);
      })
    );
  }

  createQualification(qualificationData: Partial<Qualification>): Observable<Qualification | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.post<Qualification>(this.apiUrl, qualificationData, {headers})) : of(null);
      })
    );
  }

  updateQualification(qualificationId: number, updatedQualificationData: Qualification): Observable<Qualification | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        return headers ? this.handleRequest(this.http.put<Qualification>(`${this.apiUrl}/${qualificationId}`, updatedQualificationData, {headers})) : of(null);
      })
    );
  }

  updateQualifications(updatedQualificationsData: Qualification[]): Observable<Qualification[] | null> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        if (headers) {
          const updateRequests = updatedQualificationsData.map(qualification =>
            this.http.put<Qualification>(`${this.apiUrl}/${qualification.id}`, qualification, {headers})
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
