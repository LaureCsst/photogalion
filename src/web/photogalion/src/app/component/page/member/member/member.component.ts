import { MemberService } from "../../../../services/member.service";
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';



@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  public members: any;
  public member: any;
  public message:any;
  public imageUrl:any;
  public imagePath:any;
  public thumbnail: any;

  constructor(public memberService:MemberService, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getMembers();
  }

  
  private getMembers(){
    this.memberService.getMembers().
    subscribe(data=>{
      this.members=data;
      this.members.forEach((m:any) => {
        m.thumbnail=(this._sanitizer.bypassSecurityTrustResourceUrl(m.thumbnail) as any).changingThisBreaksApplicationSecurity;
      });
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
    this.message=this.memberService.onAddMember(this.member)
  }

  reloadPage(): void {
    window.location.reload();
  }
}
