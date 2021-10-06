import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MemberFormDto } from '../models/member';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public host:string="http://localhost:8080/api/auth"
  constructor(private http:HttpClient) { }
  message:string;
  public API_URL : 'http://localhost:8080/api/test/';

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
    this.http.post(this.host+"/marin/add", member).subscribe(data=>{
    });

  }
  public onValidationForm(){
    this.http.get(this.host+"/marin/add").subscribe(message=>{

    });
  }
  public onUpdateMember(member:MemberFormDto, id:number){
    this.http.put(this.host+"/marin/update/"+id, member).subscribe(data=>{
    });
  }

  // For auth
  getPublicContent(): Observable<any> {
    return this.http.get(this.API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(this.API_URL + 'admin', { responseType: 'text' });
  }

}


