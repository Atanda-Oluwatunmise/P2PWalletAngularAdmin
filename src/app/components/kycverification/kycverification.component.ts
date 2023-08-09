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

  constructor(private api: ApiService, private matdialog: MatDialog){}

  ngOnInit(){
    this.api.getPendingUsers()
    .subscribe((res) => {
      this.datalists = res.data;
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
