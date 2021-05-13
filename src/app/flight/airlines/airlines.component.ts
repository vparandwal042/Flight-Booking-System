import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FlightService } from '../flight.service';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {

  public allAirlines: any
  constructor(private flightService: FlightService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.flightService.getAllAirlines("airlines").subscribe(airlines =>{
      this.allAirlines = airlines
      console.log(this.allAirlines)
    })
  }

}
