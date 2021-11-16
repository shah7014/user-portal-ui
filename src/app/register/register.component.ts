import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { NotificationService } from '../service/notification.service';
import {AuthenticationService} from '../service/authentication.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  public showLoading = false;

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private notificationService: NotificationService,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public onRegister(user:User) {
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.register(user).subscribe(
        (data: User) => {
          this.showLoading = false;
          this.notificationService.showSuccess('You have been registered. Please check you email for password');
        },
        (error: HttpErrorResponse) => this.handleError(error)
      )
    )
  }

  private handleError(httpErrorResponse: HttpErrorResponse): void {
    this.showLoading = false;
    const msg = httpErrorResponse.error.developerMessage;
    if (msg) {
      this.notificationService.showFailure(msg);
    } else {
      this.notificationService.showFailure('Something went wrong. Please try again afetr some time');
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
