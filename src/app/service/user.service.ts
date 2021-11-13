import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpResponse } from '../model/custom-http-response';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[] | HttpErrorResponse>(
      `${this.apiUrl}/user/list`
    );
  }

  // need to use form data as we are using @RequestParam on spring boot and not @RequestBody so not a simple object
  public addUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>(
      `${this.apiUrl}/user/add`,
      formData
    );
  }

  public updateUser(formData: FormData): Observable<User | HttpErrorResponse> {
    return this.http.post<User | HttpErrorResponse>(
      `${this.apiUrl}/user/update`,
      formData
    );
  }

  public resetPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.get<CustomHttpResponse>(`${this.apiUrl}/user/resetPassword/${email}`);
  }

  // use observe on event bcoz we want to track the progress
  public updateProfileImage(formData: FormData): Observable<HttpEvent<User>> {
    return this.http.post<User>(
      `${this.apiUrl}/user/updateProfileImage`,
      formData,
      {
        observe: 'events',
        reportProgress: true,
      }
    );
  }

  public deleteUser(userId: number): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse | HttpErrorResponse>(
      `${this.apiUrl}/${userId}`
    );
  }

  public addUsersToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
    }
    return null;
  }

  public createUserFormData(loggedInUserName: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUserName', loggedInUserName);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('userName', user.userName);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('profileImage', profileImage);
    return formData;
  }
}
