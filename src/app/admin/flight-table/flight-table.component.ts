import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from 'src/app/flight/flight.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-flight-table',
  templateUrl: './flight-table.component.html',
  styleUrls: ['./flight-table.component.css']
})
export class FlightTableComponent implements OnInit {

  public allFlights: any
  public finalFlights: any
  public query: any = ""
  flightForm: any;
  updateFlightForm: any
  submitted: any;
  editFlight: any;
  depart: any;
  data: any;
  admin_details: any;
  Message: any;

  constructor(
    private flightService: FlightService, 
    private adminService: AdminService,
    private fb: FormBuilder,
    private confirmDialogService: ConfirmDialogService) { }

  ngOnInit(): void {
    this.flightService.getAllFlights("flights").subscribe(flights =>{
      this.allFlights = flights
      for(let a of this.allFlights){
        this.depart = a["departure"].split("-");
        a["year"] = this.depart[0]
        a["month"] = this.getMonth(Number(this.depart[1]))
        a["day"] = this.depart[2]
      }
      console.log(typeof this.allFlights)
    })

    this.flightForm = this.fb.group({
      id: [0],
      flightName: ['', Validators.required],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      departure: ['', Validators.required],
      timeDepart: ['', Validators.required],
      timeArrival: ['', Validators.required],
      seats: ['', Validators.required],
      fare: ['', Validators.required],
      flightImage: [null, Validators.required],
      time: ['']
    })

    this.updateFlightForm = this.fb.group({
      id: [0],
      flightName: ['', Validators.required],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      departure: ['', Validators.required],
      timeDepart: ['', Validators.required],
      timeArrival: ['', Validators.required],
      seats: ['', Validators.required],
      fare: ['', Validators.required],
      flightImage: [null, Validators.required],
      time: ['']
    })
  }

  get fs(){ return this.flightForm.controls }

  getMonth(month: any) {
    return ["Jan", "Feb","March","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"][month-1] || '';
  }

  Flight(){
      this.submitted = true
      if(this.flightForm.invalid){
        return
      }
      var Dhours = this.flightForm.value.timeDepart.slice(0, 2);
      var Dminutes = this.flightForm.value.timeDepart.slice(3);
      var Ahours = this.flightForm.value.timeArrival.slice(0, 2);
      var Aminutes = this.flightForm.value.timeArrival.slice(3);
      this.flightForm.value.time = (Number(Ahours)-Number(Dhours)).toString()+"h " + (Number(Aminutes)-Number(Dminutes)).toString()+"mins"
  
      this.adminService.addFlight(
        "flights/add", 
        this.flightForm.value.flightName,
        this.flightForm.value.from, 
        this.flightForm.value.destination, 
        this.flightForm.value.departure,
        this.flightForm.value.timeDepart,
        this.flightForm.value.timeArrival,
        this.flightForm.value.seats,
        this.flightForm.value.fare,
        this.flightForm.value.flightImage,
        this.flightForm.value.time).subscribe(Data =>{

          this.flightForm.reset();
          sessionStorage.setItem("flight", "yes");
          this.Message = "Added"
          this.submitted = false
          this.ngOnInit();
      })
  }

  Alert(){
    if(sessionStorage.getItem("flight") === "yes"){
      return true
    }
    if(sessionStorage.getItem("flight-update") === "yes"){
      return true
    }
    else{
      return false
    }
  }
  removeSession(){
    sessionStorage.removeItem("flight");
    sessionStorage.removeItem("flight-update");
  }

  edit(flightId: any){
    this.removeSession()

    this.updateFlightForm = this.fb.group({
      id: [flightId],
      flightName: ['', Validators.required],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      departure: ['', Validators.required],
      timeDepart: ['', Validators.required],
      timeArrival: ['', Validators.required],
      seats: ['', Validators.required],
      fare: ['', Validators.required],
      flightImage: [null, Validators.required],
      time: ['']
    })  

    this.adminService.getFlight("flights/edit/" + flightId).subscribe(userData =>{
      this.editFlight = userData
      console.log(this.editFlight)
      this.updateFlightForm.patchValue(this.editFlight)
    })
  }

  updateFlight(){
    let id = this.updateFlightForm.value.id;

    var Dhours = this.updateFlightForm.value.timeDepart.slice(0, 2);
    var Dminutes = this.updateFlightForm.value.timeDepart.slice(3);
    var Ahours = this.updateFlightForm.value.timeArrival.slice(0, 2);
    var Aminutes = this.updateFlightForm.value.timeArrival.slice(3);
    this.updateFlightForm.value.time = (Number(Ahours)-Number(Dhours)).toString()+"h " + (Number(Aminutes)-Number(Dminutes)).toString()+"mins"

    this.adminService.updateFlight(
      "flights/update/" + id, 
      this.updateFlightForm.value.flightName,
      this.updateFlightForm.value.from, 
      this.updateFlightForm.value.destination, 
      this.updateFlightForm.value.departure,
      this.updateFlightForm.value.timeDepart,
      this.updateFlightForm.value.timeArrival,
      this.updateFlightForm.value.seats,
      this.updateFlightForm.value.fare,
      this.updateFlightForm.value.flightImage,
      this.updateFlightForm.value.time).subscribe(Data =>{
      console.log(Data)
      //alert("flight updated Successfully!!")
      sessionStorage.setItem("flight-update", "yes");
      this.Message = "Updated"
      this.ngOnInit();
    })
  }

  delete(flight: any){
    this.confirmDialogService.confirmThis("Really want to delete?", () =>{
      this.adminService.deleteFlights("flights/delete/" + flight._id).subscribe(topDest =>{
        this.ngOnInit();
      })
    }, () =>{

    })
  }

}
