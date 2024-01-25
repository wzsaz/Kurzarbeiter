import {Injectable} from '@angular/core';
import {forkJoin, Observable, switchMap} from 'rxjs';
import {BaseService} from "./base.service";
import {Qualification} from "../types";

@Injectable({
  providedIn: 'root'
})
export class QualificationService extends BaseService {
  private apiUrl = 'http://127.0.0.1:8089/qualifications';

  getQualifications(): Observable<Qualification[]> {
    return this.getAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.get<Qualification[]>(this.apiUrl, {headers})))
    );
  }

  getQualification(qualificationId: number): Observable<Qualification> {
    return this.getAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.get<Qualification>(`${this.apiUrl}/${qualificationId}`, {headers})))
    );
  }

  createQualification(qualificationData: Partial<Qualification>): Observable<Qualification> {
    return this.getAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.post<Qualification>(this.apiUrl, qualificationData, {headers})))
    );
  }

  updateQualification(updated: Qualification): Observable<Qualification> {
    return this.getAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.put<Qualification>(`${this.apiUrl}/${updated.id}`, updated, {headers})))
    );
  }

  updateQualifications(updatedQualificationsData: Qualification[]): Observable<Qualification[]> {
    return this.handleRequest(forkJoin(updatedQualificationsData.map(qualification =>
      this.updateQualification(qualification)
    )));
  }

  deleteQualification(qualificationId: number): Observable<void> {
    return this.getAuthHeader().pipe(
      switchMap(headers => this.handleRequest(this.http.delete<void>(`${this.apiUrl}/${qualificationId}`, {headers})))
    );
  }
}
