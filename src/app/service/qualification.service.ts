import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Qualification} from "../types";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class QualificationService {
  private apiUrl = 'http://127.0.0.1:8089/qualifications';

  constructor(private http: HttpClient) {}

  getQualifications(): Observable<Qualification[]> {
    return this.http.get<Qualification[]>(this.apiUrl);
  }

  createQualification(qualificationData: Partial<Qualification>): Observable<Qualification> {
    return this.http.post<Qualification>(this.apiUrl, qualificationData);
  }

  updateQualification(updated: Qualification): Observable<Qualification> {
    return this.http.put<Qualification>(`${this.apiUrl}/${updated.id}`, updated);
  }

  deleteQualification(qualificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${qualificationId}`);
  }
}
