import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {BaseService} from "./base.service";
import {switchMap} from "rxjs/operators";
import {Qualification} from "../types";

@Injectable({
  providedIn: 'root'
})
export class QualificationService extends BaseService {
  private apiUrl = 'http://127.0.0.1:8089/qualifications';

  getQualifications(): Observable<Qualification[]> {
    return this.setAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.get<Qualification[]>(this.apiUrl, {headers})))
    );
  }

  getQualification(qualificationId: number): Observable<Qualification> {
    return this.setAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.get<Qualification>(`${this.apiUrl}/${qualificationId}`, {headers})))
    );
  }

  createQualification(qualificationData: Partial<Qualification>): Observable<Qualification> {
    return this.setAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.post<Qualification>(this.apiUrl, qualificationData, {headers})))
    );
  }

  updateQualification(updated: Qualification): Observable<Qualification> {
    return this.setAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.put<Qualification>(`${this.apiUrl}/${updated.id}`, updated, {headers})))
    );
  }

  updateQualifications(updatedQualificationsData: Qualification[]): Observable<Qualification[]> {
    return this.setAuthHeader().pipe(
      switchMap(headers => {
        const updateRequests = updatedQualificationsData.map(qualification =>
          this.http.put<Qualification>(`${this.apiUrl}/${qualification.id}`, qualification, {headers})
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
