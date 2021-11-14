import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private apiUrl = environment.apiUrl;
  loggedInUserName: string;
  token: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(
      `${this.apiUrl}/user/login`,
      user,
      {
        observe: 'response',
      }
    );
  }

  public register(user: User): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>(
      `${this.apiUrl}/user/register`,
      user
    );
  }

  // for logout
  public logout() {
    this.token = null;
    this.loggedInUserName = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  // when we login so for subsequent calls we can directly get token
  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // when we login
  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // when we need current user object
  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();

    if (this.token !== null && this.token !== '') {
      const decodedToken = this.jwtHelper.decodeToken(this.token);
      const subject = decodedToken.sub;
      if (subject !== null && subject !== '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUserName = subject;
          return true;
        }
      }
    } else {
      // TODO seems to be wrong no else should be here.
      this.logout();
      return false;
    }
  }
}
