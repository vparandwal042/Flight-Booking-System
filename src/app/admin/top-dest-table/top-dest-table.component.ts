import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from 'src/app/flight/flight.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-top-dest-table',
  templateUrl: './top-dest-table.component.html',
  styleUrls: ['./top-dest-table.component.css']
})
export class TopDestTableComponent implements OnInit {

  public allTopDest: any
  public topDestForm: any;
  public updateTopDestForm: any;
  submitted: any;
  editTopDest: any;
  public query: any = ""
  admin_details: any;
  Message: any;

  constructor(
    private flightService: FlightService, 
    private adminService: AdminService,
    private fb: FormBuilder,
    private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.flightService.getAllTopDest("top-dest").subscribe(dest =>{
      this.allTopDest = dest;
    })

    this.topDestForm = this.fb.group({
      id: [0],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      fare: ['', Validators.required],
      cityImage: [null, Validators.required],
    })
    this.updateTopDestForm = this.fb.group({
      id: [0],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      fare: ['', Validators.required],
      cityImage: [null, Validators.required],
    })
  }

  get fs(){ return this.topDestForm.controls }

  topDest(){
      this.submitted = true
      if(this.topDestForm.invalid){
        return
      }
      this.adminService.addTopDest("topDest/add", this.topDestForm.value.from, this.topDestForm.value.destination, this.topDestForm.value.cityImage, this.topDestForm.value.fare).subscribe(Data =>{
        console.log(Data)
        sessionStorage.setItem("topDest", "yes");
        this.Message = "Added"
        this.topDestForm.reset();
        this.submitted = false
        this.ngOnInit();
      })
  }

  Alert(){
    if(sessionStorage.getItem("topDest") === "yes"){
      return true
    }
    if(sessionStorage.getItem("topDest-update") === "yes"){
      return true
    }
    else{
      return false
    }
  }
  removeSession(){
    sessionStorage.removeItem("topDest");
    sessionStorage.removeItem("topDest-update");
  }

  edit(topDestId: any){
    this.removeSession()

    this.updateTopDestForm = this.fb.group({
      id: [topDestId],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      fare: ['', Validators.required],
      cityImage: [null, Validators.required],
    })  

    this.adminService.getTopDest("topDest/edit/" + topDestId).subscribe(userData =>{
      this.editTopDest = userData
      console.log(this.editTopDest)
      this.updateTopDestForm.patchValue(this.editTopDest)
    })
  }
  updateTopDest(){
    let id = this.updateTopDestForm.value.id;
    this.adminService.updateTopDest("topDest/update/" + id, this.updateTopDestForm.value.from, this.updateTopDestForm.value.destination, this.updateTopDestForm.value.cityImage, this.updateTopDestForm.value.fare).subscribe(data =>{
      sessionStorage.setItem("topDest-update", "yes");
      this.Message = "Updated"
      this.ngOnInit();
    });
  }

  delete(TopDestId: any){
    this.confirmDialogService.confirmThis("Really want to delete?", () =>{
      this.adminService.deleteTopDest("topDest/delete/" + TopDestId).subscribe(topDest =>{
        this.ngOnInit();
      })
    }, () =>{

    })
  }
}
