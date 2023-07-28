import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-glaccounts',
  templateUrl: './glaccounts.component.html',
  styleUrls: ['./glaccounts.component.css']
})
export class GlaccountsComponent {
  public ratecurrency: any;
  public rateamount: any;
  public glname: any;
  public glcurrency: any;
  public arrays = [];
  public tabledata: any;
  public element: any;
  public elementtwo: any;
  public elementthree: any;
  public searchText: any;
  public page: number = 1;
  public count: number = 0;
  public tableSize: number = 5;
  public tableSizes: any = [5, 10, 15, 20];
  public glRequest: any ={
    glName : "",
    currency: ""
  }
  public updateCharge: any ={
    currency : "",
    amount: ""
  }
  constructor(private api: ApiService, private auth: AuthService, public datepipe: DatePipe, private router: Router) {

  }
ngOnInit(){
  this.postList();
}

postList(): void {
  this.api.getallGLAccounts()
  .subscribe((res) =>{
    console.log(res);
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
  glaccount(){
    this.element = document.getElementById("glacntContainer");
    this.element.style.display = '';
    this.element = document.getElementById("createglContainer");
    this.element.style.display = 'none';
    this.element = document.getElementById("setChargeContainer");
    this.element.style.display = 'none';
  }

  newglaccount(){
    this.element = document.getElementById("createglContainer");
    this.element.style.display = '';
    this.element = document.getElementById("glacntContainer");
    this.element.style.display = 'none';
    this.element = document.getElementById("setChargeContainer");
    this.element.style.display = 'none';
  }

  updateContainer(){
    this.element = document.getElementById("setChargeContainer");
    this.element.style.display = '';
    this.element = document.getElementById("createglContainer");
    this.element.style.display = 'none';
    this.element = document.getElementById("glacntContainer");
    this.element.style.display = 'none';
  }

  createNewGL(){
    this.glRequest["glname"] = this.glname;
    this.glRequest["currency"] = this.glcurrency;
    this.api.newGL(this.glRequest)
    .subscribe((res:any) =>{
      Swal.fire({
        title: 'Success!',
        text: res.data,
        confirmButtonColor: '#53277E',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    })
  }
  updateWalletRate(){
    this.updateCharge["currency"] = this.ratecurrency;
    this.updateCharge["amount"] = this.rateamount;
    this.api.setRate(this.updateCharge)
    .subscribe((res:any) =>{
      if(res.status == true){
      Swal.fire({
        title: 'Success!',
        text: res.data,
        confirmButtonColor: '#53277E',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    }
    })
  }

  updateWalletCharge(){
    this.updateCharge["currency"] = this.ratecurrency;
    this.updateCharge["amount"] = this.rateamount;
    this.api.setCharge(this.updateCharge)
    .subscribe((res:any) =>{
      if(res.status == true){
      Swal.fire({
        title: 'Success!',
        text: res.data,
        confirmButtonColor: '#53277E',
        icon: 'success',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
    }
    })
  }

}
