import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  title = 'appBootstrap';
  public router: any
  constructor(private _route: Router){
    this.router = _route.url
  }
  ngOnInit(): void {
  }
}
