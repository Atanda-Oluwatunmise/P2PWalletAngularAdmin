import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { OrderPipe } from 'ngx-order-pipe';


@Component({
  selector: 'app-gltransactions',
  templateUrl: './gltransactions.component.html',
  styleUrls: ['./gltransactions.component.css']
})
export class GltransactionsComponent {
  public arrays = []

  public tabledata: any;
  public searchicon: any;
  public users: any = [];
  public firstName: any;
  public searchText: any;
  public page: number = 1;
  public count: number = 0;
  public tableSize: number = 5;
  public tableSizes: any = [5, 10, 15, 20];
  public dateofTransaction: Date = new Date();
  public walletSelected: any;
  public request:any ={
    currency: ""
  }
  constructor(private api: ApiService, private auth: AuthService, public datepipe: DatePipe, private router: Router){}

  ngOnInit() {
    this.postList();
  }

  postList(): void {
    this.api.getGLTransactions()
      .subscribe(res => {
        console.log(res)
        this.tabledata = res.data;
        this.arrays = res.data;
      })
  }

  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.postList();
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: any) {
    this.key = key
    this.reverse = !this.reverse;
  }

  allTransactions() {
    console.log(this.arrays);
    this.tabledata = this.arrays;
  }

  tempArray: any = [];
  newArray: any = [];
  creditTransactions() {
    this.tempArray = this.arrays.filter((e: any) => e.type == 'CREDIT');
    console.log(this.tempArray);
    this.tabledata = this.tempArray;
  }

  debitTransactions() {
    this.tempArray = this.arrays.filter((e: any) => e.type == 'DEBIT');
    console.log(this.tempArray);
    this.tabledata = this.tempArray;
  }

  getWalletTransaction(){
    this.tempArray = this.arrays.filter((e: any) => e.currency == this.walletSelected);
    console.log(this.tempArray);
    this.tabledata = this.tempArray;
    // console.log(this.walletSelected);
    // this.request["currency"] = this.walletSelected;
    // this.api.getWalletGLTxns(this.request)
    //   .subscribe(res => {
    //     console.log(res)
    //   })
  }
}
