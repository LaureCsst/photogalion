import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailComponent } from './component/page/member/member-detail/member-detail.component';
import { MemberComponent } from './component/page/member/member/member.component';
import { MemberFormComponent } from './component/page/member/member-form/member-form.component';
import { MemberUpdateFormComponent } from './component/page/member/member-update-form/member-update-form.component';
import { RegisterComponent } from './component/page/member/register/register.component';
import { LoginComponent } from './component/page/member/login/login.component';
import { ProfileComponent } from './component/page/member/profile/profile.component';
import { BoardUserComponent } from './component/page/member/board-user/board-user.component';
import { BoardAdminComponent } from './component/page/member/board-admin/board-admin.component';
const routes: Routes = [
  {
    path: "member", 
    component: MemberComponent
  },
  {
    path: "member-detail/:id", 
    component: MemberDetailComponent
  },
  {
    path: "member-form", 
    component: MemberFormComponent
  },
  {
    path: "member-update-form/:id", 
    component: MemberUpdateFormComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
