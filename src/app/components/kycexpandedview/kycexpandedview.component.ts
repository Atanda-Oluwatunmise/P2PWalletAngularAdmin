import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { KycverificationComponent } from '../kycverification/kycverification.component';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { ImagedialogComponent } from '../imagedialog/imagedialog.component';

@Component({
  selector: 'app-kycexpandedview',
  templateUrl: './kycexpandedview.component.html',
  styleUrls: ['./kycexpandedview.component.css']
})
export class KycexpandedviewComponent {
  public username: any;
  public filename: any;
  public adminReason: any;
  public userObj: any = {
    name: ""
  }
  public response: any;
  public imagePathList: any = [];
  public approvalObj: any = {
    username: "",
    name: ""
  };
  public rejectObj: any = {
    username: "",
    name: "",
    reason: "",
  };
  public reader = new FileReader()

  constructor(private sanitizer: DomSanitizer, @Inject(MAT_DIALOG_DATA) data: any, public modalDialog: MatDialogRef<KycverificationComponent>, private matdialog: MatDialog, private api: ApiService) {
    this.username = data.username;
  }

  ngOnInit() {
    console.log(this.username);
    this.userObj["name"] = this.username
    this.api.getUserKycDetail(this.userObj)
      .subscribe((res: any) => {
        console.log(res);
        this.response = res.data
        for (let i = 0; i < res.data.length; i++) {
          this.imagePathList.push(`data:image/jpg;charset=utf-8;base64, ${res.data[i].imagePath}`);
        }
      })
  }

  Approve(data: any) {
    this.filename = data.imageName;
    this.approvalObj["username"] = this.username;
    this.approvalObj["name"] = this.filename;
    this.api.approveDoc(this.approvalObj)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status == true) {
          Swal.fire({
            title: "Successful!",
            text: res.data,
            icon: "success",
            confirmButtonColor: '#53277E',
          }).then((res)=>{
            if(res.isConfirmed){
              window.location.reload();
            }
          })
        }
        if (res.status != true) {
          Swal.fire({
            title: "Error!",
            text: res.statusMessage,
            icon: "error",
            confirmButtonColor: '#d33'
          }).then((res)=>{
            if(res.isConfirmed){
              window.location.reload();
            }
          })
        }
      })
  }

  Reject(data: any) {
    Swal.fire({
      title: 'What is the reason?',
      html: `<input type="text" id="reason" class="swal2-input">`,
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Enter',
      confirmButtonColor: '#53277E',
      cancelButtonColor: '#d33',

      preConfirm: () => {
        this.adminReason = Swal.getPopup()?.querySelector('#reason') as HTMLButtonElement | null;
        this.adminReason = this.adminReason.value;
        this.filename = data.imageName;
        this.filename = data.imageName;
        this.rejectObj["username"] = this.username;
        this.rejectObj["name"] = this.filename;
        this.rejectObj["reason"] = this.adminReason;
        this.api.rejectDoc(this.rejectObj)
          .subscribe((res: any) => {
            console.log(res);
            if (res.status == true) {
              Swal.fire({
                title: "Successful!",
                text: res.data,
                icon: "success",
                confirmButtonColor: '#53277E'
              }).then((res)=>{
                if(res.isConfirmed){
                  window.location.reload();
                }
              })
            }

            if (res.status != true) {
              Swal.fire({
                title: "Error!",
                text: res.statusMessage,
                icon: "error",
                confirmButtonColor: '#d33'
              }).then((res)=>{
                if(res.isConfirmed){
                  window.location.reload();
                }
              })
            }
          })
      }
    })
  }

  expandImage(data: any){
    const imageDialog = new MatDialogConfig();
    imageDialog.disableClose = false;
    imageDialog.id = "imagecontainer";
    imageDialog.height = "500px";
    imageDialog.width = "500px";
    imageDialog.data = data;

    const newmodalDialog = this.matdialog.open(ImagedialogComponent, imageDialog);
  }

}
