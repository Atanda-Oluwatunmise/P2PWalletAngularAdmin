import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
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
      password: ['', Validators.required]
    })
   }
  
   hideShowPassword(){
    this.isText = !this.isText;
    this.isText? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash"
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
    if(this.loginForm.valid){
      //send object to the database
      //this.loader.setLoading(true);
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res) =>{
          // console.log(res)
           //alert(res.statusMessage)
          this.loginForm.reset()
          this.auth.storeToken(res.data.token)
          this.auth.storeRefreshToken(res.data.refreshToken)
          // this.toastr.success('Successful', 'User logged in successfully')
          //this.loader.getLoading();
          this.router.navigate(['dashboard']);  
        },
        error: (err)=> {
          alert(err?.error.statusMessage)
        }
      })
    }else{
      //throw an error using toaster with required fields
      console.log("form is not valid");
      //validateForm.validateAllFormFields(this.loginForm);
      alert("your form is invalid")
    }
  }

}
