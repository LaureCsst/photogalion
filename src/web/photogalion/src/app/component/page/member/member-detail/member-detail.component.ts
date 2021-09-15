import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: any;

  constructor(public memberService: MemberService, private activatedRoute: ActivatedRoute) { }

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
    },err=>{
      console.log(err);
    })

  }
}
