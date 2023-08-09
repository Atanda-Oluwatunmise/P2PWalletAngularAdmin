import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import ConfirmedValidator from 'src/app/helpers/confirmed.validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.css']
})
export class AdminChangePasswordComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";

   //inject important things, inject auth service, inject router
   constructor(private fb: FormBuilder,private auth:AuthService, private router: Router){}

   //grouping form, use form-group
   loginForm!: FormGroup;

   ngOnInit(): void{
    //initialize your form
    this.loginForm= this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword:['', Validators.required]

    },
    { 
      validator:  ConfirmedValidator('password', 'confirmpassword')
    })
   }
  
   hideShowPassword(){
    this.isText = !this.isText;
    this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"
    this.isText ? this.type = "text" : this.type = "password";
  }

  onChange() {
    if(this.loginForm.valid){
      this.auth.changeaPassword(this.loginForm.value)
      .subscribe({
        next:(res:any) =>{
          console.log(res);
           if (res.status == true){
           alert(res.statusMessage)
           this.router.navigate(['login']);  

           }
          this.loginForm.reset()
          // this.auth.storeToken(res.data.token)
          // this.auth.storeRefreshToken(res.data.refreshToken)
          // this.toastr.success('Successful', 'User logged in successfully')
          //this.loader.getLoading();
        },
        error: (err)=> {
          alert(err?.error.statusMessage)
        }
      })
    }else{
      //validateForm.validateAllFormFields(this.loginForm);
      alert("your form is invalid")
    }
  }
}
