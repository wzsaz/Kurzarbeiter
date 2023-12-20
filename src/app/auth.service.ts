import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/auth';
  private user = {username: 'user', password: 'test'};

  constructor(private http: HttpClient) {
  }

  async getAccessToken(): Promise<any> {
    console.log("Trying to get user: " + this.user.username);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `grant_type=password&client_id=employee-management-service&username=${this.user.username}&password=${this.user.password}`;

    try {
      const response = await this.http.post<any>(this.apiUrl, body, {headers}).toPromise();
      console.log("Got user: ", response);
      return response.access_token;
    } catch (error) {
      console.error("Error getting user: ", error);
      throw error;
    }
  }
}
