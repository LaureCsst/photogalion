import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/connectionService/authService/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  event: Event;
  thumbnail:any;
  public imagePath:any;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.form.thumbnail=this.imagePath;
    this.authService.register(this.form).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

  onSelectFile(event:any) {
     
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.thumbnail = file;
     // this.f['profile'].setValue(file);
      
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.errorMessage = "Seules les images sont supportées pour la miniature";
      return;
    }
 
    var reader = new FileReader();
    
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imagePath = reader.result;
      
    }
  }
}

public getLoginPage(){
  this.router.navigate(['/login']);
}

}