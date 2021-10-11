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
  images:any=[];

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
      this.pictureService.onAddPicture(this.images);
      this.checkoutForm.reset();
      this.messageReturn=" Votre photo a bien été enregistrée";
      this.isSaved=true;
      return this.messageReturn;
    }catch(error){
      return this.messageReturn;
    }
    

    
  }
  /*async onSelectFile(event:any) {
    if (event.target.files.length == 0) return;
    console.log(event.target.files);
    const promises= []; 
    
  
    for(var f =0; f< event.target.files.length; f++){
      
        const file = event.target.files[f];
       // this.f['profile'].setValue(file);
   
      var mimeType = file.type;
      if (mimeType.match(/image\/* /) == null) {
        this.messageReturn = "Seules les images sont supportées pour la miniature";
        return;
      }
   

      var reader = new FileReader();
      //Get the base64
      await reader.readAsDataURL(file); 
      reader.onload = (_event) => {
        console.log(f+"----"+reader.result);
      //Get the information of the object
      this.image= reader.result;
      this.date=file.lastModifiedDate;
      this.name=file.name;
      var pictureDto= this.constructPictureFormDto( this.image, this.user.id, this.date, this.name);
      console.log(pictureDto);
       this.images.push(pictureDto); 
       console.log(this.images);
      
      }
    }
  }
*/

async onSelectFile(event:any) {
  if (event.target.files.length == 0) return;
  let files = [...event.target.files];

  for(var f =0; f< files.length; f++){
    var mimeType = files[f].type;
      if (!mimeType.match(/image\/*/)) {
        this.messageReturn = "Seules les images sont supportées";
        files.splice(f,1);
      }
    }

  this.images = await Promise.all(files.map(f=>{
    
    return this.readAsDataURL(f)
  }));
  //all images' base64encoded data will be available as array in images
  console.log(this.images);
}

readAsDataURL(file:any) {
  return new Promise((resolve, reject)=>{
    let fileReader = new FileReader();
    let user = this.tokenStorage.getUser();
    fileReader.onload = function(){
      return resolve({image:fileReader.result, name:file.name, date:file.lastModifiedDate, memberId:user.id});
    }
    fileReader.readAsDataURL(file);
  })
} 
/*
  constructPictureFormDto(image:any, id:any, date:any, name:any): PictureFormDto{
   var pictureFormDto:PictureFormDto= new PictureFormDto();
    pictureFormDto.image= image;
    pictureFormDto.memberId=id;
    pictureFormDto.date=date;
    pictureFormDto.name=name;
  return pictureFormDto;
  }*/

}
