import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { SignalrService } from 'src/app/services/signalr.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class ChatboxComponent {
  public chatuserName: any;
  public message: any;
  public name: any;
  public userMsg: any;
  public element: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, public modalDialog: MatDialogRef<HeaderComponent>, public api: ApiService, public signalr: SignalrService) {}

  ngOnInit(){
    this.signalr.startConnection();
    this.api.adminDetail()
    .subscribe((res:any) => {
      // console.log(res);
      this.name = res.data.username;  
  })

  this.signalr.receiveMessage((user, msg, time)=>{
    console.log(time);
    this.chatuserName = user;
    const uniqueNumber = new Date().getTime()
    const innerdivId = `innerReceiverDiv${uniqueNumber}`;
    const outerdivId = `outerReceiverDiv${uniqueNumber}`;
    const mainDivId = `mainReceiverDiv${uniqueNumber}`;
    if(this.name != user){
    var outerdiv = document.createElement("div");
    outerdiv.classList.add("row", "no-gutters");
    outerdiv.id= outerdivId;
    this.element = document.getElementById("chatPanel");
    this.element.appendChild(outerdiv);

    var innerdiv = document.createElement("div");
    innerdiv.classList.add("col-md-3");
    innerdiv.id= innerdivId;
    this.element = document.getElementById(outerdivId);
    this.element.appendChild(innerdiv);
    
    var maindiv = document.createElement("div");
    maindiv.classList.add("chat-bubble", "chat-bubble--left");
    maindiv.id= mainDivId;
    maindiv.innerHTML = `<h5>${time}</h5>`;
    maindiv.innerText = msg;
    this.element = document.getElementById(innerdivId);
    this.element.appendChild(maindiv); 
    }
  })
  }

  sendMessage(){
    this.signalr.invokeConnection(this.name, this.message);
    this.element= document.getElementById("inputBox");
    this.element.value = '';

    const uniqueNumber = new Date().getTime()
    const innerdivId = `innerSenderDiv${uniqueNumber}`;
    const outerdivId = `outerSenderDiv${uniqueNumber}`;
    const mainDivId = `mainSenderDiv${uniqueNumber}`;
    var outerdiv = document.createElement("div");
    outerdiv.classList.add("row", "no-gutters");
    outerdiv.id= outerdivId;
    this.element = document.getElementById("chatPanel");
    this.element.appendChild(outerdiv);

    var innerdiv = document.createElement("div");
    innerdiv.classList.add("col-md-3", "offset-md-9");
    innerdiv.id= innerdivId;
    this.element = document.getElementById(outerdivId);
    this.element.appendChild(innerdiv);

    var maindiv = document.createElement("div");
    maindiv.classList.add("chat-bubble", "chat-bubble--right");
    maindiv.id= mainDivId;
    maindiv.innerText = this.message;
    this.element = document.getElementById(innerdivId);
    this.element.appendChild(maindiv);
  }


  closeModal(){
    this.modalDialog.close()
  }

}
