import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HeaderType } from '../model/enum/header-type.enum';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService,
    private notificationService: NotificationService, private router: Router) { }

  public loginForm: FormGroup;
  public showLoading = false;

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    if (this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['/user/management'])
    }
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onLogin() {
    console.log('login form value:- ', this.loginForm.value);
    this.showLoading = true;
    //const username = this.loginForm.get('username').value;
    //const password = this.loginForm.get('password').value;
    //const user: User = new User();
    //user.userName = username;
    //password
    this.subscriptions.push(
      this.authenticationService.login(this.loginForm.value).subscribe(
        (response: HttpResponse<User>) => {
          const token = response.headers.get(HeaderType.JWT_TOKEN);
          this.authenticationService.saveToken(token);
          const loggedInUser: User = response.body;
          this.authenticationService.addUserToLocalCache(loggedInUser);
          this.showLoading = false;
          this.notificationService.showSuccess('Successfully logged in');
          this.router.navigate(['/user/management']);
        },
        (errorResponse: HttpErrorResponse) => {
          console.log('error:- ', errorResponse);
          this.showErroNotification(errorResponse);
          this.showLoading = false;
        })
    );
  }

  private showErroNotification(errorResponse: HttpErrorResponse) {
    const message = errorResponse.error.developerMessage;
    if (message) {
      this.notificationService.showFailure(message);
    }
    else {
      this.notificationService.showFailure('Something went wrong. Please try again');
    }
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
