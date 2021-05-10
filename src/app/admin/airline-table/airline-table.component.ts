import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from 'src/app/flight/flight.service';
import { UtilityService } from 'src/app/services/utility.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-airline-table',
  templateUrl: './airline-table.component.html',
  styleUrls: ['./airline-table.component.css']
})
export class AirlineTableComponent implements OnInit {

  public allAirlines: any
  public airlineForm: any
  public addAirline: any;
  public formHeading: any
  public buttonName: any
  public submitted: any
  public images: any
  public image: any
  public editAirline: any
  public query: any = ""
  admin_details: any;
  constructor(
    private flightService: FlightService, 
    private adminService: AdminService,
    private fb: FormBuilder,
    private confirmDialogService: ConfirmDialogService,
    private utilityService: UtilityService) { }

  ngOnInit(): void {
    this.flightService.getAllAirlines("airlines").subscribe(airlines =>{
      this.allAirlines = airlines
    })
    this.addAirline = true
    this.formHeading = 'Add Airline';
    this.buttonName = 'Add';
    this.image = 'Upload Airline Image'
    this.airlineForm = this.fb.group({
      id: [0],
      airlineName: ['', Validators.required],
      airlineImage: [null, Validators.required],
    })
  }

  get fs(){ return this.airlineForm.controls }

  Airline(){
    if(this.addAirline === true){
      this.submitted = true
      if(this.airlineForm.invalid){
        return
      }
      console.log(this.addAirline)
      this.adminService.addAirline("airline/add", this.airlineForm.value.airlineName, this.airlineForm.value.airlineImage).subscribe(airlineData =>{
        console.log(airlineData)
        alert("Airline Added Successfully!!")
        this.airlineForm.reset();
        this.submitted = false
        this.ngOnInit();
      })
    }
    else{
      console.log(this.addAirline)
      let id = this.airlineForm.value.id;
      this.adminService.updateAirline("airline/update/" + id, this.airlineForm.value.airlineName, this.airlineForm.value.airlineImage).subscribe(data =>{
        alert("Updated");
        this.ngOnInit();
      });
    }
  }

  edit(airId: any){
    this.formHeading = 'Edit Airline';
    this.buttonName = 'Update';
    this.addAirline = false;
    console.log(airId)

    this.airlineForm = this.fb.group({
      id: [airId],
      airlineName: ['', Validators.required],
      airlineImage: [null, Validators.required],
    })  

    this.adminService.getAirline("airline/edit/" + airId).subscribe(userData =>{
      this.editAirline = userData
      console.log(this.editAirline)
      this.airlineForm.patchValue(this.editAirline)
    })
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
