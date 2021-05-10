import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightDataService } from '../flight-data.service';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {

  public returnField = true
  public flightSearch: any
  public submitted: any
  public allFlights: any
  public from: any
  public destination: any
  public fdata: any
  flights: any;
  depart: any;
  constructor(
    private flightService: FlightService, 
    private fb: FormBuilder, 
    private route: Router) {  }

  ngOnInit(): void {
    this.flightSearch = this.fb.group({
      id: [0],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      departure: ['', Validators.required]
    })
    this.allFlights = JSON.parse(localStorage.getItem('flightData') || '{}');
    for(let flight of this.allFlights){
      this.from = flight["from"];
      this.destination = flight["destination"]
    }

    this.flightService.getAllFlights("flights").subscribe(data =>{
      this.fdata = data
      for(let a of this.allFlights){
        this.depart = a["departure"].split("-");
        a["year"] = this.depart[0]
        a["month"] = this.getMonth(Number(this.depart[1]))
        a["day"] = this.depart[2]
      }
    })
    console.log(this.allFlights)
  }

  getMonth(month: any) {
    return ["Jan", "Feb","March","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"][month-1] || '';
  }

  enableReturn(){
    this.returnField = false
  }
  disableReturn(){
    this.returnField = true
  }

  get f(){ return this.flightSearch.controls }
  searchFlight(){
    this.submitted = true
    if(this.flightSearch.invalid){
      return
    }
    console.log("in searchFlight()")
    this.flightService.getFlights("flights/search", this.flightSearch.value).subscribe(flightData =>{
      this.allFlights = flightData
      console.log("Flight Search")
      //localStorage.setItem('flightData', JSON.stringify(this.flights));
      this.route.navigate(['flight-search'])
    })
  }
}
