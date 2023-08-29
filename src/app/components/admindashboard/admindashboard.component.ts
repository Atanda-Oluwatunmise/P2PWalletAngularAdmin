import { Component, ElementRef } from '@angular/core';
import { Signalrchart } from 'src/app/interfaces/signalrchart';
import { SignalrService } from 'src/app/services/signalr.service';
import * as signalR from '@microsoft/signalr';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  public data!: Signalrchart[];
  public txnNo: any;
  public acntNo: any;
  public lockedUsers: any;
  public unlockedUsers: any;
  public chart: any;
  public linechart: any;
  public ngnList: any;
  public hubConnection!: signalR.HubConnection;

  constructor(private signalr: SignalrService, private api: ApiService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.signalr.startConnection();

    this.api.getAcctNo()
      .subscribe((res) => {
        this.acntNo = res.data;
      })

    this.api.getTxnsNo()
      .subscribe((res) => {
        this.txnNo = res.data;
      })


    this.api.getLockedandUnlockedUsers()
      .subscribe((res) => {
        this.lockedUsers = res.data.lockedUsers;
        this.unlockedUsers = res.data.unlockedUsers;

        var today = new Date(Date.now()).toLocaleString();
        let htmlRef = this.elementRef.nativeElement.querySelector('#bar-chart')
        this.chart = new Chart(htmlRef, {
          type: 'bar', //this denotes tha type of chart

          data: {// values on X-Axis
            labels: [today],
            datasets: [
              {
                label: "Locked",
                data: [this.lockedUsers],
                backgroundColor: '#53277E'
              },
              {
                label: "Unlocked",
                data: [this.unlockedUsers],
                backgroundColor: '#a682bb'
              }
            ]
          },
          options: {
            aspectRatio: 2.5
          }
        });
      });

    this.api.getTxnCount()
      .subscribe((res:any) => {
        this.ngnList = res.data.ngnTxn;
        console.log(res.data.ngnTxn);
        let htmlRef = this.elementRef.nativeElement.querySelector('#area-chart')
        this.linechart = new Chart(htmlRef, {
          type: 'bar', //this denotes tha type of chart
          data: {// values on X-Axis
            //labels: [today],
            datasets: [
              {
                label: "NGN",
                data: this.ngnList,
                backgroundColor: '#53277E'
              },
              {
                label: "USD",
                data: res.data.UsdTxn,
                backgroundColor: '#a682bb'
              },
              {
                label: "EUR",
                data: res.data.EurTxn,
                backgroundColor: 'orange'
              }
            ]
          },
          options: {
            aspectRatio: 2.5
          }
        });
      })
  }

}
