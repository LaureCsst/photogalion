import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/connectionService/tokenStorage/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:boolean=false;
  constructor(public tokenStorage: TokenStorageService, private router: Router) { }
  isToggleOpen:boolean=false;

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
  }
  ngOnChanges(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();
    window.location.reload();
  }
  onSignOut(){
    this.tokenStorage.signOut();
    this.isLoggedIn = !!this.tokenStorage.getToken();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
  changeToggle(){
    this.isToggleOpen=!this.isToggleOpen;

  }
}
