import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FlightService } from 'src/app/flight/flight.service';
import { AdminService } from '../admin.service';
import { ConfirmDialogService } from '../../confirm-dialog/confirm-dialog.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  public allUsers: any
  public editUser: any
  public UserForm: any
  public updateUserForm: any
  public submitted: any
  public query: any = ""
  public Message: any

  constructor(
    private flightService: FlightService, 
    private adminService: AdminService,
    private fb: FormBuilder,
    private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.flightService.getAllUsers("users").subscribe(users =>{
      this.allUsers = users;
    })
  
    this.UserForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['12345', Validators.required],
      mobile: ['', Validators.required],
    })

    this.updateUserForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['12345', Validators.required],
      mobile: ['', Validators.required],
    })
  }

  get fs(){ return this.UserForm.controls }
  User(){
      this.submitted = true
      if(this.UserForm.invalid){
        return
      }
      console.log(this.UserForm.value)
      this.flightService.signUp("users/signup", this.UserForm.value).subscribe(userData =>{
        console.log(userData)
        sessionStorage.setItem("user", "yes");
        this.Message = "Added"
        this.UserForm.reset();
        this.submitted = false
        this.ngOnInit();
      })
  }
  Alert(){
    if(sessionStorage.getItem("user") === "yes"){
      return true
    }
    if(sessionStorage.getItem("user-update") === "yes"){
      return true
    }
    else{
      return false
    }
  }
  removeSession(){
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("user-update");
  }

  edit(userId: any){
    this.removeSession()

    this.updateUserForm = this.fb.group({
      id: [userId],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required]
    })

    this.adminService.getUser("users/edit/" + userId).subscribe(userData =>{
      this.editUser = userData
      console.log(this.editUser)
      this.updateUserForm.patchValue(this.editUser)
    })
  }
  updateUser(){
    let id = this.updateUserForm.value.id;
    this.adminService.updateUser("users/update/" + id, this.updateUserForm.value).subscribe(data =>{
      sessionStorage.setItem("user-update", "yes");
      this.Message = "Updated"
      this.ngOnInit();
    });
  }
  
  delete(user: any){
    console.log(user._id)
    this.confirmDialogService.confirmThis("Really Want to delete?", () =>{
      this.adminService.deleteUser("users/delete/" + user._id).subscribe(user =>{
        //alert("deleted")
        this.ngOnInit();
      })
    }, () =>{

    });
  }

}
