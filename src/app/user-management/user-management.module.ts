import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UserManagementComponent } from './user-management.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersComponent,
    SettingsComponent,
    ProfileComponent,
    UserManagementComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule
  ]
})
export class UserManagementModule { }
