import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/connectionService/tokenStorage/token-storage.service';
import { PictureService } from 'src/app/services/picture.service';

@Component({
  selector: 'app-picture-by-member',
  templateUrl: './picture-by-member.component.html',
  styleUrls: ['./picture-by-member.component.css']
})
export class PictureByMemberComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  user:any;
  pictures:any;
  picture:any;
  constructor(public pictureService:PictureService, private router: Router, private _sanitizer: DomSanitizer,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.isUserLogged(this.tokenStorage);
    this.isLoggedIn = !!this.tokenStorage.getToken();
    
    if (this.isLoggedIn) {
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
      this.getPictureByMember(this.user.id);
         }
         
  }

  private getPictureByMember(id:number){
    this.pictureService.onGetPictureByMember(id).
    subscribe(data=>{
      this.pictures=data;
      this.pictures.forEach((p:any) => {
        p.image=(this._sanitizer.bypassSecurityTrustResourceUrl(p.image) as any).changingThisBreaksApplicationSecurity;
      });
    },err=>{
      console.log(err);
    })

  }

  public onDeleteMember(id:number){
    
    this.pictureService.onDeletePicture(id).
    subscribe(data=>{
      this.picture=data;
      this.getPictureByMember(this.user.id);
    },err=>{
      console.log(err);
    })  
  }
  
  public isUserLogged(tokenStorage:any){
    if (!tokenStorage.getToken()) {
      this.router.navigate(['/login'])
    }
  }

}
