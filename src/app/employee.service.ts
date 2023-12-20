import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'https://employee.szut.dev/employees';

  constructor(private http: HttpClient, private authService: AuthService) { }

  async getEmployees(): Promise<Observable<any>> {
    const user = await this.authService.getUser();
    if (user) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + user.access_token);
      return this.http.get(this.apiUrl, { headers });
    } else {
      // Handle the case when the user is not logged in
      return of(null);
    }
  }
}
