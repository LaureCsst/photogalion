import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { DomSanitizer } from '@angular/platform-browser';
import { TokenStorageService } from 'src/app/services/connectionService/tokenStorage/token-storage.service';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: any;
  imageUrl:any;
  imageBase64String:any;
  imageBase64:any;
  currentUser:any;
  isCurrentMember:boolean=false;
  
  constructor(public memberService: MemberService, private activatedRoute: ActivatedRoute,
    private router: Router, private _sanitizer: DomSanitizer, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.getMember(this.activatedRoute.snapshot.params.id);
  }

  public getMember(id:any){
    this.memberService.onGetMember(id).
    subscribe(data=>{
      this.member=data;
      this.imageUrl = (this._sanitizer.bypassSecurityTrustResourceUrl(this.member.thumbnail) as any).changingThisBreaksApplicationSecurity;
      if(this.currentUser.id==this.member.id){
        this.isCurrentMember=true;
      }
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




}
