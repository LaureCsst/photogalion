import { MemberService } from "../../../../services/member.service";
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  public members: any;
  public member: any;

  constructor(public memberService:MemberService) { }

  ngOnInit(): void {
    this.getMembers();
  }

  
  private getMembers(){
    this.memberService.getMembers().
    subscribe(data=>{
      this.members=data;
    },err=>{
      console.log(err);
    })

  }

  
  public onGetMember(id:any){
    this.memberService.onGetMember(id).
    subscribe(data=>{
      this.member=data;
    },err=>{
      console.log(err);
    })

  }

  public onAddMember(){
    this.memberService.onAddMember(this.member);

  }
}
