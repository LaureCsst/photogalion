import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: any;
  
  constructor(public memberService: MemberService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getMember(this.activatedRoute.snapshot.params.id);
  }

  public getMember(id:any){
    this.memberService.onGetMember(id).
    subscribe(data=>{
      this.member=data;
    },err=>{
      console.log(err);
    })
  }

  public onDeleteMember(id:any){
    this.memberService.onDeleteMember(id).
    subscribe(data=>{
      this.member=data;
      this.router.navigate(['/member']);
    },err=>{
      console.log(err);
    })
    
  }

  // public onGetUpdateForm(member:object){
  //   this.router.navigate(['/member-form'+member]);
  // }

  // public onUpdateMember(id:any){
  //   this.memberService.onUpdateMember(id).
  //   subscribe(data=>{
  //     this.member=data;
  //   }, err=>{
  //     console.log(err);
  //   })
  // }



}
