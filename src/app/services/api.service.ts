import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl:string = "http://localhost:5127/api/";
  private adminbaseUrl:string = "http://localhost:5127/api/Admin/";
  
  constructor(private http: HttpClient, private router: Router) { }

  getGLTransactions(){
    return this.http.get<any>(`${this.adminbaseUrl}gltransactionhistory`);
  }
  getallGLAccounts(){
    return this.http.get<any>(`${this.adminbaseUrl}allglaccounts`);
  }

  getWalletGLTxns(walletObj: any){
    return this.http.post(`${this.adminbaseUrl}glcurrencytransactionhistory`, walletObj);
  }
  setRate(walletObj: any){
    return this.http.post(`${this.adminbaseUrl}setwalletrate`, walletObj);
  }
  setCharge(walletObj: any){
    return this.http.post(`${this.adminbaseUrl}setwalletcharge`, walletObj);
  }
  newGL(requestObj: any){
    return this.http.post(`${this.adminbaseUrl}createnewgl`, requestObj);
  }
}
