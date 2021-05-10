import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmDialogService } from 'src/app/confirm-dialog/confirm-dialog.service';
import { FlightService } from 'src/app/flight/flight.service';
import { UtilityService } from 'src/app/services/utility.service';
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
  addFlight: any;
  formHeading: any;
  buttonName: any;
  image: any;
  flightForm: any;
  submitted: any;
  editFlight: any;
  depart: any;
  data: any;
  admin_details: any;

  constructor(
    private flightService: FlightService, 
    private adminService: AdminService,
    private fb: FormBuilder,
    private confirmDialogService: ConfirmDialogService,
    private utilityService: UtilityService) { }

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
      this.admin_details = this.utilityService.getadminDetail();
      this.utilityService.setToken(this.admin_details)
    })

    this.formHeading = 'Add Flight';
    this.buttonName = 'Add';
    this.addFlight = true;
    this.image = 'Upload Flight Image';

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
  }

  get fs(){ return this.flightForm.controls }

  getMonth(month: any) {
    return ["Jan", "Feb","March","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"][month-1] || '';
  }

  Flight(){
    if(this.addFlight === true){
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
          this.submitted = false
          this.ngOnInit();
      })
    }
    else{
      console.log(this.addFlight)
      let id = this.flightForm.value.id;

      var Dhours = this.flightForm.value.timeDepart.slice(0, 2);
      var Dminutes = this.flightForm.value.timeDepart.slice(3);
      var Ahours = this.flightForm.value.timeArrival.slice(0, 2);
      var Aminutes = this.flightForm.value.timeArrival.slice(3);
      this.flightForm.value.time = (Number(Ahours)-Number(Dhours)).toString()+"h " + (Number(Aminutes)-Number(Dminutes)).toString()+"mins"
  
      this.adminService.updateFlight(
        "flights/update/" + id, 
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
        console.log(Data)
        alert("flight updated Successfully!!")
        this.ngOnInit();
      })
    }
  }

  edit(flightId: any){
    this.formHeading = 'Edit Flight';
    this.buttonName = 'Update';
    this.addFlight = false;
    console.log(flightId)

    this.flightForm = this.fb.group({
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
      this.flightForm.patchValue(this.editFlight)
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
