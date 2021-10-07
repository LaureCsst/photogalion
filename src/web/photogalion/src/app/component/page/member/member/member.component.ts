import { MemberService } from "../../../../services/member.service";
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenStorageService } from '../../../../services/connectionService/tokenStorage/token-storage.service';



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
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  user:any;
  content = '';
  isAdmin: boolean=false;



  constructor(public memberService:MemberService, private _sanitizer: DomSanitizer, private tokenStorage:TokenStorageService ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    
    if (this.isLoggedIn) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.user = this.tokenStorage.getUser();
      this.getMembers();
         }
         
    
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
