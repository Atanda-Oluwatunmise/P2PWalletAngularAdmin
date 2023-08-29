import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl:string = "http://localhost:5127/api/";
  private userbaseUrl: string = "http://localhost:5127/api/User/";
  private adminbaseUrl:string = "http://localhost:5127/api/Admin/";
  private kycprocessbaseUrl: string = "http://localhost:5127/api/KycProcess/";
  private notificationbaseUrl: string = "http://localhost:5127/api/Notification/";
  private transactionBaseUrl: string = "http://localhost:5127/api/Transactions/";
  private chaturl: string = "http://localhost:5127/api/Chat/";

  
  constructor(private http: HttpClient, private router: Router) { }

  SendMessage(messageObj: any) {
    return this.http.post(`${this.chaturl}postadminmessage`, messageObj);
  }

  LoadMessages(messageObj: any){
    return this.http.post(`${this.chaturl}getadminmessages`, messageObj);
  }

  getLockedandUnlockedUsers(){
    return this.http.get<any>(`${this.userbaseUrl}lockedandunlockedusers`);
  }
  getTxnCount(){
    return this.http.get<any>(`${this.transactionBaseUrl}gettxnsrecord`);
  }
  getTxnsNo(){
    return this.http.get<any>(`${this.notificationbaseUrl}txnscount`);
  }
  getAcctNo(){
    return this.http.get<any>(`${this.notificationbaseUrl}acntscount`);
  }
  getGLTransactions(){
    return this.http.get<any>(`${this.adminbaseUrl}gltransactionhistory`);
  }
  getallGLAccounts(){
    return this.http.get<any>(`${this.adminbaseUrl}allglaccounts`);
  }
  adminDetail(){
    return this.http.get<any>(`${this.adminbaseUrl}admindetail`);
  }
  getalllockedUsers(){
    return this.http.get<any>(`${this.adminbaseUrl}listoflockedusers`);
  }
  unlockUsers(useremail: string){
    return this.http.post(`${this.adminbaseUrl}unlockuser`, useremail);
  }
  lockUsers(userobj: any){
    return this.http.post(`${this.adminbaseUrl}lockuser`, userobj);
  }
  createAdmin(userobj: any){
    return this.http.post(`${this.adminbaseUrl}createadmin`, userobj);
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
  resetAdmin(requestObj: any){
    return this.http.post(`${this.adminbaseUrl}resetadmin`, requestObj);
  }
  disableAdmin(requestObj: any){
    return this.http.post(`${this.adminbaseUrl}disableadmin`, requestObj);
  }
  getPendingUsers(){
    return this.http.get<any>(`${this.kycprocessbaseUrl}userspending`);
  }

  getUserKycDetail(userObj: any){
    return this.http.post(`${this.kycprocessbaseUrl}getuserkycdetail`, userObj);
  }

  approveDoc(userObj: any){
    return this.http.post(`${this.kycprocessbaseUrl}approvedocument`, userObj);
  }

  rejectDoc(userObj: any){
    return this.http.post(`${this.kycprocessbaseUrl}rejectdocument`, userObj);
  }
}
