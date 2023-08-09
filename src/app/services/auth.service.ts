import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TokenApiModel } from '../models/token.api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminbaseUrl:string = "http://localhost:5127/api/Admin/"

  //inject the httpclient
  constructor(private http: HttpClient, private router: Router) { }

  signup(userObj: any){
    return this.http.post<any>(`${this.adminbaseUrl}register`, userObj)
  }

  login(loginObj: any){
    return this.http.post<any>(`${this.adminbaseUrl}adminlogin`, loginObj)
  }
  changeaPassword(passwordObj: any){
    return this.http.post(`${this.adminbaseUrl}changeadminpassword`, passwordObj);
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login'])
  }

  storeToken(token: string){
    localStorage.setItem('bearer', token);
  }

  storeRefreshToken(token: string){
    localStorage.setItem('refreshToken', token);
  }

  getToken(){
    return localStorage.getItem('bearer');
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }
  
  renewToken(tokenApi: TokenApiModel){
    return this.http.post(`${this.adminbaseUrl}refreshtoken`, tokenApi); 
  }

  isLoggedIn():boolean{
    return !!localStorage.getItem('bearer');  //!! converts string to boolean value
  }
}
