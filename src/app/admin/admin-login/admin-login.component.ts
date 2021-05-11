import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  public show: Boolean = true;
  islogin: any
  dashboard: any
  public router: any
  adminForm: any;
  submitted: any;
  loginDetails: any;
  admin_details: any;
  constructor(private _router: Router, private fb: FormBuilder, private adminService: AdminService){
    this.router = _router.url
  }
  ngOnInit(): void {

    this.adminForm = this.fb.group({
      id: [0],
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get fs(){ return this.adminForm.controls }
  adminSubmit(){
      this.submitted = true
      if(this.adminForm.invalid){
        return
      }
      console.log(this.adminForm.value)
      this.adminService.adminLogin("admin/login", this.adminForm.value).subscribe(adminData =>{
        console.log(adminData)
        this.loginDetails = adminData
        let _id = this.loginDetails["_id"]
        this.islogin = true
       // alert("Login Successfully!!")
        sessionStorage.setItem("access-admin-token", this.loginDetails["token"])
        sessionStorage.setItem("admin", "yes");
        this.adminForm.reset();
        this.submitted = false
      })
  }
  isLogin(){
    if(sessionStorage.getItem("admin") === "yes"){
      return true
    }
    else{
      return false
    }
  }
  logout(){
    sessionStorage.removeItem("admin")
    sessionStorage.removeItem('access-admin-token');
  }  
}
