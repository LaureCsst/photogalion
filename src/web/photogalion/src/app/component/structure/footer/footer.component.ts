import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/services/connectionService/tokenStorage/token-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn:boolean=false;
  constructor(public tokenStorage: TokenStorageService, private router: Router ) {}

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
}
