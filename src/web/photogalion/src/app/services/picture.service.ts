import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { PictureFormDto } from '../models/pictureFormDto';
import { StationFormDto } from '../models/stationFormDto';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  public host:string="http://localhost:8081/api/auth/photo";
  message:string;

  constructor(private http:HttpClient) { }

  public onAddPicture(images:ArrayType){
    console.log(images);
    this.http.post(this.host+"/add", images).subscribe(data=>{
    });
}

public onGetPictureByMember(id:number){
  return this.http.get(this.host+"/member/"+id);
}

public onGetLastPictureByStation(id:number){
  return this.http.get(this.host+"/station/last/"+id);
}

public onGetPicturesByStation(id:number){
  return this.http.get(this.host+"/station/"+id);
}

public onDeletePicture(id:number){
  return this.http.get(this.host+"/delete/" + id);
}
}
