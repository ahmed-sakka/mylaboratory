import { Observable } from 'rxjs';
import { MemberService } from 'src/services/member.service';
import { EventEmitter, Injectable, Output } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host = 'http://localhost:8088';
  private jwtToken: string;
  private roles: Array<any> = [];
  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>(); 
  constructor(private http: HttpClient
    ){}


  // tslint:disable-next-line:typedef
  login(user){
  return this.http.post(this.host + '/signin', user);
  }
  // tslint:disable-next-line:typedef
  register(user){
  return this.http.post(this.host + '/users' , user);
  }
  // tslint:disable-next-line:typedef
  saveToken(jwtToken){
  this.jwtToken = jwtToken;
  localStorage.setItem('token', 'Bearer ' + jwtToken);
  this.fireIsLoggedIn.emit();


  }
SaveCurentUser(): Observable<any>{

  const headers = new HttpHeaders();
  const token = this.loadToken();
  
  // tslint:disable-next-line:align
  headers.append('authorization'
    , token);

  return this.http.get(this.host + '/user/username',  {headers: headers});

  }


  // tslint:disable-next-line:typedef

    // tslint:disable-next-line:typedef


    // tslint:disable-next-line:typedef
    loadToken(){
    this.jwtToken = localStorage.getItem('token');

    return this.jwtToken;
    }
    // tslint:disable-next-line:typedef
    logout(){

    localStorage.clear();

    }
    // tslint:disable-next-line:typedef
    isAdmin(){
    for (const r of this.roles){
    if (r.authority === 'ADMIN') { return true; }
    }
    return false;
    }
  }
