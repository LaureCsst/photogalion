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
import { PictureFormComponent } from './component/page/picture/picture-form/picture-form.component';
import { PictureByMemberComponent } from './component/page/picture/picture-by-member/picture-by-member.component';
import { StationsMapComponent } from './component/page/station/stations-map/stations-map.component';
const routes: Routes = [
  //Member
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
  //Login & register
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  //Pictures
  { 
    path: 'picture-form', 
    component: PictureFormComponent 
  },
  {
    path:'my-picture',
    component: PictureByMemberComponent,

  },
  //Stations
  {
    path:'my-station',
    component: StationsMapComponent,

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
