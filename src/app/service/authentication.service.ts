import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = environment.apiUrl;
  loggedInUserName: string;
  token: string;

  constructor(private http: HttpClient) { }

  public login(user: User): Observable<HttpResponse<User> | HttpErrorResponse> {
    return this.http.post<HttpResponse<User> | HttpErrorResponse>(`${this.apiUrl}/user/login`, user, {
      observe: 'response'
    });
  }


  public register(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>(`${this.apiUrl}/user/register`, user);
  }

  public logout() {
    this.token = null;
    this.loggedInUserName = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }
}
