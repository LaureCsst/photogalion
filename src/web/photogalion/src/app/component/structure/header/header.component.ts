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

  ngOnInit(): void {
    
    this.isLoggedIn = !!this.tokenStorage.getToken();


  }

  onSignOut(){
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }
}
