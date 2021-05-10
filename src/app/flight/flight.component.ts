import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements OnInit {
  title = 'appBootstrap';
  public router: any
  constructor(private _route: Router){
    this.router = this._route.url
  }
  ngOnInit(): void {
  }
}
