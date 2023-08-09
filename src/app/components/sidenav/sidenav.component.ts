import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  public elementOne: any;
  public elementTwo: any;
  constructor(private api: ApiService, private auth: AuthService, private route: ActivatedRoute, private router: Router){}
  
ngOnInit(){
  this.api.adminDetail()
  .subscribe((res:any) => {
    console.log(res);
    if (res.data.username !== "Admin" && res.data !== null){
      // this.elementOne = document.getElementById("adminUsers");
      // this.elementOne.style.display = 'none';
      this.elementTwo = document.getElementById("adminAcc");
      this.elementTwo.style.display = 'none';
    }
  })
}

 logout(){
  this.auth.logout();
 }
}
