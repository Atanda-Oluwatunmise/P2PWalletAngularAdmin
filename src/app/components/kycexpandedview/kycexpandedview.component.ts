import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { KycverificationComponent } from '../kycverification/kycverification.component';
import { ApiService } from 'src/app/services/api.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-kycexpandedview',
  templateUrl: './kycexpandedview.component.html',
  styleUrls: ['./kycexpandedview.component.css']
})
export class KycexpandedviewComponent {
  public username: any;
  public filename: any;
  public userObj: any ={
    name: ""
  }
  public response: any;
  public imagePathList : any =[];
  public approvalObj: any ={
    name: ""
  };
  public reader = new FileReader()

  constructor(private sanitizer: DomSanitizer, @Inject(MAT_DIALOG_DATA) data:any, public modalDialog: MatDialogRef<KycverificationComponent>, private matdialog: MatDialog, private api: ApiService){
    this.username = data.username;
  }

  ngOnInit(){
    console.log(this.username);
    this.userObj["name"] = this.username
    this.api.getUserKycDetail(this.userObj)
    .subscribe((res:any) => {
      console.log(res);
      this.response = res.data
      for(let i = 0; i< res.data.length; i++){
        this.imagePathList.push(`data:image/jpg;charset=utf-8;base64, ${res.data[i].imagePath}`);
        // this.imagePathList.push(`data:image/jpg;base64,${this.sanitizer.bypassSecurityTrustResourceUrl(res.data[i].imagePath)             
      }
    })
  }

  Approve(data:any){
    this.filename = data.imageName;
    this.approvalObj["name"] = this.filename;
    this.api.approveDoc(this.approvalObj)
    .subscribe((res:any) => {
      console.log(res);
      if(res.status == true){
        Swal.fire({
          title: "Successful!",
          text: res.data,
          icon: "success",
          confirmButtonColor: '#53277E' 
        })
      }

    })

  }

  Reject(data:any){
    this.filename = data.imageName;
    this.approvalObj["name"] = this.filename;
    this.api.rejectDoc(this.approvalObj)
    .subscribe((res:any) => {
      console.log(res);
      if(res.status == true){
        Swal.fire({
          title: "Successful!",
          text: res.data,
          icon: "success",
          confirmButtonColor: '#53277E' 
        })
      }
    })
  }

}
