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
  public submitted: any
  public formHeading: any;
  public buttonName: any;
  public addUser: any;
  public query: any = ""
  public admin_details: any

  constructor(
    private flightService: FlightService, 
    private adminService: AdminService,
    private fb: FormBuilder,
    private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.flightService.getAllUsers("users").subscribe(users =>{
      this.allUsers = users;
    })
    this.addUser = true
    this.formHeading = 'Add User';
    this.buttonName = 'Add';
  
    this.UserForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['12345', Validators.required],
      mobile: ['', Validators.required],
    })
  }

  get fs(){ return this.UserForm.controls }
  User(){
    if(this.addUser === true){
      this.submitted = true
      if(this.UserForm.invalid){
        return
      }
      console.log(this.addUser)
      console.log(this.UserForm.value)
      this.flightService.signUp("users/signup", this.UserForm.value).subscribe(userData =>{
        console.log(userData)
        //alert("User Added Successfully!!")
        this.UserForm.reset();
        this.submitted = false
        this.ngOnInit();
      })
    }
    else{
      console.log(this.addUser)
      let id = this.UserForm.value.id;
      this.adminService.updateUser("users/update/" + id, this.UserForm.value).subscribe(data =>{
        //alert("Updated");
        this.ngOnInit();
      });
    }
  }

  edit(userId: any){
    this.formHeading = 'Edit User';
    this.buttonName = 'Update';
    this.addUser = false;
    console.log(userId)

    this.UserForm = this.fb.group({
      id: [userId],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobile: ['', Validators.required]
    })

    this.adminService.getUser("users/edit/" + userId).subscribe(userData =>{
      this.editUser = userData
      console.log(this.editUser)
      this.UserForm.patchValue(this.editUser)
    })
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
