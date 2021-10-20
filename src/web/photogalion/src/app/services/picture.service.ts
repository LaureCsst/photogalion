import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { PictureFormDto } from '../models/pictureFormDto';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  public host:string="http://localhost:8081/api/auth/photo";
  message:string;

  constructor(private http:HttpClient) { }

  public onAddPicture(images:ArrayType){
    this.http.post(this.host+"/add", images).subscribe(data=>{
    });
}

public onGetPictureByMember(id:number){
  return this.http.get(this.host+"/member/"+id);
}

public onDeletePicture(id:number){
  return this.http.get(this.host+"/delete/" + id);
}
}
