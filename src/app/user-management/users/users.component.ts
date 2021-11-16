import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { NotificationService } from 'src/app/service/notification.service';
import { UserService } from 'src/app/service/user.service';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  loadingUsers = true;
  selectedUser: User;

  constructor(private authService: AuthenticationService, private userService: UserService,
              private notificationService: NotificationService) { }

  public users: User[] = [];

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        this.notificationService.showSuccess(`${this.users.length} User(s) successfully loaded`);
        this.loadingUsers = false;
      }, (error: HttpErrorResponse) => {
        this.handleError(error);
      });
  }

  private handleError(httpErrorResponse: HttpErrorResponse): void {
    this.loadingUsers = false;
    const msg = httpErrorResponse.error.developerMessage || 'Something went wrong. Please try again later';
    this.notificationService.showFailure(msg);
  }

  onRelaodClick(): void {
    this.loadingUsers = true;
    this.loadUsers();
  }

  onUserSelected(user: User): void {
    this.selectedUser = user;
  }
}
