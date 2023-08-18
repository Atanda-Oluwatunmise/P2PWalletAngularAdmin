import { Component } from '@angular/core';
import { Signalrchart } from 'src/app/interfaces/signalrchart';
import { SignalrService } from 'src/app/services/signalr.service';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  public data!: Signalrchart[];
  public newdata: any;
  public hubConnection!: signalR.HubConnection;

  constructor(private signalr: SignalrService, private http: HttpClient){}

  ngOnInit(){
    this.signalr.startConnection();
  
    console.log("dashboard");
    //this.signalr.addTransferChartDataListener();
     // this.data = data;
    this.hubConnection.on('transferchartdata', (data)=>{
      console.log(data)
    })
  }

}
