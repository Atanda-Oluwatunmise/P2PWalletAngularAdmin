import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { KycexpandedviewComponent } from '../kycexpandedview/kycexpandedview.component';

@Component({
  selector: 'app-kycverification',
  templateUrl: './kycverification.component.html',
  styleUrls: ['./kycverification.component.css']
})
export class KycverificationComponent {
  public datalists: any;
  public element: any;

  constructor(private api: ApiService, private matdialog: MatDialog){}

  ngOnInit(){
    this.api.getPendingUsers()
    .subscribe((res) => {
      this.datalists = res.data;
      console.log(res);
      if(res.status != true){
        this.element = document.getElementById("listBody");
        this.element.style.display = "none";
        this.element = document.getElementById("imgBody");
        this.element.style.display = "";
      }
    })
  }

  expandView(data: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = "kycexpandedview";
    dialogConfig.height = "350px";
    dialogConfig.width = "700px";
    dialogConfig.data = data;
    const modalDialog = this.matdialog.open(KycexpandedviewComponent, dialogConfig);
  }
}
