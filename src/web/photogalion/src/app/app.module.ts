import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MemberComponent } from './component/page/member/member/member.component';
import { HeaderComponent } from './component/structure/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { MemberDetailComponent } from './component/page/member/member-detail/member-detail.component';
import { MemberFormComponent } from './component/page/member/member-form/member-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberUpdateFormComponent } from './component/page/member/member-update-form/member-update-form.component';

import { LoginComponent } from './component/page/member/login/login.component';
import { RegisterComponent } from './component/page/member/register/register.component';

import { BoardAdminComponent } from './component/page/member/board-admin/board-admin.component';
import { BoardUserComponent } from './component/page/member/board-user/board-user.component';
import { ProfileComponent } from './component/page/member/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    HeaderComponent,
    MemberDetailComponent,
    MemberFormComponent,
    MemberUpdateFormComponent,
    LoginComponent,
    RegisterComponent,
    BoardAdminComponent,
    BoardUserComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
