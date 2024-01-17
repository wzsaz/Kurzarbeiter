import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {TokenResponseDTO} from "../types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/auth';
  private user = {username: 'user', password: 'test'};

  constructor(private http: HttpClient) {
  }

  getAccessToken(): Observable<TokenResponseDTO> {
    console.log("Trying to get user: " + this.user.username);
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    const body = `grant_type=password&client_id=employee-management-service&username=${this.user.username}&password=${this.user.password}`;

    try {
      const response = this.http.post<TokenResponseDTO>(this.apiUrl, body, {headers});
      console.log("Got token: ", response);
      return response;
    } catch (error) {
      console.error("Error getting user: ", error);
      throw error;
    }
  }

  getAccessTokenV2(): Observable<TokenResponseDTO> {
    try {
      const response = this.http.get<TokenResponseDTO>('http://localhost:5000/get-token');
      console.log("Got token: ", response);
      return response;
    } catch (error) {
      console.error("Error getting token: ", error);
      throw error;
    }
  }
}
