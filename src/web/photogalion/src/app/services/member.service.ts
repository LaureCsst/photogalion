import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MemberFormDto } from '../models/member';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MemberService {
  public host:string="http://localhost:8080/api/auth/marin"
  
  message:string;
  public API_URL : 'http://localhost:8080/api/test/';
  constructor(private http:HttpClient) { }
  public getMembers() {
    return this.http.get(this.host+"/all-recap");
  };

  public onGetMember(id:number){
    return this.http.get(this.host+"/profil/" + id);
  }
  public onDeleteMember(id:number){
    return this.http.get(this.host+"/delete/" + id);
  }
  public onAddMember(member:MemberFormDto){
    this.http.post(this.host+"/add", member).subscribe(data=>{
    });

  }
  public onValidationForm(){
    this.http.get(this.host+"/add").subscribe(message=>{

    });
  }
  public onUpdateMember(member:MemberFormDto, id:number){
    this.http.put(this.host+"/update/"+id, member).subscribe(data=>{
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


