import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailComponent } from './component/page/member/member-detail/member-detail.component';
import { MemberComponent } from './component/page/member/member/member.component';
import { MemberFormComponent } from './component/page/member/member-form/member-form.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
