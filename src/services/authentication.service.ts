import { Observable } from 'rxjs';
import { MemberService } from 'src/services/member.service';
import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host = 'http://localhost:8088';
  private jwtToken: string;
  private roles: Array<any> = [];
  constructor(private http: HttpClient
    ){}


  // tslint:disable-next-line:typedef
  login(user){
  return this.http.post(this.host + '/login', user , { observe: 'response'
  });
  }
  // tslint:disable-next-line:typedef
  register(user){
  return this.http.post(this.host + '/users' , user);
  }
  // tslint:disable-next-line:typedef
  saveToken(jwtToken){
  this.jwtToken = jwtToken;
  localStorage.setItem('token', jwtToken);


  }
SaveCurentUser(): Observable<any>{

  const header = new HttpHeaders();
  header.append('authorization', this.loadToken());

  return this.http.get(this.host + '/AppUser/',  {headers: header});

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
    localStorage.removeItem('token');
    }
    // tslint:disable-next-line:typedef
    isAdmin(){
    for (const r of this.roles){
    if (r.authority === 'ADMIN') { return true; }
    }
    return false;
    }
  }
