import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StationService {
  public host:string="http://localhost:8081/api/auth/station";

  constructor(private http:HttpClient) { }

  public onAddStation(station:any){
    this.http.post(this.host+"/add", station).subscribe(data=>{
    });
}
public onGetStations(){
  return this.http.get(this.host+"/get");
}

}
