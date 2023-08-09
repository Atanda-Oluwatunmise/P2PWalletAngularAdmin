import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
public name: any;
  constructor(private api: ApiService){}
  ngOnInit(){
    this.api.adminDetail()
    .subscribe((res:any) => {
      // console.log(res);
      this.name = res.data.username;
    
  })
  }

}
