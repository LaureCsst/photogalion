import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8081/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials:any): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      membername: credentials.username,
      password: credentials.password
    }, httpOptions);
  
  }

  register(user:any): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      membername: user.username,
      mail: user.email,
      password: user.password,
      name: user.name,
      firstName: user.firstName,
      birthday: user.birthday,
      color: user.color,
      thumbnail : user.thumbnail
    }, httpOptions);
  }

  
}
