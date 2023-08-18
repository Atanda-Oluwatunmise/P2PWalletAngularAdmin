import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ChatboxComponent } from '../chatbox/chatbox.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
public name: any;
  constructor(private api: ApiService, private matDialog: MatDialog){}
  ngOnInit(){
    this.api.adminDetail()
    .subscribe((res:any) => {
      // console.log(res);
      this.name = res.data.username;  
  })
  }

  openChatBox(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.height = "465px";
    dialogConfig.width = "1000px";
    dialogConfig.id = "chatbox";

    const chatmodalDialog = this.matDialog.open(ChatboxComponent,dialogConfig);
  }

}
