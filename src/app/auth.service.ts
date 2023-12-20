import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://keycloak.szut.dev/auth/realms/szut/protocol/openid-connect/token';
  private user = {username: 'user', password: 'test'};

  constructor(private http: HttpClient) {
  }

  async getUser(): Promise<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `grant_type=password&client_id=employee-management-service&username=${this.user.username}&password=${this.user.password}`;
    const response = await this.http.post(this.apiUrl, body, {headers}).toPromise();
    return response;
  }
}
