import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ConfirmedValidator from 'src/app/helpers/confirmed.validator';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-newadmins',
  templateUrl: './newadmins.component.html',
  styleUrls: ['./newadmins.component.css']
})
export class NewadminsComponent {
  public tabledata: any;
  public email: any;
  public adminemail: any;
  public resetadminemail: any;
  public password: any;
  public confirmpassword: any;
  public unlockdto: any = {
    email: "",
  };
  public element: any;
  public resetDto: any = {
    email: "",
    newPassword: ""
  };
  public disableDto: any = {
    email: "",
  };


  constructor(public api: ApiService, private fb: FormBuilder) { }
  resetForm!: FormGroup;

  ngOnInit(): void {
    //initialize your form
    this.resetForm = this.fb.group({
      email: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmpassword: ['', Validators.required]

    },
      {
        validator: ConfirmedValidator('newPassword', 'confirmpassword')
      })
  }

  createAdmin() {
    this.unlockdto["email"] = this.email;
    this.api.createAdmin(this.unlockdto)
      .subscribe((res: any) => {
        {
          if (res.status == true) {
            Swal.fire({
              title: "Successful!",
              text: res.data,
              icon: "success",
              confirmButtonColor: '#53277E'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
          if (res.status != true) {
            Swal.fire({
              title: "Error!",
              text: res.statusMessage,
              icon: "error",
              confirmButtonColor: '#53277E'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
        }
      })
  }

  createAdminContainer() {
    this.element = document.getElementById("createglContainer")
    this.element.style.display = '';
    this.element = document.getElementById("resetAdminContainer")
    this.element.style.display = 'none';
    this.element = document.getElementById("disableglContainer")
    this.element.style.display = 'none';
  }

  disableAdminContainer() {
    this.element = document.getElementById("createglContainer")
    this.element.style.display = 'none';
    this.element = document.getElementById("resetAdminContainer")
    this.element.style.display = 'none';
    this.element = document.getElementById("disableglContainer")
    this.element.style.display = '';
  }

  resetAdminContainer() {
    this.element = document.getElementById("createglContainer")
    this.element.style.display = 'none';
    this.element = document.getElementById("resetAdminContainer")
    this.element.style.display = '';
    this.element = document.getElementById("disableglContainer")
    this.element.style.display = 'none';
  }

  resetAdmin() {
    if (this.resetForm.valid) {
      this.api.resetAdmin(this.resetForm.value)
        .subscribe((res: any) => {
          if (res.status == true) {
            Swal.fire({
              title: "Successful!",
              text: res.data,
              icon: "success",
              confirmButtonColor: '#53277E'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
          if (res.status != true) {
            Swal.fire({
              title: "Error!",
              text: res.statusMessage,
              icon: "error",
              confirmButtonColor: '#53277E'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
        }
        )
    }
  }

  disableAdmin() {
    this.disableDto["email"] = this.adminemail;
    this.api.disableAdmin(this.disableDto)
      .subscribe((res: any) => {
          if (res.status == true) {
            Swal.fire({
              title: "Successful!",
              text: res.data,
              icon: "success",
              confirmButtonColor: '#53277E'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
          if (res.status != true) {
            Swal.fire({
              title: "Error!",
              text: res.statusMessage,
              icon: "error",
              confirmButtonColor: '#53277E'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          }
      })
  }
}
