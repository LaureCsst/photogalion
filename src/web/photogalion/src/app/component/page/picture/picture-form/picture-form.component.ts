import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { PictureFormDto } from 'src/app/models/pictureFormDto';
import { StationFormDto } from 'src/app/models/stationFormDto';
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
  event:Event;
  images:any=[];
  station:any=[];

  constructor(private tokenStorage: TokenStorageService, 
    private formBuilder: FormBuilder, public pictureService: PictureService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorage.getToken();

    if (this.isLoggedIn) {
      this.isLoggedIn = true;
      this.user = this.tokenStorage.getUser();
         }

  // this.route.params.subscribe((params: Params) => this.station = params['station']);
   this.station[1]=this.route.snapshot.params.longitude;
   this.station[0]=this.route.snapshot.params.lattitude;
  }

  onSubmit(): String | undefined {
    if(this.checkoutForm.status==null){
      this.isSaved=false;
      this.messageReturn="Veuillez entrer une photo";
      return this.messageReturn;
    }
    try{
      console.log(this.station);
      this.pictureFormDto={ ...this.checkoutForm.value}; 
      this.pictureService.onAddPicture(this.images);
      this.checkoutForm.reset();
      this.messageReturn=" Vos photos ont bien été enregistrées";
      this.isSaved=true;
      return this.messageReturn;
    }catch(error){
      return this.messageReturn;
    }
    

    
  }

//Load images and set them in an array
async onSelectFile(event:any) {
  if (event.target.files.length == 0) return;
  //Get the files
  let files = [...event.target.files];

  //Boucle on the array and return error if the extension is not good
  for(var f =0; f< files.length; f++){
    var mimeType = files[f].type;
      if (!mimeType.match(/image\/*/)) {
        this.messageReturn = "Seules les images sont supportées";
        files.splice(f,1);
      }
    }

  //Wait the promise to create the array
  this.images = await Promise.all(files.map(f=>{
    
    return this.readAsDataURL(f)
  }));
  //all images' base64encoded data will be available as array in images
}
//Create the promise array
readAsDataURL(file:any) {
  return new Promise((resolve, reject)=>{
    let fileReader = new FileReader();
    let user = this.tokenStorage.getUser();
    let station= this.station;
    fileReader.onload = function(){
      return resolve({image:fileReader.result, name:file.name, date:file.lastModifiedDate, memberId:user.id, stations:station});
    }
    fileReader.readAsDataURL(file);
  })
} 
}
