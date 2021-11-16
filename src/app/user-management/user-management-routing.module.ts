import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../guard/authentication.guard';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { UserManagementComponent } from './user-management.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: 'user/management', component: UserManagementComponent,
    children: [
      {path: '', component: UsersComponent, pathMatch: 'full'},
      {path: 'users', component: UsersComponent},
      {path: 'settings', component: SettingsComponent},
      {path: 'profile', component: ProfileComponent}
    ],
    canActivate: [AuthenticationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
