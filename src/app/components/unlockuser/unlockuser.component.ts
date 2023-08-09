import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';
import { AdminusersComponent } from '../adminusers/adminusers.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unlockuser',
  templateUrl: './unlockuser.component.html',
  styleUrls: ['./unlockuser.component.css']
})
export class UnlockuserComponent {

  public rowdata: any;
  public email: any;

  public Deatails: any = [];
  public unlockdto: any = {
    email: "",
  };
 

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public modalDialog: MatDialogRef<AdminusersComponent>, public api: ApiService, public router: Router) {
    this.rowdata = data;
  }
  ngOnInit(): void {
    this.email = this.rowdata.email;
    console.log(this.email);
  }

  unlockUser() {
    this.unlockdto["email"] = this.email;
    this.api.unlockUsers(this.unlockdto)
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

  closeModal() {
    this.modalDialog.close();
  }
}
