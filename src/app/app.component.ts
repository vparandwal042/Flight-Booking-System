import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Flight-Booking-System';
  public showFlight: Boolean = true;
  public router: any
  constructor(private _router: Router){
    this.router = _router.url
  }
  ngOnInit(){
  }
}
