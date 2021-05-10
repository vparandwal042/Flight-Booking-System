import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  public allFlights: any
  public Flights: any
  public flightSearch: any
  depart: any;
  constructor(private flightService: FlightService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.flightSearch = this.fb.group({
      id: [0],
      from: ['', Validators.required],
      destination: ['', Validators.required],
      departure: ['', Validators.required],
      return: ['', Validators.required]
    })
    this.flightService.getAllFlights("flights").subscribe(data =>{
      this.allFlights = data
      console.log("Get All flights-list works", data);
      for(let a of this.allFlights){
        this.depart = a["departure"].split("-");
        a["year"] = this.depart[0]
        a["month"] = this.getMonth(Number(this.depart[1]))
        a["day"] = this.depart[2]
      }
    })
  }
  getMonth(month: any) {
    return ["Jan", "Feb","March","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"][month-1] || '';
  }

}
