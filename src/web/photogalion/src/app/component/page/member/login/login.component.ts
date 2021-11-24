import { Component, EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../../services/connectionService/authService/auth.service'
import { TokenStorageService } from '../../../../services/connectionService/tokenStorage/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

 
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,  private router: Router) { }

  ngOnInit() {
    this.isUserLogged(this.tokenStorage);
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/member']).then(() => {   
            this.reloadPage();
        });
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  isUserLogged(tokenStorage:any){
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }else{
      this.router.navigate(['/login'])
    }
  }

  reloadPage() {
    window.location.reload();
  }
}