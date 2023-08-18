import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public hubConnection!: signalR.HubConnection;
  public data: any;
  constructor() { }

  startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5127/notify')
    .configureLogging(signalR.LogLevel.Information)
    .build();

    this.hubConnection.start().then(() => {
      console.log('Signalr connected');
    }).catch(err =>{
      console.error('Error while connecting signalr', err);
    });
  }

  invokeConnection(user:string, message:string) {
    this.hubConnection.invoke("SendMessage", user, message)
  }

  receiveMessage(callback:(user:string, message:string, sentAt:any) => void){
    this.hubConnection.on('ReceiveMessage', callback);
  }
  addTransferChartDataListener(){
    this.hubConnection.on('TransferChartData', this.data);
  }

//   addTransferChartDataListener = () => {
//     this.hubConnection.on('transferchartdata', (data) => {
//       this.data = data;
//       console.log(data);
//     });
// }
}
