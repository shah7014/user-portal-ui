import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  user: User;

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserFromLocalCache();
  }

}
