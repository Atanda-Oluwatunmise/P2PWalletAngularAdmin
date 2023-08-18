import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-imagedialog',
  templateUrl: './imagedialog.component.html',
  styleUrls: ['./imagedialog.component.css']
})
export class ImagedialogComponent {
  public imagefile: any;
  constructor(@Inject(MAT_DIALOG_DATA) data:any){
    this.imagefile = data;
  }

}
