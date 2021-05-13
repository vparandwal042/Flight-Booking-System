import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from 'src/app/flight/flight.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-airline-table',
  templateUrl: './airline-table.component.html',
  styleUrls: ['./airline-table.component.css']
})
export class AirlineTableComponent implements OnInit {

  public Message: any
  public airlineData: any
  public allAirlines: any
  public airlineForm: any
  public updateAirlineForm: any
  public submitted: any
  public images: any
  public editAirline: any
  public query: any = ""
  admin_details: any;
  constructor(
    private flightService: FlightService, 
    private adminService: AdminService,
    private fb: FormBuilder,
    private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.flightService.getAllAirlines("airlines").subscribe(airlines =>{
      this.allAirlines = airlines
    })
    this.airlineForm = this.fb.group({
      id: [0],
      airlineName: ['', Validators.required],
      airlineImage: [null, Validators.required],
    })
    this.updateAirlineForm = this.fb.group({
      id: [0],
      airlineName: ['', Validators.required],
      airlineImage: [null, Validators.required],
    })
  }

  get fa(){ return this.airlineForm.controls }

  Airline(){
    this.submitted = true
      if(this.airlineForm.invalid){
        return
      }
      this.adminService.addAirline("airline/add", this.airlineForm.value.airlineName, this.airlineForm.value.airlineImage).subscribe(AirlineData =>{
        this.airlineData = AirlineData
        sessionStorage.setItem("airline", "yes");
        this.Message = "Added"
        this.airlineForm.reset();
        this.submitted = false
        this.ngOnInit();
      })
  }

  Alert(){
    if(sessionStorage.getItem("airline") === "yes"){
      return true
    }
    if(sessionStorage.getItem("airline-update") === "yes"){
      return true
    }
    else{
      return false
    }
  }
  removeSession(){
    sessionStorage.removeItem("airline");
    sessionStorage.removeItem("airline-update");
  }

  edit(airId: any){
    this.removeSession()

    this.updateAirlineForm = this.fb.group({
      id: [airId],
      airlineName: ['', Validators.required],
      airlineImage: [null, Validators.required],
    })  

    this.adminService.getAirline("airline/edit/" + airId).subscribe(userData =>{
      this.editAirline = userData
      console.log(this.editAirline)
      this.updateAirlineForm.patchValue(this.editAirline)
    })
  }
  updateAirline(){
    let id = this.updateAirlineForm.value.id;
      this.adminService.updateAirline("airline/update/" + id, this.updateAirlineForm.value.airlineName, this.updateAirlineForm.value.airlineImage).subscribe(data =>{
        sessionStorage.setItem("airline-update", "yes");
        this.Message = "Updated"
        this.ngOnInit();
      });
  }

  delete(airId: any){
    this.confirmDialogService.confirmThis("Really want to delete?", () =>{
      this.adminService.deleteAirline("airline/delete/" + airId).subscribe(topDest =>{
        this.ngOnInit();
      })
    }, () =>{

    })
  }

}
