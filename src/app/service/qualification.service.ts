import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {QualificationGetDTO, QualificationPostDTO} from './types';
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class QualificationService extends BaseService {
  private apiUrl = '/qualifications';

  getQualifications(): Observable<QualificationGetDTO[]> {
    return this.handleRequest(this.http.get<QualificationGetDTO[]>(this.apiUrl));
  }

  getQualification(qualificationId: number): Observable<QualificationGetDTO | null> {
    return this.handleRequest(this.http.get<QualificationGetDTO>(`${this.apiUrl}/${qualificationId}`));
  }

  createQualification(qualificationData: QualificationPostDTO): Observable<QualificationGetDTO | null> {
    return this.handleRequest(this.http.post<QualificationGetDTO>(this.apiUrl, qualificationData));
  }

  updateQualification(qualificationId: number, updatedQualificationData: QualificationPostDTO): Observable<QualificationGetDTO | null> {
    return this.handleRequest(this.http.put<QualificationGetDTO>(`${this.apiUrl}/${qualificationId}`, updatedQualificationData));
  }
}
