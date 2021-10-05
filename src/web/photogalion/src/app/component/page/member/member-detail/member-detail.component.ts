import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/services/member.service';
import { DomSanitizer } from '@angular/platform-browser';


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
  
  constructor(public memberService: MemberService, private activatedRoute: ActivatedRoute,
    private router: Router, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getMember(this.activatedRoute.snapshot.params.id);
  }

  public getMember(id:any){
    this.memberService.onGetMember(id).
    subscribe(data=>{
      this.member=data;
      this.imageUrl = (this._sanitizer.bypassSecurityTrustResourceUrl(this.member.thumbnail) as any).changingThisBreaksApplicationSecurity;
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
