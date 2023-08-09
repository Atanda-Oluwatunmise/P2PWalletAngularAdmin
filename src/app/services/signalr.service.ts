import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  public hubConnection!: signalR.HubConnection;
  constructor() { }

  startConnection(){
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('http://localhost:5127/notify')
    .configureLogging(signalR.LogLevel.Information)
    .build();
  }
}
