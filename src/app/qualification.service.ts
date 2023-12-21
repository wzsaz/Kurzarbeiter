import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class QualificationsService {
  private apiUrl = '/qualifications';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  async getQualifications(): Promise<Observable<any>> {
    console.log("Getting qualifications...");
    const accessToken = await this.authService.getAccessTokenV2();
    if (accessToken) {
      console.log("Using token: " + accessToken);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
      return this.http
        .get(this.apiUrl, {headers})
        .pipe(
          tap(data => console.log("Got qualifications: ", data)),
          catchError(error => {
            console.error("Error getting qualifications: ", error);
            return of(null);
          })
        );
    } else {
      console.log("Access token is null");
      // Handle the case when the user is not logged in
      return of(null);
    }
  }

  async getQualification(qualificationId: number): Promise<Observable<any>> {
    console.log("Getting qualification with ID " + qualificationId);
    const accessToken = await this.authService.getAccessTokenV2();
    if (accessToken) {
      console.log("Using token: " + accessToken);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
      return this.http
        .get(`<span class="math-inline">\{this\.apiUrl\}/</span>{qualificationId}`, {headers})
        .pipe(
          tap(data => console.log("Got qualification: ", data)),
          catchError(error => {
            console.error("Error getting qualification: ", error);
            return of(null);
          })
        );
    } else {
      console.log("Access token is null");
      // Handle the case when the user is not logged in
      return of(null);
    }
  }

  async createQualification(qualificationData: any): Promise<Observable<any>> {
    console.log("Creating qualification...");
    const accessToken = await this.authService.getAccessTokenV2();
    if (accessToken) {
      console.log("Using token: " + accessToken);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
      return this.http
        .post(this.apiUrl, qualificationData, {headers})
        .pipe(
          tap(data => console.log("Qualification created: ", data)),
          catchError(error => {
            console.error("Error creating qualification: ", error);
            return of(null);
          })
        );
    } else {
      console.log("Access token is null");
      // Handle the case when the user is not logged in
      return of(null);
    }
  }

  async updateQualification(qualificationId: number, updatedQualificationData: any): Promise<Observable<any>> {
    console.log("Updating qualification with ID " + qualificationId);
    const accessToken = await this.authService.getAccessTokenV2();
    if (accessToken) {
      console.log("Using token: " + accessToken);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
      return this.http
        .put(`<span class="math-inline">\{this\.apiUrl\}/</span>{qualificationId}`, updatedQualificationData, {headers})
        .pipe(
          tap(data => console.log("Qualification updated: ", data)),
          catchError(error => {
            console.error("Error updating qualification: ", error);
            return of(null);
          })
        );
    } else {
      console.log("Access token is null");
      // Handle the case when the user is not logged in
      return of(null);
    }
  }
}
