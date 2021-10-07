import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PictureFormDto } from 'src/app/models/pictureFormDto';
import { TokenStorageService } from 'src/app/services/connectionService/tokenStorage/token-storage.service';
import { PictureService } from 'src/app/services/picture.service';



@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.css']
})
export class PictureFormComponent implements OnInit {
  isLoggedIn = false;
  user:any;
  pictureFormDto:PictureFormDto= new PictureFormDto();
  checkoutForm = this.formBuilder.group({
    image:new FormControl('',Validators.required),
  }); 
  isSaved:Boolean=false;
  messageReturn='';
  image:any;
  imagePath:'';
  event:Event;
  date:any;
  name:any;

  constructor(private tokenStorage: TokenStorageService, 
    private formBuilder: FormBuilder, public pictureService: PictureService) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
         }
  }

  onSubmit(): String | undefined {
    if(this.checkoutForm.status==null){
      this.isSaved=false;
      this.messageReturn="Veuillez entrer une photo";
      return this.messageReturn;
    }
    try{
      this.pictureFormDto={ ...this.checkoutForm.value};
      this.pictureFormDto.image= this.image;
      this.pictureFormDto.memberId=this.user.id;
      this.pictureFormDto.date=this.date;
      this.pictureFormDto.name=this.name;
      this.pictureService.onAddPicture(this.pictureFormDto);
      console.log("la2");
      this.checkoutForm.reset();
      this.messageReturn=" Votre photo a bien été enregistrée";
      this.isSaved=true;
      return this.messageReturn;
    }catch(error){
      return this.messageReturn;
    }
    

    
  }
  onSelectFile(event:any) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.image = file;
     // this.f['profile'].setValue(file);
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.messageReturn = "Seules les images sont supportées pour la miniature";
      return;
    }
 
    var reader = new FileReader();
    //Get the base64
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.image = reader.result;
    }
    //Get the information of the object
    this.date = file.lastModifiedDate;
    this.name =file.name;
    }


  }

}
