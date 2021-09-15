import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MemberFormDto } from '../models/member';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public host:string="http://localhost:8080"
  constructor(private http:HttpClient) { }

  public getMembers() {
    return this.http.get(this.host+"/marin/all-recap");
  };

  public onGetMember(id:number){
    return this.http.get(this.host+"/marin/profil/" + id);
  }
  public onDeleteMember(id:number){
    return this.http.get(this.host+"/marin/delete/" + id);
  }
  public onAddMember(member:MemberFormDto){
    return this.http.post(this.host+"/marin/add",member).subscribe(member=>{
    });
  }
}


