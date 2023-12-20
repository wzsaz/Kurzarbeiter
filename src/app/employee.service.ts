import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = '/employees';

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  async getEmployees(): Promise<Observable<any>> {
    console.log("Getting employees...")
    const accessToken = await this.authService.getAccessToken();
    if (accessToken) {
      console.log("Using token: " + accessToken);
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + accessToken);
      return this.http.get(this.apiUrl, {headers}).pipe(
        tap(data => console.log("Got employees: ", data)),
        catchError(error => {
          console.error("Error getting employees: ", error);
          return of(null);
        })
      );
    } else {
      console.log("Access token is null")
      // Handle the case when the user is not logged in
      return of(null);
    }
  }
}
