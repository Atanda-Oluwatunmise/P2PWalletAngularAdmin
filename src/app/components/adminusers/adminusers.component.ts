import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { UnlockuserComponent } from '../unlockuser/unlockuser.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent {
  public tabledata: any;
  public email: any;
  public reason: any;
  public element: any;
  public lockDto: any ={
    "email": "",
    "reason": "",
  }

  constructor(public api: ApiService, private matdialog: MatDialog){

  }

  ngOnInit(){
    this.api.getalllockedUsers()
    .subscribe((res) => {
      console.log(res);
      this.tabledata = res.data;
    })
  }

  lockuserContainer(){
    this.element = document.getElementById("lockuserContainer");
    this.element.style.display = '';
    this.element = document.getElementById("unlockuserContainer");
    this.element.style.display = 'none'; 
  }

  unlockuserContainer(){
    this.element = document.getElementById("unlockuserContainer");
    this.element.style.display = '';
    this.element = document.getElementById("lockuserContainer");
    this.element.style.display = 'none';
  
  }

  lockUser(){
    this.lockDto["email"]= this.email;
    this.lockDto["reason"] = this.reason;
    this.api.lockUsers(this.lockDto)
    .subscribe((res:any) => {
      if(res.status == true){
        Swal.fire({
          title: "Successful!",
          text: res.data,
          icon: "success",
          confirmButtonColor: '#53277E'        
        }).then((result) => {
          if(result.isConfirmed){
            window.location.reload();
          }
        })
      }
      if(res.status != true){
        Swal.fire({
          title: "Error!",
          text: res.statusMessage,
          icon: "error",
          confirmButtonColor: '#53277E'        
        }).then((result) => {
          if(result.isConfirmed){
            window.location.reload();
          }
        })
      }
    })
  }
  
  openModal(data:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "createwallet";
    dialogConfig.height = "350px";
    dialogConfig.width = "500px";
    dialogConfig.data = data;
    const modalDialog = this.matdialog.open(UnlockuserComponent, dialogConfig);
  }
}
