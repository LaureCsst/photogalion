import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PictureFormDto } from '../models/pictureFormDto';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  public host:string="http://localhost:8080/api/auth/photo";
  message:string;

  constructor(private http:HttpClient) { }

  public onAddPicture(picture:PictureFormDto){
    console.log("Ici")
    this.http.post(this.host+"/add", picture).subscribe(data=>{
    });
}
}
